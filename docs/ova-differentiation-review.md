# GTG / OVA Interaction Differentiation Review

> - 작성일: 2026-07-10
> - 상태: **APPROVED — 2026-07-10 사용자 승인, 구현은 별도 단계**
> - 현재 코드 기준선: `codex/hero-basepath-stabilization` / `3edd12ca919bcc52b002aa56ef665af7219b70e7`
> - 결정 근거: `docs/DECISIONS.md`의 승인된 C안
> - 실행 명세: `docs/experience-redesign-spec.md`
> - 범위: OVA와의 상호작용 문법 차별화 검토이며 시각 디자인, 코드, CSS, 자산을 변경하지 않음

## 0. 결론

새 경험에서 유지할 수 있는 일반 상호작용 문법은 다음 두 개로 제한한다.

1. **짧은 pullback 1회**: Hero의 GTG Data Core가 scale out하며 다섯 capability exit node를 드러내는 동작
2. **제한된 layered crossfade 1회**: HTML/SVG handoff 내부에서 단일 topology signal이 다섯 capability route로 바뀌는 전환

다음 네 문법은 제거한다.

- customer cylinder/orbit
- 전면 black handoff
- fullscreen Solution slide
- 고정 vertical 01–05 rail

이는 OVA의 장면을 축약해 재현하는 안이 아니다. OVA의 이미지, 영상, source, copy, logo, 정확한 배치·시간·색 구성을 사용하지 않고, GTG의 `Data Core → capability topology → semantic Solution`이라는 다른 정보 구조로 대체하는 안이다.

## 1. 검토 기준과 증거

### 1.1 기준

각 문법을 다음 질문으로 판정했다.

- GTG의 5초 메시지를 더 분명하게 만드는가?
- 고객·파트너·제품 고객 관계를 오해하게 하는가?
- WebGL을 Hero 밖으로 확장하게 하는가?
- mobile과 reduced-motion에서 같은 의미 순서를 유지할 수 있는가?
- semantic HTML과 keyboard 접근을 방해하는가?
- OVA의 고유한 장면 구성과 지나치게 비슷해 보이는가?
- 장기 유지보수에 필요한 상태와 CSS 복잡도를 정당화하는가?

### 1.2 직접 검토한 현행 화면

- `tests/artifacts/01-desktop-hero-initial.png`: GTG/Data Core hierarchy는 강하지만 micro label과 장식 HUD가 메시지를 분산시킨다.
- `tests/artifacts/02-desktop-customer-orbit-hero.png`: logo card orbit이 독립된 두 번째 Hero가 되어 고객 관계보다 원통형 장면 자체가 주인공이 된다.
- `tests/artifacts/04c-desktop-handoff-first-card.png`: topology와 함께 product strap, scope label, line, panel, diamond가 겹쳐 나온다.
- `tests/artifacts/05-desktop-solution-1.png`: fullscreen slide와 우측 rail, article number가 같은 navigation state를 중복 표현한다.
- `tests/artifacts/10-desktop-solution-5.png`: capability 범위가 본문·tag·spotlight에 반복된다.
- mobile/reduced-motion 산출물: orbit은 사라져도 global product stack과 큰 spotlight가 남아 Solution별 1회 reveal 원칙과 충돌한다.

2026-07-10 in-app browser 실검에서는 desktop Hero가 약 5.5 viewport의 `initial → orbit → handoff` scrub을 사용했고, mobile 390×844에서는 Contact가 약 8,834px에서 시작했다. 이 측정은 현행 부담을 설명하는 관찰값이며 새 높이의 목표값이 아니다.

## 2. 여섯 문법 비교와 판정

