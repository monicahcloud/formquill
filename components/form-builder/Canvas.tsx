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
};

export default function Canvas({ formName, isConversational }: CanvasProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-2xl p-6 md:p-8">
        <Card className="rounded-2xl border border-border/60 bg-white/70 shadow-sm backdrop-blur-md dark:bg-neutral-950/50">
          {/* soft gradient header */}
          <CardHeader className="rounded-t-2xl bg-gradient-to-r from-teal-50/70 via-cyan-50/70 to-blue-50/70 dark:from-teal-900/20 dark:via-cyan-900/20 dark:to-blue-900/20">
            <CardTitle className="text-center text-xl font-semibold">
              {formName}
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Please fill out this form to get started
            </p>
          </CardHeader>

          <CardContent className="space-y-6 p-6 md:p-8">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                className="h-10 rounded-lg border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-10 rounded-lg border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="h-10 rounded-lg border-0 bg-background/70 ring-1 ring-inset ring-border/60 focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>

            {/* Radios as soft cards */}
            <div className="space-y-2">
              <Label>How did you hear about us?</Label>
              <RadioGroup defaultValue="social" className="grid gap-2">
                <label
                  htmlFor="r-social"
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-border/60 bg-background/60 px-3 py-2 transition-colors hover:bg-muted/60">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="r-social" value="social" />
                    <span>Social Media</span>
                  </div>
                </label>

                <label
                  htmlFor="r-friend"
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-border/60 bg-background/60 px-3 py-2 transition-colors hover:bg-muted/60">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="r-friend" value="friend" />
                    <span>Friend Referral</span>
                  </div>
                </label>

                <label
                  htmlFor="r-google"
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-border/60 bg-background/60 px-3 py-2 transition-colors hover:bg-muted/60">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="r-google" value="google" />
                    <span>Google Search</span>
                  </div>
                </label>
              </RadioGroup>
            </div>

            {/* Conversational hint */}
            {isConversational && (
              <div className="flex items-start gap-3 rounded-xl border border-teal-200/60 bg-teal-50/70 p-4 text-teal-900 dark:border-teal-800/40 dark:bg-teal-900/20 dark:text-teal-200">
                <MessageSquare className="mt-0.5 h-5 w-5" />
                <p className="text-sm font-medium">
                  💬 Conversational mode enabled — one question at a time
                </p>
              </div>
            )}

            {/* CTA */}
            <Button className="w-full rounded-full bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.98]">
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
