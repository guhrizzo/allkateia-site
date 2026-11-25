"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useMotionAllowed } from "./use-motion-allowed";

export function HeroVideo() {
  return useMotionAllowed() ? <HeroPlayback /> : null;
}

function HeroPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photoReady, setPhotoReady] = useState(false);
  const [seen, setSeen] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playingSource, setPlayingSource] = useState<string | null>(null);
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);

  useEffect(() => {
    const photo = document.querySelector<HTMLImageElement>("[data-hero-image]");
    const hero = photo?.closest("section");
    if (!photo || !hero || !("IntersectionObserver" in window)) return;

    const ready = () => setPhotoReady(true);
    const syncVisibility = () => setPageVisible(!document.hidden);
    const viewport = matchMedia("(max-width: 760px)");
    const syncViewport = () => setMobile(viewport.matches);

    if (photo.complete) ready();
    else {
      photo.addEventListener("load", ready, { once: true });
      photo.addEventListener("error", ready, { once: true });
    }
    syncVisibility();
    syncViewport();
    document.addEventListener("visibilitychange", syncVisibility);
    viewport.addEventListener("change", syncViewport);
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
      setInView(visible);
      if (visible) setSeen(true);
    }, { threshold: 0.18 });
    observer.observe(hero);

    return () => {
      observer.disconnect();
      photo.removeEventListener("load", ready);
      photo.removeEventListener("error", ready);
      document.removeEventListener("visibilitychange", syncVisibility);
      viewport.removeEventListener("change", syncViewport);
    };
  }, []);

  const source = mobile ? "/hero-road-mobile.mp4" : "/hero-road.mp4";
  const mounted = photoReady && seen && failedSource !== source;
  const playing = playingSource === source;

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return;
    if (inView && pageVisible && !paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, mounted, pageVisible, paused, source]);

  useEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, [mounted, source]);

  if (!mounted) return null;

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      setPaused(true);
      video.pause();
    } else {
      setPaused(false);
      void video.play().catch(() => {});
    }
  }

  return (
    <>
      <div className="hero-video-layer" data-playing-frame={loadedSource === source ? "true" : undefined} aria-hidden="true">
        <video
          key={source}
          ref={videoRef}
          src={source}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => { setLoadedSource(source); setPlayingSource(source); }}
          onPause={() => { setPlayingSource(current => current === source ? null : current); }}
          onError={() => { setFailedSource(source); }}
        />
      </div>
      <button
        type="button"
        className="hero-video-control"
        aria-label={playing ? "Pausar vídeo de fundo" : "Reproduzir vídeo de fundo"}
        onClick={toggle}
      >
        {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
      </button>
    </>
  );
}