import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CompanyOverview } from "@/components/sections/company-overview";
import { ContactSection } from "@/components/sections/contact-section";
import { CustomerProofBand } from "@/components/sections/customer-proof-band";
import { EngagementModel } from "@/components/sections/engagement-model";
import { HeroExperience } from "@/components/sections/hero-experience";
import { SolutionSequence } from "@/components/sections/solution-sequence";
import { SolutionsHandoff } from "@/components/sections/solutions-handoff";

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
      <main id="main-content" tabIndex={-1}>
        <HeroExperience forceFallback={forceFallback} />
        <CustomerProofBand />
        <SolutionsHandoff />
        <SolutionSequence />
        <CompanyOverview />
        <EngagementModel />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
