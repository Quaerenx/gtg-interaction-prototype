# 기능 명세서

문서 작성일: 2026-07-09  
프로젝트명: GTG Solutions & Consult 인터랙션 프로토타입  
기준 버전: MVP v0.1 Draft

## 1. 문서 개요

### 문서 목적

이 문서는 GTG Solutions & Consult 공식 홈페이지 MVP의 각 기능이 실제 화면, 상태, 예외, 검증 기준에서 어떻게 동작해야 하는지 정의한다. 개발자는 이 문서를 기준으로 구현 티켓을 만들 수 있어야 하며, QA 담당자는 이 문서를 기준으로 테스트 케이스를 작성할 수 있어야 한다.

### 대상 독자

| 대상 독자 | 활용 목적 |
|---|---|
| 프론트엔드 개발자 | 화면 컴포넌트, 상태 분기, 반응형, 접근성, fallback 구현 |
| QA 담당자 | 기능별 정상/예외 케이스와 수용 기준 검증 |
| Product Manager | MVP 범위와 후순위 범위 관리 |
| 콘텐츠/브랜드 검수 담당자 | 문구, 이미지, 고객/claim 사용 여부 검수 |
| 운영 담당자 | 공개 상태, SEO, 문의 경로, 배포 전 체크 항목 확인 |

### 기준 버전

| 항목 | 내용 |
|---|---|
| 제품 버전 | MVP v0.1 Draft |
| 제품 형태 | 공식 홈페이지 단일 페이지 MVP |
| 구현 방식 | Next.js App Router 기반 프론트엔드 웹앱 |
| Backend | MVP 범위에 포함하지 않음 |
| Database | MVP 범위에 포함하지 않음 |
| Authentication | MVP 범위에 포함하지 않음 |

### 관련 문서

| 문서 | 경로 |
|---|---|
| 프로젝트 기본 정보 | `docs/project-basic-info.md` |
| 프로젝트 정의서 | `docs/project-definition.md` |
| 요구사항 정의서 / PRD | `docs/prd.md` |
| 콘텐츠 요구사항 | `docs/content-requirements.md` |
| 구현 결정사항 | `docs/implementation-decisions.md` |
| 브라우저 테스트 리포트 | `docs/browser-test-report.md` |

## 2. 기능 목록 요약

| 기능 ID | 기능명 | 설명 | 사용자 | 우선순위 | 관련 화면 | 관련 API | 상태 |
|---|---|---|---|---|---|---|---|
| PAGE-001 | 단일 페이지 홈페이지 | `/` 경로에서 홈페이지 전체 섹션을 렌더링한다. | 모든 방문자 | Must | Home | 없음 | MVP 포함 |
| NAV-001 | 상단 내비게이션 | 주요 섹션 앵커로 이동 가능한 헤더 내비게이션을 제공한다. | 모든 방문자 | Must | Header | 없음 | MVP 포함 |
| NAV-002 | 모바일 메뉴 | 모바일에서 dialog 기반 메뉴를 제공한다. | 모바일 방문자 | Must | Header/Menu | 없음 | MVP 포함 |
| HERO-001 | WebGL Hero | 데스크톱에서 WebGL 기반 Hero 인터랙션을 제공한다. | 데스크톱 방문자 | Must | Hero | 없음 | MVP 포함 |
| HERO-002 | Hero fallback | WebGL 미지원, 모바일, reduced-motion 조건에서 HTML/CSS Hero를 제공한다. | 모든 방문자 | Must | Hero | 없음 | MVP 포함 |
| HERO-003 | Hero semantic 콘텐츠 | Hero 서비스 목록과 핵심 내용을 Canvas 밖 semantic HTML로 제공한다. | 모든 방문자 | Must | Hero | 없음 | MVP 포함 |
| SOL-001 | 솔루션 섹션 | 5개 솔루션 섹션과 CTA를 제공한다. | 방문자, 잠재 고객 | Must | Solutions | 없음 | MVP 포함 |
| COMP-001 | 회사 소개 및 Capability Map | 회사 소개와 역량 지도를 반응형으로 제공한다. | 모든 방문자 | Must | Company | 없음 | MVP 포함 |
| ENG-001 | Engagement Model | Diagnose, Design, Implement, Operate 4단계를 제공한다. | 방문자, 잠재 고객 | Must | Engagement | 없음 | MVP 포함 |
| CONTACT-001 | 문의 섹션 | 이메일, 전화, 공식 문의 링크를 제공한다. | 잠재 고객 | Must | Contact | `mailto:`, `tel:` 외부 프로토콜 | MVP 포함 |
| SEO-001 | Draft SEO/robots | 공개 승인 전 검색 인덱싱을 제한한다. | 운영 담당자 | Must | Metadata, robots, sitemap | `/robots.txt`, `/sitemap.xml` | MVP 포함 |
| ERR-001 | 404 페이지 | 존재하지 않는 경로에서 복구 가능한 Not Found 페이지를 제공한다. | 모든 방문자 | Must | Not Found | 없음 | MVP 포함 |
| ASSET-001 | 로컬 자산 사용 | 외부 이미지 hotlink 없이 로컬 자산만 사용한다. | 모든 방문자 | Must | 전체 화면 | 없음 | MVP 포함 |
| CONTENT-001 | Claim-safe 콘텐츠 | 미확인 고객/수치/인증/연혁/OVA 복제 요소를 제한한다. | 검수 담당자 | Must | 전체 화면 | 없음 | MVP 포함 |
| QA-001 | 검증 자동화 | lint, build, Playwright 검증을 수행 가능하게 한다. | 개발자, QA | Must | 테스트 환경 | 없음 | MVP 포함 |
| FUT-001 | 최종 SEO 공개 설정 | 승인 후 canonical, sitemap, OG image를 공개 정책으로 전환한다. | 운영 담당자 | Should | Metadata | `/sitemap.xml` | MVP 이후 |
| FUT-002 | CMS 연동 | 콘텐츠를 CMS에서 관리할 수 있게 한다. | 운영/마케팅 | Should | 전체 화면 | 확인 필요 | MVP 이후 |
| FUT-003 | 문의 폼 backend | 사용자가 문의 내용을 직접 제출할 수 있게 한다. | 잠재 고객 | Should | Contact | 확인 필요 | MVP 이후 |
| EXCL-001 | 로그인/관리자/DB | MVP에서 로그인, 관리자 콘솔, DB를 제공하지 않는다. | 해당 없음 | Won't | 해당 없음 | 해당 없음 | 제외 |

## 3. 기능 상세 명세

## 기능 ID: PAGE-001
## 기능명: 단일 페이지 홈페이지

### 1. 기능 목적

- 사용자가 `/` 경로에서 GTG Solutions & Consult의 핵심 서비스, 회사 소개, 수행 모델, 문의 경로를 한 번에 이해할 수 있게 해야 한다.
- MVP의 모든 핵심 콘텐츠를 한 페이지에서 제공해 별도 라우팅 없이 검수와 QA를 단순화해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모든 방문자, 잠재 고객, 내부 검수자, 개발자, QA 담당자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- Next.js 앱이 정상 빌드되어야 한다.
- `/` route가 존재해야 한다.
- 콘텐츠 데이터가 로드 가능한 상태여야 한다.
- 로그인은 필요하지 않다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| URL path | string | 필수 | `/` 이어야 한다. | `/` |
| URL hash | string | 선택 | 존재하는 섹션 id와 일치해야 한다. | `#solutions` |
| query | string | 선택 | 테스트용 query는 기능별 명세를 따른다. | `?forceFallback=1` |

### 5. 처리 흐름

1. 사용자가 `/` 경로에 접속한다.
2. 시스템은 layout metadata와 page component를 렌더링한다.
3. 시스템은 Header, Hero, Solutions, Company, Engagement, Contact, Footer를 순서대로 렌더링한다.
4. URL hash가 있으면 브라우저 기본 앵커 이동 또는 스크롤 보정이 동작해야 한다.
5. 화면 크기와 motion 설정에 따라 각 섹션의 반응형 상태가 적용되어야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| HTML document | document | 단일 페이지 홈페이지 | `<main id="main-content">...` |
| 섹션 DOM | HTMLElement | 주요 섹션별 DOM | `data-testid="hero"` |
| 메타데이터 | metadata | draft 상태의 title/robots 등 | `noindex,nofollow` |

### 7. 정상 케이스

- 사용자가 `/`에 접속하면 Hero부터 Footer까지 모든 MVP 섹션이 표시되어야 한다.
- 사용자가 `/ #contact` 형태의 링크로 접근하면 Contact 섹션으로 이동할 수 있어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 존재하지 않는 경로 접근 | 잘못된 URL | ERR-001 Not Found 페이지 표시 | 페이지를 찾을 수 없다는 안내 | 아니오 |
| 섹션 id 누락 | 구현 오류 | 배포 전 테스트 실패 처리 | 사용자 메시지 없음 | 예, QA 실패 기록 |
| 콘텐츠 누락 | 콘텐츠 데이터 오류 | 누락 영역이 빈 화면이 되지 않도록 기본 구조 유지 | 확인 필요 | 예, QA 실패 기록 |

### 9. 권한 규칙

- 모든 사용자가 접근 가능해야 한다.
- 로그인, 세션, 권한 체크를 요구하지 않아야 한다.
- 사용자별 데이터 접근 제한은 없다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| DRAFT | 검색 인덱싱 차단 상태 | 콘텐츠 최종 승인 전 |
| PUBLIC_READY | 공개 전환 준비 상태 | 콘텐츠, SEO, QA 승인 후 |

