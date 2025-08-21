import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-card/30 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center gap-2 md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-soft">
              <span className="text-sm font-bold text-white">FQ</span>
            </div>
            <span className="text-xl font-bold">FormQuill</span>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <Link
              href="/support"
              className="transition-colors hover:text-primary">
              Support
            </Link>
          </div>
        </div>

        <div className="mt-8 hr-gradient" />
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} VitaNova Designs All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
