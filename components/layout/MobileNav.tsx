"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type LinkItem = { href: string; label: string };

export default function MobileNav({
  links,
  display,
  onLogout,
}: {
  links: LinkItem[];
  display: string;
  onLogout: (fd: FormData) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Toggle (mobile only) */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Render drawer/overlay in a portal so header overflow/z-index can’t clip it */}
      {open &&
        mounted &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-[70] bg-black/30 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Panel (sits just below the header height var; defaults to 4rem) */}
            <div
              id={panelId}
              role="menu"
              className={cn(
                "fixed inset-x-0 md:hidden z-[75]",
                "top-[var(--app-header-h,4rem)]",
                "border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
                "shadow-lg"
              )}>
              <div className="space-y-3 px-4 py-4">
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
                        "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                        active
                          ? "bg-primary/5 text-primary"
                          : "text-muted-foreground hover:text-primary"
                      )}
                      onClick={() => setOpen(false)}>
                      {l.label}
                    </Link>
                  );
                })}

                <div className="mt-3 border-t pt-3">
                  <div className="px-3 pb-2">
                    <Badge
                      variant="outline"
                      className="border-primary/20 bg-primary/5 text-primary">
                      Pro Plan
                    </Badge>
                  </div>

                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setOpen(false)}>
                    Settings
                  </Link>

                  <form action={onLogout} className="px-3 pt-1">
                    <Button type="submit" variant="outline" className="w-full">
                      Sign out
                    </Button>
                  </form>

                  <p className="px-3 pt-2 text-xs text-muted-foreground truncate">
                    Signed in as {display}
                  </p>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