### 11. 수용 기준

- Given 사용자가 `/` 경로에 접속했을 때
- When 페이지 로딩이 완료되면
- Then Header, Hero, Solutions, Company, Engagement, Contact, Footer가 모두 DOM에 존재해야 한다.

- Given 사용자가 모바일 viewport로 접속했을 때
- When 페이지를 끝까지 스크롤하면
- Then 수평 overflow 없이 모든 섹션을 읽을 수 있어야 한다.

### 12. 관련 데이터

- `siteContent`
- `brandContent`
- `navigationItems`
- `heroContent`
- `solutionSlides`
- `companyContent`
- `engagementContent`
- `contactContent`
- `footerContent`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- Header는 첫 화면에서 브랜드와 메뉴 접근을 제공해야 한다.
- 본문은 `main` landmark를 사용해야 한다.
- 각 섹션은 스크롤 진입 시 텍스트가 헤더에 가려지지 않아야 한다.
- 로딩 상태는 별도 skeleton 없이 즉시 렌더 가능한 정적 콘텐츠 구조를 우선해야 한다.

### 15. 확인 필요 사항

- 최종 공개 도메인과 배포 환경 확인 필요
- 공개 전환 시 canonical, sitemap, robots 정책 확인 필요

## 기능 ID: NAV-001
## 기능명: 상단 내비게이션

### 1. 기능 목적

- 사용자가 주요 섹션으로 빠르게 이동할 수 있어야 한다.
- 방문자가 GTG의 회사 소개, 솔루션, 수행 모델, 문의 영역을 헤더에서 예측 가능하게 탐색할 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모든 방문자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- `navigationItems` 데이터가 존재해야 한다.
- 대상 섹션 id가 페이지 내에 존재해야 한다.
- Header 컴포넌트가 렌더링되어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| navigation label | string | 필수 | 표시 문구는 승인된 메뉴명이어야 한다. | `SOLUTIONS` |
| href | string | 필수 | `/#[section-id]` 또는 `#section-id` 형식이어야 한다. | `/#solutions` |
| click event | UIEvent | 필수 | link 또는 button에서 발생해야 한다. | 메뉴 클릭 |

### 5. 처리 흐름

1. 시스템은 Header에 브랜드 링크와 내비게이션 링크를 렌더링한다.
2. 사용자가 내비게이션 링크를 선택한다.
3. 브라우저는 href의 hash에 해당하는 섹션으로 이동한다.
4. Header theme가 섹션 배경에 맞게 전환되어야 한다.
5. 포커스와 스크롤 위치는 사용자가 섹션 내용을 읽을 수 있는 위치여야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| navigation link | HTMLAnchorElement | 섹션 이동 링크 | `<a href="/#solutions">SOLUTIONS</a>` |
| URL hash | string | 이동 후 주소 hash | `#contact` |
| header theme | string | 섹션 대비에 맞춘 테마 | `dark`, `light` |

### 7. 정상 케이스

- 사용자가 `CONTACT`를 클릭하면 Contact 섹션으로 이동해야 한다.
- 사용자가 `ABOUT`을 클릭하면 Company 섹션으로 이동해야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| href 대상 섹션 없음 | id 불일치 | 배포 전 테스트 실패 | 없음 | 예, QA 실패 기록 |
| 링크 텍스트 누락 | 콘텐츠 데이터 오류 | 링크를 렌더링하지 않거나 테스트 실패 처리 | 없음 | 예 |
| 헤더가 본문을 가림 | offset 계산 오류 | QA에서 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 모든 방문자가 사용할 수 있어야 한다.
- 접근 불가 상태를 만들지 않아야 한다.
- 관리자 전용 링크를 포함하지 않아야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| IDLE | 링크 대기 상태 | 기본 상태 |
| NAVIGATED | hash 이동 완료 | 링크 클릭 후 |

### 11. 수용 기준

- Given 사용자가 홈페이지에 접속했을 때
- When Header의 `SOLUTIONS` 링크를 클릭하면
- Then URL hash가 `#solutions`로 변경되고 Solutions 섹션이 화면에 보여야 한다.

- Given 키보드 사용자가 Header 링크에 포커스했을 때
- When Enter 키를 누르면
- Then 해당 섹션으로 이동해야 한다.

### 12. 관련 데이터

- `navigationItems`
- 섹션 id: `company`, `solutions`, `engagement`, `contact`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- 링크는 실제 anchor로 구현해야 한다.
- Header는 섹션 배경에 따라 readable contrast를 유지해야 한다.
- 데스크톱에서는 주요 링크를 직접 노출해야 한다.

### 15. 확인 필요 사항

- 최종 메뉴명 확정 필요
- Header sticky 여부와 섹션 offset 정책 최종 확인 필요

## 기능 ID: NAV-002
## 기능명: 모바일 메뉴

### 1. 기능 목적

- 모바일 화면에서 제한된 가로 공간 안에서도 주요 섹션 탐색을 가능하게 해야 한다.
- 키보드와 보조기술 사용자도 메뉴를 열고 닫을 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모바일 방문자, 키보드 사용자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- Header가 렌더링되어야 한다.
- 모바일 메뉴 버튼이 viewport 조건에 맞게 표시되어야 한다.
- 메뉴 항목은 `navigationItems`와 일치해야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| open action | UIEvent | 필수 | Open menu 버튼 클릭 또는 키보드 활성화 | `Open menu` |
| close action | UIEvent | 선택 | Close 버튼 또는 Escape | `Escape` |
| menu link | string | 선택 | 유효한 섹션 href | `/#contact` |

### 5. 처리 흐름

1. 모바일 viewport에서 시스템은 메뉴 열기 버튼을 표시한다.
2. 사용자가 `Open menu` 버튼을 선택한다.
3. 시스템은 `dialog` 역할의 메뉴를 표시한다.
4. 포커스는 메뉴 내부의 첫 번째 조작 가능한 요소로 이동해야 한다.
5. 사용자가 메뉴 링크를 선택하면 해당 섹션으로 이동하고 메뉴가 닫혀야 한다.
6. 사용자가 `Close` 또는 `Escape`를 입력하면 메뉴가 닫히고 포커스가 열기 버튼으로 돌아가야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| menu dialog | HTMLElement | 모바일 메뉴 컨테이너 | `role="dialog"` |
| menu links | HTMLAnchorElement[] | 섹션 이동 링크 목록 | `CONTACT` |
| focus state | DOM focus | 현재 포커스 위치 | `Close` button |

### 7. 정상 케이스

- 사용자가 모바일에서 메뉴를 열면 메뉴 dialog가 보이고 내비게이션 링크가 표시되어야 한다.
- 사용자가 Escape를 누르면 메뉴가 닫히고 Open menu 버튼에 포커스가 돌아와야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 메뉴가 닫히지 않음 | focus/dialog 상태 오류 | QA 실패 처리 | 없음 | 예 |
| 링크 선택 후 메뉴가 남아 있음 | close 처리 누락 | QA 실패 처리 | 없음 | 예 |
| 포커스가 페이지 뒤로 이동 | focus trap 누락 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 모든 모바일 방문자가 사용할 수 있어야 한다.
- 메뉴 안에 관리자 전용 기능을 넣지 않아야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| CLOSED | 메뉴가 닫힌 상태 | 초기 상태, Close/Escape |
| OPEN | 메뉴가 열린 상태 | Open menu 선택 |

### 11. 수용 기준

- Given 모바일 viewport에서 사용자가
- When `Open menu` 버튼을 클릭하면
- Then `Site menu` dialog가 표시되어야 한다.

- Given 메뉴가 열린 상태에서
- When 사용자가 `Escape`를 누르면
- Then 메뉴가 닫히고 `Open menu` 버튼이 포커스를 가져야 한다.

### 12. 관련 데이터

- `navigationItems`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- 열기 버튼은 accessible name `Open menu`를 가져야 한다.
- 닫기 버튼은 accessible name `Close`를 가져야 한다.
- 모바일 메뉴는 텍스트가 줄바꿈되어도 버튼 밖으로 넘치지 않아야 한다.

### 15. 확인 필요 사항

- 최종 모바일 breakpoint 정책 확인 필요
- 메뉴 항목 최종 명칭 확인 필요

## 기능 ID: HERO-001
## 기능명: WebGL Hero

### 1. 기능 목적

- 데스크톱 방문자에게 GTG의 기술 중심 이미지를 전달하는 시각적 첫인상을 제공해야 한다.
- WebGL은 Hero 영역에만 사용해 상호작용 강도와 성능 리스크를 통제해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 데스크톱 방문자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- 브라우저가 WebGL을 지원해야 한다.
- 사용자가 reduced-motion을 요청하지 않아야 한다.
- viewport가 데스크톱 Hero 조건을 만족해야 한다.
- `forceFallback=1` query가 없어야 한다.
- Hero visual asset이 로컬 경로에서 로드 가능해야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| viewport width | number | 필수 | 데스크톱 기준 이상이어야 한다. | `1440` |
| reduced motion | boolean | 필수 | `false`일 때만 WebGL 우선 | `false` |
| WebGL support | boolean | 필수 | WebGL context 생성 가능 | `true` |
| scroll progress | number | 선택 | 0 이상 1 이하로 정규화 | `0.42` |
| hero content | object | 필수 | 승인 또는 draft 표시된 콘텐츠 | `heroContent` |

### 5. 처리 흐름

