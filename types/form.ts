export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export type Field = {
  id: string;
  type: FieldType;
  label: string;
  name: string; // key in submission payload
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { label: string; value: string }[]; // for select/radio/checkbox
};

export type FormSettings = {
  renderer: "classic" | "chat";
  successMessage?: string;
};

export type FormDTO = {
  id: string;
  title: string;
  slug: string; // public path: /f/[slug]
  fields: Field[];
  settings: FormSettings;
};
