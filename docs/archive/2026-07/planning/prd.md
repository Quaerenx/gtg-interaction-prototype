# 요구사항 정의서 / PRD

문서 작성일: 2026-07-09  
제품/프로젝트명: GTG Solutions & Consult 인터랙션 프로토타입  
기준 버전: MVP v0.1 Draft

## 1. 문서 개요

### 문서 목적

이 문서는 GTG Solutions & Consult 공식 홈페이지 MVP 인터랙션 프로토타입이 반드시 만족해야 하는 기능 요구사항, 비기능 요구사항, 제약사항, MVP 범위, 성공 지표를 정의한다.  
개발팀은 이 문서를 기준으로 기능을 분해하고, QA 담당자는 이 문서를 기준으로 검증 항목을 도출해야 한다.

### 대상 독자

| 대상 독자 | 문서를 읽는 목적 |
|---|---|
| Product Manager | MVP 범위, 우선순위, 확인 필요 사항을 관리하기 위함 |
| 기획자/요구사항 분석가 | 사용자 시나리오와 기능 요구사항을 구체화하기 위함 |
| 프론트엔드 개발자 | 화면, 인터랙션, fallback, 접근성 요구사항을 구현하기 위함 |
| QA 담당자 | lint, build, Playwright, 브라우저 검증 항목을 설계하기 위함 |
| 콘텐츠/브랜드 검수 담당자 | 승인되지 않은 문구, 고객 표시, 로고, claim 사용을 통제하기 위함 |
| 운영/마케팅 담당자 | 공개 전 메시지, 문의 흐름, SEO 공개 정책을 확인하기 위함 |

### 기준 버전

| 항목 | 내용 |
|---|---|
| 문서 버전 | MVP v0.1 Draft |
| 제품 상태 | 공식 홈페이지 MVP, 사내 검수 및 릴리스 후보 확인용 |
| 콘텐츠 상태 | 일부 문구, 브랜드 색상, 로고, OG 이미지, 약관 링크는 확인 필요 |
| 런타임 범위 | 프론트엔드 중심 Next.js 웹앱 |
| Backend/DB/Auth | MVP 범위에서는 제공하지 않아야 한다 |

### 관련 문서

| 문서 | 경로 | 관계 |
|---|---|---|
| 프로젝트 기본 정보 | `docs/project-basic-info.md` | 프로젝트 목적, 사용자, 기능, 기술 스택의 기준 |
| 프로젝트 정의서 | `docs/project-definition.md` | 문제, 범위, 성공 기준, 리스크의 기준 |
| 콘텐츠 요구사항 | `docs/content-requirements.md` | 미확정 콘텐츠와 승인 필요 항목의 기준 |
| 승인 콘텐츠 초안 | `docs/approved-content.md` | 현재 사용 중인 draft copy와 연락처 정보의 기준 |
| 구현 결정사항 | `docs/implementation-decisions.md` | 기술 및 동작 방식 결정의 기준 |
| 브라우저 테스트 리포트 | `docs/browser-test-report.md` | 검증 결과 및 브라우저 지원 상태의 참고 자료 |

## 2. 제품 개요

| 항목 | 내용 |
|---|---|
| 제품 한 줄 설명 | GTG Solutions & Consult의 주요 서비스 역량을 WebGL Hero와 접근 가능한 반응형 섹션으로 전달하는 공식 홈페이지 MVP 프로토타입 |
| 핵심 사용자 | 홈페이지 방문자, 잠재 고객, GTG 영업/마케팅 담당자, 콘텐츠 검수 담당자, 개발/QA 담당자 |
| 핵심 문제 | GTG의 서비스 범위와 문의 경로를 명확히 전달하면서도 WebGL, 모바일, reduced-motion, 콘텐츠 검수 제약을 동시에 만족해야 한다 |
| 핵심 해결 방식 | 데스크톱 WebGL Hero, HTML/CSS fallback, semantic HTML 콘텐츠, 5개 솔루션 섹션, 문의 CTA, 자동화 검증을 제공해야 한다 |

## 3. 사용자 유형 정의

MVP에는 로그인, 회원, 관리자 콘솔을 제공하지 않는다. 모든 방문자는 공개 페이지를 읽을 수 있어야 하며, 내부 관리자 역할은 제품 내 권한이 아니라 콘텐츠 승인 및 릴리스 운영 역할로 정의한다.

