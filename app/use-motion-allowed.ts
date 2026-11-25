"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-calm"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.dataset.calm === "false";
}

export function useMotionAllowed() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}