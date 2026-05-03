import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ ok: true, note: "Redis not configured" });
    }

    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Geo lookup
    let city = "Unknown";
    let country = "Unknown";
    let countryCode = "XX";
    try {
      const geo = await fetch(`https://ipapi.co/${ip}/json/`, {
        headers: { "User-Agent": "portfolio-tracker/1.0" },
      });
      if (geo.ok) {
        const data = await geo.json();
        city = data.city || "Unknown";
        country = data.country_name || "Unknown";
        countryCode = data.country_code || "XX";
      }
    } catch {}

    const now = new Date();
    const endOfDay = new Date(now); endOfDay.setHours(23, 59, 59, 999);
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const ttlDay = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
    const ttlWeek = Math.floor((endOfWeek.getTime() - now.getTime()) / 1000);
    const ttlMonth = Math.floor((endOfMonth.getTime() - now.getTime()) / 1000);

    await Promise.all([
      redis.incr("visitors:total"),
      redis.incr("visitors:daily"),
      redis.expire("visitors:daily", ttlDay),
      redis.incr("visitors:weekly"),
      redis.expire("visitors:weekly", ttlWeek),
      redis.incr("visitors:monthly"),
      redis.expire("visitors:monthly", ttlMonth),
      redis.hincrby(`visitor:countries`, countryCode, 1),
      redis.hset(`visitor:${ip}`, {
        city,
        country,
        countryCode,
        lastSeen: now.toISOString(),
      }),
      redis.hincrby(`visitor:${ip}`, "visits", 1),
    ]);

    return NextResponse.json({ ok: true, city, country });
  } catch (err) {
    console.error("Track error:", err);
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
