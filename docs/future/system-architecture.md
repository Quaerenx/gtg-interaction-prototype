# 시스템 아키텍처 문서

> **FUTURE-EXPANSION DRAFT.** 현재 제품은 frontend-only single-page prototype이며 backend, API, database, auth, CMS와 문의 저장 기능이 없다. 이 문서의 확장 architecture는 별도 운영 요구와 승인 전까지 현재 구현 기준이 아니다. 현재 상태는 `../CURRENT.md`를 따른다.

문서 작성일: 2026-07-09  
프로젝트명: GTG Solutions & Consult 인터랙션 프로토타입  
기준 버전: MVP v0.1 Draft

## 1. 문서 개요

### 문서 목적

이 문서는 GTG Solutions & Consult 공식 홈페이지 MVP가 어떤 구성요소로 이루어지고, 각 구성요소가 어떻게 통신하며, 어떤 기술을 왜 선택해야 하는지 정의한다.

현재 MVP는 단순 CRUD 웹앱, 대용량 데이터 처리 앱, AI/검색 앱이 아니다. 현재 범위는 WebGL Hero와 반응형 섹션을 포함한 프론트엔드 중심 공식 홈페이지이다. 따라서 MVP에서는 backend, DB, 인증, queue, vector DB를 도입하지 않는 구조를 우선한다. 다만 향후 CMS, 문의 폼, 콘텐츠 승인, 파일 업로드, release 관리가 필요해질 경우를 위해 확장 아키텍처를 함께 제안한다.

### 대상 독자

| 대상 독자 | 활용 목적 |
|---|---|
| 소프트웨어 아키텍트 | 전체 시스템 구조와 확장 방향 판단 |
| 프론트엔드 개발자 | Next.js, WebGL, fallback, 정적 asset 구조 이해 |
| 백엔드 개발자 | 향후 API/DB 도입 시 구성요소와 책임 범위 이해 |
| DevOps/운영 담당자 | 배포, 관측성, release 전환 구조 검토 |
| QA 담당자 | 검증 대상 구성요소와 장애 지점 파악 |
| Product Manager | MVP 범위와 향후 확장 범위 구분 |
| 보안/개인정보 검수 담당자 | 인증, 개인정보, 파일 업로드, 감사 로그 필요성 검토 |

### 기준 버전

| 항목 | 내용 |
|---|---|
| 기준 버전 | MVP v0.1 Draft |
| 현재 앱 형태 | Next.js 기반 프론트엔드 중심 공식 홈페이지 |
| 현재 backend | 없음 |
| 현재 database | 없음 |
| 현재 authentication | 없음 |
| 현재 파일 저장 | repository/public 로컬 정적 asset |
| 향후 확장 기준 | REST API + PostgreSQL + file storage + auth |

### 관련 문서

| 문서 | 경로 |
|---|---|
| 프로젝트 기본 정보 | `../archive/2026-07/planning/project-basic-info.md` |
| 요구사항 정의서 / PRD | `../archive/2026-07/planning/prd.md` |
| 기능 명세서 | `../archive/2026-07/planning/functional-spec.md` |
| 데이터 모델 / DB 설계서 | `data-model-db-design.md` |
| API 명세서 | `api-spec.md` |
| 화면 설계서 / UX Flow | `../archive/2026-07/planning/ux-flow.md` |

## 2. 시스템 개요

### 시스템 한 줄 설명

GTG Solutions & Consult의 서비스 역량을 WebGL Hero, HTML/CSS fallback, 반응형 섹션, claim-safe 콘텐츠로 전달하는 Next.js 기반 공식 홈페이지 MVP이다.

### 주요 사용자

| 사용자 | 설명 |
|---|---|
| 게스트/일반 방문자 | 홈페이지를 탐색하고 GTG 서비스 범위와 문의 경로를 확인 |
| 잠재 고객 | 솔루션 정보를 확인하고 이메일, 전화, 공식 문의 링크로 이동 |
| 콘텐츠/브랜드 검수 담당자 | 문구, 고객 proof, asset, claim-safe 상태를 검수 |
| 개발자/QA 담당자 | 구현, lint, build, Playwright verification 수행 |
| 운영 담당자 | 공개 상태, SEO 정책, 문의 링크, release readiness 확인 |

### 핵심 기능

| 기능 | 설명 |
|---|---|
| 단일 페이지 홈페이지 | Hero, Solutions, Company, Engagement, Contact, Footer 제공 |
| WebGL Hero | 데스크톱에서 기술 중심의 첫 화면 경험 제공 |
| HTML/CSS fallback | WebGL 실패, 모바일, reduced-motion 조건에서 핵심 콘텐츠 제공 |
| Semantic HTML | Canvas 밖에서도 핵심 서비스 목록과 문구 접근 가능 |
| 반응형 UX | 모바일에서 pinned scroll과 3D 효과 축소 |
| Local asset 정책 | 외부 이미지 다운로드/hotlink 없이 로컬 asset 사용 |
| Draft SEO | 공개 승인 전 noindex/nofollow와 robots disallow 유지 |
| QA 자동화 | lint, production build, Playwright verification 수행 |

### 전체 구조 요약

현재 MVP 구조:

- Browser가 Next.js page를 요청한다.
- Next.js가 코드 기반 콘텐츠와 로컬 public asset을 사용해 HTML/CSS/JS를 제공한다.
- WebGL 가능 조건에서는 Hero canvas를 렌더링한다.
- 모바일, reduced-motion, WebGL 실패, force fallback 조건에서는 HTML/CSS fallback을 제공한다.
- `/robots.txt`, `/sitemap.xml`은 draft SEO route로 제공한다.
- backend API, DB, auth, queue, file upload는 사용하지 않는다.

향후 확장 구조:

- 관리자/CMS 기능이 필요하면 REST API server를 추가한다.
- PostgreSQL에 콘텐츠, asset metadata, 문의, release, audit log를 저장한다.
- 파일 업로드가 필요하면 object storage를 추가한다.
- 관리자 인증은 Bearer JWT, session cookie, 외부 IdP 중 하나를 선택한다.

## 3. 아키텍처 목표

