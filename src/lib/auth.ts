import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "af-hanan-super-secret-key-2026-industrial-tech-excellence";
const secretKey = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "af_admin_session";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as SessionPayload;
  } catch (err) {
    return null;
  }
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

export async function authenticateAdmin(passwordAttempt: string, emailAttempt: string) {
  const admin = db.getAdminUser();
  if (!admin) return null;

  if (admin.email.toLowerCase() !== emailAttempt.toLowerCase().trim()) {
    return null;
  }

  const isValid = await bcrypt.compare(passwordAttempt, admin.password_hash);
  if (!isValid) return null;

  return {
    userId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  };
}

export { COOKIE_NAME };
