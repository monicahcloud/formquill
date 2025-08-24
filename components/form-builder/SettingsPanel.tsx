"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPanel() {
  return (
    <aside className="relative w-80 overflow-y-auto bg-white">
      <div className="p-4">
        <Tabs defaultValue="field" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-neutral-100 p-1">
            {["field", "logic", "design"].map((k) => (
              <TabsTrigger
                key={k}
                value={k}
                className="rounded-full text-[13px] data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm">
                {k[0].toUpperCase() + k.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="field" className="mt-4 space-y-4">
            <h3 className="text-[15px] font-semibold text-neutral-800">
              Field Settings
            </h3>

            <Section>
              <Field>
                <Label>Field Label</Label>
                <Input
                  placeholder="Enter field label"
                  className="h-10 rounded-xl border-neutral-200 bg-white text-[14px] placeholder:text-neutral-400 focus-visible:ring-violet-500"
                />
              </Field>

              <Field>
                <Label>Placeholder</Label>
                <Input
                  placeholder="Enter placeholder text"
                  className="h-10 rounded-xl border-neutral-200 bg-white text-[14px] placeholder:text-neutral-400 focus-visible:ring-violet-500"
                />
              </Field>

              <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-neutral-200">
                <Label className="text-sm">Required Field</Label>
                <Switch />
              </div>

              <Field>
                <Label>Help Text</Label>
                <Input
                  placeholder="Additional instructions"
                  className="h-10 rounded-xl border-neutral-200 bg-white text-[14px] placeholder:text-neutral-400 focus-visible:ring-violet-500"
                />
              </Field>
            </Section>
          </TabsContent>

          <TabsContent value="logic" className="mt-4 space-y-3">
            <h3 className="text-[15px] font-semibold text-neutral-800">
              Conditional Logic
            </h3>
            <p className="text-sm text-neutral-500">
              Show or hide fields based on user responses.
            </p>
            <Section>
              <Button
                variant="ghost"
                className="w-full rounded-full hover:bg-neutral-100">
                Add Logic Rule
              </Button>
            </Section>
          </TabsContent>

          <TabsContent value="design" className="mt-4 space-y-4">
            <h3 className="text-[15px] font-semibold text-neutral-800">
              Form Design
            </h3>
            <Section>
              <div>
                <Label>Primary Color</Label>
                <div className="mt-2 flex gap-2">
                  {["violet-600", "indigo-600", "blue-600", "emerald-500"].map(
                    (c) => (
                      <button
                        key={c}
                        aria-label={c}
                        className={`h-8 w-8 rounded-xl ring-1 ring-inset ring-neutral-200 bg-${c} hover:opacity-90`}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-neutral-200">
                <Label className="text-sm">Show Logo</Label>
                <Switch />
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>

      {/* hairline from content */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[1px] bg-neutral-200/80" />
    </aside>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-200">
      {children}
    </div>
  );
}
function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5">{children}</div>;
}
