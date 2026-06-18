import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function registerScrollTrigger(): void {
  gsap.registerPlugin(ScrollTrigger);
}

export const sectionRevealConfig = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  scrollTrigger: {
    start: "top 80%",
    end: "top 50%",
    scrub: false,
  },
};

export const textMaskConfig = {
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 },
  scrollTrigger: {
    start: "top 85%",
    end: "top 45%",
    scrub: false,
  },
};

export const parallaxConfig = {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    start: "top bottom",
    end: "bottom top",
    scrub: 0.3,
  },
};
