"use client";

import { useRef } from "react";
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
 * On reduced-motion or small viewports, the stack degrades to a clean
 * vertical list — no sticky, no transforms — so the experience stays calm.
 */
export function WorkStack({ projects }: { projects: Project[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-col gap-12 md:gap-16">
        {projects.map((p) => (
          <WorkCard key={p.slug} project={p} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Mobile fallback — stacked list, no sticky */}
      <div className="flex flex-col gap-10 md:hidden">
        {projects.map((p) => (
          <WorkCard key={p.slug} project={p} />
        ))}
      </div>

      {/* Desktop — scroll-stacked */}
      <div className="hidden md:block">
        {projects.map((p, i) => (
          <StackSlot
            key={p.slug}
            project={p}
            index={i}
            total={projects.length}
          />
        ))}
      </div>
    </div>
  );
}

function StackSlot({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
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
        "relative h-[105vh]",
        // Last slot doesn't need extra room (nothing scrolls in after it).
        isLast && "h-[88vh]",
      )}
    >
      <div
        className="sticky flex items-center justify-center"
        style={{
          top: "calc(var(--site-header-h, 56px) + 24px)",
          height: "calc(100vh - var(--site-header-h, 56px) - 48px)",
        }}
      >
        <motion.div
          style={
            isLast
              ? undefined
              : ({
                  scale,
                  opacity,
                  y: yShift,
                } as { scale: MotionValue<number>; opacity: MotionValue<number>; y: MotionValue<number> })
          }
          className="w-full origin-top"
        >
          <WorkCard project={project} />
        </motion.div>
      </div>
    </div>
  );
}
