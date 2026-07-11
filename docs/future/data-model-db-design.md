# 데이터 모델 / DB 설계서

> **FUTURE-ONLY DRAFT.** 현재 제품에는 database, schema, migration, ORM, CMS 또는 문의 저장 기능이 없다. 이 문서는 명시적인 운영 요구와 별도 승인 전까지 구현 기준이 아니다. 현재 상태는 `../CURRENT.md`를 따른다.

문서 작성일: 2026-07-09  
프로젝트명: GTG Solutions & Consult 인터랙션 프로토타입  
기준 버전: MVP v0.1 Draft  
DBMS 기준: PostgreSQL 우선 설계

## 1. 문서 개요

### 문서 목적

이 문서는 GTG Solutions & Consult 공식 홈페이지 MVP 및 향후 확장 기능에서 저장해야 할 데이터, 테이블 구조, 관계, 제약조건, 상태값, 인덱스, 데이터 흐름을 정의한다.

중요 전제:

- 현재 MVP는 Next.js 기반 프론트엔드 중심 공식 홈페이지이며, backend, database, authentication을 포함하지 않는다.
- 현재 MVP의 콘텐츠는 코드와 로컬 asset으로 관리한다.
- 따라서 MVP 완료를 위해 필수로 생성해야 하는 운영 DB 테이블은 없다.
- 이 문서의 테이블 설계와 DDL은 향후 CMS, 문의 폼 backend, 콘텐츠 승인 workflow, 고객 proof 관리, 공개 SEO 전환 관리가 승인될 경우 사용할 수 있는 PostgreSQL 기준 확장 설계이다.

### 대상 독자

| 대상 독자 | 활용 목적 |
|---|---|
| 백엔드 개발자 | 향후 CMS/문의 폼/API 도입 시 DB 스키마 구현 |
| 프론트엔드 개발자 | 현재 정적 콘텐츠 구조가 어떤 DB 엔티티로 확장될지 이해 |
| Product Manager | MVP 제외 범위와 향후 데이터 저장 범위 판단 |
| QA 담당자 | 상태값, 데이터 흐름, 제약조건 기반 테스트 케이스 도출 |
| 운영 담당자 | 콘텐츠 승인, 문의 처리, 공개 SEO 전환 데이터 관리 기준 확인 |
| 개인정보/보안 검수 담당자 | 개인정보 저장 여부, 보관 기간, 감사 로그 필요성 검토 |

### 기준 버전

| 항목 | 내용 |
|---|---|
| 기준 버전 | MVP v0.1 Draft |
| 현재 DB 사용 여부 | 사용하지 않음 |
| 향후 설계 기준 | PostgreSQL |
| 인증/권한 | MVP 없음. 향후 내부 운영자 계정 필요 시 별도 도입 |
| 개인정보 저장 | MVP 없음. 향후 문의 폼 도입 시 저장 가능성 있음 |

### 관련 문서

| 문서 | 경로 |
|---|---|
| 프로젝트 기본 정보 | `../archive/2026-07/planning/project-basic-info.md` |
| 요구사항 정의서 / PRD | `../archive/2026-07/planning/prd.md` |
| 기능 명세서 | `../archive/2026-07/planning/functional-spec.md` |
| 화면 설계서 / UX Flow | `../archive/2026-07/planning/ux-flow.md` |
| 콘텐츠 요구사항 | `docs/content-requirements.md` |
| 승인 콘텐츠 초안 | `docs/approved-content.md` |

## 2. 데이터 설계 원칙

### 현재 MVP 데이터 저장 방침

| 항목 | MVP 방침 |
|---|---|
| 사용자 계정 | 저장하지 않는다. |
| 방문자 행동 로그 | 저장하지 않는다. |
| 문의 데이터 | 저장하지 않는다. `mailto:`, `tel:`, 외부 문의 페이지 링크만 사용한다. |
| 콘텐츠 데이터 | 코드의 TypeScript 상수와 Markdown 문서로 관리한다. |
| 이미지/자산 | `public` 하위 로컬 파일로 관리한다. |
| SEO 정책 | Next.js route와 metadata 코드로 관리한다. |

### 정규화 기준

| 기준 | 설계 원칙 |
|---|---|
| 1차 정규화 | 반복 가능한 콘텐츠 항목은 별도 행으로 분리한다. 예: page, section, content block, media asset |
| 2차 정규화 | 다대다 관계는 junction table로 분리한다. 예: content_block_media |
| 3차 정규화 | 운영자, asset, link, inquiry, audit log는 독립 엔티티로 관리한다. |
| JSONB 사용 | 화면 copy처럼 구조가 자주 바뀔 수 있는 콘텐츠 payload는 `jsonb`로 저장할 수 있다. PostgreSQL 의존 기능이다. |
| lookup table 여부 | 초기에는 `CHECK` constraint로 상태값을 제한하고, 상태값이 자주 바뀌면 lookup table로 분리한다. |

### 삭제 정책

| 데이터 유형 | 권장 삭제 방식 | 이유 |
|---|---|---|
| 콘텐츠 페이지/섹션/block | 논리 삭제 | 공개 이력과 rollback 가능성을 보존해야 한다. |
| 미디어 asset | 아카이브 후 물리 삭제 검토 | 공개 중인 콘텐츠가 참조할 수 있으므로 즉시 삭제하면 안 된다. |
| 외부 링크 | 논리 삭제 | 과거 release snapshot과 감사 추적이 필요하다. |
| 문의 데이터 | 보존 기간 후 물리 삭제 또는 익명화 | 개인정보 가능성이 있으므로 보관 기간이 지나면 삭제해야 한다. |
| 감사 로그 | 아카이브 | 운영 추적 목적으로 일정 기간 보존이 필요하다. |
| 운영자 계정 | 비활성화 | 과거 작업 이력을 유지해야 한다. |

### 상태값 관리 방식

| 상태값 영역 | 관리 방식 |
|---|---|
| 콘텐츠 승인 상태 | `draft`, `needs_review`, `approved`, `rejected`, `archived` |
| 공개 상태 | `draft`, `blocked`, `ready`, `published`, `retired` |
| 자산 승인 상태 | `draft`, `needs_review`, `approved`, `blocked`, `archived` |
| 문의 상태 | `received`, `triaged`, `in_progress`, `replied`, `closed`, `spam`, `deleted` |
| release 상태 | `draft`, `qa_running`, `qa_passed`, `approved`, `published`, `rolled_back`, `archived` |
| 사용자 상태 | `active`, `inactive`, `locked` |

상태값 추가 가능성이 높아지면 CHECK constraint 대신 `*_statuses` lookup table로 전환해야 한다.

### 이력 관리 방식

| 이력 대상 | 관리 방식 |
|---|---|
| 콘텐츠 변경 | `content_blocks.version`과 `release_snapshots`로 관리한다. |
| 문의 상태 변경 | `inquiry_events`에 상태 변경 이벤트를 누적한다. |
| 승인/게시 작업 | `audit_logs`에 actor, action, entity, before/after를 기록한다. |
| 코드 기반 MVP | Git commit 이력과 Markdown 문서 변경 이력을 기준으로 한다. |

### 감사 로그 필요 여부

| 기능 | 감사 로그 필요 여부 | 이유 |
|---|---|---|
| MVP 정적 홈페이지 | 필요 없음 | DB 저장과 운영자 action이 없다. |
| CMS 콘텐츠 수정 | 필요 | 공개 문구와 claim 변경 이력 추적 필요 |
| 고객 proof 승인 | 필요 | 고객명/로고 공개 승인 근거 추적 필요 |
| 문의 상태 변경 | 필요 | 개인정보 및 고객 문의 처리 이력 추적 필요 |
| SEO 공개 전환 | 필요 | noindex 해제와 public release 책임 추적 필요 |

### 개인정보/민감정보 처리 기준

| 항목 | 기준 |
|---|---|
| MVP | 개인정보를 저장하지 않는다. |
| 문의 폼 도입 시 | 이름, 이메일, 회사명, 전화번호, 문의 내용을 개인정보 가능 데이터로 취급한다. |
| IP/User-Agent | 원문 저장을 피하고 필요 시 hash 또는 축약 저장을 검토한다. |
| 마스킹 | 운영 목록에서는 email, phone을 부분 마스킹해야 한다. |
| 보관 기간 | 확인 필요. 기본 제안은 문의 종료 후 1년 보관 후 삭제 또는 익명화이다. |
| 암호화 | DB 저장 시 email, phone, message 암호화 필요 여부 확인 필요. |

### 확장성 고려사항

| 확장 방향 | 설계 고려 |
|---|---|
| CMS 도입 | page, section, content block 구조로 콘텐츠를 분리한다. |
| 다국어 | `locale` 컬럼을 page/block 단위에 둔다. |
| 공개 release 관리 | release snapshot을 별도 테이블로 관리한다. |
| 문의 backend | inquiries와 inquiry_events를 분리한다. |
| 고객 proof 관리 | customer_references와 media_assets를 연결한다. |
| SEO 공개 전환 | seo_settings를 page별로 관리한다. |

## 3. 핵심 엔티티 목록

