export {
  ReducedMotionGate,
  useReducedMotionContext,
  type ReducedMotionGateProps,
  type ReducedMotionContextValue,
} from "@/lib/motion/reduced-motion-gate";
export { useReducedMotion } from "@/lib/motion/use-reduced-motion";
export { useIsoLayoutEffect } from "@/lib/motion/use-iso-layout-effect";
export { RevealText, type RevealTextProps } from "@/lib/motion/reveal-text";
export { FadeUp, type FadeUpProps } from "@/lib/motion/fade-up";
export { MaskReveal, type MaskRevealProps } from "@/lib/motion/mask-reveal";
export {
  IntroProvider,
  IntroLoader,
  useIntroDone,
  type IntroProviderProps,
  type IntroLoaderProps,
} from "@/lib/motion/intro";

// NOTE: `ScrollPin` and `MagneticLink` are intentionally NOT re-exported from
// this barrel. They import `gsap` / `gsap/ScrollTrigger`, which has no
// `sideEffects:false` and therefore cannot be tree-shaken — re-exporting them
// here would pull GSAP (~70 KB) into every page that imports any motion
// primitive via this barrel. The Work section (Task 20) imports them directly
// from `@/lib/motion/scroll-pin` and `@/lib/motion/magnetic-link` so GSAP
// stays code-split to the Work section only, per PLAN.md Performance
// Requirements.

