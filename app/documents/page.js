"use client";

import PhotoGrid from "../../components/PhotoGrid";
import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import { useLanguage } from "../../components/LanguageProvider";

export default function DocumentsPage() {
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  return (
    <>
      <PageHero
        eyebrow={ui.documentsPage.heroEyebrow}
        title={ui.documentsPage.heroTitle}
        description={ui.documentsPage.heroDescription}
        tone="amber"
      />

      <section className="surface-section doc-list">
        <SectionHeading
          eyebrow={ui.documentsPage.pdfEyebrow}
          title={ui.documentsPage.pdfTitle}
          description={ui.documentsPage.pdfDescription}
        />
        {siteContent.documents.map((item, index) => (
          <article key={item.title} className="doc-card">
            <span className="doc-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="doc-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.summary}</p>
            </div>
            <div className="doc-actions">
              <a href={item.href} target="_blank" rel="noreferrer" className="doc-link">
                {ui.previewPdf}
              </a>
              <a href={item.href} download={item.downloadName} className="doc-link">
                {ui.downloadPdf}
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="surface-section">
        <SectionHeading
          eyebrow={ui.documentsPage.photoEyebrow}
          title={ui.documentsPage.photoTitle}
          description={ui.documentsPage.photoDescription}
        />
        <PhotoGrid items={siteContent.documentPhotos} />
      </section>
    </>
  );
}
