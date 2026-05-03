import { NODE_SYSTEM_PROMPT } from "@/lib/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      'data: {"choices":[{"delta":{"content":"node> GEMINI_API_KEY is not configured. Please add it to .env.local"}}]}\n\ndata: [DONE]\n\n',
      { headers: { "Content-Type": "text/event-stream" } }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: NODE_SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am NODE." }] },
        ...history,
      ],
    });

    const result = await chat.sendMessageStream(lastMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            // Wrap the Gemini chunk in the OpenAI SSE format so the frontend doesn't break
            const payload = JSON.stringify({
              choices: [{ delta: { content: chunkText } }],
            });
            controller.enqueue(new TextEncoder().encode(`data: ${payload}\n\n`));
          }
        } catch (err: any) {
          const payload = JSON.stringify({
            choices: [{ delta: { content: `\n[Error: ${err.message}]` } }],
          });
          controller.enqueue(new TextEncoder().encode(`data: ${payload}\n\n`));
        } finally {
          controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err: any) {
    return new Response(
      `data: {"choices":[{"delta":{"content":"node> Error from Gemini API: ${err.message}"}}]}\n\ndata: [DONE]\n\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    );
  }
}