1. 시스템은 viewport, reduced-motion, query, WebGL 지원 여부를 확인한다.
2. WebGL 사용 조건을 만족하면 Hero canvas를 렌더링한다.
3. 시스템은 로컬 visual asset을 로드한다.
4. 시스템은 스크롤 진행률에 따라 Hero 상태를 갱신한다.
5. canvas는 nonblank 상태로 렌더링되어야 한다.
6. WebGL 초기화 또는 렌더링 실패 시 HERO-002 fallback을 표시해야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| WebGL canvas | HTMLCanvasElement | Hero 3D 렌더링 영역 | `<canvas>` |
| hero state | string | Hero 진행 상태 | `intro`, `handoff` |
| hero progress | number | 스크롤 진행률 | `0.5` |

### 7. 정상 케이스

- 데스크톱 Chromium에서 홈페이지에 접속하면 Hero canvas가 보이고 빈 화면이 아니어야 한다.
- 사용자가 스크롤하면 Hero 상태가 진행되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| WebGL context 생성 실패 | 브라우저/드라이버 미지원 | HERO-002 fallback 표시 | 별도 메시지 없음 | 아니오 |
| canvas blank | 렌더링 또는 asset 오류 | QA 실패 처리 | 없음 | 예, QA 실패 기록 |
| reduced-motion 감지 | 사용자 설정 | HERO-002 fallback 표시 | 없음 | 아니오 |
| 모바일 viewport | 성능/UX 제약 | HERO-002 fallback 표시 | 없음 | 아니오 |

### 9. 권한 규칙

- 모든 데스크톱 방문자가 볼 수 있어야 한다.
- WebGL이 불가한 사용자를 차별하지 않고 fallback 콘텐츠를 제공해야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| CHECKING | WebGL 사용 가능 여부 확인 중 | Hero 초기화 |
| WEBGL_ACTIVE | WebGL Hero 사용 중 | 조건 충족 |
| WEBGL_FAILED | WebGL 실패 | context 또는 render 실패 |
| FALLBACK_REQUIRED | fallback 필요 | 모바일, reduced-motion, forceFallback, WebGL 실패 |

### 11. 수용 기준

- Given 데스크톱 viewport와 WebGL 지원 브라우저에서
- When 사용자가 `/`에 접속하면
- Then Hero 영역에 canvas가 표시되고 nonblank 검증을 통과해야 한다.

- Given WebGL 초기화가 실패했을 때
- When Hero가 렌더링되면
- Then HTML/CSS fallback Hero가 표시되어야 한다.

### 12. 관련 데이터

- `heroContent`
- `heroServices`
- `heroCustomers`
- 로컬 generated visual asset

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- WebGL canvas는 Hero 영역 내부에만 존재해야 한다.
- Hero 텍스트와 CTA는 canvas 위에 가려지지 않아야 한다.
- canvas와 HTML 콘텐츠가 중복으로 스크린리더에 불필요하게 읽히지 않도록 semantic 콘텐츠는 별도로 관리해야 한다.

### 15. 확인 필요 사항

- 최소 지원 GPU/브라우저 기준 확인 필요
- WebGL motion 세부 timing의 최종 검수 기준 확인 필요

## 기능 ID: HERO-002
## 기능명: Hero fallback

### 1. 기능 목적

- WebGL을 사용할 수 없는 환경에서도 Hero 핵심 메시지와 CTA를 제공해야 한다.
- reduced-motion 사용자와 모바일 사용자가 과한 모션 없이 콘텐츠를 읽을 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모든 방문자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- Hero 콘텐츠 데이터가 존재해야 한다.
- fallback visual asset이 로컬 경로에서 로드 가능해야 한다.
- WebGL이 실패했거나 fallback 조건이 참이어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| fallback reason | enum | 필수 | `mobile`, `reduced-motion`, `force`, `webgl-failed` 중 하나 | `mobile` |
| hero content | object | 필수 | headline, description, CTA 포함 | `heroContent` |
| visual src | string | 필수 | 로컬 asset 경로 | `/generated/hero/gtg-data-core.svg` |

### 5. 처리 흐름

1. 시스템은 fallback 조건을 판정한다.
2. fallback 조건이 참이면 WebGL canvas를 렌더링하지 않는다.
3. 시스템은 HTML/CSS 기반 Hero visual과 텍스트를 표시한다.
4. 시스템은 CTA와 semantic 서비스 목록을 제공한다.
5. 시스템은 reduced-motion 조건에서 animation duration과 transition을 0 또는 정적 상태로 제한한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| fallback hero | HTMLElement | 정적 Hero 영역 | `data-testid="mobile-fallback-hero"` |
| fallback image | HTMLImageElement | 로컬 fallback visual | `/generated/hero/gtg-data-core.svg` |
| CTA | HTMLAnchorElement | 문의 이동 링크 | `#contact` |

### 7. 정상 케이스

- 모바일 사용자가 접속하면 canvas 없이 fallback Hero가 표시되어야 한다.
- reduced-motion 사용자가 접속하면 정적 Hero가 초기 렌더부터 표시되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| fallback 이미지 로드 실패 | asset 누락 | 텍스트와 CTA는 계속 표시 | 없음 | 예, QA 실패 기록 |
| CTA 누락 | 콘텐츠 데이터 오류 | QA 실패 처리 | 없음 | 예 |
| canvas가 fallback 조건에서도 표시됨 | 조건 분기 오류 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 모든 방문자가 접근 가능해야 한다.
- fallback은 기능 축소가 아니라 동일 핵심 정보 제공 경로여야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| MOBILE_FALLBACK | 모바일 fallback | 모바일 viewport |
| REDUCED_MOTION_FALLBACK | reduced-motion fallback | media query reduce |
| FORCE_FALLBACK | 테스트용 강제 fallback | `forceFallback=1` |
| WEBGL_ERROR_FALLBACK | WebGL 실패 fallback | WebGL 오류 |

### 11. 수용 기준

- Given 모바일 viewport에서
- When 사용자가 홈페이지에 접속하면
- Then canvas가 없어야 하고 fallback Hero가 표시되어야 한다.

- Given reduced-motion 환경에서
- When Hero가 렌더링되면
- Then 모션 없이 Hero 핵심 텍스트와 CTA가 표시되어야 한다.

### 12. 관련 데이터

- `heroContent`
- `heroServices`
- fallback visual asset

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- fallback Hero는 CTA가 화면 밖으로 밀리지 않아야 한다.
- 작은 모바일 폭에서도 텍스트가 버튼 또는 이미지와 겹치지 않아야 한다.
- reduced-motion 상태에서 animation과 transition은 실질적으로 비활성화해야 한다.

### 15. 확인 필요 사항

- 최종 fallback visual 승인 필요
- reduced-motion에서 허용 가능한 최소 transition 수준 확인 필요

## 기능 ID: HERO-003
## 기능명: Hero semantic 콘텐츠

### 1. 기능 목적

- WebGL canvas에 의존하지 않고 Hero 서비스 정보를 HTML로 제공해야 한다.
- 스크린리더, 검색 엔진, WebGL 미지원 사용자도 동일한 핵심 서비스 목록을 확인할 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모든 방문자, 보조기술 사용자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- `heroServices` 데이터가 7개 항목을 포함해야 한다.
- 각 항목은 label을 가져야 한다.
- semantic list는 canvas와 별개로 DOM에 존재해야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| service id | string | 필수 | 중복 불가 | `data-analytics` |
| label | string | 필수 | 빈 문자열 불가 | `Data & Analytics` |
| keyword | string | 선택 | 서비스 맥락 표시 | `Vertica Analytics` |
| visualAlt | string | 필수 | 의미 있는 대체 텍스트 | `Generated data analytics visual` |

### 5. 처리 흐름

1. 시스템은 `heroServices` 배열을 읽는다.
2. 시스템은 `aria-label`이 있는 list를 렌더링한다.
3. 시스템은 각 서비스 항목을 listitem으로 렌더링한다.
4. WebGL Hero가 활성화되어도 semantic list는 DOM에 유지되어야 한다.
5. 중복 live region 또는 중복 list가 생기지 않아야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| service list | HTMLUListElement | Hero 서비스 목록 | `aria-label="Hero services"` |
| service item | HTMLLIElement | 서비스 항목 | `Data & Analytics` |

### 7. 정상 케이스

- Hero 영역에는 7개 서비스 listitem이 포함된 단일 semantic list가 있어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 서비스 개수 부족 | 콘텐츠 데이터 누락 | QA 실패 처리 | 없음 | 예 |
| 중복 list 생성 | WebGL/fallback 중복 렌더링 | QA 실패 처리 | 없음 | 예 |
| label 누락 | 콘텐츠 오류 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 모든 사용자가 접근 가능해야 한다.
- 시각적 canvas 상태와 관계없이 DOM 콘텐츠는 제공되어야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| READY | semantic list 렌더 완료 | Hero 콘텐츠 로드 완료 |

### 11. 수용 기준

- Given 홈페이지가 렌더링되었을 때
- When 보조기술 또는 Playwright role query로 `Hero services` list를 조회하면
- Then 7개 listitem이 존재해야 한다.

### 12. 관련 데이터

- `heroServices`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- semantic list가 시각적으로 숨겨질 경우에도 접근성 트리에서 필요한 정보가 제공되어야 한다.
- 숨김 처리 시 `display: none` 사용 여부는 접근성 요구에 맞게 결정해야 한다.

### 15. 확인 필요 사항

- 최종 서비스 라벨과 alt text 승인 필요

## 기능 ID: SOL-001
## 기능명: 솔루션 섹션

### 1. 기능 목적