| 사용자 유형 | 설명 | 주요 목적 | 사용 기능 | 권한 수준 |
|---|---|---|---|---|
| 일반 방문자 | GTG 홈페이지를 처음 방문한 외부 사용자 | GTG가 어떤 회사이고 어떤 서비스를 제공하는지 이해 | Hero, 솔루션 섹션, 회사 소개, Engagement, 문의 CTA | 공개 읽기 |
| 잠재 고객 | 문의 또는 상담 가능성이 있는 외부 사용자 | 관심 서비스와 문의 경로를 빠르게 확인 | 내비게이션, 솔루션 CTA, 이메일/전화/공식 문의 링크 | 공개 읽기 및 외부 링크 이동 |
| 영업/마케팅 담당자 | GTG 내부에서 홈페이지 메시지를 활용하는 사용자 | 공식 소개 흐름과 서비스 포지셔닝을 확인 | 전체 페이지, 솔루션 구조, 문의 흐름 | 공개 읽기, 콘텐츠 변경은 개발/배포 프로세스 필요 |
| 콘텐츠/브랜드 검수 담당자 | copy, 로고, 고객 표시, claim을 검수하는 내부 사용자 | 미확인 정보와 레퍼런스 복제 리스크를 점검 | 페이지 콘텐츠, 문서, 테스트 결과 | 제품 내 관리자 권한 없음. 승인 권한은 운영 프로세스에서 부여 |
| 개발자 | 구현 및 유지보수를 담당하는 사용자 | 요구사항을 코드로 구현하고 오류를 수정 | 코드, 로컬 서버, build, lint, Playwright | 저장소 쓰기 권한 필요 |
| QA 담당자 | 품질 검증을 담당하는 사용자 | 기능, 반응형, fallback, 접근성, 콘솔 오류를 검증 | 로컬/스테이징 페이지, Playwright, 테스트 리포트 | 테스트 실행 권한 필요 |
| 운영 담당자 | 공개 상태와 문의 경로를 관리하는 사용자 | 연락처, 공개 정책, 배포 상태를 확인 | 페이지, robots/sitemap, 문의 링크 | 제품 내 관리자 권한 없음. 배포 권한은 인프라 정책에 따름 |

## 4. 사용자 시나리오

### 시나리오 1: 대표 사용 시나리오

| 항목 | 내용 |
|---|---|
| 시나리오명 | 잠재 고객이 GTG 서비스 범위를 파악하고 문의 경로로 이동 |
| 사용자 | 잠재 고객 |
| 상황 | 사용자가 GTG Solutions & Consult 홈페이지에 접속한다. |
| 목표 | GTG의 주요 서비스 영역을 이해하고 문의 방법을 찾는다. |
| 흐름 | 1. 사용자는 Hero에서 GTG 브랜드와 핵심 메시지를 확인한다.<br>2. 사용자는 솔루션 섹션으로 이동해 Data & Analytics, Data Streaming, Infrastructure Automation, DevOps & Quality, Consulting & Technical Support를 확인한다.<br>3. 사용자는 회사 소개와 Engagement Model을 읽는다.<br>4. 사용자는 Contact 섹션에서 이메일, 전화, 공식 문의 페이지 링크 중 하나를 선택한다. |
| 기대 결과 | 사용자는 GTG의 서비스 범위를 이해하고, 적절한 문의 채널로 이동할 수 있어야 한다. |

### 시나리오 2: 관리자 시나리오

| 항목 | 내용 |
|---|---|
| 시나리오명 | 콘텐츠/브랜드 검수 담당자가 공개 전 claim-safe 상태를 검수 |
| 사용자 | 콘텐츠/브랜드 검수 담당자 |
| 상황 | 공개 전 draft 사이트와 문서를 검토한다. |
| 목표 | 승인되지 않은 GTG 사실, 고객 표시, 성과 수치, 인증, 파트너 등급, OVA 복제 요소가 없는지 확인한다. |
| 흐름 | 1. 검수 담당자는 PRD와 콘텐츠 문서를 확인한다.<br>2. 검수 담당자는 페이지의 Hero, 솔루션, 회사 소개, 고객/증빙 표현, 문의 영역을 확인한다.<br>3. 검수 담당자는 미확정 항목이 “확인 필요”로 관리되는지 확인한다.<br>4. 검수 담당자는 공개 가능 여부 또는 수정 요청을 결정한다. |
| 기대 결과 | 공개 전 승인되지 않은 claim이 제거되거나 확인 필요 항목으로 분리되어야 한다. |

### 시나리오 3: 일반 사용자 시나리오

| 항목 | 내용 |
|---|---|
| 시나리오명 | 모바일 사용자가 WebGL 없이 핵심 정보를 확인 |
| 사용자 | 일반 방문자 |
| 상황 | 사용자가 모바일 브라우저로 홈페이지에 접속한다. |
| 목표 | 모바일에서도 핵심 메시지, 솔루션, 문의 CTA를 읽고 사용할 수 있다. |
| 흐름 | 1. 사용자는 모바일 화면에서 WebGL 대신 가벼운 fallback Hero를 확인한다.<br>2. 사용자는 수평 overflow나 텍스트 겹침 없이 콘텐츠를 스크롤한다.<br>3. 사용자는 솔루션 섹션을 순차적으로 읽는다.<br>4. 사용자는 Contact 섹션의 전화 또는 이메일 링크를 선택한다. |
| 기대 결과 | 모바일에서는 과도한 pinned scroll과 3D 효과 없이 모든 핵심 콘텐츠가 표시되어야 한다. |

### 시나리오 4: 예외 상황 시나리오

| 항목 | 내용 |
|---|---|
| 시나리오명 | WebGL 미지원 또는 reduced-motion 환경에서 fallback 제공 |
| 사용자 | WebGL 미지원 브라우저 사용자, reduced-motion 설정 사용자 |
| 상황 | 사용자의 브라우저가 WebGL을 지원하지 않거나 OS/브라우저에 reduced-motion 설정이 켜져 있다. |
| 목표 | 모션이나 WebGL 없이도 동일한 핵심 정보를 확인한다. |
| 흐름 | 1. 시스템은 초기 렌더에서 WebGL 지원 여부와 reduced-motion 설정을 반영한다.<br>2. 조건에 따라 WebGL canvas 대신 HTML/CSS fallback Hero를 표시한다.<br>3. 시스템은 Hero 서비스 목록을 semantic HTML로 제공한다.<br>4. 사용자는 솔루션, 회사 소개, 문의 섹션을 정상적으로 탐색한다. |
| 기대 결과 | canvas가 없어도 핵심 메시지, 서비스 목록, CTA가 모두 접근 가능해야 한다. |

