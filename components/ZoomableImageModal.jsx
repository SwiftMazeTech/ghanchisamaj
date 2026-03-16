"use client";

import { useEffect, useRef, useState } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getMaxOffsets(element, scale) {
  if (!element) {
    return { x: 0, y: 0 };
  }

  const rect = element.getBoundingClientRect();

  return {
    x: Math.max(0, ((scale - 1) * rect.width) / 2),
    y: Math.max(0, ((scale - 1) * rect.height) / 2),
  };
}

function clampOffset(element, scale, nextOffset) {
  if (scale <= MIN_SCALE) {
    return { x: 0, y: 0 };
  }

  const maxOffsets = getMaxOffsets(element, scale);

  return {
    x: clamp(nextOffset.x, -maxOffsets.x, maxOffsets.x),
    y: clamp(nextOffset.y, -maxOffsets.y, maxOffsets.y),
  };
}

export default function ZoomableImageModal({
  title,
  image,
  alt,
  onClose,
  ui,
  headerMeta = null,
  captionEyebrow = null,
  captionTitle = null,
  captionDescription = null,
  footer = null,
}) {
  const viewportRef = useRef(null);
  const dragStateRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  onCloseRef.current = onClose;

  const resetView = () => {
    setScale(MIN_SCALE);
    setOffset({ x: 0, y: 0 });
  };

  const applyScale = (nextScale) => {
    const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);

    setScale(clampedScale);
    setOffset((current) => clampOffset(viewportRef.current, clampedScale, current));
  };

  useEffect(() => {
    resetView();
  }, [image]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }

      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setScale((current) => {
          const nextScale = clamp(current + SCALE_STEP, MIN_SCALE, MAX_SCALE);
          setOffset((currentOffset) => clampOffset(viewportRef.current, nextScale, currentOffset));
          return nextScale;
        });
      }

      if (event.key === "-") {
        event.preventDefault();
        setScale((current) => {
          const nextScale = clamp(current - SCALE_STEP, MIN_SCALE, MAX_SCALE);
          setOffset((currentOffset) => clampOffset(viewportRef.current, nextScale, currentOffset));
          return nextScale;
        });
      }

      if (event.key === "0") {
        event.preventDefault();
        resetView();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handlePointerDown = (event) => {
    if (scale <= MIN_SCALE) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };

    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const nextOffset = {
      x: dragState.originX + (event.clientX - dragState.startX),
      y: dragState.originY + (event.clientY - dragState.startY),
    };

    setOffset(clampOffset(viewportRef.current, scale, nextOffset));
  };

  const handlePointerEnd = (event) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    applyScale(scale + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP));
  };

  const handleDoubleClick = () => {
    if (scale > MIN_SCALE) {
      resetView();
      return;
    }

    applyScale(2);
  };

  return (
    <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="gallery-modal__backdrop" aria-label={ui.closeImage} onClick={onClose} />
      <div className="gallery-modal__dialog">
        <div className="gallery-modal__header">
          <div className="gallery-modal__header-copy">
            <p className="gallery-modal__title">{title}</p>
            {headerMeta ? <span className="gallery-modal__meta">{headerMeta}</span> : null}
          </div>
          <div className="gallery-modal__toolbar">
            <button
              type="button"
              className="gallery-modal__tool"
              onClick={() => applyScale(scale - SCALE_STEP)}
              aria-label={ui.zoomOut}
            >
              -
            </button>
            <button
              type="button"
              className="gallery-modal__tool gallery-modal__tool--value"
              onClick={resetView}
              aria-label={ui.resetZoom}
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              type="button"
              className="gallery-modal__tool"
              onClick={() => applyScale(scale + SCALE_STEP)}
              aria-label={ui.zoomIn}
            >
              +
            </button>
            <button type="button" className="gallery-modal__close" aria-label={ui.closeImage} onClick={onClose}>
              <span />
              <span />
            </button>
          </div>
        </div>
        <div
          ref={viewportRef}
          className={`gallery-modal__media ${scale > MIN_SCALE ? "is-zoomed" : ""} ${isDragging ? "is-dragging" : ""}`}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <img
            src={image}
            alt={alt}
            className="gallery-modal__image"
            draggable="false"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
          />
        </div>
        <div className="gallery-modal__caption">
          {captionEyebrow ? <p className="eyebrow">{captionEyebrow}</p> : null}
          {captionTitle ? <h2>{captionTitle}</h2> : null}
          {captionDescription ? <p>{captionDescription}</p> : null}
        </div>
        {footer}
      </div>
    </div>
  );
}