- GTG의 주요 솔루션 5개를 방문자가 구분해서 이해할 수 있게 해야 한다.
- 각 솔루션에서 관련 기술 범위와 CTA를 확인할 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 일반 방문자, 잠재 고객, 영업/마케팅 담당자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- `solutionSlides`가 5개 항목을 포함해야 한다.
- 각 솔루션은 title, description, CTA, visual, index를 가져야 한다.
- 로컬 solution visual asset이 존재해야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| solution id | string | 필수 | 중복 불가 | `solution-data-analytics` |
| title | string | 필수 | 빈 문자열 불가 | `Data & Analytics` |
| description | string | 필수 | 승인 또는 draft 표시 필요 | `Vertica 기반...` |
| related | string[] | 선택 | 미확인 claim 금지 | `Vertica Analytics Platform` |
| cta.href | string | 필수 | `https:`, `mailto:` 등 유효 링크 | `https://x2wizard.github.io/` |
| visual | string | 필수 | 로컬 asset 경로 | `/generated/solution-data-analytics.svg` |

### 5. 처리 흐름

1. 시스템은 `solutionSlides` 배열을 읽는다.
2. 시스템은 각 solution을 순서대로 렌더링한다.
3. 데스크톱에서는 승인된 pinned 또는 hybrid scroll 동작을 적용한다.
4. 모바일과 reduced-motion에서는 일반 문서 흐름으로 읽을 수 있게 표시한다.
5. 각 섹션은 title, description, related 항목, CTA를 표시한다.
6. CTA 클릭 시 지정된 링크로 이동해야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| solution section | HTMLElement | 전체 솔루션 영역 | `data-testid="solutions-section"` |
| solution slide | HTMLElement | 개별 솔루션 | `data-testid="solution-slide-1"` |
| CTA link | HTMLAnchorElement | 솔루션 CTA | `Vertica 기술 블로그 보기` |

### 7. 정상 케이스

- 사용자가 솔루션 섹션에 도달하면 5개 솔루션이 모두 확인되어야 한다.
- 각 솔루션 CTA는 지정된 href를 가져야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 솔루션 개수 부족 | 콘텐츠 데이터 누락 | QA 실패 처리 | 없음 | 예 |
| CTA href 누락 | 콘텐츠 오류 | 링크 렌더링 전 QA 실패 처리 | 없음 | 예 |
| 모바일 텍스트 겹침 | CSS 반응형 오류 | QA 실패 처리 | 없음 | 예 |
| 외부 이미지 요청 | visual 경로 오류 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 모든 방문자가 솔루션을 읽을 수 있어야 한다.
- 외부 링크 이동은 브라우저 기본 정책을 따른다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| ACTIVE_01 | 첫 번째 솔루션 활성 | scroll progress 또는 모바일 위치 |
| ACTIVE_02 | 두 번째 솔루션 활성 | scroll progress 또는 모바일 위치 |
| ACTIVE_03 | 세 번째 솔루션 활성 | scroll progress 또는 모바일 위치 |
| ACTIVE_04 | 네 번째 솔루션 활성 | scroll progress 또는 모바일 위치 |
| ACTIVE_05 | 다섯 번째 솔루션 활성 | scroll progress 또는 모바일 위치 |

### 11. 수용 기준

- Given 사용자가 Solutions 섹션으로 이동했을 때
- When 페이지가 렌더링되면
- Then 5개 솔루션 title이 모두 DOM에 존재해야 한다.

- Given 모바일 viewport에서
- When 사용자가 솔루션을 순서대로 스크롤하면
- Then 각 솔루션 title과 CTA가 화면 안에서 읽혀야 한다.

### 12. 관련 데이터

- `solutionSlides`
- `solutionStackItems`
- 로컬 solution SVG asset

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- 데스크톱에서는 slide index가 현재 솔루션 상태와 일치해야 한다.
- 모바일에서는 카드 또는 일반 섹션 흐름으로 표시해야 한다.
- CTA는 클릭 가능한 anchor로 구현해야 한다.
- 텍스트 대비가 visual 위에서 읽을 수 있어야 한다.

### 15. 확인 필요 사항

- 최종 솔루션 copy 승인 필요
- CTA 링크 최종 승인 필요
- desktop pinned/hybrid scroll 정책 최종 확인 필요

## 기능 ID: COMP-001
## 기능명: 회사 소개 및 Capability Map

### 1. 기능 목적

- GTG의 핵심 역량을 회사 소개 문구와 capability map으로 구조화해서 전달해야 한다.
- 방문자가 데이터, 스트리밍, 자동화, DevOps 품질, 컨설팅/지원이 하나의 기술 제공 범위 안에 있음을 이해할 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모든 방문자, 잠재 고객, 영업/마케팅 담당자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- `companyContent`와 `capabilityMapContent`가 존재해야 한다.
- 데스크톱/모바일 capability map SVG가 로컬에 존재해야 한다.
- 미확인 회사 연혁, 수치, 인증을 포함하지 않아야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| headline | string | 필수 | 승인 또는 draft 상태 | `데이터 플랫폼과...` |
| description | string | 필수 | 미확인 claim 금지 | `GTG Solutions & Consult는...` |
| capabilities | string[] | 필수 | 빈 배열 불가 | `Bigdata Analytics / Vertica` |
| map visual | string | 필수 | 로컬 SVG | `/generated/topology/gtg-capability-map.svg` |

### 5. 처리 흐름

1. 시스템은 Company 섹션을 렌더링한다.
2. 시스템은 headline, description, capabilities 목록을 표시한다.
3. 시스템은 viewport에 따라 데스크톱 또는 모바일 capability map을 선택한다.
4. capability map은 로컬 SVG만 사용해야 한다.
5. capability map의 alt text가 제공되어야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| company section | HTMLElement | 회사 소개 영역 | `data-testid="company-section"` |
| capability list | HTMLElement | 역량 목록 | `Bigdata Analytics / Vertica` |
| capability map | HTMLImageElement | 반응형 역량 지도 | `gtg-capability-map.svg` |

### 7. 정상 케이스

- 데스크톱에서는 데스크톱 capability map이 표시되어야 한다.
- 모바일에서는 모바일 capability map이 표시되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| SVG asset 누락 | 파일 경로 오류 | alt text와 텍스트 콘텐츠는 유지 | 없음 | 예 |
| 미확인 수치 포함 | 콘텐츠 검수 실패 | 릴리스 차단 | 없음 | 예 |
| 모바일 map overflow | 반응형 오류 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 모든 방문자가 접근 가능해야 한다.
- 내부용 미승인 회사 정보를 표시하지 않아야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| DESKTOP_MAP | 데스크톱 map 사용 | 데스크톱 viewport |
| MOBILE_MAP | 모바일 map 사용 | 모바일 viewport |

### 11. 수용 기준

- Given 데스크톱 viewport에서
- When Company 섹션이 표시되면
- Then 데스크톱 capability map이 로드되어야 한다.

- Given 모바일 viewport에서
- When Company 섹션이 표시되면
- Then 모바일 capability map이 로드되고 수평 overflow가 없어야 한다.

### 12. 관련 데이터

- `companyContent`
- `capabilityMapContent`
- `/generated/topology/gtg-capability-map.svg`
- `/generated/topology/gtg-capability-map-mobile.svg`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- capability map은 이미지가 작아도 주요 텍스트와 alt text로 의미를 보완해야 한다.
- 회사 소개 headline은 모바일에서 3줄 이상이 되더라도 잘리지 않아야 한다.

### 15. 확인 필요 사항

- 공식 회사 소개 문구 최종 승인 필요
- capability map의 최종 시각 표현 승인 필요

## 기능 ID: ENG-001
## 기능명: Engagement Model

### 1. 기능 목적

- GTG의 수행 흐름을 4단계로 보여주어 잠재 고객이 상담과 실행 과정을 예측할 수 있어야 한다.
- 영업/마케팅 담당자가 일관된 상담 흐름을 설명할 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 방문자, 잠재 고객, 영업/마케팅 담당자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- `engagementContent.steps`가 4개 항목을 포함해야 한다.
- 각 step은 number, title, description을 가져야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| step number | string | 필수 | `01`부터 순서 유지 | `01` |
| step title | string | 필수 | 빈 문자열 불가 | `Diagnose` |
| description | string | 필수 | 미확인 약속/성과 금지 | `현재 환경...` |

### 5. 처리 흐름

1. 시스템은 Engagement 섹션을 렌더링한다.
2. 시스템은 headline과 4개 step을 순서대로 표시한다.
3. 각 step은 number, title, description을 포함해야 한다.
4. 모바일에서는 한 컬럼 흐름으로 읽을 수 있어야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| engagement section | HTMLElement | 수행 모델 섹션 | `data-testid="engagement-section"` |
| step item | HTMLElement | 단계 항목 | `Diagnose` |

### 7. 정상 케이스

- 사용자가 Engagement 섹션에 도달하면 Diagnose, Design, Implement, Operate가 순서대로 표시되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| step 개수 부족 | 콘텐츠 데이터 오류 | QA 실패 처리 | 없음 | 예 |
| 단계 순서 오류 | 데이터 정렬 오류 | QA 실패 처리 | 없음 | 예 |
| 과도한 claim 포함 | 콘텐츠 검수 실패 | 릴리스 차단 | 없음 | 예 |

### 9. 권한 규칙

- 모든 방문자가 접근 가능해야 한다.
- 내부 운영 절차나 비공개 정보를 포함하지 않아야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| READY | 4단계 표시 완료 | 섹션 렌더링 완료 |

### 11. 수용 기준

- Given 사용자가 Engagement 섹션으로 이동했을 때
- When 섹션이 렌더링되면
- Then Diagnose, Design, Implement, Operate가 모두 표시되어야 한다.

