export type FieldTypeId =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "file"
  | "rating";

export type FieldType = {
  type: FieldTypeId;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
