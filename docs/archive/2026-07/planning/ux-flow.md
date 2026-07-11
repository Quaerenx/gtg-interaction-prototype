# 화면 설계서 / UX Flow

문서 작성일: 2026-07-09  
프로젝트명: GTG Solutions & Consult 인터랙션 프로토타입  
기준 버전: MVP v0.1 Draft

## 1. 문서 개요

### 문서 목적

이 문서는 GTG Solutions & Consult 공식 홈페이지 MVP에서 사용자가 어떤 화면에 진입하고, 어떤 행동을 하며, 시스템이 어떤 상태와 반응을 보여줘야 하는지 정의한다.  
개발자는 이 문서를 기준으로 화면 컴포넌트를 구현하고, 디자이너는 이 문서를 기준으로 와이어프레임과 반응형 레이아웃을 설계하며, QA 담당자는 화면 상태별 테스트 케이스를 만들 수 있어야 한다.

### 대상 독자

| 대상 독자 | 활용 목적 |
|---|---|
| UX/UI 기획자 | 화면 구조, 사용자 흐름, 상태별 UI 정의 |
| 디자이너 | 와이어프레임, 반응형 화면, 상태 화면 제작 |
| 프론트엔드 개발자 | 컴포넌트, 내비게이션, 인터랙션, fallback 구현 |
| QA 담당자 | 화면별 정상/예외 상태 및 수용 기준 검증 |
| 콘텐츠/브랜드 검수 담당자 | 화면에 노출되는 copy, 고객/claim, CTA 검수 |
| 운영 담당자 | 공개 상태, 문의 경로, SEO 정책 확인 |

### 기준 버전

| 항목 | 내용 |
|---|---|
| 제품 버전 | MVP v0.1 Draft |
| 제품 형태 | 단일 페이지 공식 홈페이지 MVP |
| 인증 방식 | 로그인/회원가입/관리자 콘솔 없음 |
| 화면 범위 | Home 단일 페이지, 모바일 메뉴 overlay, Not Found 페이지 |
| Backend/API | MVP 화면 기능용 backend API 없음 |

### 관련 문서

| 문서 | 경로 |
|---|---|
| 프로젝트 기본 정보 | `docs/project-basic-info.md` |
| 요구사항 정의서 / PRD | `docs/prd.md` |
| 기능 명세서 | `docs/functional-spec.md` |
| 프로젝트 정의서 | `docs/project-definition.md` |
| 콘텐츠 요구사항 | `docs/content-requirements.md` |
| 구현 결정사항 | `docs/implementation-decisions.md` |

## 2. 전체 화면 목록

| 화면 ID | 화면명 | URL/Route | 사용자 | 목적 | 우선순위 | 관련 기능 |
|---|---|---|---|---|---|---|
| SCR-HOME-001 | 홈페이지 Shell | `/` | 게스트, 일반 사용자, 관리자 역할 | 전체 단일 페이지 구조와 주요 섹션을 제공 | Must | PAGE-001, NAV-001 |
| SCR-NAV-001 | 상단 내비게이션 | `/` 전체 공통 | 게스트, 일반 사용자, 관리자 역할 | 주요 섹션 이동과 브랜드 홈 접근 제공 | Must | NAV-001 |
| SCR-NAV-002 | 모바일 메뉴 Overlay | `/` 전체 공통 | 모바일 게스트, 모바일 일반 사용자 | 작은 화면에서 주요 섹션 이동 제공 | Must | NAV-002 |
| SCR-HERO-001 | Hero 화면 | `/#top` | 게스트, 일반 사용자, 잠재 고객 | GTG 브랜드, 핵심 메시지, WebGL/fallback 첫 경험 제공 | Must | HERO-001, HERO-002, HERO-003 |
| SCR-SOL-001 | Solutions 화면 | `/#solutions` | 게스트, 일반 사용자, 잠재 고객 | 5개 솔루션과 CTA 제공 | Must | SOL-001, ASSET-001, CONTENT-001 |
| SCR-COMP-001 | Company / Capability Map 화면 | `/#company` | 게스트, 일반 사용자, 잠재 고객, 관리자 역할 | GTG 소개와 역량 지도를 제공 | Must | COMP-001, ASSET-001, CONTENT-001 |
| SCR-ENG-001 | Engagement Model 화면 | `/#engagement` | 게스트, 일반 사용자, 잠재 고객 | 수행 흐름 4단계 제공 | Must | ENG-001, CONTENT-001 |
| SCR-CONTACT-001 | Contact 화면 | `/#contact` | 게스트, 일반 사용자, 잠재 고객 | 문의 CTA, 이메일, 전화, 공식 문의 링크 제공 | Must | CONTACT-001 |
| SCR-ERR-001 | Not Found 화면 | 존재하지 않는 route | 게스트, 일반 사용자, 관리자 역할 | 잘못된 URL에서 홈/주요 섹션으로 복구 | Must | ERR-001, NAV-001 |
| SCR-SEO-001 | Draft SEO Route | `/robots.txt`, `/sitemap.xml` | 운영 담당자, 검색 엔진, QA | draft 인덱싱 차단 상태 확인 | Must | SEO-001 |

## 3. 사용자 역할별 접근 가능 화면

MVP에는 제품 내 로그인, 관리자 계정, 권한 시스템이 없다. 아래 표의 “관리자”는 콘텐츠/브랜드/운영 검수 역할을 의미하며, 제품 UI 안에서 별도 관리자 권한을 갖지 않는다.

| 화면명 | 관리자 | 일반 사용자 | 게스트 | 비고 |
|---|---|---|---|---|
| 홈페이지 Shell | 가능 | 가능 | 가능 | 모두 공개 읽기 |
| 상단 내비게이션 | 가능 | 가능 | 가능 | 모두 공개 읽기 |
| 모바일 메뉴 Overlay | 가능 | 가능 | 가능 | 모바일 viewport 중심 |
| Hero 화면 | 가능 | 가능 | 가능 | WebGL/fallback 조건별 표시 |
| Solutions 화면 | 가능 | 가능 | 가능 | CTA 외부 링크 이동 가능 |
| Company / Capability Map 화면 | 가능 | 가능 | 가능 | 미승인 회사 정보 노출 금지 |
| Engagement Model 화면 | 가능 | 가능 | 가능 | 공개용 수행 흐름만 표시 |
| Contact 화면 | 가능 | 가능 | 가능 | 개인정보 입력 없음 |
| Not Found 화면 | 가능 | 가능 | 가능 | 복구 링크 제공 |
| Draft SEO Route | 가능 | 제한적 | 제한적 | 일반 사용자가 직접 볼 수는 있으나 주 사용자는 운영/QA |

## 4. 전체 UX Flow

### 게스트 / 일반 방문자

