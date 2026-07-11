# API 명세서

> **FUTURE-ONLY DRAFT.** 현재 제품에는 application API, backend, authentication, CMS 또는 문의 저장 기능이 없다. 이 문서는 명시적인 운영 요구와 별도 승인 전까지 구현 기준이 아니다. 현재 상태는 `../CURRENT.md`를 따른다.

문서 작성일: 2026-07-09  
프로젝트명: GTG Solutions & Consult 인터랙션 프로토타입  
기준 버전: MVP v0.1 Draft  
API 기준: REST API v1 초안

## 1. 문서 개요

### 문서 목적

이 문서는 GTG Solutions & Consult 공식 홈페이지 MVP 및 향후 확장 기능에서 프론트엔드와 백엔드가 주고받을 요청/응답 형식, 인증, 권한, 오류 처리, pagination, 파일 업로드 정책을 정의한다.

중요 전제:

- 현재 MVP는 backend API, DB, authentication을 포함하지 않는다.
- 현재 MVP에서 실제로 존재하는 서버 route는 Next.js 정적/동적 route 성격의 `/robots.txt`, `/sitemap.xml`이다.
- 이메일과 전화는 API가 아니라 `mailto:`, `tel:` protocol 링크이다.
- CMS, 문의 폼, 관리자 인증, media upload, release publish API는 향후 확장 기능이며 현재 MVP 구현 범위가 아니다.

### 대상 독자

| 대상 독자 | 활용 목적 |
|---|---|
| 프론트엔드 개발자 | 향후 API 연동 시 request/response 형식 확인 |
| 백엔드 개발자 | REST endpoint, 권한, DB table mapping 기준 확인 |
| QA 담당자 | 정상/오류/권한/pagination/file upload 테스트 케이스 도출 |
| Product Manager | MVP 포함 API와 향후 확장 API 범위 구분 |
| 운영 담당자 | 문의, 콘텐츠 승인, 공개 SEO 전환 API 운영 정책 확인 |
| 보안/개인정보 검수 담당자 | 인증, 권한, 개인정보 처리, 감사 로그 정책 검토 |

### 기준 버전

| 항목 | 내용 |
|---|---|
| 문서 버전 | MVP v0.1 Draft |
| API 버전 | `/api/v1` 기준 초안 |
| 현재 MVP API 구현 | `/robots.txt`, `/sitemap.xml`만 현재 route 성격으로 존재 |
| 향후 API 구현 | 인증, CMS, media, inquiry, release API는 확인 필요 |
| DBMS 기준 | PostgreSQL |

### 관련 문서

| 문서 | 경로 |
|---|---|
| 프로젝트 기본 정보 | `../archive/2026-07/planning/project-basic-info.md` |
| 기능 명세서 | `../archive/2026-07/planning/functional-spec.md` |
| 화면 설계서 / UX Flow | `../archive/2026-07/planning/ux-flow.md` |
| 데이터 모델 / DB 설계서 | `data-model-db-design.md` |
| 요구사항 정의서 / PRD | `../archive/2026-07/planning/prd.md` |

## 2. API 설계 원칙

### RESTful 설계 기준

| 기준 | 정책 |
|---|---|
| Resource 중심 | URL은 동사보다 resource 명사를 사용한다. 예: `/admin/content-blocks/{contentBlockId}` |
| 상태 변경 action | 승인, 게시처럼 명확한 업무 action은 sub-resource action으로 표현한다. 예: `/approve`, `/publish` |
| 버전 관리 | API URL에 major version을 포함한다. 예: `/api/v1` |
| 공개 API와 관리자 API 분리 | 공개 조회/제출 API는 `/pages`, `/inquiries`, 관리자 API는 `/admin/*`를 사용한다. |
| MVP 구분 | 현재 MVP에 없는 API는 `상태: MVP 이후`로 표시한다. |

### URL 네이밍 규칙

| 항목 | 규칙 | 예시 |
|---|---|---|
| 단어 구분 | kebab-case | `/content-blocks` |
| collection | 복수형 명사 | `/inquiries` |
| resource id | path parameter | `/inquiries/{inquiryId}` |
| 관리자 범위 | `/admin` prefix | `/admin/media-assets` |
| 인증 범위 | `/auth` prefix | `/auth/login` |

### HTTP Method 사용 기준

| Method | 사용 기준 |
|---|---|
| GET | 데이터 조회. 서버 상태를 변경하지 않아야 한다. |
| POST | 새 resource 생성 또는 업무 action 실행 |
| PATCH | resource 일부 수정 |
| PUT | resource 전체 교체. 본 설계에서는 기본 사용하지 않는다. |
| DELETE | 물리 삭제가 필요한 경우. 본 설계에서는 대부분 논리 삭제 또는 archive를 권장한다. |

### Request/Response 형식

| 항목 | 정책 |
|---|---|
| 기본 Content-Type | `application/json; charset=utf-8` |
| 파일 업로드 Content-Type | `multipart/form-data` |
| 성공 응답 | `{ "success": true, "data": ..., "message": "..." }` |
| 실패 응답 | `{ "success": false, "error": { "code": "...", "message": "...", "details": ... } }` |
| 목록 응답 | `data.items`와 `pagination`을 포함한다. |

### 인증 방식

| 항목 | 정책 |
|---|---|
| 현재 MVP | 인증 없음 |
| 향후 관리자 API | Bearer Token 또는 Session Cookie 중 선택 필요 |
| 본 문서 기본안 | Bearer JWT 기준으로 작성 |
| 토큰 저장 위치 | 확인 필요. 브라우저 보안 정책에 따라 HttpOnly Cookie 검토 권장 |

### 권한 처리 방식

| 역할 | 설명 | 대표 권한 |
|---|---|---|
| public | 비로그인 사용자 | 공개 page 조회, 문의 제출 |
| viewer | 내부 읽기 전용 | 관리자 데이터 조회 |
| editor | 콘텐츠 편집자 | draft 콘텐츠 생성/수정 |
| approver | 콘텐츠 승인자 | 콘텐츠/asset/link 승인 |
| qa | QA 담당자 | release QA 상태 변경 |
| operator | 운영 담당자 | inquiry 처리, release publish |
| admin | 전체 관리자 | 전체 운영 API 접근 |

### 에러 응답 형식

모든 JSON API는 아래 오류 형식을 사용해야 한다.

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

### Pagination 방식

| 항목 | 정책 |
|---|---|
| 기본 방식 | `page` / `size` 방식 |
| 기본 page | `1` |
| 기본 size | `20` |
| 최대 size | `100` |
| 정렬 | `sort` query 사용. 예: `sort=-createdAt` |
| cursor 방식 | 대용량 audit log/inquiry event에서 필요 시 추후 도입 |

