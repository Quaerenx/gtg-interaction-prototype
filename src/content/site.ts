export type Cta = {
  label: string;
  href: string;
};

export type HeroService = {
  id: string;
  label: string;
  keyword: string;
  visual: string;
  visualAlt: string;
};

export type CustomerProofLabel = "Representative customer" | "Customer proof" | "Selected customer";

export type CustomerProofApproval = "user-confirmed" | "needs-written-approval";

export type CustomerProofItem = {
  id: string;
  displayName: string;
  logoSrc: string;
  cardSrc?: string;
  proofLabel: CustomerProofLabel;
  publicDisplayApproved: CustomerProofApproval;
  visualAlt: string;
};

export type HeroCustomer = CustomerProofItem & {
  label: string;
  visual: string;
};

export type SolutionSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  related: string[];
  cta: Cta;
  visual: string;
  visualAlt: string;
  index: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type HeadlineLines = {
  desktop: string[];
  mobile?: string[];
};

export type CapabilityMapNode = {
  id: string;
  label: string;
  descriptor: string;
};

export const siteContent = {
  isApproved: false,
  language: "ko",
  badge: "MVP PROTOTYPE"
} as const;

export const brandContent = {
  koreanName: "지티지 솔루션 컨설팅",
  englishName: "GTG Solutions & Consult",
  legalName: "(주)지티지 / GTG Co.,Ltd.",
  logo: "/brand/gtg-logo.png",
  favicon: "/brand/gtg-logo.png"
} as const;

export const navigationItems: NavigationItem[] = [
  { label: "ABOUT", href: "/#company" },
  { label: "SOLUTIONS", href: "/#solutions" },
  { label: "ENGAGEMENT", href: "/#engagement" },
  { label: "CONTACT", href: "/#contact" }
];

export const heroContent = {
  eyebrow: "GTG Solutions & Consult",
  headline: "데이터와 인프라를 하나의 운영 구조로",
  headlineLines: ["데이터와 인프라를", "하나의 운영 구조로"],
  description:
    "데이터 분석, 스트리밍, 인프라 자동화, DevOps 품질, DB/테스트/프로세스 컨설팅을 하나의 실행 구조로 연결합니다.",
  primaryCta: {
    label: "문의하기",
    href: "#contact"
  }
} as const;

export const customerProofContent = {
  headlineKeyword: "Representative Customers",
  cardLabel: "Representative customer",
  semanticLabel: "Representative customers"
} as const;

export const heroServices: HeroService[] = [
  {
    id: "data-analytics",
    label: "Data & Analytics",
    keyword: "Vertica Analytics",
    visual: "/generated/hero-data-analytics.svg",
    visualAlt: "절차적으로 생성한 데이터 분석 레이어 비주얼"
  },
  {
    id: "data-streaming",
    label: "Data Streaming",
    keyword: "Confluent Platform",
    visual: "/generated/hero-data-streaming.svg",
    visualAlt: "절차적으로 생성한 데이터 스트리밍 신호 비주얼"
  },
  {
    id: "infrastructure-automation",
    label: "Infrastructure Automation",
    keyword: "HashiCorp Automation",
    visual: "/generated/hero-infrastructure-automation.svg",
    visualAlt: "절차적으로 생성한 인프라 자동화 토폴로지 비주얼"
  },
  {
    id: "devops-quality",
    label: "DevOps & Quality",
    keyword: "LoadRunner Quality",
    visual: "/generated/hero-devops-quality.svg",
    visualAlt: "절차적으로 생성한 DevOps 품질 매트릭스 비주얼"
  },
  {
    id: "database-consulting",
    label: "Database Consulting",
    keyword: "DB Consulting",
    visual: "/generated/hero-database-consulting.svg",
    visualAlt: "절차적으로 생성한 데이터베이스 컨설팅 비주얼"
  },
  {
    id: "technical-support",
    label: "Technical Support",
    keyword: "Technical Support",
    visual: "/generated/hero-technical-support.svg",
    visualAlt: "절차적으로 생성한 기술지원 진단 비주얼"
  },
  {
    id: "training-delivery",
    label: "Training & Delivery",
    keyword: "Vertica Education",
    visual: "/generated/hero-training-delivery.svg",
    visualAlt: "절차적으로 생성한 교육과 전달 흐름 비주얼"
  }
];

