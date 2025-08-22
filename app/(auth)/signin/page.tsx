// app/(auth)/signin/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import SignInForm from "./SignInForm";
import Link from "next/link";
import { signInAction } from "./action";

export const runtime = "nodejs";

export default function SignInPage({
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
            Welcome back
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sign in to FormQuill
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Continue where you left off.
          </p>
        </div>

        {/* Gradient frame + glassy card */}
        <div className="rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/30 to-[hsl(var(--accent))]/30 p-[1px] shadow-[0_10px_30px_-12px_rgba(0,0,0,.25)]">
          <Card className="rounded-[calc(1rem-1px)] border border-border/60 bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <SignInForm action={signInAction} next={next} />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-foreground underline">
                  Create an account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Need an account? You’ll get a 3-day free trial when you sign up.
        </p>
      </div>
    </main>
  );
}
