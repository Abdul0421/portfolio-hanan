import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const experiences = db.getExperiences();
  return NextResponse.json({ success: true, experiences });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.company || !body.role) {
      return NextResponse.json(
        { error: "Nama instansi/perusahaan dan posisi wajib diisi." },
        { status: 400 }
      );
    }

    const newExp = db.createExperience({
      company: body.company,
      role: body.role,
      department: body.department || "",
      division: body.division || "",
      period: body.period || "",
      description: body.description || "",
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      logo_url: body.logo_url || "",
      documentation_urls: Array.isArray(body.documentation_urls) ? body.documentation_urls : [],
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, experience: newExp }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menambahkan pengalaman";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

