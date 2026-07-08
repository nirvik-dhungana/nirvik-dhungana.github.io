import { Quote } from "lucide-react";
import type { Testimonial } from "../../data/content";
import { TestimonialAuthor } from "./TestimonialAuthor";

/* ===========================================================================
 *  TestimonialCard — a single spotlight testimonial.
 *
 *  Design notes:
 *    - Single wide card so the glass effect has room to breathe and the quote
 *      gets a comfortable ~60-75 char reading measure.
 *    - An oversized quote glyph sits in the top-left as an editorial
 *      watermark — subtle (low opacity) so it never competes with the text,
 *      but present enough to anchor the layout.
 *    - A thin accent-tinted top hairline gives the card a "lit from above"
 *      edge that matches the rest of the site's premium elevation language.
 *    - The quote uses a slightly larger, relaxed leading so long-form
 *      feedback reads like prose, not a caption.
 *    - A soft divider separates the quote from the author block so the
 *      attribution always reads as a distinct, scannable unit.
 *
 *  The card itself is purely presentational — all state lives in the
 *  carousel. It receives the testimonial + an optional index for animation
 *  staggering.
 * ========================================================================= */

interface TestimonialCardProps {
    testimonial: Testimonial;
    /** Accent color used for the top hairline. Falls back to testimonial's. */
    accentColor?: string;
}

export function TestimonialCard({ testimonial, accentColor }: TestimonialCardProps) {
    const tint = accentColor ?? testimonial.accentColor;

    return (
        <figure
            className="glass-card relative overflow-hidden p-7 sm:p-9 md:p-11 lg:p-12 flex flex-col"
            style={{
                // Thin accent-tinted top hairline — "lit from above".
                boxShadow: `inset 0 1px 0 0 color-mix(in srgb, ${tint} 22%, transparent), var(--shadow-soft)`,
            }}
        >
            {/* Oversized quote watermark — editorial anchor. */}
            <Quote
                className="absolute -top-3 -left-2 md:-top-4 md:-left-3 w-24 h-24 md:w-32 md:h-32 pointer-events-none select-none"
                style={{
                    color: tint,
                    opacity: 0.07,
                }}
                aria-hidden="true"
                strokeWidth={1.5}
            />

            {/* Soft radial glow in the upper-right — depth without clutter. */}
            <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-50"
                style={{ backgroundColor: `color-mix(in srgb, ${tint} 10%, transparent)` }}
                aria-hidden="true"
            />

            {/* Quote body — comfortable measure, relaxed leading. */}
            <blockquote className="relative z-10 flex-grow">
                <p className="text-lg sm:text-xl md:text-2xl text-fg leading-[1.65] md:leading-[1.7] font-medium tracking-[-0.01em]">
                    <span
                        className="font-display text-2xl md:text-3xl mr-1 align-[-0.1em]"
                        style={{ color: tint }}
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>
                    {testimonial.quote}
                    <span
                        className="font-display text-2xl md:text-3xl ml-1 align-[-0.1em]"
                        style={{ color: tint }}
                        aria-hidden="true"
                    >
                        &rdquo;
                    </span>
                </p>
            </blockquote>

            {/* Divider — separates quote from attribution. */}
            <div
                className="relative z-10 my-6 md:my-7 h-px w-full"
                style={{
                    background: `linear-gradient(90deg, color-mix(in srgb, ${tint} 35%, transparent) 0%, transparent 80%)`,
                }}
                aria-hidden="true"
            />

            {/* Author block. */}
            <figcaption className="relative z-10">
                <TestimonialAuthor testimonial={testimonial} />
            </figcaption>
        </figure>
    );
}

export default TestimonialCard;
