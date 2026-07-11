import type { SolutionSlide } from "./types";

export const solutionsContent = {
  headline: "GTG Solutions",
  description: "Data Core에서 이어지는 다섯 Solution 영역을 순서대로 살펴보세요."
} as const;

const solutionSlideDefinitions = [
  {
    id: "solution-data-analytics",
    title: "Data & Analytics",
    description:
      "Vertica 기반의 대용량 데이터 분석 플랫폼, In-DB Machine Learning, Hadoop 연계, Eon Mode 등 데이터 분석 환경을 다룹니다.",
    related: [
      "Vertica Analytics Platform",
      "In-DB Machine Learning",
      "Integrating with Hadoop",
      "Vertica Eon Mode",
      "Vertica 기술 블로그"
    ],
    productSpotlight: {
      id: "vertica",
      label: "Vertica",
      logoSrc: "/item-logo/3840px-Vertica_pos_blk_rgb.svg.webp"
    },
    cta: {
      label: "Vertica 기술 블로그 보기",
      href: "https://x2wizard.github.io/"
    },
    visual: "/generated/solution-data-analytics.svg"
  },
  {
    id: "solution-data-streaming",
    title: "Data Streaming",
    description:
      "Confluent를 중심으로 이벤트 기반 데이터 흐름과 스트리밍 플랫폼 도입, 운영, 보안 구성을 다룹니다.",
    related: ["Confluent Platform", "운영과 보안", "제어 센터", "자동 데이터 밸런서"],
    productSpotlight: {
      id: "confluent",
      label: "Confluent",
      logoSrc: "/item-logo/3840px-Confluent,_Inc._logo.svg.webp"
    },
    cta: {
      label: "Confluent 솔루션 보기",
      href: "https://www.gtgsc.com/gtg/sub/confluent/platform.php"
    },
    visual: "/generated/solution-data-streaming.svg"
  },
  {
    id: "solution-infrastructure-automation",
    title: "Infrastructure Automation",
    description:
      "HashiCorp 기반으로 Private, Public, Multi-cloud 환경의 인프라 자동화와 기술지원 범위를 다룹니다.",
    related: [
      "HashiCorp",
      "Infrastructure Automation",
      "기술지원 범위",
      "운영 문의 대응",
      "구성 자동화 컨설팅"
    ],
    cta: {
      label: "HashiCorp 솔루션 보기",
      href: "https://www.gtgsc.com/gtg/sub/hash/hash.php"
    },
    productSpotlight: {
      id: "hashicorp",
      label: "HashiCorp"
    },
    visual: "/generated/solution-infrastructure-automation.svg"
  },
  {
    id: "solution-devops-quality",
    title: "DevOps & Quality",
    description:
      "LoadRunner 등 DevOps 품질 도구와 성능/기능 테스트 컨설팅을 통해 테스트, 릴리스, 품질관리 업무를 다룹니다.",
    related: ["LoadRunner Professional", "성능/기능 테스트 컨설팅", "테스트 프로세스 컨설팅", "형상관리"],
    cta: {
      label: "DevOps 솔루션 보기",
      href: "https://www.gtgsc.com/gtg/sub/devops/load.php"
    },
    productSpotlight: {
      id: "loadrunner",
      label: "LoadRunner"
    },
    visual: "/generated/solution-devops-quality.svg"
  },
  {
    id: "solution-consulting-support",
    title: "Consulting & Technical Support",
    description: "컨설팅과 기술지원 범위를 하나의 상담 흐름으로 연결합니다.",
    related: [
      "DB 컨설팅",
      "성능/기능 테스트 컨설팅",
      "프로세스 컨설팅",
      "형상관리",
      "기술지원",
      "Vertica 교육 문의"
    ],
    cta: {
      label: "기술 문의하기",
      href: "#contact"
    },
    visual: "/generated/solution-consulting-support.svg"
  }
] as const satisfies readonly SolutionSlide[];

export type SolutionId = (typeof solutionSlideDefinitions)[number]["id"];

export const PRIMARY_SOLUTION_ID = "solution-data-analytics" satisfies SolutionId;

export const solutionSlides: readonly SolutionSlide<SolutionId>[] = solutionSlideDefinitions;
