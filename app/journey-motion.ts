import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupJourney(pinIntro: boolean) {
  const section = document.getElementById("como-funciona");
  const track = section?.querySelector<HTMLElement>(".journey-track");
  const line = track?.querySelector<SVGSVGElement>(".journey-line");
  const base = line?.querySelector<SVGPathElement>("[data-journey-base]");
  const trace = line?.querySelector<SVGPathElement>("[data-journey-trace]");
  const carLayer = track?.querySelector<SVGSVGElement>(".journey-car-layer");
  const car = carLayer?.querySelector<SVGGElement>("[data-journey-car]");
  if (!section || !track || !line || !base || !trace || !carLayer || !car) return;

  const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-journey-card]"));
  const markers = Array.from(track.querySelectorAll<HTMLElement>("[data-journey-marker]"));
  if (!cards.length || !markers.length) return;

  const state = { progress: 0 };
  let stations: number[] = [];
  let length = 0;
  let reached = -2;

  function paint() {
    if (!trace || !carLayer || !car || !length) return;
    const progress = gsap.utils.clamp(0, 1, state.progress);
    const offset = length * progress;
    const point = trace.getPointAtLength(offset);
    const before = trace.getPointAtLength(Math.max(0, offset - 3));
    const after = trace.getPointAtLength(Math.min(length, offset + 3));
    const heading = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI + 90;
    trace.style.strokeDashoffset = String(1 - progress);
    car.setAttribute("transform", "translate(" + point.x + " " + point.y + ") rotate(" + heading + ")");
    car.style.opacity = progress > 0 && progress < 1 ? "1" : "0";
    const station = progress >= 0.999 ? cards.length : Math.max(0, stations.findLastIndex(y => point.y >= y));
    if (station !== reached) {
      reached = station;
      cards.forEach((card, index) => {
        card.dataset.stage = index === station ? "current" : index < station ? "complete" : "upcoming";
        if (index === station) card.setAttribute("aria-current", "step");
        else card.removeAttribute("aria-current");
        markers[index]?.toggleAttribute("data-reached", index <= station);
        markers[index]?.toggleAttribute("data-current", index === station);
      });
    }
  }

  function measure() {
    if (!line || !carLayer || !base || !trace) return;
    const bounds = line.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const markerBounds = markers[0].getBoundingClientRect();
    const center = markerBounds.left + markerBounds.width / 2 - bounds.left;
    stations = markers.map(marker => {
      const boundsMarker = marker.getBoundingClientRect();
      return boundsMarker.top + boundsMarker.height / 2 - bounds.top;
    });

    let path = "M " + center + " 0 V " + stations[0];
    for (let index = 1; index < stations.length; index++) {
      const from = stations[index - 1];
      const to = stations[index];
      const lead = (to - from) * 0.29;
      const bend = Math.min(bounds.width * 0.37, 26) * (index % 2 ? -1 : 1);
      path += " C " + (center + bend) + " " + (from + lead)
        + ", " + (center + bend) + " " + (to - lead) + ", " + center + " " + to;
    }
    path += " V " + bounds.height;
    const viewBox = "0 0 " + bounds.width + " " + bounds.height;
    line.setAttribute("viewBox", viewBox);
    carLayer.setAttribute("viewBox", viewBox);
    base.setAttribute("d", path);
    trace.setAttribute("d", path);
    length = trace.getTotalLength();
    reached = -2;
    paint();
  }

  track.dataset.journeyEnhanced = "true";
  measure();
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
  resize?.observe(track);
  ScrollTrigger.addEventListener("refresh", measure);
  gsap.to(state, {
    progress: 1,
    ease: "none",
    onUpdate: paint,
    scrollTrigger: { trigger: track, start: "top 83%", end: "bottom 31%", scrub: 0.32 },
  });

  for (const card of cards) {
    const detail = card.querySelector("[data-journey-detail]");
    if (detail) {
      gsap.fromTo(detail, { opacity: 0, y: 17 }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 87%", end: "center 60%", scrub: 0.28 },
      });
    }
  }

  const intro = section.querySelector<HTMLElement>(".journey-intro");
  if (pinIntro && intro) {
    ScrollTrigger.create({
      trigger: track,
      pin: intro,
      pinSpacing: false,
      start: "top 15%",
      end: "bottom 69%",
    });
  }

  return () => {
    resize?.disconnect();
    ScrollTrigger.removeEventListener("refresh", measure);
    delete track.dataset.journeyEnhanced;
    cards.forEach(card => {
      delete card.dataset.stage;
      card.removeAttribute("aria-current");
    });
    markers.forEach(marker => {
      marker.removeAttribute("data-reached");
      marker.removeAttribute("data-current");
    });
    trace.style.removeProperty("stroke-dashoffset");
    car.style.removeProperty("opacity");
    car.removeAttribute("transform");
  };
}