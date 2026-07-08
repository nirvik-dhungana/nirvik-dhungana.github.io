import { motion, useReducedMotion } from "motion/react";
import {
    MapPin,
    Briefcase,
    Plus,
    Building2,
    CalendarDays,
    Code2,
    ChevronDown,
    Sparkles,
    CheckCircle2,
    ListChecks,
} from "lucide-react";
import { ExperienceContent, type ExperienceEntry } from "../data/content";
import { Reveal } from "./primitives/Reveal";
import { SectionHeading } from "./primitives/SectionHeading";
import { DisclosureCard } from "./primitives/DisclosureCard";

/* ===========================================================================
 *  EXPERIENCE CARD — redesigned as a single cohesive component.
 *
 *  Design principles (read before editing):
 *
 *  1. ONE CARD, ONE COMPOSITION
 *     The outer card is a 12-col CSS grid. The left identity rail spans
 *     cols 1-4 and the right content column spans cols 5-12. The expandable
 *     body ALSO spans cols 5-12 (via DisclosureCard's bodyClassName), so
 *     expanded content aligns perfectly with the right column — no padding
 *     hacks, no negative margins. The card reads as "growing taller", not
 *     "spawning a second box".
 *
 *  2. CLEAR INFORMATION HIERARCHY
 *     Left rail:  Company → Role → Meta (period + location)
 *     Right col:  Stack → Highlights → (expandable) Responsibilities →
 *                 Achievements → Collapse button
 *     Each step leads into the next; nothing is randomly placed.
 *
 *  3. COLLAPSE BUTTON AS A FIRST-CLASS CONTROL
 *     The toggle is a real visual button (rendered inside the DisclosureCard
 *     header <button>): pill shape, chevron icon that rotates 180°, accent-
 *     tinted background when expanded, hover shift, focus ring on the
 *     parent button. It sits at the bottom of the right column, full-width
 *     on mobile, auto-width right-aligned on md+. Impossible to mistake
 *     for body text.
 *
 *  4. GROUPED EXPANDED CONTENT
 *     The expandable region is split into "Responsibilities" and
 *     "Achievements" — each with its own tiny label, but no inner
 *     borders. Grouping improves scannability without breaking the
 *     single-card illusion.
 *
 *  5. CONSISTENT SPACING SYSTEM
 *     All padding derives from the design tokens (--card-pad family) via
 *     the Tailwind p-6 / p-7 / p-8 scale. Section gaps use mb-5
 *     consistently. No ad-hoc mt-3 or pt-2 hacks.
 *
 *  6. PREMIUM ANIMATION (delegated to DisclosureCard)
 *     DisclosureCard animates height + opacity + a subtle 8px translateY
 *     for a "settle into place" feel. The chevron rotates in sync.
 *     Reduced-motion users get instant transitions.
 * ========================================================================= */

/* ---------------------------------------------------------------------------
 *  SectionLabel — tiny eyebrow label for the content groups.
 *  Same visual language as the rest of the site (font-mono, uppercase,
 *  tracked-out, faint). One component so every label is identical.
 * ------------------------------------------------------------------------- */
function SectionLabel({
    icon: Icon,
    children,
    accentColor,
}: {
    icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
    children: React.ReactNode;
    accentColor?: string;
}) {
    return (
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2.5">
            <Icon size={10} style={accentColor ? { color: accentColor } : undefined} aria-hidden="true" />
            {children}
        </div>
    );
}

/* ---------------------------------------------------------------------------
 *  Bullet — the list item used by Highlights / Responsibilities /
 *  Achievements. Shared so every list reads with the same rhythm.
 * ------------------------------------------------------------------------- */
function Bullet({
    children,
    accentColor,
    icon: Icon,
}: {
    children: React.ReactNode;
    accentColor: string;
    icon?: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}) {
    return (
        <li className="flex items-start text-fg text-sm md:text-[15px] leading-relaxed">
            {Icon ? (
                <Icon
                    size={14}
                    className="mr-3 mt-[3px] shrink-0"
                    style={{ color: accentColor }}
                    aria-hidden="true"
                />
            ) : (
                <span
                    className="mr-3 mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                />
            )}
            <span className="leading-relaxed">{children}</span>
        </li>
    );
}

/* ---------------------------------------------------------------------------
 *  CollapseButton — the redesigned toggle (visual only).
 *
 *  Why this is a visual-only element (not a nested <button>):
 *    The entire DisclosureCard header is already a <button>. Nesting a
 *    <button> inside another <button> is invalid HTML and breaks screen
 *    readers. So this renders as a <div role="presentation"> that
 *    inherits the parent button's click. pointer-events:none is set so
 *    the click always reaches the parent button cleanly.
 *
 *  Why it still looks like a button:
 *    - Pill shape with border → unambiguous clickable affordance.
 *    - Chevron rotates 180° on expand → communicates state change.
 *    - Accent-tinted bg + border when expanded → reinforces current state.
 *    - Hover state: the parent <button> carries `group/btn`, so we use
 *      group-hover/btn: to lift the bg opacity and brighten the border.
 *      This makes the button visibly react to hovering anywhere on the
 *      card header — a premium SaaS pattern.
 *    - Focus ring is on the parent <button>, which wraps this element.
 *    - Generous 44px min-height for touch targets on mobile.
 * ------------------------------------------------------------------------- */
