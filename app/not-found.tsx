import Link from "next/link";
import ErrorShell from "@/components/site/ErrorShell";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <ErrorShell
      badge="404 — Page not found"
      title="We couldn’t find that page"
      message="The link might be broken or the page may have been moved."
      actions={
        <>
          <Button asChild className="bg-brand-gradient hover:opacity-95">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/templates">Browse Templates</Link>
          </Button>
        </>
      }>
      {/* Uses /public/notfound.svg */}
      <div className="mt-6 flex justify-center">
        <Image
          src="/notfound.svg"
          alt="Page not found illustration"
          width={420}
          height={220}
          priority
          sizes="(max-width: 768px) 320px, 420px"
          className="h-auto w-[320px] md:w-[420px]"
        />
      </div>
    </ErrorShell>
  );
}
