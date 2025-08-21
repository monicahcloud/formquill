import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-soft">
              <span className="text-sm font-bold text-white">FQ</span>
            </div>
            <span className="text-xl font-bold">FormQuill</span>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/templates"
              className="text-md font-medium text-muted-foreground transition-colors hover:text-primary">
              Templates
            </Link>
            <a
              href="#pricing"
              className="text-md font-medium text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </a>
            <a
              href="#features"
              className="text-md font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-brand-gradient text-white hover:opacity-95">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hr-gradient" />
    </nav>
  );
}
