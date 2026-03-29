"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function useGsapReveal(
  selector: string,
  deps: ReadonlyArray<unknown> = [],
  options?: { y?: number; duration?: number; stagger?: number; delay?: number },
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { autoAlpha: 0, y: options?.y ?? 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: options?.duration ?? 0.5,
          stagger: options?.stagger ?? 0.07,
          delay: options?.delay ?? 0,
          ease: "power2.out",
        },
      );
    });

    return () => ctx.revert();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}