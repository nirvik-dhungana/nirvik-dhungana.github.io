import { Linkedin, BadgeCheck } from "lucide-react";
import type { Testimonial } from "../../data/content";

/* ===========================================================================
 *  TestimonialAuthor — the attribution block at the foot of each card.
 *
 *  Composition (left → right):
 *    [avatar w/ optional verified tick]  [name]  [role @ company]  [relationship pill]  [linkedin]
 *
 *  On narrow viewports the relationship pill wraps below; on the smallest
 *  screens everything stacks cleanly. The avatar uses the testimonial's own
 *  `accentColor` for a tinted ring + initials so each voice has a distinct
 *  visual identity without breaking the warm palette.
 * ========================================================================= */

interface TestimonialAuthorProps {
    testimonial: Testimonial;
}

export function TestimonialAuthor({ testimonial }: TestimonialAuthorProps) {
    const { name, role, company, initials, accentColor, relationship, linkedin, verified } =
        testimonial;

    return (
        <div className="flex items-center gap-4">
            {/* Avatar with accent-tinted ring + optional verification tick. */}
            <div className="relative shrink-0">
                <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-display font-bold text-sm md:text-base"
                    style={{
                        backgroundColor: `color-mix(in srgb, ${accentColor} 14%, transparent)`,
                        color: accentColor,
                        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accentColor} 35%, transparent)`,
                    }}
                    aria-hidden="true"
                >
                    {initials}
                </div>
                {verified && (
                    <span
                        className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-bg-1 flex items-center justify-center"
                        title="Verified"
                        aria-label="Verified"
                    >
                        <BadgeCheck
                            size={14}
                            className="text-accent"
                            strokeWidth={2.5}
                            aria-hidden="true"
                        />
                    </span>
                )}
            </div>

            {/* Name + role/company. */}
            <div className="min-w-0 flex-1">
                <div className="text-base md:text-lg font-display font-bold text-fg-bright leading-tight truncate">
                    {name}
                </div>
                <div className="text-xs md:text-sm font-mono text-fg-dim mt-0.5 break-words line-clamp-2">
                    {role} <span className="text-fg-faint">·</span> {company}
                </div>
            </div>

            {/* Relationship pill + LinkedIn — collapse to a row on small screens. */}
            <div className="flex items-center gap-2 shrink-0">
                <span
                    className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-medium border"
                    style={{
                        color: accentColor,
                        backgroundColor: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
                        borderColor: `color-mix(in srgb, ${accentColor} 28%, transparent)`,
                    }}
                >
                    {relationship}
                </span>
                {linkedin && (
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-fg-dim hover:text-accent hover:bg-accent/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                        aria-label={`${name} on LinkedIn (opens in a new tab)`}
                    >
                        <Linkedin size={16} aria-hidden="true" />
                    </a>
                )}
            </div>
        </div>
    );
}

export default TestimonialAuthor;
