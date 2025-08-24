"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Filter, Download } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
  dateLabel?: string;
  onDateClick?: () => void;
  onFilterClick?: () => void;
  onExportClick?: () => void;
};

export default function AnalyticsHeader({
  title = "Analytics",
  subtitle = "Track performance and optimize your forms",
  dateLabel = "Last 30 Days",
  onDateClick,
  onFilterClick,
  onExportClick,
}: Props) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="gap-2 rounded-lg border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          onClick={onDateClick}>
          <Calendar className="h-4 w-4" />
          {dateLabel}
        </Button>
        <Button
          variant="outline"
          className="gap-2 rounded-lg border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          onClick={onFilterClick}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button
          className="gap-2 rounded-lg bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white shadow-sm hover:opacity-95"
          onClick={onExportClick}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
