"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageSquare } from "lucide-react";

type CanvasProps = {
  formName: string;
  isConversational: boolean;

  // NEW: customizable template identity
  heroIcon?: string; // emoji fallback
  heroImageUrl?: string; // client-provided image URL
};

export default function Canvas({
  formName,
  isConversational,
  heroIcon,
  heroImageUrl,
}: CanvasProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-4xl p-6 md:p-8">
        <Card className="overflow-hidden rounded-2xl border border-border/60 bg-white/70 shadow-sm backdrop-blur-md dark:bg-neutral-950/50">
          {/* Soft “template card” style hero */}
          <CardHeader className="relative rounded-t-2xl bg-gradient-to-b from-muted/40 to-transparent pb-5">
            {/* Template icon/logo */}
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-primary/10">
              {heroImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImageUrl}
                  alt="Template icon"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl leading-none">
                  {heroIcon ?? "✨"}
                </span>
              )}
            </div>

            <CardTitle className="text-center text-2xl font-semibold tracking-tight">
              {formName}
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Please fill out this form to get started
            </p>

            {/* Soft divider like templates */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-border/70 to-transparent" />
          </CardHeader>

          <CardContent className="space-y-6 p-6 md:p-8">
            <FieldBlock label="Full Name *">
              <Input
                placeholder="Enter your full name"
                className="h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </FieldBlock>

            <FieldBlock label="Email Address *">
              <Input
                type="email"
                placeholder="you@example.com"
                className="h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </FieldBlock>

            <FieldBlock label="Phone Number">
              <Input
                type="tel"
                placeholder="(555) 555-1234"
                className="h-10 rounded-xl border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </FieldBlock>

            <div className="space-y-2">
              <Label>How did you hear about us?</Label>
              <RadioGroup defaultValue="social" className="grid gap-2">
                <OptionRow id="r-social" value="social" label="Social Media" />
                <OptionRow
                  id="r-friend"
                  value="friend"
                  label="Friend Referral"
                />
                <OptionRow id="r-google" value="google" label="Google Search" />
              </RadioGroup>
            </div>

            {isConversational && (
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/40 p-4">
                <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-foreground">
                  Conversational mode enabled — one question at a time.
                </p>
              </div>
            )}

            {/* Brand gradient matches Templates page */}
            <Button className="w-full rounded-full bg-brand-gradient text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.98]">
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 rounded-2xl border border-border/60 bg-background/40 p-4 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function OptionRow({
  id,
  value,
  label,
}: {
  id: string;
  value: string;
  label: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/60 bg-background/50 px-4 py-3 transition-colors hover:bg-muted/50">
      <RadioGroupItem id={id} value={value} />
      <span className="text-sm">{label}</span>
    </label>
  );
}