목록 성공 응답 예시:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "size": 20,
      "totalItems": 0,
      "totalPages": 0
    }
  },
  "message": "조회가 성공했습니다."
}
```

### 날짜/시간 형식

| 항목 | 정책 |
|---|---|
| 날짜/시간 | ISO 8601 문자열 |
| timezone | UTC 저장, 클라이언트 표시 시 locale 변환 |
| 예시 | `2026-07-09T02:51:00Z` |
| 날짜만 | `YYYY-MM-DD` |

### 파일 업로드 방식

| 항목 | 정책 |
|---|---|
| Content-Type | `multipart/form-data` |
| 기본 최대 파일 크기 | 확인 필요. 초안은 10MB |
| 허용 확장자 | `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg` |
| SVG 정책 | script, external href, remote image 참조 금지 |
| 업로드 후 상태 | `approval_status = draft` 또는 `needs_review` |
| 실패 처리 | 파일 크기, MIME, 확장자, 바이러스/정책 검사 실패 시 400 또는 422 |

## 3. 공통 규칙

### 3.1 Base URL

| 환경 | Base URL | 상태 |
|---|---|---|
| Local Frontend | `http://127.0.0.1:18150` | 현재 MVP |
| Local API | `http://localhost:8000/api/v1` | 확인 필요 |
| Staging API | 확인 필요 | 확인 필요 |
| Production API | 확인 필요 | 확인 필요 |

현재 MVP의 `/robots.txt`, `/sitemap.xml`은 API base URL이 아니라 Next.js app route에서 제공된다.

### 3.2 인증 방식

| 구분 | 방식 | 상태 |
|---|---|---|
| 현재 MVP | 인증 없음 | 확정 |
| 향후 관리자 API | Bearer JWT 또는 Session Cookie | 확인 필요 |
| 공개 API | 인증 없음 또는 rate limit | 확인 필요 |

본 문서의 관리자 API 예시는 Bearer Token 기준이다.

### 3.3 공통 Header

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Accept | 권장 | 응답 형식 | `application/json` |
| Content-Type | POST/PATCH 필수 | 요청 body 형식 | `application/json` |
| Authorization | 인증 API 필수 | Bearer token | `Bearer eyJ...` |
| X-Request-Id | 권장 | 요청 추적 id | `req_20260709_001` |
| Idempotency-Key | 조건부 | 중복 제출 방지. 문의/게시 action에 권장 | `inq_abc123` |

### 3.4 공통 Response 형식

성공 응답 예시:

```json
{
  "success": true,
  "data": {},
  "message": "요청이 성공했습니다."
}
```

실패 응답 예시:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자에게 표시할 메시지",
    "details": {}
  }
}
```

### 3.5 공통 Error Code

| HTTP Status | Error Code | 설명 | 사용자 메시지 |
|---|---|---|---|
| 400 | BAD_REQUEST | 요청 형식 오류 | 요청 형식을 확인해주세요. |
| 401 | UNAUTHENTICATED | 인증 없음 또는 토큰 만료 | 로그인이 필요합니다. |
| 403 | FORBIDDEN | 권한 부족 | 접근 권한이 없습니다. |
| 404 | NOT_FOUND | resource 없음 | 요청한 대상을 찾을 수 없습니다. |
| 409 | CONFLICT | 상태 충돌 또는 중복 | 현재 상태에서는 처리할 수 없습니다. |
| 413 | PAYLOAD_TOO_LARGE | 업로드 용량 초과 | 파일 크기가 허용 범위를 초과했습니다. |
| 415 | UNSUPPORTED_MEDIA_TYPE | 허용되지 않은 파일 형식 | 지원하지 않는 파일 형식입니다. |
| 422 | VALIDATION_ERROR | 필드 검증 실패 | 입력값을 확인해주세요. |
| 429 | RATE_LIMITED | 요청 과다 | 잠시 후 다시 시도해주세요. |
| 500 | INTERNAL_SERVER_ERROR | 서버 오류 | 일시적인 오류가 발생했습니다. |

## 4. API 목록 요약

| API ID | Method | Endpoint | 설명 | 인증 필요 | 권한 | 관련 기능 | 관련 화면 | 상태 |
|---|---|---|---|---|---|---|---|---|
| SYS-API-001 | GET | `/robots.txt` | draft robots 정책 조회 | 아니오 | public | SEO-001 | SCR-SEO-001 | 현재 |
| SYS-API-002 | GET | `/sitemap.xml` | draft sitemap 조회 | 아니오 | public | SEO-001 | SCR-SEO-001 | 현재 |
| AUTH-API-001 | POST | `/api/v1/auth/login` | 관리자 로그인 | 아니오 | public | FUT-002 | 확인 필요 | MVP 이후 |
| AUTH-API-002 | GET | `/api/v1/auth/me` | 내 계정/권한 조회 | 예 | viewer 이상 | FUT-002 | 확인 필요 | MVP 이후 |
| CONTENT-API-001 | GET | `/api/v1/pages/{pageKey}/published` | 공개 page 콘텐츠 조회 | 아니오 | public | PAGE-001 | SCR-HOME-001 | MVP 이후 |
| CONTENT-API-002 | PATCH | `/api/v1/admin/content-blocks/{contentBlockId}` | 콘텐츠 block 수정 | 예 | editor 이상 | CONTENT-001 | 확인 필요 | MVP 이후 |
| CONTENT-API-003 | POST | `/api/v1/admin/content-blocks/{contentBlockId}/approve` | 콘텐츠 block 승인/반려 | 예 | approver 이상 | CONTENT-001 | 확인 필요 | MVP 이후 |
| MEDIA-API-001 | POST | `/api/v1/admin/media-assets` | media asset 업로드 | 예 | editor 이상 | ASSET-001 | 확인 필요 | MVP 이후 |
| INQUIRY-API-001 | POST | `/api/v1/inquiries` | 문의 제출 | 아니오 | public | FUT-003 | SCR-CONTACT-001 | MVP 이후 |
| INQUIRY-API-002 | GET | `/api/v1/admin/inquiries` | 문의 목록 조회 | 예 | operator 이상 | FUT-003 | 확인 필요 | MVP 이후 |
| INQUIRY-API-003 | PATCH | `/api/v1/admin/inquiries/{inquiryId}/status` | 문의 상태 변경 | 예 | operator 이상 | FUT-003 | 확인 필요 | MVP 이후 |
| RELEASE-API-001 | POST | `/api/v1/admin/releases/{releaseId}/publish` | release 공개 전환 | 예 | operator 이상 | FUT-001, QA-001 | 확인 필요 | MVP 이후 |

## 5. API 상세 명세

## API ID: SYS-API-001
## API명: robots 정책 조회
## Method: GET
## Endpoint: `/robots.txt`

### 1. 설명

- API 목적: draft 상태의 검색 엔진 크롤링 차단 정책을 text로 제공한다.
- 호출 시점: crawler 접근, QA 검증, 운영 확인 시점

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| SEO-001 | Draft SEO/robots |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| SCR-SEO-001 | Draft SEO Route |

### 4. 인증/권한

- 인증 필요 여부: 아니오
- 접근 가능한 역할: public
- 접근 불가 시 응답: 해당 없음

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Accept | 선택 | text 응답 허용 | `text/plain` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

JSON 예시: 없음

### 9. Response Body

성공 응답 예시:

```text
User-Agent: *
Disallow: /
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 500 | INTERNAL_SERVER_ERROR | route 생성 실패 | 일시적인 오류가 발생했습니다. |

오류 JSON 예시는 해당 없음. 이 endpoint는 text response를 반환한다.

### 11. 처리 로직

1. 서버는 `/robots.txt` 요청을 수신한다.
2. 현재 release 상태가 draft인지 확인한다.
3. draft 상태이면 `User-Agent: *`와 `Disallow: /`를 반환한다.
4. public release 전환 후 정책은 확인 필요이다.

