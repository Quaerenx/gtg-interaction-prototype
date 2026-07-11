import type { CapabilityMapNode } from "./types";

export const companyContent = {
  id: "company",
  eyebrow: "Company Overview",
  headline: "데이터 플랫폼과 소프트웨어 품질을 다루는 기술 컨설팅",
  headlineLines: {
    desktop: ["데이터 플랫폼과", "소프트웨어 품질을 다루는", "기술 컨설팅"]
  },
  description:
    "GTG Solutions & Consult는 공개 사이트에서 Bigdata Analytics, Confluent, HashiCorp, DevOps를 주요 솔루션 영역으로 소개하며, DB/테스트/프로세스/형상관리 컨설팅과 제품 기술지원을 함께 다룹니다.",
  capabilities: [
    "Bigdata Analytics / Vertica",
    "Data Streaming / Confluent",
    "Infrastructure Automation / HashiCorp",
    "DevOps quality tooling / LoadRunner",
    "DB, performance/function testing, process, configuration-management consulting, and Vertica technical education"
  ]
} as const;

export const capabilityMapContent = {
  title: "GTG capability map",
  description: "Data, platform, quality, and support capabilities connected as a technical delivery system.",
  desktopVisual: "/generated/topology/gtg-capability-map.svg",
  mobileVisual: "/generated/topology/gtg-capability-map-mobile.svg",
  nodes: [
    {
      id: "data-analytics",
      label: "Data & Analytics",
      descriptor: "analytical layers"
    },
    {
      id: "data-streaming",
      label: "Data Streaming",
      descriptor: "event handoff"
    },
    {
      id: "infrastructure-automation",
      label: "Infrastructure Automation",
      descriptor: "provisioning mesh"
    },
    {
      id: "devops-quality",
      label: "DevOps & Quality",
      descriptor: "validation gate"
    },
    {
      id: "consulting-technical-support",
      label: "Consulting & Technical Support",
      descriptor: "diagnosis and action"
    }
  ] satisfies CapabilityMapNode[]
} as const;

export const engagementContent = {
  id: "engagement",
  eyebrow: "Engagement Model",
  headline: "확인, 정의, 실행, 운영 안정화로 이어지는 수행 흐름",
  headlineLines: {
    desktop: ["확인, 정의, 실행,", "운영 안정화로 이어지는", "수행 흐름"]
  },
  steps: [
    {
      id: "diagnose",
      title: "Diagnose",
      description: "현재 환경, 데이터 흐름, 품질 이슈, 운영 요구사항을 함께 확인합니다."
    },
    {
      id: "design",
      title: "Design",
      description: "적합한 솔루션 영역과 컨설팅/기술지원 범위를 정의합니다."
    },
    {
      id: "implement",
      title: "Implement",
      description: "구축, 테스트, 자동화, 운영 전환에 필요한 실행 계획을 진행합니다."
    },
    {
      id: "operate",
      title: "Operate",
      description: "운영 안정화, 교육, 기술 문의 대응으로 지속적인 활용을 지원합니다."
    }
  ]
} as const;
