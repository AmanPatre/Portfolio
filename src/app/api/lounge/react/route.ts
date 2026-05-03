import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messageId, emoji } = await req.json();
    if (!messageId || !emoji) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ ok: true, count: 1 });
    }

    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const count = await redis.hincrby(`lounge:reactions:${messageId}`, emoji, 1);
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ error: "React failed" }, { status: 500 });
  }
}
