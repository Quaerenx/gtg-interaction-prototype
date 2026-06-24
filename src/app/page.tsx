import { SiteHeader } from "@/components/layout/site-header";
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
      <main>
        <HeroExperience forceFallback={forceFallback} />
        <SolutionPreview />
      </main>
    </>
  );
}
