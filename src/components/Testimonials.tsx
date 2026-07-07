import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { TestimonialsContent } from "../data/content";
import { SectionHeading } from "./primitives/SectionHeading";

const AUTOPLAY_MS = 6000;

/* ===========================================================================
 *  TESTIMONIALS — interactive carousel.
 *
 *  Features:
 *    - Autoplay continues indefinitely (re-fires on every slide change).
 *    - Visible progress bar that resets on each slide change.
 *    - Manual prev/next + dot navigation.
 *    - Pause on hover (desktop) — but NOT on focus-in (which would pause
 *      the carousel permanently after a single dot click). Focus-pause
 *      caused the "autoplay stops unexpectedly" bug.
 *    - Swipe via native scroll-snap.
 *    - Keyboard: ArrowLeft/ArrowRight when the carousel region is focused.
 *    - Smooth snapping transitions.
 *
 *  Bug fixes from previous version:
 *    - Removed `onFocusCapture`/`onBlurCapture` pause handlers — they
 *      fired when focus moved INTO the carousel (after clicking a dot or
 *      the region), pausing autoplay permanently.
 *    - Autoplay timer now correctly re-arms on every `activeIndex` change
 *      via the `activeIndex` dependency.
 * ========================================================================= */

export function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [autoplayKey, setAutoplayKey] = useState(0); // bump to reset progress bar
    const reduceMotion = useReducedMotion();
    const itemCount = TestimonialsContent.length;

    /* ----- Scroll snapping: track which slide is centered. -----
        Uses a ref guard so we don't fight the programmatic scroll. */
    const isProgrammaticScroll = useRef(false);
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let raf = 0;
        const handleScroll = () => {
            if (isProgrammaticScroll.current) return;
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const items = Array.from(container.children).filter(
                    (child) => child.tagName !== "STYLE",
                ) as HTMLElement[];
                if (items.length === 0) return;
                const containerCenter = container.scrollLeft + container.clientWidth / 2;
                let closest = 0;
                let closestDist = Infinity;
                items.forEach((item, i) => {
                    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                    const dist = Math.abs(itemCenter - containerCenter);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closest = i;
                    }
                });
                setActiveIndex(closest);
            });
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            container.removeEventListener("scroll", handleScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    /* ----- Autoplay — re-arms on every slide change. -----
        The `activeIndex` dependency is intentional: when the slide changes
        (via autoplay OR manual nav), the old timeout is cleared and a new
        one is armed, restarting the countdown. This is what makes autoplay
        continue indefinitely. */
    useEffect(() => {
        if (reduceMotion || !isInView || isPaused || itemCount <= 1) return;
        const id = window.setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % itemCount);
        }, AUTOPLAY_MS);
        return () => window.clearTimeout(id);
    }, [isInView, isPaused, itemCount, reduceMotion, activeIndex]);

    /* ----- When activeIndex changes (via dots, autoplay, or keyboard),
        scroll the corresponding slide into view. ----- */
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const items = Array.from(container.children).filter(
            (child) => child.tagName !== "STYLE",
        ) as HTMLElement[];
        const target = items[activeIndex];
        if (!target) return;
        const scrollLeft = target.offsetLeft - (container.clientWidth - target.offsetWidth) / 2;
        isProgrammaticScroll.current = true;
        container.scrollTo({ left: scrollLeft, behavior: reduceMotion ? "auto" : "smooth" });
        // Release the guard after the smooth scroll settles.
        window.setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 600);
        // Reset the autoplay progress bar.
        setAutoplayKey((k) => k + 1);
    }, [activeIndex, reduceMotion]);

    /* ----- Manual navigation. ----- */
    const goTo = useCallback((idx: number) => {
        setActiveIndex(((idx % itemCount) + itemCount) % itemCount);
    }, [itemCount]);

    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

    /* ----- Keyboard navigation. ----- */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            goPrev();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goNext();
        }
    };

    return (
        <section
            id="testimonials"
            className="relative z-10 overflow-hidden"
            ref={ref}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                    eyebrow="07 — TESTIMONIALS"
                    title="What People Say"
                    description="Words from mentors, colleagues, and collaborators I've worked with."
                    actions={
                        <div className="flex items-center gap-2">
                            {/* Play/Pause toggle — explicit control over autoplay. */}
                            <button
                                type="button"
                                onClick={() => setIsPaused((p) => !p)}
                                className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-fg hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                                aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                                aria-pressed={!isPaused}
                            >
                                {isPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
                            </button>
                            {/* Previous. */}
                            <button
                                type="button"
                                onClick={goPrev}
                                className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-fg hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={20} aria-hidden="true" />
                            </button>
                            {/* Next. */}
                            <button
                                type="button"
                                onClick={goNext}
                                className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-fg hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={20} aria-hidden="true" />
                            </button>
                        </div>
                    }
                />
            </div>

            {/* Carousel. */}
            <div
                className="max-w-7xl mx-auto px-6"
                onKeyDown={handleKeyDown}
                role="region"
                aria-roledescription="carousel"
                aria-label="Testimonials"
                tabIndex={0}
            >
                <div
                    ref={scrollRef}
                    className="overflow-x-auto snap-x snap-mandatory flex gap-6 hide-scrollbar cursor-grab active:cursor-grabbing pb-4 focus:outline-none"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {TestimonialsContent.map((item, idx) => (
                        <motion.article
                            key={`${item.name}-${idx}`}
                            initial={reduceMotion ? false : { opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, delay: idx * 0.12 }}
                            aria-roledescription="slide"
                            aria-label={`${idx + 1} of ${itemCount}`}
                            className={`group snap-center shrink-0 w-full md:w-[calc(50%-12px)] glass-card glass-card-interactive p-6 md:p-9 relative flex flex-col transition-all duration-300 min-h-[320px] md:min-h-[360px] ${
                                idx === activeIndex ? "ring-1 ring-accent/30" : ""
                            }`}
                        >
                            {/* Decorative quote watermark. */}
                            <Quote
                                className="absolute top-4 right-4 text-accent opacity-[0.06] z-0 w-20 h-20 md:w-28 md:h-28 transition-opacity duration-300 group-hover:opacity-[0.12]"
                                aria-hidden="true"
                            />

                            {/* Quote — flex-grow so all cards fill the same height. */}
                            <p className="text-base md:text-xl text-fg leading-relaxed mb-8 relative z-10 font-medium flex-grow">
                                &ldquo;{item.quote}&rdquo;
                            </p>

                            {/* Attribution — always pinned to the bottom, consistently left-aligned. */}
                            <div className="flex items-center gap-3 mt-auto relative z-10">
                                {/* Avatar — initials with accent tint. */}
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm border shrink-0"
                                    style={{
                                        backgroundColor: `color-mix(in srgb, ${item.accentColor} 12%, transparent)`,
                                        color: item.accentColor,
                                        borderColor: `color-mix(in srgb, ${item.accentColor} 30%, transparent)`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {item.initials}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-base md:text-lg font-display font-bold text-fg-bright truncate">
                                        {item.name}
                                    </div>
                                    <div className="text-[11px] md:text-sm font-mono text-fg-dim truncate">
                                        {item.role} @ {item.company}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Dot indicators + autoplay progress bar — combined into one row. */}
                <div className="mt-6 flex flex-col items-center gap-3">
                    {/* Dots. */}
                    <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Choose testimonial">
                        {TestimonialsContent.map((item, idx) => (
                            <button
                                key={idx}
                                type="button"
                                role="tab"
                                aria-selected={idx === activeIndex}
                                aria-label={`Go to testimonial ${idx + 1}`}
                                onClick={() => goTo(idx)}
                                className="group p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-full"
                            >
                                <span
                                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                                        idx === activeIndex
                                            ? "w-8 bg-accent"
                                            : "w-2 bg-bg-3 group-hover:bg-fg-dim"
                                    }`}
                                    style={
                                        idx === activeIndex
                                            ? { boxShadow: `0 0 8px ${item.accentColor}` }
                                            : undefined
                                    }
                                />
                            </button>
                        ))}
                    </div>

                    {/* Autoplay progress bar — visible countdown until next slide.
                        Resets via `key` whenever the slide changes. Pauses
                        cleanly when isPaused (animation freezes mid-fill). */}
                    <div className="h-[2px] w-32 bg-bg-3/40 rounded-full overflow-hidden">
                        {!reduceMotion && !isPaused && itemCount > 1 && (
                            <motion.div
                                key={autoplayKey}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-accent to-gold rounded-full"
                                style={{ boxShadow: "0 0 6px var(--color-accent)" }}
                            />
                        )}
                    </div>

                    {/* Status text. */}
                    <AnimatePresence mode="wait">
                        {isPaused && !reduceMotion && (
                            <motion.span
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="text-[10px] font-mono uppercase tracking-wider text-fg-faint"
                            >
                                Paused — hover away to resume
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