| 엔티티명 | 설명 | 주요 데이터 | 관련 기능 | 중요도 |
|---|---|---|---|---|
| app_users | 향후 CMS/운영 기능을 사용할 내부 운영자 | email, display_name, role, status | FUT-002, FUT-003, QA/운영 | 향후 중요 |
| pages | 홈페이지, Not Found 등 공개 page 단위 | page_key, route, title, locale, status | PAGE-001, ERR-001 | 향후 중요 |
| sections | page 안의 Hero, Solutions, Company 등 section | section_key, anchor_id, sort_order | NAV-001, SOL-001 | 향후 중요 |
| content_blocks | section 안의 실제 콘텐츠 payload | block_key, block_type, data, approval_status, version | HERO-003, SOL-001, COMP-001 | 향후 중요 |
| media_assets | 로컬 이미지, SVG, 로고, OG image asset | file_path, asset_type, alt_text, approval_status | ASSET-001, FUT-001 | 향후 중요 |
| content_block_media | 콘텐츠 block과 media asset의 연결 | content_block_id, media_asset_id, usage_type | HERO-001, SOL-001 | 향후 중요 |
| external_links | CTA, mailto, tel, policy, canonical 링크 | label, url, link_type, approval_status | CONTACT-001, SEO-001 | 향후 중요 |
| customer_references | 고객명/고객 로고 공개 승인 관리 | display_name, logo_asset_id, public_display_approval | CONTENT-001 | 향후 중요 |
| seo_settings | page별 SEO와 draft/public 정책 | title, description, canonical_url, robots_policy, og_image | SEO-001, FUT-001 | 향후 중요 |
| release_snapshots | 특정 시점 공개 콘텐츠와 QA 승인 이력 | release_key, status, qa_status, published_at | QA-001, FUT-001 | 향후 중요 |
| inquiries | 향후 문의 폼으로 접수되는 사용자 문의 | name, email, company, message, consent, status | FUT-003 | MVP 제외 |
| inquiry_events | 문의 상태 변경 이력 | inquiry_id, event_type, old_status, new_status | FUT-003 | MVP 제외 |
| audit_logs | 운영자 action 감사 로그 | actor, action, entity, before_data, after_data | FUT-002, FUT-003 | 향후 중요 |

## 4. ERD 텍스트 표현

현재 MVP:

```text
No persistent database
Static TypeScript content + Markdown docs + local public assets
```

향후 확장 ERD:

```text
app_users 1:N pages.created_by
app_users 1:N pages.updated_by
app_users 1:N content_blocks.created_by
app_users 1:N content_blocks.updated_by
app_users 1:N release_snapshots.approved_by
app_users 1:N audit_logs.actor_user_id

pages 1:N sections
pages 1:1 seo_settings
sections 1:N content_blocks
content_blocks N:M media_assets through content_block_media
content_blocks N:M external_links through content_block_links

media_assets 1:N customer_references.logo_asset_id
media_assets 1:N seo_settings.og_image_asset_id

release_snapshots 1:N audit_logs

inquiries 1:N inquiry_events
app_users 1:N inquiry_events.actor_user_id
app_users 1:N inquiries.assigned_to
```

## 5. 테이블 상세 설계

## 테이블명: app_users

### 1. 테이블 목적

- 향후 CMS, 문의 관리, SEO 공개 전환 등 내부 운영 기능을 사용할 사용자 계정을 저장한다.
- MVP에서는 사용하지 않는다.
- 비밀번호 직접 저장은 기본 범위에서 제외하고, 외부 IdP 또는 별도 인증 정책을 확인해야 한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 사용자 식별자 |
| email | varchar(320) | NO | 없음 | NO | NO | YES | 운영자 이메일 |
| display_name | varchar(120) | NO | 없음 | NO | NO | NO | 표시 이름 |
| role | varchar(30) | NO | `editor` | NO | NO | NO | 기본 역할 |
| status | varchar(30) | NO | `active` | NO | NO | NO | 계정 상태 |
| external_identity_id | varchar(255) | YES | 없음 | NO | NO | YES | 외부 인증 식별자 |
| last_login_at | timestamptz | YES | 없음 | NO | NO | NO | 마지막 로그인 시각 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 비활성/삭제 시각 |

### 3. 제약조건

- Primary Key: `id`
- Unique: `lower(email)`
- Unique: `external_identity_id`
- Not Null: `email`, `display_name`, `role`, `status`, `created_at`, `updated_at`
- Check Constraint:
  - `role IN ('viewer', 'editor', 'approver', 'qa', 'operator', 'admin')`
  - `status IN ('active', 'inactive', 'locked')`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_app_users_email_lower | `lower(email)` | UNIQUE btree | 이메일 중복 방지 |
| ux_app_users_external_identity_id | `external_identity_id` | UNIQUE btree | 외부 인증 중복 방지 |
| ix_app_users_status | `status` | btree | 활성/비활성 계정 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| pages | 1:N | page 생성/수정자 |
| content_blocks | 1:N | 콘텐츠 생성/수정자 |
| inquiries | 1:N | 문의 배정 담당자 |
| inquiry_events | 1:N | 문의 상태 변경 actor |
| audit_logs | 1:N | 감사 로그 actor |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| active | 사용 가능 | 계정 생성 또는 재활성화 | inactive, locked |
| inactive | 비활성 | 퇴사/권한 회수 | active |
| locked | 잠김 | 보안 정책 또는 로그인 실패 정책 | active, inactive |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 운영자 초대 | app_users 생성 | 없음 | 없음 |
| 역할 변경 | 없음 | role 수정 | 없음 |
| 계정 비활성화 | 없음 | status 변경 | deleted_at 설정 |

### 8. 예시 데이터

```json
{
  "id": "7c7b4c5d-3ab5-4d9c-9a12-000000000001",
  "email": "editor@example.com",
  "display_name": "Content Editor",
  "role": "editor",
  "status": "active"
}
```

## 테이블명: pages

### 1. 테이블 목적

- 공개 페이지 단위를 저장한다.
- 현재 제품은 단일 홈페이지 중심이지만, 향후 Not Found, 서비스 상세, 다국어 페이지 확장을 고려한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 페이지 식별자 |
| page_key | varchar(80) | NO | 없음 | NO | NO | YES | 내부 페이지 키 |
| route | varchar(255) | NO | 없음 | NO | NO | YES | URL route |
| title | varchar(255) | NO | 없음 | NO | NO | NO | 페이지 제목 |
| locale | varchar(10) | NO | `ko` | NO | NO | NO | 언어 코드 |
| status | varchar(30) | NO | `draft` | NO | NO | NO | 페이지 공개 상태 |
| created_by | uuid | YES | 없음 | NO | YES | NO | 생성자 |
| updated_by | uuid | YES | 없음 | NO | YES | NO | 수정자 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 삭제 시각 |
| version | integer | NO | 1 | NO | NO | NO | 페이지 버전 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key: `created_by`, `updated_by` -> `app_users.id`
- Unique: `page_key`, `route`
- Check Constraint:
  - `status IN ('draft', 'blocked', 'ready', 'published', 'retired')`
  - `version >= 1`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_pages_page_key | `page_key` | UNIQUE btree | page key 중복 방지 |
| ux_pages_route | `route` | UNIQUE btree | route 중복 방지 |
| ix_pages_status_locale | `status`, `locale` | btree | 공개 page 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| sections | 1:N | page는 여러 section을 가진다. |
| seo_settings | 1:1 | page는 하나의 SEO 설정을 가진다. |
| app_users | N:1 | 생성/수정자 |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft | 초안 | 신규 생성 | blocked, ready |
| blocked | 공개 불가 | QA/검수 실패 | draft, ready |
| ready | 공개 준비 | QA/검수 통과 | published, blocked |
| published | 공개 중 | 운영 승인 | retired |
| retired | 공개 종료 | 대체 page 공개 | draft |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 새 page 정의 | pages 생성 | 없음 | 없음 |
| route 변경 | 없음 | route/version 수정 | 없음 |
| page 폐기 | 없음 | status 변경 | deleted_at 설정 가능 |

### 8. 예시 데이터

```json
{
  "page_key": "home",
  "route": "/",
  "title": "GTG Solutions & Consult",
  "locale": "ko",
  "status": "draft",
  "version": 1
}
```

## 테이블명: sections

### 1. 테이블 목적

- page 안의 화면 section을 저장한다.
- Hero, Solutions, Company, Engagement, Contact 등 앵커 이동 대상과 표시 순서를 관리한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 섹션 식별자 |
| page_id | uuid | NO | 없음 | NO | YES | NO | 소속 page |
| section_key | varchar(80) | NO | 없음 | NO | NO | NO | 내부 섹션 키 |
| display_name | varchar(120) | NO | 없음 | NO | NO | NO | 표시/관리명 |
| anchor_id | varchar(80) | NO | 없음 | NO | NO | NO | URL hash id |
| sort_order | integer | NO | 0 | NO | NO | NO | 표시 순서 |
| status | varchar(30) | NO | `draft` | NO | NO | NO | 섹션 상태 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 삭제 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key: `page_id` -> `pages.id`
- Unique: `(page_id, section_key)`, `(page_id, anchor_id)`
- Check Constraint:
  - `sort_order >= 0`
  - `status IN ('draft', 'blocked', 'ready', 'published', 'retired')`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_sections_page_section_key | `page_id`, `section_key` | UNIQUE btree | page 내 section key 중복 방지 |
