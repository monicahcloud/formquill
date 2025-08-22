/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser, destroySession } from "@/lib/session";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";
import Logo from "../brand/Logo";

export const runtime = "nodejs";

const LINKS = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/forms/new", label: "Builder" },
  { href: "/app/analytics", label: "Analytics" },
  { href: "/templates", label: "Templates" },
];

function initialsFrom(display: string) {
  const base = display?.split("@")[0] ?? "user";
  const letters = base
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 2)
    .toUpperCase();
  return letters || "U";
}

// server action (logout)
async function logout() {
  "use server";
  await destroySession();
  redirect("/signin");
}

export default async function AppNavbar() {
  const user = await requireUser();
  if (!user) redirect("/signin");

  const display = user.username || user.email || "user";
  const initials = initialsFrom(display);

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {/* Brand */}
        <Link href="/app" className="row" aria-label="FormQuill (Dashboard)">
          <Logo
            variant="full"
            size={65} // icon size
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            gap={2}
            tighten
          />
        </Link>

        {/* Desktop links */}
        <nav className="navbar__links">
          <NavLinks links={LINKS} />
        </nav>

        {/* Right (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <span className="badge ">Pro Plan</span>

          <UserMenu display={display} initials={initials} onLogout={logout} />
        </div>

        {/* Right (mobile) */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/app/forms/new"
            className="btn btn--primary"
            aria-label="Create form">
            Create
          </Link>
          <MobileNav links={LINKS} display={display} onLogout={logout} />
        </div>
      </div>
      <div className="hr-gradient" />
    </nav>
  );
}
