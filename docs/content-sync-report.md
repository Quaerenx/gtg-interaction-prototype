# Content Sync Report

## Hero CTA destination

Field: Hero CTA destination
Document value: `#contact`
Code value: `heroContent.primaryCta.href = "#contact"`
Resolution: Synced the approved-content document to the current internal page anchor behavior.
Approval required: no for mechanical sync; yes before treating full page content as final.

## Footer copyright

Field: Footer copyright
Document value: `© GTG Co.,Ltd. All Rights Reserved.`
Code value: `footerContent.copyright = "© GTG Co.,Ltd. All Rights Reserved."`
Resolution: Synced the document from the older `Copyright c` spelling to the mechanical copyright symbol fix already used in code.
Approval required: no for mechanical symbol correction; yes for final legal approval.

## Phone tel href

Field: Phone tel href
Document value: `tel:02-6293-7100`
Code value: `contactContent.phoneHref = "tel:02-6293-7100"`
Resolution: Added the explicit telephone href to the approved-content document.
Approval required: no for mechanical accessibility sync; yes for final contact approval.

## Company headlineLines

Field: Company headlineLines
Document value: `["데이터 플랫폼과", "소프트웨어 품질을 위한", "기술 파트너"]`
Code value: `companyContent.headlineLines.desktop/mobile`
Resolution: Added the editorial line-break structure to the approved-content document without changing the approved headline copy.
Approval required: no for line-break documentation; yes for final copy approval.

## Engagement headlineLines

Field: Engagement headlineLines
Document value: `["확인, 정의, 실행,", "운영 안정화로 이어지는", "수행 흐름"]`
Code value: `engagementContent.headlineLines.desktop/mobile`
Resolution: Added the editorial line-break structure to the approved-content document without changing the approved headline copy.
Approval required: no for line-break documentation; yes for final copy approval.

## Preview noindex policy

Field: Preview noindex policy
Document value: Approval status is `draft`.
Code value: Metadata uses `noindex,nofollow` unless the site is both approved and running in production; `robots.ts` disallows all while draft.
Resolution: Code remains aligned with draft release safety.
Approval required: yes before removing noindex.

## Canonical policy

Field: Canonical policy
Document value: Canonical URL is `https://www.gtgsc.com/`.
Code value: Canonical metadata and sitemap URL are emitted only when `siteContent.isApproved` is true in a production environment.
Resolution: Official URL is recorded, but not emitted while the site is draft.
Approval required: yes before production canonical exposure.
