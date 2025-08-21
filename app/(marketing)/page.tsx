import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import FeaturesGrid from "@/components/site/FeaturesGrid";
import SocialProof from "@/components/site/SocialProof";
import AiFeatures from "@/components/site/AiFeatures";
import Pricing from "@/components/site/Pricing";
import Footer from "@/components/site/Footer";

import { FEATURES, INTEGRATIONS, PRICING_FEATURES } from "@/lib/landing";

export const dynamic = "force-static";
export const revalidate = 60;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturesGrid features={FEATURES} />
      <div className="px-4">
        <div className="mx-auto max-w-7xl">
          <SocialProof integrations={INTEGRATIONS} />
        </div>
      </div>
      <AiFeatures />
      <Pricing features={PRICING_FEATURES} />
      <Footer />
    </div>
  );
}
