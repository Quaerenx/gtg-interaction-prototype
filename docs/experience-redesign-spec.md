# GTG Experience Redesign Specification

> - 작성일: 2026-07-10
> - 상태: **APPROVED — 2026-07-10 사용자 승인, 구현은 별도 단계**
> - 현재 코드 기준선: `codex/hero-basepath-stabilization` / `3edd12ca919bcc52b002aa56ef665af7219b70e7`
> - 제품 방향 기준: `docs/DECISIONS.md`의 승인된 C안
> - 권리 기준: `docs/brand-and-rights-ledger.md`
> - 범위: 경험 구조, 모션, 접근성, component/state/CSS 경계만 정의하며 코드와 CSS는 변경하지 않음

## 0. 문서 지위와 적용 원칙

이 문서는 현재 구현을 그대로 설명하는 문서가 아니라, 승인된 제품 방향을 다음 로컬 구현 단계에서 재현하기 위한 경험 명세다. 현재 동작 사실은 코드와 브라우저 관찰을 우선하고, 목표 방향은 `DECISIONS.md`, 자산 공개 범위는 `brand-and-rights-ledger.md`를 우선한다.

- 현재 목표는 CMS가 아닌 단일 페이지 GTG 공식 홈페이지 RC 후보다.
- WebGL은 Hero의 GTG Data Core에만 사용한다.
- customer proof는 Hero Canvas에서 분리해 semantic HTML로 제공한다.
- 사용자가 로컬 구현에 한해 권리 gate 검토를 최종 단계로 미루기로 했으므로, 기존 logo는 로컬 placeholder로만 유지할 수 있다.
- 위 로컬 유예는 `public-use-approved` 승격이 아니며 외부 preview, 공개 터널, 운영 배포, OG/홍보 산출물에는 적용되지 않는다.
- `/hero` 경로만으로 local/preview/production 상태를 추론하지 않는다. 경로 정책은 계속 미결정이다.
- OVA의 이미지, 영상, source, copy, logo, 정확한 placement/timing/color composition은 사용하지 않는다.

## 1. 검토 증거와 현재 문제

### 1.1 검토한 화면

- `tests/artifacts/01-desktop-hero-initial.png`
- `tests/artifacts/02-desktop-customer-orbit-hero.png`
- `tests/artifacts/04c-desktop-handoff-first-card.png`
- `tests/artifacts/05-desktop-solution-1.png`
- `tests/artifacts/10-desktop-solution-5.png`
- `tests/artifacts/06-mobile-hero.png`
- `tests/artifacts/07-mobile-solution-1.png`
- `tests/artifacts/11-mobile-solution-5.png`
- `tests/artifacts/08-reduced-motion-hero.png`
- `tests/artifacts/content-integration/12-reduced-motion.png`
- `tests/artifacts/content-integration/12f-reduced-motion-solution-5.png`
- `tests/artifacts/mobile-hero-density/`의 360×640, 390×844, 430×932 산출물

과거 세대인 2026-07-03 customer-card-system 산출물은 연혁 확인에만 사용하고 새 경험의 현행 기준으로 사용하지 않는다.

### 1.2 in-app browser 관찰

2026-07-10 현재 `/hero`를 직접 검토했다.

| 환경 | 현재 측정·관찰 | 명세에 미치는 영향 |
|---|---|---|
| desktop 1440×900 | 전체 문서 13,971px, Hero 5,850px, Solutions 4,500px | Hero 2막과 pinned Solutions가 Contact 도달 부담의 대부분을 차지함 |
| desktop Hero | `initial → orbit → handoff`가 약 5.5 viewport scrub을 사용 | customer orbit과 긴 handoff 제거 필요 |
| desktop handoff | topology, product cards, scope label, line, panel, red diamond가 동시 노출 | topology/red signal만 남겨 정보 밀도 축소 필요 |
| mobile 390×844 | Hero 844px, Solutions 4,677px, Company 2,099px, Engagement 1,214px, Contact 시작 8,834px | mobile은 pin이 없어도 반복 card와 긴 section이 부담 |
| mobile Hero 이후 | 4개 product stack이 각 Solution spotlight보다 먼저 다시 노출 | D-005/D-006에 따라 global stack 제거 필요 |
| console | 직접 검토 중 error 0 | 현재 오류 부재는 새 경험의 승인이나 접근성 완료를 뜻하지 않음 |

브라우저 자동 스크롤은 목표 progress보다 크게 이동하는 구간이 있었다. 이는 고정 `svh` 값이 물리 wheel, precision touchpad, touch swipe, keyboard 입력을 대표할 수 없다는 경고 신호이며 실제 입력장치 검증을 대체하지 않는다.

