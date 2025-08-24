"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldType } from "./types";

type FieldPaletteProps = {
  fields: FieldType[];
  onSelect: (field: FieldType) => void;
};

export default function FieldPalette({ fields, onSelect }: FieldPaletteProps) {
  return (
    <aside
      className="
        relative w-80 overflow-y-auto
        bg-white/60 backdrop-blur-md dark:bg-neutral-950/40
        supports-[backdrop-filter]:bg-white/50
      ">
      <div className="px-4 py-4">
        <div className="mb-3">
          <h2 className="text-sm font-semibold tracking-tight">Add Fields</h2>
          <p className="text-xs text-muted-foreground">
            Click to insert into the form
          </p>
        </div>

        <div className="space-y-2">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <Button
                key={field.type}
                variant="ghost"
                onClick={() => onSelect(field)}
                className="
                  group w-full justify-start gap-3
                  rounded-xl px-3 py-2.5
                  bg-background/60 hover:bg-muted/60
                  shadow-sm transition-all active:scale-[0.99]
                ">
                <span
                  className="
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-md
                    bg-gradient-to-b from-neutral-100 to-neutral-200 text-muted-foreground
                    dark:from-neutral-800 dark:to-neutral-700
                    group-hover:text-foreground
                  ">
                  <Icon className="h-4 w-4" />
                </span>

                <span className="font-medium transition-transform group-hover:translate-x-0.5">
                  {field.label}
                </span>
              </Button>
            );
          })}
        </div>

        <Card className="mt-5 bg-background/60 p-3 text-xs text-muted-foreground shadow-sm">
          Tip: You can switch to{" "}
          <span className="font-medium">Conversational</span> mode from the top
          bar to ask questions one at a time.
        </Card>
      </div>

      {/* soft gradient hairline instead of a hard border */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-200/70 to-transparent dark:via-neutral-800/60" />
    </aside>
  );
}
