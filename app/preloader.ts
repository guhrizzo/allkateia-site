import { lightModeStorageKey } from "./content";

export const preloaderScript = `(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const reducedData = matchMedia("(prefers-reduced-data: reduce)");
  let light = false;
  try { light = localStorage.getItem(${JSON.stringify(lightModeStorageKey)}) === "1"; } catch {}
  if (light || reducedMotion.matches || reducedData.matches || navigator.connection?.saveData) return;

  const root = document.documentElement;
  root.dataset.loadingHero = "true";
  const stop = () => {
    delete root.dataset.loadingHero;
    clearTimeout(timeout);
    document.removeEventListener("DOMContentLoaded", check);
    document.removeEventListener("load", imageSettled, true);
    document.removeEventListener("error", imageSettled, true);
    window.removeEventListener("keydown", stop);
    window.removeEventListener("pointerdown", stop);
  };
  const check = () => {
    const hero = document.querySelector("[data-hero-image]");
    if (!hero || hero.complete) stop();
  };
  const imageSettled = (event) => {
    if (event.target instanceof HTMLImageElement && event.target.hasAttribute("data-hero-image")) stop();
  };
  const timeout = setTimeout(stop, 720);
  document.addEventListener("DOMContentLoaded", check, { once: true });
  document.addEventListener("load", imageSettled, true);
  document.addEventListener("error", imageSettled, true);
  window.addEventListener("keydown", stop, { once: true });
  window.addEventListener("pointerdown", stop, { once: true });
})();`;