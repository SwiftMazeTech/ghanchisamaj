"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";

function parseImpactValue(value) {
  const numeric = Number(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9,]/g, "");
  return { numeric, suffix };
}

function formatImpactValue(value) {
  return value.toLocaleString("en-IN");
}

export default function ImpactStats({ className = "", compact = false }) {
  const { siteContent } = useLanguage();
  const [visible, setVisible] = useState(false);
  const parsedStats = useMemo(
    () =>
      siteContent.impactStats.map((item) => ({
        ...item,
        ...parseImpactValue(item.value),
      })),
    [siteContent]
  );
  const [counts, setCounts] = useState(() => parsedStats.map(() => 0));

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const duration = 1400;
    const start = performance.now();

    const frame = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(parsedStats.map((item) => Math.round(item.numeric * eased)));

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    };

    const rafId = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(rafId);
  }, [parsedStats, visible]);

  const sectionClassName = ["impact-strip", compact ? "impact-strip--compact" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClassName}>
      {compact ? (
        <div className="impact-strip__intro">
          <p className="eyebrow">{siteContent.ui.impact.eyebrow}</p>
          <h3>{siteContent.ui.impact.title}</h3>
          <p>{siteContent.ui.impact.description}</p>
        </div>
      ) : null}
      {parsedStats.map((item, index) => (
        <article key={item.label} className="impact-card">
          <p className="impact-value">
            {formatImpactValue(counts[index])}
            {item.suffix}
          </p>
          <h3>{item.label}</h3>
          <p>{item.detail}</p>
        </article>
      ))}
    </section>
  );
}
