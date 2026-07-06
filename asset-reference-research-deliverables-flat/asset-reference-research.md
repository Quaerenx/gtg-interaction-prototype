# GTG Solutions & Consult Asset Reference Research

작성일: 2026-07-02  
범위: 현재 GTG Solutions & Consult 인터랙션 프로토타입의 에셋 상태 검토, 필요한 추가 에셋 정의, 국내/해외 레퍼런스와 폰트 레퍼런스 조사  
주의: 본 문서는 구현 변경 없이 리서치와 제작 방향만 정리한다. OVA의 이미지, 영상, 소스, 문구, 로고, 배치, 타이밍, 색 구성은 복제하지 않는다.

## 1. Executive Summary

현재 프로젝트는 "검증된 고객 로고 기반의 고객 증거", "GTG 고유의 레드 마커와 토폴로지형 기술 시각 언어", "Hero 한정 WebGL 인터랙션", "Canvas 밖 semantic HTML 콘텐츠"라는 방향이 이미 비교적 명확하다. 따라서 다음 단계의 핵심은 새로운 장식 이미지를 늘리는 것이 아니라, 현재 승인 후보로 정리된 고객 카드/토폴로지/캡빌리티 맵을 릴리스 가능한 브랜드 에셋 체계로 고정하는 것이다.

가장 먼저 필요한 에셋은 다음 다섯 가지다.

| 순위 | 에셋 | 이유 |
|---:|---|---|
| 1 | 공식 GTG 로고 SVG, inverse, 단색 마크, 정확한 red value | 모든 시각 확장의 기준점이다. 현재 `gtg-logo.png`와 임시 red만으로는 favicon, OG, 제안서, 다이어그램 일관성이 부족하다. |
| 2 | Pretendard Variable 중심의 한/영 타이포그래피 시스템 | 현재 system stack은 안전하지만 한국어 Hero/섹션 제목/다이어그램 라벨에서 브랜드 인상이 약하다. |
| 3 | Hero 고객 카드 텍스처와 모바일 정적 대체 세트 | 현재 WebGL 문법은 좋지만, 런타임 텍스처와 제한된 카드 슬롯을 릴리스용 QA 자산으로 고정할 필요가 있다. |
| 4 | 서비스별 대표 토폴로지 SVG 세트 | Solutions 구간의 기술 신뢰를 강화하되, WebGL은 Hero에만 둔다. |
| 5 | OG/social preview, favicon, app icon 패키지 | 릴리스 완성도와 외부 공유 품질을 보장한다. |

국내 레퍼런스는 Samsung SDS, LG CNS, NAVER Cloud, NHN Cloud, MegazoneCloud를 우선 참고할 가치가 높다. 해외 레퍼런스는 Confluent, HashiCorp, IBM Design Language/Carbon을 최우선으로 본다. 단, GTG는 해당 기업들의 규모, 고객 수, 파트너 등급, 인증, 성과 수치, 글로벌 운영 범위 등을 차용해서는 안 된다.

폰트는 1순위 Pretendard Variable, 2순위 SUIT Variable을 권장한다. Wanted Sans는 Hero/headline 대안, IBM Plex Sans KR은 기술 라벨 대안, Noto Sans KR은 안정적 fallback으로 유지한다.

## 2. Current GTG Baseline Reading

현재 프로젝트의 베이스라인은 다음과 같이 읽힌다.

| 영역 | 현재 상태 | 해석 |
|---|---|---|
| Hero | WebGL/R3F 기반 고객 카드 링, 서비스 라벨, 스크롤 진행, fallback 지원 | Hero만 3D/WebGL을 쓰는 규칙에 맞는다. 고객 카드가 첫 화면 증거 자산으로 작동한다. |
| Core content | `src/content/site.ts`에 Hero, Solutions, Company, Engagement, Contact 콘텐츠가 구조화되어 있음 | 콘텐츠는 semantic HTML로 노출되며 Canvas 의존성이 낮다. |
| Customer proof | 18개 로컬 고객 로고 PNG와 고객 카드 시스템 문서가 존재 | 강력한 핵심 자산이다. 단, 공개 사용 승인과 최신 로고 확인은 릴리스 전 별도 관리가 필요하다. |
| Solution visuals | 서비스별 로컬 SVG 배경과 topology kit 후보가 존재 | 벤더 아이콘이나 fake dashboard 없이 기술 신뢰를 만드는 방향이 좋다. |
| Company visual | capability map desktop/mobile SVG 후보와 semantic list가 존재 | 서비스 폭과 관계성을 보여주는 핵심 보조 자산이다. |
| Typography | CSS 기본 stack은 `Inter`, `Segoe UI`, Arial/Helvetica 계열 | 한국어 중심 GTG 사이트에는 전용 한글 웹폰트 시스템이 필요하다. |
| Motion | desktop pinned/scroll interaction, mobile/reduced motion static 흐름 | 접근성/모바일 안전선이 이미 설계되어 있다. |
| Release blockers | logo SVG, inverse logo, favicon, OG, legal links, 승인된 copy/claims 등이 문서에 blocker로 남아 있음 | 새 디자인보다 승인/패키징/QA가 먼저다. |

