export type Cta = {
  readonly label: string;
  readonly href: string;
};

export type CustomerRelationshipEvidenceLevel = "user-confirmed" | "unknown";
export type ProjectOwnerDisplayApproval = "approved" | "not-approved";
export type ThirdPartyRightsStatus = "unverified" | "blocked" | "verified";

export type CustomerProofItem = {
  readonly id: string;
  readonly displayName: string;
  readonly logoSrc: string;
  readonly relationshipEvidenceLevel: CustomerRelationshipEvidenceLevel;
  readonly projectOwnerDisplayApproval: ProjectOwnerDisplayApproval;
  readonly thirdPartyRightsStatus: ThirdPartyRightsStatus;
  readonly approvalReference: string;
};

export type SolutionProductSpotlight = {
  readonly id: string;
  readonly label: string;
  readonly logoSrc?: string;
};

export type SolutionSlide<Id extends string = string> = {
  readonly id: Id;
  readonly title: string;
  readonly description: string;
  readonly related: readonly string[];
  readonly productSpotlight?: SolutionProductSpotlight;
  readonly cta: Cta;
  readonly visual: string;
};

export type NavigationItem = {
  readonly label: string;
  readonly href: string;
};

export type CapabilityMapNode = {
  readonly id: string;
  readonly label: string;
  readonly descriptor: string;
};

export type ProofMode = "blocked" | "local-only" | "public";
