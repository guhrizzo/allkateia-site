type PinnedNavigation = {
  size(): number;
  offset(): number;
  seek(left: number): void;
};

export type AssistanceRail = HTMLElement & { pinnedNavigation?: PinnedNavigation };

export function railSize(rail: AssistanceRail) {
  return Math.max(0, rail.pinnedNavigation?.size() ?? rail.scrollWidth - rail.clientWidth);
}

export function railOffset(rail: AssistanceRail) {
  return rail.pinnedNavigation?.offset() ?? rail.scrollLeft;
}

export function seekRail(rail: AssistanceRail, left: number, smooth = false) {
  const target = Math.max(0, Math.min(left, railSize(rail)));
  if (rail.pinnedNavigation) rail.pinnedNavigation.seek(target);
  else rail.scrollTo({ left: target, behavior: smooth ? "smooth" : "instant" });
}

export function moveRail(rail: AssistanceRail, direction: number, smooth: boolean) {
  const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-card]"));
  const start = cards[0]?.offsetLeft ?? 0;
  const max = railSize(rail);
  const current = railOffset(rail);
  const positions = cards.map(card => Math.min(max, card.offsetLeft - start));
  const target = direction > 0
    ? positions.find(position => position > current + 3) ?? max
    : positions.findLast(position => position < current - 3) ?? 0;
  seekRail(rail, target, smooth);
}