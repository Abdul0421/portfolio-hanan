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
    const updated = db.markMessageRead(id, body.is_read !== undefined ? Boolean(body.is_read) : true);
    if (!updated) {
      return NextResponse.json({ error: "Pesan tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Status pesan diperbarui" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memperbarui status pesan";
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
  const deleted = db.deleteMessage(id);
  if (!deleted) {
    return NextResponse.json({ error: "Pesan tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Pesan berhasil dihapus" });
}