### 1.3 화면별 핵심 판정

| 화면 | 유지할 점 | 변경할 점 |
|---|---|---|
| Hero initial | 큰 h1과 Data Core가 GTG를 먼저 보여줌 | header/eyebrow 회사명 반복, 작은 저대비 본문, 장식 HUD 축소 |
| customer orbit | 관계 proof를 시각화하려는 의도 | 긴 두 번째 WebGL Hero, 모호한 `Representative Customers`, 읽기 어려운 원근 card 제거 |
| handoff | GTG topology가 고유 언어가 될 가능성 | product-logo strap, scope microcopy, 빈 panel, ambient diamond, 전면 암전 제거 |
| Solution 1 | title→설명→CTA의 기본 계층 | 번호 2중화, scope 문구/제품명 반복, 거대한 logo HUD panel 단순화 |
| Solution 5 | 유지할 capability 범위가 보임 | description/tag/card에서 같은 범위가 3회 반복되는 구조 제거 |
| mobile | 정상 문서 스크롤, Canvas 없음 | unqualified logo strip, global product stack, `100svh` article과 큰 logo card 제거 |
| reduced motion | orbit과 WebGL을 피할 수 있음 | 멈춘 fullscreen 장면이 아니라 처음부터 no-pin 자연 문서 흐름으로 변경 |

## 2. 5초 안에 이해해야 할 GTG 메시지

### 2.1 메시지 목표

사용자는 첫 화면에서 다음 세 가지를 순서대로 이해해야 한다.

1. 이 사이트의 주체는 GTG다.
2. GTG의 시각적 중심은 `GTG Data Core`다.
3. Data Core가 Data & Analytics, Data Streaming, Infrastructure Automation, DevOps & Quality, Consulting & Technical Support의 다섯 현재 Solution 축을 연결한다는 제안 방향이다.

### 2.2 제안 문장

**제안 positioning — 사실 및 공개 copy 미승인**

> **GTG는 Data Core를 중심으로 데이터 분석, 데이터 스트리밍, 인프라 자동화, DevOps 품질, 컨설팅·기술지원을 연결합니다.**

이 문장은 경험 설계를 위한 positioning target이며 공개용 최종 copy 승인이 아니다. 공식 회사명, `Data Core` 용어, 각 capability 명칭과 동사의 최종 사용은 content/brand 승인 후 확정한다. Hero에는 고객명, partner tier, certification, 성능 수치 또는 특정 제품 도입 claim을 넣지 않는다.

### 2.3 첫 화면 계층

1. h1: 한 문장 가치 제안
2. Data Core visual: GTG identity를 보조
3. 짧은 설명: 다섯 capability 연결
4. primary CTA: Contact로 이동
5. 나머지 label은 화면 이해에 꼭 필요한 경우만 사용

Header의 회사명과 같은 문구를 Hero eyebrow에서 반복하지 않는다. Hero eyebrow가 필요하면 회사명이 아니라 장면 역할인 `GTG Data Core` 한 번만 사용한다.

## 3. 최종 section 순서와 역할

| 순서 | section/component | 한 문장 역할 |
|---|---|---|
| 1 | `SiteHeader` | 어느 지점에서도 Solutions와 Contact로 바로 이동할 수 있는 전역 경로를 제공한다. |
| 2 | `HeroExperience` / `#top` | GTG와 Data Core 중심 메시지를 5초 안에 이해시키는 유일한 WebGL 장면이다. |
| 3 | `CustomerProofBand` / `#proof` | 승인된 관계 범위를 조직명과 함께 명시적으로 읽게 하되 제품 고객·파트너·보증으로의 오해를 막는다. |
| 4 | `SolutionsHandoff` | Data Core의 한 topology signal이 다섯 capability route로 분기되는 짧은 HTML/SVG 전환이다. |
| 5 | `SolutionSequence` / `#solutions` | 다섯 Solution을 정상 문서 흐름으로 설명하고 대응 product 또는 GTG capability mark를 각 Solution에서 한 번만 보여준다. |
| 6 | `CompanyOverview` / `#company` | GTG의 capability 구조를 제품 logo가 아닌 capability map으로 설명한다. |
| 7 | `EngagementModel` / `#engagement` | Diagnose→Design→Implement→Operate의 수행 흐름을 한 번의 ordered list로 설명한다. |
| 8 | `ContactSection` / `#contact` | 사용자가 가장 적은 행동으로 공식 문의 경로에 도달하게 한다. |
| 9 | `SiteFooter` | 승인된 legal identity와 policy link만 제공한다. |

