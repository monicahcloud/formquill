"use server";

import "server-only";
import { prisma } from "@/lib/prisma";
import { generateResetToken, hashResetToken } from "@/lib/reset-token";
import { sendEmail } from "@/lib/mailer";

export type ActionState = { ok: boolean; error?: string };

function isEmail(v: string) {
  return v.includes("@") && v.includes(".");
}

export async function forgotPasswordAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!isEmail(email))
    return { ok: false, error: "Enter a valid email address." };

  // Always return ok (avoid account enumeration)
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { ok: true };

  // Optional: invalidate any existing unused tokens (keeps DB tidy)
  await prisma.passwordResetToken.updateMany({
    where: { userId: user.id, usedAt: null, expiresAt: { gt: new Date() } },
    data: { usedAt: new Date() },
  });

  const token = generateResetToken();
  const tokenHash = hashResetToken(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 60 min

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const resetUrl = `${appUrl}/forgot/reset-password?token=${token}`;

  const subject = "Reset your FormQuill password";
  const text = `Reset your password using this link (valid for 60 minutes): ${resetUrl}`;
  const html = `
    <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
      <h2>Reset your password</h2>
      <p>Click the button below to reset your FormQuill password. This link expires in 60 minutes.</p>
      <p><a href="${resetUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none;">Reset password</a></p>
      <p style="color:#6b7280;font-size:12px;">If you didn’t request this, you can safely ignore this email.</p>
    </div>
  `;

  await sendEmail({ to: email, subject, html, text });
  return { ok: true };
}
