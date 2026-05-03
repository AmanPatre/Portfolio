import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ visitors: [] });
    }
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    const keys = await redis.keys("visitor:*");
    const ipKeys = keys.filter((k) => !k.includes("countries"));
    const visitors = await Promise.all(
      ipKeys.map(async (key) => {
        const data = await redis.hgetall(key);
        return { ip: key.replace("visitor:", ""), ...data };
      })
    );
    return NextResponse.json({ visitors });
  } catch {
    return NextResponse.json({ error: "Visitors fetch error" }, { status: 500 });
  }
}
