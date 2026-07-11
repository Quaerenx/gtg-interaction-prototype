# HERO 현재 상태

> - 기준일: 2026-07-11
> - 상태: 저장소의 유일한 현재 상태 진입점
> - 현재 브랜치: `codex/hero-basepath-stabilization`
> - 마지막 committed 검증 기준선: `ab07afd8f8ea962b607db3ee15425937f3f8ee96` (`perf: harden Hero WebGL delivery`)

## 1. 문서 목적과 판정 원칙

이 문서는 HERO 저장소의 현재 구현, 승인 상태, 검증 상태를 한곳에서 확인하기 위한 **유일한 현재 상태 진입점**이다. 문서 경로와 상태 분류는 `docs/INDEX.md`, 제품 방향 결정은 `docs/DECISIONS.md`에 분리한다. `PLAN.md`, `docs/future/`, `docs/archive/`는 현재 상태 문서가 아니다.

문서와 실제 코드 또는 런타임이 충돌하면 현재 commit의 코드와 재현 가능한 런타임을 현재 사실로 본다. 코드에 값이나 자산이 존재한다는 사실은 그 내용, 브랜드, 권리 또는 공개 사용이 승인됐다는 뜻이 아니다.

## 2. 현재 제품 정의

현재 제품은 **GTG Solutions & Consult의 단일 페이지 공식 홈페이지 후보이자 interaction prototype**이다. 기술 RC 검증 대상이지만, 공개 승인과 production 운영 준비가 끝난 release-ready 공식 홈페이지는 아니다.

- 사이트 콘텐츠의 코드상 상태는 `src/content/brand.ts`의 `siteContent.isApproved === false`다.
- WebGL은 Hero에만 사용된다.
- 핵심 콘텐츠는 Canvas 밖의 semantic HTML에도 제공된다.
- 모바일, `prefers-reduced-motion`, WebGL 실패, `?forceFallback=1`에 대한 정적 경로가 구현되어 있다.

## 3. 실제 구현 범위

### 3.1 Route

| 종류 | App Router 기준 | 기본 `/hero` 배포에서의 URL | 현재 동작 |
|---|---|---|---|
| 홈 | `/` | `/hero` | 단일 페이지 본문 |
| robots | `/robots.txt` | `/hero/robots.txt` | 미승인 상태에서는 전체 crawl 차단 |
| sitemap | `/sitemap.xml` | `/hero/sitemap.xml` | 미승인 상태에서는 빈 sitemap |
| not found | custom `not-found.tsx` | `/hero/<존재하지 않는 경로>` | custom 404 응답 |

`NEXT_BASE_PATH`가 빈 문자열 또는 `/`이면 홈은 root에 mount된다. `?forceFallback=1`은 WebGL fallback 검증용 query이고 별도 route가 아니다.

### 3.2 Section 순서와 현재 표현

현재 홈은 다음 순서로 조립된다.

1. Header
2. Hero (`#top`)
   - GTG Data Core를 설명하는 유일한 WebGL 장면
   - headline, 설명, CTA와 5개 capability route는 Canvas 밖 semantic HTML
3. Representative Customers (`#proof`)
   - 18개 고객 항목을 별도 semantic HTML trust band로 표시
   - `local-only`, 관계 범위 검토 중, 비보증 disclaimer를 함께 표시
4. Solutions handoff
   - HTML/CSS/SVG GTG topology signal이며 product-logo strap은 없음
5. Solutions (`#solutions`)
   - Data & Analytics
   - Data Streaming
   - Infrastructure Automation
   - DevOps & Quality
   - Consulting & Technical Support
   - route navigation 번호는 실제 Solution 배열 길이에서 계산
   - Vertica, Confluent, HashiCorp, LoadRunner mark는 대응 Solution에서만 한 번씩 표시
6. Company / Capability (`#company`)
7. Engagement (`#engagement`, 데이터에서 계산되는 4단계)
8. Contact (`#contact`)
9. Footer