프로젝트는 "화려한 브랜드 캠페인"보다 "기술 컨설팅 회사의 검증 가능한 신뢰와 시스템 감각"을 만드는 쪽이 적합하다. 과한 3D, 범용 AI 그래픽, 불투명한 성과 수치보다 고객 증거와 원본성 있는 기술 다이어그램이 더 안전하고 설득력 있다.

## 3. Core Asset Inventory

| Core asset | 현재 상태 | 역할 | 강점 | 보완점 | 유지해야 할 것 | 권장 포맷 |
|---|---|---|---|---|---|---|
| Hero WebGL customer carousel | 구현됨, 승인 후보 | 첫 화면 identity + customer proof | 고객 로고 기반의 즉각적 신뢰, WebGL은 Hero 한정 | 런타임 Arial 텍스처, 일부 카드 슬롯만 사용, 정적 QA export 필요 | 현재 geometry/camera/pullback/handoff 문법 | CanvasTexture, semantic HTML fallback, local PNG/WebP |
| Customer proof card system | 승인 후보 문서/에셋 있음 | 고객 증거의 대표 에셋 | 18개 로컬 로고, normalized card, semantic list | 로고 공개 사용 승인 ledger, 최신 로고 확인 | 결과/수치/인증 주장 없이 "Representative Customers" 수준 | SVG frame, PNG/WebP, HTML, CanvasTexture |
| Solution topology SVG kit | 승인 후보 | 서비스별 기술 신뢰 시각화 | 독자적 primitive, red marker, no fake dashboard | 각 solution 영역에 맞춘 final crop/export | WebGL 밖에서는 SVG/HTML/CSS 중심 | SVG, CSS, exported PNG for deck |
| Capability Map | 승인 후보 | 회사 서비스 breadth와 관계성 설명 | desktop/mobile variant, semantic list | 한국어 label option, 제안서용 variant | workflow arrow가 아닌 관계 지도 | SVG + HTML |
| GTG red angular marker | provisional | 브랜드 motion/diagram motif | 로고에서 파생한 듯한 GTG 고유 감각 | 공식 red value와 clear-space rule 필요 | 작은 active marker, 과용 금지 | SVG/CSS token |
| Header/nav typography | system stack | 첫 인상과 정보 구조 | 안정적이고 로딩 부담 낮음 | 한국어/영문 hierarchy가 약함 | uppercase는 절제 | Self-hosted WOFF2 + CSS stack |
| Section title typography | large Korean system type | 브랜드 톤과 화면 rhythm | 명료함 | line break/letterform polish 부족 | letter spacing 0, readable line-height | Pretendard/SUIT CSS tokens |
| Mobile fallback visual | HTML fallback | 모바일 성능/접근성 | WebGL/pinning 부담을 낮춤 | 모바일 전용 정적 Hero 이미지 세트 필요 | reduced-motion/mobile static 우선 | HTML/CSS, PNG/WebP |
| OG/social preview | 미완 | 외부 공유 품질 | topology/customer card 기반으로 빠르게 확장 가능 | 1200x630 master 필요 | unsupported claim 금지 | PNG/WebP |
| Favicon/app icon | 미완 | 릴리스 기본 품질 | red marker로 확장 가능 | 공식 SVG mark 필요 | 저해상도에서 읽히는 단순형 | SVG, PNG sizes, ICO |

## 4. Missing / Needed Asset Inventory

