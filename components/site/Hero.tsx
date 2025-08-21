import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      {/* background: subtle grid + gradient blobs */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-gradient blur-3xl opacity-40 animate-floaty" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-brand-gradient blur-3xl opacity-30 animate-floaty" />

      <div className="relative mx-auto max-w-7xl text-center">
        <Badge
          variant="outline"
          className="mb-6 border-primary/20 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] badge-glow">
          ✨ Now with AI-powered features
        </Badge>

        <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
          <span className="text-brand-gradient">Forms + Flows</span>, now with
          AI
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Generate forms from prompts, ship in minutes, and see where people
          drop off—classic or conversational.
        </p>

        <div className="mb-14 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button
              size="lg"
              className="gap-2 bg-brand-gradient text-white shadow-strong hover:opacity-95">
              Start Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/templates">
            <Button size="lg" variant="outline" className="gap-2 ">
              View Templates <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-4 rounded-2xl bg-brand-gradient opacity-60 blur-xl" />
          <div className="relative rounded-xl border bg-background/80 shadow-strong">
            <Image
              src="/hero-mockup.png"
              alt="FormQuill form builder interface"
              width={1600}
              height={900}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