| 문법 | 현행 역할 | 판정 | GTG 대체안 | 차별화 기준 |
|---|---|---|---|---|
| cylinder/orbit | 고객 logo card를 원형 깊이 공간에 배치 | **제거** | 관계 범위가 적힌 `CustomerProofBand`의 semantic grouped list | logo spectacle 대신 조직명+관계 문구를 같은 item에서 읽음 |
| pullback | customer orbit에서 handoff 장면으로 카메라를 후퇴 | **제한 유지 1** | Data Core 한 개가 짧게 scale out해 다섯 capability exit node를 드러냄 | 고객 원통, ring, reflection, card procession 없이 GTG topology만 사용 |
| black handoff | 두 막 사이를 전면 암전과 빈 dwell로 분리 | **제거** | Hero 하단의 signal token을 밝기 단절 없이 다음 HTML/SVG topology로 전달 | 빈 cinematic reset 대신 정보의 연속성을 사용 |
| fullscreen slide | Solution을 viewport 전체 absolute layer로 교체 | **제거** | 다섯 semantic `article`의 normal flow와 선택적 desktop sticky topology column | 각 Solution이 읽히는 문서이며 slide show가 아님 |
| vertical number rail | 우측 01–05 progress/navigation | **제거** | Solutions intro 안 in-flow `SolutionRouteNav` 5-node anchor list | 장식 rail이 아닌 capability 이름 기반 navigation |
| layered crossfade | 장면과 Solution layer를 opacity/blur로 교체 | **제한 유지 2** | handoff의 단일 signal state와 다섯 route state 사이의 짧은 dissolve 한 번 | 전체 화면·제품 이미지 crossfade 금지, topology signal에만 적용 |

유지 수는 정확히 두 개이며, 같은 문법을 다른 section에 반복하지 않는다. pullback은 Hero에서만, layered crossfade는 `SolutionsHandoff` topology 내부에서만 허용한다.

## 3. 제거 문법별 구체 대체안

### 3.1 Cylinder/orbit → 관계가 읽히는 proof band

#### 제거 이유

- 원근으로 작아진 logo card는 이름과 관계 범위를 읽기 어렵다.
- `Representative Customers`만으로는 GTG 고객, vendor 제품 고객, 파트너, 사례, endorsement 중 무엇인지 구분되지 않는다.
- 고객 자산을 WebGL texture로 로드하므로 Hero의 메시지와 자산 gate를 결합한다.
- desktop에서만 성립하는 spectacle이고 mobile/reduced에서는 의미가 다른 logo strip으로 축소된다.
- 원통형 card procession은 비교 대상과 가장 직접적으로 닮아 보이는 장면이다.

#### GTG 대체

`CustomerProofBand`는 Hero 바로 다음의 normal-flow HTML section이다.

- h2는 승인된 관계 유형을 설명하고 `Representative Customers`를 사용하지 않는다.
- `ul` 또는 관계 유형별 grouped `ul` 안에서 조직명과 승인된 관계 범위를 함께 제공한다.
- public gate를 통과하지 못한 item은 공개 mode에서 render하지 않는다.
- 로컬 prototype에서만 보이는 item에는 `관계 범위 검토 중 · 로컬 프로토타입`을 명시한다.
- 고객 item을 특정 Solution/product reveal 옆에 배치하지 않는다.
- auto-rotation, orbit, carousel, marquee, perspective transform을 사용하지 않는다.

### 3.2 Black handoff → 연속 topology signal

#### 제거 이유

- `04a` 계열의 거의 빈 검은 화면은 loading 또는 render failure처럼 보일 수 있다.
- 사용자가 다음 정보로 이동하는 시간을 늘리지만 새 의미를 제공하지 않는다.
- 전면 암전 뒤 card가 등장하는 장면 구조가 비교 대상의 cinematic handoff와 가까워진다.
- reduced-motion에서는 정지된 빈 viewport가 되기 쉽다.

#### GTG 대체

- Hero `core-settle`에서 Data Core의 한 active signal을 하단 exit node에 둔다.
- Hero가 normal flow로 끝나고 `CustomerProofBand`를 지난 뒤 `SolutionsHandoff`가 같은 semantic signal token을 HTML/SVG에서 다시 이어받는다.
- Hero와 handoff를 시간상 겹치지 않고 proof를 관통하는 persistent line도 만들지 않는다.
- 배경 전체를 0% luminance로 reset하지 않는다.
- opacity 전환은 Data Core edge와 topology edge의 연결에만 적용한다.
- product logo, customer logo, scope card, 빈 panel을 함께 등장시키지 않는다.