Hero에는 5개 Solution capability route가 semantic HTML로 제공된다. 고객 18개는 Hero Canvas texture가 아니라 `#proof`의 semantic list와 로컬 이미지로만 노출된다. 이 구조는 현재 구현 사실일 뿐, customer 관계나 로고 공개 사용 승인을 증명하지 않는다.

### 3.3 현재 없는 기능

다음 기능은 현재 저장소에 구현되어 있지 않다.

- 별도 backend 또는 application API
- database, schema, migration, ORM
- authentication, session, 사용자·관리자 권한
- CMS와 콘텐츠 관리 화면
- 문의 form submit endpoint
- 문의 내용 저장, 조회, 상태 관리

Contact는 외부 공식 문의 페이지, `mailto:`, `tel:` 링크와 주소 정보를 제공할 뿐이다. `robots.ts`와 `sitemap.ts`는 Next.js metadata route이며 application backend를 뜻하지 않는다.

## 4. Git 기준선과 working tree 경계

- 직전 공개 태그 기준선: `v0.4.0` / `07952ecc4aad18260eddd48f5b496ebd6d97e641`
- `/hero` basePath와 18150 배포를 안정화한 현재 기준선: `0fc30c82566a073aa35538c3a81a6acf8aebf788`
- semantic homepage 기준선: `9ab85d2` (`feat: implement semantic homepage architecture`)
- editorial motion 기준선: `876c164` (`feat: implement GTG editorial motion system`)
- performance/accessibility 기준선: `ab07afd8f8ea962b607db3ee15425937f3f8ee96`
- 현재 브랜치: `codex/hero-basepath-stabilization`

2026-07-09 기획 문서의 API/DB/확장 architecture 사본은 `docs/future/`, 나머지 기획 문서와 원래 bundle은 `docs/archive/2026-07/planning/`에 보존한다. 이 문서들은 현재 구현 범위를 CMS/API/DB로 확대하는 근거가 아니다. exact-copy 감사와 무삭제 경계는 `docs/ARCHIVE-PLAN.md`에 기록한다.

## 5. 승인 상태

### 5.1 아직 승인되지 않은 것

- 한국어명·법인명·최종 회사명 표기, headline, subcopy, Solution 설명, CTA 등 공개용 최종 copy
- GTG 공식 primary/inverse/mono logo master, 정확한 brand red, clear-space 규칙
- 최종 favicon/app icon과 OG image
- 고객 로고 18개의 개별 공개 사용 권리 및 필요한 서면 승인
- Vertica, Confluent, HashiCorp, LoadRunner 등 제3자 product asset의 최종 사용 조건과 표현 방식
- 고객, 파트너, 인증, 등급, 성과 수치로 오해될 수 있는 모든 관계·claim
- Terms 등 legal link와 공개 정책
- production canonical, robots, sitemap 정책
- production domain, DNS, hosting과 배포 승인

2026-07-11 사용자는 현재 프로젝트에서 고객·제품 자산을 화면에 공개 노출하도록 승인했다. 코드의 고객 항목은 이 결정을 `projectOwnerDisplayApproval: "approved"`로 기록하되, 관계 증거 `relationshipEvidenceLevel: "user-confirmed"`와 제3자 권리 `thirdPartyRightsStatus: "unverified"`를 분리한다. 따라서 프로젝트 노출 승인은 완료됐지만 고객·vendor 권리자의 허가나 official master 증빙으로 해석하지 않는다.

### 5.2 Canonical과 `/hero`

`src/content/brand.ts`에는 `https://www.gtgsc.com/`가 canonical 후보 값으로 들어 있다. 그러나 `siteContent.isApproved`가 `false`인 현재는 canonical link가 출력되지 않으며, 이 값이 승인된 배포 정책을 의미하지 않는다.

다음 중 어느 정책을 사용할지는 아직 결정되지 않았다.

