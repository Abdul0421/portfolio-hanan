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
    const updated = db.updateActivity(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Aktivitas tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, activity: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memperbarui aktivitas";
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
  const deleted = db.deleteActivity(id);
  if (!deleted) {
    return NextResponse.json({ error: "Aktivitas tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Aktivitas berhasil dihapus" });
}