`SolutionsHandoff`는 의미 콘텐츠 section이 아니라 장면 연결용 presentation이다. 별도 heading을 만들지 않고 Solutions heading을 다음 의미 경계로 사용한다.

`Diagnose → Design → Implement → Operate`는 현재 코드에 구현된 Engagement label을 가리키며 공개용 최종 copy 승인이 아니다. 네 단계 구조는 유지하되 label은 content 승인 후 확정한다.

## 4. Customer proof 표현과 데이터 gate

### 4.1 금지 표현

- 맥락 없는 `Representative Customers`
- 관계 유형이 섞인 logo wall을 `고객`, `파트너`, `제품 고객` 중 하나로 통칭
- logo만 보여주고 GTG와의 관계 범위를 쓰지 않는 방식
- 고객 logo를 특정 vendor Solution과 가까이 배치해 해당 제품 도입 고객처럼 보이게 하는 방식
- `user-confirmed`를 `public-use-approved`로 표현하는 방식

### 4.2 public copy 구조

각 항목은 다음 두 정보를 같은 semantic item 안에 제공해야 한다.

- `{조직명}`
- `{권한자가 승인한 GTG와의 실제 관계 범위}`

관계 유형이 둘 이상이면 통합 logo wall을 만들지 않고 승인된 `relationshipType`별로 묶는다. 정확한 관계 문구가 확정되지 않은 항목은 공개 RC에서 표시하지 않는다.

보조 설명의 제안 구조:

> 이 목록은 특정 제품의 도입, 제품 제조사의 고객 지위, 파트너 등급, 인증 또는 보증을 의미하지 않습니다.

이 설명은 관계와 logo 사용 증빙을 대신하지 않는다.

### 4.3 local-only 처리

`proofMode`는 `blocked | local-only | public` 세 상태를 사용하고 default는 `blocked`다. source는 URL, basePath, `noindex` 또는 client-side 추론이 아니라 schema로 검증된 명시적 build/release configuration이어야 한다.

- missing/unknown/invalid mode: `blocked`; 조직명, logo, 관계 copy와 asset request를 만들지 않는다.
- `local-only`: 명시적인 local build configuration에서만 활성화하며 section과 각 item에 검토 상태를 표시한다.
- `public`: 명시적인 release configuration에서만 활성화하고 아래 public 조건을 모두 통과한 item만 선택한다.

현재 로컬 prototype에서 기존 항목을 레이아웃 검토용으로 표시할 경우 section과 각 item에 다음 상태를 명확히 둔다.

- visible label: `관계 범위 검토 중 · 로컬 프로토타입`
- data state: `data-release-status="local-only"`
- public mode: 조건 미충족 item을 render하지 않음

public mode에서 승인 item이 0개면 빈 heading/qualifier를 남기지 않고 `CustomerProofBand` 전체를 생략한다. 이 경우 일반 local production build와 별개인 **public RC proof-readiness gate**는 실패해야 하며, proof가 준비된 것처럼 보고하지 않는다.

`/hero`, `noindex`, `siteContent.isApproved`만으로 local-only 상태를 추론하지 않는다. 별도의 명시적 build/runtime mode가 필요하다. `local-only` 설정은 외부 preview·공개 터널·운영 배포에서 허용하지 않는다.

### 4.4 content contract

| field | 역할 | public 조건 |
|---|---|---|
| `displayName` | 조직의 승인된 표시명 | copy 승인 필요 |
| `relationshipType` | GTG와의 실제 관계를 나타내는 통제어 | 권한자 승인 필요 |
| `relationshipScope` | 관계의 범위와 필요한 제한 | 권한자 승인 필요 |
| `relationshipEvidenceLevel` | ledger의 증거 수준을 원문 그대로 보존 | `user-confirmed`를 승인 상태로 승격 금지 |
| `relationshipApprovalStatus` | 권한자의 관계 범위 공개 승인 | `approved`와 증빙 reference 필요 |
| `publicUseStatus` | logo/명칭 공개 사용 상태 | `public-use-approved` 필요 |
| `copyApprovalStatus` | 관계 문구 공개 승인 | `approved` 필요 |
| `logoSrc` / `logoAlt` | official master와 대체 텍스트 | source/hash/approval ledger 연결 필요 |

public render 조건은 `relationshipApprovalStatus`, `publicUseStatus`, `copyApprovalStatus`를 각각 확인한다. 하나의 boolean으로 합치지 않는다. `relationshipEvidenceLevel="user-confirmed"`는 현재 증거 수준을 기록할 뿐 어느 승인 field도 자동 충족하지 않는다.

## 5. Product logo 1회 reveal 원칙

### 5.1 배치

