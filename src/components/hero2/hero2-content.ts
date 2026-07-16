import {
  brandContent,
  capabilityMapContent,
  companyContent,
  contactContent,
  customerProofItems,
  engagementContent,
  footerContent,
  heroContent,
  solutionSlides
} from "@/content/site";

export const hero2Content = {
  brand: brandContent,
  hero: heroContent,
  solutions: solutionSlides,
  company: companyContent,
  capabilityMap: capabilityMapContent,
  engagement: engagementContent,
  contact: contactContent,
  footer: footerContent,
  customers: customerProofItems
    .filter((customer) => customer.publicDisplayApproved === "user-confirmed")
    .slice(0, 12)
} as const;

