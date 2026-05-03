import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ total: 0, daily: 0, weekly: 0, monthly: 0, countries: {} });
    }

    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const [total, daily, weekly, monthly, countries] = await Promise.all([
      redis.get<number>("visitors:total"),
      redis.get<number>("visitors:daily"),
      redis.get<number>("visitors:weekly"),
      redis.get<number>("visitors:monthly"),
      redis.hgetall("visitor:countries"),
    ]);

    return NextResponse.json({
      total: total ?? 0,
      daily: daily ?? 0,
      weekly: weekly ?? 0,
      monthly: monthly ?? 0,
      countries: countries ?? {},
    });
  } catch {
    return NextResponse.json({ error: "Analytics error" }, { status: 500 });
  }
}
