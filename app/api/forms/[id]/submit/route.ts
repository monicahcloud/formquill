/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/forms/[id]/submit/route.ts
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // or 'edge' if you want

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  // Optional: ensure the form exists
  const form = await prisma.form.findUnique({ where: { id } });
  if (!form) {
    return new Response("Form not found", { status: 404 });
  }

  // Read submission body (supports both JSON and form-data)
  let payload: Record<string, unknown> = {};
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    payload = (await req.json()) ?? {};
  } else if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const fd = await req.formData();
    payload = Object.fromEntries(fd.entries());
  }

  // Persist submission (adjust fields to match your schema)
  await prisma.submission.create({
    data: {
      formId: id,
      data: payload as any, // JSON column in Prisma schema
    },
  });

  return Response.json({ ok: true });
}
