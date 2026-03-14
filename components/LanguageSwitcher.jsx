"use client";

import { useLanguage } from "./LanguageProvider";

const languages = ["en", "hi", "gu"];

export default function LanguageSwitcher() {
  const { language, setLanguage, siteContent } = useLanguage();
  const { languageNames, languageSwitcherLabel } = siteContent.ui;

  return (
    <div className="language-switcher" role="tablist" aria-label={languageSwitcherLabel}>
      <span className={`language-switcher__thumb language-switcher__thumb--${language}`} aria-hidden="true" />
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          className={`language-switcher__button ${language === item ? "is-active" : ""}`}
          aria-selected={language === item}
          onClick={() => setLanguage(item)}
        >
          {languageNames[item]}
        </button>
      ))}
    </div>
  );
}