### 12. 관련 테이블

- 조회 테이블: 현재 없음. 향후 `seo_settings`
- 생성 테이블: 없음
- 수정 테이블: 없음
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: 없음
- 권한 검증: 없음
- 상태 검증: draft 상태에서는 반드시 전체 disallow를 반환해야 한다.

### 14. 테스트 관점

- 정상 케이스: `/robots.txt`가 200으로 응답하고 `Disallow: /` 포함
- 예외 케이스: route 응답 실패
- 권한 케이스: 인증 없이 접근 가능

## API ID: SYS-API-002
## API명: sitemap 조회
## Method: GET
## Endpoint: `/sitemap.xml`

### 1. 설명

- API 목적: draft 상태의 sitemap을 제공하되 공개 canonical URL을 노출하지 않는다.
- 호출 시점: crawler 접근, QA 검증, 운영 확인 시점

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| SEO-001 | Draft SEO/robots |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| SCR-SEO-001 | Draft SEO Route |

### 4. 인증/권한

- 인증 필요 여부: 아니오
- 접근 가능한 역할: public
- 접근 불가 시 응답: 해당 없음

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Accept | 선택 | XML 응답 허용 | `application/xml` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

JSON 예시: 없음

### 9. Response Body

성공 응답 예시:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 500 | INTERNAL_SERVER_ERROR | sitemap 생성 실패 | 일시적인 오류가 발생했습니다. |

오류 JSON 예시는 해당 없음. 이 endpoint는 XML response를 반환한다.

### 11. 처리 로직

1. 서버는 `/sitemap.xml` 요청을 수신한다.
2. 현재 draft 상태에서는 공개 canonical URL을 포함하지 않는다.
3. XML sitemap 형식으로 응답한다.

### 12. 관련 테이블

- 조회 테이블: 현재 없음. 향후 `pages`, `seo_settings`
- 생성 테이블: 없음
- 수정 테이블: 없음
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: 없음
- 권한 검증: 없음
- 상태 검증: draft 상태에서는 `https://www.gtgsc.com/` 공개 URL이 포함되면 안 된다.

### 14. 테스트 관점

- 정상 케이스: `/sitemap.xml` 200 응답
- 예외 케이스: XML 생성 실패
- 권한 케이스: 인증 없이 접근 가능

## API ID: AUTH-API-001
## API명: 관리자 로그인
## Method: POST
## Endpoint: `/api/v1/auth/login`

### 1. 설명

- API 목적: 향후 CMS/운영 기능 사용자를 인증하고 access token을 발급한다.
- 호출 시점: 관리자 로그인 화면에서 로그인 버튼 클릭 시
- 상태: MVP 이후. 현재 제품에는 로그인 화면이 없다.

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| FUT-002 | CMS 연동 |
| EXCL-001 | 로그인/관리자/DB 제외 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | 관리자 로그인 화면 |

### 4. 인증/권한

- 인증 필요 여부: 아니오
- 접근 가능한 역할: public
- 접근 불가 시 응답: 해당 없음

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Content-Type | 필수 | JSON 요청 | `application/json` |
| Accept | 권장 | JSON 응답 | `application/json` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| email | string | 필수 | 이메일 형식, 최대 320자 | 운영자 이메일 | `editor@example.com` |
| password | string | 필수 | 최소 길이 확인 필요 | 비밀번호 | `********` |

JSON 예시:

```json
{
  "email": "editor@example.com",
  "password": "********"
}
```

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOi...",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "user": {
      "id": "7c7b4c5d-3ab5-4d9c-9a12-000000000001",
      "email": "editor@example.com",
      "displayName": "Content Editor",
      "role": "editor"
    }
  },
  "message": "로그인되었습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 400 | BAD_REQUEST | JSON 형식 오류 | 요청 형식을 확인해주세요. |
| 401 | INVALID_CREDENTIALS | 이메일 또는 비밀번호 불일치 | 이메일 또는 비밀번호를 확인해주세요. |
| 403 | ACCOUNT_INACTIVE | 비활성/잠김 계정 | 사용할 수 없는 계정입니다. |
| 422 | VALIDATION_ERROR | 이메일 형식 오류 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "이메일 또는 비밀번호를 확인해주세요.",
    "details": {}
  }
}
```

### 11. 처리 로직

1. 서버는 email과 password를 수신한다.
2. email 형식을 검증한다.
3. `app_users`에서 email에 해당하는 사용자를 조회한다.
4. 계정 상태가 `active`인지 확인한다.
5. 비밀번호 또는 외부 IdP 인증을 검증한다.
6. 인증 성공 시 access token을 발급한다.
7. `last_login_at`을 갱신한다.
8. 인증 실패 시 동일한 오류 메시지로 응답해 계정 존재 여부를 노출하지 않는다.

### 12. 관련 테이블

- 조회 테이블: `app_users`
- 생성 테이블: 없음
- 수정 테이블: `app_users.last_login_at`
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: email 필수, password 필수
- 권한 검증: 로그인 전 API이므로 없음
- 상태 검증: `app_users.status = active`

### 14. 테스트 관점

- 정상 케이스: active 계정과 올바른 password로 token 발급
- 예외 케이스: 잘못된 password, 비활성 계정, email 형식 오류
- 권한 케이스: 인증 없이 호출 가능

## API ID: AUTH-API-002
## API명: 내 계정/권한 조회
## Method: GET
## Endpoint: `/api/v1/auth/me`

### 1. 설명

- API 목적: 현재 인증된 운영자의 계정 정보와 권한을 조회한다.
- 호출 시점: 관리자 앱 초기 진입, 권한별 UI 분기 시
- 상태: MVP 이후

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| FUT-002 | CMS 연동 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | 관리자 Shell |

### 4. 인증/권한

- 인증 필요 여부: 예
- 접근 가능한 역할: viewer, editor, approver, qa, operator, admin
- 접근 불가 시 응답: 401

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Authorization | 필수 | Bearer token | `Bearer eyJ...` |
| Accept | 권장 | JSON 응답 | `application/json` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

JSON 예시: 없음

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "id": "7c7b4c5d-3ab5-4d9c-9a12-000000000001",
    "email": "editor@example.com",
    "displayName": "Content Editor",
    "role": "editor",
    "permissions": [
      "content:read",
      "content:update",
      "media:create"
    ]
  },
  "message": "조회가 성공했습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 401 | UNAUTHENTICATED | 토큰 없음/만료 | 로그인이 필요합니다. |
| 403 | ACCOUNT_INACTIVE | 계정 비활성 | 사용할 수 없는 계정입니다. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "로그인이 필요합니다.",
    "details": {}
  }
}
```

### 11. 처리 로직

1. Authorization header를 확인한다.
2. token 유효성을 검증한다.
3. token subject로 `app_users`를 조회한다.
4. 계정 상태가 `active`인지 확인한다.
5. role 기반 permission 목록을 계산해 반환한다.

### 12. 관련 테이블

- 조회 테이블: `app_users`
- 생성 테이블: 없음
- 수정 테이블: 없음
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: Authorization header 필수
- 권한 검증: active 계정
- 상태 검증: locked/inactive 계정 차단

### 14. 테스트 관점

