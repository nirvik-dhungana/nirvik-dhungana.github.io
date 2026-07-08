import { motion, useReducedMotion } from "motion/react";
import { Check, Sparkles, ArrowDown } from "lucide-react";
import { LearningPathContent, type LearningStage } from "../data/content";
import { Reveal } from "./primitives/Reveal";
import { SectionHeading } from "./primitives/SectionHeading";

/* ===========================================================================
 *  Learning Path — card-based layout (timeline rail removed).
 *
 *  The previous version used a vertical timeline rail on the left with
 *  floating nodes that overlapped adjacent cards. The rail added visual
 *  complexity without aiding comprehension.
 *
 *  The new design:
 *    - Each stage is a full glass-card with the status indicator INSIDE
 *      the card header (not floating beside it).
 *    - The progress summary sits above the cards, full-width, no indent.
 *    - Status badges (Completed / Present / Upcoming) are color-coded
 *      pill badges in each card's header row.
 *    - The check / sparkles / dot indicator sits at the start of the
 *      stage title row — naturally integrated, no overlap.
 *    - A subtle "More to come" footer signals ongoing growth.
 * ========================================================================= */

type StageStatus = "completed" | "present" | "upcoming";

function inferStatus(status: string): StageStatus {
    const s = status.toLowerCase();
    if (s.includes("present") || s.includes("current") || s.includes("now")) return "present";
    if (s.includes("starting") || s.includes("past") || s.includes("done") || s.includes("complete")) return "completed";
    return "upcoming";
}

/* ---------------------------------------------------------------------------
 *  StatusIndicator — the small icon that communicates a stage's status.
 *  Sits at the start of the stage title row, naturally integrated.
 * ------------------------------------------------------------------------- */
function StatusIndicator({ status }: { status: StageStatus }) {
    if (status === "present") {
        return (
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex rounded-full h-6 w-6 bg-accent items-center justify-center">
                    <Sparkles size={12} className="text-bg-base" aria-hidden="true" />
                </span>
            </span>
        );
    }
    if (status === "completed") {
        return (
            <span className="flex h-6 w-6 shrink-0 rounded-full bg-accent/15 border-2 border-accent items-center justify-center">
                <Check size={12} className="text-accent" strokeWidth={3} />
            </span>
        );
    }
    return (
        <span className="flex h-6 w-6 shrink-0 rounded-full bg-bg-2 border-2 border-bg-3 items-center justify-center">
            <span className="block w-1.5 h-1.5 rounded-full bg-fg-faint" aria-hidden="true" />
        </span>
    );
}

/* ---------------------------------------------------------------------------
 *  StatusBadge — the colored pill that labels the stage's status.
 * ------------------------------------------------------------------------- */
