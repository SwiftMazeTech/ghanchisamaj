"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function ImageModalButton({ label, image, title, description, variant = "secondary" }) {
  const [open, setOpen] = useState(false);
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" className={`button ${variant}`} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open ? (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={title}>
          <button
            type="button"
            className="gallery-modal__backdrop"
            aria-label={ui.closeImage}
            onClick={() => setOpen(false)}
          />
          <div className="gallery-modal__dialog">
            <button
              type="button"
              className="gallery-modal__close"
              aria-label={ui.closeImage}
              onClick={() => setOpen(false)}
            >
              x
            </button>
            <div className="gallery-modal__media">
              <Image src={image} alt={title} fill sizes="90vw" className="gallery-modal__image" />
            </div>
            <div className="gallery-modal__caption">
              <p className="eyebrow">{ui.donationEyebrow}</p>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