| 관점 | 목표 |
|---|---|
| 단순성 | MVP에서는 backend, DB, auth를 도입하지 않고 Next.js 프론트엔드와 로컬 asset만으로 구현해야 한다. |
| 유지보수성 | 화면 컴포넌트, 콘텐츠 상수, WebGL 유틸, fallback 로직, 테스트를 명확히 분리해야 한다. |
| 확장성 | 향후 CMS, 문의 폼, release 관리가 필요할 때 REST API와 PostgreSQL로 확장 가능해야 한다. |
| 보안성 | MVP에서는 개인정보를 저장하지 않고, 외부 이미지 hotlink와 미승인 claim을 차단해야 한다. |
| 성능 | 모바일에서는 WebGL과 pinned scroll을 줄이고, 로컬 asset과 production build를 사용해야 한다. |
| 장애 대응 | WebGL 실패 시 fallback으로 전환하고, 정적 콘텐츠는 canvas와 독립적으로 표시되어야 한다. |
| 배포 용이성 | Next.js build/start 또는 정적/Node hosting 방식으로 간단하게 배포 가능해야 한다. |

## 4. 전체 시스템 구성도

### 현재 MVP 구성도

```text
[User Browser]
      ↓ HTTP(S)
[Next.js Web App]
      ├─ [App Router Pages: /, not-found]
      ├─ [SEO Routes: /robots.txt, /sitemap.xml]
      ├─ [React Components]
      ├─ [WebGL Hero: Three.js + React Three Fiber]
      ├─ [Motion: GSAP]
      ├─ [CSS/Tailwind]
      ├─ [Static Content: TypeScript constants]
      └─ [Local Assets: public/brand, public/generated, public/item-logo]

[QA/Developer]
      ↓ CLI
[ESLint + Next Build + Playwright]
      ↓
[Screenshots/Test Artifacts]
```

### 향후 확장 구성도

```text
[User Browser]
      ↓ HTTPS
[Frontend: Next.js]
      ↓ HTTPS/REST JSON
[Backend API Server]
      ├─ [Auth Middleware]
      ├─ [Content/CMS API]
      ├─ [Media Upload API]
      ├─ [Inquiry API]
      ├─ [Release API]
      └─ [Audit Logging]
      ↓ SQL
[Database: PostgreSQL]
      ├─ pages / sections / content_blocks
      ├─ media_assets / external_links
      ├─ inquiries / inquiry_events
      └─ release_snapshots / audit_logs
      ↓
[File Storage]
      └─ uploaded/generated/approved assets

[Optional External Systems]
      ├─ [Email/SMTP or Transactional Email]
      ├─ [External Identity Provider]
      ├─ [CRM]
      └─ [Monitoring/Logging]
```

## 5. 구성요소 상세 설명

## 구성요소: Frontend Web App

### 역할

- 사용자에게 GTG 공식 홈페이지 MVP 화면을 제공한다.
- WebGL Hero, fallback Hero, 솔루션 섹션, 회사 소개, 수행 모델, 문의 섹션을 렌더링한다.

### 주요 기능

- 단일 페이지 홈페이지 렌더링
- Header와 모바일 메뉴 제공
- Hero WebGL/fallback 분기
- reduced-motion 초기 반영
- 반응형 layout
- SEO metadata와 draft route 제공

### 기술 후보

- Next.js
- Vite + React
- Astro
- Remix

### 권장 기술

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

추천 이유:

- 현재 프로젝트가 이미 Next.js 구조와 package script를 사용한다.
- App Router로 page, metadata, robots, sitemap, not-found를 통합 관리하기 쉽다.
- TypeScript로 콘텐츠 구조와 컴포넌트 props를 명확히 관리할 수 있다.

### 입력

- 브라우저 HTTP 요청
- URL path, hash, query
- viewport 크기
- prefers-reduced-motion 설정
- WebGL 지원 여부

### 출력

- HTML, CSS, JavaScript
- WebGL canvas 또는 HTML/CSS fallback
- `/robots.txt`, `/sitemap.xml`

### 의존성

- React
- Next.js
- Tailwind CSS
- GSAP
- Three.js
- React Three Fiber
- 로컬 public asset

### 장애 가능성

- hydration 오류
- WebGL context 생성 실패
- 이미지 asset 누락
- 모바일 overflow
- motion 설정 반영 지연

### 대응 방안

- WebGL 실패 시 fallback 표시
- 핵심 콘텐츠를 semantic HTML로 유지
- Playwright로 canvas nonblank, fallback, reduced-motion, overflow 검증
- 외부 이미지 요청 0건 검증

## 구성요소: WebGL Hero Runtime

### 역할

- 데스크톱 Hero 영역에서 GTG의 기술적 첫인상을 전달하는 3D/Canvas 경험을 제공한다.

### 주요 기능

- WebGL canvas 렌더링
- scroll progress 기반 Hero 상태 전환
- 로컬 visual asset 사용
- nonblank canvas 보장

### 기술 후보

- Three.js
- React Three Fiber
- raw WebGL
- CSS 3D

### 권장 기술

- Three.js + React Three Fiber

추천 이유:

- React component 구조와 통합하기 쉽다.
- Three.js의 안정적인 WebGL abstraction을 사용할 수 있다.
- 현재 dependency와 구현 방향에 맞는다.

### 입력

- Hero 콘텐츠 데이터
- viewport 크기
- scroll progress
- WebGL 지원 여부
- reduced-motion 여부

### 출력

- Hero canvas
- WebGL 렌더링 frame
- Hero state/progress data attribute

### 의존성

- Frontend Web App
- Three.js
- React Three Fiber
- 로컬 SVG/PNG asset

### 장애 가능성

- GPU/브라우저 호환성 문제
- blank canvas
- scroll state와 렌더링 state 불일치
- 모바일 성능 저하

### 대응 방안

- WebGL 사용 조건을 데스크톱 중심으로 제한
- 모바일/reduced-motion에서 fallback 우선
- Playwright screenshot 및 canvas check 수행
- canvas와 독립된 HTML 콘텐츠 유지

## 구성요소: HTML/CSS Fallback Layer

### 역할

