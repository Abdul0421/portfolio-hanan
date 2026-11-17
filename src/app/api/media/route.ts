import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const media = db.getMediaLibrary();
  return NextResponse.json({ success: true, media });
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID media diperlukan." }, { status: 400 });
  }

  const success = db.deleteMediaItem(id);
  if (!success) {
    return NextResponse.json({ error: "Media tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Media berhasil dihapus." });
}

