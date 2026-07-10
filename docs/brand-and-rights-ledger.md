# GTG Brand and Rights Ledger

> - 감사일: 2026-07-10
> - 코드 기준선: `codex/hero-basepath-stabilization` / `ed13d952c062a1d5af4c5224d1b97799c9e8cd66`
> - 상태: **AUDIT — 이 문서 자체는 자산 사용 승인이 아님**
> - 범위: GTG 브랜드, 고객 proof, 제품 mark, 코드 참조 이미지, 관련 공개 파생 자산, favicon/OG/font

이 문서는 저장소에서 확인할 수 있는 출처와 승인 증거를 보수적으로 기록한다. 법률 자문을 대신하지 않는다. 계약서·승인서·공식 source package가 저장소에 없으면 허가가 있다고 추정하지 않는다. `noindex`와 2026-07-10 제품 방향 승인은 브랜드·상표·로고의 공개 사용 승인이 아니다.

## 1. 결론

- 현재 증거로 `public-use-approved`라고 판정할 수 있는 GTG, 고객, 제품 logo 파일은 **0개**다.
- 고객 logo 18개는 관계만 `user-confirmed`이며, 개별 공개 사용 승인·공식 master·승인자·승인일이 없다. 18개 모두 공개 배포 `blocked`다.
- `public/brand`에는 출처가 확인되지 않은 symbol PNG 1개뿐이다. primary/inverse/mono SVG, 공식 wordmark, 공식 red, 전용 favicon/app icon, OG image가 없다.
- Vertica·Confluent logo는 파일명과 render 크기가 Wikimedia 2차 source와 일치하지만 공식 master가 아니다. LoadRunner 파일은 비공식 `pngaaa.com` source이며 source page가 `Non-commercial Use`로 표시한다. 세 파일 모두 `blocked`다.
- HashiCorp image asset은 없다. styled text mark의 제한적 nominative use 가능성은 공식 정책에 있으나, 현재의 반복 노출이 그 조건을 충족하는지, 관계·표시 맥락·attribution이 적절한지 확인되지 않아 공개 상태는 `blocked`다.
- Pretendard와 SUIT는 CSS family 이름만 있을 뿐 self-host font 파일, `@font-face`, `next/font`, license copy가 없다.
- `public/product-assets` 디렉터리는 존재하지 않는다.
- Git tracked `public` image/SVG 49개를 모두 아래 표에서 처리했다. 별도로 ignored `public/clients`에 고객 logo 18개의 byte-identical 복사본이 있다.
- 현재 production build의 representative direct-URL probe에서 ignored `public/clients`와 tracked customer/vendor/sample 자산이 모두 HTTP 200으로 서빙됐다. `.gitignore`는 공개 노출 방어선이 아니다.

## 2. 판정 기준

| 상태 | 의미 |
|---|---|
| `verified` | 파일 identity와 저장소 내 생성·이력이 확인됨. 공개 브랜드 승인까지 의미하지는 않음 |
| `user-confirmed` | 사용자가 관계를 확인함. logo 공개 사용 허가와는 별개 |
| `public-use-approved` | 권한 있는 주체의 서면 공개 사용 승인과 범위가 확인됨 |
| `unknown` | source, 관계 또는 사용 조건을 확인할 증거가 부족함 |
| `blocked` | 현재 증거만으로 공개 RC에 사용할 수 없음 |

공개 사용 승인 필드는 서면 증거가 있을 때만 “예”로 판정한다. 검색 결과, 파일명, 기존 노출, `noindex`, prototype 상태는 승인 증거가 아니다.

### 후속 조치 코드

| 코드 | 필요한 조치 |
|---|---|
| `B-GATE` | GTG 권한자가 제공한 source package, 소유자·버전·날짜, primary/inverse/mono/wordmark, 공식 red, clear-space·minimum-size·배경·3D 변형 규칙, 승인자·승인일 확보 |
| `C-GATE` | 고객별 정확한 법인명·관계 확인, 고객이 제공한 최신 official master, 홈페이지/Hero/OG별 서면 허가, 지역·기간·철회 조건, 승인자·날짜 확보 |
| `V-GATE` | 현재 trademark owner의 official master와 지침, GTG의 사용 권한/계약 또는 서면 허가, 허용 표현·attribution, partner/endorsement 비오해 검토 |
| `G-GATE` | 저장소 생성 asset의 최종 GTG brand/design 승인과 공식 red 적용 |
| `F-GATE` | 공식 font release/version/hash, OFL·copyright notice를 저장소에 고정하고 실제 self-host 구현 여부를 별도 결정 |

## 3. 감사 방법과 한계

