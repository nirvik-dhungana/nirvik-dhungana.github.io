import { motion, useReducedMotion } from "motion/react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { AboutContent } from "../data/content";
import { Badge, type BadgeVariant } from "./Badge";
import { Reveal } from "./primitives/Reveal";
import { SectionHeading } from "./primitives/SectionHeading";
import { CountUp } from "./primitives/CountUp";

const tagVariants: BadgeVariant[] = ["gold", "lagoon", "verdant"];

export function About() {
    const reduceMotion = useReducedMotion();

    /* Pull out the highlighted phrase for emphasis. */
    const bio = AboutContent.bio[0] ?? "";
    const highlightPhrase = "accessible, responsive, and performant";
    const [before, after] = bio.split(highlightPhrase);

    return (
        <section id="about" className="px-6 relative">
            {/* Subtle section background gradient for visual separation. */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-1/40 to-transparent pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative">
                <SectionHeading
                    eyebrow="01 — ABOUT"
                    title={AboutContent.heading}
                />

                {/*
                  Layout: 12-column grid on lg+, single column on mobile.
                    - Bio card spans 7 cols (~58%) — holds the narrative.
                    - Stats column spans 5 cols (~42%) and uses lg:grid-rows-2
                      so both stat cards split the column height equally with
                      NO gap, regardless of bio card height. This eliminates
                      the lopsided "tall column with awkward gaps" issue.
                    - On sm-md the stats render side-by-side (2 cols) below
                      the bio — predictable, scannable rhythm.
                */}
                <Reveal stagger={0.1}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                        {/* ===== Bio card — spans 7 columns ===== */}
                        <div className="glass-card glass-card-interactive lg:col-span-7 p-6 md:p-8 lg:p-9 relative overflow-hidden group flex flex-col">
                            {/* Decorative corner accent — top-right glow. */}
                            <div
                                className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/8 blur-3xl group-hover:bg-accent/12 transition-colors duration-500 pointer-events-none"
                                aria-hidden="true"
                            />
                            {/*
                              Decorative left rail — inset 16px from the card
                              edge so it reads as an intentional accent rather
                              than a clipped border. Spans most of the card
                              height with a soft accent → gold → transparent
                              gradient.
                            */}
                            <div
                                className="absolute left-4 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-accent via-gold to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                aria-hidden="true"
                            />

                            <div className="relative pl-6 flex flex-col h-full">
                                {/* "Now" badge — accent on accent/10 with border. */}
                                <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 mb-6">
                                    <Sparkles size={12} className="text-accent" aria-hidden="true" />
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">Now</span>
                                </div>

                                {/* Bio with highlighted phrase. */}
                                <p className="text-base md:text-lg text-fg leading-[1.75] flex-grow">
                                    {before}
                                    <span className="text-accent font-medium bg-accent/5 px-1 rounded">
                                        {highlightPhrase}
                                    </span>
                                    {after}
                                </p>

                                {/* "Now" status line. */}
                                <p className="mt-6 text-sm text-fg-dim italic border-l-2 border-bg-3 pl-4">
                                    {AboutContent.now}
                                </p>

                                {/* Tags. */}
                                <div className="mt-8 flex flex-wrap gap-2.5">
                                    {AboutContent.tags.map((tag, idx) => (
                                        <Badge key={tag} variant={tagVariants[idx % tagVariants.length]}>
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/*
                          Stats column — 5 cols on lg, full width below.
                          On lg+ uses `lg:grid-rows-2` so both stat cards
                          split the column height equally with NO gap,
                          regardless of how tall the bio card is.
                        */}
                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-6 items-stretch">
                            {AboutContent.stats.map((stat, idx) => (
                                <motion.div
                                    key={stat.label}
                                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="glass-card glass-card-interactive p-6 md:p-7 flex flex-col justify-center min-h-[140px] relative overflow-hidden group"
                                >
                                    {/* Decorative arrow that appears on hover. */}
                                    <ArrowUpRight
                                        size={20}
                                        className="absolute top-5 right-5 text-fg-faint opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
                                        aria-hidden="true"
                                    />

                                    <div className="text-4xl md:text-5xl mb-2 font-display font-bold text-gradient-accent break-words">
                                        <CountUp value={stat.number} />
                                    </div>
                                    <div className="text-xs sm:text-sm text-fg-dim font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </div>

                                    {/* Bottom accent line that grows on hover. */}
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