```text
홈페이지 진입(`/`)
→ Hero에서 GTG 브랜드와 핵심 메시지 확인
→ Header 내비게이션 또는 스크롤
→ Solutions에서 5개 솔루션 확인
→ Company에서 회사 소개와 Capability Map 확인
→ Engagement Model에서 수행 흐름 확인
→ Contact에서 이메일/전화/공식 문의 링크 확인
→ 외부 문의 페이지, 이메일 앱, 전화 앱 중 하나로 이동
```

### 모바일 사용자

```text
모바일로 홈페이지 진입(`/`)
→ WebGL 대신 fallback Hero 확인
→ Open menu 선택
→ 모바일 메뉴 Overlay 열림
→ SOLUTIONS / ABOUT / ENGAGEMENT / CONTACT 중 선택
→ 선택한 섹션으로 이동
→ 메뉴 닫힘
→ Contact에서 문의 링크 선택
```

### Reduced-motion 사용자

```text
reduced-motion 설정이 켜진 상태로 홈페이지 진입
→ 초기 렌더부터 정적 Hero 표시
→ 과한 blur, camera motion, pinned scrub 없이 콘텐츠 확인
→ Solutions를 일반 문서 흐름으로 탐색
→ Contact로 이동
```

### 콘텐츠/브랜드 검수 담당자

```text
홈페이지 또는 로컬 preview 진입
→ Hero copy와 visual 검수
→ Solutions copy, CTA, vendor/claim 표현 검수
→ Company와 Capability Map에서 미확인 수치/인증/연혁 여부 검수
→ Contact 정보와 footer 정보 확인
→ robots/meta가 draft 차단 상태인지 확인
→ 수정 필요 항목을 개발/콘텐츠 담당자에게 전달
```

### 예외 흐름

```text
존재하지 않는 URL 접근
→ Not Found 화면 표시
→ 홈 또는 주요 섹션 링크 선택
→ 홈페이지로 복구
```

## 5. 화면별 상세 설계

## 화면 ID: SCR-HOME-001
## 화면명: 홈페이지 Shell

### 1. 화면 목적

- 공식 홈페이지 MVP의 전체 구조를 제공한다.
- 사용자가 별도 페이지 이동 없이 GTG의 핵심 메시지, 솔루션, 회사 소개, 수행 흐름, 문의 경로를 확인할 수 있게 한다.

### 2. 접근 권한

- 접근 가능한 사용자: 게스트, 일반 사용자, 잠재 고객, 관리자 역할, 개발/QA 담당자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- 브라우저 주소창에서 `/` 직접 접근 가능
- Not Found 화면의 홈 링크에서 진입 가능
- 외부 공유 링크에서 `/`, `/#top`, `/#solutions`, `/#company`, `/#engagement`, `/#contact` 접근 가능

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| Header | navigation | 브랜드 링크와 섹션 이동 링크 제공 | 필수 | NAV-001 |
| Main landmark | layout | 핵심 콘텐츠를 감싸는 `main` 영역 | 필수 | PAGE-001 |
| Hero section | section | 첫 화면 메시지와 WebGL/fallback Hero 제공 | 필수 | HERO-001, HERO-002 |
| Solutions section | section | 5개 솔루션 표시 | 필수 | SOL-001 |
| Company section | section | 회사 소개와 Capability Map 표시 | 필수 | COMP-001 |
| Engagement section | section | 4단계 수행 모델 표시 | 필수 | ENG-001 |
| Contact section | section | 문의 링크와 연락처 표시 | 필수 | CONTACT-001 |
| Footer | footer | 저작권, 정책 링크 표시 | 필수 | PAGE-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 섹션 이동 | Header 링크 클릭 | 대상 hash로 이동 | 대상 섹션 표시 | 섹션 id 누락 시 QA 실패 |
| 스크롤 탐색 | 마우스 휠, 터치 스크롤 | 다음 섹션으로 이동 | 콘텐츠 순차 확인 | overflow/겹침 발생 시 QA 실패 |
| Hero CTA 선택 | Hero 문의 CTA 클릭 | Contact 섹션으로 이동 | 문의 영역 표시 | Contact id 누락 시 QA 실패 |
| 외부 문의 이동 | Contact CTA 클릭 | 외부 URL 또는 protocol 실행 | 문의 페이지/앱 이동 | URL 오류 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | `/` 진입 직후 | Header와 Hero 우선 표시 | 스크롤, 메뉴 선택, CTA 선택 |
| 로딩 상태 | 정적 리소스 로드 중 | 기본 HTML 콘텐츠 우선 표시 | 대기, 스크롤 가능 범위 내 탐색 |
| 데이터 있음 | 콘텐츠 데이터 정상 | 모든 섹션 표시 | 전체 탐색 |
| 데이터 없음 | 필수 콘텐츠 누락 | 빈 화면이 아닌 기본 구조 유지 필요 | 확인 필요 |
| 오류 상태 | 컴포넌트 렌더링 오류 | 사용자-facing 오류 화면은 확인 필요 | 새로고침 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | 전체 섹션 렌더 완료 | 정상 홈페이지 | 전체 탐색 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| URL hash | 페이지 내 존재하는 섹션 id여야 한다. | 사용자 메시지 없음. 존재하지 않으면 기본 위치 유지 |
| query `forceFallback` | `1`일 때만 강제 fallback으로 해석한다. | 사용자 메시지 없음 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: 일반 홈페이지에서는 별도 오류 메시지를 표시하지 않는다.
- 확인창 문구: 없음
- 빈 상태 문구: MVP 공개 화면에는 빈 상태가 없어야 한다.

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 브랜드 링크 클릭 | SCR-HERO-001 | 항상 |
| ABOUT 클릭 | SCR-COMP-001 | `#company` 존재 |
| SOLUTIONS 클릭 | SCR-SOL-001 | `#solutions` 존재 |
| ENGAGEMENT 클릭 | SCR-ENG-001 | `#engagement` 존재 |
| CONTACT 클릭 | SCR-CONTACT-001 | `#contact` 존재 |
| 잘못된 route 접근 | SCR-ERR-001 | route 없음 |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | 정적/프론트엔드 렌더링 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: 브랜드, Hero, 솔루션, 회사 소개, 수행 모델, 문의, footer 콘텐츠
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: 없음

### 12. 모바일/반응형 고려사항

- 모바일에서는 WebGL Hero 대신 fallback Hero를 우선 표시한다.
- Header의 데스크톱 링크는 메뉴 버튼으로 축약할 수 있다.
- 모든 섹션은 한 컬럼 흐름으로 읽을 수 있어야 한다.
- 360px 폭에서도 수평 overflow가 없어야 한다.

### 13. 확인 필요 사항