## 5. 기능 요구사항

우선순위 기준:

| 우선순위 | 의미 |
|---|---|
| Must | MVP에 반드시 필요 |
| Should | 중요하지만 MVP 이후 가능 |
| Could | 있으면 좋은 기능 |
| Won't | 이번 범위에서 제외 |

| ID | 기능명 | 설명 | 사용자 | 우선순위 | 입력 | 처리 | 출력 | 예외 조건 |
|---|---|---|---|---|---|---|---|---|
| FR-001 | 단일 페이지 홈페이지 | 제품은 공식 홈페이지 MVP를 단일 페이지로 제공해야 한다. | 일반 방문자, 잠재 고객 | Must | 사용자의 `/` 접속 | Hero, Solutions, Company, Engagement, Contact, Footer를 순서대로 렌더링 | 완성된 랜딩 페이지 | 라우트가 없을 경우 단순 404를 제공해야 한다 |
| FR-002 | 상단 내비게이션 | 제품은 주요 섹션으로 이동 가능한 상단 내비게이션을 제공해야 한다. | 모든 방문자 | Must | 메뉴 클릭 또는 앵커 링크 선택 | 대상 섹션으로 스크롤 또는 이동 | ABOUT, SOLUTIONS, ENGAGEMENT, CONTACT 접근 | 대상 섹션이 없으면 링크를 배포 전 수정해야 한다 |
| FR-003 | 모바일 메뉴 | 제품은 모바일 화면에서 접근 가능한 메뉴를 제공해야 한다. | 모바일 사용자 | Must | Open menu 버튼 선택 | 메뉴 dialog를 열고 focus 이동을 관리 | 모바일 내비게이션 메뉴 | Escape 또는 Close 동작으로 닫을 수 있어야 한다 |
| FR-004 | WebGL Hero | 제품은 데스크톱 환경에서 WebGL 기반 Hero 인터랙션을 제공해야 한다. | 데스크톱 방문자 | Must | 페이지 접속, 스크롤 | Three.js/React Three Fiber 기반 Hero를 렌더링하고 스크롤 상태에 따라 시각 상태를 갱신 | canvas 기반 Hero 경험 | WebGL 초기화 실패 시 fallback으로 전환해야 한다 |
| FR-005 | Hero fallback | 제품은 WebGL 미지원, 강제 fallback, 모바일, reduced-motion 조건에서 HTML/CSS Hero를 제공해야 한다. | 모든 방문자 | Must | WebGL 미지원, `forceFallback`, 모바일 viewport, reduced-motion | canvas 없이 정적 또는 경량 Hero를 렌더링 | 핵심 메시지, 서비스/고객 proof, CTA | fallback에서도 콘텐츠 누락이 없어야 한다 |
| FR-006 | reduced-motion 초기 지원 | 제품은 초기 렌더부터 `prefers-reduced-motion`을 반영해야 한다. | reduced-motion 사용자 | Must | OS/브라우저 motion 설정 | 모션, blur-heavy transition, camera pullback, pinned scrub을 제한 | 정적 Hero 및 정상 콘텐츠 | 초기 렌더 후 뒤늦게 전환되어 깜빡임이 발생하지 않아야 한다 |
| FR-007 | Hero 서비스 semantic 목록 | 제품은 Hero 서비스 7개를 Canvas 밖 semantic HTML로 제공해야 한다. | 모든 방문자, 스크린리더 사용자 | Must | 페이지 콘텐츠 데이터 | list/listitem 구조로 서비스 라벨을 렌더링 | 7개 서비스 목록 | WebGL canvas만으로 정보를 제공해서는 안 된다 |
| FR-008 | Hero 서비스 항목 | 제품은 Hero 서비스로 Data & Analytics, Data Streaming, Infrastructure Automation, DevOps & Quality, Database Consulting, Technical Support, Training & Delivery를 제공해야 한다. | 모든 방문자 | Must | 콘텐츠 데이터 | 서비스 라벨과 관련 keyword/visual을 렌더링 | 7개 서비스 카드 또는 fallback 항목 | 서비스 copy는 최종 승인 전 확인 필요로 관리해야 한다 |
| FR-009 | 솔루션 섹션 | 제품은 5개 솔루션 섹션을 제공해야 한다. | 일반 방문자, 잠재 고객 | Must | 스크롤 또는 내비게이션 이동 | 5개 솔루션 slide/section 렌더링 | Data & Analytics, Data Streaming, Infrastructure Automation, DevOps & Quality, Consulting & Technical Support | 텍스트가 잘리거나 겹치면 안 된다 |
| FR-010 | 솔루션 CTA | 제품은 각 솔루션의 관련 CTA 링크를 제공해야 한다. | 잠재 고객 | Must | CTA 클릭 | 지정된 외부 페이지 또는 mailto 링크로 이동 | 블로그/공식 페이지/메일 링크 | CTA 목적지는 공개 전 검수되어야 한다 |
| FR-011 | Company Overview | 제품은 GTG의 회사 소개와 핵심 역량을 제공해야 한다. | 모든 방문자 | Must | 스크롤 이동 | 회사 소개 headline, 설명, capability list 렌더링 | 회사 소개 섹션 | 확인되지 않은 회사 연혁이나 수치를 포함해서는 안 된다 |
| FR-012 | Capability Map | 제품은 GTG 역량 관계를 설명하는 capability map을 제공해야 한다. | 모든 방문자 | Must | viewport 크기 | 데스크톱/모바일에 맞는 로컬 SVG를 선택 | 반응형 capability map | 외부 이미지나 vendor claim을 임의 포함해서는 안 된다 |
| FR-013 | Engagement Model | 제품은 Diagnose, Design, Implement, Operate 4단계 수행 모델을 제공해야 한다. | 잠재 고객, 영업/마케팅 | Must | 스크롤 이동 | 4단계 카드 또는 섹션 렌더링 | 수행 흐름 설명 | 미확정 서비스 범위를 단정하지 않아야 한다 |
| FR-014 | Contact 섹션 | 제품은 문의 CTA, 이메일, 전화, 공식 문의 페이지 링크를 제공해야 한다. | 잠재 고객 | Must | Contact 이동, CTA 클릭 | 연락처 정보와 링크 렌더링 | `mailto`, `tel`, 공식 문의 링크 | 최종 연락처와 문의 URL은 공개 전 확인되어야 한다 |
| FR-015 | 로컬 자산 사용 | 제품은 외부 이미지를 다운로드하거나 hotlink하지 않아야 한다. | 모든 사용자 | Must | 이미지/비주얼 요청 | 로컬 `public` 자산만 사용 | 안정적인 이미지 표시 | 외부 이미지 요청이 발생하면 배포 전 차단해야 한다 |
| FR-016 | OVA 복제 방지 | 제품은 OVA 이미지, 영상, 코드, copy, 로고, 정확한 배치, 타이밍, 색상 구성을 복제하지 않아야 한다. | 콘텐츠 검수 담당자 | Must | 디자인/인터랙션 구현 | 상호작용 문법만 재해석하고 자체 자산을 사용 | 독립적인 GTG 페이지 | 유사도가 과도하면 수정해야 한다 |
| FR-017 | Claim-safe 콘텐츠 | 제품은 확인되지 않은 GTG 사실, 고객사, 성과 수치, 파트너 등급, 인증, 연혁을 임의로 표시하지 않아야 한다. | 콘텐츠 검수 담당자 | Must | 콘텐츠 데이터 | 승인 여부가 불명확한 항목을 제거하거나 확인 필요로 표시 | 검수 가능한 콘텐츠 | 미승인 claim이 UI에 노출되면 안 된다 |
| FR-018 | Draft SEO/robots | 제품은 draft 상태에서 검색 엔진 인덱싱을 제한해야 한다. | 운영 담당자 | Must | 페이지 요청, robots/sitemap 요청 | `noindex`, `nofollow`, robots disallow 정책을 적용 | 공개 전 인덱싱 차단 | 공개 전환 시 정책 변경은 별도 승인 필요 |
| FR-019 | 404 처리 | 제품은 존재하지 않는 경로에서 단순 404 페이지를 제공해야 한다. | 모든 방문자 | Must | 잘못된 URL 접속 | Not Found 페이지와 홈/주요 섹션 링크 제공 | 복구 가능한 오류 화면 | 핵심 내비게이션이 누락되면 안 된다 |
| FR-020 | 접근성 기본 구조 | 제품은 heading, landmark, list, link, button 등 semantic 구조를 사용해야 한다. | 모든 방문자, 보조기술 사용자 | Must | 페이지 렌더링 | 의미 있는 HTML 구조와 accessible label 제공 | 보조기술 접근 가능한 페이지 | canvas 단독 콘텐츠 제공은 허용하지 않는다 |
| FR-021 | 반응형 레이아웃 | 제품은 주요 데스크톱/모바일 viewport에서 수평 overflow와 텍스트 겹침 없이 표시되어야 한다. | 모든 방문자 | Must | viewport 변경 | CSS responsive rule 적용 | 정상 레이아웃 | 360px 폭 등 작은 모바일에서 CTA가 잘리면 안 된다 |
| FR-022 | Playwright 검증 | 제품은 Playwright로 핵심 UI, fallback, reduced-motion, 모바일, overflow, 외부 이미지 요청을 검증해야 한다. | QA 담당자 | Must | 테스트 실행 | 자동화 테스트 수행 | pass/fail 결과 및 스크린샷 | 실패 시 릴리스 후보로 인정하지 않아야 한다 |
| FR-023 | Lint/build 검증 | 제품은 릴리스 전 lint와 production build를 통과해야 한다. | 개발자, QA 담당자 | Must | `pnpm run lint`, `pnpm run build` | 코드 품질 및 빌드 가능성 검증 | 통과 결과 | 경고/오류가 있으면 릴리스 전 수정해야 한다 |
| FR-024 | 최종 SEO 공개 설정 | 제품은 최종 승인 후 canonical, sitemap, OG image를 공개 정책에 맞게 적용할 수 있어야 한다. | 운영 담당자 | Should | 공개 승인 | draft SEO 정책을 public release 정책으로 전환 | 검색 노출 가능한 메타데이터 | 승인 전 적용하면 안 된다 |
| FR-025 | CMS 연동 | 제품은 향후 CMS와 연동해 콘텐츠를 관리할 수 있어야 한다. | 운영/마케팅 담당자 | Should | CMS 콘텐츠 | 콘텐츠 fetch/render 구조 적용 | 운영 가능한 콘텐츠 관리 | MVP 범위에서는 구현하지 않는다 |
| FR-026 | 문의 폼 backend | 제품은 향후 문의 폼을 통해 사용자 문의를 접수할 수 있어야 한다. | 잠재 고객, 운영 담당자 | Should | 이름, 연락처, 문의 내용 | 입력 검증, 저장/전송, 스팸 방지 | 문의 접수 결과 | 개인정보 처리 정책 확정 전 구현하지 않는다 |
| FR-027 | 서비스 상세 페이지 | 제품은 향후 솔루션별 상세 페이지를 제공할 수 있어야 한다. | 잠재 고객 | Could | 서비스 링크 클릭 | 상세 페이지 렌더링 | 상세 정보 페이지 | IA와 승인 copy가 필요하다 |
| FR-028 | 사례 연구 | 제품은 향후 고객 사례를 제공할 수 있어야 한다. | 잠재 고객, 영업/마케팅 | Could | 사례 탐색 | 고객/성과/산업별 사례 표시 | 사례 목록/상세 | 고객 공개 승인 없이는 구현하지 않는다 |
| FR-029 | 다국어 지원 | 제품은 향후 한국어/영어 등 다국어를 지원할 수 있어야 한다. | 글로벌 방문자 | Could | 언어 선택 | 언어별 라우팅 또는 콘텐츠 전환 | 다국어 페이지 | 번역 정책과 SEO 정책 확인 필요 |
| FR-030 | 로그인/회원 기능 | 제품은 MVP에서 로그인, 회원가입, 사용자 계정을 제공하지 않아야 한다. | 모든 사용자 | Won't | 해당 없음 | 구현하지 않음 | 해당 없음 | 공식 홈페이지 MVP 목적과 무관하다 |
| FR-031 | 데이터베이스 | 제품은 MVP에서 애플리케이션 데이터베이스를 사용하지 않아야 한다. | 개발자 | Won't | 해당 없음 | 구현하지 않음 | 해당 없음 | 동적 저장 요구가 없다 |
| FR-032 | WebGL Hero 외 사용 | 제품은 Hero 외 영역에서 WebGL을 사용하지 않아야 한다. | 개발자 | Won't | 해당 없음 | Hero 외 WebGL 구현 금지 | HTML/CSS 기반 본문 | 성능과 접근성 제약을 우선한다 |

