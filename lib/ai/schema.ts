import { z } from "zod";

export const fieldSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  label: z.string().min(1),
  name: z.string().min(1),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  options: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
});

export const aiFormDraftSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional().default(""),
  settings: z.object({
    renderer: z.enum(["classic", "chat"]).default("classic"),
    successMessage: z
      .string()
      .min(3)
      .default("Thanks! We received your response."),
  }),
  fields: z.array(fieldSchema).min(1).max(40),
});

export type AiFormDraft = z.infer<typeof aiFormDraftSchema>;
