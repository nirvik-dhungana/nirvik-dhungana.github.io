import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { zIndex } from "../lib/zIndex";

/**
 * ScrollProgress — a thin accent-colored bar fixed at the very top of the
 * viewport that fills as the user scrolls down the page.
 *
 * Provides immediate, ambient feedback about reading progress without
 * taking up vertical space. Respects reduced-motion (disables the spring
 * smoothing, jumps instantly).
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX, zIndex: zIndex.scrollProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent to-gold origin-left pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default ScrollProgress;
