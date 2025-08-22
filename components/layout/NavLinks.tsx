"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
            className={`navlink ${active ? "navlink--active" : ""}`}>
            {l.label}
          </Link>
        );
      })}
    </>
  );
}