| Needed asset | Priority | 왜 필요한가 | MVP 기준 | 제작 난이도 | Claim risk | Copyright/licensing risk | 권장 제작 |
|---|---|---|---|---|---|---|---|
| 공식 GTG brand source package | P0 | 모든 파생 에셋의 기준 | logo SVG, inverse, mono, red value, clear-space | 중 | 낮음 | 내부 소유 확인 필요 | 기존 PNG 기준으로 재제작하지 말고 공식 원본 확보 |
| 한/영 typography system | P0 | 한국어 Hero와 기술 라벨 품질 | Pretendard Variable + fallback + weights | 낮음 | 낮음 | OFL license copy 필요 | self-host WOFF2, CSS token화 |
| Hero customer card texture set | P0 | 현재 WebGL proof를 릴리스 자산으로 고정 | 18개 카드 QA export, 7개 Hero slot mapping | 중 | 중 | 고객 로고 승인 필요 | 현재 card frame 유지, 텍스처 export 자동화 |
| Mobile static hero/proof set | P0 | 모바일 WebGL/pinned 축소 규칙 대응 | 1개 hero still, 3개 customer proof 카드 | 낮음 | 중 | 고객 로고 승인 필요 | local PNG/WebP, no external image |
| OG/social preview | P0 | 공유/검색 미리보기 품질 | 1200x630 1종 | 낮음 | 중 | 고객 로고 사용 여부 검토 | topology-only 버전 우선, 고객 로고 버전은 승인 후 |
| Favicon/app icons | P0 | 릴리스 기본 요건 | favicon SVG, PNG, apple-touch-icon | 낮음 | 낮음 | logo ownership 확인 | official mark 기반 |
| Service representative topology set | P1 | Solutions의 기술 신뢰 강화 | 5개 solution SVG final | 중 | 중 | 벤더 아이콘/제품 UI 모방 금지 | 현재 topology kit 확장 |
| Customer proof approval ledger | P1 | co-branding risk 통제 | 로고명, 파일, 승인 상태, 사용 범위 | 낮음 | 높음 | 고객 상표/로고 사용 | 문서/CSV 관리 |
| Static customer proof grid | P1 | Company/proof 구간 보강 | 18개 카드 grid 또는 logo frame | 낮음 | 높음 | 고객 로고 승인 | "Representative Customers"만 사용 |
| Engagement flow map | P1 | 컨설팅 프로세스 설명 | Diagnose/Design/Implement/Operate 4단계 | 중 | 중 | 낮음 | topology primitive로 제작, 성과 수치 금지 |
| Contact consultation visual | P1 | 마지막 CTA의 브랜드 일관성 | abstract route/map, no claims | 낮음 | 낮음 | 낮음 | red marker + route line |
| Proposal/deck cover system | P2 | 영업/제안서 확장 | cover, section divider, proof strip | 중 | 중 | 로고/고객 승인 필요 | 웹 asset과 동일 grammar |
| Case-study template | Later/P2 | 향후 고객 사례 확장 | challenge/approach/stack/outcome slot | 중 | 높음 | 고객명/성과 승인 필요 | outcome은 승인 전 blank/TBD |
| Industry proof grid | Later | 고객 분류가 승인될 때 유용 | industry label 없는 neutral grouping | 낮음 | 높음 | 고객 승인 필요 | 산업명/고객 분류는 확인 후 |
| Photo/video library | Later | 고급 브랜드 경험 가능 | 승인된 촬영/stock rule | 높음 | 중 | 높음 | 지금은 시작하지 않음 |

## 5. Domestic Reference Table

국내 레퍼런스는 레이아웃을 복제하기 위한 대상이 아니라, 한국 B2B 기술 기업이 어떤 정보 구조, 신뢰 장치, 언어 밀도, 고객/서비스 분류를 쓰는지 확인하기 위한 참고다.

