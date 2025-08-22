"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { verifyPassword } from "@/lib/password";

export type ActionState = { error?: string };

function looksLikeEmail(v: string) {
  return v.includes("@");
}

export async function signInAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const identifier = String(formData.get("identifier") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/app");

  if (!identifier || !password) {
    return { error: "Enter your username/email and password." };
  }

  const user = looksLikeEmail(identifier)
    ? await prisma.user.findUnique({
        where: { email: identifier.toLowerCase() },
      })
    : await prisma.user.findUnique({ where: { username: identifier } });

  if (!user) return { error: "Invalid credentials." };

  const ok = await verifyPassword(password, user.password);
  if (!ok) return { error: "Invalid credentials." };

  await createSession(user.id);
  redirect(next || "/app");
}