- 정상 케이스: 유효 token으로 계정 정보 반환
- 예외 케이스: token 만료, malformed token
- 권한 케이스: inactive 계정 403

## API ID: CONTENT-API-001
## API명: 공개 page 콘텐츠 조회
## Method: GET
## Endpoint: `/api/v1/pages/{pageKey}/published`

### 1. 설명

- API 목적: 향후 CMS 전환 시 공개 page 콘텐츠를 프론트엔드에 제공한다.
- 호출 시점: 홈페이지 렌더링 또는 SSG/ISR build-time fetch 시
- 상태: MVP 이후. 현재는 TypeScript 상수로 렌더링한다.

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| PAGE-001 | 단일 페이지 홈페이지 |
| HERO-003 | Hero semantic 콘텐츠 |
| SOL-001 | 솔루션 섹션 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| SCR-HOME-001 | 홈페이지 Shell |
| SCR-HERO-001 | Hero 화면 |
| SCR-SOL-001 | Solutions 화면 |

### 4. 인증/권한

- 인증 필요 여부: 아니오
- 접근 가능한 역할: public
- 접근 불가 시 응답: 해당 없음

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Accept | 권장 | JSON 응답 | `application/json` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| pageKey | string | 필수 | page 내부 key | `home` |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| locale | string | 선택 | `ko` | 언어 코드 | `ko` |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

JSON 예시: 없음

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "page": {
      "pageKey": "home",
      "route": "/",
      "title": "GTG Solutions & Consult",
      "locale": "ko",
      "status": "published"
    },
    "sections": [
      {
        "sectionKey": "hero",
        "anchorId": "top",
        "sortOrder": 10,
        "blocks": [
          {
            "blockKey": "hero-main",
            "blockType": "hero",
            "data": {
              "eyebrow": "GTG Solutions & Consult",
              "headline": "확인 필요",
              "primaryCta": {
                "label": "문의하기",
                "href": "#contact"
              }
            }
          }
        ]
      }
    ],
    "seo": {
      "robotsPolicy": "noindex,nofollow",
      "canonicalUrl": null
    }
  },
  "message": "조회가 성공했습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 404 | NOT_FOUND | page 없음 또는 published page 없음 | 요청한 페이지를 찾을 수 없습니다. |
| 422 | VALIDATION_ERROR | locale 형식 오류 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "요청한 페이지를 찾을 수 없습니다.",
    "details": {
      "pageKey": "home"
    }
  }
}
```

### 11. 처리 로직

1. `pageKey`와 `locale`을 검증한다.
2. `pages`에서 `page_key`, `locale`, `status = published` 조건으로 조회한다.
3. 연결된 `sections`를 `sort_order` 순서로 조회한다.
4. 각 section의 `content_blocks` 중 `publication_status = published`, `approval_status = approved`인 block을 조회한다.
5. 연결된 `media_assets`, `external_links`, `seo_settings`를 함께 조회한다.
6. 렌더링 가능한 JSON 구조로 반환한다.

### 12. 관련 테이블

- 조회 테이블: `pages`, `sections`, `content_blocks`, `media_assets`, `content_block_media`, `external_links`, `content_block_links`, `seo_settings`
- 생성 테이블: 없음
- 수정 테이블: 없음
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: pageKey 필수, locale은 ISO 계열 짧은 코드
- 권한 검증: 없음
- 상태 검증: 공개 조회는 approved/published 콘텐츠만 반환

### 14. 테스트 관점

- 정상 케이스: published page와 section/block 반환
- 예외 케이스: 없는 pageKey, published block 없음
- 권한 케이스: 인증 없이 접근 가능

## API ID: CONTENT-API-002
## API명: 콘텐츠 block 수정
## Method: PATCH
## Endpoint: `/api/v1/admin/content-blocks/{contentBlockId}`

### 1. 설명

- API 목적: 향후 CMS에서 draft 콘텐츠 block을 수정한다.
- 호출 시점: 관리자 콘텐츠 편집 화면에서 저장 클릭 시
- 상태: MVP 이후

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| CONTENT-001 | Claim-safe 콘텐츠 |
| FUT-002 | CMS 연동 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | 관리자 콘텐츠 편집 화면 |

### 4. 인증/권한

- 인증 필요 여부: 예
- 접근 가능한 역할: editor, approver, admin
- 접근 불가 시 응답: 401 또는 403

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Authorization | 필수 | Bearer token | `Bearer eyJ...` |
| Content-Type | 필수 | JSON 요청 | `application/json` |
| X-Request-Id | 권장 | 요청 추적 | `req_001` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| contentBlockId | uuid | 필수 | 수정할 콘텐츠 block id | `00000000-0000-0000-0000-000000000001` |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| createVersion | boolean | 선택 | `true` | 새 version 생성 여부 | `true` |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| data | object | 필수 | block_type별 schema 확인 필요 | 콘텐츠 payload | `{ "headline": "..." }` |
| note | string | 선택 | 최대 1000자 | 수정 메모 | `Hero headline 수정` |

JSON 예시:

```json
{
  "data": {
    "eyebrow": "GTG Solutions & Consult",
    "headline": "확인 필요",
    "primaryCta": {
      "label": "문의하기",
      "href": "#contact"
    }
  },
  "note": "Hero 초안 문구 수정"
}
```

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "id": "00000000-0000-0000-0000-000000000001",
    "blockKey": "hero-main",
    "blockType": "hero",
    "approvalStatus": "draft",
    "publicationStatus": "draft",
    "version": 2,
    "updatedAt": "2026-07-09T02:51:00Z"
  },
  "message": "콘텐츠가 저장되었습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 401 | UNAUTHENTICATED | token 없음 | 로그인이 필요합니다. |
| 403 | FORBIDDEN | editor 권한 없음 | 접근 권한이 없습니다. |
| 404 | NOT_FOUND | block 없음 | 요청한 콘텐츠를 찾을 수 없습니다. |
| 409 | CONFLICT | approved/published block 직접 수정 시도 | 현재 상태에서는 수정할 수 없습니다. |
| 422 | VALIDATION_ERROR | data schema 오류 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "현재 상태에서는 수정할 수 없습니다.",
    "details": {
      "approvalStatus": "approved"
    }
  }
}
```

### 11. 처리 로직

1. token과 role을 검증한다.
2. `contentBlockId`로 `content_blocks`를 조회한다.
3. block이 삭제되었거나 archived이면 409를 반환한다.
4. request `data`를 block_type별 schema로 검증한다.
5. `createVersion = true`이면 기존 block을 기반으로 새 version row를 생성한다.
6. draft 수정이면 해당 row의 `data`, `updated_by`, `updated_at`을 수정한다.
7. `approval_status`를 `draft`로 유지하거나 변경한다.
8. `audit_logs`에 변경 전/후 데이터를 기록한다.

### 12. 관련 테이블

- 조회 테이블: `content_blocks`, `app_users`
- 생성 테이블: `content_blocks` 새 version, `audit_logs`
- 수정 테이블: `content_blocks`
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: data 필수, block_type별 필수 필드 확인
- 권한 검증: editor 이상
- 상태 검증: published 콘텐츠 직접 수정 금지, 새 version 생성 권장

### 14. 테스트 관점

