"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

import type { Project } from "@/lib/projects";
import { WorkCard } from "./work-card";
import { cn } from "@/lib/utils";

/**
 * Signature interaction: scroll-stacked case studies.
 *
 * Each project sits in its own tall slot. The card inside the slot is sticky
 * to the top of the viewport, and as the user scrolls past the slot, the card
 * scales down + fades + softly blurs while the next slot's card slides into
 * position on top of it. The last card stays put (nothing comes after).
 *
 * A single card tree stays in normal flow until every card fits the viewport.
 * Recheck after resizing or font changes; reduced motion always uses the list.
 */
export function WorkStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cardsFit, setCardsFit] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof ResizeObserver === "undefined") return;

    const cards = [...root.querySelectorAll<HTMLElement>("[data-work-card]")];
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame: number | null = null;

    const measure = () => {
      frame = null;
      const available = window.innerHeight - (header?.offsetHeight ?? 56) - 48;
      // offsetHeight excludes the outgoing card's scale transform.
      const tallest = Math.max(...cards.map((card) => card.offsetHeight));
      setCardsFit(desktop.matches && tallest > 0 && tallest <= available);
    };

    const scheduleMeasure = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    cards.forEach((card) => observer.observe(card));
    if (header) observer.observe(header);
    window.addEventListener("resize", scheduleMeasure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [projects]);

  const enabled = cardsFit && prefersReducedMotion === false;

  return (
    <div
      ref={ref}
      data-work-layout={enabled ? "stack" : "list"}
      className={cn("relative", !enabled && "flex flex-col gap-10 md:gap-16")}
    >
      {projects.map((project, index) => (
        <StackSlot
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
          enabled={enabled}
        />
      ))}
    </div>
  );
}

function StackSlot({
  project,
  index,
  total,
  enabled,
}: {
  project: Project;
  index: number;
  total: number;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;

  // Progress across this slot: 0 when the slot enters view, 1 when its top
  // has scrolled to the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Outgoing card transforms — only applied while a NEXT card is approaching.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const yShift = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div
      ref={ref}
      className={cn(
        // Slot height — generous enough to let the next card slide in
        // smoothly, tight enough that the section doesn't feel endless.
        "relative",
        enabled && "h-[105vh]",
        // Last slot doesn't need extra room (nothing scrolls in after it).
        enabled && isLast && "h-[88vh]",
      )}
    >
      <div
        className={cn(enabled && "sticky flex items-center justify-center")}
        style={{
          top: enabled ? "calc(var(--site-header-h) + 24px)" : undefined,
          height: enabled ? "calc(100vh - var(--site-header-h) - 48px)" : undefined,
        }}
      >
        <motion.div
          style={
            !enabled || isLast
              ? { scale: 1, opacity: 1, y: 0 }
              : ({
                  scale,
                  opacity,
                  y: yShift,
                } as { scale: MotionValue<number>; opacity: MotionValue<number>; y: MotionValue<number> })
          }
          className="w-full origin-top"
        >
          <WorkCard project={project} vt={enabled} />
        </motion.div>
      </div>
    </div>
  );
}
