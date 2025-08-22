// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Ensure SITE.url has a scheme for new URL(...) */
function normalizeUrl(u?: string) {
  if (!u || typeof u !== "string") return "http://localhost:3000";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}
const baseUrl = normalizeUrl(SITE.url);

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE.name} — ${SITE.taglines?.[0] ?? "Build forms fast"}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  alternates: { canonical: "/" },
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: baseUrl,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.twitter || undefined,
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-a`}>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: SITE.name,
                url: baseUrl,
                logo: `${baseUrl}/icon.svg`,
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE.name,
                url: baseUrl,
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${baseUrl}/search?q={query}`,
                  "query-input": "required name=query",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                applicationCategory: "BusinessApplication",
                name: SITE.name,
                operatingSystem: "Web",
                description: SITE.description,
                offers: { "@type": "Offer", price: "19", priceCurrency: "USD" },
              },
            ]),
          }}
        />
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
