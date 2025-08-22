"use client";

import { useActionState, useState } from "react";
import type { ActionState } from "./action"; // type-only import is safe
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

function Field(props: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  right?: React.ReactNode;
  required?: boolean;
}) {
  const {
    label,
    id,
    name,
    type = "text",
    placeholder,
    leftIcon: LeftIcon,
    right,
    required,
  } = props;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
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
          Signing in…
        </span>
      ) : (
        label
      )}
    </Button>
  );
}

export default function SignInForm({
  action,
  next,
}: {
  action: (_prev: ActionState, fd: FormData) => Promise<ActionState>;
  next?: string;
}) {
  const [state, formAction] = useActionState(action, { error: undefined });
  const [showPw, setShowPw] = useState(false);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={next ?? ""} />

      {state?.error ? (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </div>
      ) : null}

      <Field
        label="Username or email"
        id="identifier"
        name="identifier"
        placeholder="yourname or you@company.com"
        leftIcon={User}
        required
      />

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            required
            className="pl-9 pr-10"
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
        <div className="flex justify-end">
          <Link
            href="/forgot"
            className="text-xs text-muted-foreground underline hover:text-foreground">
            Forgot your password?
          </Link>
        </div>
      </div>

      <SubmitButton label="Sign in" />
    </form>
  );
}