- Hero: product logo 0개
- Customer proof: product logo 0개
- Handoff: product logo 0개
- global/static product stack: 0개
- Solution 01–04: 대응 제품 context 안에서 mark 1개
- Solution 05: vendor mark 없이 GTG capability visual 1개

### 5.2 reveal 순서

1. Solution heading과 한 문장 설명이 먼저 읽힌다.
2. 해당 capability topology node가 active state가 된다.
3. official product mark가 그 node와 연결된 단일 `ProductReveal` 안에서 나타난다.
4. 사용자가 reverse scroll하더라도 작은 경계 진동으로 logo가 반복 점멸하지 않는다.

`ProductReveal`은 제품명을 logo, h3, descriptor에서 중복하지 않는다. 인접한 visible product name이 accessible name을 제공하면 image alt는 빈 값으로 두고, 그렇지 않으면 승인된 하나의 alt만 사용한다.

### 5.3 local placeholder와 public RC

- 로컬 prototype에서는 현재 asset을 layout placeholder로 사용할 수 있다.
- placeholder를 변형·재가공하거나 새 logo를 외부에서 받지 않는다.
- public RC에서는 official master와 permission gate를 통과한 경우에만 같은 slot을 활성화한다.
- permission이 없으면 approved text-only nominative reference 또는 logo 없는 capability treatment로 강등한다.
- LoadRunner의 현재 `pngaaa.com` 파일은 public asset으로 승격하지 않는다.

## 6. Hero→Solutions topology handoff

### 6.1 장면안

1. Data Core가 마지막 identity state에서 짧게 scale out한다.
2. 다섯 capability exit node가 보인다.
3. Hero는 하나의 signal을 하단 경계에 남기고 종료한다.
4. CustomerProofBand는 scrub/pin 없이 차분한 문서 흐름으로 지나간다.
5. `SolutionsHandoff`의 HTML/SVG가 같은 signal token을 이어받아 다섯 route로 분기한다.
6. 첫 route가 Solution 01 heading에 도달한 뒤 정상 article 흐름이 시작된다.

Hero와 handoff 사이의 시각 토큰은 연속되지만 WebGL DOM을 Hero 밖으로 이동하지 않는다. Handoff는 CSS/SVG이며 모든 의미 정보는 Solutions HTML에 존재한다.

Hero와 `SolutionsHandoff` 사이에는 `CustomerProofBand`가 있으므로 두 장면을 시간상 겹치거나 proof를 관통하는 장식 line을 만들지 않는다. 연속성은 같은 signal 역할과 형태를 다시 받아 쓰는 의미적 연속성이다. 허용하는 한 번의 layered crossfade는 `SolutionsHandoff` 내부에서 단일 signal state가 다섯 route state로 바뀌는 구간에만 적용한다.

### 6.2 금지 요소

- 전면 black reset 또는 의미 없는 빈 viewport dwell
- product-logo strap과 blurred product card
- `Solution scope`, `Technology scope`, `scope reference`
- 고객 logo 또는 고객 관계 copy
- 연결 대상이 없는 장식 line/panel

### 6.3 signal 예산

- ambient red diamond는 사용하지 않는다.
- 한 장면에서 red signal은 현재 위치와 목적 node를 합쳐 최대 2개만 보인다.
- 모든 line은 실제 다섯 capability node 중 하나와 연결되어야 한다.
- 빈 floating panel과 장식용 frame은 제거한다.
- exact red 값은 공식 brand red 승인 전 semantic token `--color-brand-signal`로만 지칭한다.

## 7. 제거할 HUD 요소

| 제거 대상 | 현재 예 | 목표 처리 |
|---|---|---|
| 불필요한 micro label | `Solution scope`, `Technology scope`, `scope reference`, 반복 eyebrow | heading 또는 figcaption 하나로 통합 |
| 중복 scope 문구 | description, related tags, spotlight title/descriptor/list | 설명 1회 + semantic capability list 1회 |
| 과도한 red diamond | background·line·card 주변 ambient marker | 의미 있는 active signal만 최대 2개 |
| 장식용 선 | node에 연결되지 않는 hairline, frame line | 실제 topology edge만 유지 |
| 장식용 panel | 빈 floating rectangle, card 뒤 중첩 frame | product reveal 또는 capability map의 실제 content container만 유지 |
| 중복 숫자 HUD | article `01/05` + 우측 `01–05` rail | section-local route의 한 번호 체계만 사용 |
| 환경 badge | 화면 우하단 `MVP PROTOTYPE` | 브랜드 장면에서 제거하고 local dev chrome으로만 분리 |

## 8. Desktop, mobile, reduced-motion 흐름

### 8.1 Desktop

