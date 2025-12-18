import { Card, CardContent } from "@/components/ui/card";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { forgotPasswordAction } from "./actions";

export const runtime = "nodejs";

export default function ForgotPage() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Reset your password
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <Card className="border border-border/60 shadow-sm">
          <CardContent className="p-6">
            <ForgotPasswordForm action={forgotPasswordAction} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
