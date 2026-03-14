"use client";

import { useLanguage } from "./LanguageProvider";

export default function PageHero({ eyebrow, title, description, tone = "emerald", notes }) {
  const { siteContent } = useLanguage();
  const heroNotes = notes || siteContent.ui.toneNotes[tone] || siteContent.ui.toneNotes.emerald;

  return (
    <section className={`page-hero tone-${tone}`}>
      <div className="page-hero__inner">
        <div className="page-hero__copy">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {description ? <p className="lede">{description}</p> : null}
        </div>
        <div className="page-hero__aside">
          {heroNotes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