| Site | URL | Country/industry/brand character | Hero configuration | Image/video/SVG/canvas/WebGL use | Font usage | Korean/English typography hierarchy | Color system | Asset style | Scroll/interaction | Tech trust elements | Applicable to GTG | Avoid for GTG | Similarity/copy risk | Ref value |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---:|
| Samsung SDS | https://www.samsungsds.com/en/index.html | Korea, enterprise IT/AI/cloud/logistics, 대기업 신뢰형 | 이미지 기반 hero/news carousel, autoplay control | 대형 이미지, 카드, carousel 중심 | corporate sans 계열 추정 | 영문 global headline + 서비스 taxonomy | blue/white 중심의 대기업 톤 | case/news/report card, service grid | carousel, section cards | awards, reports, service taxonomy | 정보 구조, report/case 신뢰 장치, 접근성 control | global scale/awards/claims 차용 금지 | 중 | 5 |
| LG CNS | https://www.lgcns.com/en | Korea, AX/cloud/smart logistics/factory, 컨설팅+SI | 대형 headline, service category 진입 | image/card/grid 중심 | corporate sans 계열 추정 | 영문 headline, service taxonomy를 큰 단위로 분류 | black/white + accent | solution/service grid, industry modules | scroll section reveal 중심 | service breadth, family sites, industry categories | 한국 대형 IT의 service taxonomy와 bilingual hierarchy | "Agentic AI"식 과장 톤 무비판 차용 금지 | 중 | 5 |
| NAVER Cloud | https://www.ncloud.com/ | Korea, cloud platform, product-led technical brand | product/category 중심 nav, platform landing | product image, icon/category grid | Naver brand sans 계열 추정 | Korean/English product names 혼합 | green/black/white brand | product category cards, datacenter/AI/cloud imagery | product navigation, language switch | cloud categories, datacenter, product docs | technical category navigation과 cloud taxonomy | hyper-scale/data center claims 차용 금지 | 낮음 | 5 |
| NHN Cloud | https://www.nhncloud.com/kr | Korea, cloud/platform/AI/data center | 서비스 카테고리와 산업 cloud 진입 | cards, icons, category lists | corporate sans 계열 추정 | Korean body density가 높고 product taxonomy 명확 | blue/white/neutral | service matrix, product list, industry modules | category browsing 중심 | Compute, Container, Database, Monitoring, Security, Data & Analytics | GTG solution grouping/technical navigation 참고 | MSP/platform 규모나 certification claim 차용 금지 | 낮음 | 4 |
| MegazoneCloud | https://www.megazone.com/ | Korea, cloud MSP/AI, commercial proof 강함 | AI/cloud innovation headline, proof/story modules | images, logos, cards | corporate sans 계열 추정 | 영문 service terms와 한국어 설명 혼합 | black/white/accent, cloud brand tone | Voices of Trust, Partners, Case Stories | card/grid + campaign sections | partners, case stories, industry list | proof/story structure와 service 분류 | partner tier, 수상, 고객 수, 성과 수치 차용 금지 | 중 | 4 |
| Bespin Global | https://www.bespinglobal.com/ | Korea/global cloud MSP, AI/DataOps/AutoMSP | service/solution/industry mega taxonomy | images, logos, product cards | corporate sans 계열 추정 | 영문 solution names + 한국어 설명 | blue/dark/white 중심 | journey, control tower, customer/news modules | navigation-heavy | AI & Data, Infra, Security, Cloud MSP | DataOps/infra/security 정보 구조 참고 | customer/metric/partner language copy 금지 | 중 | 4 |
| Plus X | https://www.plus-ex.com/ | Korea, design/brand studio, high-polish portfolio | work/showroom 중심 감각적 presentation | images/video/portfolio visual 중심 | custom/editorial sans 성향 | 큰 display type과 sparse copy | project별 가변 | case-study visual polish | rich transitions 가능 | design credibility, portfolio framing | 타이포 polish와 여백 감각 | GTG 기술 신뢰보다 agency 분위기가 강해 과적용 금지 | 높음 | 3 |
| D.FY | http://www.dfy.co.kr | Korea, digital agency/interactive reference | campaign/works 중심 | image/video interaction 중심 | agency-style sans 추정 | visual-first hierarchy | project별 가변 | interactive portfolio | motion-heavy | award/portfolio proof | motion polish 참고 | OVA처럼 exact motion/placement 모방 금지, 기술 회사 톤과 거리 있음 | 높음 | 3 |

국내 상위 5개 참고 우선순위는 Samsung SDS, LG CNS, NAVER Cloud, NHN Cloud, MegazoneCloud다. 이들은 모두 서비스 taxonomy, 고객/사례 신뢰 장치, 한국어/영어 혼합 계층을 참고하기 좋다. 다만 GTG에는 대기업식 scale claim보다 "검증 가능한 서비스 범위 + 안전한 고객 증거 + 기술 토폴로지"가 더 적합하다.

