export type TrendTone = "success" | "warning" | "neutral";

export type FunnelStep = {
  step: string;
  count: number;
  percentage: number; // 0–100
};

export type BottleneckItem = {
  field: string;
  dropRate: number; // %
  position: string; // e.g. "Step 4"
};
