"use client";

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
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";

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
          className="flex items-center gap-2 rounded-full pl-1 pr-2">
          <Avatar className="h-7 w-7 ring-1 ring-border">
            <AvatarFallback className="bg-muted text-[10px] font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-[10rem] truncate text-sm">{display}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        alignOffset={-4}
        className="z-50 min-w-60 rounded-lg border border-border bg-popover/95 text-popover-foreground shadow-xl backdrop-blur supports-[backdrop-filter]:bg-popover/90 p-1">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          Account
        </DropdownMenuLabel>

        <div className="px-2 pb-2 text-sm text-muted-foreground truncate">
          {display}
        </div>

        <DropdownMenuSeparator />

        {/* Use button formAction + prevent Radix default */}
        <form>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            asChild
            className="cursor-pointer focus:bg-muted focus:text-foreground">
            <button
              type="submit"
              formAction={onLogout}
              className="flex w-full items-center gap-2">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
