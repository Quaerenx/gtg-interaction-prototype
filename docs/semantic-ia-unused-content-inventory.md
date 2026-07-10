# Semantic IA unused content inventory

> - 작성일: 2026-07-10
> - 적용 단계: 정보구조와 semantic DOM 구현
> - 원칙: consumer를 먼저 제거·확인하고, 관계·권리·대체 텍스트 근거가 될 수 있는 field는 이 단계에서 삭제하지 않는다.

## 1. 이번 단계에서 consumer가 제거된 파생 구조

아래 구조는 Hero customer orbit, fallback customer strip, handoff product strap의 전용 adapter 또는 중복 source였다. 새 semantic 구조가 원본 배열을 stable ID로 직접 소비하므로 `rg`로 외부 consumer 0건을 확인한 뒤 제거한다.

| 구조 | 기존 역할 | 안전한 정리 근거 |
|---|---|---|
| `HeroCustomer` | `CustomerProofItem`을 Hero 전용 `label`/`visual` 형태로 중복 | `CustomerProofBand`가 `customerProofItems`를 직접 소비 |
| `heroCustomers` | 18개 고객 adapter | Hero의 중복 sr-only list와 Canvas customer texture 제거 |
| `heroRingCustomerIds`, `heroCustomerById`, `heroRingCustomers` | WebGL orbit용 12개 선별 | `ProofOrbit`과 fallback logo strip 제거 |
| `SolutionStackItem`, `solutionStackItems` | Hero/static global product stack | 각 `solutionSlides[].productSpotlight`만 대응 Solution에서 소비 |
| `firstSolution` | `solutionSlides[0]` 기반 Hero preview | Hero product preview 자체 제거; stable Solution route 사용 |

## 2. 보존하는 미사용 또는 부분 사용 field

아래 field는 현재 semantic DOM에서 직접 출력하지 않거나 일부만 사용하지만, 승인·권리·responsive copy·asset 정리 결정 전에 삭제하지 않는다.

| field | 현재 상태 | 보존 이유와 후속 조건 |
|---|---|---|
| `siteContent.language`, `siteContent.badge` | 현재 component consumer 없음 | locale/개발 표식 정책을 별도 결정한 뒤 정리 |
| `brandContent.koreanName`, `brandContent.logo` | 현재 component consumer 없음 | 공식 회사명·master logo 결정과 함께 정리 |
| `HeroService`, `heroServices` | semantic summary source를 `solutionSlides`로 전환해 현재 component consumer 없음 | 기존 7개 service 분류와 generated asset의 후속 사용 여부를 content 단계에서 결정한 뒤 정리 |
| `heroContent.eyebrow` | visible `GTG Data Core` label이 역할을 단일화 | Hero micro-label 정책을 다음 content 단계에서 확정 후 정리 |
| `CustomerProofItem.cardSrc` | 값과 consumer 없음 | customer card 체계의 과거 계약 확인 후 제거 |
| `CustomerProofItem.proofLabel` | 새 section heading/설명이 역할 대체 | 관계 유형 schema 확정 후 migration하고 제거 |
| `CustomerProofItem.publicDisplayApproved` | `data-evidence-level`로만 보존 | `user-confirmed`를 public approval로 승격하지 않고 새 approval schema로 이관 |
| `CustomerProofItem.visualAlt` | 인접한 visible 조직명이 accessible name 제공 | 공식 logo master와 alt 정책 확정 후 정리 |
| `SolutionSlide.eyebrow`, `index`, `visualAlt` | 새 normal-flow article에서 미사용 | 번호 체계와 decorative image alt 정책을 다음 motion/content 단계에서 확정 |
| `SolutionProductSpotlight.eyebrow`, `descriptor`, `logoAlt` | `id`/`label`/`logoSrc`/`variant`만 사용 | microcopy 삭제 승인과 official logo/alt 결정 후 정리 |
| `HeadlineLines.mobile` | 현재 desktop 배열을 공통 사용 | responsive copy 계약을 별도 확정한 뒤 정리 |
| `capabilityMapContent.visualAlt` | map image는 decorative, visible list가 의미 제공 | map의 semantic/decorative 정책을 접근성 재검토 후 정리 |

## 3. CSS orphan 처리

새 DOM이 더 이상 생성하지 않는 `.hero-proof-copy`, `.fallback-proof-*`, `.hero-solution-stack*`, `.solution-stack-static*`, `.solution-rail*`, fullscreen `.solution-layers`, Solution 5 scope-chip selector는 런타임 consumer가 없다. 이번 단계에서는 구조 CSS override만 추가하고, 대규모 selector 삭제는 다음 motion polish에서 screenshot 회귀 검토와 함께 수행한다.

## 4. 후속 cleanup gate

1. `rg`로 source consumer 0건 확인
2. TypeScript `--noEmit`, lint, production build 통과
3. mobile/reduced/forceFallback에서 semantic content 동일성 확인
4. 공개 approval schema와 official asset 결정이 필요한 field는 유지
5. 별도 cleanup commit에서만 보존 field와 orphan CSS 삭제
