"use client";

import PageHero from "../../components/PageHero";
import PhotoGrid from "../../components/PhotoGrid";
import { useLanguage } from "../../components/LanguageProvider";

export default function GalleryPage() {
  const { siteContent } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={siteContent.ui.galleryPage.heroEyebrow}
        title={siteContent.ui.galleryPage.heroTitle}
        description={siteContent.ui.galleryPage.heroDescription}
        tone="slate"
      />
      <PhotoGrid items={siteContent.galleryProjects} />
    </>
  );
}
