import { Card, CardContent } from "@/components/ui/card";
import ResetPasswordForm from "./ResetPasswordForm";
import { resetPasswordAction } from "./actions";

export const runtime = "nodejs";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token ?? "";

  return (
    <main className="grid min-h-[100svh] place-items-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Set a new password
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a strong password you don’t use elsewhere.
          </p>
        </div>

        <Card className="border border-border/60 shadow-sm">
          <CardContent className="p-6">
            <ResetPasswordForm action={resetPasswordAction} token={token} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