| ux_sections_page_anchor_id | `page_id`, `anchor_id` | UNIQUE btree | hash anchor 중복 방지 |
| ix_sections_page_order | `page_id`, `sort_order` | btree | 페이지 렌더 순서 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| pages | N:1 | 한 page에 속한다. |
| content_blocks | 1:N | section은 여러 콘텐츠 block을 가진다. |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft | 초안 | 신규 생성 | blocked, ready |
| blocked | 공개 불가 | 검수 실패 | draft, ready |
| ready | 공개 준비 | 검수 통과 | published |
| published | 공개 중 | release 반영 | retired |
| retired | 사용 종료 | IA 변경 | draft |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 새 섹션 추가 | sections 생성 | 없음 | 없음 |
| 섹션 순서 변경 | 없음 | sort_order 수정 | 없음 |
| 섹션 제거 | 없음 | status 변경 | deleted_at 설정 가능 |

### 8. 예시 데이터

```json
{
  "section_key": "solutions",
  "display_name": "Solutions",
  "anchor_id": "solutions",
  "sort_order": 20,
  "status": "draft"
}
```

## 테이블명: content_blocks

### 1. 테이블 목적

- 실제 화면에 표시되는 콘텐츠 payload를 저장한다.
- Hero copy, 솔루션 목록, 회사 소개, 수행 모델, Contact 문구 등을 block 단위로 관리한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 콘텐츠 block 식별자 |
| section_id | uuid | NO | 없음 | NO | YES | NO | 소속 section |
| block_key | varchar(100) | NO | 없음 | NO | NO | NO | block 내부 키 |
| block_type | varchar(50) | NO | 없음 | NO | NO | NO | block 유형 |
| locale | varchar(10) | NO | `ko` | NO | NO | NO | 언어 코드 |
| data | jsonb | NO | `'{}'::jsonb` | NO | NO | NO | 콘텐츠 payload |
| approval_status | varchar(30) | NO | `draft` | NO | NO | NO | 승인 상태 |
| publication_status | varchar(30) | NO | `draft` | NO | NO | NO | 공개 상태 |
| version | integer | NO | 1 | NO | NO | NO | 콘텐츠 버전 |
| created_by | uuid | YES | 없음 | NO | YES | NO | 생성자 |
| updated_by | uuid | YES | 없음 | NO | YES | NO | 수정자 |
| approved_by | uuid | YES | 없음 | NO | YES | NO | 승인자 |
| approved_at | timestamptz | YES | 없음 | NO | NO | NO | 승인 시각 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 삭제 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key:
  - `section_id` -> `sections.id`
  - `created_by`, `updated_by`, `approved_by` -> `app_users.id`
- Unique: `(section_id, block_key, locale, version)`
- Check Constraint:
  - `block_type IN ('navigation', 'hero', 'solution', 'company', 'capability_map', 'engagement', 'contact', 'footer', 'seo', 'text', 'list')`
  - `approval_status IN ('draft', 'needs_review', 'approved', 'rejected', 'archived')`
  - `publication_status IN ('draft', 'blocked', 'ready', 'published', 'retired')`
  - `version >= 1`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_content_blocks_identity | `section_id`, `block_key`, `locale`, `version` | UNIQUE btree | 콘텐츠 버전 중복 방지 |
| ix_content_blocks_section_status | `section_id`, `publication_status` | btree | 렌더 대상 block 조회 |
| ix_content_blocks_approval | `approval_status` | btree | 검수 대기 block 조회 |
| ix_content_blocks_data_gin | `data` | GIN | JSONB 내부 검색 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| sections | N:1 | section 안에 속한다. |
| media_assets | N:M | content_block_media로 연결된다. |
| external_links | N:M | content_block_links로 연결된다. |
| app_users | N:1 | 생성/수정/승인자 |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft | 작성 중 | 신규 생성 | needs_review, archived |
| needs_review | 검수 대기 | 작성 완료 | approved, rejected |
| approved | 승인 완료 | 검수 통과 | archived |
| rejected | 반려 | 검수 실패 | draft, archived |
| archived | 보관 | 사용 종료 | draft |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 새 copy 작성 | content_blocks 생성 | 없음 | 없음 |
| copy 수정 | 새 version 생성 권장 | 기존 row 수정은 draft에서만 허용 | 없음 |
| 승인 | 없음 | approval_status, approved_by, approved_at 수정 | 없음 |
| 사용 종료 | 없음 | publication_status 변경 | deleted_at 설정 가능 |

### 8. 예시 데이터

```json
{
  "block_key": "hero-main",
  "block_type": "hero",
  "locale": "ko",
  "approval_status": "needs_review",
  "publication_status": "draft",
  "version": 1,
  "data": {
    "eyebrow": "GTG Solutions & Consult",
    "headline": "확인 필요",
    "primaryCta": {
      "label": "문의하기",
      "href": "#contact"
    }
  }
}
```

## 테이블명: media_assets

### 1. 테이블 목적

- 로컬 이미지, SVG, 로고, OG image, generated asset 등의 메타데이터를 저장한다.
- 외부 hotlink를 방지하고 asset 승인 상태를 관리한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | asset 식별자 |
| asset_key | varchar(120) | NO | 없음 | NO | NO | YES | 내부 asset key |
| file_path | varchar(500) | NO | 없음 | NO | NO | YES | public 기준 로컬 경로 |
| asset_type | varchar(40) | NO | 없음 | NO | NO | NO | asset 유형 |
| mime_type | varchar(100) | NO | 없음 | NO | NO | NO | MIME type |
| alt_text | text | NO | 없음 | NO | NO | NO | 대체 텍스트 |
| source_type | varchar(40) | NO | `local` | NO | NO | NO | 생성/공식/업로드 등 출처 |
| approval_status | varchar(30) | NO | `draft` | NO | NO | NO | 승인 상태 |
| width | integer | YES | 없음 | NO | NO | NO | 이미지 폭 |
| height | integer | YES | 없음 | NO | NO | NO | 이미지 높이 |
| sha256 | char(64) | YES | 없음 | NO | NO | YES | 파일 해시 |
| copyright_notes | text | YES | 없음 | NO | NO | NO | 권리/승인 메모 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 삭제/아카이브 시각 |

### 3. 제약조건

- Primary Key: `id`
- Unique: `asset_key`, `file_path`, `sha256`
- Check Constraint:
  - `asset_type IN ('brand_logo', 'favicon', 'hero_visual', 'solution_visual', 'capability_map', 'customer_logo', 'og_image', 'icon', 'other')`
  - `source_type IN ('local', 'generated', 'official', 'uploaded', 'external_reference')`
  - `approval_status IN ('draft', 'needs_review', 'approved', 'blocked', 'archived')`
  - `file_path NOT LIKE 'http://%' AND file_path NOT LIKE 'https://%'`
  - `width IS NULL OR width > 0`
  - `height IS NULL OR height > 0`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_media_assets_asset_key | `asset_key` | UNIQUE btree | asset key 중복 방지 |
| ux_media_assets_file_path | `file_path` | UNIQUE btree | 파일 경로 중복 방지 |
| ix_media_assets_type_status | `asset_type`, `approval_status` | btree | 승인된 asset 조회 |
| ux_media_assets_sha256 | `sha256` | UNIQUE btree | 동일 파일 중복 방지 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| content_block_media | 1:N | 콘텐츠 block과 연결 |
| customer_references | 1:N | 고객 로고 asset |
| seo_settings | 1:N | OG image asset |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft | 등록 초안 | asset 신규 등록 | needs_review, archived |
| needs_review | 권리/품질 검수 대기 | 등록 완료 | approved, blocked |
| approved | 사용 승인 | 검수 통과 | archived |
| blocked | 사용 금지 | 권리/유사도/품질 문제 | draft, archived |
| archived | 보관 | 사용 종료 | draft |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| asset 추가 | media_assets 생성 | 없음 | 없음 |
| alt text 수정 | 없음 | alt_text 수정 | 없음 |
| 사용 승인 | 없음 | approval_status 수정 | 없음 |
| 사용 중단 | 없음 | approval_status 수정 | deleted_at 설정 가능 |

### 8. 예시 데이터

```json
{
  "asset_key": "gtg-capability-map-desktop",
  "file_path": "/generated/topology/gtg-capability-map.svg",
  "asset_type": "capability_map",
  "mime_type": "image/svg+xml",
  "alt_text": "GTG capability map linking analytics, streaming, automation, DevOps quality, consulting, and technical support.",
  "source_type": "generated",
  "approval_status": "needs_review"
}
```

## 테이블명: content_block_media

### 1. 테이블 목적

- 콘텐츠 block과 media asset의 다대다 관계를 저장한다.
- 하나의 block이 여러 visual을 사용하거나 하나의 asset이 여러 block에서 재사용되는 경우를 지원한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 관계 식별자 |
| content_block_id | uuid | NO | 없음 | NO | YES | NO | 콘텐츠 block |
| media_asset_id | uuid | NO | 없음 | NO | YES | NO | media asset |
| usage_type | varchar(40) | NO | 없음 | NO | NO | NO | 사용 목적 |
| sort_order | integer | NO | 0 | NO | NO | NO | 표시 순서 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key:
  - `content_block_id` -> `content_blocks.id`
  - `media_asset_id` -> `media_assets.id`
