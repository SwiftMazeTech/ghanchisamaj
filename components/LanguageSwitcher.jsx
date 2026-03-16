"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const languages = [
  { code: "en", flagClassName: "language-switcher__flag language-switcher__flag--en" },
  { code: "gu", flagClassName: "language-switcher__flag language-switcher__flag--gu" },
  { code: "hi", flagClassName: "language-switcher__flag language-switcher__flag--hi" },
];

export default function LanguageSwitcher({ onChange }) {
  const { language, setLanguage, siteContent } = useLanguage();
  const { languageNames, languageSwitcherLabel } = siteContent.ui;
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    setOpen(false);
    onChange?.(nextLanguage);
  };

  const activeLanguage = languages.find((item) => item.code === language) || languages[0];

  return (
    <div className={`language-switcher ${open ? "is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="language-switcher__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={languageSwitcherLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={activeLanguage.flagClassName} aria-hidden="true" />
        <span className="language-switcher__trigger-label">{languageNames[activeLanguage.code]}</span>
        <span className="language-switcher__caret" aria-hidden="true" />
      </button>
      {open ? (
        <div className="language-switcher__menu" role="listbox" aria-label={languageSwitcherLabel}>
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              className={`language-switcher__option ${language === item.code ? "is-active" : ""}`}
              aria-selected={language === item.code}
              onClick={() => handleLanguageChange(item.code)}
            >
              <span className={item.flagClassName} aria-hidden="true" />
              <span>{languageNames[item.code]}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