- 최종 공개 도메인 확인 필요
- Header sticky offset 정책 확인 필요
- 공개 전환 시 robots/canonical 정책 확인 필요

## 화면 ID: SCR-NAV-001
## 화면명: 상단 내비게이션

### 1. 화면 목적

- 사용자가 주요 섹션으로 빠르게 이동할 수 있게 한다.
- 현재 페이지가 GTG 공식 홈페이지임을 브랜드 영역에서 명확히 인지하게 한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- 홈페이지와 Not Found 화면에서 공통 Header로 진입
- 직접 URL 접근 대상이 아니라 화면 공통 UI로 표시

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| 브랜드 링크 | anchor | Hero 또는 top으로 이동 | 필수 | NAV-001 |
| ABOUT 링크 | anchor | Company 섹션 이동 | 필수 | NAV-001 |
| SOLUTIONS 링크 | anchor | Solutions 섹션 이동 | 필수 | NAV-001 |
| ENGAGEMENT 링크 | anchor | Engagement 섹션 이동 | 필수 | NAV-001 |
| CONTACT 링크 | anchor | Contact 섹션 이동 | 필수 | NAV-001 |
| Open menu 버튼 | button | 모바일 메뉴 열기 | 모바일 필수 | NAV-002 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 브랜드 클릭 | 브랜드 링크 클릭 | top/Hero로 이동 | Hero 표시 | 링크 오류 시 QA 실패 |
| 섹션 링크 클릭 | Header link 클릭 | 해당 hash로 이동 | 대상 섹션 표시 | 대상 id 누락 시 QA 실패 |
| 메뉴 열기 | Open menu 클릭 | 모바일 메뉴 표시 | dialog 표시 | 포커스 오류 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | 페이지 진입 | 브랜드와 내비게이션 표시 | 링크 선택 |
| 로딩 상태 | 페이지 초기 렌더 | Header 우선 표시 | 링크 선택 가능 |
| 데이터 있음 | 메뉴 데이터 정상 | 모든 메뉴 표시 | 섹션 이동 |
| 데이터 없음 | 메뉴 데이터 누락 | 브랜드는 유지, 메뉴 누락은 QA 실패 | 홈 이동 |
| 오류 상태 | 섹션 id 불일치 | 사용자 메시지 없음 | 스크롤 탐색 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | 대상 이동 완료 | 대상 섹션 표시 | 계속 탐색 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| href | 페이지 내 존재하는 hash를 가리켜야 한다. | 사용자 메시지 없음 |
| label | 빈 문자열이면 안 된다. | 사용자 메시지 없음 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: 없음
- 확인창 문구: 없음
- 빈 상태 문구: 없음

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 브랜드 클릭 | SCR-HERO-001 | 항상 |
| ABOUT 클릭 | SCR-COMP-001 | `#company` |
| SOLUTIONS 클릭 | SCR-SOL-001 | `#solutions` |
| ENGAGEMENT 클릭 | SCR-ENG-001 | `#engagement` |
| CONTACT 클릭 | SCR-CONTACT-001 | `#contact` |
| Open menu 클릭 | SCR-NAV-002 | 모바일 또는 메뉴 버튼 표시 상태 |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | 정적 내비게이션 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: `navigationItems`, `brandContent`
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: URL hash, focus 상태

### 12. 모바일/반응형 고려사항

- 모바일에서는 링크 전체를 Header에 모두 노출하지 않고 메뉴 버튼을 우선 표시한다.
- 메뉴 버튼은 최소 탭 영역을 확보해야 한다.
- Header 텍스트가 작은 폭에서 줄바꿈으로 레이아웃을 깨지 않아야 한다.

### 13. 확인 필요 사항

- 최종 메뉴명 확인 필요
- Header 테마 전환 기준 확인 필요

## 화면 ID: SCR-NAV-002
## 화면명: 모바일 메뉴 Overlay

### 1. 화면 목적

- 모바일 사용자가 화면 폭 제한 없이 주요 섹션으로 이동할 수 있게 한다.
- 메뉴 열림/닫힘과 포커스 이동이 명확해야 한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 모바일 사용자, 키보드 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- Header의 `Open menu` 버튼에서 진입
- 직접 URL 접근 불가

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| 메뉴 dialog | dialog | 모바일 메뉴 overlay | 필수 | NAV-002 |
| Close 버튼 | button | 메뉴 닫기 | 필수 | NAV-002 |
| Home 링크 | anchor | top/Hero 이동 | 필수 | NAV-002 |
| ABOUT 링크 | anchor | Company 이동 | 필수 | NAV-002 |
| SOLUTIONS 링크 | anchor | Solutions 이동 | 필수 | NAV-002 |
| ENGAGEMENT 링크 | anchor | Engagement 이동 | 필수 | NAV-002 |
| CONTACT 링크 | anchor | Contact 이동 | 필수 | NAV-002 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 메뉴 열기 | Open menu 클릭 | dialog 표시, 포커스 이동 | 메뉴 표시 | 포커스 누락 시 QA 실패 |
| 메뉴 닫기 | Close 클릭 | dialog 제거 | Open menu로 포커스 복귀 | dialog 잔존 시 QA 실패 |
| 메뉴 닫기 | Escape 입력 | dialog 제거 | Open menu로 포커스 복귀 | 키보드 동작 실패 시 QA 실패 |
| 링크 선택 | 메뉴 링크 클릭 | 대상 섹션 이동, 메뉴 닫기 | 대상 섹션 표시 | 메뉴가 남으면 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | 메뉴 닫힘 | overlay 없음 | Open menu |
| 로딩 상태 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 데이터 있음 | 메뉴 열림 | 링크 목록 표시 | 링크 선택, 닫기 |
| 데이터 없음 | 메뉴 항목 누락 | QA 실패 | 닫기 |
| 오류 상태 | 포커스 trap 실패 | QA 실패 | Escape 시도 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | 메뉴 닫힘 | 대상 섹션 표시 | 계속 탐색 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| 메뉴 link href | 존재하는 섹션 hash여야 한다. | 사용자 메시지 없음 |
| keyboard event | Escape 입력 시 닫혀야 한다. | 사용자 메시지 없음 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: 없음
- 확인창 문구: 없음
- 빈 상태 문구: 메뉴 항목이 없어서는 안 된다.

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| Home 선택 | SCR-HERO-001 | 항상 |
| SOLUTIONS 선택 | SCR-SOL-001 | `#solutions` 존재 |
| ABOUT 선택 | SCR-COMP-001 | `#company` 존재 |
| ENGAGEMENT 선택 | SCR-ENG-001 | `#engagement` 존재 |
| CONTACT 선택 | SCR-CONTACT-001 | `#contact` 존재 |
| Close 또는 Escape | 이전 화면 | 메뉴 열린 상태 |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | 클라이언트 상태 전환 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: `navigationItems`
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: 메뉴 open/closed 상태, focus 상태, URL hash

