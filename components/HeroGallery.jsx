"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function HeroGallery({ items, donationPhoto }) {
  const [index, setIndex] = useState(0);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const { siteContent } = useLanguage();
  const { ui } = siteContent;

  useEffect(() => {
    if (!items.length) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [items]);

  const prevSlide = () => setIndex((current) => (current - 1 + items.length) % items.length);
  const nextSlide = () => setIndex((current) => (current + 1) % items.length);

  return (
    <>
      <div className="hero-gallery">
        <div className="hero-gallery__stage">
          {items.map((item, itemIndex) => (
            <div
              key={item.image}
              className={`hero-gallery__slide ${itemIndex === index ? "is-active" : ""}`}
              aria-hidden={itemIndex === index ? "false" : "true"}
            >
              <div className="hero-gallery__bg">
                <Image
                  src={item.image}
                  alt=""
                  className="hero-gallery__image hero-gallery__image--bg"
                  fill
                  priority={itemIndex === 0}
                  sizes="100vw"
                />
              </div>
              <Image
                src={item.image}
                alt={item.title}
                className="hero-gallery__image hero-gallery__image--main"
                fill
                priority={itemIndex === 0}
                sizes="100vw"
              />
            </div>
          ))}
          <div className="hero-gallery__overlay" />
          <div className="hero-gallery__content">
            <div className="hero-gallery__actions">
              <button type="button" className="hero-gallery__action" onClick={() => setShowDonationModal(true)}>
                {ui.donateNow}
              </button>
              <Link href="/contact" className="hero-gallery__action hero-gallery__action--secondary">
                {ui.contactOffice}
              </Link>
            </div>
          </div>
          <button
            type="button"
            className="hero-gallery__arrow hero-gallery__arrow--prev"
            onClick={prevSlide}
            aria-label={ui.previousSlide}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="hero-gallery__arrow hero-gallery__arrow--next"
            onClick={nextSlide}
            aria-label={ui.nextSlide}
          >
            {">"}
          </button>
          <div className="hero-gallery__dots hero-gallery__dots--overlay" aria-label={ui.galleryImagesAria}>
            {items.map((item, itemIndex) => (
              <button
                key={item.image}
                type="button"
                className={itemIndex === index ? "is-active" : ""}
                onClick={() => setIndex(itemIndex)}
                aria-label={ui.showSlideLabel(itemIndex + 1)}
              />
            ))}
          </div>
        </div>
      </div>

      {showDonationModal && donationPhoto ? (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={donationPhoto.title}>
          <button
            type="button"
            className="gallery-modal__backdrop"
            aria-label={ui.closeImage}
            onClick={() => setShowDonationModal(false)}
          />
          <div className="gallery-modal__dialog">
            <button
              type="button"
              className="gallery-modal__close"
              aria-label={ui.closeImage}
              onClick={() => setShowDonationModal(false)}
            >
              x
            </button>
            <div className="gallery-modal__media">
              <Image src={donationPhoto.image} alt={donationPhoto.title} fill sizes="90vw" className="gallery-modal__image" />
            </div>
            <div className="gallery-modal__caption">
              <p className="eyebrow">{ui.donationEyebrow}</p>
              <h2>{donationPhoto.title}</h2>
              <p>{donationPhoto.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