- WebGL을 사용할 수 없는 환경에서도 Hero 핵심 콘텐츠를 제공한다.
- 모바일과 reduced-motion 사용자에게 안정적인 경험을 제공한다.

### 주요 기능

- fallback Hero visual 표시
- Hero headline, description, CTA 표시
- 7개 서비스 semantic list 제공
- reduced-motion 상태에서 animation 제한

### 기술 후보

- React + CSS
- Tailwind CSS
- SVG/PNG local asset

### 권장 기술

- React + Tailwind CSS + 로컬 SVG/PNG asset

추천 이유:

- 추가 runtime 없이 구현 가능하다.
- 접근성과 반응형을 HTML/CSS로 제어할 수 있다.
- WebGL 장애 대응 경로로 단순하고 안정적이다.

### 입력

- fallback reason
- Hero 콘텐츠 데이터
- 로컬 fallback asset
- prefers-reduced-motion

### 출력

- HTML/CSS 기반 Hero
- semantic service list
- CTA link

### 의존성

- Frontend Web App
- 로컬 asset

### 장애 가능성

- fallback asset 누락
- 모바일 텍스트 겹침
- CTA가 viewport 밖으로 밀림

### 대응 방안

- 텍스트와 CTA를 asset보다 우선 렌더링
- 반응형 screenshot QA
- 주요 mobile viewport overflow 검증

## 구성요소: Static Content and Local Assets

### 역할

- MVP 콘텐츠와 visual asset을 코드와 repository 내 파일로 관리한다.
- 외부 이미지 다운로드와 hotlink를 방지한다.

### 주요 기능

- `src/content` 기반 콘텐츠 상수 제공
- `public/brand`, `public/generated`, `public/item-logo` asset 제공
- claim-safe 콘텐츠 관리

### 기술 후보

- TypeScript constants
- Markdown
- JSON
- CMS

### 권장 기술

- MVP: TypeScript constants + Markdown docs + local public assets
- 향후: CMS 또는 DB-backed content API

추천 이유:

- MVP 범위에서는 DB 없이 빠르고 검수하기 쉽다.
- TypeScript type으로 콘텐츠 구조를 제한할 수 있다.
- 로컬 asset 정책을 강제하기 쉽다.

### 입력

- 개발자가 수정하는 콘텐츠 파일
- 로컬 이미지/SVG 파일
- 콘텐츠 승인 문서

### 출력

- React component props
- 정적 asset URL
- SEO metadata source

### 의존성

- Git repository
- Next.js static asset serving

### 장애 가능성

- 인코딩 문제
- 미승인 copy 노출
- 외부 URL asset 혼입
- asset 경로 오류

### 대응 방안

- 콘텐츠 검수 문서 유지
- Playwright 외부 image request 검증
- 미확인 claim 검색
- 공개 전 승인 checklist 운영

## 구성요소: SEO and Static Routes

### 역할

- draft 상태의 검색 인덱싱 차단 정책을 제공한다.
- 향후 public release 시 canonical, sitemap, OG metadata 전환 대상이 된다.

### 주요 기능

- `robots.txt` 제공
- `sitemap.xml` 제공
- page metadata 관리
- draft 상태에서 noindex/nofollow 적용

### 기술 후보

- Next.js metadata API
- Next.js route handlers
- Static file

### 권장 기술

- Next.js metadata + App Router route

추천 이유:

- 현재 Next.js 구조와 자연스럽게 통합된다.
- 빌드/테스트에서 쉽게 검증할 수 있다.

### 입력

- SEO content
- release status

### 출력

- meta robots
- robots.txt
- sitemap.xml

### 의존성

- Frontend Web App
- SEO content constants

### 장애 가능성

- 공개 전 noindex 누락
- 공개 후 noindex 잔존
- canonical URL 오류

### 대응 방안

- draft/public release checklist 분리
- Playwright로 robots/meta 검증
- public release 전 SEO 승인 gate 운영

## 구성요소: QA and Verification Tooling

### 역할

- MVP 완료 기준을 자동화된 테스트와 빌드 결과로 검증한다.

### 주요 기능

- ESLint
- production build
- Playwright E2E
- screenshot artifact 생성
- canvas nonblank, fallback, reduced-motion, mobile overflow 검증

### 기술 후보

- ESLint
- Next build
- Playwright
- Lighthouse

### 권장 기술

- ESLint + Next production build + Playwright

추천 이유:

- 현재 project script와 테스트 구조에 맞다.
- WebGL/fallback/viewport 검증에 Playwright가 적합하다.

### 입력

- source code
- Playwright test spec
- browser runtime

### 출력

- lint result
- build result
- Playwright result
- screenshot artifact

### 의존성

- Node.js
- pnpm
- Playwright browsers

### 장애 가능성

- headless browser graphics issue
- local port 충돌
- screenshot flakiness

### 대응 방안

- project script로 실행 방식 표준화
- Chromium 우선 검증, WebKit smoke 보조
- Firefox는 환경 안정화 후 opt-in 검토

## 구성요소: Backend API Server

### 역할

- 향후 CMS, 문의 폼, media upload, release publish API를 제공한다.
- MVP에서는 사용하지 않는다.

### 주요 기능

- 관리자 인증/인가
- 콘텐츠 CRUD 및 승인
- media upload metadata 관리
- 문의 접수/처리
- release publish
- audit log 기록

### 기술 후보

- FastAPI
- NestJS
- Next.js Route Handlers
- Express

### 권장 기술

- 확인 필요
- Node/TypeScript 일관성을 중시하면 NestJS 또는 Next.js Route Handlers
- Python 생태계와 관리 API 명확성을 중시하면 FastAPI

추천 이유:

- 현재 frontend가 TypeScript 기반이므로 TypeScript backend는 type 공유와 인력 운영에 유리하다.
- 별도 backend 운영이 부담이면 Next.js Route Handlers로 시작할 수 있다.
- 기능이 커지면 독립 API server로 분리하는 것이 운영과 보안에 유리하다.

### 입력

- REST JSON request
- multipart file upload
- Authorization header

### 출력

- JSON response
- file upload result
- audit log

### 의존성

- PostgreSQL
- file storage
- authentication provider
- optional email/CRM

### 장애 가능성

