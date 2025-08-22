export type SelectOption = { label: string; value: string };
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
  type:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "date";
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  help?: string;
};

export type FormSettings = {
  renderer: "classic" | "chat";
  successMessage?: string;
};

export type FormDTO = {
  id: string;
  title: string;
  slug: string;
  fields: Field[];
  settings: FormSettings;
  createdAt?: string; // use string, not Date, for client components
  updatedAt?: string;
};
