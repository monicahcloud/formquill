// lib/session.ts
import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { randomBytes, createHash } from "crypto";
import type { User } from "@prisma/client";

const COOKIE = "fq_session";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

function sha256(v: string) {
  return createHash("sha256").update(v).digest("hex");
}
function newToken() {
  return randomBytes(32).toString("hex");
}

// Small helper to normalize the async cookie store in Next 15
async function getCookieStore() {
  return await cookies();
}

export async function createSession(userId: string) {
  const token = newToken();
  const tokenHash = sha256(token);
  const expires = new Date(Date.now() + THIRTY_DAYS * 1000);

  await prisma.session.create({
    data: { userId, tokenHash, expiresAt: expires },
  });

  const cookieStore = await getCookieStore();
  cookieStore.set({
    name: COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
}

export async function getSession() {
  const cookieStore = await getCookieStore();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  return prisma.session.findFirst({
    where: { tokenHash: sha256(token), expiresAt: { gt: new Date() } },
    include: { user: true },
  });
}

export async function requireUser(): Promise<User | null> {
  const sess = await getSession();
  return sess?.user ?? null;
}

export async function destroySession() {
  const cookieStore = await getCookieStore();
  const token = cookieStore.get(COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: sha256(token) } });
  }
  cookieStore.set({ name: COOKIE, value: "", path: "/", maxAge: 0 });
}
