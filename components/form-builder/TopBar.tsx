"use client";

import { Save, Eye, Send, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

type TopBarProps = {
  formName: string;
  onNameChange: (v: string) => void;
  isConversational: boolean;
  onToggleConversational: (v: boolean) => void;
  onGenerate?: () => void;
  onPreview?: () => void;
  onSettings?: () => void;
  onSave?: () => void;
  onPublish?: () => void;
};

export default function TopBar({
  formName,
  onNameChange,
  isConversational,
  onToggleConversational,
  onGenerate,
  onPreview,
  onSettings,
  onSave,
  onPublish,
}: TopBarProps) {
  return (
    <header
      className="
        sticky top-0 z-40
        bg-white/70 dark:bg-neutral-950/50 backdrop-blur-md
        supports-[backdrop-filter]:bg-white/60
        shadow-[0_1px_0_0_rgba(0,0,0,0.04)]
      ">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Title group */}
        <div className="flex items-center gap-3">
          <Input
            value={formName}
            onChange={(e) => onNameChange(e.target.value)}
            className="
              h-9 w-[200px] md:w-[320px]
              border-0 bg-transparent px-0
              text-xl md:text-2xl font-semibold tracking-tight
              focus-visible:ring-0 focus-visible:outline-none
            "
          />
          <Badge className="border-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white">
            Draft
          </Badge>
        </div>

        {/* Actions – pill, ghosty, no harsh borders */}
        <div className="flex items-center gap-1">
          {/* Conversational toggle (hide on xs) */}
          <div className="hidden items-center gap-2 pr-1 sm:flex">
            <Label
              htmlFor="conversational-mode"
              className="text-xs text-muted-foreground">
              Conversational
            </Label>
            <Switch
              id="conversational-mode"
              checked={isConversational}
              onCheckedChange={onToggleConversational}
            />
          </div>

          <Button
            variant="ghost"
            className="hidden gap-2 rounded-full px-3 sm:inline-flex hover:bg-muted/60 active:scale-[0.98]"
            onClick={onGenerate}>
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Generate</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted/60 active:scale-[0.98]"
            onClick={onPreview}
            aria-label="Preview">
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted/60 active:scale-[0.98]"
            onClick={onSettings}
            aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="
              rounded-full px-4
              bg-neutral-100 text-neutral-900 hover:bg-neutral-200
              dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700
              active:scale-[0.98]
            "
            onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>

          {/* Primary gradient */}
          <Button
            size="sm"
            className="
              relative overflow-hidden rounded-full px-4
              bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600
              text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.98]
            "
            onClick={onPublish}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* soft gradient hairline (no harsh border) */}
      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent" />
    </header>
  );
}
