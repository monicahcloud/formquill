// components/layout/AppNavbar.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser, destroySession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks"; // client subcomponent (below)

export const runtime = "nodejs";

const LINKS = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/forms/new", label: "Builder" },
  { href: "/app/analytics", label: "Analytics" },
  { href: "/templates", label: "Templates" }, // marketing
];

// Server action for logout
async function logout() {
  "use server";
  await destroySession();
  redirect("/signin");
}

function initialsFrom(usernameOrEmail: string) {
  const base = usernameOrEmail?.split("@")[0] ?? "user";
  const letters = base
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 2)
    .toUpperCase();
  return letters || "U";
}

export default async function AppNavbar() {
  // Extra safety; your (app) layout already guards this.
  const user = await requireUser();
  if (!user) redirect("/signin");

  const display = user.username || user.email || "user";
  const initials = initialsFrom(display);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/app" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
            <span className="text-sm font-bold text-white">FQ</span>
          </div>
          <span className="font-semibold">FormQuill</span>
        </Link>

        {/* Nav (active state handled in client subcomponent) */}
        <nav className="hidden items-center gap-4 md:flex">
          <NavLinks links={LINKS} />
        </nav>

        {/* Right side: Create, user chip, logout */}
        <div className="flex items-center gap-2">
          <Link href="/app/forms/new">
            <Button className="bg-brand-gradient hover:opacity-95">
              Create
            </Button>
          </Link>

          {/* Signed-in chip */}
          <div className="ml-2 hidden items-center gap-2 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-sm md:flex">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-muted/60 text-[10px] font-semibold">
              {initials}
            </div>
            <span className="max-w-[12rem] truncate">{display}</span>
          </div>

          {/* Logout button via server action */}
          <form action={logout}>
            <Button type="submit" variant="outline" className="ml-1">
              Log out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