- Unique: `(content_block_id, media_asset_id, usage_type)`
- Check Constraint:
  - `usage_type IN ('primary', 'fallback', 'thumbnail', 'logo', 'background', 'og', 'inline')`
  - `sort_order >= 0`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_content_block_media_usage | `content_block_id`, `media_asset_id`, `usage_type` | UNIQUE btree | 중복 연결 방지 |
| ix_content_block_media_block_order | `content_block_id`, `sort_order` | btree | block별 asset 순서 조회 |
| ix_content_block_media_asset | `media_asset_id` | btree | asset 사용처 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| content_blocks | N:1 | 연결된 콘텐츠 block |
| media_assets | N:1 | 연결된 media asset |

### 6. 상태값

상태값 없음. 상태는 연결된 content block과 media asset의 상태를 따른다.

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| asset 연결 | 관계 row 생성 | 없음 | 없음 |
| 표시 순서 변경 | 없음 | sort_order 수정 | 없음 |
| asset 연결 해제 | 없음 | 없음 | row 물리 삭제 가능 |

### 8. 예시 데이터

```json
{
  "usage_type": "fallback",
  "sort_order": 0
}
```

## 테이블명: external_links

### 1. 테이블 목적

- CTA, 이메일, 전화, 정책, canonical 등 외부 또는 특수 protocol 링크를 관리한다.
- 링크 승인과 유효성 검증 상태를 추적한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 링크 식별자 |
| link_key | varchar(120) | NO | 없음 | NO | NO | YES | 내부 링크 key |
| label | varchar(255) | NO | 없음 | NO | NO | NO | 링크 표시명 |
| url | text | NO | 없음 | NO | NO | NO | URL 또는 protocol |
| link_type | varchar(40) | NO | 없음 | NO | NO | NO | 링크 유형 |
| approval_status | varchar(30) | NO | `draft` | NO | NO | NO | 승인 상태 |
| last_checked_at | timestamptz | YES | 없음 | NO | NO | NO | 마지막 검증 시각 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 삭제 시각 |

### 3. 제약조건

- Primary Key: `id`
- Unique: `link_key`
- Check Constraint:
  - `link_type IN ('cta', 'email', 'phone', 'policy', 'canonical', 'social', 'external_reference')`
  - `approval_status IN ('draft', 'needs_review', 'approved', 'rejected', 'archived')`
  - `url <> ''`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_external_links_key | `link_key` | UNIQUE btree | key 중복 방지 |
| ix_external_links_type_status | `link_type`, `approval_status` | btree | 승인된 링크 조회 |
| ix_external_links_last_checked | `last_checked_at` | btree | 링크 재검증 대상 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| content_block_links | 1:N | 콘텐츠 block과 연결 |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft | 초안 | 신규 등록 | needs_review, archived |
| needs_review | 검수 대기 | 링크 등록 완료 | approved, rejected |
| approved | 사용 승인 | 검수 통과 | archived |
| rejected | 반려 | URL/정책 오류 | draft, archived |
| archived | 사용 종료 | 링크 폐기 | draft |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 새 CTA 추가 | external_links 생성 | 없음 | 없음 |
| URL 변경 | 없음 | url/version 이력은 audit_logs 사용 | 없음 |
| 링크 폐기 | 없음 | approval_status 변경 | deleted_at 설정 가능 |

### 8. 예시 데이터

```json
{
  "link_key": "contact-email",
  "label": "이메일 문의",
  "url": "mailto:webmaster@gtgsc.com",
  "link_type": "email",
  "approval_status": "needs_review"
}
```

## 테이블명: content_block_links

### 1. 테이블 목적

- 콘텐츠 block과 external link의 연결 관계를 저장한다.
- Hero CTA, solution CTA, contact CTA 등 block별 링크 사용처를 추적한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 관계 식별자 |
| content_block_id | uuid | NO | 없음 | NO | YES | NO | 콘텐츠 block |
| external_link_id | uuid | NO | 없음 | NO | YES | NO | 외부 링크 |
| usage_type | varchar(40) | NO | 없음 | NO | NO | NO | 링크 사용 목적 |
| sort_order | integer | NO | 0 | NO | NO | NO | 표시 순서 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key:
  - `content_block_id` -> `content_blocks.id`
  - `external_link_id` -> `external_links.id`
- Unique: `(content_block_id, external_link_id, usage_type)`
- Check Constraint:
  - `usage_type IN ('primary_cta', 'secondary_cta', 'email', 'phone', 'policy', 'canonical')`
  - `sort_order >= 0`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_content_block_links_usage | `content_block_id`, `external_link_id`, `usage_type` | UNIQUE btree | 중복 연결 방지 |
| ix_content_block_links_block_order | `content_block_id`, `sort_order` | btree | block별 링크 순서 조회 |
| ix_content_block_links_link | `external_link_id` | btree | 링크 사용처 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| content_blocks | N:1 | 콘텐츠 block |
| external_links | N:1 | 연결 링크 |

### 6. 상태값

상태값 없음. 연결된 block과 link의 상태를 따른다.

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 링크 연결 | row 생성 | 없음 | 없음 |
| 순서 변경 | 없음 | sort_order 수정 | 없음 |
| 연결 제거 | 없음 | 없음 | row 물리 삭제 가능 |

### 8. 예시 데이터

```json
{
  "usage_type": "primary_cta",
  "sort_order": 0
}
```

## 테이블명: customer_references

### 1. 테이블 목적

- 고객명/고객 로고/대표 고객 표시의 공개 승인 상태를 관리한다.
- 확인되지 않은 고객 proof 사용을 막기 위해 승인 근거와 상태를 분리 저장한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 고객 reference 식별자 |
| customer_key | varchar(120) | NO | 없음 | NO | NO | YES | 내부 고객 key |
| display_name | varchar(255) | NO | 없음 | NO | NO | NO | 표시 이름 |
| logo_asset_id | uuid | YES | 없음 | NO | YES | NO | 고객 로고 asset |
| proof_label | varchar(80) | NO | `Representative customer` | NO | NO | NO | 화면 표시 label |
| public_display_approval | varchar(40) | NO | `needs_written_approval` | NO | NO | NO | 공개 승인 상태 |
| approval_source | text | YES | 없음 | NO | NO | NO | 승인 근거 |
| approval_date | date | YES | 없음 | NO | NO | NO | 승인일 |
| status | varchar(30) | NO | `draft` | NO | NO | NO | reference 상태 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 삭제 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key: `logo_asset_id` -> `media_assets.id`
- Unique: `customer_key`
- Check Constraint:
  - `public_display_approval IN ('not_requested', 'needs_written_approval', 'approved', 'rejected')`
  - `status IN ('draft', 'needs_review', 'approved', 'blocked', 'archived')`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_customer_references_key | `customer_key` | UNIQUE btree | 고객 key 중복 방지 |
| ix_customer_references_approval | `public_display_approval` | btree | 승인 상태별 조회 |
| ix_customer_references_logo | `logo_asset_id` | btree | 로고 asset 사용처 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| media_assets | N:1 | 고객 로고 asset |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft | 초안 등록 | 신규 등록 | needs_review |
| needs_review | 승인 검토 대기 | 고객 proof 사용 요청 | approved, blocked |
| approved | 공개 사용 가능 | 서면 승인 확인 | archived |
| blocked | 공개 사용 금지 | 승인 거부/불명확 | needs_review, archived |
| archived | 사용 종료 | 고객 표시 제거 | draft |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 고객 proof 후보 등록 | customer_references 생성 | 없음 | 없음 |
| 승인 근거 추가 | 없음 | approval_source/date 수정 | 없음 |
| 공개 사용 승인 | 없음 | public_display_approval/status 수정 | 없음 |
| 공개 중단 | 없음 | status 변경 | deleted_at 설정 가능 |

### 8. 예시 데이터

```json
{
  "customer_key": "example-customer",
  "display_name": "Example Customer",
  "proof_label": "Representative customer",
  "public_display_approval": "needs_written_approval",
  "status": "needs_review"
}
```

## 테이블명: seo_settings

### 1. 테이블 목적

- page별 SEO metadata와 draft/public indexing 정책을 저장한다.
- draft 상태에서는 noindex/nofollow를 유지하고, 공개 승인 후 canonical/OG image를 활성화한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | SEO 설정 식별자 |
| page_id | uuid | NO | 없음 | NO | YES | YES | 대상 page |
| title | varchar(255) | NO | 없음 | NO | NO | NO | page title |
| description | text | NO | 없음 | NO | NO | NO | meta description |
| canonical_url | text | YES | 없음 | NO | NO | NO | 공개 canonical |
| robots_policy | varchar(80) | NO | `noindex,nofollow` | NO | NO | NO | robots meta |
| og_title | varchar(255) | YES | 없음 | NO | NO | NO | OG title |
| og_description | text | YES | 없음 | NO | NO | NO | OG description |
| og_image_asset_id | uuid | YES | 없음 | NO | YES | NO | OG image asset |
| status | varchar(30) | NO | `draft_blocked` | NO | NO | NO | SEO 상태 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key:
  - `page_id` -> `pages.id`
  - `og_image_asset_id` -> `media_assets.id`
- Unique: `page_id`
- Check Constraint:
  - `status IN ('draft_blocked', 'seo_approved', 'public_indexable', 'archived')`
  - `robots_policy <> ''`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_seo_settings_page | `page_id` | UNIQUE btree | page별 단일 SEO 설정 |
