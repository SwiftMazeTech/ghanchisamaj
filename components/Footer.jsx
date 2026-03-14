"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-panel footer-panel--about">
          <p className="footer-kicker">{ui.footer.aboutKicker}</p>
          <div className="footer-brand">
            <Image src={siteContent.logo} alt={siteContent.orgName} width={54} height={54} />
            <span>{siteContent.orgName}</span>
          </div>
          <p>{siteContent.story}</p>
        </div>
        <div className="footer-panel footer-panel--explore">
          <p className="footer-kicker">{ui.footer.exploreKicker}</p>
          <div className="footer-links">
            {siteContent.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-panel footer-panel--contact">
          <p className="footer-kicker">{ui.footer.contactKicker}</p>
          <p>{siteContent.contact.address}</p>
          <p>{siteContent.contact.phone}</p>
          {siteContent.contact.secondaryPhone ? <p>{siteContent.contact.secondaryPhone}</p> : null}
          <p>{siteContent.contact.emails.join(" / ")}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 {siteContent.orgName}</span>
        <span>{ui.footer.credit}</span>
      </div>
    </footer>
  );
}
