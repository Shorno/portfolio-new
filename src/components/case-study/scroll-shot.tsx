"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

/**
 * Full-height website capture in a fixed viewport. When scrolled into view,
 * pans smoothly from top to bottom once (respects prefers-reduced-motion).
 */
export function ScrollShot({
  src,
  alt,
  caption,
  viewportHeight = 520,
  duration,
}: {
  src: string;
  alt?: string;
  caption?: string;
  /** Height of the visible “window” in px */
  viewportHeight?: number;
  /** Total pan duration in seconds (auto-scaled from image height if omitted) */
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [measured, setMeasured] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const imgSrc = cloudinaryImageUrl(src, { width: 1920 });
  const fits = measured && scrollDistance < 48;
  const canPan = measured && scrollDistance >= 48;

  const measure = () => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;
    setScrollDistance(Math.max(0, img.offsetHeight - container.clientHeight));
    setMeasured(true);
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduceMotion || !canPan) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, canPan]);

  const scrollDuration =
    duration ?? Math.min(20, Math.max(7, scrollDistance / 50));

  return (
    <figure className="my-10">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-md border border-line bg-bg-elev/50"
        style={{ height: viewportHeight }}
      >
        {canPan ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-bg-elev to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-bg-elev to-transparent"
            />
          </>
        ) : null}

        {reduceMotion || fits || !canPan ? (
          <div
            className={cn(
              "h-full",
              !fits && "overflow-y-auto overscroll-contain",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imgSrc}
              alt={alt ?? ""}
              className="block h-auto w-full"
              onLoad={measure}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <motion.img
            ref={imgRef}
            src={imgSrc}
            alt={alt ?? ""}
            className="block h-auto w-full will-change-transform"
            onLoad={measure}
            initial={{ y: 0 }}
            animate={started ? { y: -scrollDistance } : { y: 0 }}
            transition={{
              duration: scrollDuration,
              ease: [0.42, 0, 0.18, 1],
            }}
            onAnimationComplete={() => setDone(true)}
          />
        )}

        {canPan && !reduceMotion && !done ? (
          <span className="mono-label absolute right-3 bottom-3 z-20 rounded-sm border border-line/60 bg-bg/85 px-2 py-1 text-faint backdrop-blur-sm">
            scrolls on view
          </span>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mono-label mt-3 text-faint">
          fig. — {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
