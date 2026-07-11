# 프로젝트 기본 정보

## 프로젝트명

- GTG Solutions & Consult 인터랙션 프로토타입
- 패키지명: `gtg-interaction-prototype`

## 개발 목적

- GTG Solutions & Consult의 공식 홈페이지 MVP를 위한 웹 기반 인터랙션 프로토타입 개발
- 데이터 분석, 데이터 스트리밍, 인프라 자동화, DevOps 품질, 컨설팅 및 기술 지원 역량을 한 페이지 안에서 명확하게 전달
- WebGL Hero, 솔루션 섹션, 회사 소개, 수행 모델, 문의 영역을 통해 방문자가 GTG의 주요 서비스 범위를 빠르게 이해할 수 있도록 구성
- OVA 레퍼런스의 이미지, 영상, 코드, 문구, 로고, 정확한 배치나 색상 구성을 복제하지 않고 상호작용 문법만 재해석

## 현재 문제

- 공식 홈페이지 MVP에 들어갈 일부 문구, 브랜드 색상, 로고/파비콘, OG 이미지, 약관 링크 등은 최종 승인 또는 확인이 필요하다.
- 확인되지 않은 고객 성과, 수치, 인증, 파트너 등급, 회사 연혁을 임의로 사용할 수 없어 콘텐츠 검수 기준이 필요하다.
- Hero 영역은 WebGL 기반이지만, 핵심 콘텐츠는 Canvas 밖의 semantic HTML로도 접근 가능해야 한다.
- 모바일에서는 긴 pinned scroll과 3D 효과를 줄여야 하며, `prefers-reduced-motion` 사용자를 위한 정적 경험이 초기 렌더부터 보장되어야 한다.
- 외부 이미지를 다운로드하거나 hotlink하지 않고 로컬/생성 자산만 사용해야 한다.

## 주요 사용자

- GTG Solutions & Consult 홈페이지 방문자 및 잠재 고객
- GTG 영업/마케팅 담당자
- 콘텐츠 승인 및 검수 담당자
- 기술 컨설팅/지원 문의 담당자
- 내부 개발 및 QA 담당자

## 핵심 기능

- 단일 페이지 공식 홈페이지 구조
- 상단 내비게이션 및 모바일 메뉴
- WebGL 기반 Hero 인터랙션
- WebGL 미지원, 강제 fallback, 모바일, reduced-motion 대응 Hero
- Hero 서비스 목록의 semantic HTML 제공
- 5개 솔루션 섹션 표시
- GTG capability map 및 회사 소개 섹션
- Engagement Model 섹션
- 문의 CTA, 이메일, 전화, 공식 문의 페이지 링크 제공
- draft 상태의 SEO/robots 처리
- Playwright 기반 반응형, fallback, reduced-motion, 접근성, overflow 검증

## 개발 형태

- 웹앱
- 공식 홈페이지 MVP
- 인터랙션 프로토타입
- 프론트엔드 중심 정적/반정적 사이트
- 사내 검수 및 릴리스 후보 확인용 프로젝트

## 예상 기술 스택

- Frontend:
  - Next.js App Router
  - React
  - TypeScript
  - Tailwind CSS
  - GSAP
  - Three.js
  - React Three Fiber
- Backend:
  - 현재 범위에서는 없음
- Database:
  - 현재 범위에서는 없음
- Authentication:
  - 현재 범위에서는 없음
- Infra:
  - Node.js 런타임
  - pnpm
  - Next.js production build/start
  - 로컬 개발 서버
- 기타:
  - ESLint
  - Playwright
  - 로컬 생성 SVG/PNG 자산
  - WebGL 지원 감지 및 HTML/CSS fallback

## 제약사항

- OVA 이미지, 영상, 소스 코드, 문구, 로고를 복사하지 않는다.
- OVA의 정확한 배치, 타이밍, 색상 구성을 복제하지 않는다.
- 레퍼런스에서는 상호작용 문법만 재해석한다.
- 확인되지 않은 GTG 사실, 고객사, 성과 수치, 파트너 등급, 인증, 연혁을 임의로 만들지 않는다.
- WebGL은 Hero 영역에서만 사용한다.
- 핵심 콘텐츠는 Canvas 외부의 semantic HTML로도 제공한다.
- 초기 렌더부터 `prefers-reduced-motion`을 지원한다.
- 모바일에서는 pinned scroll과 3D 효과를 줄인다.
- 외부 이미지를 다운로드하거나 hotlink하지 않는다.
- 구현 후 lint, production build, Playwright verification을 수행해야 한다.

## 우선순위

### 1차 MVP에서 반드시 필요한 기능

- GTG 공식 홈페이지 단일 페이지 구성
- Hero 영역의 WebGL 인터랙션 및 정적 fallback
- 모바일 및 reduced-motion 대응
- 5개 솔루션 섹션
- 회사 소개, capability map, engagement model, 문의 섹션
- semantic HTML 기반 핵심 콘텐츠 제공
- 로컬 자산만 사용하는 이미지/비주얼 구성
- 미확인 사실을 배제한 claim-safe 콘텐츠
- ESLint, production build, Playwright 검증 통과

### 나중에 추가할 기능

- CMS 연동
- 문의 폼 backend
- CRM 또는 일정 예약 연동
- 블로그/뉴스
- 다국어 지원
- 고객 포털
- 상세 서비스 페이지
- 사례 연구 데이터베이스
- 분석 대시보드
- 최종 승인된 SEO/OG 이미지 및 canonical 공개 설정

## 아직 정해지지 않은 내용

- 최종 GTG headline 및 서비스 copy 승인
- 공식 브랜드 색상
- 최종 승인된 로고, 파비콘, OG 이미지
- Terms URL
- 최종 문의 CTA 목적지 및 운영 방식
- 최소 지원 브라우저/디바이스 범위
- 생성 이미지 사용 여부에 대한 최종 승인
- 고객 로고 및 고객명 공개 표시의 최종 서면 승인 범위
- 홈페이지 공개 전 canonical, robots, sitemap 정책
