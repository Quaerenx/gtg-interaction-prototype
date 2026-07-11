# HERO Release Candidate readiness — final validation

> - 감사일: 2026-07-11 (Asia/Seoul)
> - 브랜치: `codex/hero-basepath-stabilization`
> - 검증 시작 HEAD: `ab07afd8f8ea962b607db3ee15425937f3f8ee96`
> - 기술 판정: **로컬·직접·프록시 RC PASS**
> - 공개 release 판정: **BLOCKED — noindex와 release hold 유지**

이 문서는 현재 working tree와 실제 18150/8088 런타임을 기준으로 자동 검증, 직접 배포, 접근성, 제품 이해, 브랜드·권리 gate를 판정한다. `PASS`는 명시된 검사 범위에서 확인됐다는 뜻이고, `BLOCKED`는 별도 승인·실기기·운영 결정 또는 외부 증거가 남았다는 뜻이다.

## 1. 종합 판정

| Gate | 상태 | 결론 |
|---|---|---|
| TypeScript, ESLint, production build | PASS | 모두 exit code 0 |
| 전체 Chromium Playwright | PASS | 최종 22/22 passed |
| 전체 WebKit Playwright | PASS | 22/22 passed |
| 18150 direct, 8088 proxy, host LAN | PASS | 세 주소 모두 최신 HTML과 asset을 정상 제공 |
| 프로젝트 소유자의 현재 자산 화면 노출 결정 | PASS | 사용자가 2026-07-11 공개 사용을 명시적으로 허용 |
| LoadRunner 비공식 PNG remediation | PASS | 화면 참조 제거, text mark 적용, 파일은 public 밖 archive로 보존 |
| 고객·vendor 권리자 허가와 official master | BLOCKED | 프로젝트 승인과 별도인 제3자 증거가 없음 |
| GTG 공식 master·색상·favicon·OG·legal | BLOCKED | 공식 source와 권한자 자료가 없음 |
| 실제 200% zoom·Windows High Contrast·수동 keyboard-only | BLOCKED | 자동 대체 검증은 통과했으나 실제 수동 검증이 없음 |
| 독립 참가자 5초 이해 테스트 | BLOCKED | 질문은 준비됐으나 실제 응답이 없음 |
| canonical과 `/hero` production 의미 | BLOCKED | preview와 production 경로 정책이 미결정 |
| 전체 콘텐츠 release 승인 | BLOCKED | `siteContent.isApproved === false` |

따라서 현재 구현은 로컬·직접·프록시 기술 RC로 사용할 수 있다. 공개 indexable production release, noindex 해제, canonical 확정과 release tag는 아직 진행하지 않는다.

## 2. 자동 검증

| 항목 | 실행 | 상태 | 정확한 결과 |
|---|---|---|---|
| TypeScript | `npx.cmd tsc --noEmit` | PASS | exit code 0, 진단 0 |
| ESLint | `npm.cmd run lint` | PASS | exit code 0, warning/error 0 |
| production build | `npm.cmd run build` | PASS | Next.js 16.2.9, compile 5.5s, TypeScript 4.0s, static pages 5/5 |
| WebKit 전체 | `GTG_FULL_WEBKIT=1 npm.cmd run test:e2e:webkit` | PASS | 22 passed, 1 worker, 3.2m |
| Chromium 전체 최종 | `GTG_FULL_CHROMIUM=1 npm.cmd run test:e2e:chromium` | PASS | 22 passed, 1 worker, 1.8m |
| diff whitespace | `git diff --check` | PASS | whitespace error 0 |

PowerShell이 `npm.ps1`을 정책상 차단하므로 동일 설치를 가리키는 `npm.cmd`와 `npx.cmd`로 실행했다.

### 검증 중 발견하고 보완한 문제

첫 강화 Chromium 전체 실행은 20/22로 실패했다. 앱 문제가 아니라 새 screenshot 안정성 guard가 product reveal의 CSS transform을 layout 변화로 오인한 것이 원인이었다. `scrollY`와 transform 영향을 받지 않는 offset layout으로 안정성 측정을 좁힌 뒤 실패한 두 테스트가 각각 단독 통과했고, 최종 전체가 22/22 통과했다. 실패 trace는 `retain-on-failure`로 보존되며 최종 screenshot에서는 header, handoff, Solution copy와 LoadRunner text mark가 정상임을 확인했다.

| 보완 | 상태 | 적용 내용 |
|---|---|---|
| screenshot scroll readiness | PASS | 대상 attached/visible/in-viewport, 연속 안정 frame, header 가시성 확인 |
| 실패 증거 보존 | PASS | Playwright `trace: retain-on-failure` |
| 정적 handoff 전용 pixel snapshot | 개선 후보 | time-varying Hero와 분리한 Chromium snapshot을 후속 도입 가능 |

## 3. 직접·프록시·LAN 검증

