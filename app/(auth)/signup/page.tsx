import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import { signUpAction } from "./actions";

export const runtime = "nodejs";

export default async function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-md items-center px-6 py-16">
      <div className="w-full">
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
            3-day free trial
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No credit card required.
          </p>
        </div>

        <Card className="border border-border/60 shadow-sm">
          <CardContent className="p-6">
            <SignUpForm action={signUpAction} />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-foreground underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