## 6. 비기능 요구사항

| 분류 | 요구사항 | 기준 | 우선순위 |
|---|---|---|---|
| 성능 | 제품은 모바일에서 과도한 3D 효과와 pinned scroll을 제한해야 한다. | 모바일에서는 WebGL 또는 긴 scrub animation 대신 경량 fallback을 사용해야 한다. | Must |
| 성능 | 제품은 WebGL Hero가 빈 canvas로 남지 않도록 검증해야 한다. | Playwright canvas nonblank 또는 동등한 검증을 통과해야 한다. | Must |
| 성능 | 제품은 Core Web Vitals 목표를 공개 전 정의해야 한다. | LCP, CLS, INP 기준값은 확인 필요이다. | Should |
| 보안 | 제품은 외부 이미지 hotlink를 사용하지 않아야 한다. | Playwright 또는 네트워크 검증에서 외부 image request 0건이어야 한다. | Must |
| 보안 | 제품은 개인정보를 수집하지 않아야 한다. | MVP에는 문의 폼, 회원가입, 추적 입력을 제공하지 않아야 한다. | Must |
| 보안 | 향후 문의 폼을 도입할 경우 개인정보 처리, 보관 기간, 접근 권한을 정의해야 한다. | 정책 확정 전 문의 폼 backend를 구현하지 않아야 한다. | Should |
| 권한 | 제품은 MVP에서 사용자 권한 체계를 제공하지 않아야 한다. | 모든 방문자는 공개 읽기만 가능해야 한다. | Must |
| 권한 | 콘텐츠 변경 권한은 제품 UI가 아니라 저장소/배포 프로세스에서 통제해야 한다. | 제품 내 관리자 화면을 만들지 않아야 한다. | Must |
| 안정성 | 제품은 WebGL 실패 시 HTML/CSS fallback으로 전환해야 한다. | WebGL 미지원 또는 초기화 실패 시 핵심 콘텐츠가 표시되어야 한다. | Must |
| 안정성 | 제품은 존재하지 않는 경로에서 복구 가능한 404를 제공해야 한다. | 홈 또는 주요 섹션으로 이동 가능한 링크가 있어야 한다. | Must |
| 확장성 | 제품은 향후 CMS, 문의 폼, 상세 페이지 확장을 고려해 콘텐츠 데이터를 구조화해야 한다. | 서비스/솔루션/CTA/연락처는 코드 내 상수 또는 교체 가능한 구조로 관리해야 한다. | Should |
| 유지보수성 | 제품은 TypeScript 기반으로 컴포넌트와 콘텐츠를 분리해야 한다. | UI 컴포넌트와 콘텐츠 데이터가 무분별하게 섞이지 않아야 한다. | Must |
| 유지보수성 | 제품은 구현 후 lint와 production build를 통과해야 한다. | `pnpm run lint`, `pnpm run build`가 통과해야 한다. | Must |
| 호환성 | 제품은 주요 데스크톱 및 모바일 viewport에서 정상 표시되어야 한다. | 360px, 390px, 430px, 768px, 1280px, 1440px 기준 검증을 수행해야 한다. | Must |
| 호환성 | 제품은 WebGL 미지원 브라우저에서도 핵심 콘텐츠를 제공해야 한다. | canvas 없이도 Hero 메시지, 서비스 목록, CTA가 표시되어야 한다. | Must |
| 호환성 | 최소 지원 브라우저 범위는 공개 전 확정해야 한다. | Chromium, WebKit, Firefox 지원 수준은 확인 필요이다. | Should |
| 로깅/감사 | 제품은 MVP에서 사용자 행동 로그를 수집하지 않아야 한다. | 별도 분석/추적 스크립트를 추가하지 않아야 한다. | Must |
| 로깅/감사 | 향후 analytics 도입 시 개인정보/쿠키 정책과 이벤트 목록을 정의해야 한다. | 정책 확정 전 추적 기능을 도입하지 않아야 한다. | Should |
| 데이터 보존 | 제품은 MVP에서 사용자 입력 데이터를 저장하지 않아야 한다. | DB, 문의 저장소, 사용자 계정 데이터가 없어야 한다. | Must |
| 데이터 보존 | 콘텐츠 변경 이력은 Git 이력으로 관리해야 한다. | 별도 CMS가 없으므로 저장소 변경 이력이 기준이어야 한다. | Must |
| 백업/복구 | 제품은 MVP에서 애플리케이션 데이터 백업이 필요하지 않아야 한다. | 저장 데이터가 없으므로 코드 저장소와 배포 산출물 관리가 복구 기준이어야 한다. | Must |
| 백업/복구 | 향후 CMS/문의 DB 도입 시 백업/복구 정책을 별도로 정의해야 한다. | RPO/RTO는 확인 필요이다. | Should |