### 12. 관련 데이터

- `engagementContent`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- 단계 번호와 제목은 한눈에 구분되어야 한다.
- 모바일에서 각 step 간 간격이 충분해야 한다.

### 15. 확인 필요 사항

- 최종 수행 모델 문구 승인 필요
- 단계명 영문 유지 여부 확인 필요

## 기능 ID: CONTACT-001
## 기능명: 문의 섹션

### 1. 기능 목적

- 잠재 고객이 GTG와 연락할 수 있는 명확한 경로를 제공해야 한다.
- MVP에서는 별도 문의 폼 없이 이메일, 전화, 공식 문의 페이지 링크를 제공해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 잠재 고객, 일반 방문자
- 접근 권한: 공개 읽기 및 외부 링크 이동. 로그인은 필요하지 않다.

### 3. 선행 조건

- `contactContent`가 존재해야 한다.
- email, phone, primaryCta href가 비어 있지 않아야 한다.
- 연락처는 공개 전 최종 확인되어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| email | string | 필수 | 유효한 이메일 형식 | `webmaster@gtgsc.com` |
| phone | string | 필수 | 공개용 전화번호 형식 | `02-6293-7100` |
| phoneHref | string | 필수 | `tel:` 프로토콜 | `tel:02-6293-7100` |
| primaryCta.href | string | 필수 | 유효한 URL | `https://www.gtgsc.com/...` |
| emailCta.href | string | 필수 | `mailto:` 프로토콜 | `mailto:webmaster@gtgsc.com` |

### 5. 처리 흐름

1. 시스템은 Contact 섹션을 렌더링한다.
2. 시스템은 headline, description, email, phone, address, CTA를 표시한다.
3. 사용자가 공식 문의 CTA를 클릭하면 외부 문의 페이지로 이동한다.
4. 사용자가 이메일 CTA를 클릭하면 `mailto:` 링크를 실행한다.
5. 사용자가 전화번호를 클릭하면 `tel:` 링크를 실행한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| contact section | HTMLElement | 문의 영역 | `data-testid="contact-section"` |
| email link | HTMLAnchorElement | 이메일 문의 링크 | `mailto:webmaster@gtgsc.com` |
| phone link | HTMLAnchorElement | 전화 링크 | `tel:02-6293-7100` |
| inquiry link | HTMLAnchorElement | 공식 문의 페이지 | `https://www.gtgsc.com/...` |

### 7. 정상 케이스

- 사용자가 Contact 섹션에 도달하면 이메일, 전화, 공식 문의 링크가 모두 표시되어야 한다.
- 사용자가 Hero CTA를 클릭하면 Contact 섹션으로 이동해야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 이메일 누락 | 콘텐츠 데이터 오류 | QA 실패 처리 | 없음 | 예 |
| 전화 href 형식 오류 | 콘텐츠 데이터 오류 | QA 실패 처리 | 없음 | 예 |
| 공식 문의 URL 미확정 | 정책 미결정 | 확인 필요로 표시하고 공개 전 차단 | 없음 | 예 |

### 9. 권한 규칙

- 모든 방문자가 문의 링크를 볼 수 있어야 한다.
- 문의 폼 입력이나 개인정보 저장은 MVP에서 제공하지 않아야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| READY | 문의 링크 표시 완료 | Contact 렌더링 완료 |
| NEEDS_APPROVAL | 연락처 최종 승인 필요 | 공개 전 검수 단계 |

### 11. 수용 기준

- Given 사용자가 Contact 섹션에 도달했을 때
- When 이메일 링크를 확인하면
- Then `mailto:webmaster@gtgsc.com` 형식의 href가 있어야 한다.

- Given 사용자가 Hero CTA를 클릭했을 때
- When 이동이 완료되면
- Then Contact 섹션이 Header 아래에 보여야 한다.

### 12. 관련 데이터

- `contactContent`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| `mailto:webmaster@gtgsc.com` | external protocol | 없음 | 이메일 클라이언트 실행 |
| `tel:02-6293-7100` | external protocol | 없음 | 전화 앱 또는 브라우저 동작 |

### 14. UI 고려사항

- CTA는 anchor로 구현해야 한다.
- 모바일에서 전화번호 링크는 충분한 tap target을 가져야 한다.
- 연락처 텍스트는 줄바꿈되어도 컨테이너 밖으로 넘치지 않아야 한다.

### 15. 확인 필요 사항

- 최종 이메일, 전화번호, 주소 확인 필요
- 공식 문의 페이지 URL 최종 확인 필요

## 기능 ID: SEO-001
## 기능명: Draft SEO/robots

### 1. 기능 목적

- 콘텐츠와 브랜드 요소가 최종 승인되기 전 검색 엔진에 노출되지 않도록 해야 한다.
- draft 상태의 canonical, sitemap, OG image 정책을 통제해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 운영 담당자, 개발자, QA 담당자
- 접근 권한: 공개 읽기. 설정 변경은 저장소/배포 권한 필요

### 3. 선행 조건

- Next.js metadata, robots route, sitemap route가 존재해야 한다.
- 공개 상태가 draft여야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| release status | enum | 필수 | `draft` 또는 `public` | `draft` |
| robots request | HTTP GET | 선택 | `/robots.txt` | `/robots.txt` |
| sitemap request | HTTP GET | 선택 | `/sitemap.xml` | `/sitemap.xml` |

### 5. 처리 흐름

1. 시스템은 draft 상태에서 metadata robots 값을 `noindex,nofollow`로 설정한다.
2. 시스템은 canonical link를 출력하지 않아야 한다.
3. 시스템은 OG image를 출력하지 않아야 한다.
4. `/robots.txt`는 전체 disallow 정책을 반환해야 한다.
5. `/sitemap.xml`은 공개 canonical URL을 포함하지 않아야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| robots meta | HTMLMetaElement | 검색 인덱싱 제한 | `noindex,nofollow` |
| robots.txt | text | 크롤러 차단 | `Disallow: /` |
| sitemap.xml | xml | draft sitemap | 공개 URL 미포함 |

### 7. 정상 케이스

- draft 상태에서 홈페이지는 `noindex`와 `nofollow`를 가져야 한다.
- `/robots.txt`는 `Disallow: /`를 포함해야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| canonical 출력 | 설정 오류 | QA 실패 처리 | 없음 | 예 |
| OG image 출력 | 공개 정책 미승인 | QA 실패 처리 | 없음 | 예 |
| robots 허용 | route 설정 오류 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 일반 사용자는 설정을 변경할 수 없다.
- SEO 공개 전환은 운영/의사결정자 승인 후 저장소 변경으로 수행해야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| DRAFT_BLOCKED | 검색 노출 차단 | 기본 MVP 상태 |
| PUBLIC_INDEXABLE | 검색 노출 허용 | 최종 승인 후 전환 |

### 11. 수용 기준

- Given draft 상태에서
- When 사용자가 홈페이지를 열면
- Then robots meta에 `noindex`와 `nofollow`가 포함되어야 한다.

- Given draft 상태에서
- When `/robots.txt`를 요청하면
- Then `Disallow: /`가 포함되어야 한다.

### 12. 관련 데이터

- `seoContent`
- Next.js metadata
- `robots.ts`
- `sitemap.ts`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| `/robots.txt` | GET | 없음 | text robots policy |
| `/sitemap.xml` | GET | 없음 | XML sitemap |

### 14. UI 고려사항

- UI에 직접 표시되는 기능은 아니다.
- QA에서는 head metadata와 route response를 확인해야 한다.

### 15. 확인 필요 사항

- public release 전환 시점 확인 필요
- 최종 canonical URL 확인 필요
- OG image 승인 필요

## 기능 ID: ERR-001
## 기능명: 404 페이지

### 1. 기능 목적

- 사용자가 존재하지 않는 URL에 접근했을 때 복구 가능한 화면을 제공해야 한다.
- 잘못된 경로에서도 브랜드와 주요 내비게이션 접근을 유지해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모든 방문자
- 접근 권한: 공개 읽기. 로그인은 필요하지 않다.

### 3. 선행 조건

- Next.js `not-found` 페이지가 존재해야 한다.
- 홈과 주요 섹션 링크가 유효해야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| invalid path | string | 필수 | 존재하지 않는 route | `/missing-route` |

### 5. 처리 흐름

1. 사용자가 존재하지 않는 route에 접근한다.
2. Next.js는 Not Found 페이지를 렌더링한다.
3. 시스템은 홈 또는 주요 섹션으로 돌아가는 링크를 제공한다.
4. Header와 main landmark 구조가 유지되어야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| not found page | HTMLElement | 오류 안내 화면 | `data-testid="not-found-page"` |
| recovery link | HTMLAnchorElement | 홈 또는 섹션 이동 링크 | `/#top` |

### 7. 정상 케이스

- 존재하지 않는 경로에 접속하면 Not Found 안내와 홈 이동 링크가 표시되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 복구 링크 없음 | 구현 누락 | QA 실패 처리 | 없음 | 예 |
| main landmark 누락 | 접근성 구현 누락 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 모든 방문자가 접근 가능해야 한다.
- 로그인 또는 관리자 권한을 요구하지 않아야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| NOT_FOUND | route 없음 | 존재하지 않는 URL 접근 |

### 11. 수용 기준

- Given 사용자가 `/missing-release-candidate-route`에 접속했을 때
- When Not Found 페이지가 렌더링되면
- Then 홈으로 돌아가는 링크와 주요 내비게이션 링크가 제공되어야 한다.

### 12. 관련 데이터