| ix_seo_settings_status | `status` | btree | draft/public 상태 조회 |
| ix_seo_settings_og_image | `og_image_asset_id` | btree | OG image 사용처 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| pages | 1:1 | page별 SEO 설정 |
| media_assets | N:1 | OG image asset |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft_blocked | 인덱싱 차단 | MVP 기본 | seo_approved |
| seo_approved | SEO 공개 승인 | 운영 승인 | public_indexable |
| public_indexable | 검색 노출 허용 | 공개 배포 | archived |
| archived | 사용 종료 | page retired | draft_blocked |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| page 생성 | seo_settings 생성 | 없음 | 없음 |
| SEO copy 변경 | 없음 | title/description 수정 | 없음 |
| 공개 전환 | 없음 | robots/canonical/og/status 수정 | 없음 |
| page 폐기 | 없음 | status 변경 | 없음 |

### 8. 예시 데이터

```json
{
  "title": "GTG Solutions & Consult",
  "description": "확인 필요",
  "canonical_url": null,
  "robots_policy": "noindex,nofollow",
  "status": "draft_blocked"
}
```

## 테이블명: release_snapshots

### 1. 테이블 목적

- 특정 시점의 공개 후보 또는 공개 완료 release 상태를 저장한다.
- QA 결과, 승인자, 게시 시각을 추적한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | release 식별자 |
| release_key | varchar(120) | NO | 없음 | NO | NO | YES | release key |
| status | varchar(30) | NO | `draft` | NO | NO | NO | release 상태 |
| page_id | uuid | NO | 없음 | NO | YES | NO | 대상 page |
| content_manifest | jsonb | NO | `'{}'::jsonb` | NO | NO | NO | 포함 콘텐츠/asset manifest |
| qa_status | varchar(30) | NO | `not_run` | NO | NO | NO | QA 상태 |
| qa_report_path | varchar(500) | YES | 없음 | NO | NO | NO | QA report 경로 |
| approved_by | uuid | YES | 없음 | NO | YES | NO | 승인자 |
| approved_at | timestamptz | YES | 없음 | NO | NO | NO | 승인 시각 |
| published_at | timestamptz | YES | 없음 | NO | NO | NO | 게시 시각 |
| rolled_back_at | timestamptz | YES | 없음 | NO | NO | NO | rollback 시각 |
| notes | text | YES | 없음 | NO | NO | NO | 메모 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 생성 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key:
  - `page_id` -> `pages.id`
  - `approved_by` -> `app_users.id`
- Unique: `release_key`
- Check Constraint:
  - `status IN ('draft', 'qa_running', 'qa_passed', 'approved', 'published', 'rolled_back', 'archived')`
  - `qa_status IN ('not_run', 'running', 'passed', 'failed')`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ux_release_snapshots_key | `release_key` | UNIQUE btree | release key 중복 방지 |
| ix_release_snapshots_status | `status` | btree | 상태별 release 조회 |
| ix_release_snapshots_page_created | `page_id`, `created_at` | btree | page별 release 이력 조회 |
| ix_release_snapshots_manifest_gin | `content_manifest` | GIN | manifest 검색 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| pages | N:1 | 대상 page |
| app_users | N:1 | 승인자 |
| audit_logs | 1:N | release 관련 감사 로그 |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| draft | release 초안 | 신규 생성 | qa_running, archived |
| qa_running | QA 실행 중 | QA 시작 | qa_passed, draft |
| qa_passed | QA 통과 | 테스트 통과 | approved |
| approved | 공개 승인 | 운영 승인 | published |
| published | 공개 완료 | 배포 완료 | rolled_back, archived |
| rolled_back | rollback 완료 | 장애/정책 문제 | archived |
| archived | 보관 | release 종료 | 없음 |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| RC 생성 | release_snapshots 생성 | 없음 | 없음 |
| QA 실행 | 없음 | qa_status/status 수정 | 없음 |
| 승인 | 없음 | approved_by/approved_at/status 수정 | 없음 |
| 게시 | 없음 | published_at/status 수정 | 없음 |
| rollback | 없음 | rolled_back_at/status 수정 | 없음 |

### 8. 예시 데이터

```json
{
  "release_key": "home-mvp-0.1-rc1",
  "status": "qa_passed",
  "qa_status": "passed",
  "qa_report_path": "docs/browser-test-report.md",
  "content_manifest": {
    "page": "home",
    "sections": ["hero", "solutions", "company", "engagement", "contact"]
  }
}
```

## 테이블명: inquiries

### 1. 테이블 목적

- 향후 문의 폼 backend를 도입할 경우 사용자 문의 내용을 저장한다.
- MVP에서는 사용하지 않는다.
- 개인정보 저장 가능성이 있으므로 보관 기간, 암호화, 마스킹 정책 확정 후 도입해야 한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 문의 식별자 |
| name | varchar(120) | YES | 없음 | NO | NO | NO | 문의자 이름 |
| email | varchar(320) | YES | 없음 | NO | NO | NO | 문의자 이메일 |
| phone | varchar(40) | YES | 없음 | NO | NO | NO | 문의자 전화번호 |
| company | varchar(255) | YES | 없음 | NO | NO | NO | 회사명 |
| message | text | NO | 없음 | NO | NO | NO | 문의 내용 |
| consent_privacy | boolean | NO | false | NO | NO | NO | 개인정보 수집 동의 |
| status | varchar(30) | NO | `received` | NO | NO | NO | 문의 상태 |
| source_path | varchar(255) | YES | 없음 | NO | NO | NO | 유입 경로 |
| ip_hash | char(64) | YES | 없음 | NO | NO | NO | IP hash |
| user_agent | text | YES | 없음 | NO | NO | NO | user agent |
| assigned_to | uuid | YES | 없음 | NO | YES | NO | 담당자 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 접수 시각 |
| updated_at | timestamptz | NO | now() | NO | NO | NO | 수정 시각 |
| deleted_at | timestamptz | YES | 없음 | NO | NO | NO | 삭제/익명화 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key: `assigned_to` -> `app_users.id`
- Not Null: `message`, `consent_privacy`, `status`, `created_at`, `updated_at`
- Check Constraint:
  - `status IN ('received', 'triaged', 'in_progress', 'replied', 'closed', 'spam', 'deleted')`
  - `consent_privacy = true`
  - `length(message) BETWEEN 1 AND 5000`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ix_inquiries_status_created | `status`, `created_at` | btree | 상태별 문의 목록 조회 |
| ix_inquiries_assigned_status | `assigned_to`, `status` | btree | 담당자별 문의 조회 |
| ix_inquiries_created | `created_at` | btree | 보관 기간 삭제 대상 조회 |
| ix_inquiries_email_lower | `lower(email)` | btree | 이메일 검색 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| app_users | N:1 | 담당자 |
| inquiry_events | 1:N | 문의 상태 변경 이력 |

### 6. 상태값

| 상태값 | 설명 | 생성 조건 | 다음 가능 상태 |
|---|---|---|---|
| received | 접수됨 | 문의 제출 성공 | triaged, spam, deleted |
| triaged | 분류됨 | 운영자 확인 | in_progress, closed, spam |
| in_progress | 처리 중 | 담당자 배정 | replied, closed |
| replied | 답변 완료 | 답변 발송 | closed |
| closed | 종료 | 처리 완료 | deleted |
| spam | 스팸 | 스팸 판정 | deleted |
| deleted | 삭제/익명화 | 보존 기간 만료 | 없음 |

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 문의 제출 | inquiries 생성 | 없음 | 없음 |
| 담당자 배정 | 없음 | assigned_to/status 수정 | 없음 |
| 답변 완료 | 없음 | status 수정 | 없음 |
| 보존 기간 만료 | 없음 | status 수정 | 개인정보 삭제/익명화 |

### 8. 예시 데이터

```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "company": "Example Co.",
  "message": "Data Streaming 관련 상담을 요청합니다.",
  "consent_privacy": true,
  "status": "received",
  "source_path": "/#contact"
}
```

## 테이블명: inquiry_events

### 1. 테이블 목적

- 문의 상태 변경, 담당자 배정, 메모 등 처리 이력을 저장한다.
- 개인정보 처리 이력과 운영 추적을 지원한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 이벤트 식별자 |
| inquiry_id | uuid | NO | 없음 | NO | YES | NO | 문의 id |
| actor_user_id | uuid | YES | 없음 | NO | YES | NO | 이벤트 actor |
| event_type | varchar(40) | NO | 없음 | NO | NO | NO | 이벤트 유형 |
| old_status | varchar(30) | YES | 없음 | NO | NO | NO | 이전 상태 |
| new_status | varchar(30) | YES | 없음 | NO | NO | NO | 이후 상태 |
| note | text | YES | 없음 | NO | NO | NO | 처리 메모 |
| created_at | timestamptz | NO | now() | NO | NO | NO | 이벤트 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key:
  - `inquiry_id` -> `inquiries.id`
  - `actor_user_id` -> `app_users.id`
- Check Constraint:
  - `event_type IN ('created', 'assigned', 'status_changed', 'note_added', 'replied', 'closed', 'marked_spam', 'deleted')`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ix_inquiry_events_inquiry_created | `inquiry_id`, `created_at` | btree | 문의별 이력 조회 |
| ix_inquiry_events_actor_created | `actor_user_id`, `created_at` | btree | 운영자 action 조회 |
| ix_inquiry_events_type_created | `event_type`, `created_at` | btree | 이벤트 유형별 조회 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| inquiries | N:1 | 대상 문의 |
| app_users | N:1 | 이벤트 actor |

