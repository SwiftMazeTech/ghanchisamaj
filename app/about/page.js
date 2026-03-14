"use client";

import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

export default function AboutPage() {
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  return (
    <>
      <PageHero
        eyebrow={ui.about.heroEyebrow}
        title={ui.about.heroTitle}
        description={siteContent.shortIntro}
      />

      <section className="content-grid">
        <article className="content-card">
          <h2>{ui.about.aboutTitle}</h2>
          <p>{siteContent.shortIntro}</p>
          <p>{siteContent.story}</p>
        </article>
        <article className="content-card">
          <h2>{ui.about.visionTitle}</h2>
          <p>{siteContent.vision}</p>
          <p>{siteContent.mission}</p>
          <p>
            <strong>{ui.goalLabel}:</strong> {siteContent.goal}
          </p>
        </article>
        <article className="content-card">
          <h2>{ui.about.aimTitle}</h2>
          <p>{siteContent.aimObjective}</p>
        </article>
        <article className="content-card">
          <h2>{ui.about.historyTitle}</h2>
          <p>{siteContent.history}</p>
        </article>
        <article className="content-card">
          <h2>{ui.about.historyHighlightsTitle}</h2>
          <ul className="feature-list">
            {siteContent.historyHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="content-card">
          <h2>{ui.about.focusAreasTitle}</h2>
          <ul className="feature-list">
            {siteContent.focusAreas.map((item) => (
              <li key={item.title}>
                <strong>{item.title}:</strong> {item.summary}
              </li>
            ))}
          </ul>
        </article>
        <article className="content-card">
          <h2>{ui.about.currentWorkTitle}</h2>
          <ul className="feature-list">
            {siteContent.activityClusters.map((item) => (
              <li key={item.title}>
                <strong>{item.title}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </article>
        <article className="content-card">
          <h2>{ui.about.futureProjectTitle}</h2>
          <p>{siteContent.featuredProject.executiveSummary}</p>
          <ul className="feature-list">
            {siteContent.featuredProject.targetBeneficiaries.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
