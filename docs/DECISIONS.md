# HERO 제품 방향 결정안

> - 작성일: 2026-07-10
> - 승인일: 2026-07-10
> - 상태: **APPROVED — 사용자 승인 완료**
> - 적용 기준선: `codex/hero-basepath-stabilization` / `0fc30c82566a073aa35538c3a81a6acf8aebf788`

이 문서는 다음 구현 단계의 제품 범위와 정보 구조를 고정하는 승인된 결정 기록이다. 현재 구현 상태와 승인 방향 사이의 차이는 `docs/CURRENT.md`가 기록한다. 이 승인만으로 다음 구현 단계를 자동 시작하지 않는다.

## 1. 기본 결정안

| ID | 제안 | 근거와 적용 경계 | 상태 |
|---|---|---|---|
| D-001 | 현재 목표를 CMS가 아니라 **단일 페이지 GTG 공식 홈페이지 RC**로 고정한다. | 현재 제품은 단일 frontend이고, 공개 준비의 핵심 blocker는 메시지·브랜드·권리·배포 승인이다. | 승인 |
| D-002 | Hero Act 1의 **GTG Data Core**를 핵심 정체성 장면으로 유지한다. | 방문자가 고객·제품 로고보다 GTG 자체를 먼저 기억하게 한다. WebGL은 계속 Hero에만 둔다. | 승인 |
| D-003 | customer proof를 긴 두 번째 WebGL Hero로 유지하지 않고 **별도 semantic HTML trust band(대안 C)**로 분리한다. | GTG 메시지와 customer proof의 역할을 분리하고 성능·접근성·승인 관리를 단순화한다. | 승인 |
| D-004 | Hero에서 Solutions로의 handoff는 **GTG topology signal**을 중심으로 한다. | 제3자 product logo가 GTG 브랜드보다 먼저 다음 장면을 정의하지 않게 한다. | 승인 |
| D-005 | product logo는 대응하는 각 Solution에서 한 번씩 강하게 등장시킨다. | 제품의 인지성은 유지하되 중복 노출과 partnership/endorsement 오해를 줄인다. | 승인 |
| D-006 | handoff product-logo strap과 Solution의 product spotlight 사이 중복 노출을 제거한다. | 현재 동일 제품군이 Hero handoff와 Solutions에서 반복된다. handoff strap을 제거한다. | 승인 |
| D-007 | OVA reference와 유사한 desktop vertical `01–05` rail을 제거하거나 GTG 고유 navigation으로 재설계한다. | exact placement와 choreography 유사성을 낮추고 GTG topology/capability 언어를 강화한다. 구체 navigation은 후속 명세에서 결정한다. | 방향 승인 |
| D-008 | **5개 Solutions, Company/Capability, Engagement, Contact**는 유지한다. | 현재 단일 페이지의 핵심 정보 구조이며 Canvas 없이도 읽을 수 있다. | 승인 |
| D-009 | CMS/API/DB와 문의 저장 기능은 명시적인 운영 요구가 생길 때까지 보류한다. | 현재 사용자·운영 workflow와 데이터 책임이 정의되지 않았다. 미래 기획 문서를 현재 구현 범위로 승격하지 않는다. | 승인 |
| D-010 | `/hero`가 preview 경로인지 production 경로인지 별도 운영 결정으로 남긴다. | 코드의 root canonical 후보와 현재 `/hero` reverse proxy mount는 서로 다른 맥락이다. hosting/domain 결정 없이 코드로 정책을 확정하지 않는다. | 별도 결정 승인·경로 미결정 |
| D-011 | customer proof trust band는 **수동 HTML/CSS 캐러셀**로 표시한다. | 18개 항목은 모두 semantic list에 유지하고 버튼·키보드·터치 스와이프를 제공한다. autoplay, WebGL customer orbit, pin/scrub은 사용하지 않는다. | 2026-07-12 사용자 승인 |

## 2. Hero와 customer proof 대안 비교

아래 평가는 실제 수치가 아니라 현재 구조를 기준으로 한 상대 비교다. 성능 수치는 후속 단계에서 production 측정으로만 확정한다.

| 기준 | A. 현재 2막 WebGL Hero 유지 | B. Data Core WebGL + 짧은 proof transition | C. Data Core WebGL + 별도 HTML customer proof |
|---|---|---|---|
| 메시지 명확성 | 낮음. GTG, customer proof, product scope가 긴 Hero 안에서 경쟁함 | 높음. GTG 다음에 짧은 trust cue를 제공함 | 가장 높음. GTG Hero와 customer proof의 역할이 명시적으로 분리됨 |
| 성능 | 가장 불리함. 두 장면의 texture·geometry·scroll state를 Hero가 부담함 | 중간. proof를 제한하면 현재보다 부담이 줄어듦 | 가장 유리함. WebGL은 Data Core에 집중하고 proof는 HTML/image로 관리 가능 |
| OVA 유사성 위험 | 가장 높음. orbit, pullback, black handoff, pinned sequence가 이어짐 | 중간. 두 번째 장면을 짧게 바꾸면 구조적 유사성이 줄어듦 | 가장 낮음. customer proof가 일반 문서 흐름으로 분리됨 |
| 고객 신뢰 | 중간. 시각적 임팩트는 있으나 이름·맥락·승인 상태를 읽고 검수하기 어려움 | 중상. 짧고 명확한 label을 전제로 trust cue를 유지함 | 가장 높음. semantic label, 이름, 대체 텍스트와 승인 단위를 명확히 관리 가능 |
| 유지보수성 | 가장 낮음. CanvasTexture, geometry, 장면 timing이 결합됨 | 중상. 짧은 장면만 관리하면 복잡도가 제한됨 | 가장 높음. proof 데이터·layout·접근성·자산 교체를 Hero와 분리 가능 |

