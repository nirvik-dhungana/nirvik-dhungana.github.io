import { motion, useReducedMotion } from "motion/react";
import { Layout, Server, Wrench, ExternalLink } from "lucide-react";
import { SkillsContent, type SkillCategory } from "../data/content";
import { Reveal } from "./primitives/Reveal";
import { SectionHeading } from "./primitives/SectionHeading";
import { getSkillIconUrl, getSkillInitial } from "./primitives/skillIcons";

const categoryIconMap = {
    frontend: Layout,
    backend: Server,
    tools: Wrench,
} as const;

const categoryAccentMap: Record<SkillCategory["key"], string> = {
    frontend: "var(--color-accent)",
    backend: "var(--color-success)",
    tools: "var(--color-gold)",
};

function SkillBadge({ skill, index }: { skill: SkillCategory["skills"][number]; index: number }) {
    const reduceMotion = useReducedMotion();
    const iconUrl = getSkillIconUrl(skill.name);
    const initial = getSkillInitial(skill.name);

    return (
        <motion.a
            href={skill.docs}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${skill.name} — ${skill.note ?? "open official documentation (opens in a new tab)"}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            className="tooltip-host group relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-2/60 border border-bg-3/50 hover:bg-bg-2 hover:border-current/40 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            style={{ ["--skill-color" as string]: skill.color }}
        >
            {/* Icon — brand-tinted on hover. */}
            <span
                className="relative w-5 h-5 flex items-center justify-center text-fg-dim group-hover:text-[var(--skill-color)] transition-colors"
                aria-hidden="true"
            >
                {iconUrl ? (
                    <img
                        src={iconUrl}
                        alt=""
                        width={16}
                        height={16}
                        loading="lazy"
                        className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ filter: "saturate(0.7)" }}
                    />
                ) : (
                    <span className="text-[10px] font-mono font-bold">{initial}</span>
                )}
            </span>

            {/* Label. */}
            <span className="text-xs md:text-sm font-medium text-fg group-hover:text-fg-bright transition-colors">
                {skill.name}
            </span>

            {/* External-link hint. */}
            <ExternalLink
                size={11}
                className="text-fg-faint opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
            />

            {/* Tooltip with note. */}
            {skill.note && (
                <span className="tooltip" role="tooltip">{skill.note}</span>
            )}

            {/* Bottom accent line — brand color, grows on hover. */}
            <span
                className="absolute -bottom-px left-3 right-3 h-px bg-[var(--skill-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `0 0 8px var(--skill-color)` }}
                aria-hidden="true"
            />
        </motion.a>
    );
}

export function Skills() {
    return (
        <section id="skills" className="px-6 relative">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="03 — SKILLS"
                    title="Tools & Technologies"
                    description="The stack I reach for. Each badge links to its official documentation — hover for context."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {SkillsContent.map((category, catIdx) => {
                        const Icon = categoryIconMap[category.key];
                        const accent = categoryAccentMap[category.key];

                        return (
                            <Reveal
                                key={category.key}
                                delay={catIdx * 0.1}
                                className="glass-card glass-card-interactive p-6 md:p-7 relative overflow-hidden group flex flex-col h-full"
                            >
                                {/* Category color accent — top edge. */}
                                <div
                                    className="absolute top-0 left-6 right-6 h-px opacity-50 group-hover:opacity-100 transition-opacity"
                                    style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                                    aria-hidden="true"
                                />

                                {/* Header. */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center border"
                                        style={{
                                            backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
                                            borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
                                            color: accent,
                                        }}
                                        aria-hidden="true"
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-fg-bright">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Description. */}
                                <p className="text-xs text-fg-dim mb-5 leading-relaxed">
                                    {category.description}
                                </p>

                                {/* Skill badges — flex-grow pushes footer to bottom for equal card heights. */}
                                <div className="flex flex-wrap gap-2 flex-grow content-start">
                                    {category.skills.map((skill, idx) => (
                                        <SkillBadge key={skill.name} skill={skill} index={idx} />
                                    ))}
                                </div>

                                {/* Count footer — pinned to bottom via flex-grow above. */}
                                <div className="mt-5 pt-4 border-t border-bg-3/40 flex items-center justify-between text-[11px] font-mono text-fg-faint uppercase tracking-wider">
                                    <span>{category.skills.length} skills</span>
                                    <span style={{ color: accent }}>●</span>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