### 12. 모바일/반응형 고려사항

- 메뉴 항목은 한 손 조작이 가능한 크기여야 한다.
- 긴 메뉴명은 줄바꿈을 허용하되 컨테이너를 넘지 않아야 한다.
- 메뉴 overlay는 본문 콘텐츠와 겹치더라도 포커스가 overlay 내부에 있어야 한다.

### 13. 확인 필요 사항

- 모바일 메뉴 animation 사용 여부 확인 필요
- overlay 배경 처리 기준 확인 필요

## 화면 ID: SCR-HERO-001
## 화면명: Hero 화면

### 1. 화면 목적

- 첫 화면에서 GTG Solutions & Consult 브랜드와 핵심 메시지를 전달한다.
- 데스크톱에서는 WebGL Hero를 제공하고, 모바일/감속 모션/WebGL 실패 환경에서는 fallback Hero를 제공한다.
- 핵심 서비스 목록은 Canvas 외부 semantic HTML로 접근 가능해야 한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- `/`, `/#top` 직접 접근
- Header 브랜드 링크
- Not Found의 홈 이동 링크

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| Eyebrow | text | `GTG Solutions & Consult` 표시 | 필수 | HERO-001 |
| Hero headline | heading | 핵심 메시지 표시 | 필수 | HERO-001, HERO-002 |
| Hero description | text | 서비스 범위 설명 | 필수 | HERO-001, HERO-002 |
| Primary CTA | anchor/button-like link | Contact 섹션 이동 | 필수 | CONTACT-001 |
| WebGL canvas | canvas | 데스크톱 WebGL 시각 요소 | 조건부 필수 | HERO-001 |
| Fallback visual | image/SVG | fallback Hero visual | 조건부 필수 | HERO-002, ASSET-001 |
| Hero services list | list | 7개 서비스 semantic 목록 | 필수 | HERO-003 |
| Scroll indicator | visual control | 데스크톱 스크롤 유도 | 선택 | HERO-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 문의 CTA 선택 | CTA 클릭 | `#contact`로 이동 | Contact 표시 | Contact 섹션 누락 시 QA 실패 |
| Hero 진행 | 스크롤 | WebGL 또는 fallback 상태 진행 | 다음 섹션으로 이동 | pinned scroll 오류 시 QA 실패 |
| reduced-motion 사용 | OS/브라우저 설정 | 초기 렌더부터 정적 Hero 표시 | fallback Hero 표시 | 모션 발생 시 QA 실패 |
| force fallback 테스트 | `?forceFallback=1` 접근 | canvas 없이 fallback 표시 | fallback 표시 | canvas 표시 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | Hero 최초 표시 | headline, description, CTA | CTA 클릭, 스크롤 |
| 로딩 상태 | WebGL/이미지 로드 중 | 텍스트와 CTA 우선 표시 | CTA 클릭, 스크롤 |
| 데이터 있음 | Hero 데이터 정상 | WebGL 또는 fallback 전체 표시 | CTA 클릭, 스크롤 |
| 데이터 없음 | Hero copy 누락 | QA 실패. 공개 화면에는 빈 headline 금지 | 스크롤 |
| 오류 상태 | WebGL 실패 | fallback Hero 표시 | CTA 클릭, 스크롤 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | Hero 렌더 완료 | canvas nonblank 또는 fallback visual 표시 | 다음 섹션 이동 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| headline | 빈 문자열이면 안 된다. | 사용자 메시지 없음. QA 실패 |
| primary CTA href | `#contact` 또는 유효한 링크여야 한다. | 사용자 메시지 없음. QA 실패 |
| hero service list | 7개 항목이 있어야 한다. | 사용자 메시지 없음. QA 실패 |
| visual src | 로컬 asset 경로여야 한다. | 사용자 메시지 없음. QA 실패 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: WebGL 실패는 사용자에게 오류로 표시하지 않고 fallback으로 대체한다.
- 확인창 문구: 없음
- 빈 상태 문구: 없음. Hero 핵심 콘텐츠는 항상 있어야 한다.

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| CTA 클릭 | SCR-CONTACT-001 | `#contact` 존재 |
| 스크롤 아래로 | SCR-SOL-001 | Hero 완료 후 |
| Header SOLUTIONS 클릭 | SCR-SOL-001 | 항상 |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | 클라이언트 렌더링 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: `heroContent`, `heroServices`, `heroCustomers`
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: Hero state, scroll progress, fallback reason

### 12. 모바일/반응형 고려사항

- 모바일에서는 canvas를 표시하지 않아야 한다.
- 모바일 Hero는 headline, CTA, fallback visual을 우선 표시해야 한다.
- 서비스 rail이나 scroll indicator는 공간이 부족하면 숨길 수 있다.
- CTA는 viewport 안에 완전히 들어와야 한다.

### 13. 확인 필요 사항

- 최종 Hero headline, description 승인 필요
- Hero visual 최종 승인 필요
- WebGL motion 강도와 timing 검수 기준 확인 필요

## 화면 ID: SCR-SOL-001
## 화면명: Solutions 화면

### 1. 화면 목적