### 3.3 Fullscreen slide → semantic Solution articles

#### 제거 이유

- 다섯 article을 `absolute` layer로 겹치면 inactive content를 `inert`/`aria-hidden`으로 통제해야 한다.
- normal scroll을 slide selection으로 바꾸어 Contact까지의 체감 비용을 키운다.
- mobile/reduced와 desktop의 DOM 동작이 달라져 같은 경험을 유지하기 어렵다.
- 제품 logo, 큰 번호, scope card가 한 장면에 모여 presentation deck처럼 보인다.

#### GTG 대체

- `SolutionSequence`는 5개 `article`을 DOM 순서대로 배치한다.
- 각 article은 h3, 한 문장 설명, 필요한 capability list, context CTA, 제품 mark 1회로 구성한다.
- desktop에서 topology visual column만 section-local sticky가 될 수 있다.
- article은 서로 겹치지 않고 모두 Tab/읽기 순서에 존재한다.
- IntersectionObserver state는 visual route를 갱신할 뿐 article을 숨기지 않는다.

### 3.4 Vertical rail → GTG capability route navigation

#### 제거 이유

- 현행 article `01/05`와 우측 01–05 rail이 같은 state를 두 번 표시한다.
- 숫자만으로는 각 Solution의 의미를 예측할 수 없다.
- scroll progress와 click target 계산이 실제 slide boundary와 일치하지 않는다.
- mobile에서는 제거되어 navigation model이 단절된다.

#### GTG 대체

`SolutionRouteNav`는 Solutions intro 직후의 in-flow anchor list다.

- 각 link는 번호만이 아니라 승인된 capability short name을 포함한다.
- desktop에서는 topology node와 연결할 수 있지만 viewport edge에 고정하지 않는다.
- mobile에서는 두 줄까지 wrapping하며 horizontal scroll을 요구하지 않는다.
- `aria-current="location"`은 현재 article 관찰 상태를 반영하되 live announcement를 만들지 않는다.
- link activation 때만 target heading으로 focus를 전달한다.
- passive scroll은 focus를 바꾸지 않는다.

## 4. 유지 문법의 사용 한계

### 4.1 Pullback: 한 번, Data Core에만

#### 허용

- `heroState="core-pullback"`에서 Data Core group의 scale 또는 camera distance를 짧게 바꾼다.
- 목적은 다섯 capability exit node를 한 프레임 안에 드러내는 것이다.
- identity copy를 읽은 다음에만 시작한다.
- 장면 종료 후 같은 pullback을 Solution에서 반복하지 않는다.

#### 금지

- 고객 card cylinder, orbital ring, mirrored floor, logo procession과 결합
- 비교 대상의 camera path, easing, duration, staging을 복사
- pullback 도중 product/customer card를 연속 reveal
- black reset으로 이어지는 연출
- mobile/reduced-motion에서 camera animation 생성

#### 구현 경계

- component: `HeroCanvas`
- state: `identity → core-active → core-pullback → core-settle`
- normalized range: 경험 명세의 `0.60–0.82`
- CSS/visual token: `[data-hero-state="core-pullback"]`, `--hero-pullback-progress`
- 물리 scroll travel: 미정; 실제 wheel/touchpad/touch/keyboard QA 후 calibration

### 4.2 Layered crossfade: handoff topology 내부 한 번에만

#### 허용

- `SolutionsHandoff`의 단일 signal edge가 사라지는 동안 다섯 capability route edge가 나타난다.
- overlap은 signal의 분기 관계가 읽히는 짧은 구간으로 제한한다.
- 두 topology state 모두 customer/product asset을 포함하지 않는다.
- Hero final state와의 연속성은 같은 token을 다시 쓰는 의미적 연속성이며 화면상 동시 overlap이 아니다.

#### 금지

- fullscreen Solution article 간 opacity/blur 교체
- product image, customer logo, photography, black overlay의 다중 crossfade
- 다섯 Solution에서 반복되는 transition preset
- content를 visibility hidden으로 바꾸는 용도
- reduced-motion에서 staged fade 생성

#### 구현 경계

