import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    const files = await readdir(galleryDir).catch(() => [] as string[]);
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .map((f) => ({ src: `/gallery/${f}`, alt: f.replace(/\.[^.]+$/, "").replace(/-/g, " ") }));
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