function CollapseButton({
    expanded,
    accentColor,
}: {
    expanded: boolean;
    accentColor: string;
}) {
    return (
        <div
            role="presentation"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border min-h-[40px] transition-all duration-300 pointer-events-none select-none group-hover/btn:brightness-110"
            style={{
                backgroundColor: expanded
                    ? `color-mix(in srgb, ${accentColor} 14%, transparent)`
                    : "rgba(40, 36, 32, 0.55)",
                borderColor: expanded
                    ? `color-mix(in srgb, ${accentColor} 45%, transparent)`
                    : "var(--color-bg-3)",
                boxShadow: expanded
                    ? `0 0 20px ${accentColor}20`
                    : "none",
            }}
        >
            <span
                className="text-[11px] font-mono uppercase tracking-[0.18em] font-semibold transition-colors duration-300"
                style={{ color: expanded ? accentColor : "var(--color-fg-dim)" }}
            >
                {expanded ? "Hide details" : "Show details"}
            </span>
            <ChevronDown
                size={15}
                className={`transition-transform duration-300 ease-out ${expanded ? "rotate-180" : ""}`}
                style={{ color: expanded ? accentColor : "var(--color-fg-dim)" }}
                aria-hidden="true"
            />
        </div>
    );
}

/* ---------------------------------------------------------------------------
 *  ExperienceCard — the main card.
 *
 *  Layout: the outer DisclosureCard is a 12-col grid on md+ (1 col on
 *  mobile). The header <button> contains the left rail (cols 1-4) and
 *  the right content column (cols 5-12) — both with their own padding.
 *  The expandable body uses bodyClassName="md:col-start-5 md:col-span-8"
 *  so it aligns with the right column, making the expansion feel like
 *  the right column growing taller rather than a separate box appearing.
 * ------------------------------------------------------------------------- */
