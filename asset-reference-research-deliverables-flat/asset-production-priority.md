# GTG Asset Production Priority

작성일: 2026-07-02  
범위: 현재 GTG Solutions & Consult 프로토타입 기준, 구현 전 제작 우선순위 정리  
주의: 고객/성과/파트너/인증/히스토리 관련 주장은 승인된 출처 없이는 제작물에 넣지 않는다.

| Priority | Asset | Area | Why Needed | Format | Difficulty | Risk | Reference Direction |
|---|---|---|---|---|---|---|---|
| P0 | Official GTG logo SVG, inverse, mono mark, red value | Global brand | 현재는 PNG와 provisional red에 의존한다. 모든 파생 에셋의 기준이 필요하다. | SVG, PNG export, CSS token | Medium | Brand ownership/version risk | GTG 원본 기준. 외부 브랜드 모방 없음 |
| P0 | Primary bilingual font system | Global typography | 한국어 Hero, 영문 service label, diagram label을 한 체계로 묶어야 한다. | Self-hosted WOFF2, CSS tokens | Low | Font license handling | Pretendard Variable primary, SUIT Variable secondary |
| P0 | Customer logo approval ledger | Proof safety | 18개 고객 로고는 가장 강한 proof이자 가장 큰 co-branding risk다. | Markdown/CSV ledger | Low | High claim/trademark risk | "Representative Customers"만, 승인 상태 기록 |
| P0 | Hero customer card texture QA set | Hero/proof | 현재 WebGL 경험을 production-safe texture set으로 고정해야 한다. | CanvasTexture source, PNG/WebP stills | Medium | Customer logo approval risk | 현재 customer card frame 유지 |
| P0 | Mobile static Hero/proof set | Mobile/reduced motion | 모바일에서는 pinned scroll/3D를 줄여야 한다. | HTML/CSS, PNG/WebP | Low | Customer logo approval risk | 동일 proof grammar의 정적 버전 |
| P0 | OG/social preview image | Metadata/share | 외부 공유 시 빈 preview나 generic asset을 피한다. | 1200x630 PNG/WebP | Low | Customer logo usage if included | Topology-only version first |
| P0 | Favicon/app icon package | Release polish | 배포 기본 요건이다. | SVG, PNG sizes, ICO | Low | Brand source risk | Official mark에서 파생 |
| P1 | Service representative topology visual set | Solutions | 각 solution slide가 실제 기술 컨설팅 맥락을 더 명확히 전달해야 한다. | SVG, optional PNG export | Medium | Vendor/product imitation risk | HashiCorp/Confluent/Grafana의 개념만 참고 |
| P1 | Static customer proof grid | Company/proof | 고객 증거를 Hero 밖에서도 접근 가능하게 보여준다. | HTML grid, SVG/PNG cards | Low | Customer logo approval risk | Samsung SDS/HashiCorp/Grafana의 proof 구조만 참고 |
| P1 | Engagement Flow Map | Engagement | Diagnose/Design/Implement/Operate 흐름을 claims 없이 설명한다. | SVG + semantic HTML | Medium | Process overclaim risk | GTG topology primitive로 route map 제작 |
| P1 | Contact consultation visual | Contact | 마지막 CTA가 다른 섹션과 같은 visual language를 가져야 한다. | SVG/CSS | Low | Low | red marker + route/handshake abstraction |
| P1 | Korean/English diagram label rules | Global diagrams | 기술 다이어그램의 label 밀도와 줄바꿈을 통제해야 한다. | Markdown guideline, CSS tokens | Low | Low | IBM/Carbon grid discipline + W3C text alternatives |
| P1 | Deck/one-page capability sheet masters | Sales enablement | 웹 에셋을 제안서/영업 자료에 재사용하기 좋게 만든다. | PPT/PNG/SVG master | Medium | Claim/logo approval risk | Customer proof + capability map 확장 |
| P2 | Case-study template without outcome claims | Future content | 향후 고객 사례를 승인 절차와 함께 담을 틀이 필요하다. | Markdown/HTML/PPT template | Medium | High claim risk | challenge/approach/stack/outcome slot, outcome blank by default |
| P2 | Service icon family from topology primitives | Navigation/Solutions | 텍스트-heavy navigation을 보완할 수 있다. | SVG icon set | Medium | Vendor icon similarity risk | GTG red marker, line/node primitive |
| P2 | Signal correlation / diagnostics map | Support/Technical service | technical support와 diagnostics 서비스를 더 선명히 보여준다. | SVG | Medium | Fake dashboard risk | Grafana/OpenTelemetry 개념만, fake metrics 금지 |
| P2 | Platform golden path diagram | Infra/DevOps | infrastructure automation과 DevOps 품질의 end-to-end 흐름을 설명한다. | SVG | Medium | Product ownership/partner implication risk | HashiCorp lifecycle 개념 참고, 제품 아이콘 금지 |
| P2 | Proposal proof strip | Sales deck | 고객 proof를 제안서에 일관되게 배치한다. | PPT/SVG/PNG | Low | Customer logo approval risk | 카드 프레임의 deck variant |
| Later | Industry proof grouping | Company/proof | 산업 분류가 공식 확인된 후에만 유효하다. | HTML/SVG grid | Low | High | 승인 전 industry label 사용 금지 |
| Later | Full-screen bitmap background library | Brand campaign | 더 강한 campaign visual이 필요할 때 검토한다. | Generated/shot bitmap | High | Copyright/style similarity risk | 내부 제작, no hotlink, no OVA similarity |
| Later | Motion motif pack beyond Hero | Brand motion | 현재는 Hero motion으로 충분하다. | CSS/SVG animation specs | Medium | Accessibility risk | prefers-reduced-motion first |
| Later | Video/photographic library | Future marketing | 촬영/권리/출연/장소 승인 비용이 크다. | MP4/WebM/JPG/WebP | High | High copyright/privacy risk | 지금은 시작하지 않음 |
| Hold/Reject | Generic 3D particles, AI gradients, fake dashboards | Any | GTG 고유성도 약하고 claim/copy risk가 크다. | None | N/A | High | 제작하지 않음 |

## Immediate Five

1. Official GTG brand source package
2. Pretendard/SUIT typography system
3. Hero customer card texture QA + mobile static proof set
4. OG/favicons/app icons
5. Customer logo approval ledger

이 다섯 가지가 정리되면 현재 프로토타입은 새로운 디자인을 크게 추가하지 않아도 릴리스 안정성이 크게 올라간다.

