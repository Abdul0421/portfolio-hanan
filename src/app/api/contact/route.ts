import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const contact = db.getContactSettings();
  return NextResponse.json({ success: true, contact });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = db.updateContactSettings(body);
    return NextResponse.json({ success: true, contact: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memperbarui pengaturan kontak";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