## 6. Overseas Supporting Reference Table

해외 레퍼런스는 GTG가 다루는 데이터 스트리밍, 인프라 자동화, 데이터 플랫폼, 관측/기술 신뢰, 디자인 시스템의 원칙을 분리해서 참고한다.

| Site | URL | Country/industry/brand character | Hero configuration | Image/video/SVG/canvas/WebGL use | Font usage | Korean/English typography hierarchy | Color system | Asset style | Scroll/interaction | Tech trust elements | Applicable to GTG | Avoid for GTG | Similarity/copy risk | Ref value |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---:|
| Confluent | https://www.confluent.io/ | US, data streaming platform | bold product hero + proof/customer modules | product diagrams, cards, logos, motion imagery | modern SaaS sans | English product taxonomy clear | black/white/accent, data stream tone | streaming lines, connectors, customer proof | landing-page scroll sections | Data Streaming, Connectors, Governance, Processing | GTG data streaming service의 signal/path metaphor | Confluent visual palette, product UI, metrics, partner implication copy 금지 | 중 | 5 |
| HashiCorp | https://www.hashicorp.com/en | US, infrastructure/security lifecycle | infrastructure operations hero, product taxonomy | product cards, diagrams, customer logos | modern technical sans | English taxonomy 매우 명확 | dark/white + product accents | lifecycle/topology/product relation diagrams | section scroll, enterprise cards | Terraform, Vault, Nomad 등 product ecosystem | GTG infra automation/golden path 다이어그램 grammar | product icon/shape/palette/partner status 모방 금지 | 중 | 5 |
| Databricks | https://www.databricks.com/ | US, data/AI platform | platform/data+AI headline, solution taxonomy | product screenshots/diagrams/images | modern SaaS sans | large display + dense product nav | red/white/dark accents | lakehouse/platform diagrams, solution cards | enterprise landing scroll | data engineering, AI, governance, BI taxonomy | Data & Analytics service breadth와 capability map 참고 | AI capability overclaim, product UI imitation 금지 | 중 | 4 |
| Grafana Labs | https://grafana.com/ | US/EU, observability platform | observability headline + trusted logo strip | product screenshots, charts, diagrams | modern technical sans | English technical copy + product taxonomy | dark/white/orange accents | metrics/logs/traces dashboards and diagrams | landing scroll | OpenTelemetry, metrics/logs/traces/profiles | support/diagnostics visual language 참고 | fake dashboard, fake metrics, orange/dark style copy 금지 | 중 | 4 |
| IBM Design Language / Carbon | https://www.ibm.com/design/language/ / https://carbondesignsystem.com/ | Global, enterprise design system | principle/documentation driven | illustration, grid, motion guidance | IBM Plex ecosystem | precise technical hierarchy | IBM neutral/blue system | purposeful illustration, choreography, grid | documented motion principles | accessibility, purposeful motion, enterprise UI rigor | GTG motion/illustration safety and grid discipline | IBM brand look, blue grid, Plex identity를 그대로 복제 금지 | 낮음 | 5 |
| W3C WAI Images Tutorial | https://www.w3.org/WAI/tutorials/images/complex/ | Web accessibility standard reference | documentation | no decorative marketing asset | system/document style | accessibility-first | neutral | complex image text alternatives | no marketing motion | complex diagrams need text alternatives | Canvas 밖 semantic HTML, diagram alt/fallback 원칙 | 시각 스타일 참고 대상은 아님 | 낮음 | 5 |
| Atlassian Design | https://atlassian.design/ | Global SaaS design system | design principles/docs | illustration, motion, components | Atlassian brand type | product UI hierarchy | blue/neutral/multicolor | purposeful illustration, component guidance | restrained motion | design tokens, motion/accessibility guidance | interaction discipline and component consistency | playful SaaS illustration을 GTG에 과적용 금지 | 낮음 | 3 |

해외 상위 3개 참고 우선순위는 Confluent, HashiCorp, IBM Design Language/Carbon이다. Confluent는 data streaming의 "흐름/연결/거버넌스" 문법, HashiCorp는 infrastructure lifecycle과 topology 문법, IBM/Carbon은 enterprise-grade motion/accessibility/grid 원칙을 참고하기 좋다.

## 7. Typography Findings