최종 build 뒤 이전 HERO PID `11944`만 종료하고 `start-server.ps1` production 진입점으로 교체했다. Caddy PID `35836`은 재시작하지 않았다. LoadRunner public 파일 이동 후 HERO만 다시 시작했으며 최종 18150 listener는 Node PID `46372`다.

| URL | 상태 | HTML | asset 결과 |
|---|---|---|---|
| `http://127.0.0.1:18150/hero` | PASS | 200, 103,204 bytes | 40/40 HTTP 200 |
| `http://127.0.0.1:8088/hero` | PASS | 200, 103,204 bytes | 40/40 HTTP 200 |
| `http://192.168.40.18:8088/hero` | PASS | 200, 103,204 bytes | 40/40 HTTP 200 |

세 HTML은 SHA-256 `855e01b8dab018a977dc7060827ff244bb01389533843011ce1f9ca1484ff84f`로 동일하다. 이전 CSS 1개·JS 5개 500은 실행 중인 프로세스보다 `.next` build가 새로워 발생한 manifest 불일치였으며, production 재기동 후 해소됐다.

| 항목 | 상태 | 최종 결과 |
|---|---|---|
| 모든 DOM image | PASS | 세 주소 각각 26/26 `naturalWidth > 0`, `naturalHeight > 0` |
| stylesheet/script/font/image 오류 | PASS | 404·500·failed request 모두 0 |
| 동일 host `/hero` 밖 asset | PASS | 세 주소 모두 0건 |
| console error | PASS | 세 주소 모두 0건 |
| 내부 anchor | PASS | `/hero` 밖으로 이탈한 동일 host anchor 0건 |
| anchor navigation | PASS | CONTACT → `/hero#contact` |
| browser back/forward | PASS | `/hero#contact` → `/hero` → `/hero#contact` |
| cache reload | PASS | 세 주소 모두 200, hash와 path 유지 |
| mobile/desktop overflow | PASS | 자동 viewport matrix 통과; direct Chromium 0px |
| 고객 project display state | PASS | 18/18 `data-project-display-approval="approved"` |
| 고객 외부 권리 state 보존 | PASS | 18/18 `data-third-party-rights="unverified"` |
| LoadRunner image request | PASS | 0건; product reveal은 text mark |
| 이전 pngaaa public URL | PASS | archive 이동·재기동 후 404 |

호스트에서 `192.168.40.18:8088` 접근은 확인했다. 방화벽 허용 대상 물리 PC `192.168.40.24`에서의 최종 브라우저 검증은 해당 장비에서 별도로 수행해야 한다.

### 404와 metadata

| 항목 | 상태 | 결과 |
|---|---|---|
| `/hero/not-a-real-route` | PASS | 404, custom not-found UI |
| `/hero/robots.txt` | PASS | 200, `Disallow: /` |
| `/hero/sitemap.xml` | PASS | 200, 빈 `urlset` |
| robots meta | PASS | `noindex, nofollow` |
| title/description/OG 기본 필드 | PASS | 존재 |
| canonical | BLOCKED | 현재 출력하지 않음; 경로 정책 미결정 |
| OG image | BLOCKED | 승인된 파일과 metadata가 없음 |
| favicon/apple icon | BLOCKED | 전용 official icon이 아닌 현재 GTG PNG 재사용 |

## 4. 접근성 검증

| 항목 | 상태 | 결과와 한계 |
|---|---|---|
| keyboard 자동 flow | PASS | skip link, Solution route, Contact, 모든 CTA를 Chromium/WebKit에서 검증 |
| menu focus trap·복귀 | PASS | Tab/Shift+Tab, Escape, opener 복귀, target heading focus |
| heading/landmark | PASS | banner/main/contentinfo, 단일 H1, labelled section, H2/H3 계층 |
| inactive slide focus | PASS / N/A | 모든 Solution은 숨겨진 carousel이 아닌 normal-flow article |
| reduced-motion 최초 paint | PASS | Canvas/WebGL/draw/Three 요청 0 |
| forceFallback | PASS | 핵심 서비스·고객·Solution·Company·Engagement·Contact 유지 |
| zoom-equivalent | PASS | 640×360 CSS viewport에서 핵심 정보와 overflow 검증 |
| forced-colors | PASS | 핵심 정보와 overflow 검증 |
| mobile overflow | PASS | 360×640, 390×844, 430×932 포함 전체 matrix 통과 |
| 실제 browser zoom 200% | BLOCKED | 실제 zoom 수동 확인이 없음 |
| 실제 Windows High Contrast | BLOCKED | 실제 OS 모드 확인이 없음 |
| 실제 수동 keyboard-only | BLOCKED | 자동화 외 독립 수동 세션이 없음 |

## 5. 제품 이해 검증

독립 참가자에게 화면 첫 노출 5초 뒤 다음 질문을 추가 설명 없이 묻는다.

