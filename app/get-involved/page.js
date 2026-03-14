"use client";

import ContactCard from "../../components/ContactCard";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

export default function GetInvolvedPage() {
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  return (
    <>
      <PageHero
        eyebrow={ui.getInvolvedPage.heroEyebrow}
        title={ui.getInvolvedPage.heroTitle}
        description={ui.getInvolvedPage.heroDescription}
      />

      <section className="content-grid">
        <article className="content-card">
          <h2>{ui.getInvolvedPage.visitorsTitle}</h2>
          <p>{siteContent.involvement.visitors}</p>
        </article>
        <article className="content-card">
          <h2>{ui.getInvolvedPage.volunteersTitle}</h2>
          <p>{siteContent.involvement.volunteers}</p>
        </article>
        <article className="content-card">
          <h2>{ui.getInvolvedPage.helpTitle}</h2>
          <p>{siteContent.involvement.volunteerRole}</p>
        </article>
        <article className="content-card">
          <h2>{ui.getInvolvedPage.connectTitle}</h2>
          <p>{siteContent.involvement.volunteerHow}</p>
        </article>
      </section>

      <section className="participation-grid participation-grid--wide">
        {siteContent.supportActions.map((item) => (
          <article key={item.title} className="participation-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="surface-section">
        <div className="section-heading">
          <p className="eyebrow">{ui.getInvolvedPage.coursesEyebrow}</p>
          <h2>{ui.getInvolvedPage.coursesTitle}</h2>
          <p className="lede">{ui.getInvolvedPage.coursesDescription}</p>
        </div>
        <div className="report-grid">
          {siteContent.courses.map((item) => (
            <article key={item.title} className="report-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <ContactCard />
    </>
  );
}
