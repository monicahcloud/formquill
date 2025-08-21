import { type LucideIcon, Sparkles, Zap, BarChart3 } from "lucide-react";

export type Feature = { icon: LucideIcon; title: string; description: string };

export const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI Magic",
    description:
      "Generate forms from prompts, auto-summaries, reply drafts, and translate responses.",
  },
  {
    icon: Zap,
    title: "Two Renderers",
    description:
      "Switch between classic multi-field forms and conversational one-question flows.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description:
      "Track completion rates, identify drop-offs, and optimize field bottlenecks.",
  },
];

export const INTEGRATIONS = [
  { name: "Google Sheets", logo: "🔗" },
  { name: "Stripe", logo: "💳" },
  { name: "Webhooks", logo: "⚡" },
  { name: "WordPress", logo: "📝" },
];

export const PRICING_FEATURES = [
  "Unlimited forms",
  "AI-powered features",
  "Advanced analytics",
  "Custom branding",
  "Priority support",
];
