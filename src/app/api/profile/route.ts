import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  await db.syncCloud();
  const profile = db.getProfile();
  return NextResponse.json({ success: true, profile });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.syncCloud();
    const body = await req.json();
    const updated = db.updateProfile(body);
    return NextResponse.json({ success: true, profile: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memperbarui profil";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

