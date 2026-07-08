import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Testimonial } from "../../data/content";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialControls } from "./TestimonialControls";
import { useTestimonialAutoplay } from "./useTestimonialAutoplay";

/* ===========================================================================
 *  TestimonialCarousel — orchestrates slide state, autoplay, drag/swipe,
 *  keyboard nav, and the animated transitions between cards.
 *
 *  ARCHITECTURE
 *  ------------
 *  State flow:
 *    index (current slide) ──► resetKey ──► autoplay hook resets countdown
 *    autoplay countdown ──► onAdvance ──► index = (index + 1) % count
 *
 *  The autoplay hook is the SOLE source of the progress value that drives
 *  the segmented timeline. It uses a single rAF accumulator (see
 *  useTestimonialAutoplay.ts) so pause/resume continues naturally — the
 *  countdown never restarts on slide change or hover.
 *
 *  PAUSE TRIGGERS (all funnel into one `paused` boolean):
 *    - Pointer over the carousel (hover, desktop + touch)
 *    - Pointer down / dragging (swipe in progress)
 *    - Carousel not focused-safe: when the carousel region or any child has
 *      focus we also pause, so keyboard users aren't fighting the autoplay.
 *    - Manual play/pause toggle
 *
 *  Because all triggers OR into one boolean, there are no duplicate timers
 *  and no race between competing pause handlers.
 *
 *  TRANSITIONS
 *  -----------
 *  AnimatePresence with mode="wait" + a direction-aware horizontal slide.
 *  We track the travel direction (forward/backward) so the entering card
 *  comes from the correct side. Reduced-motion users get a pure opacity
 *  crossfade with no displacement.
 *
 *  DRAG / SWIPE
 *  ------------
 *  Pointer events (pointerdown/move/up/cancel) with a velocity-agnostic
 *  threshold (≥ 18% of the carousel width OR ≥ 6px past threshold). This
 *  works for both touch swipe and mouse drag. While dragging, we apply a
 *  live transform to the card so the user gets tactile feedback, then snap
 *  on release. Dragging pauses autoplay for its duration.
 * ========================================================================= */

