import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "motion/react";

/* ===========================================================================
 *  useTestimonialAutoplay — a single-source-of-truth autoplay controller.
 *
 *  WHY THIS EXISTS
 *  ---------------
 *  The previous testimonials implementation armed a fresh `setTimeout` on
 *  every slide change and reset the progress bar via a `key` bump. That
 *  caused two problems the user explicitly called out:
 *
 *    1. "The timer should continue naturally instead of restarting
 *        awkwardly."  →  re-arming restarts the full countdown every time.
 *    2. "No flickering. No repeated pauses. No interval bugs. No duplicate
 *        timers."  →  multiple overlapping timeouts + key-bumped motion
 *        components flickered.
 *
 *  THE FIX
 *  -------
 *  One `requestAnimationFrame` loop accumulates elapsed milliseconds into a
 *  ref. When `paused` is true the loop keeps running but stops accumulating
 *  (so the elapsed value is retained). On resume it continues from the exact
 *  same point — no restart, no jump. The loop also drives a `progress` state
 *  value in [0, 1] that the segmented timeline reads, so the visual indicator
 *  freezes and resumes in perfect sync with the underlying timer.
 *
 *  When `progress` crosses 1.0 we call `onAdvance()` and reset elapsed to 0.
 *  Because elapsed lives in a ref (not state), advancing never tears down and
 *  re-arms the loop — the same loop just keeps running.
 *
 *  GUARANTEES
 *  ----------
 *  - Exactly one rAF loop at any time (guarded by the effect lifecycle).
 *  - Zero `setTimeout` re-arming.
 *  - Pause/resume preserves elapsed time (continues naturally).
 *  - Reduced-motion users get no autoplay at all.
 *  - Cleaned up on unmount.
 * ========================================================================= */

interface UseTestimonialAutoplayOptions {
    /** Milliseconds each slide stays before auto-advancing. */
    durationMs: number;
    /** Called when the countdown completes. */
    onAdvance: () => void;
    /** Pause the countdown (hover, drag, blur, manual pause). */
    paused: boolean;
    /** Only run while the section is on-screen (perf). */
    active: boolean;
    /** When slide count changes or we manually jump, reset the countdown. */
    resetKey: number;
}

export function useTestimonialAutoplay({
    durationMs,
    onAdvance,
    paused,
    active,
    resetKey,
}: UseTestimonialAutoplayOptions) {
    const reduceMotion = useReducedMotion();
    // SSR-safe: `reduceMotion` is null during SSR and the first client render.
    // Default `enabled` to false so the prerendered HTML and the first
    // hydration render agree (no play/pause button). On the client, after
    // mount, `reduceMotion` resolves to a boolean and `enabled` flips to
    // true (unless the user has reduced motion on).
    const enabled = reduceMotion === false;

    // Elapsed time within the current slide, in ms. Lives in a ref so the
    // rAF loop can mutate it without re-rendering every frame.
    const elapsedRef = useRef(0);
    // The timestamp of the last rAF tick — used to compute delta.
    const lastTickRef = useRef<number | null>(null);
    // Whether the advance callback has already fired for this cycle (prevents
    // double-fire if onAdvance triggers a re-render before elapsed resets).
    const advancedRef = useRef(false);

    // progress is the only piece of state — drives the segmented timeline.
    const [progress, setProgress] = useState(0);

    // Keep the latest onAdvance in a ref so the rAF closure stays stable.
    const onAdvanceRef = useRef(onAdvance);
    useEffect(() => {
        onAdvanceRef.current = onAdvance;
    }, [onAdvance]);

    // When the resetKey changes (manual nav, slide change, data change) the
    // caller wants the countdown to restart from 0. This is the ONLY place
    // we deliberately reset elapsed — and it's a reset to 0, not a re-arm.
    useEffect(() => {
        elapsedRef.current = 0;
        advancedRef.current = false;
        lastTickRef.current = null;
        setProgress(0);
    }, [resetKey]);

    // The single rAF loop. Re-created only when `enabled`, `active`, or
    // `paused` change — never on every slide change.
    useEffect(() => {
        if (!enabled || !active) {
            lastTickRef.current = null;
            return;
        }

        let rafId = 0;

        const tick = (now: number) => {
            // If paused, we keep the loop alive (so resume is instant) but
            // freeze accumulation. lastTick is nulled so the next un-paused
            // tick doesn't add a huge delta covering the paused interval.
            if (paused) {
                lastTickRef.current = null;
                rafId = requestAnimationFrame(tick);
                return;
            }

            if (lastTickRef.current === null) {
                lastTickRef.current = now;
            }
            const delta = now - lastTickRef.current;
            lastTickRef.current = now;

            elapsedRef.current += delta;

            const p = Math.min(elapsedRef.current / durationMs, 1);
            // Only update state when the rounded progress actually changes —
            // avoids spamming React with identical values every frame.
            setProgress((prev) => (Math.abs(prev - p) < 0.001 ? prev : p));

            if (elapsedRef.current >= durationMs && !advancedRef.current) {
                advancedRef.current = true;
                elapsedRef.current = 0;
                setProgress(0);
                onAdvanceRef.current();
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [enabled, active, paused, durationMs]);

    // Allow manual reset from outside (e.g. after a drag navigation).
    const reset = useCallback(() => {
        elapsedRef.current = 0;
        advancedRef.current = false;
        lastTickRef.current = null;
        setProgress(0);
    }, []);

    return { progress, reset, enabled };
}