- GTG의 주요 솔루션 5개를 사용자가 비교하고 이해할 수 있게 한다.
- 각 솔루션에서 관련 기술 범위와 CTA를 제공한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- Header `SOLUTIONS` 링크
- 모바일 메뉴 `SOLUTIONS` 링크
- Hero 이후 스크롤
- `/#solutions` 직접 접근 가능

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| Section heading | heading | 솔루션 영역 시작 표시 | 필수 | SOL-001 |
| Solution slide/card | section/card | 개별 솔루션 표시 | 필수 | SOL-001 |
| Eyebrow | text | `Solution 01` 등 구분 | 필수 | SOL-001 |
| Title | heading | 솔루션명 표시 | 필수 | SOL-001 |
| Description | text | 솔루션 설명 | 필수 | SOL-001, CONTENT-001 |
| Related list | list | 관련 기술/서비스 범위 | 선택 | SOL-001 |
| Product spotlight | visual/text | 기술 범위 강조 | 선택 | SOL-001 |
| CTA | anchor | 관련 페이지 또는 문의 링크 | 필수 | SOL-001 |
| Solution visual | image/SVG | 로컬 visual | 필수 | ASSET-001 |
| Progress index | text/indicator | `01 / 05` 형태 현재 위치 | 데스크톱 필수 | SOL-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 솔루션 탐색 | 스크롤 | 다음 솔루션 표시 | 5개 솔루션 순차 표시 | active 상태 오류 시 QA 실패 |
| CTA 클릭 | 솔루션 CTA 클릭 | 외부 URL 또는 mailto 실행 | 대상 이동 | href 오류 시 QA 실패 |
| 모바일 스크롤 | 터치 스크롤 | 일반 문서 흐름으로 다음 카드 표시 | 텍스트/CTA 표시 | 겹침/overflow 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | `#solutions` 진입 | 첫 번째 솔루션 표시 | 스크롤, CTA 클릭 |
| 로딩 상태 | visual 로드 중 | 텍스트 우선 표시 | 스크롤 |
| 데이터 있음 | 5개 솔루션 데이터 정상 | 모든 솔루션 표시 | 스크롤, CTA 클릭 |
| 데이터 없음 | 솔루션 배열 누락 | QA 실패 | 없음 |
| 오류 상태 | visual/CTA 오류 | 텍스트는 유지, QA 실패 | 스크롤 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | 5개 솔루션 렌더 완료 | 정상 표시 | 다음 섹션 이동 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| solution title | 빈 문자열이면 안 된다. | 사용자 메시지 없음. QA 실패 |
| solution description | 빈 문자열이면 안 된다. | 사용자 메시지 없음. QA 실패 |
| CTA href | 유효한 URL 또는 `mailto:`여야 한다. | 사용자 메시지 없음. QA 실패 |
| visual src | 로컬 asset이어야 한다. | 사용자 메시지 없음. QA 실패 |
| solution count | 5개여야 한다. | 사용자 메시지 없음. QA 실패 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: 없음
- 확인창 문구: 없음
- 빈 상태 문구: 공개 UI에는 표시하지 않는다. 데이터 없음은 QA 실패로 처리한다.

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 아래로 스크롤 | SCR-COMP-001 | Solutions 완료 후 |
| ABOUT/Header 클릭 | SCR-COMP-001 | `#company` |
| CONTACT 클릭 | SCR-CONTACT-001 | `#contact` |
| CTA 클릭 | 외부 페이지 또는 이메일 앱 | CTA href 유효 |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | 정적 콘텐츠 표시 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: `solutionSlides`, `solutionStackItems`
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: active solution index, URL hash 선택 시 위치

### 12. 모바일/반응형 고려사항

- 모바일에서는 pinned slide보다 일반 카드/섹션 흐름을 우선한다.
- Progress index는 `01 / 05` 형태로 축약할 수 있다.
- visual은 텍스트를 가리지 않아야 한다.
- CTA는 각 솔루션 텍스트 바로 아래에 배치해 놓치지 않게 한다.

### 13. 확인 필요 사항

- 솔루션별 최종 copy 승인 필요
- CTA 링크 최종 승인 필요
- 데스크톱 pinned/hybrid interaction 세부 정책 확인 필요

## 화면 ID: SCR-COMP-001
## 화면명: Company / Capability Map 화면

### 1. 화면 목적

- GTG의 회사 소개와 핵심 역량을 제공한다.
- 데이터, 스트리밍, 인프라 자동화, DevOps 품질, 컨설팅/지원 영역의 관계를 capability map으로 설명한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- Header `ABOUT` 링크
- 모바일 메뉴 `ABOUT` 링크
- Solutions 이후 스크롤
- `/#company` 직접 접근 가능

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| Company eyebrow | text | 섹션 맥락 표시 | 선택 | COMP-001 |
| Company headline | heading | 회사 소개 핵심 문구 | 필수 | COMP-001 |
| Company description | text | 회사 설명 | 필수 | COMP-001, CONTENT-001 |
| Capability list | list | 핵심 역량 목록 | 필수 | COMP-001 |
| Capability map image | picture/img | 데스크톱/모바일 역량 지도 | 필수 | COMP-001, ASSET-001 |
| Alt text | text attribute | 이미지 대체 설명 | 필수 | COMP-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 섹션 읽기 | 스크롤 | 텍스트와 map 표시 | 역량 이해 가능 | 텍스트/이미지 겹침 시 QA 실패 |
| 다음 섹션 이동 | 아래로 스크롤 | Engagement 표시 | 수행 모델 표시 | 이동 불가 시 QA 실패 |
| Contact 이동 | Header/메뉴 CONTACT 클릭 | Contact로 이동 | 문의 영역 표시 | hash 오류 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | `#company` 진입 | headline과 capability map 표시 | 스크롤, 메뉴 이동 |
| 로딩 상태 | SVG 로드 중 | 텍스트와 capability list 우선 표시 | 스크롤 |
| 데이터 있음 | company 데이터 정상 | 전체 표시 | 스크롤 |
| 데이터 없음 | company copy 누락 | QA 실패 | 스크롤 |
| 오류 상태 | map image 누락 | 텍스트 유지, QA 실패 | 스크롤 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | map과 텍스트 렌더 완료 | 정상 표시 | 다음 섹션 이동 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| company headline | 빈 문자열이면 안 된다. | 사용자 메시지 없음. QA 실패 |
| capability list | 1개 이상이어야 한다. | 사용자 메시지 없음. QA 실패 |
| map src | 로컬 SVG여야 한다. | 사용자 메시지 없음. QA 실패 |
| map alt | 빈 문자열이면 안 된다. | 사용자 메시지 없음. QA 실패 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: 없음
- 확인창 문구: 없음
- 빈 상태 문구: 공개 UI에는 빈 상태를 표시하지 않는다.

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 아래로 스크롤 | SCR-ENG-001 | Engagement 섹션 존재 |
| SOLUTIONS 클릭 | SCR-SOL-001 | `#solutions` |
| CONTACT 클릭 | SCR-CONTACT-001 | `#contact` |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | 정적 콘텐츠 표시 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: `companyContent`, `capabilityMapContent`
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: viewport에 따른 map asset 선택

### 12. 모바일/반응형 고려사항

- 모바일에서는 모바일 전용 capability map을 사용해야 한다.
- map이 작아져도 company text와 capability list로 의미가 보완되어야 한다.
- 이미지가 가로로 넘치지 않아야 한다.

### 13. 확인 필요 사항

- 회사 소개 최종 문구 승인 필요
- Capability Map 최종 디자인 승인 필요
- 공식 브랜드 색상 확인 필요

## 화면 ID: SCR-ENG-001
## 화면명: Engagement Model 화면

### 1. 화면 목적

