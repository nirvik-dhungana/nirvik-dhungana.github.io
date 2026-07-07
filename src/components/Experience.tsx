import { motion, useReducedMotion } from "motion/react";
import { MapPin, Briefcase, Plus, Building2, CalendarDays, Code2, ChevronDown } from "lucide-react";
import { ExperienceContent, type ExperienceEntry } from "../data/content";
import { Reveal } from "./primitives/Reveal";
import { SectionHeading } from "./primitives/SectionHeading";
import { DisclosureCard } from "./primitives/DisclosureCard";

/* ---------------------------------------------------------------------------
 *  Experience card — two-column layout (identity panel + content panel)
 *  wrapped in the unified DisclosureCard primitive for consistent
 *  expand/collapse behavior with Education and Learning.
 *
 *  The DisclosureCard header contains the always-visible identity + first
 *  highlight. The DisclosureCard body contains the remaining highlights
 *  (revealed on expand).
 * ------------------------------------------------------------------------- */
function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
    const reduceMotion = useReducedMotion();
    const hasMoreHighlights = entry.responsibilities.length > 1;

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
                className="!p-0 overflow-hidden"
                showChevron={false}
                header={() => (
                    <div className="grid grid-cols-1 md:grid-cols-12 w-full">
                        {/* ===== Identity panel — 4 cols on md+, full width on mobile ===== */}
                        <div
                            className="md:col-span-4 p-6 md:p-7 lg:p-8 border-b md:border-b-0 md:border-r border-bg-3/40 relative overflow-hidden flex flex-col"
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

                            {/* Company monogram. */}
                            <div className="relative flex items-center gap-3 mb-4">
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
                            <div className="relative mb-4">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-1">
                                    <Briefcase size={10} aria-hidden="true" />
                                    Role
                                </div>
                                <p className="text-sm md:text-base font-medium text-accent">
                                    {entry.role}
                                </p>
                            </div>

                            {/* Meta — period + location. */}
                            <div className="relative mt-auto space-y-2 pt-4 border-t border-bg-3/40">
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

                        {/* ===== Content panel — 8 cols ===== */}
                        <div className="md:col-span-8 p-6 md:p-7 lg:p-8 flex flex-col">
                            {/* Technologies. */}
                            {entry.technologies && entry.technologies.length > 0 && (
                                <div className="mb-5">
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2">
                                        <Code2 size={10} aria-hidden="true" />
                                        Stack
                                    </div>
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

                            {/* Highlights — first 1 always visible. */}
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2">
                                    Highlights
                                </div>
                                <ul className="space-y-2.5">
                                    {entry.responsibilities.slice(0, 1).map((req, i) => (
                                        <li key={i} className="flex items-start text-fg text-sm md:text-base">
                                            <span
                                                className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ backgroundColor: entry.accentColor }}
                                                aria-hidden="true"
                                            />
                                            <span className="leading-relaxed">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Toggle hint — only if more highlights exist. */}
                            {hasMoreHighlights && (
                                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent">
                                    <ChevronDown
                                        size={14}
                                        className="transition-transform duration-300 [button[aria-expanded=true]_&]:rotate-180"
                                        aria-hidden="true"
                                    />
                                    <span className="[button[aria-expanded=false]_&]:inline [button[aria-expanded=true]_&]:hidden">Show details</span>
                                    <span className="[button[aria-expanded=false]_&]:hidden [button[aria-expanded=true]_&]:inline">Hide details</span>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            >
                {/* Expandable body — remaining highlights, full-width below
                    the two-column header. Clean, no fragile offset hacks. */}
                {hasMoreHighlights && (
                    <div className="px-6 md:px-7 lg:px-8 pb-6 md:pb-7 lg:pb-8">
                        <ul className="space-y-2.5 mt-4 pt-4 border-t border-bg-3/40">
                            {entry.responsibilities.slice(1).map((req, i) => (
                                <li key={i} className="flex items-start text-fg text-sm md:text-base">
                                    <span
                                        className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ backgroundColor: entry.accentColor }}
                                        aria-hidden="true"
                                    />
                                    <span className="leading-relaxed">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </DisclosureCard>
        </motion.div>
    );
}

export function Experience() {
    return (
        <section id="experience" className="px-6 relative z-10">
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