export const customerProofItems: CustomerProofItem[] = [
  {
    id: "kt",
    displayName: "KT",
    logoSrc: "/generated/customer-logos/01_kt.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "KT customer logo"
  },
  {
    id: "lg-electronics",
    displayName: "LG Electronics",
    logoSrc: "/generated/customer-logos/02_lg-electronics.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "LG Electronics customer logo"
  },
  {
    id: "konkuk-university-hospital",
    displayName: "Konkuk University Hospital",
    logoSrc: "/generated/customer-logos/03_konkuk-university-hospital.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Konkuk University Hospital customer logo"
  },
  {
    id: "construction-workers-mutual-aid-association",
    displayName: "Construction Workers Mutual Aid Association",
    logoSrc: "/generated/customer-logos/04_construction-workers-mutual-aid-association.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Construction Workers Mutual Aid Association customer logo"
  },
  {
    id: "korea-university-medicine",
    displayName: "Korea University Medicine",
    logoSrc: "/generated/customer-logos/05_korea-university-medicine.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Korea University Medicine customer logo"
  },
  {
    id: "supreme-prosecutors-office",
    displayName: "Supreme Prosecutors' Office",
    logoSrc: "/generated/customer-logos/06_supreme-prosecutors-office.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Supreme Prosecutors' Office customer logo"
  },
  {
    id: "misto-holdings",
    displayName: "Misto Holdings",
    logoSrc: "/generated/customer-logos/07_misto-holdings.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Misto Holdings customer logo"
  },
  {
    id: "bithumb",
    displayName: "Bithumb",
    logoSrc: "/generated/customer-logos/08_bithumb.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Bithumb customer logo"
  },
  {
    id: "samsung-sds",
    displayName: "Samsung SDS",
    logoSrc: "/generated/customer-logos/09_samsung-sds.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Samsung SDS customer logo"
  },
  {
    id: "samsung-electronics",
    displayName: "Samsung Electronics",
    logoSrc: "/generated/customer-logos/10_samsung-electronics.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Samsung Electronics customer logo"
  },
  {
    id: "saemaul-geumgo",
    displayName: "Saemaul Geumgo",
    logoSrc: "/generated/customer-logos/11_saemaul-geumgo.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Saemaul Geumgo customer logo"
  },
  {
    id: "seoul-medical-center",
    displayName: "Seoul Medical Center",
    logoSrc: "/generated/customer-logos/12_seoul-medical-center.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Seoul Medical Center customer logo"
  },
  {
    id: "shinhan-bank",
    displayName: "Shinhan Bank",
    logoSrc: "/generated/customer-logos/13_shinhan-bank.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Shinhan Bank customer logo"
  },
  {
    id: "ulsan-university-hospital",
    displayName: "Ulsan University Hospital",
    logoSrc: "/generated/customer-logos/14_ulsan-university-hospital.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Ulsan University Hospital customer logo"
  },
  {
    id: "ptkorea",
    displayName: "PTKOREA",
    logoSrc: "/generated/customer-logos/15_ptkorea.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "PTKOREA customer logo"
  },
  {
    id: "komsco",
    displayName: "KOMSCO",
    logoSrc: "/generated/customer-logos/16_komsco.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "KOMSCO customer logo"
  },
  {
    id: "techfin-ratings",
    displayName: "Techfin Ratings",
    logoSrc: "/generated/customer-logos/17_techfin-ratings.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Techfin Ratings customer logo"
  },
  {
    id: "korea-credit-information-services",
    displayName: "Korea Credit Information Services",
    logoSrc: "/generated/customer-logos/18_korea-credit-information-services.png",
    proofLabel: "Representative customer",
    publicDisplayApproved: "user-confirmed",
    visualAlt: "Korea Credit Information Services customer logo"
  }
];

export const heroCustomers: HeroCustomer[] = customerProofItems.map((customer) => ({
  ...customer,
  label: customer.displayName,
  visual: customer.logoSrc
}));

const heroRingCustomerIds = [
  "kt",
  "lg-electronics",
  "konkuk-university-hospital",
  "korea-university-medicine",
  "supreme-prosecutors-office",
  "bithumb",
  "samsung-sds",
  "samsung-electronics",
  "saemaul-geumgo",
  "shinhan-bank",
  "ptkorea",
  "komsco"
] as const;

const heroCustomerById = new Map(heroCustomers.map((customer) => [customer.id, customer]));

export const heroRingCustomers: HeroCustomer[] = heroRingCustomerIds
  .map((id) => heroCustomerById.get(id))
  .filter((customer): customer is HeroCustomer => Boolean(customer));

