"use client";

import Link from "next/link";
import HeroGallery from "../components/HeroGallery";
import ImageModalButton from "../components/ImageModalButton";
import ImpactStats from "../components/ImpactStats";
import { useLanguage } from "../components/LanguageProvider";
import PhotoGrid from "../components/PhotoGrid";
import SectionHeading from "../components/SectionHeading";

export default function HomePage() {
  const { siteContent } = useLanguage();
  const keyHighlights = siteContent.homepageHighlights.slice(0, 3);
  const featuredProject = siteContent.featuredProject;
  const trustDescriptions = siteContent.ui.home.trustDescriptions;

  return (
    <>
      <section className="home-hero ngo-hero">
        <div className="hero-media">
          <HeroGallery items={siteContent.heroImages} donationPhoto={siteContent.donationPhoto} />
        </div>
      </section>

      <section className="hero-intro-band">
        <div className="hero-intro-band__content">
          <div className="hero-intro-band__heading">
            <p className="eyebrow">{siteContent.ui.home.heroEyebrow}</p>
            <h1>{siteContent.orgName}</h1>
          </div>
          <p className="lede">{siteContent.shortIntro}</p>
          <p className="hero-vision">{siteContent.vision}</p>
          <ul className="hero-points">
            {keyHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <Link href="/about" className="button primary">
              {siteContent.ui.ourMission}
            </Link>
            <ImageModalButton
              label={siteContent.ui.donateNow}
              image={siteContent.donationPhoto.image}
              title={siteContent.donationPhoto.title}
              description={siteContent.donationPhoto.description}
              variant="secondary"
            />
          </div>
        </div>
        <ImpactStats compact className="hero-intro-band__stats" />
      </section>

      <section className="surface-section">
        <SectionHeading
          eyebrow={siteContent.ui.home.galleryEyebrow}
          title={siteContent.ui.home.galleryTitle}
          description={siteContent.ui.home.galleryDescription}
        />
        <PhotoGrid items={siteContent.galleryProjects} compact />
      </section>

      <section className="two-col-section narrative-section">
        <div>
          <SectionHeading
            eyebrow={siteContent.ui.home.projectEyebrow}
            title={`${featuredProject.title} | ${featuredProject.subtitle}`}
            description={featuredProject.executiveSummary}
          />
          <ul className="feature-list">
            {featuredProject.targetBeneficiaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="story-card story-card--ledger">
          <p className="eyebrow">{siteContent.ui.home.donorEyebrow}</p>
          <h3>{featuredProject.budget}</h3>
          <p>{featuredProject.summary}</p>
          <ul className="plain-list">
            {featuredProject.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="surface-section trust-section">
        <SectionHeading
          eyebrow={siteContent.ui.home.componentsEyebrow}
          title={siteContent.ui.home.componentsTitle}
          description={siteContent.ui.home.componentsDescription}
        />
        <div className="trust-grid">
          {featuredProject.components.map((item) => (
            <article key={item} className="trust-card">
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="two-col-section narrative-section">
        <div>
          <SectionHeading
            eyebrow={siteContent.ui.home.projectNeedEyebrow}
            title={siteContent.ui.home.projectNeedTitle}
            description={siteContent.ui.home.projectNeedDescription}
          />
          <ul className="feature-list">
            {featuredProject.problemStatement.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="story-card story-card--ledger">
          <p className="eyebrow">{siteContent.ui.home.implementationEyebrow}</p>
          <h3>{featuredProject.duration}</h3>
          <ul className="plain-list">
            {featuredProject.implementationPlan.map((item) => (
              <li key={item.phase}>
                <strong>{item.phase}:</strong> {item.timeline} | {item.activity}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="surface-section">
        <SectionHeading
          eyebrow={siteContent.ui.home.activityEyebrow}
          title={siteContent.ui.home.activityTitle}
          description={siteContent.ui.home.activityDescription}
        />
        <div className="report-grid">
          {siteContent.achievements.map((item) => (
            <article key={item} className="report-card">
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-section">
        <SectionHeading
          eyebrow={siteContent.ui.home.trustEyebrow}
          title={siteContent.ui.home.trustTitle}
          description={siteContent.ui.home.trustDescription}
        />
        <div className="report-grid report-grid--trust">
          {siteContent.trustSignals.map((item, index) => (
            <article key={item} className="report-card">
              <h3>{item}</h3>
              <p>{trustDescriptions[index]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-section surface-section--home-last">
        <SectionHeading
          eyebrow={siteContent.ui.home.participationEyebrow}
          title={siteContent.ui.home.participationTitle}
          description={siteContent.ui.home.participationDescription}
        />
        <div className="participation-grid">
          {siteContent.supportActions.map((item) => (
            <article key={item.title} className="participation-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
