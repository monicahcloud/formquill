import "server-only";
import { aiFormDraftSchema, type AiFormDraft } from "./schema";

export async function generateFormFromPrompt(
  prompt: string
): Promise<AiFormDraft> {
  // For MVP: keep it simple; plug your provider here.
  // You can start by returning a deterministic template if AI_KEY not set.
  const key = process.env.AI_API_KEY;

  if (!key) {
    // Dev fallback — deterministic output
    const draft = {
      title: "Client Intake",
      description: "Quick intake to understand your needs.",
      settings: {
        renderer: "classic",
        successMessage: "Thanks! We received your response.",
      },
      fields: [
        {
          id: crypto.randomUUID(),
          type: "text",
          label: "Full name",
          name: "full_name",
          required: true,
        },
        {
          id: crypto.randomUUID(),
          type: "email",
          label: "Email",
          name: "email",
          required: true,
        },
        {
          id: crypto.randomUUID(),
          type: "textarea",
          label: "What do you need help with?",
          name: "notes",
          required: false,
        },
      ],
    };
    return aiFormDraftSchema.parse(draft);
  }

  // TODO: Implement provider call (OpenAI/Anthropic/etc) returning JSON.
  // Keep strict parse below — never trust raw model output.
  const raw = await fakeCall(prompt); // replace
  return aiFormDraftSchema.parse(raw);
}

// placeholder so TS compiles while you wire provider
async function fakeCall(_prompt: string) {
  // simulate latency + acknowledge input
  await new Promise((r) => setTimeout(r, 200));

  return {
    title: `AI Draft: ${_prompt.slice(0, 40) || "Form"}`,
    description: "",
    settings: {
      renderer: "classic",
      successMessage: "Thanks! We received your response.",
    },
    fields: [
      {
        id: crypto.randomUUID(),
        type: "text",
        label: "Example",
        name: "example",
        required: true,
      },
    ],
  };
}