현재 GTG 프로토타입은 한국어 headline, 영문 service label, 고객명, technical diagram label이 한 화면에 같이 등장한다. 따라서 폰트는 "한글 본문 가독성", "영문 기술 용어 균형", "숫자/라벨 안정성", "Hero display 힘"을 모두 충족해야 한다.

확인한 폰트 레퍼런스의 요약은 다음과 같다.

| Font | Source | License/source note | Korean impression | English/number impression | GTG use |
|---|---|---|---|---|---|
| Pretendard | https://github.com/orioncactus/pretendard | SIL Open Font License, variable/9 weights | 현대적이고 중립적, 한국어 UI에 강함 | Inter 기반 감각으로 영문/숫자 안정적 | 1순위. 전체 사이트 primary |
| SUIT | https://github.com/sun-typeface/SUIT | SIL Open Font License, static/variable WOFF2 | 조용하고 단정한 UI 인상 | label/body에 안정적 | 2순위. body/nav/diagram 보조 |
| Wanted Sans | https://github.com/wanteddev/wanted-sans | OFL-1.1, variable/7 weights | 조금 더 기하학적이고 브랜드성 있음 | headline에서 선명 | Hero/headline 대안 |
| Noto Sans KR | https://notofonts.github.io/noto-docs/website/use/ | OFL, global fallback | 매우 안정적이지만 범용적 | 다국어 fallback 강함 | fallback |
| IBM Plex Sans KR | https://github.com/IBM/plex | OFL, IBM Plex family | 기술적이고 정돈됨 | technical label/number에 강함 | diagram label 대안 |
| Spoqa Han Sans Neo | https://spoqa.github.io/spoqa-han-sans/en-US/ | service UI용 공개 서체 | 읽기 쉽고 보수적 | 안정적 | body 대안 |
| LINE Seed KR | https://seed.line.me/index_kr.html | SIL OFL, commercial use 가능 | 둥글고 친근함 | 안정적이나 weight 범위 제한 | GTG에는 다소 consumer tone |
| Paperlogy/Paperozi | https://noonnu.cc/en/font_page/1456 | Noonnu 기준 free commercial/SIL OFL 표기, 원 배포 확인 필요 | display/deck 감각 | headline에서 개성 있음 | 제안서/캠페인 accent 후보 |

1순위는 Pretendard Variable이다. GTG처럼 한국어와 영어 기술 용어가 동시에 존재하는 사이트에서 headline, body, navigation, diagram label을 한 체계로 묶기 좋다. 2순위는 SUIT Variable이다. SUIT는 본문, navigation, technical label에서 더 차분하고 조밀한 인상을 준다.

권장 stack:

```css
font-family:
  "Pretendard Variable",
  Pretendard,
  "SUIT Variable",
  SUIT,
  "Apple SD Gothic Neo",
  "Noto Sans KR",
  "Segoe UI",
  "Malgun Gothic",
  Arial,
  sans-serif;
```

운영 원칙:

| Area | 권장 |
|---|---|
| Hero headline | Pretendard Variable 650-750. 시각 테스트 후 Wanted Sans 700 대안 가능 |
| Body | Pretendard 400/500 또는 SUIT 400/500 |
| Navigation | Pretendard/SUIT 650-750, letter-spacing 0 |
| Diagram label | SUIT 600 또는 Pretendard 600. 기술 라벨 대안으로 IBM Plex Sans KR |
| Customer card label | Pretendard/SUIT 600, 고객 로고보다 강하지 않게 |
| Numbers/metadata | Pretendard tabular option 가능 시 사용, 아니면 SUIT/IBM Plex 검토 |

외부 CDN hotlink는 피하고, 승인된 WOFF2 파일을 `public/fonts/`에 self-host하는 것이 좋다. OFL 폰트라도 수정 배포 시 Reserved Font Name 규칙과 license copy 포함 여부를 확인해야 한다.

## 8. Font Candidate Matrix

