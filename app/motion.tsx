"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { setupJourney } from "./journey-motion";
import type { AssistanceRail } from "./assistance-rail";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function Motion({ desktop, finePointer, initialAnchorHandled }: {
  desktop: boolean;
  finePointer: boolean;
  initialAnchorHandled: RefObject<boolean>;
}) {
  useGSAP(context => {
    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");
    let focusingAnchor = false;
    const smoother = finePointer && wrapper && content ? ScrollSmoother.create({
      wrapper,
      content,
      smooth: 0.75,
      smoothTouch: false,
      onFocusIn: () => !focusingAnchor,
    }) : null;

    function anchorTarget(hash: string) {
      const target = document.getElementById(hash.slice(1));
      return target && content?.contains(target) ? target : null;
    }

    function scrollToAnchor(target: HTMLElement, smooth: boolean) {
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      smoother?.scrollTo(target, smooth, "top " + padding + "px");
    }

    function navigateAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.target || link.hasAttribute("download")) return;
      const target = anchorTarget(link.hash);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(null, "", link.hash);
      focusingAnchor = true;
      target.focus({ preventScroll: true });
      focusingAnchor = false;
      scrollToAnchor(target, true);
    }

    function restoreAnchor() {
      const target = anchorTarget(location.hash);
      if (target) scrollToAnchor(target, false);
    }

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => setupJourney(desktop));

    if (desktop) media.add("(min-width: 900px) and (min-height: 690px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const rail = document.querySelector<AssistanceRail>("[data-viewport]");
      const track = rail?.querySelector<HTMLElement>("[data-track]");
      const section = rail?.closest<HTMLElement>(".assistance");
      if (!rail || !track || !section) return;
      const distance = () => Math.max(0, track.scrollWidth - rail.clientWidth);
      const controlsSpace = section.querySelector(".rail-controls") ? 8 : 64;
      if (distance() <= 2 || section.offsetHeight + controlsSpace > window.innerHeight) return;

      rail.scrollLeft = 0;
      rail.dataset.pinned = "true";
      const publish = () => rail.dispatchEvent(new Event("rail-progress"));
      const tween = gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top", end: () => "+=" + Math.min(distance(), window.innerHeight * 0.78),
          pin: true, scrub: true, invalidateOnRefresh: true,
          onUpdate: publish,
          onRefresh: publish,
        },
      });
      const trigger = tween.scrollTrigger!;
      rail.pinnedNavigation = {
        size: distance,
        offset: () => trigger.progress * distance(),
        seek(left) {
          const max = distance();
          if (!max) return;
          const top = trigger.start + (trigger.end - trigger.start) * left / max;
          if (smoother) smoother.scrollTo(top, false);
          else window.scrollTo({ top, behavior: "instant" });
        },
      };
      publish();

      return () => {
        delete rail.dataset.pinned;
        delete rail.pinnedNavigation;
        rail.dispatchEvent(new Event("rail-reset"));
      };
    });
    const hero = content?.querySelector<HTMLElement>(".hero-inner");
    if (hero && !initialAnchorHandled.current && !location.hash && window.scrollY < 30) {
      gsap.from(hero, { y: 12, opacity: 0.9, duration: 0.7, ease: "power2.out", clearProps: "opacity,transform" });
    }

    const reveal = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      const elements: HTMLElement[] = [];
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        reveal?.unobserve(element);
        if (!element.contains(document.activeElement)) elements.push(element);
      }
      if (!elements.length) return;

      context.add(() => {
        gsap.fromTo(elements, {
          opacity: 0.24,
          y: (_index, element: HTMLElement) => element.dataset.reveal === "fade" ? 0 : 22,
        }, {
          opacity: 1, y: 0, duration: 0.66, stagger: 0.07, ease: "power2.out",
          clearProps: "opacity,transform", overwrite: "auto",
        });
      });
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0.04 });

    content?.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight - 24) reveal?.observe(element);
    });

    const restoreInitialAnchor = !initialAnchorHandled.current && !!anchorTarget(location.hash);
    let initialFrame = 0;
    if (smoother) {
      content?.addEventListener("click", navigateAnchor);
      window.addEventListener("hashchange", restoreAnchor);
      if (restoreInitialAnchor) {
        initialFrame = requestAnimationFrame(restoreAnchor);
      }
    }
    initialAnchorHandled.current = true;
    return () => {
      reveal?.disconnect();
      cancelAnimationFrame(initialFrame);
      content?.removeEventListener("click", navigateAnchor);
      window.removeEventListener("hashchange", restoreAnchor);
      media.revert();
      smoother?.kill();
    };
  }, { dependencies: [desktop, finePointer], revertOnUpdate: true });

  return null;
}