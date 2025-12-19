"use client";

export default function SelectedFieldHint({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-white/60 px-4 py-3 text-center text-[14px] text-muted-foreground shadow-sm backdrop-blur-md dark:bg-neutral-950/40">
      Click anywhere in the form to add a{" "}
      <span className="font-semibold text-foreground">{label}</span> field
    </div>
  );
}