- navigation labels
- brand content

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- 오류 메시지는 짧고 복구 행동이 명확해야 한다.
- 홈 이동 링크는 keyboard focus가 가능해야 한다.

### 15. 확인 필요 사항

- 최종 404 문구 승인 필요

## 기능 ID: ASSET-001
## 기능명: 로컬 자산 사용

### 1. 기능 목적

- 외부 이미지 hotlink, 저작권, 네트워크 안정성 리스크를 줄여야 한다.
- MVP는 로컬 또는 생성 자산만 사용해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 모든 방문자, 개발자, QA 담당자
- 접근 권한: 공개 읽기. 자산 변경은 저장소 권한 필요

### 3. 선행 조건

- 필요한 이미지와 SVG가 `public` 하위 로컬 경로에 있어야 한다.
- 외부 URL을 image src로 사용하지 않아야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| image src | string | 필수 | 로컬 absolute path 또는 data/blob | `/generated/solution-data-analytics.svg` |
| asset alt | string | 필수 | 의미 있는 대체 텍스트 | `GTG capability map...` |

### 5. 처리 흐름

1. 개발자는 image src를 로컬 public asset 경로로 지정한다.
2. 시스템은 페이지 렌더링 중 로컬 asset을 요청한다.
3. QA는 Playwright network listener로 외부 image request가 없는지 검증한다.
4. 외부 image request가 발견되면 릴리스 후보에서 제외한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| local image request | HTTP request | 로컬 이미지 요청 | `http://127.0.0.1/.../generated/...` |
| rendered visual | HTMLImageElement/SVG | 화면 visual | capability map |

### 7. 정상 케이스

- 모든 이미지 요청은 localhost, data, blob 또는 로컬 정적 자산이어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 외부 이미지 요청 발생 | hotlink 또는 외부 CDN src | QA 실패 처리 | 없음 | 예 |
| 이미지 누락 | asset 파일 없음 | 대체 텍스트와 레이아웃 유지, QA 실패 | 없음 | 예 |
| alt 누락 | 접근성 누락 | QA 실패 처리 | 없음 | 예 |

### 9. 권한 규칙

- 자산 추가/수정은 저장소 권한이 있는 개발자만 수행해야 한다.
- 사용자 업로드 자산은 MVP에서 제공하지 않는다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| LOCAL_ONLY | 로컬 자산만 사용 | 정상 상태 |
| EXTERNAL_DETECTED | 외부 이미지 요청 감지 | QA 검증 실패 |

### 11. 수용 기준

- Given Playwright가 페이지의 image request를 감시할 때
- When 사용자가 홈페이지를 로드하면
- Then 외부 도메인의 image request가 0건이어야 한다.

### 12. 관련 데이터

- `/public/brand`
- `/public/generated`
- `/public/item-logo`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- 이미지 로드 실패 시 텍스트 콘텐츠가 읽을 수 없어지면 안 된다.
- SVG는 텍스트와 대체 설명을 포함해야 한다.

### 15. 확인 필요 사항

- 생성 이미지의 공개 사용 승인 필요
- 로고 사용 권한 최종 확인 필요

## 기능 ID: CONTENT-001
## 기능명: Claim-safe 콘텐츠

### 1. 기능 목적

- 확인되지 않은 GTG 고객사, 성과 수치, 파트너 등급, 인증, 연혁이 공개 화면에 노출되지 않도록 해야 한다.
- OVA 레퍼런스의 자산, copy, 정확한 구성 복제를 방지해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 콘텐츠/브랜드 검수 담당자, 개발자, QA 담당자
- 접근 권한: 검수는 문서/화면 읽기, 변경은 저장소 권한 필요

### 3. 선행 조건

- 콘텐츠 문서와 PRD가 최신 상태여야 한다.
- 공개 승인 여부가 불명확한 정보는 UI에 단정적으로 표시하지 않아야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| copy text | string | 필수 | 미확인 claim 금지 | `Data & Analytics` |
| customer proof | object | 선택 | 공개 승인 여부 필요 | `publicDisplayApproved` |
| visual asset | file | 선택 | OVA 자산 복사 금지 | generated SVG |

### 5. 처리 흐름

1. 콘텐츠 작성자는 승인된 문구 또는 확인 필요 문구만 데이터에 반영한다.
2. 개발자는 미확인 성과 수치, 인증, 파트너 등급, 연혁을 UI에 추가하지 않는다.
3. 고객명/고객 로고는 공개 승인 상태를 확인한 뒤 사용해야 한다.
4. QA 또는 검수 담당자는 금지 claim과 OVA 복제 요소를 검토한다.
5. 문제가 발견되면 릴리스 후보에서 제외하고 수정해야 한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| claim-safe UI | 화면 콘텐츠 | 미승인 claim 없는 화면 | 서비스 소개 |
| review finding | 문서/이슈 | 검수 지적사항 | 고객 로고 승인 필요 |

### 7. 정상 케이스

- UI에 미확인 수치, 인증, 파트너 등급, 고객 성과 claim이 없어야 한다.
- OVA 자산, 문구, 로고, 정확한 배치/타이밍/색상 구성을 복제하지 않아야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 미확인 성과 수치 표시 | 콘텐츠 검수 누락 | 릴리스 차단 | 없음 | 예, 검수 기록 |
| OVA 이미지 사용 | 자산 정책 위반 | 즉시 제거 | 없음 | 예 |
| 고객 로고 승인 불명확 | 서면 승인 없음 | 제한 표시 또는 미표시 | 없음 | 예 |

### 9. 권한 규칙

- 일반 방문자는 콘텐츠를 읽기만 한다.
- 콘텐츠 수정은 저장소 권한이 있는 담당자만 수행한다.
- 공개 승인 권한은 운영/브랜드 검수 프로세스에서 결정해야 한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| DRAFT_COPY | 초안 문구 | 최종 승인 전 |
| APPROVED_COPY | 승인 문구 | 검수 승인 후 |
| NEEDS_REVIEW | 검토 필요 | 출처 또는 승인 상태 불명확 |
| BLOCKED | 공개 불가 | 금지 claim 또는 복제 요소 발견 |

### 11. 수용 기준

- Given 콘텐츠 검수 담당자가 페이지 본문을 확인할 때
- When 금지 claim 목록을 기준으로 검색하면
- Then 미확인 성과 수치, 인증, 파트너 등급, 연혁 문구가 없어야 한다.

- Given OVA 레퍼런스 사용 제약이 있을 때
- When Hero와 솔루션 visual을 검수하면
- Then OVA 자산, 문구, 로고를 복사한 요소가 없어야 한다.

### 12. 관련 데이터

- `docs/content-requirements.md`
- `docs/approved-content.md`
- `siteContent.isApproved`
- `customerProofItems.publicDisplayApproved`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- UI에는 `[TBD]`가 노출되지 않아야 한다.
- 확인 필요 항목은 공개 UI가 아니라 문서와 내부 검수 목록에서 관리해야 한다.

### 15. 확인 필요 사항

- 고객 로고/고객명 공개 승인 범위 확인 필요
- 공식 브랜드 색상과 copy 승인 필요

## 기능 ID: QA-001
## 기능명: 검증 자동화

### 1. 기능 목적

- 개발 완료 여부를 주관적 판단이 아니라 lint, build, Playwright 결과로 확인해야 한다.
- WebGL, fallback, 모바일, reduced-motion, 접근성, overflow, 외부 이미지 요청을 반복 검증할 수 있어야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 개발자, QA 담당자
- 접근 권한: 로컬 개발 환경 및 저장소 실행 권한 필요

### 3. 선행 조건

- 의존성이 설치되어 있어야 한다.
- 로컬 또는 테스트 서버가 실행 가능해야 한다.
- Playwright 브라우저가 설치되어 있어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| lint command | command | 필수 | package script 사용 | `pnpm run lint` |
| build command | command | 필수 | package script 사용 | `pnpm run build` |
| e2e command | command | 필수 | package script 사용 | `pnpm run test:e2e` |
| viewport | object | 선택 | 테스트 기준 viewport | `{ width: 390, height: 844 }` |

### 5. 처리 흐름

1. 개발자는 변경 후 lint를 실행한다.
2. 개발자는 production build를 실행한다.
3. QA 또는 개발자는 Playwright verification을 실행한다.
4. Playwright는 데스크톱, 모바일, fallback, reduced-motion, 404, SEO, 외부 이미지 요청을 검증한다.
5. 실패가 있으면 원인을 수정하고 동일 검증을 다시 실행한다.
6. 모든 Must 검증이 통과해야 MVP 완료로 판단한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| lint result | process result | lint 통과/실패 | exit code 0 |
| build result | process result | build 통과/실패 | exit code 0 |
| Playwright result | test result | E2E 통과/실패 | 13 passed |
| screenshot artifact | file | 시각 QA 산출물 | `tests/artifacts/...png` |

### 7. 정상 케이스

- lint, build, Playwright가 모두 exit code 0으로 완료되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| lint 실패 | 코드 스타일/정적 오류 | 릴리스 차단 | 터미널 오류 출력 | 예 |
| build 실패 | 타입/빌드 오류 | 릴리스 차단 | 터미널 오류 출력 | 예 |
| Playwright 실패 | 기능/레이아웃 오류 | 릴리스 차단 | 테스트 실패 출력 | 예 |
| 브라우저 미설치 | 환경 구성 누락 | 테스트 실행 실패 | 설치 필요 메시지 | 예 |

### 9. 권한 규칙

