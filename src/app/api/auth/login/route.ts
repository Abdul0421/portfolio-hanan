import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await authenticateAdmin(password, email);
    if (!user) {
      return NextResponse.json(
        { error: "Kredensial login salah. Silakan periksa email dan password Anda." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
      user,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan internal server.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

