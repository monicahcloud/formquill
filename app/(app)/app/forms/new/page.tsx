"use client";

import { useState } from "react";
import {
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

import FieldPalette from "@/components/form-builder/FieldPalette";
import Canvas from "@/components/form-builder/Canvas";
import SettingsPanel from "@/components/form-builder/SettingsPanel";
import SelectedFieldHint from "@/components/form-builder/SelectedFieldHint";
import TopBar from "@/components/form-builder/TopBar";
import type { FieldType } from "@/components/form-builder/types";

const fieldTypes: FieldType[] = [
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
  const [selectedField, setSelectedField] = useState<FieldType | null>(null);
  const [isConversational, setIsConversational] = useState(false);

  // ✅ NEW: design state (Phase 1: local UI state)
  const [heroIcon, setHeroIcon] = useState<string>("✨");
  const [heroImageUrl, setHeroImageUrl] = useState<string>(""); // empty = use emoji

  return (
    <div className="min-h-[calc(100svh-64px)] bg-gradient-to-b from-background to-muted/20">
      <TopBar
        formName={formName}
        onNameChange={setFormName}
        isConversational={isConversational}
        onToggleConversational={setIsConversational}
        onGenerate={() => {}}
        onPreview={() => {}}
        onSettings={() => {}}
        onSave={() => {}}
        onPublish={() => {}}
      />

      <div className="flex min-h-0 flex-1">
        <FieldPalette fields={fieldTypes} onSelect={setSelectedField} />

        <Canvas
          formName={formName}
          isConversational={isConversational}
          heroIcon={heroIcon}
          heroImageUrl={heroImageUrl || undefined}
        />

        <SettingsPanel
          heroIcon={heroIcon}
          heroImageUrl={heroImageUrl}
          onHeroIconChange={setHeroIcon}
          onHeroImageUrlChange={setHeroImageUrl}
        />
      </div>

      {selectedField && (
        <div className="px-4 pb-6">
          <SelectedFieldHint label={selectedField.label} />
        </div>
      )}
    </div>
  );
}
