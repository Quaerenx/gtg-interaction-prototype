import type { MetadataRoute } from "next";
import { seoContent, siteContent } from "@/content/site";

function isProductionEnvironment() {
  return (
    process.env.VERCEL_ENV === "production" ||
    (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_ENV === "production")
  );
}

function allowIndexing() {
  return isProductionEnvironment() && siteContent.isApproved;
}

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${seoContent.canonical.replace(/\/$/, "")}/sitemap.xml`
  };
}