- DB connection 실패
- 인증 오류
- 파일 업로드 실패
- API timeout

### 대응 방안

- 공통 error response
- health check
- transaction boundary 정의
- retry 가능한 작업은 queue 도입 검토

## 구성요소: PostgreSQL Database

### 역할

- 향후 콘텐츠, asset metadata, 문의, release, audit log를 저장한다.
- MVP에서는 사용하지 않는다.

### 주요 기능

- relational data 저장
- 상태값 constraint
- 콘텐츠 JSONB payload 저장
- audit log 저장
- inquiry 상태 관리

### 기술 후보

- PostgreSQL
- MySQL
- SQLite
- managed CMS DB

### 권장 기술

- PostgreSQL

추천 이유:

- JSONB, GIN index, transaction, constraint가 강하다.
- 콘텐츠 payload와 관계형 구조를 함께 다루기 좋다.
- release/audit/inquiry 같은 운영 데이터에 적합하다.

### 입력

- Backend SQL query
- migration

### 출력

- query result
- transaction result

### 의존성

- Backend API Server
- migration tool
- backup 정책

### 장애 가능성

- migration 실패
- connection pool 고갈
- lock contention
- 개인정보 보관 정책 미준수

### 대응 방안

- migration review
- backup/restore drill
- index 설계
- 개인정보 보존 기간과 삭제 job 정의

## 구성요소: File Storage

### 역할

- 향후 업로드 asset, OG image, 승인 asset 파일을 저장한다.
- MVP에서는 repository `public` 디렉터리를 사용한다.

### 주요 기능

- 파일 저장
- 파일 경로 반환
- 해시 기반 중복 확인
- SVG 보안 검사 대상 관리

### 기술 후보

- Repository public assets
- S3 호환 object storage
- CDN-backed storage
- CMS asset store

### 권장 기술

- MVP: repository public assets
- 향후: S3 호환 object storage + CDN

추천 이유:

- MVP에서는 파일 수와 변경 빈도가 낮아 repository 관리가 단순하다.
- 운영 단계에서 업로드가 생기면 object storage가 확장성과 배포 독립성에 유리하다.

### 입력

- local asset file
- multipart upload file
- metadata

### 출력

- public file URL/path
- file hash
- upload status

### 의존성

- Backend API Server
- Media asset DB metadata
- CDN 확인 필요

### 장애 가능성

- 파일 누락
- 잘못된 MIME
- 외부 reference 포함 SVG
- 저장소 권한 오류

### 대응 방안

- upload validation
- SVG sanitizer
- checksum 검증
- media asset approval workflow

## 구성요소: Authentication and Authorization

### 역할

- 향후 관리자/CMS/운영 API 접근을 통제한다.
- MVP에서는 사용하지 않는다.

### 주요 기능

- 로그인
- 내 정보 조회
- role 기반 접근 제어
- inactive/locked 계정 차단

### 기술 후보

- Bearer JWT
- HttpOnly Session Cookie
- External IdP
- Basic auth for staging only

### 권장 기술

- 확인 필요
- 공개 운영 관리자 기능이 생기면 External IdP 또는 HttpOnly Cookie 기반 session 권장

추천 이유:

- 브라우저 관리자 UI에서는 HttpOnly Cookie가 token 탈취 리스크를 줄일 수 있다.
- 조직 계정이 있다면 외부 IdP가 계정 lifecycle 관리에 유리하다.

### 입력

- login credential
- session cookie 또는 bearer token

### 출력

- authenticated user
- role/permission
- 401/403 response

### 의존성

- app_users table
- backend middleware
- optional external IdP

### 장애 가능성

- token 만료
- 권한 오설정
- inactive 계정 접근

### 대응 방안

- 공통 auth middleware
- role-based guard
- audit log
- 최소 권한 원칙

## 구성요소: Observability and Operations

### 역할

- 향후 API와 배포 환경의 상태, 오류, 성능을 관측한다.
- MVP에서는 build/test 결과와 server logs 중심으로 관리한다.

### 주요 기능

- application logs
- request logs
- error logs
- audit logs
- health check
- performance monitoring

### 기술 후보

- Hosting provider logs
- OpenTelemetry
- Sentry
- Prometheus/Grafana
- CloudWatch 또는 유사 managed logs

### 권장 기술

- MVP: build logs, Playwright artifacts, hosting logs
- 향후 API: OpenTelemetry + error tracking + structured logs

### 입력

- application event
- API request/response metadata
- error stack
- performance metric

### 출력

- log entry
- alert
- dashboard
- audit record

### 의존성

- deployment platform
- backend API server
- database

### 장애 가능성

- 로그 과다
- 개인정보 로그 유출
- alert noise

### 대응 방안

- 민감정보 마스킹
- log level 정책
- retention 정책
- alert threshold 조정

## 6. 기술 스택 제안

| 영역 | 권장 기술 | 대안 | 선택 이유 | 확인 필요 사항 |
|---|---|---|---|---|
| Frontend | Next.js App Router, React, TypeScript | Vite, Astro, Remix | 현재 프로젝트 구조와 metadata/route 관리에 적합 | 배포 hosting 방식 |
| Styling | Tailwind CSS + CSS custom properties | CSS Modules, vanilla CSS | 빠른 반응형 구현과 기존 설정 활용 | 공식 브랜드 색상 |
| Motion | GSAP | Framer Motion, CSS animation | scroll/motion timeline 제어에 적합 | motion 강도 승인 |
| WebGL | Three.js + React Three Fiber | raw WebGL, CSS 3D | React 통합과 안정적 abstraction | 최소 지원 브라우저/GPU |
| Backend | MVP 없음. 향후 NestJS/FastAPI/Next Route Handlers | Express | 현재는 불필요, 확장 시 선택 | backend 도입 여부 |
| Database | MVP 없음. 향후 PostgreSQL | MySQL, SQLite | 관계형 + JSONB + audit에 적합 | DBMS 선택 |
| Authentication | MVP 없음. 향후 External IdP 또는 HttpOnly session | Bearer JWT | 관리자 기능 전까지 불필요 | 조직 인증 정책 |
| File Storage | MVP는 repository public assets. 향후 S3 호환 storage | CMS asset store | MVP는 단순성, 향후 업로드는 object storage | 저장소/권한 정책 |
| Cache | CDN/Next.js cache | Redis | 정적 page 중심이라 Redis 불필요 | 배포 환경 cache 정책 |
| Search | 없음 | PostgreSQL full-text, external search | 검색 기능 없음 | 향후 사이트 검색 여부 |
| Vector DB | 없음 | pgvector, Pinecone 등 | AI/RAG 요구 없음 | 해당 없음 |
| Queue | 없음. 향후 upload/email 처리 시 도입 | BullMQ, Celery, managed queue | MVP에는 비동기 작업 없음 | 문의/메일/파일 처리 규모 |
| Scheduler | 없음. 향후 retention cleanup 필요 | cron, managed scheduler | MVP에는 주기 작업 없음 | 개인정보 보관 기간 |
| Logging | build/test logs, hosting logs | OpenTelemetry, Sentry | MVP에는 최소 관측성 | 운영 환경 선택 |
| Monitoring | Playwright artifacts, uptime check | Sentry, Prometheus/Grafana | MVP는 UI 검증 중심 | SLA/알림 정책 |
| Deployment | Next.js hosting 또는 Node server | Static export 확인 필요 | App Router routes 활용 | production 환경 |
| CI/CD | lint + build + Playwright | GitHub Actions, Vercel CI | release 품질 gate 필요 | CI 플랫폼 |