## 7. 제약사항

### 기술 제약

| 제약 | 요구사항 |
|---|---|
| WebGL 사용 범위 | WebGL은 Hero 영역에서만 사용해야 한다. |
| 핵심 콘텐츠 제공 | 핵심 콘텐츠는 Canvas 외부 semantic HTML로 제공해야 한다. |
| 모바일 효과 제한 | 모바일에서는 pinned scroll과 3D 효과를 줄여야 한다. |
| reduced-motion | 초기 렌더부터 `prefers-reduced-motion`을 지원해야 한다. |
| 외부 자산 | 외부 이미지를 다운로드하거나 hotlink하지 않아야 한다. |
| 기술 스택 | MVP는 Next.js, React, TypeScript, Tailwind CSS, GSAP, Three.js, React Three Fiber 기반으로 구현해야 한다. |

### 일정 제약

| 제약 | 요구사항 |
|---|---|
| 콘텐츠 승인 | 최종 copy, 브랜드 색상, 로고, OG 이미지, 약관 링크 승인 전에는 public release로 전환하지 않아야 한다. |
| QA 완료 | lint, production build, Playwright verification 통과 전에는 완료로 판단하지 않아야 한다. |
| 미정 항목 | 확인 필요 항목은 일정 리스크로 관리해야 하며 임의로 확정해서는 안 된다. |