- 정상 케이스: draft block 수정 성공
- 예외 케이스: schema 오류, block 없음, approved block 직접 수정
- 권한 케이스: viewer는 403

## API ID: CONTENT-API-003
## API명: 콘텐츠 block 승인/반려
## Method: POST
## Endpoint: `/api/v1/admin/content-blocks/{contentBlockId}/approve`

### 1. 설명

- API 목적: 검수 대기 콘텐츠를 승인 또는 반려한다.
- 호출 시점: 승인자가 관리자 검수 화면에서 승인/반려 버튼 클릭 시
- 상태: MVP 이후

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| CONTENT-001 | Claim-safe 콘텐츠 |
| FUT-002 | CMS 연동 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | 콘텐츠 검수 화면 |

### 4. 인증/권한

- 인증 필요 여부: 예
- 접근 가능한 역할: approver, admin
- 접근 불가 시 응답: 401 또는 403

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Authorization | 필수 | Bearer token | `Bearer eyJ...` |
| Content-Type | 필수 | JSON 요청 | `application/json` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| contentBlockId | uuid | 필수 | 승인 대상 block id | `00000000-0000-0000-0000-000000000001` |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| decision | string | 필수 | `approve` 또는 `reject` | 승인 결정 | `approve` |
| note | string | 조건부 | reject 시 필수, 최대 1000자 | 승인/반려 메모 | `미확인 claim 제거 필요` |

JSON 예시:

```json
{
  "decision": "approve",
  "note": "검수 완료"
}
```

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "id": "00000000-0000-0000-0000-000000000001",
    "approvalStatus": "approved",
    "approvedBy": "7c7b4c5d-3ab5-4d9c-9a12-000000000001",
    "approvedAt": "2026-07-09T02:51:00Z"
  },
  "message": "콘텐츠가 승인되었습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 401 | UNAUTHENTICATED | token 없음 | 로그인이 필요합니다. |
| 403 | FORBIDDEN | approver 권한 없음 | 접근 권한이 없습니다. |
| 404 | NOT_FOUND | block 없음 | 요청한 콘텐츠를 찾을 수 없습니다. |
| 409 | CONFLICT | 이미 archived/published 상태 | 현재 상태에서는 처리할 수 없습니다. |
| 422 | VALIDATION_ERROR | decision 오류 또는 반려 메모 누락 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값을 확인해주세요.",
    "details": {
      "note": "반려 시 메모가 필요합니다."
    }
  }
}
```

### 11. 처리 로직

1. token과 approver 권한을 검증한다.
2. `content_blocks`에서 대상 block을 조회한다.
3. block 상태가 `needs_review` 또는 `draft`인지 확인한다.
4. `decision = approve`이면 미확인 claim 검증 결과가 통과되어야 한다.
5. 승인 시 `approval_status = approved`, `approved_by`, `approved_at`을 갱신한다.
6. 반려 시 `approval_status = rejected`로 변경한다.
7. `audit_logs`에 승인/반려 action을 기록한다.

### 12. 관련 테이블

- 조회 테이블: `content_blocks`, `app_users`
- 생성 테이블: `audit_logs`
- 수정 테이블: `content_blocks`
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: decision 필수, reject 시 note 필수
- 권한 검증: approver 이상
- 상태 검증: archived block 처리 금지

### 14. 테스트 관점

- 정상 케이스: needs_review block 승인
- 예외 케이스: 반려 메모 누락, 이미 archived block
- 권한 케이스: editor는 승인 불가

## API ID: MEDIA-API-001
## API명: Media asset 업로드
## Method: POST
## Endpoint: `/api/v1/admin/media-assets`

### 1. 설명

- API 목적: 향후 CMS에서 로컬/승인 대상 이미지 또는 SVG asset을 등록한다.
- 호출 시점: 관리자 media upload 화면에서 파일 선택 후 업로드 시
- 상태: MVP 이후

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| ASSET-001 | 로컬 자산 사용 |
| FUT-002 | CMS 연동 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | Media 관리 화면 |

### 4. 인증/권한

- 인증 필요 여부: 예
- 접근 가능한 역할: editor, approver, admin
- 접근 불가 시 응답: 401 또는 403

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Authorization | 필수 | Bearer token | `Bearer eyJ...` |
| Content-Type | 필수 | multipart form | `multipart/form-data` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| file | file | 필수 | 최대 10MB 초안, 허용 확장자만 | 업로드 파일 | `hero.svg` |
| assetKey | string | 필수 | kebab-case 권장, unique | 내부 asset key | `hero-data-core` |
| assetType | string | 필수 | 허용 enum | asset 유형 | `hero_visual` |
| altText | string | 필수 | 빈 문자열 금지 | 대체 텍스트 | `GTG data core visual` |
| sourceType | string | 필수 | `generated`, `official`, `uploaded` 등 | 출처 | `generated` |
| copyrightNotes | string | 선택 | 최대 2000자 | 권리/승인 메모 | `Generated in-house` |

JSON 예시는 해당 없음. multipart 예시:

```text
Content-Type: multipart/form-data

file=@hero.svg
assetKey=hero-data-core
assetType=hero_visual
altText=GTG data core visual
sourceType=generated
```

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "id": "11111111-1111-1111-1111-111111111111",
    "assetKey": "hero-data-core",
    "filePath": "/generated/hero/gtg-data-core.svg",
    "assetType": "hero_visual",
    "mimeType": "image/svg+xml",
    "approvalStatus": "needs_review",
    "createdAt": "2026-07-09T02:51:00Z"
  },
  "message": "파일이 업로드되었습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 401 | UNAUTHENTICATED | token 없음 | 로그인이 필요합니다. |
| 403 | FORBIDDEN | 업로드 권한 없음 | 접근 권한이 없습니다. |
| 409 | CONFLICT | assetKey 또는 sha256 중복 | 이미 등록된 파일입니다. |
| 413 | PAYLOAD_TOO_LARGE | 파일 크기 초과 | 파일 크기가 허용 범위를 초과했습니다. |
| 415 | UNSUPPORTED_MEDIA_TYPE | 허용되지 않은 MIME/확장자 | 지원하지 않는 파일 형식입니다. |
| 422 | VALIDATION_ERROR | altText 누락 등 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_MEDIA_TYPE",
    "message": "지원하지 않는 파일 형식입니다.",
    "details": {
      "allowedExtensions": [".png", ".jpg", ".jpeg", ".webp", ".svg"]
    }
  }
}
```

### 11. 처리 로직

1. token과 role을 검증한다.
2. multipart 요청에서 file과 metadata를 읽는다.
3. 파일 크기, 확장자, MIME type을 검증한다.
4. SVG인 경우 script, external href, remote image 참조를 검사한다.
5. sha256을 계산해 중복 파일을 확인한다.
6. 파일을 승인된 저장소 경로에 저장한다.
7. `media_assets` row를 `needs_review` 상태로 생성한다.
8. `audit_logs`에 업로드 action을 기록한다.

### 12. 관련 테이블

- 조회 테이블: `media_assets`
- 생성 테이블: `media_assets`, `audit_logs`
- 수정 테이블: 없음
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: file, assetKey, assetType, altText 필수
- 권한 검증: editor 이상
- 상태 검증: 신규 asset은 `needs_review`

### 14. 테스트 관점

