import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) return NextResponse.json({ gifs: [] });

  if (!process.env.GIPHY_API_KEY) {
    return NextResponse.json({ gifs: [], note: "No GIPHY_API_KEY configured" });
  }

  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${encodeURIComponent(q)}&limit=12&rating=g`;
    const res = await fetch(url);
    const data = await res.json();

    const gifs = (data.data || []).map((g: any) => ({
      id: g.id,
      url: g.images.fixed_height.url,
      preview: g.images.fixed_height_small.url,
      title: g.title,
    }));

    return NextResponse.json({ gifs });
  } catch {
    return NextResponse.json({ gifs: [], error: "Giphy fetch failed" });
  }
}
