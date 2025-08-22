"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ErrorShell from "@/components/site/ErrorShell";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You can wire this to your logging if desired

    console.error(error);
  }, [error]);

  return (
    <ErrorShell
      badge="Something went wrong"
      title="Well, that didn’t go as planned"
      message="An unexpected error occurred. You can try again or head back to the homepage."
      actions={
        <>
          <Button
            onClick={reset}
            className="bg-brand-gradient hover:opacity-95">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </>
      }>
      {/* Illustration */}
      <div className="mt-6 flex justify-center">
        <Image
          src="/serverdown.svg" // <-- put your image in /public and update this path
          alt="Something went wrong illustration"
          width={420}
          height={220}
          priority
          sizes="(max-width: 768px) 320px, 420px"
          className="h-auto w-[320px] md:w-[420px]"
        />
      </div>

      {/* Soft details block (collapsed) */}
      <details className="mt-6 rounded-lg border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
        <summary className="cursor-pointer select-none font-medium text-foreground">
          Technical details
        </summary>
        <div className="mt-2 space-y-1">
          {error?.message ? (
            <div>
              <span className="font-medium">Message: </span>
              <span className="break-words">{error.message}</span>
            </div>
          ) : null}
          {error?.digest ? (
            <div className="opacity-80">
              <span className="font-medium">Digest: </span>
              <code className="rounded bg-muted px-1 py-0.5">
                {error.digest}
              </code>
            </div>
          ) : null}
        </div>
      </details>
    </ErrorShell>
  );
}
