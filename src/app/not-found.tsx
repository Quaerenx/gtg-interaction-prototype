import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="not-found-page"
        data-testid="not-found-page"
        data-header-theme="light"
        aria-labelledby="not-found-heading"
        tabIndex={-1}
      >
        <div className="not-found-inner">
          <p className="section-eyebrow">404</p>
          <h1 id="not-found-heading">페이지를 찾을 수 없습니다</h1>
          <p>요청한 페이지가 존재하지 않거나 이동되었습니다.</p>
          <Link className="not-found-home" href="/">
            홈으로 돌아가기
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
