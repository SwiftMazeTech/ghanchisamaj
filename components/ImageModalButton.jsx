"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import ZoomableImageModal from "./ZoomableImageModal";

export default function ImageModalButton({ label, image, title, description, variant = "secondary" }) {
  const [open, setOpen] = useState(false);
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  return (
    <>
      <button type="button" className={`button ${variant}`} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open ? (
        <ZoomableImageModal
          title={title}
          image={image}
          alt={title}
          onClose={() => setOpen(false)}
          ui={ui}
          captionEyebrow={ui.donationEyebrow}
          captionTitle={title}
          captionDescription={description}
        />
      ) : null}
    </>
  );
}
