"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

function PhotoCard({ item, index }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const hasMultipleImages = item.images.length > 1;
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  useEffect(() => {
    if (!hasMultipleImages || showModal) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % item.images.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, item.images.length, showModal]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!showModal) return;

      if (event.key === "Escape") {
        setShowModal(false);
      }

      if (hasMultipleImages && event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % item.images.length);
      }

      if (hasMultipleImages && event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + item.images.length) % item.images.length);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [hasMultipleImages, item.images.length, showModal]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + item.images.length) % item.images.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % item.images.length);

  return (
    <>
      <article key={`${item.title}-${index}`} className="photo-card">
        <button
          type="button"
          className="photo-card__visual photo-card__visual--image"
          onClick={() => setShowModal(true)}
          aria-label={ui.openGalleryLabel(item.title)}
        >
          <div className="photo-card__track" aria-label={ui.galleryImagesAria}>
            {item.images.map((image, imageIndex) => (
              <div
                key={`${item.title}-${imageIndex}`}
                className={`photo-card__slide ${imageIndex === activeIndex ? "is-active" : ""}`}
                aria-hidden={imageIndex === activeIndex ? "false" : "true"}
              >
                <Image
                  src={image}
                  alt={`${item.title} ${imageIndex + 1}`}
                  fill
                  sizes="(max-width: 980px) 100vw, 33vw"
                  style={{ objectPosition: item.thumbnailPosition ?? "center center" }}
                />
              </div>
            ))}
          </div>
        </button>
        <div className="photo-card__body">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </article>

      {showModal ? (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={item.title}>
          <button
            type="button"
            className="gallery-modal__backdrop"
            aria-label={ui.closeGallery}
            onClick={() => setShowModal(false)}
          />
          <div className="gallery-modal__dialog">
            <button
              type="button"
              className="gallery-modal__close"
              aria-label={ui.closeGallery}
              onClick={() => setShowModal(false)}
            >
              x
            </button>
            <div className="gallery-modal__media">
              <Image
                src={item.images[activeIndex]}
                alt={`${item.title} ${activeIndex + 1}`}
                fill
                sizes="90vw"
                className="gallery-modal__image"
              />
            </div>
            <div className="gallery-modal__caption">
              <p className="eyebrow">{ui.galleryEyebrow}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {hasMultipleImages ? <span>{ui.imageCountLabel(activeIndex + 1, item.images.length)}</span> : null}
            </div>
            {hasMultipleImages ? (
              <div className="gallery-modal__controls">
                <button type="button" className="gallery-modal__arrow" onClick={showPrevious} aria-label={ui.previousImage}>
                  {"<"}
                </button>
                <div className="gallery-modal__dots" aria-label={ui.galleryImagesAria}>
                  {item.images.map((image, imageIndex) => (
                    <button
                      key={`${item.title}-dot-${imageIndex}`}
                      type="button"
                      className={imageIndex === activeIndex ? "is-active" : ""}
                      onClick={() => setActiveIndex(imageIndex)}
                      aria-label={ui.showImageLabel(imageIndex + 1)}
                    />
                  ))}
                </div>
                <button type="button" className="gallery-modal__arrow" onClick={showNext} aria-label={ui.nextImage}>
                  {">"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function PhotoGrid({ items, compact = false }) {
  return (
    <div className={`photo-grid ${compact ? "compact" : ""}`}>
      {items.map((item, index) => (
        <PhotoCard key={`${item.title}-${index}`} item={item} index={index} />
      ))}
    </div>
  );
}