### 인력 제약

| 제약 | 요구사항 |
|---|---|
| 콘텐츠 검수 | 콘텐츠/브랜드 검수 담당자가 최종 공개 전 문구와 claim을 승인해야 한다. |
| 개발/QA 분리 | 개발자는 구현을 담당하고 QA 담당자는 자동화 및 수동 검증 결과를 확인해야 한다. |
| 운영 담당 | 공개 전환, 문의 링크, SEO 정책은 운영 또는 의사결정자의 승인이 필요하다. |

### 인프라 제약

| 제약 | 요구사항 |
|---|---|
| Backend 없음 | MVP에서는 별도 backend, DB, auth 인프라를 요구하지 않아야 한다. |
| 로컬/스테이징 검증 | 로컬 개발 서버와 production build 결과를 기준으로 검증해야 한다. |
| 배포 환경 | 최종 배포 환경은 확인 필요이다. |

### 정책/보안 제약

| 제약 | 요구사항 |
|---|---|
| OVA 자산 금지 | OVA 이미지, 영상, source code, copy, logo를 복사하지 않아야 한다. |
| OVA 구성 복제 금지 | OVA의 정확한 placement, timing, color composition을 복제하지 않아야 한다. |
| 미확인 사실 금지 | GTG 고객사, 성과 수치, 파트너 등급, 인증, 연혁을 임의로 만들지 않아야 한다. |
| 개인정보 | MVP에서는 개인정보를 수집하지 않아야 한다. |
| 공개 인덱싱 | 승인 전 draft 상태에서는 검색 인덱싱을 제한해야 한다. |

## 8. MVP 범위

### MVP에 포함할 기능