### 6. 상태값

상태값은 `inquiries.status`를 따른다.

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 문의 접수 | created 이벤트 생성 | 없음 | 없음 |
| 상태 변경 | status_changed 이벤트 생성 | 없음 | 없음 |
| 메모 추가 | note_added 이벤트 생성 | 없음 | 없음 |
| 개인정보 삭제 | deleted 이벤트 생성 | 없음 | 보존 정책에 따라 archive 가능 |

### 8. 예시 데이터

```json
{
  "event_type": "status_changed",
  "old_status": "received",
  "new_status": "triaged",
  "note": "Data Streaming 문의로 분류"
}
```

## 테이블명: audit_logs

### 1. 테이블 목적

- 콘텐츠, 자산, 링크, SEO, release, 문의 처리 등 운영자 action의 감사 로그를 저장한다.
- 공개 콘텐츠와 개인정보 처리의 책임 추적을 지원한다.

### 2. 컬럼 정의

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | PK | FK | UNIQUE | 설명 |
|---|---|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | YES | NO | YES | 감사 로그 식별자 |
| actor_user_id | uuid | YES | 없음 | NO | YES | NO | action 수행자 |
| action | varchar(80) | NO | 없음 | NO | NO | NO | action 이름 |
| entity_type | varchar(80) | NO | 없음 | NO | NO | NO | 대상 엔티티 유형 |
| entity_id | uuid | YES | 없음 | NO | NO | NO | 대상 엔티티 id |
| before_data | jsonb | YES | 없음 | NO | NO | NO | 변경 전 데이터 |
| after_data | jsonb | YES | 없음 | NO | NO | NO | 변경 후 데이터 |
| ip_hash | char(64) | YES | 없음 | NO | NO | NO | IP hash |
| user_agent | text | YES | 없음 | NO | NO | NO | user agent |
| release_snapshot_id | uuid | YES | 없음 | NO | YES | NO | 관련 release |
| created_at | timestamptz | NO | now() | NO | NO | NO | 로그 생성 시각 |

### 3. 제약조건

- Primary Key: `id`
- Foreign Key:
  - `actor_user_id` -> `app_users.id`
  - `release_snapshot_id` -> `release_snapshots.id`
- Not Null: `action`, `entity_type`, `created_at`

### 4. 인덱스

| 인덱스명 | 컬럼 | 유형 | 목적 |
|---|---|---|---|
| ix_audit_logs_actor_created | `actor_user_id`, `created_at` | btree | actor별 감사 조회 |
| ix_audit_logs_entity | `entity_type`, `entity_id` | btree | 엔티티별 변경 이력 |
| ix_audit_logs_action_created | `action`, `created_at` | btree | action 유형별 조회 |
| ix_audit_logs_before_gin | `before_data` | GIN | JSONB 변경 전 검색 |
| ix_audit_logs_after_gin | `after_data` | GIN | JSONB 변경 후 검색 |

### 5. 관계

| 관련 테이블 | 관계 | 설명 |
|---|---|---|
| app_users | N:1 | action actor |
| release_snapshots | N:1 | 관련 release |

### 6. 상태값

상태값 없음. 로그는 append-only로 관리한다.

### 7. 데이터 생성/수정/삭제 시점

| 이벤트 | 생성 | 수정 | 삭제/비활성화 |
|---|---|---|---|
| 콘텐츠 변경 | audit_logs 생성 | 수정 금지 | 아카이브만 허용 |
| 승인/반려 | audit_logs 생성 | 수정 금지 | 아카이브만 허용 |
| 문의 개인정보 처리 | audit_logs 생성 | 수정 금지 | 보존 정책에 따라 마스킹 가능 |

### 8. 예시 데이터

```json
{
  "action": "content.approved",
  "entity_type": "content_blocks",
  "entity_id": "00000000-0000-0000-0000-000000000001",
  "before_data": {
    "approval_status": "needs_review"
  },
  "after_data": {
    "approval_status": "approved"
  }
}
```

## 6. 공통 컬럼 정책

| 컬럼 | 사용 여부 | 정책 |
|---|---|---|
| id | 사용 | 모든 주요 테이블은 `uuid` PK를 사용한다. PostgreSQL `gen_random_uuid()` 기준이다. |
| created_at | 사용 | 모든 주요 테이블에 생성 시각을 저장한다. |
| updated_at | 사용 | 수정 가능한 테이블에 수정 시각을 저장한다. |
| deleted_at | 조건부 사용 | 논리 삭제가 필요한 운영 데이터에 사용한다. append-only 로그에는 사용하지 않는다. |
| created_by | 조건부 사용 | 콘텐츠/page처럼 운영자 action이 필요한 테이블에 사용한다. |
| updated_by | 조건부 사용 | 콘텐츠/page처럼 운영자 action이 필요한 테이블에 사용한다. |
| version | 조건부 사용 | page/content처럼 변경 이력과 rollback이 필요한 데이터에 사용한다. |
| status | 사용 | 업무 상태가 있는 테이블에 사용한다. 상태값은 CHECK constraint로 제한한다. |

## 7. 삭제 정책

### 권장 방식

| 방식 | 적용 대상 | 이유 |
|---|---|---|
| 물리 삭제 | junction table 연결 해제, 잘못 생성된 draft 데이터 | 참조 이력이 없고 복구 가치가 낮다. |
| 논리 삭제 | pages, sections, content_blocks, external_links, media_assets, customer_references | 공개 이력과 승인 이력을 보존해야 한다. |
| 아카이브 | audit_logs, release_snapshots, 오래된 media_assets | 운영 추적은 보존하되 활성 조회에서 제외해야 한다. |
| 보존 기간 후 삭제 | inquiries 개인정보 | 개인정보 최소 보관 원칙을 따라야 한다. |

### 이유

- 공개 홈페이지 콘텐츠는 잘못 삭제하면 과거 release를 재현하기 어렵다.
- 고객 proof와 asset 승인 이력은 공개 리스크 추적에 필요하다.
- 문의 데이터는 개인정보 가능성이 있으므로 무기한 보존하면 안 된다.

## 8. 권한과 데이터 접근 규칙

MVP에는 제품 내 권한 기능이 없다. 아래 규칙은 향후 CMS/문의 backend 도입 시 적용한다.

| 역할 | 접근 가능한 데이터 | 생성/수정 | 삭제/아카이브 | 비고 |
|---|---|---|---|---|
| viewer | 공개 콘텐츠, 승인 상태 조회 | 불가 | 불가 | 읽기 전용 |
| editor | draft 콘텐츠, asset 후보, link 후보 | draft 생성/수정 | draft 삭제 요청 | 승인 불가 |
| approver | 검수 대기 콘텐츠, 고객 proof, asset | 승인/반려 | 아카이브 요청 | 공개 claim 책임 |
| qa | release 후보, QA 결과 | QA 상태 갱신 | 불가 | 테스트 결과 관리 |
| operator | SEO, release, 문의 처리 | 공개 전환, 문의 상태 변경 | 아카이브/삭제 요청 | 운영 책임 |
| admin | 전체 운영 데이터 | 가능 | 가능 | 최소 인원에게만 부여 |

### 본인 데이터 접근

- MVP에는 개인 계정 데이터가 없다.
- 향후 문의 기능에서 방문자는 본인 문의 조회 기능을 제공하지 않는 것을 기본으로 한다. 제공 여부 확인 필요.

### 관리자 전체 접근

- 문의 데이터 전체 접근은 `operator` 이상으로 제한해야 한다.
- 개인정보 원문 접근은 최소 권한 원칙을 따라야 한다.

### 민감 데이터 마스킹

| 데이터 | 목록 화면 | 상세 화면 | 로그 |
|---|---|---|---|
| email | 부분 마스킹 | 권한 있는 운영자만 원문 | hash 또는 마스킹 권장 |
| phone | 부분 마스킹 | 권한 있는 운영자만 원문 | hash 또는 마스킹 권장 |
| message | 요약 표시 | 권한 있는 운영자만 원문 | 원문 저장 지양 |
| ip | 원문 저장 지양 | hash만 저장 | hash만 저장 |

## 9. 데이터 흐름

### 현재 MVP 홈페이지 렌더링 흐름

1. 브라우저가 `/`를 요청한다.
2. Next.js가 코드에 포함된 콘텐츠 상수와 로컬 asset을 사용해 HTML을 렌더링한다.
3. WebGL 가능 조건이면 Hero canvas를 렌더링한다.
4. WebGL 불가, 모바일, reduced-motion이면 HTML/CSS fallback을 렌더링한다.
5. DB 읽기/쓰기는 발생하지 않는다.

### 향후 CMS 콘텐츠 승인 흐름

1. `app_users`에 editor 계정이 존재한다.
2. editor가 `content_blocks`에 draft 콘텐츠를 생성한다.
3. 필요한 visual은 `media_assets`에 등록하고 `content_block_media`로 연결한다.
4. 필요한 CTA는 `external_links`에 등록하고 `content_block_links`로 연결한다.
5. editor가 `approval_status`를 `needs_review`로 변경한다.
6. approver가 콘텐츠, asset, link를 검수한다.
7. 승인 시 `approval_status`를 `approved`로 변경하고 `audit_logs`를 생성한다.
8. QA가 release candidate를 만들고 `release_snapshots`를 생성한다.
9. QA 통과 후 운영자가 release를 `published`로 변경한다.