- 테스트 실행은 개발/QA 권한을 가진 사용자가 수행한다.
- 일반 방문자는 검증 기능에 접근하지 않는다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| NOT_RUN | 검증 미실행 | 변경 직후 |
| RUNNING | 검증 실행 중 | command 실행 |
| PASSED | 검증 통과 | 모든 필수 검사 exit code 0 |
| FAILED | 검증 실패 | 하나 이상 실패 |

### 11. 수용 기준

- Given 개발자가 MVP 변경을 완료했을 때
- When `pnpm run lint`, `pnpm run build`, `pnpm run test:e2e`를 실행하면
- Then 모든 명령이 성공해야 한다.

- Given Playwright가 모바일 viewport를 테스트할 때
- When 홈페이지를 로드하면
- Then horizontal overflow가 없어야 한다.

### 12. 관련 데이터

- `package.json` scripts
- `tests/e2e/home.spec.ts`
- `playwright.config.ts`
- `tests/artifacts`

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- QA 산출물 screenshot은 시각 검수에 사용할 수 있어야 한다.
- 테스트용 query가 사용자-facing UI에 노출되지 않아야 한다.

### 15. 확인 필요 사항

- 최종 필수 브라우저 범위 확인 필요
- Core Web Vitals 측정 도입 여부 확인 필요

## 기능 ID: FUT-001
## 기능명: 최종 SEO 공개 설정

### 1. 기능 목적

- 콘텐츠와 정책 승인이 완료되면 검색 엔진에 공개 가능한 metadata로 전환할 수 있어야 한다.
- canonical, sitemap, OG image를 공개 사이트 기준으로 설정해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 운영 담당자, 개발자
- 접근 권한: 저장소/배포 권한 필요

### 3. 선행 조건

- 최종 headline, description, canonical URL, OG image가 승인되어야 한다.
- draft 인덱싱 차단 해제 승인이 있어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| canonical URL | string | 필수 | 공개 도메인 URL | `https://www.gtgsc.com/` |
| OG image | string | 필수 | 승인된 1200x630 이미지 | `/og-image.png` |
| robots policy | string | 필수 | index 허용 정책 | `index,follow` |

### 5. 처리 흐름

1. 운영 담당자가 public release 전환을 승인한다.
2. 개발자는 metadata에서 `noindex,nofollow`를 제거하거나 공개 정책으로 변경한다.
3. 개발자는 canonical link를 추가한다.
4. 개발자는 OG image metadata를 추가한다.
5. 개발자는 sitemap에 공개 URL을 포함한다.
6. QA는 SEO 관련 테스트를 업데이트하고 검증한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| canonical link | HTMLLinkElement | 공개 canonical | `https://www.gtgsc.com/` |
| OG metadata | HTMLMetaElement | 소셜 공유 메타 | `og:image` |
| sitemap | XML | 공개 URL 포함 sitemap | `<loc>https://...</loc>` |

### 7. 정상 케이스

- 공개 승인 후 검색 엔진이 페이지를 색인할 수 있는 metadata가 제공되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 승인 전 index 허용 | 운영 정책 위반 | 릴리스 차단 | 없음 | 예 |
| OG image 미승인 | 자산 승인 누락 | 공개 전환 차단 | 없음 | 예 |
| canonical URL 오류 | 도메인 미확정 | 공개 전환 차단 | 없음 | 예 |

### 9. 권한 규칙

- 일반 방문자는 SEO 설정을 변경할 수 없다.
- 운영 승인과 저장소 변경 권한이 모두 필요하다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| DRAFT_BLOCKED | 인덱싱 차단 | 기본 상태 |
| SEO_APPROVED | SEO 공개 승인 완료 | 운영 승인 |
| PUBLIC_INDEXABLE | 공개 인덱싱 허용 | 배포 완료 |

### 11. 수용 기준

- Given 공개 승인이 완료되었을 때
- When 홈페이지 head metadata를 확인하면
- Then canonical, OG image, index 허용 정책이 반영되어야 한다.

### 12. 관련 데이터

- `seoContent`
- approved OG image
- deployment domain

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| `/sitemap.xml` | GET | 없음 | 공개 URL 포함 sitemap |

### 14. UI 고려사항

- 화면 UI 변경은 없다.
- 소셜 공유 preview에서 브랜드와 설명이 정확히 표시되어야 한다.

### 15. 확인 필요 사항

- canonical URL 확인 필요
- OG image 제작/승인 필요
- 공개 인덱싱 허용일 확인 필요

## 기능 ID: FUT-002
## 기능명: CMS 연동

### 1. 기능 목적

- 운영 단계에서 개발 배포 없이 콘텐츠를 관리할 수 있는 구조를 마련할 수 있어야 한다.
- MVP에서는 구현하지 않지만 콘텐츠 구조는 향후 CMS 전환을 막지 않아야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 운영/마케팅 담당자, 개발자
- 접근 권한: CMS 권한 체계 확인 필요

### 3. 선행 조건

- CMS 도입 여부가 결정되어야 한다.
- 콘텐츠 승인 workflow가 정의되어야 한다.
- API 또는 build-time fetch 방식이 결정되어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| CMS provider | string | 필수 | 확인 필요 | `확인 필요` |
| content schema | object | 필수 | service, solution, contact 포함 | `확인 필요` |
| approval status | enum | 필수 | draft/approved 필요 | `approved` |

### 5. 처리 흐름

1. 운영팀은 CMS 도입 여부를 결정한다.
2. PM과 개발자는 콘텐츠 schema를 정의한다.
3. 개발자는 현재 코드 기반 content 구조를 CMS source로 대체한다.
4. 시스템은 build-time 또는 runtime 방식으로 콘텐츠를 가져온다.
5. 승인되지 않은 콘텐츠는 public page에 노출하지 않는다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| CMS content | object | 승인된 콘텐츠 | solution copy |
| rendered page | HTML | CMS 기반 렌더링 결과 | 홈페이지 |

### 7. 정상 케이스

- 승인된 CMS 콘텐츠가 페이지에 반영되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| CMS 장애 | 외부 시스템 오류 | 확인 필요 | 확인 필요 | 예 |
| 미승인 콘텐츠 | workflow 오류 | 공개 UI에 노출하지 않음 | 없음 | 예 |
| schema 불일치 | CMS 데이터 오류 | build 또는 검증 실패 | 없음 | 예 |

### 9. 권한 규칙

- CMS 편집 권한, 승인 권한, 게시 권한을 분리해야 한다.
- 권한 수준은 확인 필요이다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| NOT_PLANNED | MVP 미포함 | 현재 상태 |
| DESIGN_REQUIRED | 설계 필요 | CMS 도입 승인 |
| IMPLEMENTED | 구현 완료 | 개발/QA 완료 |

### 11. 수용 기준

- Given CMS 도입이 승인되었을 때
- When 승인된 solution copy가 CMS에서 변경되면
- Then 정의된 반영 방식에 따라 홈페이지에 변경사항이 표시되어야 한다.

### 12. 관련 데이터

- 현행 `src/content/site.ts`
- CMS content schema 확인 필요

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 확인 필요 | 확인 필요 | 확인 필요 | 확인 필요 |

### 14. UI 고려사항

- CMS 오류로 사용자 화면이 빈 화면이 되면 안 된다.
- 승인되지 않은 콘텐츠가 UI에 노출되면 안 된다.

### 15. 확인 필요 사항

- CMS 제품 선정 필요
- 승인 workflow 필요
- build-time/runtime 반영 방식 확인 필요

## 기능 ID: FUT-003
## 기능명: 문의 폼 backend

### 1. 기능 목적

- 향후 사용자가 홈페이지 안에서 문의를 제출할 수 있게 할 수 있어야 한다.
- MVP에서는 개인정보 처리, 스팸 방지, 저장 정책이 확정되지 않았으므로 구현하지 않는다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 잠재 고객, 운영 담당자
- 접근 권한: 공개 제출, 운영자 조회 권한 확인 필요

### 3. 선행 조건

- 개인정보 처리방침이 확정되어야 한다.
- 문의 수신 담당과 보관 기간이 결정되어야 한다.
- backend, database, email routing, spam protection 방식이 결정되어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| name | string | 확인 필요 | 개인정보 처리 기준 필요 | `홍길동` |
| email | string | 확인 필요 | 유효한 이메일 | `user@example.com` |
| company | string | 확인 필요 | 선택 여부 확인 필요 | `Example Co.` |
| message | string | 확인 필요 | 최대 길이 확인 필요 | `상담 요청...` |
| consent | boolean | 필수 | 개인정보 동의 필요 | `true` |

### 5. 처리 흐름

1. 사용자가 문의 폼을 입력한다.
2. 시스템은 필수값과 형식을 검증한다.
3. 시스템은 개인정보 수집 동의 여부를 확인한다.
4. 서버는 문의 내용을 저장하거나 이메일로 전송한다.
5. 시스템은 사용자에게 접수 결과를 표시한다.
6. 운영 담당자는 정의된 방식으로 문의를 확인한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| submission result | object | 접수 성공/실패 | `{ status: "received" }` |
| user message | string | 화면 안내 | `문의가 접수되었습니다.` |
| inquiry record | object | 저장 데이터 | 확인 필요 |

### 7. 정상 케이스

- 개인정보 동의와 필수값이 있는 문의는 접수되어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 필수값 누락 | 사용자 입력 오류 | 제출 차단 | 필수 항목을 입력하라는 메시지 | 예 |
| 이메일 형식 오류 | 사용자 입력 오류 | 제출 차단 | 이메일 형식을 확인하라는 메시지 | 예 |
| 개인정보 동의 없음 | 정책 요건 미충족 | 제출 차단 | 동의가 필요하다는 메시지 | 예 |
| 서버 오류 | backend 장애 | 재시도 안내 | 문의 접수 실패 메시지 | 예 |

