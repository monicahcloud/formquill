"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // if you have a cn helper; otherwise remove
import { Button } from "@/components/ui/button";

const links = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/forms/new", label: "Builder" },
  { href: "/app/analytics", label: "Analytics" },
  { href: "/templates", label: "Templates" }, // marketing section
];

export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/app" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
            <span className="text-sm font-bold text-white">FQ</span>
          </div>
          <span className="font-semibold">FormQuill</span>
        </Link>

        <nav className="flex items-center gap-4">
          {links.map((l) => {
            const active =
              l.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground transition-colors",
                  active && "text-foreground"
                )}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* add user menu later */}
          <Link href="/app/forms/new">
            <Button className="bg-brand-gradient hover:opacity-95">
              Create
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
