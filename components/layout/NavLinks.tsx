// components/layout/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // if you have it; otherwise replace cn(...) with a template string

type LinkItem = { href: string; label: string };

export default function NavLinks({ links }: { links: LinkItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((l) => {
        const active =
          l.href === "/app" ? pathname === "/app" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "text-sm text-muted-foreground transition-colors hover:text-foreground",
              active && "text-foreground"
            )}>
            {l.label}
          </Link>
        );
      })}
    </>
  );
}
