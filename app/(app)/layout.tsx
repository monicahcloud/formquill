import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";

export const runtime = "nodejs";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user) redirect("/signup"); // send unauth’d users to signup
  return <>{children}</>;
}
