import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const skills = db.getSkills();
  const categories = db.getSkillCategories();
  return NextResponse.json({ success: true, skills, categories });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: "Nama keahlian dan kategori wajib diisi." },
        { status: 400 }
      );
    }

    const newSkill = db.createSkill({
      name: body.name,
      category: body.category,
      proficiency: body.proficiency || "Advanced",
      icon: body.icon || "Award",
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, skill: newSkill }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menambahkan keahlian";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
