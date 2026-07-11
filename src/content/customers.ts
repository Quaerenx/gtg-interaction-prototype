import type { CustomerProofItem } from "./types";

const projectDisplayAuthorization = {
  relationshipEvidenceLevel: "user-confirmed",
  projectOwnerDisplayApproval: "approved",
  thirdPartyRightsStatus: "unverified",
  approvalReference: "Codex task 2026-07-11"
} as const;

export const customerProofContent = {
  headlineKeyword: "Representative Customers",
  semanticLabel: "Representative customers",
  description:
    "아래 조직명과 로고는 사용자 확인을 바탕으로 구성한 로컬 프로토타입용 고객 proof입니다.",
  disclaimer:
    "이 목록은 특정 제품의 도입, 제품 제조사의 고객 지위, 파트너 등급, 인증 또는 보증을 의미하지 않습니다.",
  localOnlyLabel: "관계 범위 검토 중 · 로컬 프로토타입"
} as const;

export const customerProofItems: CustomerProofItem[] = [
  {
    id: "kt",
    displayName: "KT",
    logoSrc: "/generated/customer-logos/01_kt.png",
    ...projectDisplayAuthorization
  },
  {
    id: "lg-electronics",
    displayName: "LG Electronics",
    logoSrc: "/generated/customer-logos/02_lg-electronics.png",
    ...projectDisplayAuthorization
  },
  {
    id: "konkuk-university-hospital",
    displayName: "Konkuk University Hospital",
    logoSrc: "/generated/customer-logos/03_konkuk-university-hospital.png",
    ...projectDisplayAuthorization
  },
  {
    id: "construction-workers-mutual-aid-association",
    displayName: "Construction Workers Mutual Aid Association",
    logoSrc: "/generated/customer-logos/04_construction-workers-mutual-aid-association.png",
    ...projectDisplayAuthorization
  },
  {
    id: "korea-university-medicine",
    displayName: "Korea University Medicine",
    logoSrc: "/generated/customer-logos/05_korea-university-medicine.png",
    ...projectDisplayAuthorization
  },
  {
    id: "supreme-prosecutors-office",
    displayName: "Supreme Prosecutors' Office",
    logoSrc: "/generated/customer-logos/06_supreme-prosecutors-office.png",
    ...projectDisplayAuthorization
  },
  {
    id: "misto-holdings",
    displayName: "Misto Holdings",
    logoSrc: "/generated/customer-logos/07_misto-holdings.png",
    ...projectDisplayAuthorization
  },
  {
    id: "bithumb",
    displayName: "Bithumb",
    logoSrc: "/generated/customer-logos/08_bithumb.png",
    ...projectDisplayAuthorization
  },
  {
    id: "samsung-sds",
    displayName: "Samsung SDS",
    logoSrc: "/generated/customer-logos/09_samsung-sds.png",
    ...projectDisplayAuthorization
  },
  {
    id: "samsung-electronics",
    displayName: "Samsung Electronics",
    logoSrc: "/generated/customer-logos/10_samsung-electronics.png",
    ...projectDisplayAuthorization
  },
  {
    id: "saemaul-geumgo",
    displayName: "Saemaul Geumgo",
    logoSrc: "/generated/customer-logos/11_saemaul-geumgo.png",
    ...projectDisplayAuthorization
  },
  {
    id: "seoul-medical-center",
    displayName: "Seoul Medical Center",
    logoSrc: "/generated/customer-logos/12_seoul-medical-center.png",
    ...projectDisplayAuthorization
  },
  {
    id: "shinhan-bank",
    displayName: "Shinhan Bank",
    logoSrc: "/generated/customer-logos/13_shinhan-bank.png",
    ...projectDisplayAuthorization
  },
  {
    id: "ulsan-university-hospital",
    displayName: "Ulsan University Hospital",
    logoSrc: "/generated/customer-logos/14_ulsan-university-hospital.png",
    ...projectDisplayAuthorization
  },
  {
    id: "ptkorea",
    displayName: "PTKOREA",
    logoSrc: "/generated/customer-logos/15_ptkorea.png",
    ...projectDisplayAuthorization
  },
  {
    id: "komsco",
    displayName: "KOMSCO",
    logoSrc: "/generated/customer-logos/16_komsco.png",
    ...projectDisplayAuthorization
  },
  {
    id: "techfin-ratings",
    displayName: "Techfin Ratings",
    logoSrc: "/generated/customer-logos/17_techfin-ratings.png",
    ...projectDisplayAuthorization
  },
  {
    id: "korea-credit-information-services",
    displayName: "Korea Credit Information Services",
    logoSrc: "/generated/customer-logos/18_korea-credit-information-services.png",
    ...projectDisplayAuthorization
  }
];
