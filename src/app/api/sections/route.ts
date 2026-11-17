import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const headings = db.getSectionHeadings();
  return NextResponse.json({ success: true, headings });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = db.updateSectionHeadings(body);
    return NextResponse.json({ success: true, headings: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memperbarui judul section";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

