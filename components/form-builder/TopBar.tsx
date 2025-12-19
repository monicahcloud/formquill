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
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3">
        {/* Left: title */}
        <div className="flex items-center gap-3">
          <Input
            value={formName}
            onChange={(e) => onNameChange(e.target.value)}
            className="
              h-9 w-[220px] md:w-[320px]
              border-0 bg-transparent px-0
              text-lg font-semibold
              focus-visible:ring-0
            "
          />

          <Badge className="rounded-full bg-muted px-3 text-xs font-medium text-muted-foreground">
            Draft
          </Badge>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Conversational */}
          <div className="hidden items-center gap-2 sm:flex">
            <Label className="text-sm text-muted-foreground">
              Conversational
            </Label>
            <Switch
              checked={isConversational}
              onCheckedChange={onToggleConversational}
            />
          </div>

          {/* Generate (AI action) */}
          <Button
            variant="ghost"
            onClick={onGenerate}
            className="
              hidden gap-2 rounded-full px-3 text-sm sm:inline-flex
              text-foreground
              hover:bg-muted/70 hover:text-foreground
              focus-visible:ring-2 focus-visible:ring-brand/40
            ">
            <Sparkles className="h-4 w-4 text-brand" />
            Generate
          </Button>

          {/* Icon buttons */}
          <IconButton label="Preview" onClick={onPreview}>
            <Eye />
          </IconButton>

          <IconButton label="Settings" onClick={onSettings}>
            <Settings />
          </IconButton>

          {/* Save */}
          <Button
            variant="secondary"
            onClick={onSave}
            className="rounded-full px-4 text-sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>

          {/* Publish */}
          <Button
            onClick={onPublish}
            className="
              rounded-full px-4 text-sm text-white
              bg-brand-gradient shadow-sm
              hover:opacity-95
            ">
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* soft divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/70 to-transparent" />
    </header>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={onClick}
      className="
        rounded-full
        text-foreground
        hover:bg-muted/70
        hover:text-foreground
        focus-visible:ring-2 focus-visible:ring-brand/40
      ">
      {children}
    </Button>
  );
}
