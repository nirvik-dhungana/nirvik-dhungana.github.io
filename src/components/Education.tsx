import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, Award, BookOpen, Building2, CalendarDays } from "lucide-react";
import { EducationContent, type EducationEntry } from "../data/content";
import { SectionHeading } from "./primitives/SectionHeading";
import { Badge } from "./Badge";
import { Reveal } from "./primitives/Reveal";
import { DisclosureCard, DisclosureChevron } from "./primitives/DisclosureCard";

/* ---------------------------------------------------------------------------
 *  Education card — uses the unified DisclosureCard primitive for
 *  consistent expand/collapse behavior with Experience and Learning.
 *
 *  Collapsed: header only (logo + school + level + meta + chevron).
 *  Expanded:  coursework / achievements / activities below the header.
 * ------------------------------------------------------------------------- */
function EducationCard({ entry, index }: { entry: EducationEntry; index: number }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: index * 0.08 }}
        >
            <DisclosureCard
                idSuffix={`edu-${index}`}
                defaultExpanded={index === 0}
                toggleLabel={`Toggle details for ${entry.school}`}
                className="!p-0"
                header={(expanded) => (
                    <div className="p-6 md:p-7 flex items-center gap-4 md:gap-5 w-full">
                        {/* Institution logo placeholder. */}
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                            <GraduationCap size={22} className="text-accent" aria-hidden="true" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-display font-bold text-fg-bright leading-tight">
                                {entry.school}
                            </h3>
                            <p className="text-accent text-sm mt-0.5">{entry.level}</p>
                            {/* Meta row — period + GPA badges. */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge variant="muted" className="font-mono">
                                    <CalendarDays size={10} className="mr-1 inline" aria-hidden="true" />
                                    {entry.period}
                                </Badge>
                                {entry.gpa && (
                                    <Badge variant="gold" className="font-mono font-bold">
                                        <Award size={10} className="mr-1 inline" aria-hidden="true" />
                                        {entry.gpa}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <DisclosureChevron expanded={expanded} />
                    </div>
                )}
            >
                <div className="px-6 md:px-7 pb-6 md:pb-7 pt-0 space-y-5">
                    {/* Divider. */}
                    <div className="border-t border-bg-3/40 -mx-6 md:-mx-7 pt-5" />

                    {/* Coursework. */}
                    {entry.coursework && entry.coursework.length > 0 && (
                        <div>
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2.5 flex items-center gap-1.5">
                                <BookOpen size={11} aria-hidden="true" />
                                Coursework
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {entry.coursework.map((c) => (
                                    <span
                                        key={c}
                                        className="px-2 py-0.5 text-[11px] font-mono text-fg-dim bg-bg-2/60 border border-bg-3/40 rounded-md"
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements. */}
                    {entry.achievements && entry.achievements.length > 0 && (
                        <div>
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2.5 flex items-center gap-1.5">
                                <Award size={11} aria-hidden="true" />
                                Achievements
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {entry.achievements.map((a) => (
                                    <span
                                        key={a}
                                        className="px-2 py-0.5 text-[11px] font-mono text-gold bg-gold/5 border border-gold/30 rounded-md"
                                    >
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Activities. */}
                    <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2.5 flex items-center gap-1.5">
                            <Building2 size={11} aria-hidden="true" />
                            Activities
                        </h4>
                        <ul className="space-y-2">
                            {entry.activities.map((act, i) => (
                                <li key={i} className="flex items-start text-fg-dim text-sm">
                                    <span className="mr-2.5 mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                                    <span className="leading-relaxed">{act}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DisclosureCard>
        </motion.div>
    );
}

export function Education() {
    return (
        <section id="education" className="px-6 relative">
            <div className="max-w-4xl mx-auto">
                <SectionHeading
                    eyebrow="05 — EDUCATION"
                    title="Academic Background"
                    description="Formal education that built my foundation in computer science and beyond."
                />

                {/*
                  Single-column accordion list. Each card sizes to its own
                  content — no row-stretch whitespace, no lopsided grids.
                  Cards expand/collapse cleanly via the DisclosureCard primitive.
                */}
                <Reveal stagger={0.1}>
                    <div className="flex flex-col gap-5">
                        {EducationContent.map((edu, idx) => (
                            <EducationCard key={`${edu.school}-${idx}`} entry={edu} index={idx} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
