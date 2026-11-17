import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = db.updateSkill(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Keahlian tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, skill: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memperbarui keahlian";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = db.deleteSkill(id);
  if (!deleted) {
    return NextResponse.json({ error: "Keahlian tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Keahlian berhasil dihapus" });
}