### 대안별 판단

#### A. 현재 2막 WebGL Hero 유지

현재 코드의 실제 상태이며, Data Core 뒤에 별도 customer orbit act를 두는 구조는 과거 사용자 승인 이력이 있다. 영화적 연속성은 가장 강하지만 Hero가 GTG 정체성, customer proof, product 범위를 모두 떠맡는다. OVA와 유사한 문법의 조합도 가장 많이 남고, 고객 자산 승인 변경이 WebGL 장면 유지보수와 직접 결합된다. 2026-07-10 승인으로 목표 방향은 C로 교체되었지만, 별도 구현 단계 전까지 현재 코드는 A를 유지한다.

#### B. Data Core WebGL + 짧은 customer proof transition

Hero의 연속감을 중시할 때 가능한 차선책이다. customer proof는 한 가지 명확한 label과 제한된 시간·움직임만 사용하고, 긴 pinned orbit이나 두 번째 Hero 역할을 맡기지 않는다. C보다 motion 복잡도와 자산 결합이 남는다.

#### C. Data Core WebGL + 별도 semantic HTML customer proof section

**승인된 선택안이다.** Data Core가 Hero의 유일한 주제가 되고, customer proof는 짧은 HTML trust band로 분리된다. 이 구조는 다음 이유로 현재 제품 목표에 가장 잘 맞는다.

- GTG 정체성과 customer proof의 메시지 우선순위가 분명하다.
- WebGL 비용과 장면 상태를 Hero Act 1에 집중할 수 있다.
- OVA의 orbit→pullback→slide 연쇄와 구조적으로 거리를 둔다.
- logo별 공개 승인, 교체, 숨김과 대체 텍스트를 독립적으로 관리하기 쉽다.
- 모바일, reduced-motion, WebGL fallback에서도 같은 의미 구조를 유지하기 쉽다.

단, HTML로 옮긴다는 결정이 고객 관계나 logo 공개 사용을 승인하는 것은 아니다. 승인되지 않은 항목은 공개 RC에서 사용하지 않거나 별도 승인 gate를 통과해야 한다.

## 3. 승인된 정보 구조

승인된 C안을 다음 목표 구조로 사용한다.

1. Header
2. GTG Data Core WebGL Hero
3. 짧은 semantic HTML customer proof trust band
   - autoplay 없는 수동 캐러셀로 표현하되 18개 항목을 DOM에서 제거하거나 비활성화하지 않음
4. GTG topology signal 기반 Solutions handoff
5. 5개 Solutions
   - 승인된 각 product logo는 대응하는 Solution에서 한 번만 강하게 표현
   - Consulting & Technical Support는 확인되지 않은 product logo를 만들지 않고 GTG capability로 표현
6. Company / Capability
7. Engagement
8. Contact
9. Footer

이 순서는 방향 결정이며 시각 배치, copy, timing, 자산을 승인하지 않는다. 구현 전 별도 경험 명세와 브랜드·권리 gate가 필요하다.

## 4. Logo와 navigation 원칙

### 4.1 Product logo

- handoff에서는 GTG topology signal을 사용하고 product-logo strap은 제거한다.
- 각 product logo는 대응 Solution의 핵심 spotlight에서 한 번만 등장한다.
- logo 노출은 partner tier, certification, endorsement 또는 특정 고객의 제품 사용 관계를 암시하지 않아야 한다.
- 승인되지 않은 자산은 구현 편의 때문에 승인 상태로 승격하지 않는다.

### 4.2 Solution navigation

- 현재 vertical `01–05` rail은 그대로 유지하지 않는다.
- 제거 또는 GTG topology/capability를 이용한 고유 navigation 중 하나를 후속 경험 명세에서 비교한다.
- 모바일은 정상 문서 흐름과 semantic heading을 우선하며 desktop rail을 축소 복제하지 않는다.

## 5. 보류 범위

다음 요구가 구체적으로 정의되기 전까지 CMS/API/DB/auth/contact persistence를 설계·구현 범위에 넣지 않는다.

- 누가 어떤 콘텐츠를 어떤 승인 절차로 변경하는지
- 문의에서 어떤 데이터를 수집하고 누가 처리하는지
- 보존 기간, 개인정보 처리, 접근 권한, 감사와 삭제 요구
- 배포 환경과 운영 책임자
- 외부 시스템 연동 필요성

2026-07-09 미추적 기획 문서는 이 결정의 참고 자료일 뿐, 위 기능을 승인한 backlog가 아니다.

## 6. 별도 결정이 필요한 `/hero` 정책

다음 입력이 확정된 뒤 별도 결정 기록을 남긴다.

- production domain과 hosting/reverse proxy 구조
- production homepage가 domain root인지 path prefix인지
- preview와 production 환경 분리 방식
- canonical, robots, sitemap과 asset URL 정책

결정 전까지 `/hero`는 현재 안정화된 기본 runtime mount이며, production canonical 의미까지 갖는 것으로 확장 해석하지 않는다.

## 7. 승인 결과

- [x] 단일 페이지 공식 홈페이지 RC 범위와 유지 section, CMS/API/DB 보류
- [x] customer proof는 **C: 별도 semantic HTML trust band** 선택
- [x] topology handoff, logo strap 제거, product logo의 대응 Solution별 1회 강조, vertical rail 전환 방향
- [x] `/hero` preview/production 정책은 hosting·domain 결정과 함께 별도 확정

승인 상태는 2026-07-10 사용자 응답으로 갱신했다. 다음 단계는 별도 요청이 있을 때만 진행한다.
