import type { Metadata } from "next";
import { brandContent, seoContent, siteContent } from "@/content/brand";
import { withBasePath } from "@/lib/paths";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/sections.css";
import "@/styles/motion.css";
import "@/styles/reduced-mobile.css";

const isProductionEnvironment =
  process.env.VERCEL_ENV === "production" ||
  (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_ENV === "production");
const allowProductionMetadata = isProductionEnvironment && siteContent.isApproved;

if (isProductionEnvironment && !siteContent.isApproved) {
  console.warn(
    "[release-check] GTG content approval is still draft. Production build remains noindex until approval is complete."
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(seoContent.canonical),
  title: seoContent.title,
  description: seoContent.description,
  ...(allowProductionMetadata
    ? {
        alternates: {
          canonical: seoContent.canonical
        }
      }
    : {}),
  robots: {
    index: allowProductionMetadata,
    follow: allowProductionMetadata
  },
  openGraph: {
    title: seoContent.ogTitle,
    description: seoContent.ogDescription,
    ...(allowProductionMetadata ? { url: seoContent.canonical } : {}),
    siteName: brandContent.englishName,
    type: "website",
    locale: "ko_KR"
  },
  twitter: {
    card: "summary",
    title: seoContent.ogTitle,
    description: seoContent.ogDescription
  },
  icons: {
    icon: withBasePath(brandContent.favicon),
    apple: withBasePath(brandContent.favicon)
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteContent.language}>
      <body>{children}</body>
    </html>
  );
}
