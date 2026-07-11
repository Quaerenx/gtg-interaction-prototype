import type { NavigationItem, ProofMode } from "./types";

export const siteContent = {
  isApproved: false,
  language: "ko",
  proofMode: "local-only" as ProofMode
} as const;

export const brandContent = {
  englishName: "GTG Solutions & Consult",
  legalName: "(주)지티지 / GTG Co.,Ltd.",
  favicon: "/brand/gtg-logo.png"
} as const;

export const navigationItems: NavigationItem[] = [
  { label: "ABOUT", href: "/#company" },
  { label: "SOLUTIONS", href: "/#solutions" },
  { label: "ENGAGEMENT", href: "/#engagement" },
  { label: "CONTACT", href: "/#contact" }
];

export const heroContent = {
  eyebrow: "GTG Data Core",
  headline: "데이터와 인프라를 하나의 운영 구조로",
  headlineLines: ["데이터와 인프라를", "하나의 운영 구조로"],
  description:
    "데이터 분석, 스트리밍, 인프라 자동화, DevOps 품질, DB/테스트/프로세스 컨설팅을 하나의 실행 구조로 연결합니다.",
  primaryCta: {
    label: "문의하기",
    href: "#contact"
  }
} as const;

export const seoContent = {
  title: "GTG Solutions & Consult | 데이터 분석·스트리밍·DevOps 기술 컨설팅",
  description:
    "GTG Solutions & Consult는 Bigdata Analytics, Confluent, HashiCorp, DevOps 솔루션과 DB/테스트/프로세스 컨설팅을 다루는 기술 컨설팅 회사입니다.",
  canonical: "https://www.gtgsc.com/",
  ogTitle: "GTG Solutions & Consult",
  ogDescription:
    "데이터 분석, 데이터 스트리밍, 인프라 자동화, DevOps 품질, 컨설팅과 기술지원을 연결하는 GTG Solutions & Consult 공식 웹사이트입니다."
} as const;