- `/hero`는 reverse proxy용 preview 경로이고 production은 domain root를 사용
- production도 `/hero`를 사용
- 환경별로 preview와 production mount를 명시적으로 분리

이 결정 전에는 코드의 기존 값을 근거로 정책을 임의 확정하지 않는다.

## 6. 검증 상태

### 6.1 현재 안정 기준선에서 통과가 기록된 검증

`0fc30c8` 안정화 단계에서 다음 결과가 기록되었다.

| 검증 | 정확한 결과 |
|---|---|
| TypeScript noEmit | 통과 |
| ESLint | `npm run lint` exit code 0 |
| production build, `NEXT_BASE_PATH=/hero` | 통과 |
| Playwright 기본 matrix | 16 passed: Chromium 15 + WebKit smoke 1 |
| `NEXT_BASE_PATH=/` | build 통과, 관련 Chromium 4개 통과 |
| `NEXT_BASE_PATH=""` | build 통과, basePath guard 1개 통과 |
| direct runtime | `http://127.0.0.1:18150/hero` HTTP 200 |
| reverse proxy runtime | `http://127.0.0.1:8088/hero` HTTP 200 |
| metadata/error routes | robots 200, sitemap 200, 의도한 missing route 404 |
| 이미지 | direct/proxy 각각 DOM 이미지 15개 모두 `naturalWidth > 0`, `naturalHeight > 0` |
| basePath asset guard | 동일 host에서 `/hero` 밖으로 잘못 나간 asset 요청 0건 |
| 내부 anchor | ABOUT, CONTACT, TOP 링크가 `/hero` 경계를 유지 |
| 브라우저 오류 | console error 0, asset 404 0 |
| forced fallback | Canvas 0개, fallback 1개 |

2026-07-11 성능·접근성 안정화 단계에서는 production Playwright matrix가 21 passed(Chromium 20 + WebKit smoke 1)로 확장되었다. 새 검증은 첫 animation frame부터 reduced-motion/mobile Canvas와 WebGL context가 0개인 상태, 해당 환경의 Three/R3F chunk 요청 0건, Hero 이탈 후 draw pause, `preserveDrawingBuffer=false`, DPR 상한과 force fallback을 포함한다. 상세 전후 수치와 측정 방법은 `docs/performance-accessibility-report.md`가 기록한다.

### 6.2 미통과·미승인 또는 아직 충분히 검증되지 않은 항목

- 콘텐츠, GTG 브랜드 자산, 고객·제품 자산 공개 사용, legal 항목의 최종 승인
- production 공개 전 `noindex` 제거와 robots/sitemap/canonical 정책
- production domain, DNS, SSL, cache, hosting, rollback 절차
- Core Web Vitals와 합의된 성능 budget을 기준으로 한 production 측정
- 전체 수동 접근성 감사와 실제 보조기기 검증
- Firefox 검증. 현재 기본 matrix는 Chromium 전체와 WebKit smoke만 실행한다.
- 실제 모바일 기기와 다양한 물리 입력장치에서의 전체 스크롤 체감 검증
- `/hero`가 preview 경로인지 production 경로인지에 대한 제품·운영 결정

### 6.3 2026-07-11 최종 Release Candidate 감사

최신 전체 결과는 `docs/release-readiness-final.md`에 기록한다. 현재 working tree의 TypeScript, ESLint, production build, 전체 Chromium 22개, 전체 WebKit 22개, `git diff --check`는 통과했다. 강화한 screenshot guard 때문에 발생한 첫 Chromium 20/22 실패는 CSS transform을 layout 변화로 오인한 테스트 하네스 문제였고, offset layout 기준으로 수정한 뒤 단독 재검증과 전체 22/22가 통과했다.

최종 build 뒤 검증된 이전 HERO PID만 교체해 `127.0.0.1:18150`, `127.0.0.1:8088`, `192.168.40.18:8088`이 동일한 최신 HTML을 제공한다. 세 주소에서 asset 40/40가 200이고, DOM 이미지 26/26의 natural size가 정상이며 `/hero` 밖 asset, failed request, console error와 horizontal overflow가 각각 0건이다. 이전 CSS/JS 500은 해소됐다.

