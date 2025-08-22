// lib/site.ts
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://formquill.com"
    : "http://localhost:3000");

/** Ensure there’s always a scheme for new URL(...) */
function withScheme(u: string) {
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export const SITE = {
  name: "FormQuill",
  url: withScheme(rawUrl),
  description:
    "FormQuill is the AI-forward form builder that ships classic and conversational forms, Google Sheets sync, and bottleneck analytics—without the enterprise bloat.",
  taglines: ["Smart forms, simpler work.", "Forms that speak clearly."],
  ogImage: "/og/default.png", // can be relative since you use metadataBase
  keywords: [
    "form builder",
    "conversational forms",
    "AI forms",
    "Google Sheets forms",
    "survey",
    "Typeform alternative",
    "Formstack alternative",
  ],
  twitter: "@formquill",
} as const;
