"use client";

import ContactCard from "../../components/ContactCard";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

export default function ContactPage() {
  const { siteContent } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={siteContent.ui.contact.heroEyebrow}
        title={siteContent.ui.contact.heroTitle}
        description={siteContent.ui.contact.heroDescription}
        tone="emerald"
      />
      <ContactCard />
    </>
  );
}
