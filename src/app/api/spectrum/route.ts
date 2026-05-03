import { NextRequest, NextResponse } from "next/server";
import { PROJECTS, SKILLS, CREDENTIALS } from "@/lib/constants";

export async function GET() {
  try {
    let visitors = { total: 0, daily: 0, weekly: 0, monthly: 0 };

    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      const [total, daily, weekly, monthly] = await Promise.all([
        redis.get<number>("visitors:total"),
        redis.get<number>("visitors:daily"),
        redis.get<number>("visitors:weekly"),
        redis.get<number>("visitors:monthly"),
      ]);
      visitors = {
        total: total ?? 0,
        daily: daily ?? 0,
        weekly: weekly ?? 0,
        monthly: monthly ?? 0,
      };
    }

    const mem = process.memoryUsage();

    return NextResponse.json({
      uptime: Math.floor(process.uptime()),
      memoryUsed: Math.round(mem.heapUsed / 1024 / 1024),
      memoryTotal: Math.round(mem.heapTotal / 1024 / 1024),
      nodeVersion: process.version,
      stats: {
        projects: PROJECTS.filter((p) => p.status !== "coming_soon").length,
        skills: SKILLS.reduce((a, c) => a + c.skills.length, 0),
        credentials: CREDENTIALS.length,
      },
      visitors,
      timestamp: Date.now(),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch spectrum data" }, { status: 500 });
  }
}
