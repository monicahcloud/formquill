import "server-only";
import { Resend } from "resend";

type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailArgs) {
  const from = process.env.MAIL_FROM || "no-reply@formquill.com";
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.log("[MAIL DEV FALLBACK]");
    console.log({ from, to, subject });
    console.log(text ?? html);
    return;
  }

  const resend = new Resend(key);

  await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
  });
}