- component: `SolutionsHandoff`; `HeroExperience`는 재사용할 boundary token만 정의
- state: `route-enter → route-split → route-complete`
- handoff local progress: 경험 명세의 `0.00–1.00`
- CSS: `.topology-signal`, `.topology-route`, `[data-route-state]`
- reduced/mobile: `route-complete` 최종 state 즉시 표시

## 5. GTG 고유 경험 언어

### 5.1 형태

- 중심에는 한 개의 `Data Core`가 있다.
- 다섯 Solution은 원형 고객 card가 아니라 capability exit node다.
- route는 장식 선이 아니라 실제 node-to-section 관계만 표현한다.
- 제품 mark는 topology 전체를 점유하지 않고 대응 Solution article에서만 한 번 나타난다.
- 고객 proof는 시각 orbit이 아니라 관계 문구가 붙은 문서형 evidence band다.

### 5.2 색과 신호

- red는 ambient decoration이 아니라 현재 source와 destination을 나타내는 signal이다.
- 한 장면에서 red signal은 최대 2개다.
- 공식 GTG red가 승인되기 전에는 `--color-brand-signal`이라는 역할 token만 명세한다.
- 검은 배경 자체를 장면 전환 문법으로 사용하지 않는다.

### 5.3 정보 계층

각 장면은 다음 세 수준을 넘지 않는다.

1. section heading 또는 h1
2. 한 문장 설명 또는 semantic list
3. topology/product evidence 한 개

scope, technology scope, reference, progress, MVP 같은 micro label을 같은 화면에 추가하지 않는다.

## 6. Component / state / CSS 전환표

| 현행 단위 | 목표 단위 | state 변화 | CSS 처리 |
|---|---|---|---|
| `HeroCanvas`의 customer texture/orbit | `HeroCanvas` Data Core only | `orbit` 삭제 | perspective logo card/orbit selector 제거 |
| Hero 내부 customer proof copy | 독립 `CustomerProofBand` | progress 없음 | normal-flow list, transform 없음 |
| Hero blackout/product stack | `SolutionsHandoff` | `blackout`, product stack state 삭제 | black overlay, blurred card, empty panel 제거 |
| pinned `SolutionPreview` layer | `SolutionSequence` + `SolutionArticle` | global scrub 삭제, `before/current/after`만 사용 | absolute fullscreen layer와 count×svh 제거 |
| `.solution-rail*` | `SolutionRouteNav` | active id만 관찰 | sticky viewport-edge rail 제거, in-flow anchor list 추가 |
| Solution spotlight repeated labels | `ProductReveal` | `idle/active/seen` | mark 1회, duplicate frame/label 제거 |
| Solution 5 scope panel | semantic capability list | reveal state 불필요 | repeated chips/textmark 제거 |

### 6.1 목표 component tree

```text
main#main-content
├─ HeroExperience
│  ├─ HeroCopy
│  ├─ HeroCanvas | HeroFallback
│  └─ HeroBoundarySignal
├─ CustomerProofBand
├─ SolutionsHandoff
├─ SolutionSequence
│  ├─ SolutionRouteNav
│  └─ SolutionArticle × 5
│     └─ ProductReveal × 0..1
├─ CompanyOverview
├─ EngagementModel
└─ ContactSection
```

`HeroCanvas` 이외에는 WebGL을 사용하지 않는다. `SolutionsHandoff`와 optional topology column은 HTML/SVG이며 의미 콘텐츠는 각 semantic section에 있다.

### 6.2 목표 state ownership

| owner | state | 소유하지 않는 것 |
|---|---|---|
| `HeroExperience` | experience mode, normalized Hero progress, Hero state | customer 관계, product reveal, active Solution |
| `CustomerProofBand` | local/public release mode | scroll progress, carousel index |
| `SolutionsHandoff` | route enter/split/complete | product/customer asset |
| `SolutionSequence` | active Solution id | article visibility, keyboard focus |
| `ProductReveal` | idle/active/seen | global scroll progress |

### 6.3 CSS guardrail