1. “GTG는 어떤 문제를 해결하는 회사라고 이해했나요? 핵심 업무를 2~3개 말해 주세요.”
2. “Representative Customers의 logo는 무엇을 의미하며, 무엇을 의미하지 않나요?”
3. “다섯 Solution의 차이를 설명해 주세요.”
4. “문의하려면 어디로 가며 어떤 수단을 사용할 수 있나요?”
5. “5초 뒤 제품 업체보다 GTG의 어떤 역량이 기억나나요?”

| 평가 | 상태 | 근거 |
|---|---|---|
| GTG 역할을 답할 화면 근거 | PASS | Hero, GTG Data Core capability route, Company copy |
| 고객 logo 의미의 설명 | PASS | Representative Customers, local-only label, 비보증 disclaimer |
| 5개 Solution 구분 근거 | PASS | 각 Solution의 heading, 설명, capability list |
| 문의 경로 | PASS | Header/menu/Hero CTA와 Contact section |
| 실제 5초 이해율 | BLOCKED | 독립 참가자 응답 없음 |
| GTG 대 vendor 기억 우선순위 | BLOCKED | 실제 회상 결과 없음 |

## 6. 자산·브랜드·법적 gate

사용자 지시는 `project-owner-approved`로 기록한다. 고객 관계 증거, 제3자 권리와 official source는 별도 field와 ledger 상태로 유지한다.

| 항목 | 상태 | 현재 사실 |
|---|---|---|
| 프로젝트 소유자의 자산 화면 노출 | PASS | 2026-07-11 사용자 명시 승인 |
| 고객 18개 관계 증거 | PASS / 제한 | `user-confirmed`; partner tier·인증·endorsement claim 아님 |
| 고객 logo 권리자 허가·official master | BLOCKED | 별도 증거 없음 |
| Vertica·Confluent·HashiCorp 권리·official source | BLOCKED | 프로젝트 승인과 별도인 외부 증거 없음 |
| LoadRunner pngaaa source conflict | PASS / remediation | 이미지 노출·요청 제거, public 밖 archive 보존; text mark만 사용 |
| GTG primary/inverse/mono·wordmark | BLOCKED | official master 없음 |
| 공식 red | BLOCKED | 권한자 source 없음 |
| 현재 font delivery | PASS / N/A | system stack이며 self-host font 파일·요청 없음 |
| 공식 brand font package | BLOCKED | 선정·license package 없음 |
| 전용 favicon·OG | BLOCKED | 없음 |
| Terms/legal | BLOCKED | Terms와 공개 legal 결정 없음 |
| `siteContent.isApproved` safety gate | PASS | `false`; release 전환 차단 |

## 7. 남은 개선점

| 우선순위 | 개선점 | 권장 최소 조치 |
|---|---|---|
| P0 | build 중 live `.next` 덮어쓰기 재발 방지 | build → 검증 → verified PID cutover 순서를 lifecycle 문서·script로 고정 |
| P1 | immutable/atomic 배포 | release별 build directory 또는 atomic directory swap 도입 |
| P1 | 고객·vendor 증거 | official master, 사용 범위, 승인자·날짜 reference 확보 |
| P1 | GTG identity | primary/inverse/mono/wordmark, red, favicon, OG package 확보 |
| P1 | canonical·legal | `/hero` 의미, production URL, Terms 정책 확정 |
| P1 | 실제 접근성 | 200% zoom, Windows High Contrast, keyboard-only 수동 검사 |
| P1 | 제품 이해 | 합격 기준과 표본을 정한 뒤 위 5개 질문으로 blind test |
| P2 | screenshot pixel regression | static handoff 한 장에만 Chromium `toHaveScreenshot` baseline 추가 |
| P2 | ESLint peer mismatch | ESLint 10 지원 jsx-a11y release 또는 검증된 `eslint`+`@eslint/js` v9 pair 선택 |
| P2 | Caddy matcher | 별도 proxy 단계에서 `/hero*`를 `/hero`와 `/hero/*`로 좁힐지 검토 |

`pnpm peers check`는 `eslint-plugin-jsx-a11y@6.10.2`의 peer 범위가 ESLint 9에서 끝나 현재 ESLint 10.5.0과 맞지 않아 exit 1이다. 실제 `jsx-a11y/alt-text` rule과 lint는 정상 동작한다. 경고를 숨기지 않고 호환 조합 결정 전까지 risk로 유지한다.

## 8. Release 결정

- **로컬·직접·프록시 기술 RC: PASS**
- **indexable public production release: BLOCKED**
- `siteContent.isApproved === false`를 유지한다.
- `noindex, nofollow`, crawl 차단 robots와 빈 sitemap을 유지한다.
- canonical을 임의 확정하지 않는다.
- release tag, push, PR을 생성하지 않는다.
- 남은 brand/legal/canonical/수동 검증 gate가 해제되면 공개 release 감사를 다시 실행한다.
