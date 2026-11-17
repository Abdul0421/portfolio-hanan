import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const achievements = db.getAchievements();
  return NextResponse.json({ success: true, achievements });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.competition_name) {
      return NextResponse.json(
        { error: "Judul karya/penghargaan dan nama kompetisi wajib diisi." },
        { status: 400 }
      );
    }

    const newAch = db.createAchievement({
      title: body.title,
      competition_name: body.competition_name,
      level: body.level || "Tingkat Nasional",
      rank: body.rank || "Juara 1",
      organizer: body.organizer || "",
      year: body.year || "2026",
      description: body.description || "",
      certificate_url: body.certificate_url || "",
      documentation_urls: Array.isArray(body.documentation_urls) ? body.documentation_urls : [],
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, achievement: newAch }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menambahkan prestasi";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