- 정상 케이스: 허용 SVG 업로드 성공
- 예외 케이스: 파일 크기 초과, 외부 href 포함 SVG, 중복 assetKey
- 권한 케이스: viewer는 403

## API ID: INQUIRY-API-001
## API명: 문의 제출
## Method: POST
## Endpoint: `/api/v1/inquiries`

### 1. 설명

- API 목적: 향후 Contact 화면에서 사용자가 문의 폼을 제출할 수 있게 한다.
- 호출 시점: 문의 폼 제출 버튼 클릭 시
- 상태: MVP 이후. 현재 MVP는 문의 폼을 제공하지 않는다.

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| FUT-003 | 문의 폼 backend |
| CONTACT-001 | 문의 섹션 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| SCR-CONTACT-001 | Contact 화면 |

### 4. 인증/권한

- 인증 필요 여부: 아니오
- 접근 가능한 역할: public
- 접근 불가 시 응답: 해당 없음
- rate limit 필요 여부: 예, 정책 확인 필요

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Content-Type | 필수 | JSON 요청 | `application/json` |
| Accept | 권장 | JSON 응답 | `application/json` |
| Idempotency-Key | 권장 | 중복 제출 방지 | `inq_20260709_001` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| name | string | 확인 필요 | 최대 120자 | 문의자 이름 | `홍길동` |
| email | string | 조건부 | 이메일 형식, 최대 320자 | 회신 이메일 | `user@example.com` |
| phone | string | 선택 | 최대 40자 | 전화번호 | `010-0000-0000` |
| company | string | 선택 | 최대 255자 | 회사명 | `Example Co.` |
| message | string | 필수 | 1~5000자 | 문의 내용 | `상담 요청합니다.` |
| consentPrivacy | boolean | 필수 | true여야 함 | 개인정보 동의 | `true` |
| sourcePath | string | 선택 | 최대 255자 | 유입 화면 | `/#contact` |

JSON 예시:

```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "phone": "010-0000-0000",
  "company": "Example Co.",
  "message": "Data Streaming 관련 상담을 요청합니다.",
  "consentPrivacy": true,
  "sourcePath": "/#contact"
}
```

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "id": "22222222-2222-2222-2222-222222222222",
    "status": "received",
    "createdAt": "2026-07-09T02:51:00Z"
  },
  "message": "문의가 접수되었습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 400 | BAD_REQUEST | JSON 형식 오류 | 요청 형식을 확인해주세요. |
| 422 | VALIDATION_ERROR | 필수값 누락, 이메일 형식 오류, 동의 없음 | 입력값을 확인해주세요. |
| 429 | RATE_LIMITED | 제출 과다 | 잠시 후 다시 시도해주세요. |
| 500 | INTERNAL_SERVER_ERROR | 저장 실패 | 일시적인 오류가 발생했습니다. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값을 확인해주세요.",
    "details": {
      "consentPrivacy": "개인정보 수집 동의가 필요합니다."
    }
  }
}
```

### 11. 처리 로직

1. 서버는 JSON body를 파싱한다.
2. message와 consentPrivacy를 검증한다.
3. email 또는 phone 중 최소 하나가 필요한지 정책을 확인한다.
4. rate limit과 spam protection을 수행한다.
5. IP는 원문 대신 hash로 처리한다.
6. `inquiries`에 `received` 상태로 저장한다.
7. `inquiry_events`에 `created` 이벤트를 저장한다.
8. 접수 결과를 반환한다.

### 12. 관련 테이블

- 조회 테이블: 없음
- 생성 테이블: `inquiries`, `inquiry_events`
- 수정 테이블: 없음
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: message 필수, consentPrivacy true, email 형식
- 권한 검증: public 제출 가능
- 상태 검증: 신규 문의 상태는 `received`

### 14. 테스트 관점

- 정상 케이스: 필수값과 동의 포함 시 접수 성공
- 예외 케이스: 동의 없음, message 누락, email 형식 오류
- 권한 케이스: 인증 없이 제출 가능

## API ID: INQUIRY-API-002
## API명: 문의 목록 조회
## Method: GET
## Endpoint: `/api/v1/admin/inquiries`

### 1. 설명

- API 목적: 운영자가 접수된 문의 목록을 조회한다.
- 호출 시점: 관리자 문의 목록 화면 진입, 필터 변경, 페이지 변경 시
- 상태: MVP 이후

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| FUT-003 | 문의 폼 backend |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | 문의 관리 화면 |

### 4. 인증/권한

- 인증 필요 여부: 예
- 접근 가능한 역할: operator, admin
- 접근 불가 시 응답: 401 또는 403

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Authorization | 필수 | Bearer token | `Bearer eyJ...` |
| Accept | 권장 | JSON 응답 | `application/json` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| page | integer | 선택 | 1 | 페이지 번호 | `1` |
| size | integer | 선택 | 20 | 페이지 크기, 최대 100 | `20` |
| status | string | 선택 | 없음 | 문의 상태 필터 | `received` |
| assignedTo | uuid | 선택 | 없음 | 담당자 필터 | `7c7b...` |
| q | string | 선택 | 없음 | email/company/message 검색 | `Data Streaming` |
| sort | string | 선택 | `-createdAt` | 정렬 | `-createdAt` |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

JSON 예시: 없음

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "22222222-2222-2222-2222-222222222222",
        "name": "홍길동",
        "emailMasked": "u***@example.com",
        "company": "Example Co.",
        "messagePreview": "Data Streaming 관련 상담...",
        "status": "received",
        "assignedTo": null,
        "createdAt": "2026-07-09T02:51:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "size": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  },
  "message": "조회가 성공했습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 401 | UNAUTHENTICATED | token 없음 | 로그인이 필요합니다. |
| 403 | FORBIDDEN | operator 권한 없음 | 접근 권한이 없습니다. |
| 422 | VALIDATION_ERROR | page/size/status 오류 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "접근 권한이 없습니다.",
    "details": {}
  }
}
```

### 11. 처리 로직

1. token과 operator 권한을 검증한다.
2. query parameter를 검증한다.
3. `inquiries`를 status, assignedTo, q 조건으로 조회한다.
4. 개인정보는 목록 응답에서 마스킹한다.
5. pagination metadata를 계산한다.
6. 목록과 pagination을 반환한다.

### 12. 관련 테이블

- 조회 테이블: `inquiries`, `app_users`
- 생성 테이블: 없음
- 수정 테이블: 없음
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: page >= 1, size <= 100, status enum
- 권한 검증: operator 이상
- 상태 검증: deleted 상태 포함 여부는 query 정책 확인 필요

### 14. 테스트 관점

- 정상 케이스: 목록과 pagination 반환
- 예외 케이스: 잘못된 status, size 초과
- 권한 케이스: editor는 403

## API ID: INQUIRY-API-003
## API명: 문의 상태 변경
## Method: PATCH
## Endpoint: `/api/v1/admin/inquiries/{inquiryId}/status`

### 1. 설명

- API 목적: 운영자가 문의 상태를 변경하고 이력을 남긴다.
- 호출 시점: 문의 상세/목록에서 상태 변경 action 실행 시
- 상태: MVP 이후

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| FUT-003 | 문의 폼 backend |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | 문의 관리 화면 |

### 4. 인증/권한

