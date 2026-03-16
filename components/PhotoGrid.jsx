"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import ZoomableImageModal from "./ZoomableImageModal";

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
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
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
        <ZoomableImageModal
          title={item.title}
          image={item.images[activeIndex]}
          alt={`${item.title} ${activeIndex + 1}`}
          onClose={() => setShowModal(false)}
          ui={{ ...ui, closeImage: ui.closeGallery }}
          headerMeta={hasMultipleImages ? ui.imageCountLabel(activeIndex + 1, item.images.length) : null}
          captionEyebrow={ui.galleryEyebrow}
          captionTitle={item.title}
          captionDescription={item.description}
          footer={
            hasMultipleImages ? (
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
            ) : null
          }
        />
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
