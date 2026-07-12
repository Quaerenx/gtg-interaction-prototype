# GTG Font Recommendation

작성일: 2026-07-02  
범위: GTG Solutions & Consult 웹 프로토타입의 한국어/영어 타이포그래피 시스템 추천

## Final Recommendation

1순위는 Pretendard Variable이다. GTG 사이트는 한국어 headline, 영어 service term, 고객명, technical label, navigation이 동시에 등장하므로 한글과 라틴/숫자의 균형이 좋은 UI 폰트가 필요하다. Pretendard는 한국어 UI와 영문 기술 용어를 한 family 안에서 안정적으로 처리할 수 있고, variable/다중 weight 구성이 있어 Hero부터 diagram label까지 한 체계로 묶기 좋다.

2순위는 SUIT Variable이다. SUIT는 본문, navigation, technical diagram label에 특히 적합한 조용하고 정돈된 인상을 준다. Pretendard를 primary로 두고 SUIT를 secondary 또는 diagram/body 대안으로 검토하는 조합이 가장 안전하다.

권장 stack:

```css
font-family:
  "Pretendard Variable",
  Pretendard,
  "SUIT Variable",
  SUIT,
  "Apple SD Gothic Neo",
  "Noto Sans KR",
  "Segoe UI",
  "Malgun Gothic",
  Arial,
  sans-serif;
```

외부 CDN hotlink는 피한다. 승인된 WOFF2 파일을 self-host하고, 라이선스 파일을 repo에 함께 보관하는 방식을 권장한다.

## Usage By Area

| Area | Recommended font | Weight | Notes |
|---|---|---:|---|
| Hero headline | Pretendard Variable | 650-750 | GTG의 기술 컨설팅 톤을 선명하게 유지. Wanted Sans 700은 별도 시각 테스트 후 display 대안 |
| Hero body | Pretendard Variable | 400-500 | 긴 한국어 문장 가독성 우선 |
| Navigation | Pretendard or SUIT | 650-750 | letter-spacing 0 유지 |
| Customer card label | Pretendard or SUIT | 600 | 로고보다 강하지 않게 |
| Solution title | Pretendard Variable | 650-750 | 한국어/영어 혼합 줄바꿈 확인 |
| Diagram label | SUIT or Pretendard | 500-650 | 숫자/영문 label이 많으면 IBM Plex Sans KR 대안 검토 |
| Body text | Pretendard or SUIT | 400-500 | line-height를 충분히 두고 작은 크기 과용 금지 |
| Metadata/eyebrow | SUIT or Pretendard | 600 | 영문 uppercase 과용 금지 |

## Candidate Matrix

| Font | Maker/distribution | License/source | Korean impression | English/number impression | Hero | Body | Diagram | Recommendation | Caution |
|---|---|---|---|---|---:|---:|---:|---|---|
| Pretendard Variable | Kil Hyung-jin / orioncactus | SIL OFL, https://github.com/orioncactus/pretendard | 현대적, 중립적, 한국어 UI에 강함 | Inter 기반 감각으로 기술 용어와 숫자 안정적 | 5 | 5 | 4 | Primary | 3-4개 weight만 운영해 hierarchy를 단순화 |
| SUIT Variable | SUNN | SIL OFL, https://github.com/sun-typeface/SUIT | 단정하고 조밀한 UI 인상 | label/body 안정적 | 3 | 5 | 5 | Secondary | Hero 단독 사용 시 인상이 약할 수 있음 |
| Wanted Sans | Wanted Lab / contributors | OFL-1.1, https://github.com/wanteddev/wanted-sans | 기하학적이고 브랜드성이 있음 | headline에서 선명함 | 5 | 4 | 3 | Display alternative | 스타트업/채용 플랫폼 인상이 묻을 수 있음 |
| Noto Sans KR | Google/Adobe/Sandoll ecosystem | OFL, https://notofonts.github.io/noto-docs/website/use/ | 매우 안정적, 범용적 | global fallback에 강함 | 3 | 5 | 4 | Fallback | GTG 고유 인상은 약함 |
| IBM Plex Sans KR | IBM | OFL, https://github.com/IBM/plex | 기술적이고 정돈됨 | 영문/숫자/라벨 강함 | 3 | 4 | 5 | Technical label option | IBM 브랜드 인상이 강할 수 있음 |
| Spoqa Han Sans Neo | Spoqa | 공개 서체, https://spoqa.github.io/spoqa-han-sans/en-US/ | 서비스 UI에 익숙하고 읽기 쉬움 | 안정적 | 3 | 4 | 4 | Conservative alternative | distinctive함은 낮음 |
| LINE Seed KR | LINE/LY Corp/Sandoll | SIL OFL, https://seed.line.me/index_kr.html | 친근하고 둥근 인상 | 안정적이나 weight 제한 | 3 | 4 | 3 | Limited alternative | GTG에는 다소 consumer tone |
| Paperlogy/Paperozi | Lee J. x Kim Do-gyun, Noonnu listing | Free commercial/SIL OFL 표기, https://noonnu.cc/en/font_page/1456 | display/deck 감각 | headline accent 가능 | 4 | 3 | 2 | Deck/accent only | 원 배포처와 license file 재확인 필요 |

## Licensing And Implementation Notes

| Topic | Recommendation |
|---|---|
| Hosting | production에서는 CDN hotlink 대신 `public/fonts/` self-host 권장 |
| License files | OFL 또는 해당 폰트 license 파일을 repo에 보관 |
| Modified fonts | Reserved Font Name 여부 확인 후 수정 배포 |
| Performance | variable WOFF2 1-2개 family만 먼저 도입. 불필요한 weight 다운로드 금지 |
| CSS loading | `font-display: swap` 또는 프로젝트 성격에 맞는 fallback 전략 사용 |
| Accessibility | viewport 기반 font-size scale 금지. letter-spacing은 0 유지 |
| QA | Korean long headline, English service labels, customer names, diagram labels, mobile line breaks를 함께 캡처 검수 |

## Suggested CSS Tokens

```css
:root {
  --font-sans:
    "Pretendard Variable",
    Pretendard,
    "SUIT Variable",
    SUIT,
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Segoe UI",
    "Malgun Gothic",
    Arial,
    sans-serif;

  --font-label:
    "SUIT Variable",
    SUIT,
    "Pretendard Variable",
    Pretendard,
    "Noto Sans KR",
    sans-serif;
}
```

현재 단계에서는 CSS 적용보다 폰트 파일 출처, 라이선스, weight 정책, fallback 정책을 먼저 확정하는 것이 좋다. 폰트가 확정되면 Hero card texture, SVG diagram label, OG image, deck master까지 같은 type system으로 묶을 수 있다.

