import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.taglines[0]}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  alternates: { canonical: "/" },
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.twitter || undefined, // include only if you have one
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
  // Simple theme/palette toggles via body classes:
  // - "dark" for dark mode; "theme-b" for Palette B (optional)
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-a`}>
        {/* JSON-LD: Organization + WebSite + SoftwareApplication (SaaS) */}
        <script
          type="application/ld+json"
          // @ts-expect-error — injecting JSON-LD via dangerouslySetInnerHTML on <script> is intentional
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: SITE.name,
                url: SITE.url,
                logo: `${SITE.url}/icon.svg`,
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE.name,
                url: SITE.url,
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${SITE.url}/search?q={query}`,
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

        {children}
      </body>
    </html>
  );
}