- 인증 필요 여부: 예
- 접근 가능한 역할: operator, admin
- 접근 불가 시 응답: 401 또는 403

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Authorization | 필수 | Bearer token | `Bearer eyJ...` |
| Content-Type | 필수 | JSON 요청 | `application/json` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| inquiryId | uuid | 필수 | 상태 변경할 문의 id | `22222222-2222-2222-2222-222222222222` |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| status | string | 필수 | 문의 상태 enum | 새 상태 | `triaged` |
| assignedTo | uuid | 선택 | app_users id | 담당자 | `7c7b...` |
| note | string | 선택 | 최대 2000자 | 처리 메모 | `Data Streaming 문의로 분류` |

JSON 예시:

```json
{
  "status": "triaged",
  "assignedTo": "7c7b4c5d-3ab5-4d9c-9a12-000000000001",
  "note": "Data Streaming 문의로 분류"
}
```

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "id": "22222222-2222-2222-2222-222222222222",
    "oldStatus": "received",
    "status": "triaged",
    "assignedTo": "7c7b4c5d-3ab5-4d9c-9a12-000000000001",
    "updatedAt": "2026-07-09T02:51:00Z"
  },
  "message": "문의 상태가 변경되었습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 401 | UNAUTHENTICATED | token 없음 | 로그인이 필요합니다. |
| 403 | FORBIDDEN | operator 권한 없음 | 접근 권한이 없습니다. |
| 404 | NOT_FOUND | 문의 없음 | 요청한 문의를 찾을 수 없습니다. |
| 409 | CONFLICT | 허용되지 않는 상태 전환 | 현재 상태에서는 처리할 수 없습니다. |
| 422 | VALIDATION_ERROR | status enum 오류 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "현재 상태에서는 처리할 수 없습니다.",
    "details": {
      "currentStatus": "closed",
      "requestedStatus": "in_progress"
    }
  }
}
```

### 11. 처리 로직

1. token과 operator 권한을 검증한다.
2. `inquiryId`로 `inquiries`를 조회한다.
3. 요청 status가 enum에 포함되는지 확인한다.
4. 현재 상태에서 다음 상태로 전환 가능한지 확인한다.
5. `inquiries.status`, `assigned_to`, `updated_at`을 수정한다.
6. `inquiry_events`에 상태 변경 이력을 생성한다.
7. 필요한 경우 `audit_logs`를 생성한다.

### 12. 관련 테이블

- 조회 테이블: `inquiries`, `app_users`
- 생성 테이블: `inquiry_events`, `audit_logs`
- 수정 테이블: `inquiries`
- 삭제/비활성화 테이블: 없음

### 13. 검증 규칙

- 입력값 검증: status 필수, assignedTo는 존재하는 active user
- 권한 검증: operator 이상
- 상태 검증: received -> triaged 등 허용 transition만 가능

### 14. 테스트 관점

- 정상 케이스: received 문의를 triaged로 변경
- 예외 케이스: closed 문의를 in_progress로 변경 시도
- 권한 케이스: viewer는 403

## API ID: RELEASE-API-001
## API명: Release 공개 전환
## Method: POST
## Endpoint: `/api/v1/admin/releases/{releaseId}/publish`

### 1. 설명

- API 목적: QA와 운영 승인이 완료된 release를 public 상태로 전환한다.
- 호출 시점: 운영자가 release 관리 화면에서 Publish 버튼 클릭 시
- 상태: MVP 이후

### 2. 관련 기능

| 기능 ID | 기능명 |
|---|---|
| FUT-001 | 최종 SEO 공개 설정 |
| QA-001 | 검증 자동화 |

### 3. 관련 화면

| 화면 ID | 화면명 |
|---|---|
| 확인 필요 | Release 관리 화면 |
| SCR-SEO-001 | Draft SEO Route |

### 4. 인증/권한

- 인증 필요 여부: 예
- 접근 가능한 역할: operator, admin
- 접근 불가 시 응답: 401 또는 403

### 5. Request Headers

| Header | 필수 여부 | 설명 | 예시 |
|---|---|---|---|
| Authorization | 필수 | Bearer token | `Bearer eyJ...` |
| Content-Type | 필수 | JSON 요청 | `application/json` |
| Idempotency-Key | 권장 | 중복 publish 방지 | `rel_home_001` |

### 6. Path Parameters

| 이름 | 타입 | 필수 여부 | 설명 | 예시 |
|---|---|---|---|---|
| releaseId | uuid | 필수 | publish할 release id | `33333333-3333-3333-3333-333333333333` |

### 7. Query Parameters

| 이름 | 타입 | 필수 여부 | 기본값 | 설명 | 예시 |
|---|---|---|---|---|---|
| 없음 | 없음 | 없음 | 없음 | 없음 | 없음 |

### 8. Request Body

| 필드 | 타입 | 필수 여부 | 제약 조건 | 설명 | 예시 |
|---|---|---|---|---|---|
| confirm | boolean | 필수 | true여야 함 | 공개 전환 확인 | `true` |
| note | string | 선택 | 최대 1000자 | 공개 메모 | `MVP 공개 승인` |

JSON 예시:

```json
{
  "confirm": true,
  "note": "MVP 공개 승인"
}
```

### 9. Response Body

성공 응답 JSON 예시:

```json
{
  "success": true,
  "data": {
    "id": "33333333-3333-3333-3333-333333333333",
    "releaseKey": "home-mvp-0.1-rc1",
    "status": "published",
    "publishedAt": "2026-07-09T02:51:00Z"
  },
  "message": "Release가 공개되었습니다."
}
```

### 10. Error Response

| HTTP Status | Error Code | 발생 조건 | 메시지 |
|---|---|---|---|
| 401 | UNAUTHENTICATED | token 없음 | 로그인이 필요합니다. |
| 403 | FORBIDDEN | operator 권한 없음 | 접근 권한이 없습니다. |
| 404 | NOT_FOUND | release 없음 | 요청한 release를 찾을 수 없습니다. |
| 409 | CONFLICT | QA 미통과, 승인 미완료, 이미 publish됨 | 현재 상태에서는 처리할 수 없습니다. |
| 422 | VALIDATION_ERROR | confirm true 아님 | 입력값을 확인해주세요. |

오류 JSON 예시:

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "현재 상태에서는 처리할 수 없습니다.",
    "details": {
      "qaStatus": "failed",
      "required": "passed"
    }
  }
}
```

### 11. 처리 로직

1. token과 operator 권한을 검증한다.
2. `releaseId`로 `release_snapshots`를 조회한다.
3. `qa_status = passed`인지 확인한다.
4. `status = approved` 또는 허용된 publish 전 상태인지 확인한다.
5. 연결된 page, content, media, link, seo 상태가 공개 조건을 만족하는지 확인한다.
6. 트랜잭션 안에서 release status를 `published`로 변경한다.
7. 필요한 경우 이전 published release를 `retired` 또는 archived로 변경한다.
8. `seo_settings` 공개 정책 전환이 필요한 경우 함께 처리한다.
9. `audit_logs`에 publish action을 기록한다.

### 12. 관련 테이블

- 조회 테이블: `release_snapshots`, `pages`, `content_blocks`, `media_assets`, `external_links`, `seo_settings`
- 생성 테이블: `audit_logs`
- 수정 테이블: `release_snapshots`, `pages`, `sections`, `content_blocks`, `seo_settings`
- 삭제/비활성화 테이블: 이전 release retired 처리 가능