## 7. 주요 데이터 흐름

### 현재 홈페이지 렌더링 흐름

1. 사용자가 `/`에 접속한다.
2. Next.js가 page와 layout을 렌더링한다.
3. TypeScript 콘텐츠 상수와 로컬 public asset을 사용한다.
4. 브라우저는 HTML/CSS/JS를 로드한다.
5. WebGL 가능 조건이면 Hero canvas를 초기화한다.
6. WebGL 불가, 모바일, reduced-motion이면 fallback Hero를 표시한다.
7. 사용자는 Header, 스크롤, CTA로 주요 섹션을 탐색한다.

### WebGL fallback 흐름

1. Frontend가 viewport, reduced-motion, forceFallback query, WebGL 지원 여부를 확인한다.
2. 조건이 WebGL 사용 가능이면 canvas Hero를 렌더링한다.
3. 조건이 fallback이면 canvas를 렌더링하지 않는다.
4. fallback Hero가 headline, description, CTA, semantic service list를 표시한다.
5. 사용자는 동일한 Contact CTA와 섹션 탐색을 사용할 수 있다.

### Contact 링크 흐름

1. 사용자가 Hero CTA 또는 Header CONTACT를 선택한다.
2. 브라우저가 `#contact` 섹션으로 이동한다.
3. 사용자는 공식 문의 링크, 이메일 링크, 전화 링크 중 하나를 선택한다.
4. 공식 문의 링크는 외부 웹 페이지로 이동한다.
5. 이메일/전화 링크는 브라우저 또는 OS protocol handler에 위임된다.
6. MVP에서는 서버에 문의 데이터를 저장하지 않는다.

### Draft SEO 검증 흐름

1. QA가 `/robots.txt`를 요청한다.
2. 시스템은 `Disallow: /`를 반환한다.
3. QA가 `/sitemap.xml`을 요청한다.
4. 시스템은 공개 canonical URL을 포함하지 않는 sitemap을 반환한다.
5. QA가 홈페이지 head metadata에서 `noindex`, `nofollow`를 확인한다.

### 향후 CMS 콘텐츠 승인 흐름

1. editor가 관리자 UI에서 콘텐츠 draft를 작성한다.
2. Frontend가 Backend API에 콘텐츠 저장 요청을 보낸다.
3. Backend가 `content_blocks`에 draft 또는 새 version을 저장한다.
4. approver가 콘텐츠를 검수한다.
5. Backend가 승인 결과를 `content_blocks.approval_status`에 저장한다.
6. `audit_logs`에 변경 이력을 저장한다.
7. release snapshot 생성 후 QA 통과 시 공개 전환한다.

### 향후 문의 폼 흐름

1. 사용자가 Contact 화면에서 문의 폼을 작성한다.
2. Frontend가 `POST /api/v1/inquiries`를 호출한다.
3. Backend가 입력값과 개인정보 동의를 검증한다.
4. Backend가 `inquiries`와 `inquiry_events`를 생성한다.
5. 운영자가 관리자 UI에서 문의를 조회하고 상태를 변경한다.

### 향후 media upload 흐름

1. editor가 관리자 UI에서 파일을 선택한다.
2. Frontend가 multipart 요청으로 media upload API를 호출한다.
3. Backend가 파일 크기, MIME, 확장자, SVG 보안 조건을 검증한다.
4. 파일 저장소에 저장하고 sha256을 계산한다.
5. `media_assets`에 `needs_review` 상태로 metadata를 저장한다.
6. approver 승인 후 콘텐츠에 연결한다.

## 8. 인증/인가 구조

### 인증 방식

| 범위 | 방식 |
|---|---|
| 현재 MVP | 인증 없음 |
| 향후 공개 API | 인증 없음 + rate limit |
| 향후 관리자 API | External IdP, HttpOnly session, Bearer JWT 중 선택 필요 |

### 권한 모델

| 역할 | 권한 |
|---|---|
| public | 공개 page 조회, 문의 제출 |
| viewer | 관리자 데이터 읽기 |
| editor | 콘텐츠 draft 생성/수정, media 등록 |
| approver | 콘텐츠/asset/link 승인/반려 |
| qa | QA 상태 갱신 |
| operator | 문의 처리, release publish |
| admin | 전체 관리 |

### 토큰/세션 관리 방식

- MVP: 해당 없음
- 향후:
  - 브라우저 관리자 UI는 HttpOnly secure cookie 기반 session을 우선 검토한다.
  - API client가 별도 존재하면 Bearer JWT를 검토한다.
  - refresh token, 만료 시간, logout 방식은 확인 필요이다.

### 접근 제어 위치

- Backend auth middleware에서 인증을 검증한다.
- Route handler/controller에서 role 기반 권한을 검증한다.
- DB row-level security 도입 여부는 확인 필요이다.
- Frontend의 권한 UI 분기는 보조 수단이며 보안 경계로 보지 않는다.