export const solutionSlides: SolutionSlide[] = [
  {
    id: "solution-data-analytics",
    eyebrow: "Solution 01",
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
    cta: {
      label: "Vertica 기술 블로그 보기",
      href: "https://x2wizard.github.io/"
    },
    visual: "/generated/solution-data-analytics.svg",
    visualAlt: "절차적으로 생성한 데이터 분석 토폴로지 비주얼",
    index: "01 / 05"
  },
  {
    id: "solution-data-streaming",
    eyebrow: "Solution 02",
    title: "Data Streaming",
    description:
      "Confluent를 중심으로 이벤트 기반 데이터 흐름과 스트리밍 플랫폼 도입, 운영, 보안 구성을 다룹니다.",
    related: ["Confluent Platform", "운영과 보안", "제어 센터", "자동 데이터 밸런서"],
    cta: {
      label: "Confluent 솔루션 보기",
      href: "https://www.gtgsc.com/gtg/sub/confluent/platform.php"
    },
    visual: "/generated/solution-data-streaming.svg",
    visualAlt: "절차적으로 생성한 데이터 스트리밍 비주얼",
    index: "02 / 05"
  },
  {
    id: "solution-infrastructure-automation",
    eyebrow: "Solution 03",
    title: "Infrastructure Automation",
    description:
      "HashiCorp 기반으로 Private, Public, Multi-cloud 환경의 인프라 자동화와 기술지원 범위를 다룹니다.",
    related: [
      "HashiCorp",
      "Infrastructure Automation",
      "Global Support",
      "Technical Account Management",
      "Professional Services"
    ],
    cta: {
      label: "HashiCorp 솔루션 보기",
      href: "https://www.gtgsc.com/gtg/sub/hash/hash.php"
    },
    visual: "/generated/solution-infrastructure-automation.svg",
    visualAlt: "절차적으로 생성한 인프라 자동화 비주얼",
    index: "03 / 05"
  },
  {
    id: "solution-devops-quality",
    eyebrow: "Solution 04",
    title: "DevOps & Quality",
    description:
      "LoadRunner 등 DevOps 품질 도구와 성능/기능 테스트 컨설팅을 통해 테스트, 릴리스, 품질관리 업무를 다룹니다.",
    related: ["LoadRunner Professional", "성능/기능 테스트 컨설팅", "테스트 프로세스 컨설팅", "형상관리"],
    cta: {
      label: "DevOps 솔루션 보기",
      href: "https://www.gtgsc.com/gtg/sub/devops/load.php"
    },
    visual: "/generated/solution-devops-quality.svg",
    visualAlt: "절차적으로 생성한 DevOps 품질 비주얼",
    index: "04 / 05"
  },
  {
    id: "solution-consulting-support",
    eyebrow: "Solution 05",
    title: "Consulting & Technical Support",
    description:
      "DB 컨설팅, 성능/기능 테스트 컨설팅, 프로젝트/테스트 프로세스 컨설팅, 형상관리, 기술지원, 교육 문의를 하나의 상담 흐름으로 연결합니다.",
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
      href: "mailto:webmaster@gtgsc.com"
    },
    visual: "/generated/solution-consulting-support.svg",
    visualAlt: "절차적으로 생성한 컨설팅과 기술지원 비주얼",
    index: "05 / 05"
  }
];

export const companyContent = {
  id: "company",
  eyebrow: "Company Overview",
  headline: "데이터 플랫폼과 소프트웨어 품질을 위한 기술 파트너",
  headlineLines: {
    desktop: ["데이터 플랫폼과", "소프트웨어 품질을 위한", "기술 파트너"],
    mobile: ["데이터 플랫폼과", "소프트웨어 품질을 위한", "기술 파트너"]
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
  visualAlt: "GTG capability map linking analytics, streaming, automation, DevOps quality, consulting, and technical support.",
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
    desktop: ["확인, 정의, 실행,", "운영 안정화로 이어지는", "수행 흐름"],
    mobile: ["확인, 정의, 실행,", "운영 안정화로 이어지는", "수행 흐름"]
  },
  steps: [
    {
      number: "01",
      title: "Diagnose",
      description: "현재 환경, 데이터 흐름, 품질 이슈, 운영 요구사항을 함께 확인합니다."
    },
    {
      number: "02",
      title: "Design",
      description: "적합한 솔루션 영역과 컨설팅/기술지원 범위를 정의합니다."
    },
    {
      number: "03",
      title: "Implement",
      description: "구축, 테스트, 자동화, 운영 전환에 필요한 실행 계획을 진행합니다."
    },
    {
      number: "04",
      title: "Operate",
      description: "운영 안정화, 교육, 기술 문의 대응으로 지속적인 활용을 지원합니다."
    }
  ]
} as const;

export const contactContent = {
  id: "contact",
  headline: "GTG에 문의하세요",
  description:
    "솔루션, 컨설팅, 기술지원 문의는 공식 사이트의 공개 연락처를 사용하세요. Vertica 교육 문의는 기술 블로그에 공개된 교육 문의 메일을 사용할 수 있습니다.",
  email: "webmaster@gtgsc.com",
  phone: "02-6293-7100",
  phoneHref: "tel:02-6293-7100",
  address: "08511, 서울시 금천구 디지털로 178, A동 2513호 (가산동, 가산퍼블릭)",
  primaryCta: {
    label: "공식 문의 페이지로 이동",
    href: "https://www.gtgsc.com/gtg/sub/company/company.php"
  },
  emailCta: {
    label: "이메일 문의",
    href: "mailto:webmaster@gtgsc.com"
  }
} as const;

export const footerContent = {
  copyright: "© GTG Co.,Ltd. All Rights Reserved.",
  links: [
    {
      label: "개인정보처리방침",
      href: "https://www.gtgsc.com/gtg/sub/customer/privacy.php"
    }
  ]
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

export const firstSolution = solutionSlides[0];
