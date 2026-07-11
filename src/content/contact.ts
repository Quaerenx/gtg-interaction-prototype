export const contactContent = {
  id: "contact",
  headline: "GTG에 문의하세요",
  description:
    "솔루션, 컨설팅, 기술지원 문의는 공식 사이트의 공개 연락처를 사용하세요. Vertica 교육 문의는 기술 블로그에 공개된 교육 문의 메일을 사용할 수 있습니다.",
  email: "webmaster@gtgsc.com",
  phone: "02-6293-7100",
  phoneHref: "tel:02-6293-7100",
  address: "08511, 서울시 금천구 디지털로 178, A동 2513호 (가산동, 가산퍼블릭)",
  primaryCta: {
    label: "공식 문의 페이지로 이동",
    href: "https://www.gtgsc.com/gtg/sub/company/company.php"
  },
  emailCta: {
    label: "이메일 문의",
    href: "mailto:webmaster@gtgsc.com"
  }
} as const;

export const footerContent = {
  copyright: "© GTG Co.,Ltd. All Rights Reserved.",
  links: [
    {
      label: "개인정보처리방침",
      href: "https://www.gtgsc.com/gtg/sub/customer/privacy.php"
    }
  ]
} as const;