- 사용자가 GTG의 상담/수행 흐름을 4단계로 이해할 수 있게 한다.
- 잠재 고객이 문의 전 예상 진행 과정을 파악할 수 있게 한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- Header `ENGAGEMENT` 링크
- 모바일 메뉴 `ENGAGEMENT` 링크
- Company 이후 스크롤
- `/#engagement` 직접 접근 가능

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| Engagement headline | heading | 수행 모델 핵심 문구 | 필수 | ENG-001 |
| Step list | list/grid | 4단계 흐름 표시 | 필수 | ENG-001 |
| Step number | text | `01`~`04` 번호 | 필수 | ENG-001 |
| Step title | heading/text | Diagnose, Design, Implement, Operate | 필수 | ENG-001 |
| Step description | text | 단계별 설명 | 필수 | ENG-001, CONTENT-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 단계 읽기 | 스크롤 | 4단계 표시 | 흐름 이해 가능 | 단계 누락 시 QA 실패 |
| Contact 이동 | 아래로 스크롤 또는 CONTACT 클릭 | Contact 표시 | 문의 가능 | hash 오류 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | `#engagement` 진입 | headline과 4단계 표시 | 스크롤 |
| 로딩 상태 | 정적 렌더 | 텍스트 즉시 표시 | 스크롤 |
| 데이터 있음 | steps 4개 정상 | 모든 단계 표시 | Contact 이동 |
| 데이터 없음 | steps 누락 | QA 실패 | 스크롤 |
| 오류 상태 | 단계 순서 오류 | QA 실패 | 스크롤 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | 4단계 렌더 완료 | 정상 표시 | 다음 섹션 이동 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| step count | 4개여야 한다. | 사용자 메시지 없음. QA 실패 |
| step number | `01`, `02`, `03`, `04` 순서를 유지해야 한다. | 사용자 메시지 없음. QA 실패 |
| step title | 빈 문자열이면 안 된다. | 사용자 메시지 없음. QA 실패 |
| step description | 빈 문자열이면 안 된다. | 사용자 메시지 없음. QA 실패 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: 없음
- 확인창 문구: 없음
- 빈 상태 문구: 공개 UI에는 빈 상태를 표시하지 않는다.

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 아래로 스크롤 | SCR-CONTACT-001 | Contact 섹션 존재 |
| CONTACT 클릭 | SCR-CONTACT-001 | `#contact` |
| ABOUT 클릭 | SCR-COMP-001 | `#company` |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | 정적 콘텐츠 표시 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: `engagementContent`
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: 없음

### 12. 모바일/반응형 고려사항

- 모바일에서는 4단계를 한 컬럼으로 표시한다.
- 단계 번호와 제목은 작은 화면에서도 구분 가능해야 한다.
- 설명 문구가 길어지면 줄바꿈을 허용한다.

### 13. 확인 필요 사항

- 4단계 명칭 최종 승인 필요
- 단계별 설명 최종 승인 필요

## 화면 ID: SCR-CONTACT-001
## 화면명: Contact 화면

### 1. 화면 목적

- 잠재 고객이 GTG에 문의할 수 있는 명확한 경로를 제공한다.
- MVP에서는 별도 문의 폼 없이 이메일, 전화, 공식 문의 페이지 링크만 제공한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- Header `CONTACT` 링크
- 모바일 메뉴 `CONTACT` 링크
- Hero CTA
- Engagement 이후 스크롤
- `/#contact` 직접 접근 가능

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| Contact headline | heading | 문의 섹션 제목 | 필수 | CONTACT-001 |
| Contact description | text | 문의 안내 문구 | 필수 | CONTACT-001 |
| Primary CTA | anchor | 공식 문의 페이지 링크 | 필수 | CONTACT-001 |
| Email CTA | anchor | `mailto:` 링크 | 필수 | CONTACT-001 |
| Phone link | anchor | `tel:` 링크 | 필수 | CONTACT-001 |
| Address | text | 공개 주소 | 선택, 확인 필요 | CONTACT-001 |
| Footer | footer | 저작권과 정책 링크 | 필수 | PAGE-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 공식 문의 이동 | Primary CTA 클릭 | 외부 문의 페이지로 이동 | 문의 페이지 열림 | URL 오류 시 QA 실패 |
| 이메일 문의 | Email CTA 클릭 | 이메일 클라이언트 실행 | 새 메일 작성 화면 | 이메일 href 오류 시 QA 실패 |
| 전화 문의 | Phone link 클릭 | 전화 앱 또는 브라우저 tel 처리 | 전화 동작 시작 | tel href 오류 시 QA 실패 |
| Footer 정책 링크 클릭 | 정책 링크 클릭 | 외부 정책 페이지 이동 | 정책 페이지 열림 | URL 오류 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | `#contact` 진입 | 문의 제목, 설명, 링크 표시 | CTA 클릭 |
| 로딩 상태 | 정적 렌더 | 텍스트와 링크 즉시 표시 | 링크 클릭 |
| 데이터 있음 | 연락처 데이터 정상 | 이메일, 전화, CTA 표시 | 링크 클릭 |
| 데이터 없음 | 연락처 누락 | QA 실패 | 없음 |
| 오류 상태 | href 형식 오류 | QA 실패 | 없음 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | 외부 링크 실행 | 브라우저/OS 기본 동작 | 외부 이동 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| email | 이메일 형식이어야 한다. | 사용자 메시지 없음. QA 실패 |
| email href | `mailto:`로 시작해야 한다. | 사용자 메시지 없음. QA 실패 |
| phone href | `tel:`로 시작해야 한다. | 사용자 메시지 없음. QA 실패 |
| primary CTA href | 유효한 URL이어야 한다. | 사용자 메시지 없음. QA 실패 |

### 8. 메시지 문구

- 성공 메시지: 없음. 외부 링크/protocol 실행으로 처리한다.
- 오류 메시지: 없음. 링크 오류는 QA 실패로 처리한다.
- 확인창 문구: 없음
- 빈 상태 문구: 문의 데이터가 비어 있으면 안 된다.

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 공식 문의 CTA 클릭 | 외부 공식 문의 페이지 | URL 확정 |
| Email CTA 클릭 | 이메일 클라이언트 | `mailto:` 유효 |
| Phone 클릭 | 전화 앱 또는 브라우저 tel 처리 | `tel:` 유효 |
| Header 브랜드 클릭 | SCR-HERO-001 | 항상 |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| `mailto:` | Email CTA 클릭 | 이메일 앱 실행 | OS/브라우저 기본 처리 | 사용자 환경에 따라 무반응 가능 |
| `tel:` | 전화 링크 클릭 | 전화 앱 실행 | OS/브라우저 기본 처리 | 사용자 환경에 따라 무반응 가능 |

### 11. 관련 데이터

- 화면에 표시할 데이터: `contactContent`, `footerContent`
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: 외부 앱/페이지 이동

### 12. 모바일/반응형 고려사항

- 전화 링크는 모바일에서 우선 사용성이 높으므로 터치 영역을 충분히 확보한다.
- 주소와 이메일이 긴 경우 줄바꿈을 허용한다.
- CTA 버튼은 한 줄로 들어가지 않으면 자연스럽게 줄바꿈되도록 한다.

