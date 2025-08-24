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
import type { FieldType } from "@/components/form-builder/types";
import TopBar from "@/components/form-builder/TopBar";

// Centralized field types
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

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      <TopBar
        formName={formName}
        onNameChange={setFormName}
        isConversational={isConversational}
        onToggleConversational={setIsConversational}
        onGenerate={() => {
          /* TODO: open AI modal */
        }}
        onPreview={() => {
          /* TODO */
        }}
        onSettings={() => {
          /* TODO */
        }}
        onSave={() => {
          /* TODO: persist draft */
        }}
        onPublish={() => {
          /* TODO: publish */
        }}
      />

      <div className="flex min-h-0 flex-1">
        <FieldPalette fields={fieldTypes} onSelect={setSelectedField} />

        <Canvas formName={formName} isConversational={isConversational} />

        <SettingsPanel />
      </div>

      {selectedField && <SelectedFieldHint label={selectedField.label} />}
    </div>
  );
}