1. Header는 고정하되 Hero 메시지와 경쟁하지 않는다.
2. Hero는 Data Core 하나만 짧게 pin/scrub할 수 있다.
3. customer proof는 normal flow HTML band다.
4. handoff는 pin 없는 짧은 topology transition이다.
5. Solutions는 다섯 semantic article의 정상 흐름이다.
6. topology visual column은 필요할 경우 desktop에서만 section-local sticky가 될 수 있지만 article을 fullscreen layer로 겹치지 않는다.
7. product reveal은 각 article 내부에서 한 번만 실행된다.
8. Company, Engagement, Contact는 normal flow를 유지한다.

### 8.2 Mobile

1. 첫 render부터 static Data Core를 사용하고 WebGL을 mount하지 않는다.
2. Hero는 content-driven height이며 특정 `100svh`를 강제하지 않는다.
3. proof item은 한 열 또는 wrapping list로 표시하며 logo-only strip을 사용하지 않는다.
4. handoff는 inline SVG의 최종 topology state를 짧게 보여준다.
5. Solution article은 single column이며 `min-height: 100svh`를 요구하지 않는다.
6. product reveal은 title/설명 뒤에 오며 viewport 절반을 차지하는 HUD card를 만들지 않는다.
7. Solution route는 두 줄까지 wrapping되는 in-flow anchor list이며 horizontal scroll을 요구하지 않는다.
8. Company/Capability의 긴 목록과 map은 heading→요약→map 순으로 읽히고 중복 product list를 만들지 않는다.

### 8.3 Reduced motion

1. preference 판정 전 상태는 static을 기본값으로 한다.
2. Canvas는 `no-preference + desktop + WebGL available`이 모두 확인된 뒤에만 mount한다.
3. Hero, proof, handoff, Solutions는 처음부터 최종 semantic state를 보여준다.
4. pin, scroll scrub, pullback, parallax, staged crossfade를 사용하지 않는다.
5. product reveal은 animation 없이 즉시 보인다.
6. duration을 1ms로 줄인 motion 장면이 아니라 animation state 자체를 생성하지 않는다.
7. screenshot은 fallback image `naturalWidth > 0`, h1, 설명, CTA readiness를 확인한 뒤 캡처한다.

### 8.4 WebGL failure fallback

- reduced/mobile과 같은 Data Core HTML/SVG composition을 사용한다.
- customer proof strip을 Hero fallback 안에 넣지 않는다.
- service/capability 의미는 Canvas 밖 semantic HTML로 유지한다.
- renderer 실패가 나머지 section과 CTA 접근을 막지 않는다.

## 9. Semantic HTML 구조

목표 heading 구조는 다음과 같다.

| 영역 | semantic 구조 |
|---|---|
| global | skip link → `header` → `main#main-content[tabindex=-1]` → `footer` |
| Hero | `section#top[aria-labelledby]` + h1 + 설명 + CTA + Canvas wrapper `aria-hidden=true` + semantic capability summary |
| proof | `section#proof[aria-labelledby]` + h2 + 설명 + visible `ul`/grouped lists |
| handoff | 의미 copy가 없는 `div[aria-hidden=true]`; 별도 heading 없음 |
| Solutions | `section#solutions[aria-labelledby]` + h2 intro + in-flow route nav + 5개 `article`/h3 |
| product reveal | article 안 `figure` + 필요한 경우 `figcaption`; interactive logo 금지 |
| Company | section h2 + capability map h3 + visible list |
| Engagement | section h2 + `ol` 4단계 + 각 item h3 |
| Contact | section h2 + action links + `dl` 연락처 |

고객명과 logo를 visible list와 sr-only duplicate list에 동시에 만들지 않는다. 하나의 semantic list를 CSS로 반응형 표현한다. Canvas와 decorative SVG는 `aria-hidden`으로 두고 핵심 메시지와 capability 이름을 넣지 않는다.

## 10. Keyboard와 focus 동작

- skip link activation은 `main#main-content`에 실제 focus를 전달한다.
- Header ABOUT/SOLUTIONS/ENGAGEMENT/CONTACT/TOP anchor는 basePath 경계를 유지한다.
- `SolutionRouteNav`는 native anchor list이며 각 target h3는 `tabindex="-1"`을 가질 수 있다.
- 사용자가 route link를 명시적으로 활성화했을 때만 target heading으로 focus를 전달한다.
- passive scroll, IntersectionObserver, product reveal은 focus를 이동하지 않는다.
- scroll에 따른 `aria-current` 변경은 live announcement를 만들지 않는다.
- 모든 Solution article은 DOM에 정상 노출되고 `inert`/`aria-hidden` layer 전환에 의존하지 않는다.
- product logo/topology는 focus target이 아니다.
- menu dialog의 기존 Tab trap, Escape close, trigger focus restore는 유지한다.
- reduced motion에서는 smooth scroll을 사용하지 않는다.
- Hero CTA와 Solution 5 CTA는 한 번의 activation으로 Contact heading에 도달하고 focus가 확인 가능해야 한다.

