"use client";

import { useActionState, useState } from "react";
import type { ActionState } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function Field({
  label,
  id,
  name,
  type = "text",
  placeholder,
  leftIcon: LeftIcon,
  right,
  required,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  right?: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[0.85rem] text-foreground">
        {label}
      </Label>
      <div className="relative">
        {LeftIcon ? (
          <LeftIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        ) : null}
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={LeftIcon ? "pl-9" : ""}
        />
        {right ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {right}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-brand-gradient hover:opacity-95 disabled:opacity-70">
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Creating…
        </span>
      ) : (
        label
      )}
    </Button>
  );
}

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

export default function SignUpForm({
  action,
  next,
}: {
  action: (_prev: ActionState, fd: FormData) => Promise<ActionState>;
  next?: string;
}) {
  const [state, formAction] = useActionState(action, { error: undefined });
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");

  const s = strength(pw); // 0–4
  const labels = ["Very weak", "Weak", "Okay", "Good", "Strong"];

  return (
    <form action={formAction} className="mx-auto w-full max-w-sm space-y-6">
      <input type="hidden" name="next" value={next ?? "/app"} />

      {state?.error ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="mt-[1px] h-4 w-4" />
          <span className="leading-5">{state.error}</span>
        </div>
      ) : null}

      <Field
        label="Username"
        id="username"
        name="username"
        placeholder="yourname"
        leftIcon={User}
        required
      />

      <Field
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="you@company.com"
        leftIcon={Mail}
        required
      />

      <div className="space-y-2">
        <Label htmlFor="password" className="text-[0.85rem] text-foreground">
          Password
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            required
            className="pl-9 pr-10"
            onChange={(e) => setPw(e.currentTarget.value)}
            aria-describedby="pw-help pw-strength"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute inset-y-0 right-0 mr-2 inline-flex items-center rounded-md p-2 text-muted-foreground hover:text-foreground"
            aria-label={showPw ? "Hide password" : "Show password"}>
            {showPw ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* strength bar + label */}
        <div className="space-y-1">
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-[hsl(var(--accent))] transition-all"
              style={{ width: `${(s / 4) * 100}%` }}
              id="pw-strength"
              aria-hidden
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            {pw ? labels[s] : " "}
          </p>
        </div>

        <p id="pw-help" className="text-xs text-muted-foreground">
          Use at least 8 characters. Stronger with upper/lowercase, numbers &
          symbols.
        </p>
      </div>

      <SubmitButton label="Create account" />

      <p className="text-xs text-muted-foreground">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