### 향후 문의 폼 흐름

1. 사용자가 Contact 화면에서 문의 폼을 입력한다.
2. 서버는 필수값과 개인정보 동의를 검증한다.
3. `inquiries`에 문의를 `received` 상태로 생성한다.
4. `inquiry_events`에 `created` 이벤트를 생성한다.
5. 운영자가 문의를 분류하면 `inquiries.status`를 `triaged`로 변경한다.
6. `inquiry_events`에 `status_changed` 이벤트를 생성한다.
7. 답변 완료 후 `replied`, 최종 종료 후 `closed`로 변경한다.
8. 보존 기간 만료 시 개인정보를 삭제 또는 익명화하고 상태를 `deleted`로 변경한다.

### 향후 고객 proof 승인 흐름

1. 고객명과 로고 후보를 `customer_references`와 `media_assets`에 등록한다.
2. 공개 승인 근거를 `approval_source`, `approval_date`에 기록한다.
3. 승인 전에는 `public_display_approval = needs_written_approval`로 유지한다.
4. 승인 완료 후 `public_display_approval = approved`, `status = approved`로 변경한다.
5. release 전에 CONTENT-001 검수 기준으로 화면 노출 여부를 확인한다.

### 향후 SEO 공개 전환 흐름

1. draft 상태에서는 `seo_settings.robots_policy = noindex,nofollow`이다.
2. OG image asset을 `media_assets`에 등록하고 승인한다.
3. canonical URL과 OG metadata를 `seo_settings`에 입력한다.
4. 운영자가 `seo_settings.status = seo_approved`로 변경한다.
5. public release 시 `robots_policy`를 공개 정책으로 변경하고 sitemap에 canonical URL을 포함한다.
6. `audit_logs`에 SEO 공개 전환 action을 기록한다.

## 10. 마이그레이션 고려사항

| 항목 | 고려사항 |
|---|---|
| 초기 스키마 생성 | `pgcrypto` extension과 핵심 테이블을 한 migration으로 생성한다. |
| 향후 컬럼 추가 | nullable 컬럼으로 추가 후 backfill, 그 다음 NOT NULL 제약을 추가한다. |
| 상태값 추가 | CHECK constraint 수정 migration이 필요하다. 상태값 변화가 잦으면 lookup table로 전환한다. |
| JSONB schema 변경 | content block payload에 `schema_version` 필드를 포함하는 것을 권장한다. |
| 데이터 이전 | 현재 TypeScript 콘텐츠를 content_blocks, media_assets, external_links로 변환하는 import script가 필요하다. |
| 다국어 이전 | locale별 block을 별도 row로 생성한다. |
| asset 이전 | 현재 `public` 경로와 sha256을 계산해 media_assets에 등록한다. |
| 개인정보 도입 | 문의 폼 schema 생성 전 개인정보 처리방침, 보관 기간, 암호화 정책이 확정되어야 한다. |

## 11. 성능 고려사항

| 항목 | 고려사항 |
|---|---|
| 조회가 많은 테이블 | pages, sections, content_blocks, media_assets, external_links, seo_settings |
| 대용량 가능성이 있는 테이블 | inquiries, inquiry_events, audit_logs, release_snapshots |
| 필요한 인덱스 | route, status, approval_status, page/section ordering, inquiry status/date |
| JSONB 검색 | content_blocks.data와 release_snapshots.content_manifest는 GIN index를 사용한다. PostgreSQL 의존 기능이다. |
| 파티셔닝 가능성 | audit_logs와 inquiries가 월 수십만 건 이상이면 월별 range partitioning을 검토한다. |
| 보관 정책 | inquiries는 보존 기간 후 삭제/익명화해야 한다. audit_logs는 장기 보관 또는 archive table 분리를 검토한다. |
| 캐싱 | published content는 CDN/Next.js cache 사용을 우선하고 DB 조회를 최소화한다. |
| 트랜잭션 | release publish, 콘텐츠 승인, 문의 상태 변경은 트랜잭션으로 처리해야 한다. |

## 12. 확인 필요 사항

| 확인 항목 | 필요한 결정 |
|---|---|
| DBMS 선택 | PostgreSQL 사용 여부 확정 필요 |
| 데이터 보관 기간 | 문의 데이터, 감사 로그, release snapshot별 보관 기간 확정 필요 |
| 삭제 정책 | 문의 개인정보 삭제/익명화 방식 확정 필요 |
| 개인정보 저장 여부 | 문의 폼 도입 여부와 저장 항목 확정 필요 |
| 대용량 데이터 예상치 | 월 방문자 수, 문의 건수, 콘텐츠 변경 빈도 확인 필요 |
| 인증 방식 | 내부 운영자 인증을 외부 IdP로 할지 자체 인증으로 할지 확인 필요 |
| 민감 데이터 암호화 | email, phone, message 암호화 필요 여부 확인 필요 |
| 트랜잭션 처리 기준 | 승인/게시/문의 상태 변경의 원자성 기준 확인 필요 |
| CMS 도입 여부 | 자체 CMS, headless CMS, 코드 기반 유지 중 결정 필요 |
| 고객 proof 승인 정책 | 고객명/로고 공개 승인 증빙 방식 확인 필요 |

## 초기 DDL 초안

아래 SQL은 PostgreSQL 기준 초안이다. MVP에는 적용하지 않아도 되며, CMS/문의 backend 도입이 승인될 경우 migration으로 분리해 적용한다.

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(320) NOT NULL,
  display_name varchar(120) NOT NULL,
  role varchar(30) NOT NULL DEFAULT 'editor',
  status varchar(30) NOT NULL DEFAULT 'active',
  external_identity_id varchar(255),
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_app_users_role
    CHECK (role IN ('viewer', 'editor', 'approver', 'qa', 'operator', 'admin')),
  CONSTRAINT ck_app_users_status
    CHECK (status IN ('active', 'inactive', 'locked'))
);

CREATE UNIQUE INDEX ux_app_users_email_lower ON app_users (lower(email));
CREATE UNIQUE INDEX ux_app_users_external_identity_id
  ON app_users (external_identity_id)
  WHERE external_identity_id IS NOT NULL;
CREATE INDEX ix_app_users_status ON app_users (status);

CREATE TABLE pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key varchar(80) NOT NULL,
  route varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  locale varchar(10) NOT NULL DEFAULT 'ko',
  status varchar(30) NOT NULL DEFAULT 'draft',
  created_by uuid REFERENCES app_users(id),
  updated_by uuid REFERENCES app_users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  version integer NOT NULL DEFAULT 1,
  CONSTRAINT ck_pages_status
    CHECK (status IN ('draft', 'blocked', 'ready', 'published', 'retired')),
  CONSTRAINT ck_pages_version CHECK (version >= 1)
);

CREATE UNIQUE INDEX ux_pages_page_key ON pages (page_key);
CREATE UNIQUE INDEX ux_pages_route ON pages (route);
CREATE INDEX ix_pages_status_locale ON pages (status, locale);

CREATE TABLE sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE RESTRICT,
  section_key varchar(80) NOT NULL,
  display_name varchar(120) NOT NULL,
  anchor_id varchar(80) NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  status varchar(30) NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_sections_sort_order CHECK (sort_order >= 0),
  CONSTRAINT ck_sections_status
    CHECK (status IN ('draft', 'blocked', 'ready', 'published', 'retired'))
);

CREATE UNIQUE INDEX ux_sections_page_section_key ON sections (page_id, section_key);
CREATE UNIQUE INDEX ux_sections_page_anchor_id ON sections (page_id, anchor_id);
CREATE INDEX ix_sections_page_order ON sections (page_id, sort_order);

CREATE TABLE content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES sections(id) ON DELETE RESTRICT,
  block_key varchar(100) NOT NULL,
  block_type varchar(50) NOT NULL,
  locale varchar(10) NOT NULL DEFAULT 'ko',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  approval_status varchar(30) NOT NULL DEFAULT 'draft',
  publication_status varchar(30) NOT NULL DEFAULT 'draft',
  version integer NOT NULL DEFAULT 1,
  created_by uuid REFERENCES app_users(id),
  updated_by uuid REFERENCES app_users(id),
  approved_by uuid REFERENCES app_users(id),
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_content_blocks_type
    CHECK (block_type IN ('navigation', 'hero', 'solution', 'company', 'capability_map', 'engagement', 'contact', 'footer', 'seo', 'text', 'list')),
  CONSTRAINT ck_content_blocks_approval
    CHECK (approval_status IN ('draft', 'needs_review', 'approved', 'rejected', 'archived')),
  CONSTRAINT ck_content_blocks_publication
    CHECK (publication_status IN ('draft', 'blocked', 'ready', 'published', 'retired')),
  CONSTRAINT ck_content_blocks_version CHECK (version >= 1)
);

CREATE UNIQUE INDEX ux_content_blocks_identity
  ON content_blocks (section_id, block_key, locale, version);
CREATE INDEX ix_content_blocks_section_status
  ON content_blocks (section_id, publication_status);
CREATE INDEX ix_content_blocks_approval ON content_blocks (approval_status);
CREATE INDEX ix_content_blocks_data_gin ON content_blocks USING gin (data);

