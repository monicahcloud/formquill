// app/(auth)/signin/page.tsx (server)
import { Card, CardContent } from "@/components/ui/card";
import SignInForm from "./SignInForm";
import { signInAction } from "./action"; // your server action

export default function SignInPage() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
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

        <Card className="border border-border/60 shadow-sm">
          <CardContent className="p-6">
            <SignInForm action={signInAction} />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              New here?{" "}
              <a
                href="/signup"
                className="font-medium text-foreground underline">
                Create an account
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
