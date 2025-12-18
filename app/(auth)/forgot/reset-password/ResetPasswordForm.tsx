"use client";

import { useActionState, useState } from "react";
import type { ActionState } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-brand-gradient hover:opacity-95 disabled:opacity-70">
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Updating…
        </span>
      ) : (
        "Update password"
      )}
    </Button>
  );
}

export default function ResetPasswordForm({
  action,
  token,
}: {
  action: (_prev: ActionState, fd: FormData) => Promise<ActionState>;
  token: string;
}) {
  const [state, formAction] = useActionState(action, { ok: false });
  const [showPw, setShowPw] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="token" value={token} />

      {state.ok ? (
        <div className="flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
          <CheckCircle2 className="mt-[1px] h-4 w-4" />
          <span className="leading-5">
            Password updated.{" "}
            <Link href="/signin" className="underline text-foreground">
              Sign in
            </Link>
            .
          </span>
        </div>
      ) : null}

      {state.error ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="mt-[1px] h-4 w-4" />
          <span className="leading-5">{state.error}</span>
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="password" className="text-[0.85rem] text-foreground">
          New password
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
            minLength={8}
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
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters.
        </p>
      </div>

      <SubmitButton />
    </form>
  );
}