### 권한 없는 요청 처리

| 상황 | 응답 |
|---|---|
| 인증 없음 | 401 `UNAUTHENTICATED` |
| 권한 부족 | 403 `FORBIDDEN` |
| 비활성 계정 | 403 `ACCOUNT_INACTIVE` |
| 존재하지 않는 resource | 404 `NOT_FOUND` |

## 9. 데이터 저장 구조

### 관계형 DB 사용 범위

| 범위 | 현재 MVP | 향후 확장 |
|---|---|---|
| 콘텐츠 | TypeScript constants | pages, sections, content_blocks |
| asset metadata | repository 파일 경로 | media_assets |
| 링크 | TypeScript constants | external_links |
| 문의 | 저장하지 않음 | inquiries, inquiry_events |
| release | 문서와 Git 이력 | release_snapshots |
| 감사 로그 | Git 이력 | audit_logs |

### 파일 저장소 사용 범위

- MVP: `public` 디렉터리의 로컬 asset
- 향후: 업로드 파일과 승인 asset은 object storage 검토
- SVG는 sanitizer와 external href 금지 검사가 필요하다.

### 캐시 사용 여부

- MVP: 별도 cache 불필요
- 향후:
  - 공개 콘텐츠는 CDN/Next.js cache 우선
  - 관리자 API는 강한 cache보다 최신성 우선
  - Redis는 session/rate limit/queue가 필요해질 때 검토

### 검색 엔진 사용 여부

- MVP: 사이트 내 검색 없음
- 향후:
  - 간단한 관리자 검색은 PostgreSQL index/full-text로 시작 가능
  - 외부 검색 엔진은 콘텐츠 양이 늘어난 뒤 검토

### 로그 저장 방식

- MVP: build logs, server logs, Playwright artifacts
- 향후 API: structured application logs + audit_logs table
- 개인정보는 application logs에 원문으로 남기지 않아야 한다.

## 10. 비동기 처리 구조

### MVP 기준

| 항목 | 필요 여부 | 이유 |
|---|---|---|
| Queue | 불필요 | 서버 작업과 사용자 제출 데이터가 없다. |
| Worker | 불필요 | 파일 처리, 메일 발송, batch 작업이 없다. |
| Scheduler | 불필요 | 개인정보 보관/삭제 job이 없다. |
| 작업 상태 관리 | 불필요 | 장기 실행 작업이 없다. |

### 향후 확장 기준

| 작업 | Queue 필요 여부 | Worker 필요 여부 | Scheduler 필요 여부 | 실패 재시도 정책 |
|---|---|---|---|---|
| media upload 후 검사 | 조건부 필요 | 조건부 필요 | 불필요 | 3회 재시도 후 failed |
| 문의 접수 알림 email | 필요 가능 | 필요 가능 | 불필요 | exponential backoff |
| CRM 전송 | 필요 가능 | 필요 가능 | 불필요 | 재시도 후 dead-letter |
| 개인정보 보존 기간 삭제 | 불필요 | 가능 | 필요 | 실패 시 다음 schedule에서 재시도 |
| release publish | 불필요 | 불필요 | 불필요 | transaction rollback |

### 작업 상태 관리 방식

- 문의는 `inquiries.status`와 `inquiry_events`로 관리한다.
- media 검사가 비동기화되면 `media_assets.approval_status` 외 별도 processing status가 필요할 수 있다.
- queue 도입 시 job table 또는 managed queue dashboard를 사용한다.

## 11. 에러 처리 전략

### 프론트엔드 에러 처리

| 오류 | 처리 |
|---|---|
| WebGL 실패 | 사용자에게 오류를 노출하지 않고 fallback Hero 표시 |
| asset 로드 실패 | 텍스트 콘텐츠는 유지하고 QA에서 실패 처리 |
| 링크 오류 | 배포 전 QA 실패로 차단 |
| 존재하지 않는 route | Not Found 화면 표시 |
| 향후 API 오류 | 공통 error response를 사용자 메시지로 매핑 |

### 백엔드 에러 처리

- 모든 JSON API는 공통 응답 형식을 사용한다.
- validation error는 422를 사용한다.
- 권한 오류는 401/403을 구분한다.
- 상태 충돌은 409를 사용한다.
- 서버 내부 오류는 원인을 노출하지 않고 500으로 응답한다.

