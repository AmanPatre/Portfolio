import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ polls: [] });
    }
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    const polls = await redis.hgetall("lounge:polls");
    return NextResponse.json({ polls: polls ?? {} });
  } catch {
    return NextResponse.json({ polls: {} });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { pollId, option } = await req.json();
    if (!pollId || !option) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ ok: true });
    }

    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    await redis.hincrby(`lounge:poll:${pollId}`, option, 1);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}