| 포함 기능 | 완료 기준 |
|---|---|
| 단일 페이지 공식 홈페이지 | Hero, Solutions, Company, Engagement, Contact, Footer가 모두 표시되어야 한다. |
| WebGL Hero | 데스크톱에서 빈 canvas 없이 렌더링되어야 한다. |
| HTML/CSS fallback | WebGL 미지원, 강제 fallback, 모바일, reduced-motion에서 핵심 콘텐츠가 표시되어야 한다. |
| 7개 Hero 서비스 | 서비스 라벨 7개가 semantic HTML로 제공되어야 한다. |
| 5개 솔루션 섹션 | 각 솔루션 title, description, related/spotlight, CTA가 표시되어야 한다. |
| Company/Capability Map | 회사 소개와 capability map이 반응형으로 표시되어야 한다. |
| Engagement Model | 4단계 수행 모델이 표시되어야 한다. |
| Contact | 이메일, 전화, 공식 문의 링크가 제공되어야 한다. |
| Draft SEO/robots | 공개 승인 전 인덱싱 제한 정책이 적용되어야 한다. |
| QA 자동화 | lint, production build, Playwright verification이 통과해야 한다. |

### MVP에서 제외할 기능

| 제외 기능 | 우선순위 | 제외 사유 |
|---|---|---|
| 로그인/회원가입 | Won't | 공식 홈페이지 MVP 목적과 무관함 |
| 관리자 콘솔 | Won't | 콘텐츠 변경은 저장소/배포 프로세스로 관리함 |
| Database | Won't | 저장할 사용자 데이터가 없음 |
| 문의 폼 backend | Should | 개인정보/스팸/보관 정책 확인 필요 |
| CRM 연동 | Should | 문의 운영 방식 확인 필요 |
| CMS | Should | MVP에서는 코드 기반 콘텐츠 관리로 충분 |
| 고객 사례 DB | Could | 고객 공개 승인과 자료 필요 |
| 다국어 | Could | 언어/번역/SEO 정책 확인 필요 |
| 분석 대시보드 | Could | 추적 정책 확인 필요 |
| Hero 외 WebGL | Won't | 성능, 접근성, 제약사항 위반 가능 |

### MVP 완료 기준

| 완료 기준 | 판정 방식 |
|---|---|
| 기능 완성 | 기능 요구사항 중 Must 항목이 모두 충족되어야 한다. |
| 콘텐츠 안전성 | 미승인 claim, 미확인 수치, OVA 복제 요소가 UI에 없어야 한다. |
| 접근성 기본 충족 | semantic HTML, keyboard navigation, reduced-motion 경로가 동작해야 한다. |
| 반응형 안정성 | 주요 viewport에서 텍스트 겹침과 horizontal overflow가 없어야 한다. |
| 기술 검증 | lint, production build, Playwright verification이 통과해야 한다. |
| 공개 정책 | 승인 전 draft 상태에서는 noindex/nofollow 및 robots disallow 정책을 유지해야 한다. |

## 9. 성공 지표

### 사용성 지표

| 지표 | 목표 | 측정 방법 |
|---|---|---|
| 핵심 섹션 도달성 | 내비게이션으로 Solutions, Company, Engagement, Contact에 접근 가능해야 한다. | Playwright 또는 수동 QA |
| 문의 경로 명확성 | Contact 섹션에서 이메일, 전화, 공식 문의 링크가 확인 가능해야 한다. | UI 검증 |
| 모바일 가독성 | 주요 모바일 viewport에서 Hero와 CTA가 잘리지 않아야 한다. | Playwright screenshot 및 overflow 검증 |
| reduced-motion 사용성 | reduced-motion 환경에서 핵심 콘텐츠가 정적으로 제공되어야 한다. | Playwright media emulation |

### 성능 지표

| 지표 | 목표 | 측정 방법 |
|---|---|---|
| WebGL canvas 상태 | 데스크톱 Hero canvas가 nonblank여야 한다. | Playwright canvas/pixel 또는 screenshot 검증 |
| 외부 이미지 요청 | 외부 image request 0건이어야 한다. | Playwright network 검증 |
| 모바일 3D 부담 | 모바일에서는 canvas 미사용 또는 경량 fallback을 사용해야 한다. | DOM/canvas 검증 |
| Core Web Vitals | 기준값 확인 필요 | 공개 전 Lighthouse 또는 RUM 기준 확정 필요 |

### 운영 지표

| 지표 | 목표 | 측정 방법 |
|---|---|---|
| 빌드 성공 | production build가 성공해야 한다. | `pnpm run build` |
| 린트 성공 | ESLint가 오류 없이 통과해야 한다. | `pnpm run lint` |
| E2E 성공 | Playwright verification이 통과해야 한다. | `pnpm run test:e2e` 또는 프로젝트별 테스트 |
| 공개 전 인덱싱 차단 | draft 상태에서 검색 노출이 차단되어야 한다. | robots/meta 검증 |

### 품질 지표

| 지표 | 목표 | 측정 방법 |
|---|---|---|
| 콘솔 오류 | 핵심 경로에서 console error가 없어야 한다. | Playwright console guard |
| 레이아웃 overflow | 주요 viewport에서 horizontal overflow가 없어야 한다. | Playwright DOM 측정 |
| 텍스트 겹침 | Hero, 솔루션, Contact에서 텍스트가 겹치거나 잘리지 않아야 한다. | screenshot QA |
| Claim-safe | 미확인 성과 수치, 인증, 파트너 등급, 연혁이 없어야 한다. | 콘텐츠 리뷰 및 자동/수동 검색 |
| 접근성 구조 | heading, list, link, button 등 semantic 구조가 제공되어야 한다. | Playwright role query 및 수동 QA |