const AUTOPLAY_MS = 6500;
/** Drag distance (px) before a nav commit triggers. */
const DRAG_THRESHOLD_PX = 56;

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const reduceMotion = useReducedMotion();
    const count = testimonials.length;

    const [index, setIndex] = useState(0);
    // Direction of the most recent navigation — drives slide animation.
    const [direction, setDirection] = useState<1 | -1>(1);
    // Pause state — OR of hover, drag, focus, and manual toggle.
    const [hoverPaused, setHoverPaused] = useState(false);
    const [dragPaused, setDragPaused] = useState(false);
    const [focusPaused, setFocusPaused] = useState(false);
    const [manualPaused, setManualPaused] = useState(false);
    const paused = hoverPaused || dragPaused || focusPaused || manualPaused;

    // Track whether the section is on-screen (perf: don't run rAF off-screen).
    const containerRef = useRef<HTMLDivElement>(null);
    const [onScreen, setOnScreen] = useState(false);

    // --- Navigation helpers -------------------------------------------------
    const goTo = useCallback(
        (next: number, dir: 1 | -1) => {
            if (count <= 1) return;
            const normalized = ((next % count) + count) % count;
            setDirection(dir);
            setIndex(normalized);
        },
        [count],
    );

    const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);
    const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
    const goToIndex = useCallback(
        (target: number) => goTo(target, target > index ? 1 : -1),
        [goTo, index],
    );

    // --- Autoplay -----------------------------------------------------------
    // resetKey changes on every index change so the countdown restarts cleanly
    // for the new slide. Because the rAF loop is tied to [enabled, active,
    // paused, durationMs] (NOT resetKey), the loop itself is never torn down
    // here — only the elapsed value resets. This is what makes the timer
    // "continue naturally" without re-arming.
    const { progress, enabled: autoplayEnabled } = useTestimonialAutoplay({
        durationMs: AUTOPLAY_MS,
        onAdvance: goNext,
        paused,
        active: onScreen,
        resetKey: index,
    });

    // --- On-screen observation (IntersectionObserver) -----------------------
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) setOnScreen(entry.isIntersecting);
            },
            { threshold: 0.2 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // --- Keyboard navigation ------------------------------------------------
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            goPrev();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goNext();
        } else if (e.key === " " || e.key === "Enter") {
            // Space toggles pause when the carousel region has focus.
            e.preventDefault();
            setManualPaused((p) => !p);
        }
    };

    // --- Drag / swipe (pointer events) -------------------------------------
    const dragState = useRef({
        active: false,
        startX: 0,
        startY: 0,
        deltaX: 0,
        // Whether the gesture has been committed to a horizontal drag (vs a
        // potential vertical scroll). Decided on first move past a small axis
        // lock threshold.
        locked: false,
        pointerId: -1 as number,
    });
    const [liveDragX, setLiveDragX] = useState(0);

    const onPointerDown = (e: React.PointerEvent) => {
        // Only respond to primary pointer / touch. Ignore right-click etc.
        if (e.button !== 0 && e.pointerType === "mouse") return;
        if (count <= 1) return;
        dragState.current = {
            active: true,
            startX: e.clientX,
            startY: e.clientY,
            deltaX: 0,
            locked: false,
            pointerId: e.pointerId,
        };
        setDragPaused(true);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const ds = dragState.current;
        if (!ds.active || e.pointerId !== ds.pointerId) return;
        const dx = e.clientX - ds.startX;
        const dy = e.clientY - ds.startY;

        // Axis lock: decide horizontal vs vertical on first meaningful move.
        if (!ds.locked) {
            if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
            ds.locked = Math.abs(dx) > Math.abs(dy);
            if (!ds.locked) {
                // Vertical gesture — let the browser handle scroll. Abandon drag.
                ds.active = false;
                setDragPaused(false);
                return;
            }
        }

        // Horizontal drag: capture pointer so we keep getting events, apply
        // a rubber-banded live transform.
        ds.deltaX = dx;
        // Rubber-band: reduce intensity past the natural bounds.
        const width = containerRef.current?.clientWidth ?? 1;
        let applied = dx;
        const max = width * 0.4;
        if (Math.abs(applied) > max) {
            applied = Math.sign(applied) * (max + (Math.abs(applied) - max) * 0.3);
        }
        setLiveDragX(applied);
        // Prevent the page from scrolling horizontally while we drag.
        if (e.cancelable) e.preventDefault();
    };

    const endDrag = (commit: boolean) => {
        const ds = dragState.current;
        if (!ds.active) return;
        const width = containerRef.current?.clientWidth ?? 0;
        const threshold = Math.max(DRAG_THRESHOLD_PX, width * 0.18);
        if (commit && Math.abs(ds.deltaX) > threshold) {
            if (ds.deltaX < 0) goNext();
            else goPrev();
        }
        ds.active = false;
        ds.locked = false;
        ds.deltaX = 0;
        setLiveDragX(0);
        setDragPaused(false);
    };

    const onPointerUp = (e: React.PointerEvent) => {
        if (e.pointerId !== dragState.current.pointerId) return;
        endDrag(true);
    };
    const onPointerCancel = () => endDrag(false);

    // --- Active testimonial -------------------------------------------------
    // `index` is always normalized via the modulo in `goTo`, so it is
    // guaranteed in [0, count-1] when count >= 1. The empty-data case is
    // guarded by the render return below.
    const active = testimonials[index];

    // --- Slide animation variants ------------------------------------------
    const slideVariants = {
        enter: (dir: 1 | -1) =>
            reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: dir * 48, scale: 0.98 },
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
        },
        exit: (dir: 1 | -1) =>
            reduceMotion
                ? { opacity: 0 }
                : {
                      opacity: 0,
                      x: dir * -48,
                      scale: 0.98,
                      transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const },
                  },
    };

    // Empty-data guard. Hooks above still run (Rules of Hooks), but we render
    // nothing if there are no testimonials to show.
    if (count === 0 || !active) return null;

    return (
        <div
            ref={containerRef}
            className="relative"
            // Pause on hover anywhere inside the carousel (card + controls).
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            // Focus pause — keyboard users shouldn't fight autoplay.
            onFocus={() => setFocusPaused(true)}
            onBlur={() => setFocusPaused(false)}
            // Keyboard.
            onKeyDown={onKeyDown}
            // ARIA.
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            tabIndex={0}
        >
            {/* Live region — announces the current slide for screen readers. */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Slide {index + 1} of {count}: {active.quote}
            </div>

            {/* Slide viewport — clips the exiting card during transition. */}
            <div
                className="relative overflow-hidden rounded-[1.25rem] outline-none touch-pan-y"
                style={{ cursor: count > 1 ? "grab" : "default" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
            >
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        // Live drag transform layered on top of the animation.
                        // We use a separate style update so motion doesn't
                        // fight the drag; when liveDragX is 0 the transform
                        // is a no-op and the variants own the easing.
                        style={{
                            transform:
                                liveDragX !== 0
                                    ? `translateX(${liveDragX}px)`
                                    : undefined,
                            transition:
                                liveDragX !== 0 ? "transform 0ms" : undefined,
                            zIndex: 1,
                        }}
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${count}`}
                    >
                        <TestimonialCard testimonial={active} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls — segmented timeline + prev/next + pause. */}
            <TestimonialControls
                count={count}
                activeIndex={index}
                progress={progress}
                // The play/pause button reflects the MANUAL pause state only.
                // Temporary pauses (hover/drag/focus) freeze the timeline but
                // don't flip the button — that would be confusing.
                isPaused={manualPaused}
                autoplayEnabled={autoplayEnabled}
                onGoTo={goToIndex}
                onPrev={goPrev}
                onNext={goNext}
                onTogglePause={() => setManualPaused((p) => !p)}
            />
        </div>
    );
}

export default TestimonialCarousel;
