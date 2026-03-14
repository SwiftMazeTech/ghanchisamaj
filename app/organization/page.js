"use client";

import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

export default function OrganizationPage() {
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  return (
    <>
      <PageHero
        eyebrow={ui.organizationPage.heroEyebrow}
        title={ui.organizationPage.heroTitle}
        description={ui.organizationPage.heroDescription}
        tone="slate"
        notes={ui.organizationPage.heroNotes}
      />

      <section className="organization-overview">
        <article className="content-card organization-overview__intro">
          <p className="eyebrow">{ui.organizationPage.institutionEyebrow}</p>
          <h2>{siteContent.orgName}</h2>
          <p className="organization-acronym">{siteContent.orgShortName}</p>
          <p>{siteContent.establishedLabel}. {siteContent.registrations[0]}. {siteContent.registrations[1]}. {siteContent.registrations[7]}.</p>
        </article>
        <article className="content-card organization-overview__note">
          <p className="eyebrow">{ui.organizationPage.keyFactsEyebrow}</p>
          <h2>{ui.organizationPage.keyFactsTitle}</h2>
          <p>
            {ui.organizationPage.keyFactsText}: <strong>{siteContent.contact.chiefFunctionary}</strong>. {siteContent.registrations[5]}. {siteContent.registrations[3]}.
          </p>
        </article>
      </section>

      <section className="surface-section">
        <div className="section-heading">
          <p className="eyebrow">{ui.organizationPage.registrationEyebrow}</p>
          <h2>{ui.organizationPage.registrationTitle}</h2>
          <p className="lede">{ui.organizationPage.registrationDescription}</p>
        </div>
        <div className="content-card registrations">
          <ul className="feature-list">
            {siteContent.registrations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-section">
        <div className="section-heading">
          <p className="eyebrow">{ui.organizationPage.structureEyebrow}</p>
          <h2>{ui.organizationPage.structureTitle}</h2>
          <p className="lede">{ui.organizationPage.structureDescription}</p>
        </div>
        <div className="stack-grid">
          <article className="content-card">
            <h2>{ui.organizationPage.structureCardTitle}</h2>
            <p>{siteContent.structureGoverningBoard}</p>
          </article>
          <article className="content-card">
            <h2>{ui.organizationPage.executiveTitle}</h2>
            <ul className="feature-list">
              {siteContent.structureRoles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="content-grid">
        <article className="content-card">
          <h2>{ui.organizationPage.valuesTitle}</h2>
          <ul className="feature-list">
            {siteContent.values.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="content-card">
          <h2>{ui.organizationPage.guidingTitle}</h2>
          <ul className="feature-list">
            {siteContent.guidingPrinciples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="content-card">
          <h2>{ui.organizationPage.believesTitle}</h2>
          <ul className="feature-list">
            {siteContent.beliefs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="content-card">
          <h2>{ui.organizationPage.managementTitle}</h2>
          <p>{siteContent.managementPlanning}</p>
        </article>
        <article className="content-card">
          <h2>{ui.organizationPage.decisionTitle}</h2>
          <p>{siteContent.decisionMaking}</p>
        </article>
        <article className="content-card">
          <h2>{ui.organizationPage.rolesTitle}</h2>
          <div className="stack-grid organization-roles">
            {siteContent.organization.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