function StatusBadge({ status, label }: { status: StageStatus; label: string }) {
    if (status === "present") {
        return (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full text-accent bg-accent/10 border border-accent/30">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                {label}
            </span>
        );
    }
    if (status === "completed") {
        return (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full text-fg-dim bg-bg-2/60 border border-bg-3/40">
                <Check size={10} className="text-accent" strokeWidth={3} aria-hidden="true" />
                {label}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full text-fg-faint bg-bg-2/60 border border-bg-3/40">
            {label}
        </span>
    );
}

/* ---------------------------------------------------------------------------
 *  Stage card — a single learning stage as a glass-card.
 * ------------------------------------------------------------------------- */
function StageCard({ stage, index }: { stage: LearningStage; index: number }) {
    const status = inferStatus(stage.status);
    const reduceMotion = useReducedMotion();

    const cardAccent =
        status === "present"
            ? "ring-1 ring-accent/30 shadow-[0_0_40px_rgba(168,193,85,0.10)]"
            : "";

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: index * 0.1 }}
            className={`glass-card glass-card-interactive p-6 md:p-7 relative overflow-hidden ${cardAccent}`}
        >
            {/* Decorative top-edge accent — color depends on status. */}
            <div
                className="absolute top-0 left-6 right-6 h-px opacity-50"
                style={{
                    background:
                        status === "present"
                            ? "var(--color-accent)"
                            : status === "completed"
                              ? "color-mix(in srgb, var(--color-accent) 40%, transparent)"
                              : "var(--color-bg-3)",
                    boxShadow:
                        status === "present"
                            ? "0 0 8px var(--color-accent)"
                            : "none",
                }}
                aria-hidden="true"
            />

            {/* Header row — status badge + period. */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <StatusBadge status={status} label={stage.status} />
                {stage.period && (
                    <span className="font-mono text-[11px] text-fg-faint">{stage.period}</span>
                )}
            </div>

            {/* Title row — status indicator + stage title. */}
            <div className="flex items-center gap-3 mb-4">
                <StatusIndicator status={status} />
                <h3
                    className={`font-display font-bold ${
                        status === "present"
                            ? "text-fg-bright text-xl md:text-2xl"
                            : status === "completed"
                              ? "text-fg text-lg md:text-xl"
                              : "text-fg-dim text-lg md:text-xl"
                    }`}
                >
                    {stage.stage}
                </h3>
            </div>

            {/* Bullet points — summary, always visible. */}
            <ul className="space-y-2.5 mb-4">
                {stage.points.map((pt, i) => (
                    <li
                        key={i}
                        className={`flex items-start text-sm md:text-base ${
                            status === "present" ? "text-fg" : "text-fg-dim"
                        }`}
                    >
                        <span className="mr-3 mt-1.5 shrink-0">
                            {status === "present" ? (
                                <motion.span
                                    animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                                    className="block w-1.5 h-1.5 rounded-full bg-accent"
                                />
                            ) : status === "completed" ? (
                                <Check size={12} className="text-accent" strokeWidth={2.5} />
                            ) : (
                                <span className="block w-1.5 h-1.5 rounded-full bg-bg-3" />
                            )}
                        </span>
                        <span className="leading-relaxed">{pt}</span>
                    </li>
                ))}
            </ul>

            {/* Topics. */}
            {stage.topics && stage.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-bg-3/30">
                    {stage.topics.map((topic) => (
                        <span
                            key={topic}
                            className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md border ${
                                status === "present"
                                    ? "text-accent bg-accent/5 border-accent/30"
                                    : "text-fg-faint bg-bg-2/40 border-bg-3/40"
                            }`}
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export function LearningPath() {
    const stages = LearningPathContent as LearningStage[];
    const reduceMotion = useReducedMotion();

    const completed = stages.filter((s) => inferStatus(s.status) === "completed").length;
    const total = stages.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <section id="growth" className="px-6 relative">
            <div className="max-w-4xl mx-auto">
                <SectionHeading
                    eyebrow="06 — GROWTH"
                    title="Learning Path"
                    description="A chronological view of the skills I've built and what I'm actively exploring next."
                />

                {/* Progress summary — full-width, no indent. */}
                <Reveal className="mb-8" delay={0.1}>
                    <div className="glass-card p-5 md:p-6 flex items-center gap-5">
                        <div className="shrink-0">
                            <div className="text-3xl font-display font-bold text-gradient-accent">{percent}%</div>
                            <div className="text-[10px] font-mono uppercase tracking-wider text-fg-faint mt-1">Complete</div>
                        </div>
                        <div className="flex-1 h-2 bg-bg-3/40 rounded-full overflow-hidden">
                            <motion.div
                                initial={reduceMotion ? false : { width: 0 }}
                                whileInView={{ width: `${percent}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
                                className="h-full bg-gradient-to-r from-accent to-gold rounded-full"
                                style={{ boxShadow: "0 0 12px var(--color-accent)" }}
                            />
                        </div>
                        <div className="shrink-0 text-xs font-mono text-fg-dim hidden sm:block">
                            {completed} / {total} stages
                        </div>
                    </div>
                </Reveal>

                {/* Stage cards — vertical stack, no timeline rail. */}
                <Reveal stagger={0.1}>
                    <div className="flex flex-col gap-5">
                        {stages.map((stage, idx) => (
                            <StageCard
                                key={`${stage.stage}-${idx}`}
                                stage={stage}
                                index={idx}
                            />
                        ))}
                    </div>
                </Reveal>

                {/* "More to come" footer — clean, centered. */}
                {(() => {
                    const lastStage = stages[stages.length - 1];
                    if (!lastStage) return null;
                    return inferStatus(lastStage.status) === "present" ? (
                        <Reveal className="mt-6" delay={0.2}>
                            <div className="flex items-center justify-center gap-3 text-fg-faint">
                                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-bg-3/60" />
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-2/40 border border-dashed border-bg-3/60">
                                    <ArrowDown size={12} className="text-accent/70 shrink-0" aria-hidden="true" />
                                    <span className="font-mono text-[11px] uppercase tracking-wider">More to come</span>
                                </div>
                                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-bg-3/60" />
                            </div>
                        </Reveal>
                    ) : null;
                })()}
            </div>
        </section>
    );
}