### 13. 검증 규칙

- 입력값 검증: confirm true 필수
- 권한 검증: operator 이상
- 상태 검증: QA passed, 운영 승인, SEO 공개 조건 충족

### 14. 테스트 관점

- 정상 케이스: approved + qa_passed release publish 성공
- 예외 케이스: QA failed release publish 차단
- 권한 케이스: qa role은 publish 불가

## 6. Pagination 정책

| 항목 | 정책 |
|---|---|
| 방식 | `page` / `size` 방식 |
| 기본 page | `1` |
| 기본 size | `20` |
| 최대 size | `100` |
| 정렬 query | `sort` |
| 내림차순 표현 | `-createdAt` |
| 적용 API | `INQUIRY-API-002`, 향후 관리자 목록 API |

예시:

```text
GET /api/v1/admin/inquiries?page=1&size=20&status=received&sort=-createdAt
```

## 7. 파일 업로드 API 정책

| 항목 | 정책 |
|---|---|
| 적용 API | `MEDIA-API-001` |
| Content-Type | `multipart/form-data` |
| 최대 파일 크기 | 10MB 초안. 최종 확인 필요 |
| 허용 확장자 | `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg` |
| 허용 MIME | `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml` |
| SVG 제한 | script, remote href, external image 참조 금지 |
| 실패 처리 | 413, 415, 422 중 원인에 맞게 반환 |
| 처리 상태 반환 | 업로드 성공 시 `approvalStatus = needs_review` |

## 8. 인증/권한 API 정책

| 항목 | 필요 여부 | 정책 |
|---|---|---|
| 로그인 | 향후 필요 | `AUTH-API-001` |
| 로그아웃 | 확인 필요 | Bearer token이면 client token 삭제 또는 denylist 필요 여부 확인 |
| 토큰 갱신 | 확인 필요 | refresh token 방식 여부 확인 |
| 내 정보 조회 | 향후 필요 | `AUTH-API-002` |
| 권한 확인 | 향후 필요 | `AUTH-API-002`의 permissions 사용 |
| 비밀번호 재설정 | 확인 필요 | 외부 IdP 사용 시 API 불필요 가능 |

## 9. API와 화면 매핑

| 화면명 | 사용하는 API | 호출 시점 |
|---|---|---|
| 홈페이지 Shell | 현재 없음. 향후 `CONTENT-API-001` | 향후 CMS 전환 시 page 렌더링 |
| Hero 화면 | 현재 없음. 향후 `CONTENT-API-001` | 향후 CMS 전환 시 Hero 콘텐츠 조회 |
| Solutions 화면 | 현재 없음. 향후 `CONTENT-API-001` | 향후 CMS 전환 시 솔루션 콘텐츠 조회 |
| Company / Capability Map 화면 | 현재 없음. 향후 `CONTENT-API-001` | 향후 CMS 전환 시 회사 소개 조회 |
| Contact 화면 | 현재 `mailto:`, `tel:`. 향후 `INQUIRY-API-001` | 문의 폼 제출 시 |
| Draft SEO Route | `SYS-API-001`, `SYS-API-002` | QA/검색 crawler 요청 |
| 관리자 로그인 화면 | `AUTH-API-001` | 로그인 제출 시 |
| 관리자 콘텐츠 편집 화면 | `CONTENT-API-002`, `CONTENT-API-003` | 저장/승인 시 |
| Media 관리 화면 | `MEDIA-API-001` | 파일 업로드 시 |
| 문의 관리 화면 | `INQUIRY-API-002`, `INQUIRY-API-003` | 목록 조회/상태 변경 시 |
| Release 관리 화면 | `RELEASE-API-001` | 공개 전환 시 |

## 10. API와 테이블 매핑

| API | 조회 테이블 | 생성 테이블 | 수정 테이블 | 삭제 테이블 |
|---|---|---|---|---|
| SYS-API-001 | 현재 없음. 향후 `seo_settings` | 없음 | 없음 | 없음 |
| SYS-API-002 | 현재 없음. 향후 `pages`, `seo_settings` | 없음 | 없음 | 없음 |
| AUTH-API-001 | `app_users` | 없음 | `app_users` | 없음 |
| AUTH-API-002 | `app_users` | 없음 | 없음 | 없음 |
| CONTENT-API-001 | `pages`, `sections`, `content_blocks`, `media_assets`, `external_links`, `seo_settings` | 없음 | 없음 | 없음 |
| CONTENT-API-002 | `content_blocks`, `app_users` | `content_blocks`, `audit_logs` | `content_blocks` | 없음 |
| CONTENT-API-003 | `content_blocks`, `app_users` | `audit_logs` | `content_blocks` | 없음 |
| MEDIA-API-001 | `media_assets` | `media_assets`, `audit_logs` | 없음 | 없음 |
| INQUIRY-API-001 | 없음 | `inquiries`, `inquiry_events` | 없음 | 없음 |
| INQUIRY-API-002 | `inquiries`, `app_users` | 없음 | 없음 | 없음 |
| INQUIRY-API-003 | `inquiries`, `app_users` | `inquiry_events`, `audit_logs` | `inquiries` | 없음 |
| RELEASE-API-001 | `release_snapshots`, `pages`, `content_blocks`, `media_assets`, `external_links`, `seo_settings` | `audit_logs` | `release_snapshots`, `pages`, `sections`, `content_blocks`, `seo_settings` | 이전 release retired 가능 |

## 11. 확인 필요 사항

### 인증 방식 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| 관리자 인증 방식 | Bearer JWT, Session Cookie, 외부 IdP 중 선택 필요 |
| token 보관 | localStorage 금지 여부, HttpOnly Cookie 사용 여부 확인 필요 |
| refresh token | 도입 여부와 만료 정책 확인 필요 |
| password 정책 | 자체 인증 시 최소 길이, 복잡도, 잠금 정책 확인 필요 |

### API 정책 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| API base URL | local/staging/production URL 확정 필요 |
| rate limit | 문의 제출, 로그인 실패 제한 정책 필요 |
| CORS | 허용 origin과 credential 정책 확인 필요 |
| Idempotency | 문의 제출, release publish에 적용 범위 확인 필요 |
| 공개 콘텐츠 API | SSG build-time fetch인지 runtime fetch인지 결정 필요 |

### 응답 형식 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| 성공 message | 항상 포함할지, client localization으로 처리할지 확인 필요 |
| field error 형식 | details를 object로 할지 array로 할지 확인 필요 |
| 날짜 표기 | UTC 고정 여부와 client 표시 변환 정책 확인 필요 |

### 외부 연동 미확정 사항

| 항목 | 확인 필요 내용 |
|---|---|
| 이메일 발송 | 문의 접수 알림 email 발송 여부 확인 필요 |
| CRM 연동 | 문의를 CRM으로 전송할지 확인 필요 |
| 파일 저장소 | 로컬 파일시스템, S3 호환 저장소, CMS asset store 중 선택 필요 |
| 보안 검사 | 업로드 파일 antivirus 또는 SVG sanitizer 도입 여부 확인 필요 |
| Analytics | 방문/문의 이벤트 추적 여부와 개인정보/쿠키 정책 확인 필요 |