## 11. Scroll progress와 장면 역할

물리 scroll 거리가 아니라 normalized progress와 named state로 장면을 설명한다. named state의 순서와 역할은 계약이지만 아래 fraction은 사용자 승인 전 calibration 가능한 제안값이다.

### 11.1 Hero normalized progress

| progress | state | 역할 |
|---|---|---|
| `0.00–0.25` | `identity` | h1, 설명, CTA와 Data Core를 완전히 읽을 수 있게 유지 |
| `0.25–0.60` | `core-active` | topology edge와 capability signal이 Data Core에서 활성화 |
| `0.60–0.82` | `core-pullback` | 유지하는 OVA 문법 1: 한 번의 짧은 pullback으로 다섯 exit node를 드러냄 |
| `0.82–1.00` | `core-settle` | 한 signal을 Hero 경계에 남기고 static final state로 종료 |

customer logo, product logo, black reset은 Hero progress에 존재하지 않는다.

### 11.2 CustomerProofBand

- progress state가 없다.
- pin/scrub/autoplay를 사용하지 않는다.
- 18개 항목을 semantic list에 유지하는 수동 HTML/CSS 캐러셀은 허용한다. 이전·다음 버튼, 키보드, 터치 스와이프를 지원하고 비활성 slide를 `aria-hidden` 또는 `inert`로 숨기지 않는다.
- section 진입 즉시 heading, qualifier, 항목이 읽힌다.

### 11.3 SolutionsHandoff local progress

Handoff는 pin하지 않으며 viewport 교차 정도를 local progress로 사용할 수 있다.

| progress | 역할 |
|---|---|
| `0.00–0.35` | Hero final state와 같은 역할·형태의 signal token을 다시 보여줌 |
| `0.35–0.75` | signal이 다섯 capability route로 분기 |
| `0.75–1.00` | 첫 route와 Solutions h2가 연결되고 전환 종료 |

정확한 duration과 travel distance는 입력장치 QA 후 조정한다. reduced/mobile에서는 최종 state만 표시한다.

### 11.4 Solutions article state

- global `0–1` scrub과 `floor(progress × 5)`를 제거한다.
- 각 article은 `before | current | after` intersection state만 가진다.
- state는 route의 `aria-current`와 optional visual column을 갱신하지만 article visibility, 읽기, focus를 통제하지 않는다.
- product reveal은 `idle | active | seen`으로 관리하고 한번 `seen`이 되면 경계 진동으로 재실행하지 않는다.

## 12. 임의의 `svh` 숫자를 고정하지 않는 조정 방법

### 12.1 금지

- 현재 `650svh`를 목표값으로 복사
- Solutions를 `5 × 100svh`로 고정
- automated screenshot 통과만으로 physical input 체감을 승인
- 한 viewport에서 맞춘 값을 mobile 전체에 적용

### 12.2 calibration parameter

Hero travel은 `--hero-scroll-travel` 같은 명시적 calibration parameter로 분리하되 이 문서에서는 숫자를 승인하지 않는다. semantic DOM과 named state 순서는 유지하고 travel을 먼저 조정한다. normalized boundary는 초기 제안값이며 반복된 입력장치 증거가 있을 때만 §12.3 절차로 수정한다. Handoff와 Solutions는 content-driven normal flow를 기본값으로 한다.

### 12.3 측정 절차

1. 1280×720, 1440×900, 360×640, 390×844, 430×932와 landscape를 준비한다.
2. mouse wheel, precision touchpad, touch swipe, PageDown, Space, Shift+Space, keyboard anchor를 각각 테스트한다.
3. 장면별 진입/종료 시점, 한 입력으로 scene을 건너뛰는지, reverse scroll 회복, blank dwell, address-bar 변화, resize/orientation 후 desync를 기록한다.
4. 200% text zoom과 긴 번역/승인 copy에서 h1·CTA clipping을 기록한다.
5. 먼저 `--hero-scroll-travel`을 조정한다. 여러 입력장치에서 같은 read-time·overshoot 문제가 반복되면 named state 순서는 유지한 채 normalized boundary도 근거와 함께 수정할 수 있다.
6. travel과 boundary 변경 전후 기록을 남기고 사용자 승인 후에만 release token과 fraction을 고정한다.

### 12.4 acceptance signal

