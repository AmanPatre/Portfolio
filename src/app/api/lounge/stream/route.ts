export const runtime = "edge";

export async function GET() {
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      function send(data: string) {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {}
      }

      // Send initial connection event
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "connected" })}\n\n`));

      // Poll Redis every 2 seconds for new messages
      let lastMessageId = "";

      async function poll() {
        try {
          if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            controller.enqueue(encoder.encode(": ping\n\n"));
            return;
          }

          const res = await fetch(
            `${process.env.UPSTASH_REDIS_REST_URL}/lrange/lounge:messages/0/0`,
            {
              headers: {
                Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
              },
            }
          );

          if (res.ok) {
            const data = await res.json();
            const latest = data.result?.[0];
            if (latest && latest !== lastMessageId) {
              lastMessageId = latest;
              try {
                const msg = typeof latest === "string" ? JSON.parse(latest) : latest;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "message", message: msg })}\n\n`));
              } catch {}
            }
          }
        } catch {
          // Keep stream alive
          controller.enqueue(encoder.encode(": ping\n\n"));
        }
      }

      intervalId = setInterval(poll, 2000);

      // Keep-alive ping every 15s
      const pingId = setInterval(() => {
        try { controller.enqueue(encoder.encode(": ping\n\n")); } catch {}
      }, 15000);
    },
    cancel() {
      if (intervalId) clearInterval(intervalId);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  });
}
