import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ===========================================================================
 *  TestimonialControls — the navigation bar below the card.
 *
 *  Layout (single row, centered, wraps gracefully):
 *
 *    [‹ prev]   [===|ooo|ooo|ooo]   [next ›]   [⏸ pause]
 *
 *  The segmented timeline replaces BOTH the old dot indicators AND the
 *  separate autoplay progress bar. Each segment is one testimonial:
 *    - segments before the active index are full (accent)
 *    - the active segment shows a filling bar driven by `progress` (0..1)
 *    - segments after the active index are empty (bg)
 *
 *  Clicking any segment jumps straight to that testimonial. This unifies
 *  "where am I" + "how long until the next slide" into one elegant element.
 * ========================================================================= */

interface TestimonialControlsProps {
    /** Total number of testimonials. */
    count: number;
    /** Currently active index. */
    activeIndex: number;
    /** Autoplay progress for the active segment, in [0, 1]. */
    progress: number;
    /** Whether autoplay is currently paused (manual toggle or hover). */
    isPaused: boolean;
    /** Whether reduced motion is on (disables the play/pause button). */
    autoplayEnabled: boolean;
    /** Jump to a specific index. */
    onGoTo: (index: number) => void;
    /** Go to the previous slide. */
    onPrev: () => void;
    /** Go to the next slide. */
    onNext: () => void;
    /** Toggle the manual pause state. */
    onTogglePause: () => void;
}

export function TestimonialControls({
    count,
    activeIndex,
    progress,
    isPaused,
    autoplayEnabled,
    onGoTo,
    onPrev,
    onNext,
    onTogglePause,
}: TestimonialControlsProps) {
    return (
        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {/* Previous. */}
            <NavButton label="Previous testimonial" onClick={onPrev} disabled={count <= 1}>
                <ChevronLeft size={18} aria-hidden="true" />
            </NavButton>

            {/* Segmented timeline. */}
            <div
                className="flex items-center gap-1.5 md:gap-2"
                role="tablist"
                aria-label="Choose testimonial"
            >
                {Array.from({ length: count }, (_, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    return (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`Go to testimonial ${i + 1} of ${count}`}
                            onClick={() => onGoTo(i)}
                            // Vertical padding gives a comfortable touch target
                            // above/below the thin visible bar.
                            className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base py-2 px-0 flex items-center"
                            style={{
                                width: isActive ? 60 : 26,
                                transition: "width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                            }}
                        >
                            {/* Visible track — the bar itself, relative so the
                                fill overlay aligns to it (not the padded button). */}
                            <span
                                className="relative block w-full rounded-full overflow-hidden"
                                style={{
                                    height: 8,
                                    backgroundColor: isPast
                                        ? "var(--color-accent)"
                                        : "var(--color-bg-3)",
                                    opacity: isPast ? 0.6 : isActive ? 0.55 : 0.75,
                                }}
                                aria-hidden="true"
                            >
                                {/* Fill overlay for the active segment — driven by autoplay progress. */}
                                {isActive && (
                                    <span
                                        className="absolute inset-y-0 left-0 rounded-full"
                                        style={{
                                            width: `${progress * 100}%`,
                                            backgroundColor: "var(--color-accent)",
                                            boxShadow: "0 0 8px var(--color-accent)",
                                            transition:
                                                "width 60ms linear, background-color 0.3s ease",
                                        }}
                                    />
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Next. */}
            <NavButton label="Next testimonial" onClick={onNext} disabled={count <= 1}>
                <ChevronRight size={18} aria-hidden="true" />
            </NavButton>

            {/* Play/Pause — only relevant when autoplay is enabled. */}
            {autoplayEnabled && (
                <NavButton
                    label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                    onClick={onTogglePause}
                    ariaPressed={!isPaused}
                >
                    {isPaused ? (
                        <Play size={16} aria-hidden="true" />
                    ) : (
                        <Pause size={16} aria-hidden="true" />
                    )}
                </NavButton>
            )}
        </div>
    );
}

/* ---------------------------------------------------------------------------
 *  NavButton — a consistent glass-circle icon button.
 *  ------------------------------------------------------------------------- */
function NavButton({
    label,
    onClick,
    disabled,
    ariaPressed,
    children,
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    ariaPressed?: boolean;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            aria-pressed={ariaPressed}
            className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-fg hover:text-accent hover:border-accent/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-fg disabled:hover:border-transparent"
        >
            {children}
        </button>
    );
}

export default TestimonialControls;
