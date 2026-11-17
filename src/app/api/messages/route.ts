import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = db.getMessages();
  return NextResponse.json({ success: true, messages });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format alamat email tidak valid." },
        { status: 400 }
      );
    }

    const saved = db.createMessage({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || "Pesan dari Portfolio Website").trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Terima kasih! Pesan Anda telah berhasil terkirim.",
        data: saved,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal mengirim pesan.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