## 10. 의존성

### 외부 시스템 의존성

| 의존성 | 현재 상태 | 요구사항 |
|---|---|---|
| GTG 공식 문의 페이지 | 링크 사용 | URL은 공개 전 검수되어야 한다. |
| GTG Vertica 기술 블로그 | CTA 링크 사용 | URL은 공개 전 검수되어야 한다. |
| 이메일 클라이언트 | `mailto:` 링크 사용 | 이메일 주소는 공개 전 확인되어야 한다. |
| 전화 앱/브라우저 | `tel:` 링크 사용 | 전화번호는 공개 전 확인되어야 한다. |
| CMS | 없음 | MVP에서는 의존하지 않아야 한다. |
| CRM | 없음 | MVP에서는 의존하지 않아야 한다. |

### 데이터 의존성

| 데이터 | 현재 상태 | 요구사항 |
|---|---|---|
| 서비스/솔루션 copy | 일부 확인 필요 | 승인 전 임의 확정하지 않아야 한다. |
| 브랜드 색상 | 확인 필요 | 공식 색상 값 확정 전 provisional style로 관리해야 한다. |
| 로고/파비콘 | 최종 승인 필요 | 승인된 원본 자산을 사용해야 한다. |
| 고객명/고객 로고 | 공개 승인 범위 확인 필요 | 서면 승인 전 제한 표시 또는 미표시해야 한다. |
| OG 이미지 | 확인 필요 | 공개 SEO 전 제작/승인되어야 한다. |

### 인증/권한 의존성

| 항목 | 현재 상태 | 요구사항 |
|---|---|---|
| 사용자 인증 | 없음 | MVP에서 구현하지 않아야 한다. |
| 관리자 권한 | 제품 내 없음 | 콘텐츠 변경은 저장소/배포 권한으로 통제해야 한다. |
| 개인정보 접근 권한 | 없음 | MVP에서 개인정보를 저장하지 않아야 한다. |

### 인프라 의존성

| 항목 | 현재 상태 | 요구사항 |
|---|---|---|
| Node.js | 필요 | Next.js 앱 실행이 가능해야 한다. |
| pnpm | 필요 | lockfile 기준 설치/실행이 가능해야 한다. |
| Next.js build/start | 필요 | production build와 start가 가능해야 한다. |
| Playwright | 필요 | E2E 및 screenshot 검증이 가능해야 한다. |
| 배포 환경 | 확인 필요 | 공개 전 hosting, domain, cache, SSL 정책을 확정해야 한다. |

## 11. 확인 필요 사항

### 요구사항 확정을 위해 필요한 질문

| 질문 | 필요한 이유 |
|---|---|
| GTG가 Hero에서 가장 먼저 강조해야 할 서비스 영역은 무엇인가? | Hero 메시지, 서비스 순서, CTA 우선순위를 결정해야 한다. |
| 최종 homepage headline과 description은 무엇인가? | 공개용 Hero copy를 확정해야 한다. |
| 각 솔루션의 CTA 목적지는 현재 링크로 확정인가? | 외부 링크와 mailto 동작을 공개 전 검수해야 한다. |
| 고객명과 고객 로고를 공개 표시해도 되는가? | proof 영역의 유지, 제한 표시, 삭제 여부를 결정해야 한다. |
| 공식 회사명, 주소, 전화번호, 이메일의 최종 표기는 무엇인가? | Contact와 footer의 법적/운영상 정확성을 확보해야 한다. |

### 정책적으로 결정해야 할 항목

| 항목 | 결정 필요 내용 |
|---|---|
| 공개 SEO 정책 | noindex/nofollow 유지 시점과 public release 전환 기준을 결정해야 한다. |
| OVA 레퍼런스 유사도 검수 기준 | 어느 수준의 상호작용 유사도를 허용할지 결정해야 한다. |
| 생성 이미지 사용 정책 | MVP와 공개 사이트에서 생성 자산을 허용할지 결정해야 한다. |
| 고객 proof 표시 정책 | 고객명, 고객 로고, “대표 고객” 표현의 승인 범위를 결정해야 한다. |
| 개인정보 정책 | 향후 문의 폼 또는 analytics 도입 시 수집/보관/삭제 기준을 결정해야 한다. |

### 기술적으로 검토해야 할 항목

| 항목 | 검토 필요 내용 |
|---|---|
| 최소 지원 브라우저 | Chromium, WebKit, Firefox, 모바일 브라우저 지원 범위를 확정해야 한다. |
| Core Web Vitals 목표 | LCP, CLS, INP 등 공개 전 성능 기준을 확정해야 한다. |
| 배포 인프라 | hosting, domain, SSL, cache, build pipeline을 확정해야 한다. |
| CMS 전환 가능성 | 현재 코드 기반 콘텐츠 구조가 CMS 전환에 충분한지 검토해야 한다. |
| 문의 폼 확장 | backend, spam protection, email routing, 개인정보 보관 정책을 검토해야 한다. |