- 첫 화면 메시지는 scroll 없이 읽힌다.
- 일반적인 한 번의 입력으로 `identity`에서 `core-settle`까지 건너뛰지 않는다.
- reverse scroll에서 장면이 안정적으로 되돌아온다.
- 완전한 빈 화면을 통과하지 않는다.
- mobile 주소창 변화와 orientation change에서 CTA가 잘리지 않는다.
- Contact anchor는 motion 진행률과 무관하게 즉시 작동한다.

## 13. Solution 5 중복 문구 제거안

유지하는 semantic content:

1. h3: `Consulting & Technical Support`
2. 짧은 설명 한 문단
3. capability list 한 번
   - DB 컨설팅
   - 테스트 컨설팅
   - 프로세스 컨설팅
   - 형상관리
   - 기술지원
   - 교육 문의
4. Contact로 가는 CTA 한 개
5. decorative GTG capability topology 한 개

제거하는 content:

- 큰 `GTG Support Scope` textmark
- 바로 아래 같은 이름의 h3
- description과 동일한 `related` tag 반복
- spotlight 안 동일 6개 chip 반복
- `GTG capability scope`, `Consulting and support scope` micro label
- 중앙 `05/05`와 우측 `05`의 중복 번호

Solution 5에는 vendor logo를 만들지 않는다. capability visual은 `aria-hidden`이고 의미는 h3, 설명, list에서 제공한다.

## 14. CTA와 Contact 도달 부담

### 14.1 현재 부담

- 직접 경로는 Header CONTACT 또는 Hero CTA 한 번으로 가능하다.
- 순차 scroll은 desktop에서 650svh Hero, 500svh Solutions, Company, Engagement를 지나야 한다.
- mobile은 menu→CONTACT 두 번이 필요하고, scroll path에서는 약 8,834px 지점에서 Contact가 시작된다.
- Hero, Solution별 CTA, Contact의 동등한 두 button이 서로 경쟁한다.

### 14.2 목표

- desktop Header CONTACT: 1 activation
- Hero CTA: 1 activation
- Solution 5 CTA: 1 activation
- mobile menu: open + CONTACT, 최대 2 activation
- 어느 section도 다음 content를 보기 위해 button/rail을 눌러야 하지 않음
- pin을 끝내야 Contact가 unlock되는 구조 금지
- 각 Solution은 context CTA 최대 1개
- Contact는 primary action 1개, email/phone은 secondary text action으로 계층화
- anchor activation 후 Contact h2에 focus를 전달해 도달을 확인 가능하게 함

## 15. 구현 단위

### 15.1 Component

| 단위 | 책임 | 현재 코드에서 제거/이관 |
|---|---|---|
| `HeroExperience` | h1, 설명, CTA, Data Core progress | customer keyword/orbit, product stack 제거 |
| `HeroCanvas` | Data Core geometry와 Hero topology only | `CanvasTexture`, `ProofOrbit`, `mediaItems` 제거 |
| `HeroFallback` | static Data Core only | customer strip, service rail 제거 |
| `CustomerProofBand` 신규 | 관계 qualifier, visible semantic list, local/public gate | Hero customer imports 이관 |
| `SolutionsHandoff` 신규 | HTML/SVG signal과 5 route | Hero product preview 대체 |
| `SolutionRouteNav` 신규 | in-flow 5-node anchor list | vertical rail 대체 |
| `SolutionSequence` | normal-flow 5 articles | pinned layer와 global stack 제거 |
| `SolutionArticle` | heading, 설명, list, CTA | 반복 layout 책임 분리 |
| `ProductReveal` | article별 mark 1회 | spotlight 중복 panel 단순화 |
| `CompanyOverview` | capability 중심 설명 | product logo/list 중복 방지 |

`src/app/page.tsx`의 목표 조립 순서는 `HeroExperience → CustomerProofBand → SolutionsHandoff → SolutionSequence → CompanyOverview → EngagementModel → ContactSection`이다.

### 15.2 State

| state | 값 | 규칙 |
|---|---|---|
| `experienceMode` | `pending \| motion \| mobile \| reduced \| fallback` | default `pending`은 static; 조건 확인 전 Canvas 금지 |
| `heroState` | `identity \| core-active \| core-pullback \| core-settle` | customer/product state 없음 |
| `proofMode` | `blocked \| local-only \| public` | default `blocked`; schema-validated build/release config만 source로 사용 |
| `activeSolutionId` | solution id 또는 null | IntersectionObserver용, content visibility 통제 금지 |
| `productRevealState` | `idle \| active \| seen` | `seen` 이후 작은 scroll 진동으로 재실행 금지 |

### 15.3 Content

