"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
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
  const headingId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Ensure portal is available
  useEffect(() => setMounted(true), []);

  // Close on route change
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock scroll + keyboard ESC to close + focus first item
  useEffect(() => {
    if (!mounted) return;

    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);

      // Focus the first link for accessibility
      const t = setTimeout(() => firstLinkRef.current?.focus(), 0);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKey);
        clearTimeout(t);
      };
    }
  }, [open, mounted]);

  // Header height variable (set this in your CSS if you want to change it)
  const headerTopClass = "top-[var(--app-header-h,4rem)]";

  // Split nav into primary (center links you provided) and account section
  const primaryLinks = useMemo(() => links, [links]);

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

      {/* Portal drawer */}
      {open &&
        mounted &&
        createPortal(
          <>
            {/* Overlay (starts below header so it doesn't cover it) */}
            <div
              className={cn(
                "fixed left-0 right-0 bottom-0 z-[70] md:hidden",
                headerTopClass,
                // subtle gradient + tint
                "bg-gradient-to-b from-transparent to-black/30"
              )}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <section
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              className={cn(
                "fixed inset-x-0 z-[75] md:hidden",
                headerTopClass,
                "border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 shadow-lg",
                // slide down a touch
                "animate-in fade-in-0 zoom-in-95 duration-150"
              )}
              style={{
                maxHeight: "calc(100dvh - var(--app-header-h, 4rem))",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}>
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <h2 id={headingId} className="text-sm font-semibold">
                  Menu
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="px-4 pb-4">
                {/* Signed-in line */}
                <p className="px-3 py-2 text-xs text-muted-foreground rounded-md bg-secondary/60">
                  Signed in as <span className="font-medium">{display}</span>
                </p>

                {/* Primary nav */}
                <nav className="mt-3" aria-label="Primary">
                  <div className="px-3 pb-2 text-xs uppercase tracking-wide text-muted-foreground">
                    Navigation
                  </div>

                  <ul className="space-y-2">
                    {primaryLinks.map((l, i) => {
                      const active =
                        l.href === "/app"
                          ? pathname === "/app"
                          : pathname.startsWith(l.href);
                      return (
                        <li key={l.href}>
                          <Link
                            ref={i === 0 ? firstLinkRef : null}
                            href={l.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-base font-medium transition-colors outline-none focus:ring-2 focus:ring-ring/50",
                              active
                                ? "bg-primary/5 text-primary"
                                : "text-muted-foreground hover:text-primary"
                            )}
                            onClick={() => setOpen(false)}>
                            {l.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Plan + quick actions */}
                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center justify-between px-1">
                    <Badge
                      variant="outline"
                      className="border-primary/20 bg-primary/5 text-primary">
                      Pro Plan
                    </Badge>
                    {/* <Link
                      href="/app/forms/new"
                      className="btn btn--primary"
                      onClick={() => setOpen(false)}>
                      Create
                    </Link> */}
                  </div>

                  <div className="mt-3 grid gap-2">
                    <Link
                      href="/profile"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setOpen(false)}>
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setOpen(false)}>
                      Settings
                    </Link>

                    {/* Logout */}
                    <form action={onLogout} className="pt-1">
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full">
                        Sign out
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>,
          document.body
        )}
    </>
  );
}