### 13. 확인 필요 사항

- 최종 문의 URL 확인 필요
- 최종 이메일/전화/주소 승인 필요
- 개인정보 수집 없는 MVP 정책 최종 확인 필요

## 화면 ID: SCR-ERR-001
## 화면명: Not Found 화면

### 1. 화면 목적

- 사용자가 잘못된 URL에 접근했을 때 길을 잃지 않고 홈페이지로 복구할 수 있게 한다.
- 공식 홈페이지의 기본 내비게이션과 브랜드 접근을 유지한다.

### 2. 접근 권한

- 접근 가능한 사용자: 모든 사용자
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- 존재하지 않는 URL 직접 접근
- 잘못된 외부 링크 접근

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| Header | navigation | 브랜드와 주요 섹션 링크 | 필수 | NAV-001 |
| Not Found heading | heading | 페이지 없음 안내 | 필수 | ERR-001 |
| Description | text | 잘못된 경로 안내 | 필수 | ERR-001 |
| Home link | anchor | `/`로 복구 | 필수 | ERR-001 |
| Main content link | anchor | 본문 이동 | 선택 | ERR-001 |
| Section links | anchor | 주요 섹션 이동 | 필수 | ERR-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| 홈으로 이동 | Home link 클릭 | `/`로 이동 | Hero 표시 | route 오류 시 QA 실패 |
| 주요 섹션 이동 | Header/section link 클릭 | hash route 이동 | 대상 섹션 표시 | hash 오류 시 QA 실패 |
| 본문 이동 | skip link 클릭 | main content focus | 본문 접근 | focus 실패 시 QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | 잘못된 route 진입 | Not Found 안내 표시 | 홈/섹션 이동 |
| 로딩 상태 | route 처리 중 | 해당 없음 | 대기 |
| 데이터 있음 | 복구 링크 정상 | 홈/섹션 링크 표시 | 링크 클릭 |
| 데이터 없음 | 복구 링크 누락 | QA 실패 | 브라우저 뒤로가기 |
| 오류 상태 | link 오류 | QA 실패 | 뒤로가기 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | 홈으로 복구 | 홈페이지 표시 | 탐색 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| invalid path | route가 존재하지 않을 때 Not Found로 처리한다. | 페이지를 찾을 수 없다는 안내 |
| recovery href | `/` 또는 유효한 hash 링크여야 한다. | 사용자 메시지 없음. QA 실패 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: `페이지를 찾을 수 없습니다.` 계열 문구 사용
- 확인창 문구: 없음
- 빈 상태 문구: 없음

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 홈 링크 클릭 | SCR-HERO-001 | `/` |
| ABOUT 클릭 | SCR-COMP-001 | `/#company` |
| CONTACT 클릭 | SCR-CONTACT-001 | `/#contact` |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| 없음 | 없음 | Next.js Not Found 렌더링 | 없음 | 없음 |

### 11. 관련 데이터

- 화면에 표시할 데이터: 브랜드명, 내비게이션 링크, Not Found 문구
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: URL

### 12. 모바일/반응형 고려사항

- 오류 문구와 복구 버튼은 첫 화면 안에서 확인 가능해야 한다.
- 링크 목록은 한 컬럼으로 표시한다.

### 13. 확인 필요 사항

- 최종 Not Found 문구 승인 필요

## 화면 ID: SCR-SEO-001
## 화면명: Draft SEO Route

### 1. 화면 목적

- draft 상태에서 검색 인덱싱이 차단되어 있는지 운영/QA가 확인할 수 있게 한다.
- 일반 사용자가 탐색하는 시각 화면은 아니지만, 릴리스 전 필수 확인 route로 관리한다.

### 2. 접근 권한

- 접근 가능한 사용자: 운영 담당자, QA 담당자, 검색 엔진 crawler, 일반 사용자도 직접 URL 접근 가능
- 접근 불가능한 사용자: 없음
- 접근 불가 시 이동할 화면: 해당 없음

### 3. 진입 경로

- `/robots.txt` 직접 접근
- `/sitemap.xml` 직접 접근
- Playwright 또는 수동 QA에서 접근

### 4. 화면 구성 요소

| 요소명 | 유형 | 설명 | 필수 여부 | 관련 기능 |
|---|---|---|---|---|
| robots response | text | 전체 disallow 정책 | 필수 | SEO-001 |
| sitemap response | XML | draft sitemap | 필수 | SEO-001 |
| meta robots | metadata | 홈페이지 head의 noindex/nofollow | 필수 | SEO-001 |

### 5. 사용자 액션

| 액션 | 트리거 | 시스템 동작 | 성공 시 | 실패 시 |
|---|---|---|---|---|
| robots 확인 | `/robots.txt` 접근 | text response 반환 | `Disallow: /` 확인 | QA 실패 |
| sitemap 확인 | `/sitemap.xml` 접근 | XML response 반환 | 공개 canonical 미포함 | QA 실패 |
| head 확인 | 홈페이지 접근 | meta robots 확인 | noindex/nofollow 확인 | QA 실패 |

### 6. 화면 상태

| 상태 | 조건 | 화면 표시 내용 | 사용자 가능 액션 |
|---|---|---|---|
| 초기 상태 | route 접근 | text/XML response 표시 | 내용 확인 |
| 로딩 상태 | route 응답 대기 | 브라우저 기본 로딩 | 대기 |
| 데이터 있음 | response 정상 | robots 또는 sitemap 내용 | 복사/검수 |
| 데이터 없음 | response 비어 있음 | QA 실패 | 새로고침 |
| 오류 상태 | route 오류 | 브라우저 오류 | 새로고침 |
| 권한 없음 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 저장/처리 중 | 해당 없음 | 표시하지 않음 | 해당 없음 |
| 성공 완료 | draft 정책 확인 | 인덱싱 차단 확인 | QA 완료 |

### 7. 입력값 검증

| 입력 항목 | 검증 규칙 | 오류 메시지 |
|---|---|---|
| robots content | `User-Agent: *`, `Disallow: /` 포함 | 사용자 메시지 없음. QA 실패 |
| sitemap content | 공개 canonical URL 미포함 | 사용자 메시지 없음. QA 실패 |
| meta robots | `noindex`, `nofollow` 포함 | 사용자 메시지 없음. QA 실패 |

### 8. 메시지 문구

- 성공 메시지: 없음
- 오류 메시지: 없음
- 확인창 문구: 없음
- 빈 상태 문구: 없음

### 9. 화면 이동 규칙

| 사용자 행동 | 이동 대상 화면 | 조건 |
|---|---|---|
| 주소창에 `/` 입력 | SCR-HOME-001 | 항상 |
| 브라우저 뒤로가기 | 이전 화면 | 브라우저 history 존재 |

