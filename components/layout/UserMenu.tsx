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
  PlusCircle,
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
            "flex items-center gap-2 rounded-full pl-1 pr-2",
            "hover:bg-secondary"
          )}
          aria-label="Open account menu">
          <Avatar className="h-7 w-7 ring-1 ring-border">
            <AvatarFallback className="bg-muted text-[10px] font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-[12rem] truncate text-sm">{display}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        alignOffset={-4}
        className={cn(
          "z-50 min-w-72 rounded-lg border border-border p-2 shadow-xl",
          "bg-popover/95 text-popover-foreground backdrop-blur",
          "supports-[backdrop-filter]:bg-popover/90"
        )}>
        {/* Header */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          Account
        </DropdownMenuLabel>
        <p className="px-2 pb-2 text-xs text-muted-foreground">
          Signed in as <span className="font-medium">{display}</span>
        </p>

        {/* Plan + quick create (to match MobileNav) */}
        <div className="flex items-center justify-between px-2 pb-2">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 text-primary">
            Pro Plan
          </Badge>
        </div>

        <DropdownMenuSeparator />

        {/* Quick actions */}
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex w-full items-center gap-2"
            aria-label="Profile">
            <UserIcon className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex w-full items-center gap-2"
            aria-label="Settings">
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout (server action) */}
        <form>
          <DropdownMenuItem
            asChild
            onSelect={(e) => e.preventDefault()} // keep Radix from closing before formAction
            className="cursor-pointer focus:bg-muted focus:text-foreground">
            <button
              type="submit"
              formAction={onLogout}
              className="flex w-full items-center gap-2"
              aria-label="Log out">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
