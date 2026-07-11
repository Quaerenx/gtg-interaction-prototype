import type { HeroState } from "../../../src/components/motion/experience-motion";

export const heroStateOrder: Record<HeroState, number> = {
  identity: 0,
  "core-active": 1,
  "core-pullback": 2,
  "core-settle": 3
};
export const mouseWheelDelta = 120;
export const trackpadLikeDeltas = [8, 16, 24, 32, 24, 16, 8] as const;
export const requiredViewports = [
  { name: "desktop-1280x720", width: 1280, height: 720 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
  { name: "mobile-360x640", width: 360, height: 640 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 }
] as const;
export const detailedDesktopViewportName = "desktop-1280x720";

export const officialHeadline = "데이터와 인프라를 하나의 운영 구조로";
export const officialDescription =
  "데이터 분석, 스트리밍, 인프라 자동화, DevOps 품질, DB/테스트/프로세스 컨설팅을 하나의 실행 구조로 연결합니다.";
export const customerNames = [
  "KT",
  "LG Electronics",
  "Konkuk University Hospital",
  "Construction Workers Mutual Aid Association",
  "Korea University Medicine",
  "Supreme Prosecutors' Office",
  "Misto Holdings",
  "Bithumb",
  "Samsung SDS",
  "Samsung Electronics",
  "Saemaul Geumgo",
  "Seoul Medical Center",
  "Shinhan Bank",
  "Ulsan University Hospital",
  "PTKOREA",
  "KOMSCO",
  "Techfin Ratings",
  "Korea Credit Information Services"
];
export const heroCapabilityNames = [
  "Data & Analytics",
  "Data Streaming",
  "Infrastructure Automation",
  "DevOps & Quality",
  "Consulting & Technical Support"
];
export const solutionIdsByKey = {
  dataAnalytics: "solution-data-analytics",
  dataStreaming: "solution-data-streaming",
  infrastructureAutomation: "solution-infrastructure-automation",
  devopsQuality: "solution-devops-quality",
  consultingSupport: "solution-consulting-support"
} as const;
export const solutionIds = Object.values(solutionIdsByKey);
export const productOwners = {
  vertica: solutionIdsByKey.dataAnalytics,
  confluent: solutionIdsByKey.dataStreaming,
  hashicorp: solutionIdsByKey.infrastructureAutomation,
  loadrunner: solutionIdsByKey.devopsQuality
} as const;
export const consultingSupportCapabilities = [
  "DB 컨설팅",
  "성능/기능 테스트 컨설팅",
  "프로세스 컨설팅",
  "형상관리",
  "기술지원",
  "Vertica 교육 문의"
];
export const topologySvgFiles = [
  "gtg-primitives.svg",
  "gtg-data-analytics.svg",
  "gtg-data-streaming.svg",
  "gtg-infrastructure-automation.svg",
  "gtg-devops-quality.svg",
  "gtg-consulting-support.svg"
];
export const capabilitySvgFiles = ["gtg-capability-map.svg", "gtg-capability-map-mobile.svg"];
export const capabilityNodeNames = heroCapabilityNames;
export const forbiddenTopologyTerms = [
  "Kafka",
  "Confluent",
  "AWS",
  "Azure",
  "GCP",
  "Google Cloud",
  "HashiCorp",
  "LoadRunner",
  "Vertica",
  "DORA",
  "ROI",
  "Certified partner",
  "Official partner",
  "customer logo"
];