- 모든 hash는 현재 기준선 파일의 SHA-256이다.
- Git 최초 추가와 변경 이력, `src/content/site.ts`, `HeroCanvas`/fallback/Solution/Company consumer를 대조했다.
- 외부 image를 다운로드하거나 repository에 추가하지 않았다. vendor 공식 trademark policy와 2차 source page의 텍스트만 확인했다.
- `next start` production build에서 `/hero/clients/01_kt.png`(200), `/hero/generated/customer-logos/01_kt.png`(200), `/hero/item-logo/pngaaa.com-5227511.png`(200), customer-card sample(200), item-logo SVG sample(200)을 확인했다. 이는 사용 허가가 아니라 현재 정적 노출 증거다.
- GTG 공식 사이트는 감사 시점에 timeout/502로 직접 열리지 않았다. `docs/approved-content.md`는 파일명과 달리 `draft`이고 approver/date가 `[TBD]`다.
- 저장소에는 고객·vendor의 계약서, permission letter, brand approval mail, asset source URL ledger가 없다.
- Wikimedia/pngaaa 일치는 파일명·형식·render 크기에 근거한 provenance 판정이다. binary 원본을 새로 내려받아 비교하지 않았으며, 이 판정은 사용 허가가 아니다.

## 4. 회사명·브랜드 체계 판정

| 대상 | 현재 값·근거 | 공식 source 여부 | relationship 확인 | public-use approval | 현재 노출 | 상태 | 필요한 후속 조치 |
|---|---|---|---|---|---|---|---|
| 한국어 display name | `지티지 솔루션 컨설팅`, code/draft에만 존재 | 확인 불가; 권한자 source 미확보 | 권한자 확인 없음 | 증빙 없음 | 현재 주요 UI에는 미노출 | `blocked` | `B-GATE`에서 정확한 display name 승인 |
| 영문 display name | `GTG Solutions & Consult`, code/draft에만 존재 | 확인 불가; 권한자 source 미확보 | 권한자 확인 없음 | 증빙 없음 | Header, menu, aria-label, metadata `siteName` | `blocked` | 대소문자, `&`, display/legal 구분 승인 |
| 국문 법인명 | `(주)지티지`, code/draft에만 존재 | 확인 불가; 법인등기·권한자 문서 미확보 | 권한자 확인 없음 | 증빙 없음 | Footer | `blocked` | 법인등기·법무 기준 표기 승인 |
| 영문 법인명 | `GTG Co.,Ltd.`, code/draft에만 존재 | 확인 불가; 권한자 source 미확보 | 권한자 확인 없음 | 증빙 없음 | Footer/copyright | `blocked` | 정확한 comma·spacing·법인 표기 승인 |
| primary/inverse/mono SVG | 파일 없음 | 없음 | N/A | 없음 | 없음 | `blocked` | `B-GATE` source package 제공 |
| official wordmark/lockup | 파일 없음; UI는 plain text | 없음 | N/A | 없음 | Header/menu text | `blocked` | symbol+wordmark, wordmark-only, 가로/세로형 제공 |
| 공식 red | draft sampled `#E90207`, runtime 주 사용 `#E30613`, gradient에 `#F20F1B`/`#8F0710` | 아니오 | N/A | 없음 | CSS, WebGL, generated SVG 전반 | `blocked` | 공식 sRGB/HEX와 허용 gradient·dark 값 승인 |
| favicon/app icon | 전용 파일 없음; primary PNG 재사용 | 아니오 | N/A | 없음 | browser icon, Apple icon metadata | `blocked` | official master 기반 favicon.svg/ico, 16/32px, Apple 180px 등 제공 |
| OG image | 파일·metadata `images` 모두 없음 | 없음 | N/A | 없음 | 없음 | `blocked` | 권리가 정리된 1200×630 master 제공 |

현재 저장소에서 OG 후보로 승격할 수 있는 파일도 없다. `gtg-logo.png`는 source/master가 미확인이고, customer-card 및 item-logo sample은 승인되지 않은 제3자 mark를 포함하므로 OG에 사용할 수 없다. SEO 문구의 “공식 웹사이트” 표현도 `siteContent.isApproved: false`인 draft이며, `noindex`는 그 표현이나 identity의 승인이 아니다.

## 5. GTG identity asset ledger