| Font | Maker/distribution | License link | Korean fit | English/number fit | Hero | Body | Diagram | GTG recommendation | Caution |
|---|---|---|---|---|---:|---:|---:|---|---|
| Pretendard Variable | Kil Hyung-jin / orioncactus | https://github.com/orioncactus/pretendard | 5 | 5 | 5 | 5 | 4 | Primary | 너무 많은 weight를 쓰지 말고 3-4개 weight로 제한 |
| SUIT Variable | SUNN | https://github.com/sun-typeface/SUIT | 5 | 4 | 3 | 5 | 5 | Secondary | Hero 단독 사용 시 브랜드 힘이 약할 수 있음 |
| Wanted Sans | Wanted Lab / contributors | https://github.com/wanteddev/wanted-sans | 4 | 5 | 5 | 4 | 3 | Display alternative | 스타트업/채용 브랜드 인상이 강해질 수 있음 |
| Noto Sans KR | Google/Adobe/Sandoll ecosystem | https://notofonts.github.io/noto-docs/website/use/ | 5 | 4 | 3 | 5 | 4 | Fallback | 너무 범용적이라 GTG 고유 인상 약함 |
| IBM Plex Sans KR | IBM | https://github.com/IBM/plex | 4 | 5 | 3 | 4 | 5 | Technical label option | IBM 브랜드 인상이 강하게 읽힐 수 있음 |
| Spoqa Han Sans Neo | Spoqa | https://spoqa.github.io/spoqa-han-sans/en-US/ | 4 | 4 | 3 | 4 | 4 | Conservative alternative | distinctive함은 낮음 |
| LINE Seed KR | LINE/LY Corp/Sandoll | https://seed.line.me/index_kr.html | 4 | 4 | 3 | 4 | 3 | Limited alternative | 친근/consumer tone, weight 범위 제한 |
| Paperlogy/Paperozi | Lee J. x Kim Do-gyun, Noonnu listing | https://noonnu.cc/en/font_page/1456 | 4 | 3 | 4 | 3 | 2 | Deck/accent only | 원 배포처와 라이선스 파일 재확인 필요 |

## 9. Asset Direction By Site Area

| Site area | Recommended asset direction | Keep semantic HTML? | Motion/WebGL rule | Notes |
|---|---|---:|---|---|
| Hero | Customer proof card WebGL + service labels + static fallback | Yes | WebGL allowed only here; reduced-motion from initial render | 현재 grammar 유지. 텍스처/폰트/QA export를 고도화 |
| About/Company | Capability map + concise proof list | Yes | no WebGL | SVG는 decorative일 경우에도 텍스트 list 유지 |
| Solutions | Service topology SVG per slide | Yes | desktop pinned possible, mobile static | vendor UI/icon copy 금지, fake dashboard 금지 |
| Engagement | Diagnose/Design/Implement/Operate route map | Yes | subtle CSS/SVG only | 프로세스 claim은 승인된 문구만 사용 |
| Contact | red marker route/contact visual | Yes | no WebGL | 상담/문의로 이어지는 조용한 visual |
| Footer/meta | official logo, legal links, social preview | Yes | no motion 필요 | 릴리스 blocker 해결 중심 |
| Sales/deck | customer proof strip, topology cover, capability one-pager | Not site HTML, but source docs should remain editable | no WebGL | 웹과 같은 grammar를 쓰되 고객/성과 claim은 blank slot |

## 10. What GTG Should Avoid

| Avoid | 이유 |
|---|---|
| OVA의 이미지, 영상, 소스, 문구, 로고, 정확한 배치/타이밍/색 구성 | 저작권/트레이드드레스/혼동 위험 |
| 대형 글로벌 IT 기업의 customer count, partner tier, award, certification, performance metric 차용 | 검증되지 않은 GTG 사실이 됨 |
| 고객 로고 옆에 성과 수치, ROI, 처리량, uptime, 24/7 claim 배치 | customer endorsement와 성과 보증으로 오해될 수 있음 |
| vendor product icon을 GTG service icon처럼 사용 | 파트너/인증/소유권 혼동 위험 |
| fake dashboard, fake metrics, fake observability screenshot | 기술 신뢰를 오히려 훼손 |
| WebGL/3D를 Hero 밖에 확장 | 프로젝트 rule 위반, 모바일/접근성 부담 |
| purple/blue AI gradient, generic particle cloud, glassmorphism | GTG 고유성 약화, 범용 SaaS 인상 |
| rounded blob/soft consumer mascot tone | 기술 컨설팅의 선명한 시스템 감각과 거리 있음 |
| motion-only meaning | reduced-motion/assistive tech 사용자에게 정보 손실 |
| external image download/hotlink | 프로젝트 rule 위반 및 라이선스/성능 리스크 |

