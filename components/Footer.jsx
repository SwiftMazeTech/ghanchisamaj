"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

function sanitizePhone(value) {
  return value.replace(/[^\d+]/g, "");
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m7.2 4.6 2 2.1-.9 1.8c-.2.4-.2.8 0 1.2.8 1.6 2 2.8 3.6 3.6.4.2.8.2 1.2 0l1.8-.9 2.1 2c.5.5.5 1.3 0 1.8l-1.3 1.3c-.6.6-1.5.8-2.3.5-2.7-.9-5.1-2.6-7-4.5-1.9-1.9-3.6-4.3-4.5-7-.3-.8-.1-1.7.5-2.3l1.3-1.3c.5-.5 1.3-.5 1.8 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.2s-5.2-5.1-5.2-9.3A5.2 5.2 0 1 1 17.2 11c0 4.1-5.2 9.2-5.2 9.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.4" r="1.9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m5.8 8 6.2 4.8L18.2 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const { siteContent } = useLanguage();
  const { ui } = siteContent;
  const { address, phone, secondaryPhone, emails, officeName } = siteContent.contact;
  const mapQuery = encodeURIComponent(`${officeName}, ${address}`);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const creditMatch = ui.footer.credit.match(/^(.*?)(\s*\(\+91[^)]+\))$/);

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
          <a href={mapHref} target="_blank" rel="noreferrer" className="footer-contact-item footer-contact-item--address">
            <span className="footer-contact-item__icon">
              <LocationIcon />
            </span>
            <span>{address}</span>
          </a>
          <a href={`tel:${sanitizePhone(phone)}`} className="footer-contact-item">
            <span className="footer-contact-item__icon">
              <PhoneIcon />
            </span>
            <span>{phone}</span>
          </a>
          {secondaryPhone ? (
            <a href={`tel:${sanitizePhone(secondaryPhone)}`} className="footer-contact-item">
              <span className="footer-contact-item__icon">
                <PhoneIcon />
              </span>
              <span>{secondaryPhone}</span>
            </a>
          ) : null}
          {emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="footer-contact-item">
              <span className="footer-contact-item__icon">
                <MailIcon />
              </span>
              <span>{email}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 {siteContent.orgName}. All rights reserved</span>
        {creditMatch ? (
          <span className="footer-credit">
            <span className="footer-credit__prefix">Designed &amp; Developed by</span>
            <Link href="https://www.swiftmazetech.com/" target="_blank" rel="noreferrer" className="footer-credit__link">
              <span className="footer-credit__label">
                {creditMatch[1].replace(/^Designed\s*&\s*Developed\s*by\s*/i, "").trim()}
              </span>
              <span className="footer-credit__phone">{creditMatch[2].trim()}</span>
            </Link>
          </span>
        ) : (
          <Link href="https://www.swiftmazetech.com/" target="_blank" rel="noreferrer" className="footer-credit__link">
            {ui.footer.credit}
          </Link>
        )}
      </div>
    </footer>
  );
}
