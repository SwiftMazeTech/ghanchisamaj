"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { formatDisplayPhone, sanitizePhone } from "../lib/phone";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { siteContent } = useLanguage();
  const { ui } = siteContent;
  const closeMenuLabel = ui.closeMenu || ui.closeGallery || "Close menu";
  const phoneNumbers = [siteContent.contact.phone, siteContent.contact.secondaryPhone].filter(Boolean);
  const navItems = [...siteContent.nav];
  const galleryIndex = navItems.findIndex((item) => item.href === "/gallery");

  if (!navItems.some((item) => item.href === "/get-involved")) {
    const getInvolvedItem = { label: ui.getInvolved, href: "/get-involved" };
    if (galleryIndex >= 0) {
      navItems.splice(galleryIndex + 1, 0, getInvolvedItem);
    } else {
      navItems.push(getInvolvedItem);
    }
  }

  return (
    <header className="site-header">
      <div className="announcement">
        <span className="announcement__meta">{siteContent.establishedLabel}</span>
        <div className="announcement__contact">
          {phoneNumbers.map((item) => (
            <a key={item} href={`tel:${sanitizePhone(item)}`} className="announcement__phone">
              {formatDisplayPhone(item)}
            </a>
          ))}
          {siteContent.contact.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="announcement__email">
              {email}
            </a>
          ))}
        </div>
      </div>
      <div className="brand-row-shell">
        <div className="brand-row">
          <div>
            <Link href="/" className="brand-mark">
              <span className="brand-badge brand-badge--logo">
                <Image src={siteContent.logo} alt={siteContent.orgName} width={78} height={78} />
              </span>
              <span>
                <strong>{siteContent.orgName}</strong>
                <small>{siteContent.tagline}</small>
              </span>
            </Link>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? closeMenuLabel : ui.menu}
          >
            <span className="menu-toggle__label">{ui.menu}</span>
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <nav className={`main-nav ${open ? "open" : ""}`}>
            <button type="button" className="main-nav__close" onClick={() => setOpen(false)} aria-label={closeMenuLabel}>
              <span />
              <span />
            </button>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="nav-language-switcher">
              <LanguageSwitcher onChange={() => setOpen(false)} />
            </div>
          </nav>
          <div className="header-tools">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