### 9. 권한 규칙

- 일반 방문자는 문의 제출만 가능해야 한다.
- 문의 조회/처리는 운영자 권한이 필요해야 한다.
- 권한 체계는 확인 필요이다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| DRAFT | 작성 중 | 입력 시작 |
| VALIDATING | 검증 중 | 제출 클릭 |
| SUBMITTED | 접수 완료 | 서버 성공 |
| FAILED | 접수 실패 | 서버 또는 검증 실패 |

### 11. 수용 기준

- Given 문의 폼 기능이 승인된 상태에서
- When 사용자가 필수값과 개인정보 동의를 입력하고 제출하면
- Then 문의가 접수되고 성공 메시지가 표시되어야 한다.

### 12. 관련 데이터

- 문의 record 확인 필요
- 개인정보 보관 정책 확인 필요

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 확인 필요 | POST | 문의 입력값 | 접수 결과 |

### 14. UI 고려사항

- 입력창, 필수 표시, 개인정보 동의 checkbox, 제출 버튼, 로딩 상태, 성공/실패 메시지가 필요하다.
- 오류 메시지는 각 입력 항목 가까이에 표시해야 한다.

### 15. 확인 필요 사항

- 개인정보 처리방침 확인 필요
- backend와 DB 도입 여부 확인 필요
- 스팸 방지 방식 확인 필요
- 문의 수신 담당 확인 필요

## 기능 ID: EXCL-001
## 기능명: 로그인/관리자/DB 제외

### 1. 기능 목적

- MVP 범위를 공식 홈페이지 인터랙션 프로토타입으로 제한해야 한다.
- 로그인, 관리자 콘솔, DB 도입으로 인한 범위 확대와 보안 리스크를 피해야 한다.

### 2. 사용 대상

- 사용할 수 있는 사용자 역할: 해당 없음
- 접근 권한: 해당 기능을 제공하지 않는다.

### 3. 선행 조건

- MVP에서는 사용자 계정, 세션, DB 저장 요구가 없어야 한다.

### 4. 입력값

| 입력 항목 | 타입 | 필수 여부 | 제약 조건 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 5. 처리 흐름

1. 개발자는 로그인, 회원가입, 관리자 콘솔 route를 만들지 않는다.
2. 개발자는 사용자 입력 데이터를 저장하는 DB를 추가하지 않는다.
3. 콘텐츠 변경은 저장소와 배포 프로세스로 관리한다.
4. 향후 필요 시 별도 요구사항과 보안 검토를 거쳐 신규 범위로 정의한다.

### 6. 출력값

| 출력 항목 | 타입 | 설명 | 예시 |
|---|---|---|---|
| 없음 | 없음 | 기능 제외 | 없음 |

### 7. 정상 케이스

- MVP 앱에는 로그인 화면, 관리자 화면, DB 연결 코드가 없어야 한다.

### 8. 예외 케이스

| 예외 상황 | 원인 | 시스템 동작 | 사용자 메시지 | 로그 필요 여부 |
|---|---|---|---|---|
| 로그인 route 추가 | 범위 위반 | PR/릴리스 차단 | 없음 | 예 |
| DB 의존성 추가 | 범위 위반 | PR/릴리스 차단 | 없음 | 예 |
| 관리자 콘솔 추가 | 범위 위반 | PR/릴리스 차단 | 없음 | 예 |

### 9. 권한 규칙

- 제품 내 권한 체계를 제공하지 않는다.
- 저장소/배포 권한은 제품 외부 운영 정책에서 관리한다.

### 10. 상태값

| 상태값 | 설명 | 전환 조건 |
|---|---|---|
| OUT_OF_SCOPE | MVP 제외 | 기본 상태 |
| REQUIRES_NEW_PRD | 신규 요구사항 필요 | 향후 도입 요청 발생 |

### 11. 수용 기준

- Given MVP 범위에서
- When route와 dependency를 검토하면
- Then 로그인, 관리자 콘솔, DB 기능이 없어야 한다.

### 12. 관련 데이터

- 없음

### 13. 관련 API

| Endpoint | Method | Request | Response |
|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 |

### 14. UI 고려사항

- 로그인 버튼, 관리자 메뉴, 회원가입 링크를 표시하지 않아야 한다.

### 15. 확인 필요 사항

- 향후 관리자 기능이 필요할 경우 별도 PRD 작성 필요

## 4. 기능 간 의존성

| 선행 기능 | 후행 기능 | 의존 이유 |
|---|---|---|
| PAGE-001 | NAV-001 | 내비게이션은 대상 섹션이 페이지에 존재해야 동작한다. |
| PAGE-001 | HERO-001 | WebGL Hero는 홈페이지 route 내부에서 렌더링된다. |
| PAGE-001 | HERO-002 | fallback Hero는 홈페이지 route 내부에서 렌더링된다. |
| HERO-002 | HERO-001 | WebGL 실패 시 fallback으로 전환해야 한다. |
| HERO-003 | HERO-001 | WebGL Hero가 활성화되어도 semantic 콘텐츠가 별도로 필요하다. |
| HERO-003 | HERO-002 | fallback에서도 동일 서비스 목록을 사용해야 한다. |
| ASSET-001 | HERO-001 | Hero visual은 로컬 자산만 사용해야 한다. |
| ASSET-001 | HERO-002 | fallback visual은 로컬 자산만 사용해야 한다. |
| ASSET-001 | SOL-001 | 솔루션 visual은 로컬 자산만 사용해야 한다. |
| ASSET-001 | COMP-001 | capability map은 로컬 SVG를 사용해야 한다. |
| CONTENT-001 | HERO-003 | Hero 서비스 문구는 claim-safe 기준을 따라야 한다. |
| CONTENT-001 | SOL-001 | 솔루션 copy와 CTA는 승인/검수 기준을 따라야 한다. |
| CONTENT-001 | COMP-001 | 회사 소개 문구는 미확인 연혁/수치를 포함하지 않아야 한다. |
| CONTACT-001 | NAV-001 | Contact 내비게이션과 Hero CTA가 문의 섹션으로 연결되어야 한다. |
| SEO-001 | PAGE-001 | draft metadata는 홈페이지 렌더링과 함께 적용되어야 한다. |
| ERR-001 | NAV-001 | 404 페이지의 복구 링크는 주요 내비게이션 구조와 일관되어야 한다. |
| QA-001 | 전체 Must 기능 | MVP 완료 여부는 자동화 검증 결과에 의존한다. |
| FUT-001 | CONTENT-001 | 공개 SEO 전환은 콘텐츠 승인이 완료되어야 가능하다. |
| FUT-002 | CONTENT-001 | CMS 연동은 콘텐츠 승인 workflow 정의가 필요하다. |
| FUT-003 | EXCL-001 | 문의 폼 도입 시 현재 제외된 backend/DB 범위를 새로 정의해야 한다. |

## 5. MVP 필수 기능

### 반드시 먼저 구현해야 할 기능 목록

| 순서 | 기능 ID | 기능명 | 이유 |
|---|---|---|---|
| 1 | PAGE-001 | 단일 페이지 홈페이지 | 모든 화면 기능의 기반이다. |
| 2 | CONTENT-001 | Claim-safe 콘텐츠 | 공개 리스크를 먼저 통제해야 한다. |
| 3 | ASSET-001 | 로컬 자산 사용 | 이미지/저작권/네트워크 정책을 먼저 고정해야 한다. |
| 4 | NAV-001 | 상단 내비게이션 | 주요 섹션 접근의 기본 경로이다. |
| 5 | NAV-002 | 모바일 메뉴 | 모바일 탐색성을 보장해야 한다. |
| 6 | HERO-003 | Hero semantic 콘텐츠 | WebGL 구현 전에도 핵심 콘텐츠 접근성을 보장해야 한다. |
| 7 | HERO-002 | Hero fallback | WebGL 실패, 모바일, reduced-motion 경로를 먼저 확보해야 한다. |
| 8 | HERO-001 | WebGL Hero | 데스크톱 핵심 인터랙션이다. |
| 9 | SOL-001 | 솔루션 섹션 | GTG 서비스 이해의 핵심 본문이다. |
| 10 | COMP-001 | 회사 소개 및 Capability Map | 회사와 역량 관계를 설명해야 한다. |
| 11 | ENG-001 | Engagement Model | 수행 흐름을 설명해야 한다. |
| 12 | CONTACT-001 | 문의 섹션 | 문의 전환 경로를 제공해야 한다. |
| 13 | SEO-001 | Draft SEO/robots | 공개 전 검색 노출을 차단해야 한다. |
| 14 | ERR-001 | 404 페이지 | 잘못된 경로에서 복구 가능해야 한다. |
| 15 | QA-001 | 검증 자동화 | MVP 완료 판정 기준이다. |

### 후순위로 미룰 수 있는 기능 목록

| 기능 ID | 기능명 | 후순위 사유 |
|---|---|---|
| FUT-001 | 최종 SEO 공개 설정 | 콘텐츠, OG 이미지, canonical URL 승인 후 가능하다. |
| FUT-002 | CMS 연동 | MVP에서는 코드 기반 콘텐츠 관리로 충분하다. |
| FUT-003 | 문의 폼 backend | 개인정보, 스팸 방지, 저장 정책 확인 전 구현하면 안 된다. |
| EXCL-001 | 로그인/관리자/DB | 이번 버전에서는 기능 자체가 제외된다. |