function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
    const reduceMotion = useReducedMotion();

    const hasDetails = Boolean(
        (entry.responsibilities && entry.responsibilities.length > 0) ||
        (entry.achievements && entry.achievements.length > 0),
    );

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: index * 0.08 }}
        >
            <DisclosureCard
                idSuffix={`exp-${index}`}
                defaultExpanded={index === 0}
                toggleLabel={`Toggle details for ${entry.role} at ${entry.company}`}
                className="!p-0 overflow-hidden md:grid md:grid-cols-12"
                headerClassName="md:col-span-12 md:grid md:grid-cols-12"
                bodyClassName="md:col-start-5 md:col-span-8"
                showChevron={false}
                header={(expanded) => (
                    <>
                        {/* ===== Left identity rail — cols 1-4 on md+, full width on mobile ===== */}
                        <div
                            className="md:col-span-4 p-6 md:p-7 lg:p-8 border-b md:border-b-0 md:border-r border-bg-3/30 relative overflow-hidden flex flex-col"
                            style={{
                                background: `linear-gradient(135deg, color-mix(in srgb, ${entry.accentColor} 7%, transparent) 0%, transparent 60%)`,
                            }}
                        >
                            {/* Soft brand glow. */}
                            <div
                                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                                style={{ backgroundColor: `color-mix(in srgb, ${entry.accentColor} 14%, transparent)` }}
                                aria-hidden="true"
                            />

                            {/* Company monogram + name. */}
                            <div className="relative flex items-center gap-3 mb-5">
                                <div
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl md:text-2xl shrink-0 border"
                                    style={{
                                        backgroundColor: `color-mix(in srgb, ${entry.accentColor} 14%, transparent)`,
                                        color: entry.accentColor,
                                        borderColor: `color-mix(in srgb, ${entry.accentColor} 35%, transparent)`,
                                        boxShadow: `0 0 24px ${entry.accentColor}25`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {entry.companyInitials}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint">
                                        <Building2 size={10} aria-hidden="true" />
                                        Company
                                    </div>
                                    <h3 className="text-base md:text-lg font-display font-bold text-fg-bright leading-tight mt-0.5 truncate">
                                        {entry.company}
                                    </h3>
                                </div>
                            </div>

                            {/* Role. */}
                            <div className="relative mb-5">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-1">
                                    <Briefcase size={10} aria-hidden="true" />
                                    Role
                                </div>
                                <p className="text-sm md:text-base font-medium" style={{ color: entry.accentColor }}>
                                    {entry.role}
                                </p>
                            </div>

                            {/* Meta — period + location. */}
                            <div className="relative mt-auto space-y-2 pt-4 border-t border-bg-3/30">
                                <div className="flex items-center gap-2 text-xs text-fg-dim">
                                    <CalendarDays size={12} className="text-fg-faint shrink-0" aria-hidden="true" />
                                    <span className="font-mono">{entry.period}</span>
                                </div>
                                {entry.location && (
                                    <div className="flex items-center gap-2 text-xs text-fg-dim">
                                        <MapPin size={12} className="text-fg-faint shrink-0" aria-hidden="true" />
                                        <span>{entry.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ===== Right content column — cols 5-12 ===== */}
                        <div className="md:col-span-8 p-6 md:p-7 lg:p-8 flex flex-col group/btn">
                            {/* Technologies. */}
                            {entry.technologies && entry.technologies.length > 0 && (
                                <div className="mb-5">
                                    <SectionLabel icon={Code2} accentColor={entry.accentColor}>
                                        Stack
                                    </SectionLabel>
                                    <div className="flex flex-wrap gap-2">
                                        {entry.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 text-[11px] font-mono text-fg-dim bg-bg-2/60 border border-bg-3/40 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Highlights — always visible. */}
                            <div className="mb-5">
                                <SectionLabel icon={Sparkles} accentColor={entry.accentColor}>
                                    Highlights
                                </SectionLabel>
                                <ul className="space-y-2.5">
                                    {entry.highlights.map((req, i) => (
                                        <Bullet key={i} accentColor={entry.accentColor}>
                                            {req}
                                        </Bullet>
                                    ))}
                                </ul>
                            </div>

                            {/* Collapse button — bottom of the right column.
                                Full-width on mobile, auto-width right-aligned
                                on md+. pointer-events:none because the parent
                                <button> handles the click. */}
                            {hasDetails && (
                                <div className="mt-auto pt-2 flex md:justify-end">
                                    <CollapseButton
                                        expanded={expanded}
                                        accentColor={entry.accentColor}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            >
                {/* ============================================================
                    Expandable body — aligns with the right column via
                    bodyClassName="md:col-start-5 md:col-span-8" on the
                    DisclosureCard. This is grid semantics, not a CSS hack:
                    the outer card is a 12-col grid, and the body is placed
                    in cols 5-12 — exactly where the right content column
                    lives. The card reads as one continuous surface growing
                    taller.

                    NO inner border-t. NO separate background. The only
                    separator from the highlights above is spacing rhythm
                    + the tiny section labels.

                    Groups: Responsibilities → Achievements.
                    ============================================================ */}
                {hasDetails && (
                    <div className="p-6 md:p-7 lg:p-8 pt-7 md:pt-8 lg:pt-9 space-y-7">
                        {/* Responsibilities. */}
                        {entry.responsibilities && entry.responsibilities.length > 0 && (
                            <div>
                                <SectionLabel icon={ListChecks} accentColor={entry.accentColor}>
                                    Responsibilities
                                </SectionLabel>
                                <ul className="space-y-3">
                                    {entry.responsibilities.map((req, i) => (
                                        <Bullet key={i} accentColor={entry.accentColor}>
                                            {req}
                                        </Bullet>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Achievements. */}
                        {entry.achievements && entry.achievements.length > 0 && (
                            <div>
                                <SectionLabel icon={CheckCircle2} accentColor={entry.accentColor}>
                                    Achievements
                                </SectionLabel>
                                <ul className="space-y-3">
                                    {entry.achievements.map((ach, i) => (
                                        <Bullet
                                            key={i}
                                            accentColor={entry.accentColor}
                                            icon={CheckCircle2}
                                        >
                                            {ach}
                                        </Bullet>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </DisclosureCard>
        </motion.div>
    );
}

export function Experience() {
    return (
        <section id="experience" className="px-6 relative">
            <div className="max-w-5xl mx-auto">
                <SectionHeading
                    eyebrow="04 — EXPERIENCE"
                    title="Where I've Worked"
                    description="Professional roles and internships — each one expanded my craft and shipped real products."
                />

                <Reveal stagger={0.1}>
                    <div className="flex flex-col gap-6">
                        {ExperienceContent.map((entry, idx) => (
                            <ExperienceCard key={`${entry.company}-${idx}`} entry={entry} index={idx} />
                        ))}
                    </div>
                </Reveal>

                {/* "More to come" indicator — fills the visual gap when
                    there are few entries, signalling ongoing growth. */}
                <Reveal className="mt-6" delay={0.2}>
                    <div className="flex items-center justify-center gap-3 text-fg-faint">
                        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-bg-3/60" />
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-2/40 border border-dashed border-bg-3/60">
                            <Plus size={12} className="text-accent/70" aria-hidden="true" />
                            <span className="font-mono text-[11px] uppercase tracking-wider">More roles in progress</span>
                        </div>
                        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-bg-3/60" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
