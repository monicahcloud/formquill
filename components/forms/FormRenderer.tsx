"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormDTO, Field } from "@/types/form";

/** Renders a public form and posts JSON to /api/forms/:id/submit */
export default function FormRenderer({ form }: { form: FormDTO }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // local state for shadcn controls (so we can submit via hidden inputs)
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});
  const [radioValues, setRadioValues] = useState<Record<string, string>>({});
  const [checkboxValues, setCheckboxValues] = useState<
    Record<string, string[]>
  >({});

  const requiredByName = useMemo(() => {
    const map: Record<string, boolean> = {};
    form.fields.forEach((f) => (map[f.name] = !!f.required));
    return map;
  }, [form.fields]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // minimal client validation for selects/radios (since hidden inputs can’t be required)
    for (const [name, required] of Object.entries(requiredByName)) {
      if (!required) continue;
      // prefer FormData first
      const fd = new FormData(e.currentTarget);
      const val = fd.getAll(name);
      if (val.length === 0 || val.every((v) => `${v}`.trim() === "")) {
        setError("Please complete all required fields.");
        // focus first missing control if possible
        const el = e.currentTarget.querySelector<HTMLElement>(
          `[name="${name}"], [data-name="${name}"]`
        );
        el?.focus?.();
        return;
      }
    }

    setPending(true);

    // collect payload
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {};
    for (const [key, value] of fd.entries()) {
      if (payload[key] === undefined) payload[key] = value;
      else {
        const prev = payload[key];
        payload[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
      }
    }

    const res = await fetch(`/api/forms/${form.id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });

    setPending(false);
    if (res.ok) setDone(true);
    else setError((await res.json()).error ?? "Submission failed");
  }

  if (done) {
    return (
      <div className="rounded-lg border p-6">
        <p>
          ✅{" "}
          {form.settings.successMessage ?? "Thanks! We received your response."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {form.fields.map((f) => (
        <FieldControl
          key={f.id}
          field={f}
          selectValues={selectValues}
          setSelectValues={setSelectValues}
          radioValues={radioValues}
          setRadioValues={setRadioValues}
          checkboxValues={checkboxValues}
          setCheckboxValues={setCheckboxValues}
        />
      ))}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button
        type="submit"
        disabled={pending}
        className="bg-brand-gradient hover:opacity-95">
        {pending ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
}

/* ---------- Field control ---------- */

function FieldControl(props: {
  field: Field;
  selectValues: Record<string, string>;
  setSelectValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  radioValues: Record<string, string>;
  setRadioValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  checkboxValues: Record<string, string[]>;
  setCheckboxValues: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}) {
  const {
    field,
    selectValues,
    setSelectValues,
    radioValues,
    setRadioValues,
    checkboxValues,
    setCheckboxValues,
  } = props;

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
    case "date":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required ? " *" : ""}
          </Label>
          <Input
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            aria-describedby={field.help ? `${field.id}-help` : undefined}
          />
          {field.help ? (
            <p
              id={`${field.id}-help`}
              className="text-xs text-muted-foreground">
              {field.help}
            </p>
          ) : null}
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required ? " *" : ""}
          </Label>
          <Textarea
            id={field.id}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            aria-describedby={field.help ? `${field.id}-help` : undefined}
          />
          {field.help ? (
            <p
              id={`${field.id}-help`}
              className="text-xs text-muted-foreground">
              {field.help}
            </p>
          ) : null}
        </div>
      );

    case "select": {
      const value = selectValues[field.name] ?? "";
      return (
        <div className="space-y-2">
          <Label>
            {field.label}
            {field.required ? " *" : ""}
          </Label>
          {/* shadcn Select doesn't submit a value; sync to hidden input */}
          <Select
            value={value}
            onValueChange={(v) =>
              setSelectValues((s) => ({ ...s, [field.name]: v }))
            }>
            <SelectTrigger data-name={field.name}>
              <SelectValue placeholder={field.placeholder ?? "Select…"} />
            </SelectTrigger>
            <SelectContent>
              {(field.options ?? []).map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name={field.name} value={value} />
          {field.help ? (
            <p className="text-xs text-muted-foreground">{field.help}</p>
          ) : null}
        </div>
      );
    }

    case "radio": {
      const value = radioValues[field.name] ?? "";
      return (
        <div className="space-y-2">
          <Label>
            {field.label}
            {field.required ? " *" : ""}
          </Label>
          <RadioGroup
            value={value}
            onValueChange={(v) =>
              setRadioValues((s) => ({ ...s, [field.name]: v }))
            }>
            {(field.options ?? []).map((o) => (
              <div key={o.value} className="flex items-center gap-2">
                <RadioGroupItem id={`${field.id}-${o.value}`} value={o.value} />
                <Label htmlFor={`${field.id}-${o.value}`}>{o.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <input type="hidden" name={field.name} value={value} />
          {field.help ? (
            <p className="text-xs text-muted-foreground">{field.help}</p>
          ) : null}
        </div>
      );
    }

    case "checkbox": {
      const values = checkboxValues[field.name] ?? [];
      const toggle = (v: string, checked: boolean) =>
        setCheckboxValues((s) => {
          const curr = new Set(s[field.name] ?? []);
          if (checked) curr.add(v);
          else curr.delete(v);
          return { ...s, [field.name]: Array.from(curr) };
        });

      return (
        <div className="space-y-2">
          <Label>
            {field.label}
            {field.required ? " *" : ""}
          </Label>
          <div className="space-y-2">
            {(field.options ?? []).map((o) => {
              const checked = values.includes(o.value);
              return (
                <label key={o.value} className="flex items-center gap-2">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(c) => toggle(o.value, Boolean(c))}
                    data-name={field.name}
                  />
                  <span>{o.label}</span>
                  {/* Each checkbox writes its own value if checked */}
                  {checked ? (
                    <input type="hidden" name={field.name} value={o.value} />
                  ) : null}
                </label>
              );
            })}
          </div>
          {field.help ? (
            <p className="text-xs text-muted-foreground">{field.help}</p>
          ) : null}
        </div>
      );
    }

    default:
      return null;
  }
}
