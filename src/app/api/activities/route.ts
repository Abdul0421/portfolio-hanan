import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const activities = db.getActivities();
  return NextResponse.json({ success: true, activities });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.organization) {
      return NextResponse.json(
        { error: "Nama jabatan/peran dan nama organisasi/kegiatan wajib diisi." },
        { status: 400 }
      );
    }

    const newAct = db.createActivity({
      title: body.title,
      organization: body.organization,
      role: body.role || body.title,
      period: body.period || "",
      category: body.category || "Organisasi",
      description: body.description || "",
      documentation_urls: Array.isArray(body.documentation_urls) ? body.documentation_urls : [],
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, activity: newAct }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menambahkan aktivitas";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
