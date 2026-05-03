import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { messageId } = await req.json();
    if (!messageId) return NextResponse.json({ error: "No messageId" }, { status: 400 });

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ ok: true });
    }

    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const messages = await redis.lrange("lounge:messages", 0, 79);
    for (const raw of messages) {
      try {
        const msg = typeof raw === "string" ? JSON.parse(raw) : raw;
        if (msg.id === messageId) {
          await redis.lrem("lounge:messages", 1, raw);
          await redis.del(`lounge:reactions:${messageId}`);
          break;
        }
      } catch {}
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
