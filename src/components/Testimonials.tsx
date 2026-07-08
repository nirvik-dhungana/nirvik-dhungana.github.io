import { TestimonialsContent } from "../data/content";
import { SectionHeading } from "./primitives/SectionHeading";
import { Reveal } from "./primitives/Reveal";
import { TestimonialCarousel } from "./testimonials/TestimonialCarousel";

/* ===========================================================================
 *  TESTIMONIALS — editorial spotlight carousel.
 *
 *  Redesigned from scratch. See ./testimonials/* for the modular pieces:
 *    - TestimonialCarousel  : state, autoplay, drag/swipe, keyboard, ARIA
 *    - TestimonialCard      : single spotlight card presentation
 *    - TestimonialAuthor    : avatar / name / role / relationship / linkedin
 *    - TestimonialControls  : segmented progress timeline + prev/next + pause
 *    - useTestimonialAutoplay : single-rAF accumulator (continues naturally)
 *
 *  Design rationale: a single wide glass card lets the quote breathe at a
 *  comfortable reading measure, gives the glassmorphism room to read as
 *  premium (not busy), and makes the autoplay transition a clean one-in /
 *  one-out crossfade — no multi-card stutter. The segmented timeline unifies
 *  position + progress into one elegant control.
 * ========================================================================= */

export function Testimonials() {
    return (
        <section id="testimonials" className="px-6 relative">
            {/* Subtle section background — matches About's treatment so the
                testimonials feel like part of the same page rhythm. */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-1/40 to-transparent pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto relative">
                <SectionHeading
                    eyebrow="07 — TESTIMONIALS"
                    title="In Their Words"
                    description="Reflections from the mentors, collaborators, and instructors I've built and shipped alongside — the people who shaped how I work."
                />

                <Reveal direction="up">
                    <TestimonialCarousel testimonials={TestimonialsContent} />
                </Reveal>
            </div>
        </section>
    );
}

export default Testimonials;
