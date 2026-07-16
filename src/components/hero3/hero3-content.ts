export const hero3Content = {
  brand: {
    englishName: "GTG Solutions & Consult",
    legalName: "(주)지티지 / GTG Co.,Ltd."
  },
  hero: {
    headline: "데이터와 인프라를 하나의 운영 구조로",
    headlineLines: ["데이터와 인프라를", "하나의 운영 구조로"],
    description:
      "데이터 분석, 스트리밍, 인프라 자동화, DevOps 품질, DB/테스트/프로세스 컨설팅을 하나의 실행 구조로 연결합니다.",
    cta: {
      label: "문의하기",
      href: "#contact"
    }
  },
  solutions: [
    {
      id: "data-analytics",
      title: "Data & Analytics",
      shortTitle: "Analytics",
      description:
        "Vertica 기반의 대용량 데이터 분석 플랫폼, In-DB Machine Learning, Hadoop 연계, Eon Mode 등 데이터 분석 환경을 다룹니다.",
      related: ["Vertica Analytics Platform", "In-DB Machine Learning", "Vertica Eon Mode"],
      cta: { label: "Vertica 기술 블로그 보기", href: "https://x2wizard.github.io/" }
    },
    {
      id: "data-streaming",
      title: "Data Streaming",
      shortTitle: "Streaming",
      description:
        "Confluent를 중심으로 이벤트 기반 데이터 흐름과 스트리밍 플랫폼 도입, 운영, 보안 구성을 다룹니다.",
      related: ["Confluent Platform", "운영과 보안", "제어 센터"],
      cta: {
        label: "Confluent 솔루션 보기",
        href: "https://www.gtgsc.com/gtg/sub/confluent/platform.php"
      }
    },
    {
      id: "infrastructure-automation",
      title: "Infrastructure Automation",
      shortTitle: "Automation",
      description:
        "HashiCorp 기반으로 Private, Public, Multi-cloud 환경의 인프라 자동화와 기술지원 범위를 다룹니다.",
      related: ["HashiCorp", "Infrastructure Automation", "기술지원 범위"],
      cta: { label: "HashiCorp 솔루션 보기", href: "https://www.gtgsc.com/gtg/sub/hash/hash.php" }
    },
    {
      id: "devops-quality",
      title: "DevOps & Quality",
      shortTitle: "Quality",
      description:
        "LoadRunner 등 DevOps 품질 도구와 성능/기능 테스트 컨설팅을 통해 테스트, 릴리스, 품질관리 업무를 다룹니다.",
      related: ["LoadRunner Professional", "성능/기능 테스트", "품질관리"],
      cta: { label: "DevOps 솔루션 보기", href: "https://www.gtgsc.com/gtg/sub/devops/load.php" }
    },
    {
      id: "consulting-support",
      title: "Consulting & Technical Support",
      shortTitle: "Consulting",
      description:
        "DB 컨설팅, 성능/기능 테스트 컨설팅, 프로젝트/테스트 프로세스 컨설팅, 형상관리, 기술지원, 교육 문의를 하나의 상담 흐름으로 연결합니다.",
      related: ["DB 컨설팅", "프로세스 컨설팅", "기술지원과 교육"],
      cta: { label: "기술 문의하기", href: "mailto:webmaster@gtgsc.com" }
    }
  ],
  company: {
    headline: "데이터 플랫폼과 소프트웨어 품질을 다루는 기술 컨설팅",
    description:
      "GTG Solutions & Consult는 공개 사이트에서 Bigdata Analytics, Confluent, HashiCorp, DevOps를 주요 솔루션 영역으로 소개하며, DB/테스트/프로세스/형상관리 컨설팅과 제품 기술지원을 함께 다룹니다.",
    capabilities: [
      "Data & Analytics",
      "Data Streaming",
      "Infrastructure Automation",
      "DevOps & Quality",
      "Consulting & Technical Support"
    ]
  },
  engagement: {
    headline: "확인, 정의, 실행, 운영 안정화로 이어지는 수행 흐름",
    steps: [
      {
        title: "Diagnose",
        description: "현재 환경, 데이터 흐름, 품질 이슈, 운영 요구사항을 함께 확인합니다."
      },
      {
        title: "Design",
        description: "적합한 솔루션 영역과 컨설팅/기술지원 범위를 정의합니다."
      },
      {
        title: "Implement",
        description: "구축, 테스트, 자동화, 운영 전환에 필요한 실행 계획을 진행합니다."
      },
      {
        title: "Operate",
        description: "운영 안정화, 교육, 기술 문의 대응으로 지속적인 활용을 지원합니다."
      }
    ]
  },
  contact: {
    headline: "GTG에 문의하세요",
    description:
      "솔루션, 컨설팅, 기술지원 문의는 공식 사이트의 공개 연락처를 사용하세요. Vertica 교육 문의는 기술 블로그에 공개된 교육 문의 메일을 사용할 수 있습니다.",
    email: "webmaster@gtgsc.com",
    phone: "02-6293-7100",
    phoneHref: "tel:02-6293-7100",
    address: "08511, 서울시 금천구 디지털로 178, A동 2513호 (가산동, 가산퍼블릭)",
    primaryCta: {
      label: "문의하기",
      href: "https://www.gtgsc.com/gtg/sub/company/company.php"
    }
  },
  footer: {
    privacyLabel: "개인정보처리방침",
    privacyHref: "https://www.gtgsc.com/gtg/sub/customer/privacy.php",
    copyright: "© GTG Co.,Ltd. All Rights Reserved."
  }
} as const;