| 사용 대상 | 저장소 경로 | 파일명 | SHA-256 | 원본 출처 | 공식 source 여부 | relationship 확인 | public-use approval | trademark/endorsement 위험 | 현재 화면 노출 | 상태 | 필요한 후속 조치 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| declared primary symbol, favicon, Apple icon | `public/brand` | `gtg-logo.png` | `baaab8028893385444ac9473d76a5980d4e5058fa76e635dd1c1fd2d1e7dc73f` | 2026-06-25 `f9f4a787`에 추가; 상위 원본·제작자·권리 기록 없음 | 확인 불가 | GTG 소유권 권한자 증빙 없음 | 증빙 없음 | 높음: official identity 오인, favicon 파생 규칙 없음 | logo field는 미사용; favicon/apple로 사용 | `blocked` | `B-GATE`; official master로 교체 |
| mobile/reduced/forced fallback Data Core | `public/generated/hero` | `gtg-data-core.svg` | `839fbd0ea13d8bc32ac0799268efd27e05cb8b98ff67c3b1bde032c48988ed62` | 2026-07-06 `fab4ea9` generated derivative; inline path와 동일 | 확인 불가 | master 연결 증빙 없음 | 증빙 없음 | 높음: `official GTG symbol`이라는 자체 desc는 증빙이 아님; 색·gradient·3D 변형 미승인 | Hero fallback | `blocked` | `B-GATE`; 승인 master에서 재생성 또는 사용 승인 |
| WebGL Data Core symbol geometry | `src/components/three` | `hero-canvas.tsx#GTG_SYMBOL_PATHS` | `3fd1b2304f60bd49afb0e891b69ebc78da29038ce22847df708ebba333bdd504` (containing file) | 2026-07-06 `fab4ea9`에 inline path 추가; master provenance 없음 | 확인 불가 | master 연결 증빙 없음 | 증빙 없음 | 높음: extrusion·gradient·animation 변형 허용 미확인 | desktop WebGL Hero 중심 | `blocked` | `B-GATE`; path source와 변형 범위 승인 |

Header/menu의 `GTG Solutions & Consult`는 image wordmark가 아니라 text다. 따라서 wordmark file hash는 없으며, plain text가 official wordmark approval을 대신하지 않는다.

## 6. 고객 logo ledger

### 공통 증거

- 18개 모두 PNG RGBA 1200×480이며 embedded provenance metadata가 없다.
- tracked 파일은 2026-07-01 `f78deca9`에 일괄 추가됐다.
- ignored `public/clients/<동일 파일명>`과 tracked `public/generated/customer-logos/<동일 파일명>`은 모두 byte-identical이다. `public/clients`의 상위 취득처와 권리는 확인되지 않는다.
- 관계 필드는 모두 `user-confirmed`지만, 이는 `public-use-approved`가 아니다.
- 위험과 후속 조치는 공통으로 **높음 / `C-GATE`**다. “Representative customers”는 관계·보증·특정 제품 사용을 오해하게 할 수 있다.

노출 약어: `W` = desktop WebGL CanvasTexture, `F` = mobile/reduced/forced fallback image, `S` = 18개 전체의 semantic `Representative customers` list.

