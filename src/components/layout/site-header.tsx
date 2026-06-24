import Image from "next/image";
import Link from "next/link";
import { prototypeContent } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Site header">
      <div className="header-cluster header-cluster-left" aria-label="Prototype labels">
        <span className="header-link header-label" aria-disabled="true">
          ABOUT
        </span>
        <span className="header-link header-label" aria-disabled="true">
          CONTACT
        </span>
      </div>

      <Link className="header-brand" href="/" aria-label="GTG Solutions & Consult home">
        {prototypeContent.companyName}
      </Link>

      <div className="header-cluster header-cluster-right">
        <button className="menu-button" type="button" aria-label="Open menu">
          <span>MENU</span>
          <span className="menu-rule" aria-hidden="true" />
          <Image
            className="header-logo"
            src="/brand/gtg-logo.png"
            alt=""
            width={44}
            height={44}
            priority
          />
        </button>
      </div>
    </header>
  );
}
