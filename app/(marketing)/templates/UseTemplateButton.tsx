// app/(marketing)/templates/UseTemplateButton.tsx
"use client";

import { createFormFromMarketingTemplate } from "@/app/(app)/app/actions/template.actions";

export default function UseTemplateButton({
  templateId,
}: {
  templateId: number;
}) {
  return (
    <form action={createFormFromMarketingTemplate}>
      <input type="hidden" name="templateId" value={templateId} />

      <button className="btn btn--primary" type="submit">
        Use Template
      </button>
    </form>
  );
}
