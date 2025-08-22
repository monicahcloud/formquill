// app/(auth)/signup/page.tsx
import { Card, CardContent } from "@/components/ui/card";

import { signUpAction } from "./actions";
import SignUpForm from "./SignUpForm";

export const runtime = "nodejs";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next =
    typeof searchParams?.next === "string" ? searchParams.next : undefined;
  return (
    <main className="min-h-screen grid place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
            Create your account
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Start your{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              3-day
            </span>{" "}
            free trial
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No credit card required.
          </p>
        </div>

        {/* Gradient frame + glassy card */}
        <div className="rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/30 to-[hsl(var(--accent))]/30 p-[1px] shadow-[0_10px_30px_-12px_rgba(0,0,0,.25)]">
          <Card className="rounded-[calc(1rem-1px)] border border-border/60 bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <SignUpForm action={signUpAction} next={next} />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-medium text-foreground underline">
                  Sign in
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          🔒 Your data is encrypted at rest and in transit.
        </p>
      </div>
    </main>
  );
}
