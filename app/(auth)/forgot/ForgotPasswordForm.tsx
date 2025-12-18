"use client";

import { useActionState } from "react";
import type { ActionState } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";
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
          Sending…
        </span>
      ) : (
        "Send reset link"
      )}
    </Button>
  );
}

export default function ForgotPasswordForm({
  action,
}: {
  action: (_prev: ActionState, fd: FormData) => Promise<ActionState>;
}) {
  const [state, formAction] = useActionState(action, { ok: false });

  return (
    <form action={formAction} className="space-y-5">
      {state.ok ? (
        <div className="flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
          <CheckCircle2 className="mt-[1px] h-4 w-4" />
          <span className="leading-5">
            If an account exists for that email, we sent a reset link.
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
        <Label htmlFor="email" className="text-[0.85rem] text-foreground">
          Email
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            className="pl-9"
          />
        </div>
      </div>

      <SubmitButton />

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/signin" className="underline text-foreground">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
