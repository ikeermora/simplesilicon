"use client";

import {
  useEffect,
  type ReactNode,
} from "react";

function cleanHashFromUrl() {
  if (!window.location.hash) return;

  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

function scrollToTarget(targetId: string) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  if (targetId === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(targetId);
  if (!target) return;

  target.scrollIntoView({ behavior, block: "start" });
}

export function HashlessNavigation({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleHashNavigation = () => {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        scrollToTarget(targetId);
        cleanHashFromUrl();
      });
    };

    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest<HTMLElement>("[data-scroll-target]");
      const targetId = trigger?.dataset.scrollTarget;
      if (!targetId) return;

      event.preventDefault();
      cleanHashFromUrl();
      scrollToTarget(targetId);
    };

    handleHashNavigation();
    document.addEventListener("click", handleNavigation, { capture: true });
    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      document.removeEventListener("click", handleNavigation, true);
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, []);

  return <main>{children}</main>;
}
