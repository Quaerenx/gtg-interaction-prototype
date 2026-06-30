import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CompanyOverview } from "@/components/sections/company-overview";
import { ContactSection } from "@/components/sections/contact-section";
import { EngagementModel } from "@/components/sections/engagement-model";
import { HeroExperience } from "@/components/sections/hero-experience";
import { SolutionPreview } from "@/components/sections/solution-preview";

type HomeSearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Home({
  searchParams
}: {
  searchParams?: HomeSearchParams;
}) {
  const params = searchParams ? await searchParams : {};
  const forceFallback = params.forceFallback === "1";

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroExperience forceFallback={forceFallback} />
        <SolutionPreview />
        <CompanyOverview />
        <EngagementModel />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
