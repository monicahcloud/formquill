"use client";

export default function SelectedFieldHint({ label }: { label: string }) {
  return (
    <div className="mx-auto mt-4 max-w-2xl rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-center text-[14px] text-violet-700">
      Click anywhere in the form to add a{" "}
      <span className="font-semibold">{label}</span> field
    </div>
  );
}
