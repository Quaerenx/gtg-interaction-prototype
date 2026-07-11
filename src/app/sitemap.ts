import type { MetadataRoute } from "next";
import { seoContent, siteContent } from "@/content/brand";

function isProductionEnvironment() {
  return (
    process.env.VERCEL_ENV === "production" ||
    (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_ENV === "production")
  );
}

function allowSitemap() {
  return isProductionEnvironment() && siteContent.isApproved;
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowSitemap()) {
    return [];
  }

  return [
    {
      url: seoContent.canonical
    }
  ];
}