## 11. Copyright / Licensing / Claim Safety Notes

| Risk area | Safety rule |
|---|---|
| OVA reference | interaction grammar만 재해석한다. 정확한 이미지/영상/문구/로고/구도/타이밍/색 조합은 사용하지 않는다. |
| Customer logos | 로컬 파일이 있어도 공개 display 승인, 최신 로고, clear-space, co-branding 문구를 확인한다. 승인 전에는 "Representative Customers" 수준만 사용한다. |
| Vendor references | Confluent/HashiCorp 등은 서비스 영역의 개념 참고만 한다. 공식 파트너, 인증, 제품 UI, 아이콘, 색상 체계는 차용하지 않는다. |
| Claims | GTG 고객 수, 성과 수치, 인증, history, partner tier, 24/7 support, global delivery는 승인된 출처 없이 쓰지 않는다. |
| Fonts | OFL/상업 사용 가능 서체라도 정확한 배포처와 라이선스 파일을 repo에 남긴다. 수정 배포 시 Reserved Font Name을 확인한다. |
| Accessibility | complex diagram은 W3C WAI 원칙에 따라 HTML list/text alternative를 둔다. Canvas 정보는 semantic HTML로 반복한다. |
| Motion | prefers-reduced-motion은 최초 렌더부터 반영한다. 모바일에서는 pinned scroll/3D 효과를 줄인다. |
| External media | 외부 이미지를 다운로드하거나 hotlink하지 않는다. 필요한 비트맵은 내부 제작/승인 에셋만 사용한다. |

## 12. Recommended Production Priority

| Priority | Asset | Area | Why now |
|---|---|---|---|
| P0 | Official GTG brand source package | Global | 모든 파생 에셋의 기준. 현재 PNG와 provisional red만으로는 production 불안정 |
| P0 | Pretendard/SUIT typography system | Global | 한국어 사이트 품질을 가장 빠르게 끌어올림 |
| P0 | Hero/customer proof texture QA set | Hero | 이미 존재하는 핵심 경험을 release-safe하게 고정 |
| P0 | OG/favicons/app icons | Metadata/release | 실제 배포 품질의 기본 요건 |
| P0 | Customer logo approval ledger | Proof safety | 가장 큰 co-branding/claim 리스크를 통제 |
| P1 | Service topology final set | Solutions | 기술 신뢰를 높이되 WebGL 확장을 피함 |
| P1 | Engagement route map | Engagement | 컨설팅 프로세스를 claims 없이 설명 |
| P1 | Static proof grid | Company/proof | 고객 증거를 Hero 밖에서도 일관되게 활용 |
| P1 | Contact consultation visual | Contact | 마지막 CTA의 시각 완성도 강화 |
| P2 | Proposal/deck masters | Sales enablement | 웹 에셋을 영업 자료로 확장 |
| P2 | Case-study template | Future proof | 고객별 승인/성과 copy가 준비된 뒤 사용 |
| Later | Photo/video library | Brand campaign | 지금은 권리/제작 비용 대비 필요도가 낮음 |

## 13. Final Recommendation

GTG의 에셋 전략은 "고객 증거 + 기술 토폴로지 + 절제된 레드 마커 + 한국어/영어 타이포그래피"로 고정하는 것이 가장 안전하다. 현재 프로젝트가 이미 이 방향에 맞는 승인 후보를 다수 갖고 있으므로, 새로움을 위해 전혀 다른 visual language를 도입할 필요는 낮다.

다음 실행 순서는 다음과 같다.

1. 공식 GTG 로고 SVG, inverse, single-color mark, red value, favicon/app icon 기준을 확보한다.
2. Pretendard Variable을 primary로 self-host하고 SUIT Variable을 secondary로 검토한다.
3. 현재 customer proof card system을 Hero texture, static proof grid, OG preview, proposal proof strip로 확장한다.
4. topology SVG kit를 Solutions/Engagement/Contact별 final asset으로 정리한다.
5. customer logo approval ledger와 claim safety checklist를 릴리스 전 gate로 둔다.

이 방향은 OVA를 복제하지 않으면서도 reference의 "상호작용 문법"만 안전하게 재해석한다. 또한 국내 B2B 사이트의 신뢰 구조와 해외 technical platform 사이트의 시스템 감각을 GTG의 실제 콘텐츠 범위 안에서 사용할 수 있다.