### API 공통 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값을 확인해주세요.",
    "details": {
      "field": "email",
      "reason": "INVALID_EMAIL"
    }
  }
}
```

### 로그 기록

| 로그 대상 | 기록 방식 |
|---|---|
| MVP WebGL/fallback 오류 | browser console guard와 Playwright 실패 |
| API validation error | structured log, 민감정보 제외 |
| API server error | stack trace는 server log에만 기록 |
| 콘텐츠 승인/게시 | audit_logs에 기록 |
| 문의 상태 변경 | inquiry_events와 audit_logs에 기록 |

### 사용자 메시지 표시

- MVP는 오류 상황을 사전에 QA로 차단하는 방식이 우선이다.
- WebGL 오류는 fallback으로 흡수한다.
- 향후 API 오류는 사용자에게 짧고 복구 가능한 메시지를 표시한다.

## 12. 로깅/모니터링 전략

| 항목 | MVP 전략 | 향후 확장 전략 |
|---|---|---|
| 애플리케이션 로그 | Next.js server/build logs | structured JSON logs |
| API 요청 로그 | 해당 없음 | method, path, status, latency, request id |
| 에러 로그 | Playwright console guard, hosting logs | Sentry 또는 equivalent error tracking |
| 감사 로그 | Git 이력과 문서 | audit_logs table |
| 성능 모니터링 | Playwright screenshot/overflow, build 검증 | Core Web Vitals, APM |
| Health Check | 확인 필요 | `/healthz`, `/readyz` |

### Health Check 제안

향후 backend 도입 시:

| Endpoint | 목적 |
|---|---|
| `GET /healthz` | 프로세스 생존 확인 |
| `GET /readyz` | DB/file storage 등 의존성 준비 상태 확인 |

## 13. 배포 구조

| 환경 | 구성 | 목적 | 배포 방식 | 주의사항 |
|---|---|---|---|---|
| Local 개발 환경 | Node.js, pnpm, Next.js dev server, local public assets | 개발 및 빠른 확인 | `pnpm run dev` | 포트 충돌, WebGL 브라우저 차이 확인 |
| Test/Staging 환경 | production build, draft SEO, Playwright 검증 대상 | 공개 전 QA/검수 | CI build 후 staging deploy | noindex/nofollow 유지, 외부 이미지 요청 차단 |
| Production 환경 | Next.js production app, CDN/hosting, approved assets | 공개 서비스 | CI/CD 승인 후 배포 | 공개 SEO 전환, cache invalidation, rollback 계획 필요 |

### Local 개발 환경

- 목적: 빠른 UI 구현과 로컬 Playwright 검증
- 구성: Next.js dev server, 로컬 asset, no backend
- 주의사항: reduced-motion, mobile viewport, force fallback을 로컬에서 검증해야 한다.

### Test/Staging 환경

- 목적: 콘텐츠/브랜드/QA 승인
- 구성: production build와 동일하게 실행
- 주의사항: draft 상태에서는 robots와 meta가 검색 차단이어야 한다.

### Production 환경

- 목적: 최종 공개 사이트 운영
- 구성: Next.js production hosting + CDN 검토
- 주의사항: public release 전 SEO, OG image, canonical, 고객 proof 승인 여부를 확인해야 한다.

## 14. 확장성 고려사항

| 증가 유형 | 고려사항 | 대응 |
|---|---|---|
| 사용자 증가 | 정적 page 요청 증가 | CDN/edge cache, static asset cache |
| 데이터 증가 | CMS 콘텐츠 version 증가 | PostgreSQL index, archive 정책 |
| 파일 증가 | media asset 증가 | object storage, CDN, sha256 중복 제거 |
| API 요청 증가 | 관리자/문의 API 부하 | rate limit, connection pool, caching |
| 검색 성능 | 관리자 콘텐츠/문의 검색 | PostgreSQL index/full-text, 필요 시 search engine |
| DB 부하 | inquiries/audit_logs 증가 | index, partitioning, retention cleanup |
| WebGL 성능 | 다양한 기기 GPU 차이 | fallback 조건 확대, mobile canvas 비활성 |

## 15. 보안 고려사항

| 영역 | 고려사항 | 대응 |
|---|---|---|
| 인증/인가 | 관리자 API 무단 접근 | auth middleware, role guard, 최소 권한 |
| 민감정보 저장 | 문의 데이터 개인정보 포함 가능 | 보관 기간, 암호화/마스킹, 삭제/익명화 정책 |
| 파일 업로드 보안 | SVG script, 외부 href, MIME spoofing | sanitizer, MIME sniffing, 확장자 제한 |
| SQL Injection | 향후 API query | parameterized query/ORM, raw SQL 제한 |
| XSS 방어 | CMS copy/HTML 삽입 | plain text/structured content, sanitizer |
| CSRF 방어 | cookie session 사용 시 필요 | CSRF token 또는 SameSite cookie |
| API Rate Limit | 문의 spam, 로그인 brute force | IP/user based rate limit |
| 감사 로그 | 공개/승인/개인정보 처리 추적 | audit_logs append-only |
| 외부 이미지 | hotlink/저작권/추적 위험 | local asset only, Playwright network 검증 |
| SEO 공개 | 미승인 콘텐츠 색인 | draft noindex/nofollow gate |

## 16. 주요 아키텍처 의사결정

## ADR-001: MVP는 프론트엔드 중심 Next.js 앱으로 구현

- 상태: 승인됨
- 배경: 현재 제품은 공식 홈페이지 MVP이며, 사용자 입력 저장, 관리자 콘솔, DB 기반 기능이 필요하지 않다.
- 선택지:
  - Next.js 프론트엔드 중심 구현
  - 별도 backend/API/DB 포함 구현
  - 정적 HTML만 사용
- 결정: Next.js App Router 기반 프론트엔드 중심 구조를 사용한다.
- 이유: page, metadata, robots, sitemap, not-found를 통합 관리할 수 있고 현재 코드베이스와 일치한다.
- 영향: MVP 구현과 배포가 단순해진다. 향후 CMS/API 도입 시 architecture 확장이 필요하다.
- 확인 필요 사항: production hosting 방식

## ADR-002: WebGL은 Hero 영역에만 사용

- 상태: 승인됨
- 배경: WebGL은 첫 화면의 시각적 차별화를 제공하지만 성능, 접근성, 호환성 리스크가 있다.
- 선택지:
  - 전체 페이지 WebGL 중심
  - Hero에만 WebGL 사용
  - WebGL 미사용
- 결정: WebGL은 Hero 영역에만 사용한다.
- 이유: 효과와 리스크를 Hero로 제한하고 본문은 HTML/CSS로 안정적으로 제공할 수 있다.
- 영향: 모바일과 reduced-motion 대응이 쉬워진다. Hero 외 고급 3D 효과는 제외된다.
- 확인 필요 사항: 최종 WebGL motion 세부 연출 승인

## ADR-003: MVP에서는 DB와 인증을 도입하지 않음

- 상태: 승인됨
- 배경: MVP는 콘텐츠 표시와 문의 링크 제공이 핵심이며, 저장해야 하는 사용자 데이터가 없다.
- 선택지:
  - DB/auth 미도입
  - headless CMS 즉시 도입
  - custom admin/backend 즉시 도입
- 결정: MVP에서는 DB와 인증을 도입하지 않는다.
- 이유: 구현 범위와 보안 리스크를 줄이고 공식 홈페이지 검수에 집중할 수 있다.
- 영향: 콘텐츠 변경은 코드/문서/Git 기반으로 관리한다. 운영자가 직접 UI로 수정하는 기능은 없다.
- 확인 필요 사항: 향후 CMS 도입 시점

## ADR-004: 외부 이미지 hotlink를 금지하고 로컬 asset만 사용

- 상태: 승인됨
- 배경: 외부 이미지 hotlink는 저작권, 추적, 네트워크 안정성 리스크가 있다.
- 선택지:
  - 외부 이미지 사용 허용
  - 승인된 외부 CDN만 허용
  - 로컬 asset만 허용
- 결정: MVP에서는 로컬 asset만 사용한다.
- 이유: AGENTS 지침과 프로젝트 요구사항을 만족하고 QA로 검증 가능하다.
- 영향: asset은 repository/public 경로에서 관리해야 한다. 외부 이미지 요청은 테스트 실패로 처리한다.
- 확인 필요 사항: 생성 asset의 공개 사용 승인

## ADR-005: 향후 운영 DB는 PostgreSQL을 우선 제안

- 상태: 제안됨
- 배경: CMS, 문의, release, audit log가 도입되면 관계형 데이터와 JSON payload가 함께 필요하다.
- 선택지:
  - PostgreSQL
  - MySQL
  - SQLite
  - managed CMS만 사용
- 결정: PostgreSQL을 우선 제안한다.
- 이유: JSONB, GIN index, transaction, constraint, audit 데이터에 적합하다.
- 영향: PostgreSQL 의존 기능을 사용하는 migration과 운영이 필요하다.
- 확인 필요 사항: 실제 DBMS 선택, managed DB 여부

## ADR-006: 향후 API는 REST v1을 우선 제안

- 상태: 제안됨
- 배경: 프론트엔드와 백엔드 협업을 위해 명확한 endpoint, method, request/response 계약이 필요하다.
- 선택지:
  - REST
  - GraphQL
  - tRPC
  - CMS SDK 직접 사용
- 결정: REST `/api/v1`을 우선 제안한다.
- 이유: 기능 범위가 콘텐츠, 문의, release 등 resource 중심이며 OpenAPI/Swagger 전환이 쉽다.
- 영향: endpoint와 schema 관리가 필요하다.
- 확인 필요 사항: backend framework와 API hosting 방식

## ADR-007: Playwright를 MVP 품질 gate로 사용

- 상태: 승인됨
- 배경: WebGL/fallback/mobile/reduced-motion은 수동 검수만으로 회귀를 잡기 어렵다.
- 선택지:
  - 수동 QA만 수행
  - Playwright 기반 E2E/screenshot 검증
  - 시각 회귀 전문 SaaS 도입
- 결정: Playwright를 필수 검증 도구로 사용한다.
- 이유: 현재 테스트 구조가 존재하고 viewport, media emulation, network request 검증에 적합하다.
- 영향: CI에서 브라우저 실행 환경이 필요하다.
- 확인 필요 사항: 최종 필수 브라우저 범위

## 17. 리스크와 대응 방안

| 리스크 | 발생 가능성 | 영향도 | 대응 방안 |
|---|---|---|---|
| WebGL blank canvas | 중간 | 높음 | canvas nonblank 검증, fallback 전환 |
| 모바일 성능 저하 | 중간 | 높음 | 모바일 WebGL 축소/비활성, 일반 문서 흐름 사용 |
| reduced-motion 초기 반영 실패 | 낮음 | 높음 | 초기 렌더 조건 분기, Playwright media emulation |
| 외부 이미지 혼입 | 낮음 | 높음 | local asset 정책, network request 테스트 |
| 미승인 GTG claim 노출 | 중간 | 높음 | 콘텐츠 검수, 금지 claim 검색, approval checklist |
| draft noindex가 production에 남음 | 중간 | 중간 | public release SEO checklist, ADR/QA gate |
| public 전 noindex 누락 | 낮음 | 높음 | SEO-001 테스트 유지 |
| 향후 문의 폼 개인정보 리스크 | 중간 | 높음 | 개인정보 정책 확정 전 backend 미도입 |
| CMS 도입 후 권한 오설정 | 중간 | 높음 | role guard, audit log, 최소 권한 |
| 파일 업로드 SVG 보안 문제 | 중간 | 높음 | sanitizer, MIME 검증, 외부 href 금지 |
| 테스트 flakiness | 중간 | 중간 | 안정적 wait 조건, screenshot 기준 정비 |
| 배포 환경 미확정 | 중간 | 중간 | staging/production 구성 확정 필요 |

## 18. 확인 필요 사항

### 기술 선택 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| Backend framework | NestJS, FastAPI, Next Route Handlers 중 선택 필요 |
| DBMS | PostgreSQL 사용 여부 확정 필요 |
| Authentication | External IdP, HttpOnly session, Bearer JWT 중 선택 필요 |
| File storage | repository public 유지, object storage, CMS asset store 중 선택 필요 |
| Monitoring | Sentry/OpenTelemetry/hosting logs 등 도입 여부 확인 필요 |

### 인프라 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| Production hosting | Vercel, Node server, static hosting 등 결정 필요 |
| Staging 환경 | 공개 전 검수 URL과 접근 제한 방식 확인 필요 |
| CDN/cache | 정적 asset cache와 invalidation 정책 확인 필요 |
| CI/CD | lint, build, Playwright 실행 위치와 승인 gate 확인 필요 |
| 도메인/SSL | 최종 domain, canonical URL, SSL 관리 방식 확인 필요 |

### 보안 정책 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| 개인정보 저장 여부 | 문의 폼 도입 여부와 저장 항목 확정 필요 |
| 문의 데이터 보관 기간 | 삭제/익명화 시점 확인 필요 |
| 관리자 권한 모델 | role별 상세 permission 확정 필요 |
| 파일 업로드 보안 | SVG sanitizer, antivirus, MIME sniffing 범위 확인 필요 |
| Rate limit | 문의 제출, 로그인, 관리자 API 제한 정책 확인 필요 |
| 감사 로그 보관 | audit log 보존 기간과 마스킹 정책 확인 필요 |

### 성능 목표 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| Core Web Vitals | LCP, CLS, INP 목표값 확인 필요 |
| 최소 지원 기기 | 모바일/태블릿/데스크톱 기준 확인 필요 |
| 최소 지원 브라우저 | Chromium, WebKit, Firefox 지원 수준 확인 필요 |
| WebGL fallback 기준 | GPU/브라우저/성능 조건별 fallback 기준 확인 필요 |
| 대용량 데이터 예상치 | 향후 CMS/문의/audit 규모 확인 필요 |
