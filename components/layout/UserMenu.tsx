"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  User as UserIcon,
  ChevronDown,
  Settings as SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserMenu({
  display,
  initials,
  onLogout,
}: {
  display: string;
  initials: string;
  onLogout: (formData: FormData) => void; // server action
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            // pill + subtle gradient ring
            "group relative h-9 rounded-full pl-1.5 pr-2.5",
            "border-white/15 bg-white/5 text-foreground/90 backdrop-blur",
            "supports-[backdrop-filter]:bg-white/5",
            // hover/active feedback
            "transition-all duration-300",
            "hover:border-teal-300/40 hover:bg-white/10",
            "active:scale-[0.98]",
            // nice inner highlight
            "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"
          )}
          aria-label="Open account menu">
          {/* Avatar with soft gradient ring + online dot */}
          <span className="relative inline-flex items-center justify-center rounded-full p-[2px] bg-gradient-to-r from-teal-500/30 via-cyan-500/30 to-blue-500/30">
            <Avatar className="h-7 w-7 rounded-full bg-background ring-1 ring-white/10">
              <AvatarFallback className="bg-muted text-[10px] font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
          </span>

          {/* Name (truncated) */}
          <span className="max-w-[11rem] truncate text-sm font-medium">
            {display}
          </span>

          {/* Chevron animates on open */}
          <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        alignOffset={-4}
        className={cn(
          "z-50 min-w-72 rounded-2xl border border-white/10 p-2.5 shadow-2xl",
          // glassy panel with subtle vertical gradient
          "bg-gradient-to-b from-popover/95 to-popover/80 text-popover-foreground backdrop-blur-xl",
          "supports-[backdrop-filter]:from-popover/90 supports-[backdrop-filter]:to-popover/75"
        )}>
        {/* Header card */}
        <div className="mb-2.5 rounded-xl border border-white/10 bg-white/[.03] p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative inline-flex items-center justify-center rounded-full p-[2px] bg-gradient-to-r from-teal-500/35 via-cyan-500/35 to-blue-500/35">
              <Avatar className="h-9 w-9 rounded-full ring-1 ring-white/10">
                <AvatarFallback className="bg-muted text-[11px] font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{display}</div>
              <div className="mt-0.5 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-primary/10 text-primary">
                  Pro Plan
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Manage your account
                </span>
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuLabel className="px-2 text-xs uppercase tracking-wide text-muted-foreground">
          Quick Links
        </DropdownMenuLabel>

        <div className="mt-1 space-y-1">
          <DropdownMenuItem asChild className="group cursor-pointer">
            <Link
              href="/profile"
              className="flex w-full items-center gap-2 rounded-md p-2 transition-colors hover:bg-white/5"
              aria-label="Profile">
              <UserIcon className="h-4 w-4 opacity-80 group-hover:opacity-100" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="group cursor-pointer">
            <Link
              href="/settings"
              className="flex w-full items-center gap-2 rounded-md p-2 transition-colors hover:bg-white/5"
              aria-label="Settings">
              <SettingsIcon className="h-4 w-4 opacity-80 group-hover:opacity-100" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Logout (server action) */}
        <form>
          <DropdownMenuItem
            asChild
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer rounded-md p-0">
            <button
              type="submit"
              formAction={onLogout}
              className="flex w-full items-center gap-2 rounded-md p-2 text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-600"
              aria-label="Log out">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
