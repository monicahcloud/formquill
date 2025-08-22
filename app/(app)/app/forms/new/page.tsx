"use client";

import { useState } from "react";
import {
  Save,
  Eye,
  Send,
  Settings,
  Sparkles,
  Type,
  Mail,
  Phone,
  Hash,
  FileText,
  ChevronDown,
  Calendar,
  Upload,
  Star,
  CheckSquare,
  Radio as RadioIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const fieldTypes = [
  { type: "text", label: "Text Input", icon: Type },
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "number", label: "Number", icon: Hash },
  { type: "textarea", label: "Long Text", icon: FileText },
  { type: "select", label: "Dropdown", icon: ChevronDown },
  { type: "radio", label: "Multiple Choice", icon: RadioIcon },
  { type: "checkbox", label: "Checkboxes", icon: CheckSquare },
  { type: "date", label: "Date Picker", icon: Calendar },
  { type: "file", label: "File Upload", icon: Upload },
  { type: "rating", label: "Rating", icon: Star },
];

export default function NewFormPage() {
  const [formName, setFormName] = useState("New Client Intake");
  const [selectedField, setSelectedField] = useState<{ label: string } | null>(
    null
  );
  const [isConversational, setIsConversational] = useState(false);

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      {" "}
      {/* minus navbar */}
      {/* Top Bar */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="min-w-[200px] border-none bg-transparent text-lg font-semibold focus-visible:ring-0"
            />
            <Badge variant="outline">Draft</Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="mr-4 flex items-center gap-2">
              <Label htmlFor="conversational-mode" className="text-sm">
                Conversational
              </Label>
              <Switch
                id="conversational-mode"
                checked={isConversational}
                onCheckedChange={setIsConversational}
              />
            </div>

            <Button variant="outline" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Form
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button size="sm" className="gradient-primary">
              <Send className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        {/* Left Sidebar */}
        <aside className="w-80 overflow-y-auto border-r bg-card/30">
          <div className="p-4">
            <h2 className="mb-4 font-semibold">Add Fields</h2>
            <div className="space-y-2">
              {fieldTypes.map((field) => {
                const Icon = field.icon;
                return (
                  <button
                    key={field.type}
                    className="transition-smooth w-full rounded-lg border bg-background/50 p-3 text-left hover:bg-muted"
                    onClick={() => setSelectedField(field)}>
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{field.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Canvas */}
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="mx-auto max-w-2xl p-8">
            <Card className="shadow-medium">
              <CardHeader className="gradient-card">
                <CardTitle className="text-center">{formName}</CardTitle>
                <p className="text-center text-muted-foreground">
                  Please fill out this form to get started
                </p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>How did you hear about us?</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="source" className="h-4 w-4" />
                      <span>Social Media</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="source" className="h-4 w-4" />
                      <span>Friend Referral</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="source" className="h-4 w-4" />
                      <span>Google Search</span>
                    </label>
                  </div>
                </div>

                {isConversational && (
                  <div className="rounded-lg border border-accent/20 bg-accent/10 p-4">
                    <p className="text-sm font-medium text-accent-foreground">
                      💬 Conversational mode enabled — one question at a time
                    </p>
                  </div>
                )}

                <Button className="w-full">Submit</Button>
              </CardContent>
            </Card>

            {selectedField && (
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium text-primary">
                  Click anywhere in the form to add a {selectedField.label}{" "}
                  field
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 overflow-y-auto border-l bg-card/30">
          <div className="p-4">
            <Tabs defaultValue="field" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="field">Field</TabsTrigger>
                <TabsTrigger value="logic">Logic</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>

              <TabsContent value="field" className="mt-4 space-y-4">
                <h3 className="font-semibold">Field Settings</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Field Label</Label>
                    <Input placeholder="Enter field label" />
                  </div>
                  <div>
                    <Label>Placeholder</Label>
                    <Input placeholder="Enter placeholder text" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Required Field</Label>
                    <Switch />
                  </div>
                  <div>
                    <Label>Help Text</Label>
                    <Input placeholder="Additional instructions" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logic" className="mt-4 space-y-4">
                <h3 className="font-semibold">Conditional Logic</h3>
                <p className="text-sm text-muted-foreground">
                  Show or hide fields based on user responses
                </p>
                <Button variant="outline" className="w-full">
                  Add Logic Rule
                </Button>
              </TabsContent>

              <TabsContent value="design" className="mt-4 space-y-4">
                <h3 className="font-semibold">Form Design</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Primary Color</Label>
                    <div className="mt-2 flex gap-2">
                      <div className="h-8 w-8 cursor-pointer rounded border border-border bg-primary" />
                      <div className="h-8 w-8 cursor-pointer rounded border border-border bg-accent" />
                      <div className="h-8 w-8 cursor-pointer rounded border border-border bg-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Logo</Label>
                    <Switch />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </aside>
      </div>
    </div>
  );
}
