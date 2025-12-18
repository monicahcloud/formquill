// // lib/session.ts
// import "server-only";
// import { cookies } from "next/headers";
// import { prisma } from "@/lib/prisma";
// import { randomBytes, createHash } from "crypto";
// import type { User } from "@prisma/client";

// const COOKIE = "fq_session";
// const THIRTY_DAYS = 60 * 60 * 24 * 30;

// function sha256(v: string) {
//   return createHash("sha256").update(v).digest("hex");
// }
// function newToken() {
//   return randomBytes(32).toString("hex");
// }

// // Small helper to normalize the async cookie store in Next 15
// async function getCookieStore() {
//   return await cookies();
// }

// export async function createSession(userId: string) {
//   const token = newToken();
//   const tokenHash = sha256(token);
//   const expires = new Date(Date.now() + THIRTY_DAYS * 1000);

//   await prisma.session.create({
//     data: { userId, tokenHash, expiresAt: expires },
//   });

//   const cookieStore = await getCookieStore();
//   cookieStore.set({
//     name: COOKIE,
//     value: token,
//     httpOnly: true,
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: THIRTY_DAYS,
//   });
// }

// export async function getSession() {
//   const cookieStore = await getCookieStore();
//   const token = cookieStore.get(COOKIE)?.value;
//   if (!token) return null;
//   return prisma.session.findFirst({
//     where: { tokenHash: sha256(token), expiresAt: { gt: new Date() } },
//     include: { user: true },
//   });
// }

// export async function requireUser(): Promise<User | null> {
//   const sess = await getSession();
//   return sess?.user ?? null;
// }

// export async function destroySession() {
//   const cookieStore = await getCookieStore();
//   const token = cookieStore.get(COOKIE)?.value;
//   if (token) {
//     await prisma.session.deleteMany({ where: { tokenHash: sha256(token) } });
//   }
//   cookieStore.set({ name: COOKIE, value: "", path: "/", maxAge: 0 });
// }

// lib/session.ts
import "server-only";
import { randomBytes, createHash } from "crypto";
import { cookies as nextCookies } from "next/headers";
import { prisma } from "./prisma";

const SESSION_COOKIE = "sid";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  await prisma.session.create({
    data: { userId, tokenHash, expiresAt },
  });

  const cookieStore = await nextCookies(); // <-- Next 15 requires await
  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function getUserFromSession() {
  const cookieStore = await nextCookies(); // <-- await
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    // optional cleanup + clear stale cookie
    await prisma.session.deleteMany({ where: { tokenHash } }).catch(() => {});
    const cs = await nextCookies();
    cs.set({
      name: SESSION_COOKIE,
      value: "",
      path: "/",
      maxAge: 0,
    });
    return null;
  }

  return session.user;
}

/** Use this inside protected pages */
export async function requireUser() {
  const user = await getUserFromSession();
  return user; // page/layout decides to redirect if null
}

export async function destroySession() {
  const cookieStore = await nextCookies(); // <-- await
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session
      .deleteMany({ where: { tokenHash: hashToken(token) } })
      .catch(() => {});
  }

  cookieStore.set({
    name: SESSION_COOKIE,
    value: "",
    path: "/",
    maxAge: 0, // immediately expire
  });
}