사용자는 2026-07-11 현재 프로젝트의 자산 화면 노출을 승인했다. 고객 데이터는 프로젝트 노출 승인과 관계 증거·제3자 권리 상태를 분리했고, 비상업 출처 충돌이 있던 LoadRunner PNG는 화면과 public 경로에서 제거해 archive에 보존한다. 고객·vendor 권리자의 별도 허가, 공식 GTG master·색상·favicon·OG·Terms·canonical 정책, 실제 browser zoom 200%, Windows High Contrast, 수동 keyboard-only, 독립 참가자 5초 테스트는 여전히 미완료다.

따라서 **로컬·직접·프록시 기술 RC는 PASS**, **indexable public production release는 BLOCKED**다. `siteContent.isApproved === false`, `noindex, nofollow`, 차단 robots와 빈 sitemap을 유지하며 release tag를 생성하지 않는다.

## 7. Source of truth와 구본 구분

### 7.1 현재 판단 우선순위

1. `AGENTS.md`: 변경 불가 제약과 안전 규칙
2. 현재 commit의 코드, 테스트와 재현 가능한 런타임: 현재 동작 사실
3. `docs/CURRENT.md`: 현재 상태, 승인·검증 경계와 문서 drift
4. 승인된 `docs/DECISIONS.md`: 2026-07-10 승인된 목표 제품 방향
5. `docs/release-checklist.md`: 공개 전 승인·검증 gate

충돌 시 **코드는 현재 사실**, 승인된 **DECISIONS는 목표**, **CURRENT는 그 차이와 미해결 상태**를 기록한다.

### 7.2 참고·연혁 문서

| 문서 | 현재 용도 | 그대로 source of truth로 사용하지 않는 이유 |
|---|---|---|
| `docs/motion-spec.md` | 초기 모션 의도와 안전 원칙 | 현재 customer proof Hero와 Solution 구현 이전의 설계가 포함됨 |
| `docs/content-requirements.md` | 초기 콘텐츠 요구와 승인 체크 | 다수 항목이 `[TBD]`인 구현 전 문서이며 현재 코드와 차이가 있음 |
| `docs/archive/2026-07/planning/project-basic-info.md` | 2026-07-09 범위 snapshot | 승인된 기준선이 아닌 archived draft |
| `docs/archive/2026-07/planning/prd.md` | 2026-07-09 MVP/미래 범위 draft | `MVP v0.1 Draft`; `/` route 등 현재 배포와 drift가 있음 |
| `docs/customer-card-system-report.md` | customer card 구현 연혁과 당시 QA | accept candidate였으며 public-use approval가 남아 있음 |
| `docs/asset-reference-research.md` | 자산 조사와 후속 추천 | 연구·추천 문서이지 승인 ledger나 제품 결정이 아님 |

`docs/future/`와 `docs/archive/2026-07/planning/project-planning-documents-20260709/`는 미래 참고 또는 연혁 자료이며, 현재 구현 범위를 CMS/API/DB로 확대하는 근거로 사용하지 않는다.

## 8. 현재 구현과 다음 제안 사이의 차이

2026-07-10 승인된 `docs/DECISIONS.md`의 **C안**은 현재 구현에 반영됐다. customer proof는 Hero WebGL에서 별도 HTML section으로 분리됐고, handoff product-logo strap과 기존 vertical rail은 제거됐다. 네 개 product mark는 대응 Solution의 product reveal에만 존재하며 Solution 5는 product mark 없이 consulting/support capability list를 사용한다.

`/hero`를 preview와 production 중 어느 경로로 사용할지는 hosting·domain 정보와 함께 별도 확정하기로 승인했으며, 실제 경로 정책은 여전히 미결정이다.