### 10. 관련 API

| API | 호출 시점 | 목적 | 성공 처리 | 실패 처리 |
|---|---|---|---|---|
| `/robots.txt` | QA 또는 crawler 요청 | draft 크롤링 차단 확인 | text 검증 | QA 실패 |
| `/sitemap.xml` | QA 또는 crawler 요청 | 공개 URL 미노출 확인 | XML 검증 | QA 실패 |

### 11. 관련 데이터

- 화면에 표시할 데이터: robots policy, sitemap response, metadata
- 사용자가 입력하는 데이터: 없음
- 변경되는 데이터: 없음

### 12. 모바일/반응형 고려사항

- 사람이 주로 보는 화면이 아니므로 별도 반응형 UI는 필요하지 않다.
- 브라우저 기본 text/XML 표시를 사용한다.

### 13. 확인 필요 사항

- public release 전환 시 robots/sitemap 정책 확인 필요
- canonical URL 확인 필요

## 6. 공통 UI 정책

### 버튼 스타일 정책

| 항목 | 정책 |
|---|---|
| CTA | 실제 이동이 있는 요소는 `button`처럼 보이더라도 `a` 태그를 사용해야 한다. |
| Icon button | 메뉴 열기/닫기처럼 명령형 조작은 `button`을 사용해야 한다. |
| Tap target | 모바일 주요 버튼과 링크는 손가락으로 누르기 충분한 크기여야 한다. |
| Disabled | MVP 공개 화면에는 disabled CTA를 노출하지 않는다. 링크가 미확정이면 공개 전 차단한다. |
| Text overflow | 버튼 텍스트가 길면 줄바꿈을 허용하고 컨테이너를 넘지 않아야 한다. |

### 입력값 검증 정책

| 항목 | 정책 |
|---|---|
| 사용자 입력 | MVP에는 사용자 입력 폼이 없다. |
| URL/hash | Header와 CTA href는 존재하는 섹션 또는 유효한 외부 링크여야 한다. |
| 콘텐츠 데이터 | 빈 headline, 빈 CTA, 누락된 visual, 누락된 alt text는 QA 실패로 처리한다. |
| 외부 링크 | 공개 전 URL 유효성과 승인 여부를 확인해야 한다. |

### 오류 메시지 정책

| 항목 | 정책 |
|---|---|
| WebGL 오류 | 사용자에게 오류로 노출하지 않고 fallback Hero로 대체한다. |
| 링크 오류 | 사용자-facing 오류 메시지 대신 배포 전 QA 실패로 처리한다. |
| Not Found | 잘못된 URL에는 짧은 안내와 복구 링크를 제공한다. |
| 시스템 오류 | MVP에서 별도 오류 화면 정책은 확인 필요이다. |

### 로딩 표시 정책

| 항목 | 정책 |
|---|---|
| 정적 콘텐츠 | skeleton 없이 HTML 텍스트를 우선 표시한다. |
| WebGL | canvas 로딩 중에도 headline, description, CTA는 표시되어야 한다. |
| 이미지/SVG | 이미지가 늦게 로드되어도 텍스트 콘텐츠가 먼저 읽혀야 한다. |
| 외부 API | MVP에는 화면용 외부 API 호출이 없다. |

### 빈 화면 표시 정책

| 항목 | 정책 |
|---|---|
| 공개 UI | Hero, Solutions, Contact 등 핵심 섹션에 빈 상태를 노출하지 않는다. |
| 데이터 누락 | 데이터 없음은 사용자 메시지가 아니라 QA 실패로 처리한다. |
| 향후 CMS | CMS 도입 시 빈 상태 문구는 별도 정의해야 한다. |

### 삭제 확인 정책

| 항목 | 정책 |
|---|---|
| 삭제 기능 | MVP에는 삭제 기능이 없다. |
| 향후 관리자/CMS | 콘텐츠 삭제 기능 도입 시 확인창 문구와 복구 정책을 별도 정의해야 한다. |

### 권한 없음 처리 정책

| 항목 | 정책 |
|---|---|
| 공개 화면 | 모든 화면은 로그인 없이 접근 가능해야 한다. |
| 관리자 화면 | MVP에는 관리자 화면이 없다. |
| 권한 없음 메시지 | MVP에서는 권한 없음 상태가 발생하지 않아야 한다. |
| 향후 권한 기능 | CMS/관리자 기능 도입 시 401/403 화면 정책을 별도 정의해야 한다. |

## 7. UX 리스크

| 리스크 | 사용자가 혼란스러울 수 있는 지점 | 영향 | 개선 제안 |
|---|---|---|---|
| WebGL 중심 첫 화면 | 시각 효과가 강하면 GTG 서비스 메시지가 묻힐 수 있음 | 방문자가 핵심 서비스를 이해하지 못할 수 있음 | headline, description, CTA를 canvas와 독립적으로 항상 표시 |
| 모바일 Hero 밀도 | 작은 화면에서 visual, headline, CTA가 동시에 들어가면 답답할 수 있음 | CTA 발견률 저하 | 모바일에서는 fallback visual과 텍스트 우선순위를 명확히 조정 |
| Pinned scroll | 데스크톱에서 스크롤이 고정된 듯 느껴질 수 있음 | 사용자가 페이지가 멈췄다고 느낄 수 있음 | pinned 구간을 짧게 유지하고 모바일에서는 일반 흐름 사용 |
| CTA 목적지 혼재 | 공식 문의 페이지, 이메일, 전화가 모두 있으면 1순위 행동이 모호할 수 있음 | 문의 전환 분산 | Primary CTA 우선순위 확정 필요 |
| 미확인 고객 proof | 고객 로고/고객명 공개 승인 범위가 불명확할 수 있음 | 신뢰/법무 리스크 | 서면 승인 전 제한 표시 또는 미표시 |
| Draft SEO 상태 | 공개 시점에 noindex가 남아 있을 수 있음 | 검색 노출 실패 | public release 체크리스트에서 SEO-001 전환 항목 필수화 |
| 외부 링크 이탈 | CTA 클릭 시 새 사이트나 앱으로 이동 | 사용자가 현재 사이트에서 이탈 | 링크 라벨에 목적지를 명확히 표현 |
| 데이터 손실 가능성 | MVP에는 사용자 입력이 없어 데이터 손실 리스크가 낮음 | 해당 없음 | 향후 문의 폼 도입 시 임시 저장/제출 실패 정책 정의 |
| 콘텐츠 길이 증가 | 최종 copy가 길어지면 버튼/카드/섹션 overflow 가능 | 모바일 가독성 저하 | 최종 copy 반영 후 모든 viewport screenshot QA 수행 |
