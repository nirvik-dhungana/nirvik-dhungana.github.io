import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * CountUp — animates a number from 0 to its target value when scrolled
 * into view. Used by About stats (e.g. "1.5+", "10+").
 *
 * Handles decimal values and trailing "+" or other suffixes. The numeric
 * portion is parsed and tweened; non-numeric prefix/suffix is preserved.
 *
 * Respects reduced-motion (renders the final value immediately).
 */

interface CountUpProps {
    /** The value to animate to, e.g. "1.5+", "10+", "98%". */
    value: string;
    /** Animation duration in ms. Default: 1500. */
    duration?: number;
    className?: string;
}

export function CountUp({ value, duration = 1500, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const reduceMotion = useReducedMotion();

    // Parse: prefix? number (int or decimal) suffix?
    const match = value.match(/^([^\d-]*)(\d+(?:\.\d+)?)(.*)$/);
    const prefix = match?.[1] ?? "";
    const numericTarget = match?.[2] ? parseFloat(match[2]) : 0;
    const suffix = match?.[3] ?? "";
    const decimals = match?.[2]?.includes(".") ? match[2].split(".")[1]?.length ?? 0 : 0;

    // SSR-safe initial state: always start with the "0" form so the
    // prerendered HTML and the client's first hydration render match
    // (reduceMotion is null during SSR / first client render). The
    // reduceMotion-corrected value is applied in useEffect below.
    const [display, setDisplay] = useState(`${prefix}0${suffix}`);

    useEffect(() => {
        // If reduced motion is on (client-side), snap to the final value.
        if (reduceMotion) {
            setDisplay(value);
            return;
        }
        if (!inView) return;

        let raf: number;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericTarget * eased;
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);

            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setDisplay(value);
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, numericTarget, prefix, suffix, decimals, duration, reduceMotion]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
}

export default CountUp;
