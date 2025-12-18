"use server";

import "server-only";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { hashResetToken } from "@/lib/reset-token";

export type ActionState = { ok: boolean; error?: string };

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const token = String(formData.get("token") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!token) return { ok: false, error: "Missing reset token." };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters." };

  const tokenHash = hashResetToken(token);
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!record)
    return { ok: false, error: "This reset link is invalid or has expired." };
  if (record.usedAt)
    return { ok: false, error: "This reset link has already been used." };
  if (record.expiresAt.getTime() < Date.now())
    return { ok: false, error: "This reset link has expired." };

  const newHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { password: newHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
    // Important: revoke existing sessions so old cookies stop working
    prisma.session.deleteMany({
      where: { userId: record.userId },
    }),
  ]);

  return { ok: true };
}