CREATE TABLE media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_key varchar(120) NOT NULL,
  file_path varchar(500) NOT NULL,
  asset_type varchar(40) NOT NULL,
  mime_type varchar(100) NOT NULL,
  alt_text text NOT NULL,
  source_type varchar(40) NOT NULL DEFAULT 'local',
  approval_status varchar(30) NOT NULL DEFAULT 'draft',
  width integer,
  height integer,
  sha256 char(64),
  copyright_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_media_assets_type
    CHECK (asset_type IN ('brand_logo', 'favicon', 'hero_visual', 'solution_visual', 'capability_map', 'customer_logo', 'og_image', 'icon', 'other')),
  CONSTRAINT ck_media_assets_source_type
    CHECK (source_type IN ('local', 'generated', 'official', 'uploaded', 'external_reference')),
  CONSTRAINT ck_media_assets_approval
    CHECK (approval_status IN ('draft', 'needs_review', 'approved', 'blocked', 'archived')),
  CONSTRAINT ck_media_assets_local_path
    CHECK (file_path NOT LIKE 'http://%' AND file_path NOT LIKE 'https://%'),
  CONSTRAINT ck_media_assets_width CHECK (width IS NULL OR width > 0),
  CONSTRAINT ck_media_assets_height CHECK (height IS NULL OR height > 0)
);

CREATE UNIQUE INDEX ux_media_assets_asset_key ON media_assets (asset_key);
CREATE UNIQUE INDEX ux_media_assets_file_path ON media_assets (file_path);
CREATE UNIQUE INDEX ux_media_assets_sha256
  ON media_assets (sha256)
  WHERE sha256 IS NOT NULL;
CREATE INDEX ix_media_assets_type_status ON media_assets (asset_type, approval_status);

CREATE TABLE content_block_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_block_id uuid NOT NULL REFERENCES content_blocks(id) ON DELETE CASCADE,
  media_asset_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE RESTRICT,
  usage_type varchar(40) NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_content_block_media_usage
    CHECK (usage_type IN ('primary', 'fallback', 'thumbnail', 'logo', 'background', 'og', 'inline')),
  CONSTRAINT ck_content_block_media_sort_order CHECK (sort_order >= 0)
);

CREATE UNIQUE INDEX ux_content_block_media_usage
  ON content_block_media (content_block_id, media_asset_id, usage_type);
CREATE INDEX ix_content_block_media_block_order
  ON content_block_media (content_block_id, sort_order);
CREATE INDEX ix_content_block_media_asset ON content_block_media (media_asset_id);

CREATE TABLE external_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_key varchar(120) NOT NULL,
  label varchar(255) NOT NULL,
  url text NOT NULL,
  link_type varchar(40) NOT NULL,
  approval_status varchar(30) NOT NULL DEFAULT 'draft',
  last_checked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_external_links_type
    CHECK (link_type IN ('cta', 'email', 'phone', 'policy', 'canonical', 'social', 'external_reference')),
  CONSTRAINT ck_external_links_approval
    CHECK (approval_status IN ('draft', 'needs_review', 'approved', 'rejected', 'archived')),
  CONSTRAINT ck_external_links_url_not_empty CHECK (url <> '')
);

CREATE UNIQUE INDEX ux_external_links_key ON external_links (link_key);
CREATE INDEX ix_external_links_type_status ON external_links (link_type, approval_status);
CREATE INDEX ix_external_links_last_checked ON external_links (last_checked_at);

CREATE TABLE content_block_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_block_id uuid NOT NULL REFERENCES content_blocks(id) ON DELETE CASCADE,
  external_link_id uuid NOT NULL REFERENCES external_links(id) ON DELETE RESTRICT,
  usage_type varchar(40) NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_content_block_links_usage
    CHECK (usage_type IN ('primary_cta', 'secondary_cta', 'email', 'phone', 'policy', 'canonical')),
  CONSTRAINT ck_content_block_links_sort_order CHECK (sort_order >= 0)
);

CREATE UNIQUE INDEX ux_content_block_links_usage
  ON content_block_links (content_block_id, external_link_id, usage_type);
CREATE INDEX ix_content_block_links_block_order
  ON content_block_links (content_block_id, sort_order);
CREATE INDEX ix_content_block_links_link ON content_block_links (external_link_id);

CREATE TABLE customer_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_key varchar(120) NOT NULL,
  display_name varchar(255) NOT NULL,
  logo_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  proof_label varchar(80) NOT NULL DEFAULT 'Representative customer',
  public_display_approval varchar(40) NOT NULL DEFAULT 'needs_written_approval',
  approval_source text,
  approval_date date,
  status varchar(30) NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_customer_references_public_approval
    CHECK (public_display_approval IN ('not_requested', 'needs_written_approval', 'approved', 'rejected')),
  CONSTRAINT ck_customer_references_status
    CHECK (status IN ('draft', 'needs_review', 'approved', 'blocked', 'archived'))
);

CREATE UNIQUE INDEX ux_customer_references_key ON customer_references (customer_key);
CREATE INDEX ix_customer_references_approval ON customer_references (public_display_approval);
CREATE INDEX ix_customer_references_logo ON customer_references (logo_asset_id);

CREATE TABLE seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  canonical_url text,
  robots_policy varchar(80) NOT NULL DEFAULT 'noindex,nofollow',
  og_title varchar(255),
  og_description text,
  og_image_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  status varchar(30) NOT NULL DEFAULT 'draft_blocked',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_seo_settings_status
    CHECK (status IN ('draft_blocked', 'seo_approved', 'public_indexable', 'archived')),
  CONSTRAINT ck_seo_settings_robots_not_empty CHECK (robots_policy <> '')
);

CREATE UNIQUE INDEX ux_seo_settings_page ON seo_settings (page_id);
CREATE INDEX ix_seo_settings_status ON seo_settings (status);
CREATE INDEX ix_seo_settings_og_image ON seo_settings (og_image_asset_id);

CREATE TABLE release_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  release_key varchar(120) NOT NULL,
  status varchar(30) NOT NULL DEFAULT 'draft',
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE RESTRICT,
  content_manifest jsonb NOT NULL DEFAULT '{}'::jsonb,
  qa_status varchar(30) NOT NULL DEFAULT 'not_run',
  qa_report_path varchar(500),
  approved_by uuid REFERENCES app_users(id),
  approved_at timestamptz,
  published_at timestamptz,
  rolled_back_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_release_snapshots_status
    CHECK (status IN ('draft', 'qa_running', 'qa_passed', 'approved', 'published', 'rolled_back', 'archived')),
  CONSTRAINT ck_release_snapshots_qa_status
    CHECK (qa_status IN ('not_run', 'running', 'passed', 'failed'))
);

CREATE UNIQUE INDEX ux_release_snapshots_key ON release_snapshots (release_key);
CREATE INDEX ix_release_snapshots_status ON release_snapshots (status);
CREATE INDEX ix_release_snapshots_page_created ON release_snapshots (page_id, created_at);
CREATE INDEX ix_release_snapshots_manifest_gin ON release_snapshots USING gin (content_manifest);

CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(120),
  email varchar(320),
  phone varchar(40),
  company varchar(255),
  message text NOT NULL,
  consent_privacy boolean NOT NULL DEFAULT false,
  status varchar(30) NOT NULL DEFAULT 'received',
  source_path varchar(255),
  ip_hash char(64),
  user_agent text,
  assigned_to uuid REFERENCES app_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_inquiries_status
    CHECK (status IN ('received', 'triaged', 'in_progress', 'replied', 'closed', 'spam', 'deleted')),
  CONSTRAINT ck_inquiries_consent CHECK (consent_privacy = true),
  CONSTRAINT ck_inquiries_message_length CHECK (length(message) BETWEEN 1 AND 5000)
);

CREATE INDEX ix_inquiries_status_created ON inquiries (status, created_at);
CREATE INDEX ix_inquiries_assigned_status ON inquiries (assigned_to, status);
CREATE INDEX ix_inquiries_created ON inquiries (created_at);
CREATE INDEX ix_inquiries_email_lower ON inquiries (lower(email));

CREATE TABLE inquiry_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  actor_user_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  event_type varchar(40) NOT NULL,
  old_status varchar(30),
  new_status varchar(30),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_inquiry_events_type
    CHECK (event_type IN ('created', 'assigned', 'status_changed', 'note_added', 'replied', 'closed', 'marked_spam', 'deleted'))
);

CREATE INDEX ix_inquiry_events_inquiry_created ON inquiry_events (inquiry_id, created_at);
CREATE INDEX ix_inquiry_events_actor_created ON inquiry_events (actor_user_id, created_at);
CREATE INDEX ix_inquiry_events_type_created ON inquiry_events (event_type, created_at);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  action varchar(80) NOT NULL,
  entity_type varchar(80) NOT NULL,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_hash char(64),
  user_agent text,
  release_snapshot_id uuid REFERENCES release_snapshots(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ix_audit_logs_actor_created ON audit_logs (actor_user_id, created_at);
CREATE INDEX ix_audit_logs_entity ON audit_logs (entity_type, entity_id);
CREATE INDEX ix_audit_logs_action_created ON audit_logs (action, created_at);
CREATE INDEX ix_audit_logs_before_gin ON audit_logs USING gin (before_data);
CREATE INDEX ix_audit_logs_after_gin ON audit_logs USING gin (after_data);
```
