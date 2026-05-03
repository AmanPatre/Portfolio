import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ messages: [] });
    }
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    const raw = await redis.lrange("lounge:messages", 0, 79);
    const messages = raw
      .map((m) => {
        try { return typeof m === "string" ? JSON.parse(m) : m; }
        catch { return null; }
      })
      .filter(Boolean)
      .reverse();
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
