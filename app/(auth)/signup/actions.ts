// app/(auth)/signup/actions.ts
import "server-only";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { hashPassword } from "@/lib/password";

export type ActionState = { error?: string };

function isValidUsername(u: string) {
  return /^[a-z0-9._-]{3,32}$/i.test(u);
}

export async function signUpAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const username = String(formData.get("username") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!isValidUsername(username))
    return { error: "Username must be 3–32 chars (letters, numbers, . _ -)" };
  if (!email.includes("@")) return { error: "Enter a valid email." };
  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };

  const [uTaken, eTaken] = await Promise.all([
    prisma.user.findUnique({ where: { username } }),
    prisma.user.findUnique({ where: { email } }),
  ]);
  if (uTaken) return { error: "That username is taken." };
  if (eTaken) return { error: "That email is already in use." };

  const hash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { username, email, password: hash },
  });
  const next = String(formData.get("next") ?? "/app");

  await createSession(user.id);
  redirect(next);
}