- Hero에만 sticky/pinned stage를 허용하고 그 travel 값은 승인 전 고정하지 않는다.
- proof, handoff, Solution article에는 `min-height: 100svh`를 기본값으로 두지 않는다.
- full-viewport absolute content layer와 `calc(solution-count * 100svh)`를 사용하지 않는다.
- visual-only topology는 `pointer-events: none`과 `aria-hidden`을 적용한다.
- `prefers-reduced-motion: reduce`에서는 transition duration만 줄이지 말고 motion state를 생성하지 않는다.
- mobile default는 static/no-pin이며 desktop motion은 capability 확인 후 enhancement한다.

## 7. 차별화 acceptance criteria

### 7.1 구조

- Hero 안 cylinder/orbit, customer texture, customer keyword가 0개다.
- black reset과 의미 없는 빈 viewport가 0개다.
- fullscreen Solution layer와 vertical number rail이 0개다.
- Solutions는 DOM에 연속된 5개 semantic article이다.
- customer proof는 독립 HTML section이며 관계 qualifier가 각 item과 함께 읽힌다.

### 7.2 유지 문법 예산

- pullback은 Data Core에서 정확히 한 장면만 사용한다.
- layered crossfade는 handoff의 단일 topology→다섯 route state에서만 사용한다.
- pullback 또는 crossfade가 customer/product asset과 결합되지 않는다.
- mobile/reduced-motion에서는 두 문법 모두 최종 static state로 대체된다.

### 7.3 시각 언어

- handoff의 product logo 수는 0이다.
- ambient red diamond와 연결 대상 없는 line/panel은 0이다.
- 한 장면의 의미 있는 red signal은 최대 2개다.
- 각 Solution의 대응 제품 mark는 해당 article 안에서 최대 1회다.
- Solution 5에는 vendor mark와 반복 scope panel이 없다.

### 7.4 상호작용과 접근성

- 어느 Solution도 slide 전환을 완료해야 읽을 수 있는 구조가 아니다.
- passive scroll이 focus를 이동시키지 않는다.
- route link activation만 target heading으로 focus를 이동한다.
- keyboard 사용자가 rail이나 scrub 없이 모든 Solution과 Contact에 도달한다.
- reduced-motion 첫 render에 Canvas, pin, staged crossfade가 없다.

### 7.5 회귀 검토

구현 후 다음 화면을 기존 산출물과 나란히 비교한다.

- Hero identity: OVA식 customer stage 없이 GTG/Data Core만 남았는가
- proof: orbit이 아니라 관계 범위가 읽히는가
- handoff: 암전·product strap 없이 topology signal만 남았는가
- Solution 01: fullscreen slide/rail 없이 product mark가 한 번만 보이는가
- Solution 05: capability가 한 번만 설명되는가
- mobile/reduced: desktop 장면의 축소판이 아니라 같은 의미의 natural flow인가

비교는 OVA와 얼마나 닮았는지에 대한 인상만으로 끝내지 않는다. DOM 구조, motion state 수, 사용한 asset 종류, pinned distance, product/customer logo 위치를 함께 점검한다.

## 8. 비범위와 미결정

- 공식 GTG 회사명, master logo, red 값, favicon, OG 확정
- 고객별 관계 label과 public-use approval
- vendor 제품 mark의 public permission과 최신 official master
- `/hero`의 preview/production 의미와 canonical 정책
- 실제 입력장치 QA 전 Hero scroll travel과 easing
- 최종 공개 copy와 content legal review

로컬 prototype 진행 허용은 위 권리와 공개 결정을 승인한 것으로 해석하지 않는다.

## 9. 사용자 승인 항목

- [x] OVA 문법은 짧은 Data Core pullback과 topology crossfade 두 개만 유지
- [x] customer cylinder/orbit를 semantic `CustomerProofBand`로 대체
- [x] black handoff를 연속 topology signal로 대체
- [x] fullscreen slide를 normal-flow Solution article로 대체
- [x] vertical 01–05 rail을 in-flow `SolutionRouteNav`로 대체
- [x] 유지한 두 문법도 고객/product asset과 결합하지 않는 제한

위 항목은 2026-07-10 사용자 승인을 받았다. 이 문서 단계에서는 구현하지 않으며 별도 구현 요청에서만 적용한다.
