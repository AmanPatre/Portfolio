import { NextRequest, NextResponse } from "next/server";
import { generateUsername, getCountryFlag } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, gifUrl, username, countryCode } = body;

    if (!text && !gifUrl) return NextResponse.json({ error: "Empty message" }, { status: 400 });

    const message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      username: username || generateUsername(),
      country: countryCode || "XX",
      countryCode: countryCode || "XX",
      text: text || "",
      gifUrl: gifUrl || null,
      timestamp: Date.now(),
      reactions: {},
    };

    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      await redis.lpush("lounge:messages", JSON.stringify(message));
      await redis.ltrim("lounge:messages", 0, 79);
    }

    return NextResponse.json({ ok: true, message });
  } catch (err) {
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
