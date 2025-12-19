"use client";

import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const COLOR_PRESETS = [
  { name: "Violet", value: "#7C3AED" },
  { name: "Indigo", value: "#4F46E5" },
  { name: "Blue", value: "#2563EB" },
  { name: "Teal", value: "#0D9488" },
] as const;

const ICON_PRESETS = [
  "✨",
  "📄",
  "💬",
  "🧾",
  "📋",
  "🧠",
  "💇‍♀️",
  "🏡",
  "🍽️",
  "🧑‍⚕️",
] as const;

type SettingsPanelProps = {
  heroIcon: string;
  heroImageUrl: string;
  onHeroIconChange: (v: string) => void;
  onHeroImageUrlChange: (v: string) => void;
};

export default function SettingsPanel({
  heroIcon,
  heroImageUrl,
  onHeroIconChange,
  onHeroImageUrlChange,
}: SettingsPanelProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  function pickFile() {
    fileRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // simple guard: images only
    if (!file.type.startsWith("image/")) return;

    // local preview URL (Phase 1)
    const url = URL.createObjectURL(file);
    onHeroImageUrlChange(url);
  }

  return (
    <aside
      className="
        relative w-80 overflow-y-auto
        bg-white/60 backdrop-blur-md dark:bg-neutral-950/40
        supports-[backdrop-filter]:bg-white/50
      ">
      <div className="p-4">
        <Tabs defaultValue="field" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-background/60 p-1 ring-1 ring-inset ring-border/60">
            {["field", "logic", "design"].map((k) => (
              <TabsTrigger
                key={k}
                value={k}
                className="
                  rounded-full text-[13px]
                  data-[state=active]:bg-white/80
                  data-[state=active]:text-foreground
                  data-[state=active]:shadow-sm
                  dark:data-[state=active]:bg-neutral-950/60
                ">
                {k[0].toUpperCase() + k.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="field" className="mt-4 space-y-4">
            <h3 className="text-[15px] font-semibold">Field Settings</h3>

            <Section>
              <Field>
                <Label>Field Label</Label>
                <Input
                  placeholder="Enter field label"
                  className="h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </Field>

              <Field>
                <Label>Placeholder</Label>
                <Input
                  placeholder="Enter placeholder text"
                  className="h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </Field>

              <div className="flex items-center justify-between rounded-xl bg-background/60 px-3 py-2 ring-1 ring-inset ring-border/60">
                <Label className="text-sm">Required Field</Label>
                <Switch />
              </div>

              <Field>
                <Label>Help Text</Label>
                <Input
                  placeholder="Additional instructions"
                  className="h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </Field>
            </Section>
          </TabsContent>

          <TabsContent value="logic" className="mt-4 space-y-3">
            <h3 className="text-[15px] font-semibold">Conditional Logic</h3>
            <p className="text-sm text-muted-foreground">
              Show or hide fields based on user responses.
            </p>

            <Section>
              <Button
                variant="ghost"
                className="w-full rounded-full bg-background/40 hover:bg-muted/60">
                Add Logic Rule
              </Button>
            </Section>
          </TabsContent>

          <TabsContent value="design" className="mt-4 space-y-4">
            <h3 className="text-[15px] font-semibold">Form Design</h3>

            <Section>
              {/* ✅ Icon / Logo */}
              <div className="space-y-2">
                <Label>Template Icon / Logo</Label>

                <div className="flex items-center gap-3 rounded-2xl bg-background/60 p-3 ring-1 ring-inset ring-border/60">
                  <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-primary/10">
                    {heroImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={heroImageUrl}
                        alt="Icon preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl leading-none">
                        {heroIcon || "✨"}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Use an emoji or upload an image. Image takes priority.
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        className="rounded-full"
                        onClick={pickFile}>
                        Upload image
                      </Button>

                      {heroImageUrl ? (
                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-full"
                          onClick={() => onHeroImageUrlChange("")}>
                          Remove image
                        </Button>
                      ) : null}
                    </div>

                    {/* hidden file input */}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onFileChange}
                    />
                  </div>
                </div>

                {/* Emoji presets */}
                <div className="flex flex-wrap gap-2">
                  {ICON_PRESETS.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      className={`
                        grid h-10 w-10 place-items-center rounded-2xl
                        bg-background/60 ring-1 ring-inset ring-border/60
                        transition hover:bg-muted/50
                        ${heroImageUrl ? "opacity-50" : ""}
                      `}
                      onClick={() => {
                        onHeroImageUrlChange(""); // switch back to emoji mode
                        onHeroIconChange(ic);
                      }}
                      title={`Use ${ic}`}
                      aria-label={`Use ${ic}`}>
                      <span className="text-lg">{ic}</span>
                    </button>
                  ))}
                </div>

                {/* Optional: direct URL field (useful once you store uploads on Supabase/S3) */}
                <Field>
                  <Label>Image URL (optional)</Label>
                  <Input
                    value={heroImageUrl}
                    onChange={(e) => onHeroImageUrlChange(e.target.value)}
                    placeholder="https://..."
                    className="h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste a hosted image URL to use as the icon/logo.
                  </p>
                </Field>
              </div>

              {/* Primary color (you can wire this into Canvas later the same way) */}
              <div>
                <Label>Primary Color</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      aria-label={c.name}
                      title={c.name}
                      className="h-8 w-8 rounded-xl ring-1 ring-inset ring-border/60 hover:opacity-90"
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-background/60 px-3 py-2 ring-1 ring-inset ring-border/60">
                <Label className="text-sm">Show Logo</Label>
                <Switch />
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/70 to-transparent" />
    </aside>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-2xl bg-background/50 p-3 ring-1 ring-inset ring-border/60 shadow-sm">
      {children}
    </div>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5">{children}</div>;
}
