"use client";

import { useLanguage } from "./LanguageProvider";

function AddressIcon() {
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

function ChatIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.19c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.15.18-.31.21-.58.07-.27-.14-1.13-.42-2.16-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.48.07-.73.34s-.95.93-.95 2.27.97 2.64 1.11 2.82c.14.18 1.9 2.9 4.6 4.07.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.16-1.28-.07-.12-.24-.18-.51-.32Z"
      />
      <path
        fill="currentColor"
        d="M16.03 4.8c-6.16 0-11.16 5-11.16 11.16 0 1.96.51 3.88 1.49 5.57L4.8 27.2l5.83-1.53c1.61.88 3.41 1.34 5.4 1.34 6.16 0 11.16-5 11.16-11.16S22.19 4.8 16.03 4.8Zm0 20.28c-1.73 0-3.43-.46-4.93-1.33l-.35-.21-3.46.91.92-3.37-.23-.35a9.16 9.16 0 0 1-1.41-4.87c0-5.06 4.12-9.18 9.18-9.18s9.18 4.12 9.18 9.18-4.12 9.22-9.18 9.22Z"
      />
    </svg>
  );
}

function sanitizePhone(value) {
  return value.replace(/[^\d+]/g, "");
}

export default function ContactCard() {
  const { siteContent } = useLanguage();
  const { officeName, address, phone, secondaryPhone, emails, whatsapp, chiefFunctionary } = siteContent.contact;
  const { ui } = siteContent;

  const mapQuery = encodeURIComponent(`${officeName}, ${address}`);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const phoneNumbers = [phone, secondaryPhone].filter(Boolean);

  const detailGroups = [
    {
      key: "address",
      label: ui.contact.addressLabel || "Address",
      icon: <AddressIcon />,
      items: [{ label: address, href: mapHref, external: true }],
    },
    {
      key: "phone",
      label: ui.contact.phoneLabel || "Phone",
      icon: <PhoneIcon />,
      items: phoneNumbers.map((item) => ({ label: item, href: `tel:${sanitizePhone(item)}` })),
    },
    {
      key: "email",
      label: ui.contact.emailLabel || "Email",
      icon: <MailIcon />,
      items: emails.map((item) => ({ label: item, href: `mailto:${item}` })),
    },
    ...(whatsapp
      ? [
          {
            key: "whatsapp",
            label: ui.contact.whatsappLabel || "WhatsApp",
            icon: <ChatIcon />,
            items: [{ label: `+${whatsapp}`, href: `https://wa.me/${whatsapp}`, external: true }],
          },
        ]
      : []),
  ];

  return (
    <section className="contact-card">
      <div className="contact-card__panel">
        <p className="eyebrow">{ui.contact.cardEyebrow}</p>
        <h2>{officeName}</h2>
        <p>{ui.contact.cardDescription}</p>
        <p className="contact-card__chief">
          <strong>{ui.contact.chiefFunctionary}:</strong> {chiefFunctionary}
        </p>

        <div className="contact-details">
          {detailGroups.map((group) => (
            <article key={group.key} className="contact-detail">
              <div className="contact-detail__icon">{group.icon}</div>
              <div className="contact-detail__body">
                <p className="contact-detail__label">{group.label}</p>
                <div className="contact-detail__values">
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="contact-detail__link"
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title={`${officeName} map`}
          src={mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a href={mapHref} target="_blank" rel="noreferrer" className="contact-map__link">
          {ui.contact.openMapLabel || "Open in Google Maps"}
        </a>
      </div>
    </section>
  );
}
