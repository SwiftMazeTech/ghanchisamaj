"use client";

import { useLanguage } from "./LanguageProvider";

export default function ContactCard() {
  const { siteContent } = useLanguage();
  const { officeName, address, phone, secondaryPhone, emails, chiefFunctionary } = siteContent.contact;
  const { ui } = siteContent;

  return (
    <section className="contact-card">
      <div className="contact-card__intro">
        <p className="eyebrow">{ui.contact.cardEyebrow}</p>
        <h2>{officeName}</h2>
        <p>{ui.contact.cardDescription}</p>
      </div>
      <div className="contact-details">
        <p>{address}</p>
        <p>{ui.contact.chiefFunctionary}: {chiefFunctionary}</p>
        <p>{phone}</p>
        {secondaryPhone ? <p>{secondaryPhone}</p> : null}
        {emails.map((email) => (
          <p key={email}>{email}</p>
        ))}
      </div>
    </section>
  );
}
