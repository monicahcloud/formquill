import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    if (!body?.data || typeof body.data !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const form = await prisma.form.findUnique({ where: { id } });
    if (!form)
      return NextResponse.json({ error: "Form not found" }, { status: 404 });

    await prisma.submission.create({ data: { formId: id, data: body.data } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
