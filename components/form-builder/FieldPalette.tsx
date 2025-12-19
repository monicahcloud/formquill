/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldType } from "./types";

type FieldPaletteProps = {
  fields: FieldType[];
  onSelect: (field: FieldType) => void;
};

const GROUPS = [
  { key: "basic", label: "Basic" },
  { key: "choices", label: "Choices" },
  { key: "advanced", label: "Advanced" },
] as const;

function groupFor(type: FieldType["type"]) {
  if (["text", "email", "phone", "number", "textarea"].includes(type))
    return "basic";
  if (["select", "radio", "checkbox", "rating"].includes(type))
    return "choices";
  return "advanced"; // date, file, etc
}

export default function FieldPalette({ fields, onSelect }: FieldPaletteProps) {
  const [tab, setTab] = useState<(typeof GROUPS)[number]["key"]>("basic");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return fields
      .filter((f) => groupFor(f.type) === tab)
      .filter((f) => (query ? f.label.toLowerCase().includes(query) : true));
  }, [fields, tab, q]);

  return (
    <aside
      className="
        relative w-[340px] shrink-0 overflow-y-auto
        bg-white/60 backdrop-blur-md dark:bg-neutral-950/40
        supports-[backdrop-filter]:bg-white/50
      ">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-50">
            Add fields
          </h2>
          <p className="text-sm text-muted-foreground">
            Search, then click to insert.
          </p>
        </div>

        {/* Tabs (like SettingsPanel) */}
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-background/60 p-1 ring-1 ring-inset ring-border/60">
            {GROUPS.map((g) => (
              <TabsTrigger
                key={g.key}
                value={g.key}
                className="
                     rounded-full text-[13px]
                  data-[state=active]:bg-white/80
                  data-[state=active]:text-foreground
                  data-[state=active]:shadow-sm
                  dark:data-[state=active]:bg-neutral-950/60
                ">
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="mt-4">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search fields…"
            className="
              h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500
            "
          />
        </div>

        {/* Section container (matches SettingsPanel Section) */}
        <div className="mt-4 space-y-2 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-200 dark:bg-neutral-900/30 dark:ring-neutral-800">
          {filtered.length === 0 ? (
            <div className="rounded-xl bg-white/70 p-3 text-sm text-muted-foreground ring-1 ring-border/60 dark:bg-neutral-950/30">
              No matches. Try a different search.
            </div>
          ) : (
            filtered.map((field) => {
              const Icon = field.icon;
              return (
                <button
                  key={field.type}
                  type="button"
                  onClick={() => onSelect(field)}
                  className="
                    group flex w-full items-center gap-3 rounded-xl
                    bg-white/70 px-3 py-2.5 text-left
                    ring-1 ring-inset ring-border/60
                    transition-colors hover:bg-muted/60
                    active:scale-[0.99]
                    dark:bg-neutral-950/30
                  ">
                  <span
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                      bg-gradient-to-b from-neutral-100 to-neutral-200 text-muted-foreground
                      dark:from-neutral-800 dark:to-neutral-700
                      group-hover:text-foreground
                    ">
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-50">
                      {field.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {field.type}
                    </div>
                  </div>

                  <div className="ml-auto">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="rounded-full px-3 hover:bg-cyan-100 hover:text-purple-800 dark:hover:bg-neutral-800"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelect(field);
                      }}>
                      Add
                    </Button>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Tip card (soft) */}
        <div className="mt-4 rounded-xl bg-white/70 p-3 text-sm text-muted-foreground ring-1 ring-border/60 dark:bg-neutral-950/30">
          Tip: Toggle <span className="font-medium">Conversational</span> mode
          in the top bar to ask one question at a time.
        </div>
      </div>

      {/* subtle divider */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-200/70 to-transparent dark:via-neutral-800/60" />
    </aside>
  );
}