| 사용 대상 | 저장소 경로 | 파일명 | SHA-256 | 원본 출처 | 공식 source 여부 | relationship 확인 | public-use approval | trademark/endorsement 위험 | 현재 화면 노출 | 상태 | 필요한 후속 조치 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| KT | `public/generated/customer-logos` + ignored `public/clients` | `01_kt.png` | `3068de7bb42af9018cb912146a2e1cbdb0a84b5e23f8746b4beeb3ef92074b2a` | ignored local copy; 상위 원출처 unknown | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/F/S; KT sample에도 포함 | `blocked` | `C-GATE` |
| LG Electronics | 동일 | `02_lg-electronics.png` | `a0bdb37329600ceea7d65cd5a6f0b330cb9c43faaab07eb7ddca8e9acf8d0f11` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/F/S | `blocked` | `C-GATE` |
| Konkuk University Hospital | 동일 | `03_konkuk-university-hospital.png` | `d048122ab268f00ed12f8114a1cc3238c81cbad241039163477b34cac68f4a1c` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/S | `blocked` | `C-GATE` |
| Construction Workers Mutual Aid Association | 동일 | `04_construction-workers-mutual-aid-association.png` | `dbe0f0b3f264c29bb401a024298f99df75c37aec54b3fd5953840e69a0f59072` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | S | `blocked` | `C-GATE` |
| Korea University Medicine | 동일 | `05_korea-university-medicine.png` | `b16ef0bffe0f7c8528b39bf37c91887b325ac57594039bdc8ef368f823d53395` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/S | `blocked` | `C-GATE` |
| Supreme Prosecutors' Office | 동일 | `06_supreme-prosecutors-office.png` | `adcc9e17e54495893b325b5ba8dd4281cd521b0b62ca0542540999070c269378` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/S | `blocked` | `C-GATE` |
| Misto Holdings | 동일 | `07_misto-holdings.png` | `179a2104eb5a664d526374e887a693636aafee8ce28a6f0abce5bd64f204c70a` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | S | `blocked` | `C-GATE` |
| Bithumb | 동일 | `08_bithumb.png` | `7cd9fed9970494b4b15ff6268a7e18d8b9f92df361ebb2057687a0127d85da30` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/F/S | `blocked` | `C-GATE` |
| Samsung SDS | 동일 | `09_samsung-sds.png` | `6fe60849b8ac6529d024b87243a5558dca4a31c5f459e5ff22a9c8e1927e7283` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/F/S | `blocked` | `C-GATE` |
| Samsung Electronics | 동일 | `10_samsung-electronics.png` | `0555a54bf622aab6afd0eee81e113e2e71151a9b02d9ee7fef5b75cb8ea0dfbf` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/F/S | `blocked` | `C-GATE` |
| Saemaul Geumgo | 동일 | `11_saemaul-geumgo.png` | `6f3d7e1fd7f353f757a685fbc7bd8c55007369a39cf31e9c20f7a56975103644` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/S | `blocked` | `C-GATE` |
| Seoul Medical Center | 동일 | `12_seoul-medical-center.png` | `3fe8dee85873e6c56f87adee18b87ad72aa2a5a621c015efcbfcd60cfa81d5d7` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | S | `blocked` | `C-GATE` |
| Shinhan Bank | 동일 | `13_shinhan-bank.png` | `9b865d1a54cf38292b368910bdfb9364cefdbf045b40482fcd105ee93b5c8d50` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/F/S | `blocked` | `C-GATE` |
| Ulsan University Hospital | 동일 | `14_ulsan-university-hospital.png` | `b1f1b0e84b73498a5be9d199833562ea6d45363a635e1e5e529fcc7ce92f7573` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | S | `blocked` | `C-GATE` |
| PTKOREA | 동일 | `15_ptkorea.png` | `1b70aa52dd95e80721dd81bb648a6fe6a7f0713c5b1a8221315b40e0d19ccab4` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/S | `blocked` | `C-GATE` |
| KOMSCO | 동일 | `16_komsco.png` | `0bb0cf0edc9c1286060c11c0aa25e871e7f349dc9d90053e20faf54c6d1a1006` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | W/S | `blocked` | `C-GATE` |
| Techfin Ratings | 동일 | `17_techfin-ratings.png` | `82d3da0670699e918ee7a8f43b165e44429ddabba04356054bbef34d4d869e7d` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | S | `blocked` | `C-GATE` |
| Korea Credit Information Services | 동일 | `18_korea-credit-information-services.png` | `7bcb3ef1b480b4d55259507afc6de21f4d7f3e576e9892864d5696e0ce732ffe` | 동일 | 확인 불가 | `user-confirmed` | 증빙 없음 | 높음 | S | `blocked` | `C-GATE` |

Canvas에서 빠진 6개도 안전한 것은 아니다. 18개 이름 전체가 공개 DOM의 `Representative customers` claim에 들어가므로 logo를 숨기는 것만으로 관계 승인 gate가 해소되지 않는다.

## 7. 제품 mark ledger

세 image logo는 현재 각각 Hero handoff stack, Solutions static technology stack, 대응 Solution spotlight의 세 위치에 반복 노출된다.

