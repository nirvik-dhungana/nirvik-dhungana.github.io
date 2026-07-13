import { motion, useInView, type Variants } from "motion/react";
import { useMemo, useRef, type ReactNode, type ElementType } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Reveal — a scroll-triggered entrance animation wrapper.
 *
 * Replaces the per-section `sectionVariants` + `whileInView` boilerplate
 * with a single, consistent component. Supports:
 *   - direction-aware entrance (up, down, left, right, none)
 *   - staggered children via `stagger` prop
 *   - one-shot (default) or every-time-in-view
 *   - respects reduced-motion (renders children static)
 *
 * Usage:
 *   <Reveal as="div"><h2>Title</h2></Reveal>
 *   <Reveal stagger={0.08}><Card /><Card /><Card /></Reveal>
 */

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
    children: ReactNode;
    /** Animation direction. Default: "up". */
    direction?: Direction;
    /** Delay before the entrance starts (seconds). */
    delay?: number;
    /** Stagger between children (seconds). When set, this wraps children in a
     *  container with staggered transitions. */
    stagger?: number;
    /** Re-run every time the element enters the viewport. Default: false. */
    once?: boolean;
    /** Viewport margin for IntersectionObserver (CSS string). Default: "-80px". */
    margin?: string;
    /** Render as a different element (e.g. "li", "section"). Default: "div". */
    as?: ElementType;
    className?: string;
    /** Override the base animation distance. Default: 40 (px). */
    distance?: number;
}

const directionToOffset = (direction: Direction, distance: number) => {
    switch (direction) {
        case "up":    return { x: 0, y: distance };
        case "down":  return { x: 0, y: -distance };
        case "left":  return { x: distance, y: 0 };
        case "right": return { x: -distance, y: 0 };
        case "none":  return { x: 0, y: 0 };
    }
};

export function Reveal({
    children,
    direction = "up",
    delay = 0,
    stagger,
    once = true,
    margin = "-80px",
    as: Tag = "div",
    className,
    distance = 40,
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inView = useInView(ref as any, { once, margin: margin as any });
    const reduceMotion = useReducedMotion();

    // Memoize the MotionTag so we don't recreate the motion component on
    // every render. `motion.create(Tag)` returns a stable component for a
    // given Tag, but only if we cache it — calling it inline leaks a new
    // component identity per render and breaks reconciliation.
    const MotionTag = useMemo(() => motion.create(Tag as ElementType), [Tag]);

    if (reduceMotion) {
        return <Tag className={className}>{children}</Tag>;
    }

    const offset = directionToOffset(direction, distance);

    const containerVariants: Variants = {
        hidden: { opacity: 0, ...offset },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: stagger
                ? { duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay, staggerChildren: stagger }
                : { duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay },
        },
    };

    const itemVariants: Variants = stagger
        ? {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
          }
        : {};

    // When staggering, wrap each child in a motion.div with stable keys.
    // `React.Children.toArray` flattens nested arrays and removes empty
    // nodes, giving us a stable list to key off. We use the child's index
    // as the key — stable as long as the children list doesn't change order
    // between renders, which is the standard pattern for static card grids.
    // (If the list becomes dynamic in the future, the consumer should pass
    // a `key` on each child and we'd need to extract it — but for the
    // current portfolio all staggered lists are static.)
    const staggeredChildren = stagger
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (Array.isArray(children) ? children : [children]).map((child: any, i: number) => (
              <motion.div key={child?.key ?? i} variants={itemVariants}>
                  {child}
              </motion.div>
          ))
        : children;

    return (
        <MotionTag
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {staggeredChildren}
        </MotionTag>
    );
}

export default Reveal;
