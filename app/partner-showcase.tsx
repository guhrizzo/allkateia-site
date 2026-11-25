"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { partners } from "./content";
import { useMotionAllowed } from "./use-motion-allowed";

const CircularCarousel = lazy(() => import("./circular-carousel"));

export function PartnerShowcase({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  const motionAllowed = useMotionAllowed();

  useEffect(() => {
    const element = rootRef.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: "240px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="partner-showcase" ref={rootRef} data-reveal="fade">
      {children}
      {nearby && motionAllowed && (
        <div className="partner-stage">
          <Suspense fallback={null}>
            <CircularCarousel
              ariaLabel="Parceiros Allkateia em Jaú"
              items={partners}
              preset="cylinder"
              intro="rise"
              autoplay="off"
              cardWidth={228}
              aspectRatio={384 / 272}
              gap={18}
              curve={0}
              tilt={-8}
              perspective={1350}
              momentum={0.4}
              depthFade={0.58}
              fadeColor="#10243d"
              parallax={0}
              stretch={0}
              captions
              controls
              reflect
              className="partner-carousel"
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}