| 사용 대상 | 저장소 경로 | 파일명 | SHA-256 | 원본 출처 | 공식 source 여부 | relationship 확인 | public-use approval | trademark/endorsement 위험 | 현재 화면 노출 | 상태 | 필요한 후속 조치 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vertica | `public/item-logo` | `3840px-Vertica_pos_blk_rgb.svg.webp` | `69bafc6bbd84945ef13c87d0f2618ca194939920f2f4f90b6628f767ab58d2f1` | filename/3840×2968 render가 [Wikimedia SVG](https://commons.wikimedia.org/wiki/File:Vertica_pos_blk_rgb.svg)와 일치하는 강한 2차-source 추정; repo provenance 없음. 추정 source는 CC BY-SA 4.0+attribution/share-alike 및 별도 trademark 검토가 필요하나 현재 이행 증빙 없음 | 아니오 | code가 [기술 blog](https://x2wizard.github.io/)를 링크할 뿐이며 현재 trademark owner, 계약, Rocket partner/reseller status의 증빙은 아님 | 증빙 없음 | 매우 높음: 2026 인수 후 권리 주체 재확인 필요, logo 변형·별도 word overlay, affiliation 오해 | handoff/static/Solution 01 | `blocked` | `V-GATE`; Rocket을 포함한 현재 권리자, official master·permission·attribution 확인 |
| Confluent | `public/item-logo` | `3840px-Confluent,_Inc._logo.svg.webp` | `486df6047005b267df0c42920652be6e36a38ca6bf2476d9e868df110ff951ab` | filename/3840×743 render가 [Wikimedia SVG](https://commons.wikimedia.org/wiki/File:Confluent,_Inc._logo.svg) 계열과 일치하는 2차-source 추정; repo provenance 없음. 추정 source는 PD-textlogo로 설명하지만 별도 trademark 제한을 명시 | 아니오 | code가 [GTG Confluent URL](https://www.gtgsc.com/gtg/sub/confluent/platform.php)을 링크할 뿐이며 현재 계약/partner status 증빙은 없음; 2026 IBM 인수 후 실제 permission entity 확인 필요 | 증빙 없음 | 매우 높음: 공식 지침은 express written permission·형식 유지·attribution 요구 | handoff/static/Solution 02 | `blocked` | `V-GATE`; Confluent/IBM 법무 기준 permission grantor와 official master 확인 |
| LoadRunner | `public/item-logo` | `pngaaa.com-5227511.png` | `a63ca4de6dfcfaf1bc338daa75f5e0266c5d70d76b537745813ed3048f19e8df` | [pngaaa detail 5227511](https://www.pngaaa.com/detail/5227511), 979×922, `Non-commercial Use` | 아니오 | code가 [GTG DevOps URL](https://www.gtgsc.com/gtg/sub/devops/load.php)을 링크할 뿐이며 OpenText 계약/partner status 증빙은 없음 | 아니오; source 조건상 상업 홈페이지 사용 불가 | 매우 높음: 비공식 aggregator, stale product identity, CSS color filter, affiliation 오해 | handoff/static/Solution 04 | `blocked` | 현재 파일 사용 금지; `V-GATE` 또는 승인된 text-only 대안 검토 |
| HashiCorp text mark | image asset 없음 | N/A | N/A | `site.ts` text와 CSS text mark | graphic official source 없음 | code가 [GTG HashiCorp URL](https://www.gtgsc.com/gtg/sub/hash/hash.php)을 링크할 뿐이며 계약/partner status evidence level은 `unknown`; 2025 IBM 인수 후 permission entity 확인 필요 | text use 승인 기록 없음 | 중~높음: 반복·강조가 endorsement처럼 보일 수 있음 | handoff/static/Solution 03, 본문/CTA | `blocked` | 최소·정확한 nominative use와 attribution 검토; graphic logo 추가는 `V-GATE` 전 금지 |

### 공식 정책에서 확인된 제한

- Rocket Software는 2026-05-11 [Vertica 인수 완료](https://www.rocketsoftware.com/en-us/news/rocket-software-completes-acquisition-vertica)를 발표했다. 이 발표만으로 정확한 trademark 양도 범위나 GTG 사용권을 추정하지 않는다. [Rocket trademark policy](https://www.rocketsoftware.com/en-us/legal/trademarks)는 Rocket mark의 무허가 fair use를 text-only reference로 제한하고 Rocket logo에는 express written permission을 요구하므로, Vertica의 현 권리자와 적용 지침은 별도로 확인해야 한다.
- IBM과 Confluent는 2026-03-17 [Confluent 인수 완료](https://www.confluent.io/press-release/ibm-completes-acquisition-of-confluent/)를 발표했다. 현재 [Confluent trademark guidelines](https://www.confluent.io/confluent-trademark-guidelines/)는 Confluent Marks에 express written permission, 제공 형식·크기 유지, attribution을 요구한다. 실제 허가 계약 주체는 Confluent/IBM 법무에 확인해야 한다.
- IBM은 2025-02-27 [HashiCorp 인수 완료](https://newsroom.ibm.com/campaign?item=2153)를 발표했다. 현재 [HashiCorp trademark policy](https://www.hashicorp.com/en/trademark-policy)는 정확하고 비오해적인 최소한의 word-mark nominative use를 설명하지만 corporate logo는 express written permission이 필요하고 attribution을 요구한다. 실제 허가 계약 주체는 HashiCorp/IBM 법무에 확인해야 한다.
- [OpenText trademark and logo policy](https://www.opentext.com/about/trademark-and-logo-usage)는 written consent/agreement 없는 logo 사용을 허용하지 않는다. [OpenText 공식 제품 페이지](https://www.opentext.com/products/professional-performance-engineering)는 `LoadRunner Professional`이 현재 `OpenText Professional Performance Engineering`으로 명칭 변경됐다고 안내한다.

## 8. `site.ts` 및 fallback procedural visual ledger

아래 SVG는 repository에서 절차적으로 생성된 local asset이며 외부 image/hotlink가 없다. `verified`는 provenance와 파일 integrity를 뜻한다. 공식 red와 최종 GTG brand/design 승인은 별도다.

| 사용 대상 | 저장소 경로 | 파일명 | SHA-256 | 원본 출처 | 공식 source 여부 | relationship 확인 | public-use approval | trademark/endorsement 위험 | 현재 화면 노출 | 상태 | 필요한 후속 조치 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hero service data: analytics | `public/generated` | `hero-data-analytics.svg` | `fa588cff216af4ae8de092e8d75304c143c760daecc774e284aed5b275cb94f5` | repo procedural, `f9f4a787` 최초 | N/A | N/A | 내부 최종 승인 없음 | 낮음: abstract visual | data 값만 존재; 현재 미렌더 | `verified` | `G-GATE` |
| Hero service data: streaming | 동일 | `hero-data-streaming.svg` | `dde1dff011af416dbf653dd4bfd07c7067cad14ed348e60b884a660faaec0e3c` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | 미렌더 | `verified` | `G-GATE` |
| Hero service data: infrastructure | 동일 | `hero-infrastructure-automation.svg` | `d1dbc517ee8b9cc1fc512b0a8645e75d411bc272dda9833bc2f3bd9e0acc665b` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음; vendor icon language 금지 유지 | 미렌더 | `verified` | `G-GATE` |
| Hero service data: DevOps | 동일 | `hero-devops-quality.svg` | `31125c650f4c1ae8146ecea9989eb32c97f88ba22b6be460874cef4d3e4925f5` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | 미렌더 | `verified` | `G-GATE` |
| Hero service data: DB consulting | 동일 | `hero-database-consulting.svg` | `44a2cdef81df90718f8f566522dc51079c933952664c1327b5ee453ba850bdfa` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | 미렌더 | `verified` | `G-GATE` |
| Hero service data: support | 동일 | `hero-technical-support.svg` | `6b92305ff2a6eef5e0340becbcf8c01d7292c9f6932e1f315f5b9fbcae919944` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | 미렌더 | `verified` | `G-GATE` |
| Hero service data: training | 동일 | `hero-training-delivery.svg` | `26e8e7a229b92d24175c39cb61d3111f64cfd59fcee134276330ac4231e41f79` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | 미렌더 | `verified` | `G-GATE` |
| Solution 01 topology | 동일 | `solution-data-analytics.svg` | `5dbb4c75f23cb4356396bf55a6031758acf2024e6253acc3976cf8180700bf26` | repo procedural, `f9f4a787` 최초 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | Hero handoff background + Solution 01 | `verified` | `G-GATE` |
| Solution 02 topology | 동일 | `solution-data-streaming.svg` | `fd1f6ae21c0b5ff3d90fa775194c977f46b183198fa1de435f4a6698bfddc82f` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | Solution 02 | `verified` | `G-GATE` |
| Solution 03 topology | 동일 | `solution-infrastructure-automation.svg` | `abaf0b70e8673ac38482d77ba96c260c812d0929ae5360006abf9c3c94e98f77` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음; HashiCorp visual imitation 방지 필요 | Solution 03 | `verified` | `G-GATE` |
| Solution 04 topology | 동일 | `solution-devops-quality.svg` | `bfb9484996f0123e74e85d5e8d6e00df05772ca404f966435fd243392b89f6e3` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | Solution 04 | `verified` | `G-GATE` |
| Solution 05 topology | 동일 | `solution-consulting-support.svg` | `80817de86af59b34ce86684a94131ac8af0bae95b0e5d601d584d3a905bb3d59` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | Solution 05 | `verified` | `G-GATE` |
| Company capability desktop | `public/generated/topology` | `gtg-capability-map.svg` | `ef270e3479c4785891094e3f0b2dbd3ba96956cf6a9d4cbef74d9428ad3fbd62` | repo procedural, `65a2c721` | N/A | N/A | 내부 최종 승인 없음 | 낮음 | Company desktop | `verified` | `G-GATE` |
| Company capability mobile | 동일 | `gtg-capability-map-mobile.svg` | `18145574ba97494a025147d249229dbe4ff8e58a675408d8a3fa607b68d546f3` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | Company mobile | `verified` | `G-GATE` |

## 9. 관련 `public` 파생 자산 ledger

이 파일들은 현재 page component가 직접 참조하지 않더라도 `public` 아래에 있어 정적 URL 노출 대상이 될 수 있다. runtime 미참조는 권리 해소가 아니다.

| 사용 대상 | 저장소 경로 | 파일명 | SHA-256 | 원본 출처 | 공식 source 여부 | relationship 확인 | public-use approval | trademark/endorsement 위험 | 현재 화면 노출 | 상태 | 필요한 후속 조치 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| customer card frame | `public/generated/customer-cards` | `customer-card-frame.svg` | `8820dc5875ebe7d5fa160f2847af0d83c7261feff998243d5831cf0ce5d9d1f8` | repo procedural, `f78deca9` | N/A | N/A | 내부 최종 승인 없음 | 낮음; provisional red | page 미참조 | `verified` | `G-GATE` |
| customer card mask | 동일 | `customer-card-mask.svg` | `a0e7000e09d3e3828938be704829c1a7861054bebb150a6c90af02e3c58925e0` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | page 미참조 | `verified` | `G-GATE` |
| KT customer sample | 동일 | `customer-card-sample.png` | `65b38708074d6a20e66eedeba893d5b18e147144fb7719036110b3c23106c64c` | repo composite + blocked KT logo | 아니오 | KT `user-confirmed` | 증빙 없음 | 높음: customer derivative | page 미참조; direct URL 가능 | `blocked` | `C-GATE` |
| product logo application sample | `public/generated/item-logo-sample` | `gtg-item-logo-application-sample.svg` | `213ee48506db97752f592c42ef2e1794bb6e9810be38307565ffc0b6b9434433` | repo sample; 3 local vendor logos를 relative embed | 아니오 | 제품 관계 미확인 | 증빙 없음 | 매우 높음: blocked logo 3개 파생 | page 미참조; direct URL 가능 | `blocked` | `V-GATE`; public 산출물에서 제외 |
| rasterized product sample | 동일 | `gtg-item-logo-application-sample.png` | `1ecb2f7bb775724caa2de8f59186c781d9e69b3d93b8cfab78bf3b3821497362` | 위 sample의 raster composite | 아니오 | 제품 관계 미확인 | 증빙 없음 | 매우 높음 | page 미참조; direct URL 가능 | `blocked` | `V-GATE`; public 산출물에서 제외 |
| topology source: analytics | `public/generated/topology` | `gtg-data-analytics.svg` | `b4540f164fb42320bab853d4f03b7d890be780d18e99cebe20897670cf962def` | repo procedural, `d3050de` | N/A | N/A | 내부 최종 승인 없음 | 낮음 | page 미참조 | `verified` | `G-GATE` |
| topology source: streaming | 동일 | `gtg-data-streaming.svg` | `68928b6ba0e9001917c2864014db5357749896663c5bb6338f8489bb75100816` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | page 미참조 | `verified` | `G-GATE` |
| topology source: infrastructure | 동일 | `gtg-infrastructure-automation.svg` | `7051030e6142d7aaaef5af7da9b2496c915a5161aeb31e0669098dbb1d9eb7f1` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음; vendor visual imitation 방지 | page 미참조 | `verified` | `G-GATE` |
| topology source: DevOps | 동일 | `gtg-devops-quality.svg` | `10b2f77862b452b3d3befc988ef77386095568705846af63c7c633f25cee9622` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | page 미참조 | `verified` | `G-GATE` |
| topology source: consulting/support | 동일 | `gtg-consulting-support.svg` | `f0955c2239b3b8e2b09a2b57a13625e49e312795cf305018f96eb90f09219296` | 동일 | N/A | N/A | 내부 최종 승인 없음 | 낮음 | page 미참조 | `verified` | `G-GATE` |
| topology primitives | 동일 | `gtg-primitives.svg` | `828a4386d579faa380d8ab25ab46d4b8ff2d4259cf03c5127fe606db5aa3fd2a` | repo procedural, `d3050de` | N/A | N/A | 내부 최종 승인 없음 | 중간: provisional angular GTG marker 포함 | page 미참조 | `verified` | `B-GATE` + `G-GATE` |
| provisional red marker | 동일 | `gtg-red-marker.svg` | `78fd64567f79998931ef4f7d1a3ea84406ebdac6a28b01f526f1304cd4db8a13` | repo generated, `fab4ea9`; `#E90207` | 아니오 | master 연결 없음 | 증빙 없음 | 높음: official brand mark로 오인 가능 | page 미참조 | `blocked` | `B-GATE` |

## 10. Font ledger

| 사용 대상 | 저장소 경로 | 파일명/hash | 원본 출처 | 공식 source 여부 | relationship 확인 | public-use approval | 위험 | 현재 노출 | 상태 | 필요한 후속 조치 |
|---|---|---|---|---|---|---|---|---|---|---|
| future self-host candidate | font asset 없음 | Pretendard / N/A | [Pretendard official repository LICENSE](https://github.com/orioncactus/pretendard/blob/main/LICENSE), SIL OFL 1.1 | upstream license source `verified`; 배포 binary 없음 | N/A | 현재 배포 파일 없음 | 낮음; 실제 self-host라고 오인, license copy 누락 가능 | CSS family reference만 있으며 OS 설치 시 사용, 아니면 system fallback | `blocked` | self-host 도입 시에만 `F-GATE` |
| future self-host candidate | font asset 없음 | SUIT / N/A | [SUIT official LICENSE](https://github.com/sun-typeface/SUIT/blob/main/LICENSE), SIL OFL 1.1 | upstream license source `verified`; 배포 binary 없음 | N/A | 현재 배포 파일 없음 | 낮음; Reserved Font Name·license copy 조건 | CSS family reference만 있으며 OS 설치 시 사용 | `blocked` | self-host 도입 시에만 `F-GATE` |

현재 `@font-face`, `next/font`, `public/fonts`, WOFF/WOFF2/TTF/OTF, font license copy가 없다. CSS stack에 family 이름이 있다는 사실은 self-host 구현이나 font asset 승인이 아니다. 위 `blocked`는 향후 self-host binary 도입 gate이며, 현재 system fallback 공개 자체를 차단한다는 뜻은 아니다. `gtg-item-logo-application-sample.svg`도 `Pretendard` family 이름을 참조하지만 font data를 embed하지 않는다.

## 11. 공개 전 필수 gate

### Gate A — GTG identity

- 권한 있는 담당자가 한국어·영문 display name과 국·영문 법인명을 승인한다.
- 소유자·source·version이 명확한 primary/inverse/mono SVG와 wordmark lockup을 제공한다.
- 공식 red, clear-space, minimum-size, light/dark background와 3D/gradient 변형 규칙을 승인한다.
- inline/fallback GTG symbol path가 official master에서 파생됐음을 확인하거나 교체한다.
- favicon/app icon과 1200×630 OG를 official master에서 생성하고 승인한다.

### Gate B — 고객 proof

- 18개 각각 `C-GATE`를 완료한다.
- logo 승인뿐 아니라 `Representative customers`라는 관계 claim의 공개 승인도 별도로 확인한다.
- 승인되지 않은 고객은 Canvas, fallback, semantic list, static sample, 향후 HTML trust band와 OG에서 모두 제외한다.

### Gate C — vendor marks

- Vertica, Confluent, LoadRunner current files는 공개용으로 사용하지 않는다.
- 현재 trademark owner와 공식 master/version을 확인하고 `V-GATE`를 완료한다.
- HashiCorp를 포함한 word mark는 필요한 최소 범위, 정확한 상품명, attribution, non-endorsement 표현을 검토한다.
- partner/reseller/certification status는 문서 증빙 없이 표시하지 않는다.

### Gate D — repository exposure

- 현재 gate 결과: **FAIL**. 2026-07-10 representative production probe에서 ignored 고객 복사본과 blocked tracked 자산·sample이 HTTP 200이었다.
- `.gitignore`는 Next의 `public` 정적 서빙이나 배포 제외 수단이 아니다. 현재 물리적으로 존재하는 `public/clients` 18개 복사본은 public tree 밖으로 격리하거나 build/deploy 입력에서 명시적으로 제외됐음을 증명하기 전까지 `blocked`다.
- production-like 서버에서 `/hero/clients/*`, `/hero/generated/customer-logos/*`, `/hero/item-logo/*`, `/hero/generated/customer-cards/customer-card-sample.png`, `/hero/generated/item-logo-sample/*` 중 승인되지 않은 경로가 404인지 확인하고, 배포 manifest에도 포함되지 않았음을 검증한다.
- 권리 미확정 asset을 단순히 UI에서 숨기는 것과 public file을 배포에서 제외하는 것을 구분한다.
- asset별 source URL, owner, hash, version, approval scope, approver/date를 유지하는 영구 ledger를 운영한다.

## 12. 현재 공개용으로 사용할 수 없는 자산

- `public/brand/gtg-logo.png`와 이를 재사용한 favicon/apple icon.
- inline `GTG_SYMBOL_PATHS`, `gtg-data-core.svg`, `gtg-red-marker.svg` 및 official master에 연결되지 않은 GTG identity derivative.
- 고객 logo 18개 전부, ignored `public/clients` 복사본, KT customer-card sample.
- Vertica, Confluent, LoadRunner logo 3개와 두 item-logo application sample.
- 권리·관계·attribution 검토 전의 반복적 HashiCorp styled text mark.
- 아직 존재하지 않는 official SVG variants, dedicated favicon/app icon, OG image, self-host Pretendard/SUIT를 존재하거나 승인된 것처럼 취급하는 것.

Repository-generated abstract Hero/Solution/topology SVG는 외부 source 혼입이 확인되지 않아 provenance 기준 `verified`지만, 공식 red와 최종 GTG brand/design 승인을 통과하기 전에는 release-ready로 승격하지 않는다.
