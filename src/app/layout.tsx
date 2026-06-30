import type { Metadata } from "next";
import { brandContent, seoContent, siteContent } from "@/content/site";
import "./globals.css";

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
    icon: brandContent.favicon,
    apple: brandContent.favicon
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