- `solutionStackItems`의 Hero/static global consumer를 제거한다.
- customer 관계와 logo 공개 상태를 별도 field로 분리한다.
- Solution별 product mark source는 해당 Solution data에만 둔다.
- Solution 5는 description/list/CTA 단일 source를 사용한다.
- exact public copy, official name, red, logo source는 승인 gate 전 provisional 상태를 유지한다.

### 15.4 CSS

제거 후보:

- `.hero-proof-copy`
- `.hero-solution-stack*`
- `.solution-stack-static*`
- `.solution-rail*`
- absolute fullscreen `.solution-layers`
- `--solution-count` 기반 `calc(count * 100svh)`
- ambient red marker와 empty panel 스타일
- Solution 5 duplicate scope chip 스타일

추가 단위:

- `.customer-proof-band`, `.customer-proof-list`, `.customer-proof-item`
- `.solutions-handoff`, `.topology-signal`, `.topology-route`
- `.solution-route-nav`
- `.solution-sequence`, `.solution-article`
- `.product-reveal`
- `[data-experience-mode]`, `[data-hero-state]`, `[data-reveal-state]`

motion token은 기능 이름으로 관리하고 OVA timing을 복사하지 않는다. 공식 red 승인 전 hex를 새 명세값으로 고정하지 않는다.

## 16. 검증 명세

### 16.1 자동 검증

- DOM 순서가 Hero→proof→handoff presentation→Solutions→Company→Engagement→Contact인지 확인
- WebGL canvas가 Hero 안에만 존재하는지 확인
- Hero가 customer asset을 request하지 않는지 확인
- proof item이 Hero Canvas와 sr-only duplicate에 중복되지 않는지 확인
- missing/invalid proof mode에서 proof DOM과 customer asset request 0
- public mode의 승인 item 0건에서 proof section 0, public RC proof-readiness gate 실패
- handoff 내부 product logo 수 0
- global product stack 수 0
- Solution 01–04 product mark가 해당 article에 각각 최대 1개
- Solution 05 vendor mark 0, capability 항목 각 1회
- vertical rail 0
- 모든 Solution article이 semantic DOM과 Tab order에 존재
- skip link와 explicit anchor focus transfer
- passive scroll에서 focus 변화 0
- reduced-motion을 navigation 전에 설정하고 첫 frame부터 canvas 0
- mobile에서 Hero/Solution pin 0, horizontal overflow 0
- basePath-aware anchor와 asset request 유지
- console error 0, asset 404 0, 모든 image `naturalWidth > 0`

### 16.2 screenshot 검증

- desktop Hero identity
- desktop proof band
- desktop topology handoff final state
- Solution 01 product reveal
- Solution 05 simplified capability state
- mobile Hero/proof/Solution 01/Solution 05/Contact
- reduced Hero/proof/Solutions

캡처는 image와 font readiness를 기다린다. 오래된 빈 fallback screenshot을 성공 기준으로 사용하지 않는다.

### 16.3 수동 검증

- mouse wheel, precision touchpad, touch, PageDown/Space/Shift+Space
- reverse scroll과 resize/orientation
- 실제 mobile 주소창 open/close
- keyboard only와 200% text zoom
- screen reader heading/list/anchor 순서
- physical input 기록을 바탕으로 Hero travel calibration

## 17. 명시적 비범위와 미결정

- CMS/API/DB/auth/contact persistence
- production domain, hosting, `/hero` 의미, canonical 정책
- 공식 회사명과 최종 5초 copy
- 공식 GTG master/red/favicon/OG
- 고객별 정확한 relationship label과 public-use approval
- Vertica/Confluent/HashiCorp/OpenText mark의 public permission과 최신 master
- physical input QA 전 Hero travel 숫자
- 외부 이미지 다운로드 또는 logo 재가공

## 18. 사용자 승인 항목

- [x] 제안 5초 문장 자체와 section 순서
- [x] customer proof의 관계별 grouping, local-only label, public omission rule
- [x] handoff에서 topology/red signal만 사용하고 product strap을 제거하는 안
- [x] 각 Solution의 product mark 1회 reveal과 Solution 5의 capability-only 처리
- [x] vertical rail 제거 및 in-flow `SolutionRouteNav` 대체
- [x] OVA 문법을 짧은 pullback과 topology crossfade 두 개로 제한
- [x] desktop normal-flow Solutions, mobile/reduced no-pin 구조
- [x] fixed `svh` 대신 physical-input calibration 절차
- [x] CTA/Contact 도달 기준

위 항목은 2026-07-10 사용자 승인을 받았다. 이 문서 단계에서는 구현하지 않으며 별도 구현 요청에서만 적용한다.
