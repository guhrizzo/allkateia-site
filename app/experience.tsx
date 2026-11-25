"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Gauge } from "lucide-react";
import { lightModeStorageKey } from "./content";
import { moveRail, railOffset, railSize, seekRail, type AssistanceRail } from "./assistance-rail";

const Motion = lazy(() => import("./motion"));

const pointerQuery = "(hover: hover) and (pointer: fine)";
const desktopQuery = "(min-width: 900px) and (min-height: 690px) and " + pointerQuery;
type Connection = EventTarget & { saveData?: boolean };

export function Experience() {
  const initialAnchorHandled = useRef(false);
  const [ready, setReady] = useState(false);
  const [eco, setEco] = useState(false);
  const [systemEco, setSystemEco] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [desktop, setDesktop] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false, overflow: false });

  useEffect(() => {
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const dataQuery = matchMedia("(prefers-reduced-data: reduce)");
    const desktopMedia = matchMedia(desktopQuery);
    const pointerMedia = matchMedia(pointerQuery);
    const connection = (navigator as Navigator & { connection?: Connection }).connection;

    function sync() {
      setReducedMotion(motionQuery.matches);
      setSystemEco(dataQuery.matches || !!connection?.saveData);
      setDesktop(desktopMedia.matches);
      setFinePointer(pointerMedia.matches);
    }

    function syncStored() {
      try { setEco(localStorage.getItem(lightModeStorageKey) === "1"); } catch { /* Storage can be disabled. */ }
    }

    syncStored();
    sync();
    setReady(true);
    const queries = [motionQuery, dataQuery, desktopMedia, pointerMedia];
    queries.forEach(query => query.addEventListener("change", sync));
    connection?.addEventListener("change", sync);
    window.addEventListener("storage", syncStored);
    return () => {
      queries.forEach(query => query.removeEventListener("change", sync));
      connection?.removeEventListener("change", sync);
      window.removeEventListener("storage", syncStored);
    };
  }, []);

  const calm = eco || systemEco || reducedMotion;

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.calm = calm ? "true" : "false";
    if (calm) initialAnchorHandled.current = true;
  }, [calm, ready]);

  useEffect(() => {
    const rail = document.querySelector<AssistanceRail>("[data-viewport]");
    const track = rail?.querySelector<HTMLElement>("[data-track]");
    const frame = rail?.closest<HTMLElement>(".benefit-wrap");
    if (!rail || !track || !frame) return;

    let drag: { id: number; x: number; y: number; start: number; active: boolean } | null = null;
    const animated = () => document.documentElement.dataset.calm !== "true";

    function update() {
      if (!rail || !frame) return;
      const max = railSize(rail);
      const position = railOffset(rail);
      const next = { start: position < 2, end: position >= max - 2, overflow: max > 2 };
      setEdges(current => current.start === next.start && current.end === next.end && current.overflow === next.overflow ? current : next);
      rail.toggleAttribute("data-overflow", next.overflow);
      frame.style.setProperty("--rail-progress", max ? String(Math.max(0, Math.min(position / max, 1))) : "0");
    }

    function keyboard(event: KeyboardEvent) {
      if (!rail || event.target !== rail || railSize(rail) < 2 || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        moveRail(rail, event.key === "ArrowLeft" ? -1 : 1, animated());
      } else if (event.key === "Home" || event.key === "End") {
        seekRail(rail, event.key === "Home" ? 0 : railSize(rail), animated());
      } else return;
      event.preventDefault();
    }

    function pointerDown(event: PointerEvent) {
      if (!rail || event.pointerType !== "mouse" || event.button !== 0 || railSize(rail) < 2) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: railOffset(rail), active: false };
    }

    function pointerMove(event: PointerEvent) {
      if (!rail || !drag || drag.id !== event.pointerId) return;
      if (!(event.buttons & 1)) {
        pointerEnd(event);
        return;
      }
      const distance = event.clientX - drag.x;
      if (!drag.active) {
        if (Math.abs(distance) < 6 || Math.abs(distance) <= Math.abs(event.clientY - drag.y)) return;
        drag.active = true;
        rail.dataset.railDrag = "true";
        rail.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
      seekRail(rail, drag.start - distance);
    }

    function pointerEnd(event: PointerEvent) {
      if (!rail || !drag || drag.id !== event.pointerId) return;
      const position = railOffset(rail);
      const wasDragging = drag.active;
      drag = null;
      delete rail.dataset.railDrag;
      if (wasDragging && !rail.pinnedNavigation) seekRail(rail, position);
      if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    }

    function horizontalWheel(event: WheelEvent) {
      if (!rail?.pinnedNavigation || event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rail.clientWidth : 1;
      event.preventDefault();
      seekRail(rail, railOffset(rail) + event.deltaX * multiplier);
    }

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(rail);
    observer?.observe(track);
    rail.addEventListener("scroll", update, { passive: true });
    rail.addEventListener("keydown", keyboard);
    rail.addEventListener("pointerdown", pointerDown);
    rail.addEventListener("pointermove", pointerMove);
    rail.addEventListener("pointerup", pointerEnd);
    rail.addEventListener("pointercancel", pointerEnd);
    rail.addEventListener("lostpointercapture", pointerEnd);
    rail.addEventListener("wheel", horizontalWheel, { passive: false });
    rail.addEventListener("rail-progress", update);
    rail.addEventListener("rail-reset", update);
    update();
    return () => {
      observer?.disconnect();
      rail.removeEventListener("scroll", update);
      rail.removeEventListener("keydown", keyboard);
      rail.removeEventListener("pointerdown", pointerDown);
      rail.removeEventListener("pointermove", pointerMove);
      rail.removeEventListener("pointerup", pointerEnd);
      rail.removeEventListener("pointercancel", pointerEnd);
      rail.removeEventListener("lostpointercapture", pointerEnd);
      rail.removeEventListener("wheel", horizontalWheel);
      rail.removeEventListener("rail-progress", update);
      rail.removeEventListener("rail-reset", update);
      delete rail.dataset.railDrag;
      delete rail.dataset.overflow;
      frame.style.removeProperty("--rail-progress");
    };
  }, []);

  function move(direction: number) {
    const rail = document.querySelector<AssistanceRail>("[data-viewport]");
    if (rail) moveRail(rail, direction, !calm);
  }

  function toggle() {
    if (systemEco) return;
    const next = !eco;
    setEco(next);
    try { localStorage.setItem(lightModeStorageKey, next ? "1" : "0"); } catch { /* Apply for this visit. */ }
  }

  const target = ready ? document.getElementById("performance-control") : null;
  return <>
    {ready && !calm && <Suspense fallback={null}><Motion desktop={desktop} finePointer={finePointer} initialAnchorHandled={initialAnchorHandled} /></Suspense>}
    {ready && edges.overflow && <div className="rail-controls" role="group" aria-label="Controles dos benefícios">
      <span className="rail-help">Arraste ou use as setas</span>
      <span className="rail-progress" aria-hidden="true"><span /></span>
      <button type="button" aria-label="Benefício anterior" aria-disabled={edges.start} onClick={() => { if (!edges.start) move(-1); }}><ArrowLeft size={19} aria-hidden="true"/></button>
      <button type="button" aria-label="Próximo benefício" aria-disabled={edges.end} onClick={() => { if (!edges.end) move(1); }}><ArrowRight size={19} aria-hidden="true"/></button>
    </div>}
    {target && createPortal(
      <button className="eco-control" type="button" aria-pressed={eco || systemEco} aria-disabled={systemEco} onClick={toggle}>
        <Gauge size={17} aria-hidden="true" /> Modo leve <span>{systemEco ? "Sistema" : eco ? "Ativado" : "Desativado"}</span>
      </button>,
      target
    )}
  </>;
}