import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Github, Star, ExternalLink, BookOpen, Rocket, Wrench, Lightbulb, Target, Gem, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectsContent, PersonalInfo, type ProjectData } from "../data/content";
import { ProjectMedia } from "./ProjectMedia";
import { Badge, type BadgeVariant } from "./Badge";
import { Reveal } from "./primitives/Reveal";
import { SectionHeading } from "./primitives/SectionHeading";
import { Modal } from "./primitives/Modal";

const tagVariants: BadgeVariant[] = ["gold", "lagoon", "rosewood", "verdant"];

/* ---------------------------------------------------------------------------
 *  Filter tabs — scalable as more projects + categories are added.
 * ------------------------------------------------------------------------- */
type FilterKey = "all" | "featured" | "web" | "design" | "education" | "tool";

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "featured", label: "Featured" },
    { key: "web", label: "Web" },
    { key: "design", label: "Design" },
    { key: "education", label: "Education" },
];

function matchesFilter(project: ProjectData, filter: FilterKey): boolean {
    if (filter === "all") return true;
    if (filter === "featured") return Boolean(project.featured);
    return project.category === filter;
}

/* ---------------------------------------------------------------------------
 *  Project detail modal — uses the unified Modal primitive for consistent
 *  overlay architecture (z-index, focus trap, body scroll lock, Escape,
 *  click-outside) with the rest of the app. Scales to any number of
 *  optional fields; sections render only when the data exists.
 * ------------------------------------------------------------------------- */
function ProjectModal({ project, onClose }: { project: ProjectData; onClose: () => void }) {
    const isInternalRoute = (url?: string) => Boolean(url && url.startsWith("/"));
    const brandColor = project.brandColor ?? "var(--color-accent)";

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            ariaLabel={`Project details: ${project.title}`}
            ariaLabelledBy="project-modal-title"
            variant="sheet"
            maxWidthClass="max-w-4xl"
            closeButtonLabel="Close project details"
        >
            <div className="px-6 md:px-10 pb-10 pt-6">
                {/* Header. */}
                <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                    <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {project.featured && (
                                <Badge variant="gold" className="font-mono">
                                    <Star size={10} className="mr-1 inline" aria-hidden="true" />
                                    Featured
                                </Badge>
                            )}
                            {project.product && (
                                <Badge variant="accent" className="font-mono">
                                    <Gem size={10} className="mr-1 inline" aria-hidden="true" />
                                    Product
                                </Badge>
                            )}
                            {project.year && (
                                <Badge variant="muted" className="font-mono">{project.year}</Badge>
                            )}
                            {project.category && (
                                <Badge variant="lagoon" className="font-mono uppercase">
                                    {project.category}
                                </Badge>
                            )}
                        </div>
                        <h3 id="project-modal-title" className="text-3xl md:text-4xl font-display font-bold text-fg-bright">
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Preview. */}
                <div className="mb-8">
                    <ProjectMedia project={project} aspectRatio="16/9" className="max-w-3xl mx-auto" />
                </div>

                {/* Objective. */}
                {project.objective && (
                    <div className="mb-8 glass-card !bg-bg-2/40 p-5 md:p-6 border-l-2" style={{ borderLeftColor: brandColor }}>
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5">
                            <Target size={12} aria-hidden="true" />
                            Objective
                        </h4>
                        <p className="text-base text-fg leading-relaxed">{project.objective}</p>
                    </div>
                )}

                {/* Long description. */}
                {project.longDescription && (
                    <p className="text-base md:text-lg text-fg leading-relaxed mb-8">
                        {project.longDescription}
                    </p>
                )}

                {/* Metrics. */}
                {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                        {project.metrics.map((m) => (
                            <div key={m.label} className="glass-card p-3 md:p-4 text-center">
                                <div className="text-xl md:text-3xl font-display font-bold text-gradient-accent">
                                    {m.value}
                                </div>
                                <div className="text-[9px] md:text-xs text-fg-dim uppercase tracking-wider mt-1">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Features / Highlights. */}
                {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-8">
                        <h4 className="text-sm font-mono uppercase tracking-wider text-accent mb-3 flex items-center gap-1.5">
                            <Rocket size={13} aria-hidden="true" />
                            Features
                        </h4>
                        <ul className="space-y-2.5">
                            {project.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-3 text-fg">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                                    <span className="leading-relaxed">{h}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Challenges + Solutions — two-column on desktop. */}
                {(project.challenges?.length || project.solutions?.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {project.challenges && project.challenges.length > 0 && (
                            <div>
                                <h4 className="text-sm font-mono uppercase tracking-wider text-warning mb-3 flex items-center gap-1.5">
                                    <Wrench size={13} aria-hidden="true" />
                                    Challenges
                                </h4>
                                <ul className="space-y-2">
                                    {project.challenges.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2 text-fg-dim text-sm">
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-warning shrink-0" aria-hidden="true" />
                                            <span className="leading-relaxed">{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {project.solutions && project.solutions.length > 0 && (
                            <div>
                                <h4 className="text-sm font-mono uppercase tracking-wider text-success mb-3 flex items-center gap-1.5">
                                    <Lightbulb size={13} aria-hidden="true" />
                                    Solutions
                                </h4>
                                <ul className="space-y-2">
                                    {project.solutions.map((s, i) => (
                                        <li key={i} className="flex items-start gap-2 text-fg-dim text-sm">
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-success shrink-0" aria-hidden="true" />
                                            <span className="leading-relaxed">{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : null}

                {/* Engineering Decisions — exclusive to product/featured projects. */}
                {project.decisions && project.decisions.length > 0 && (
                    <div className="mb-8">
                        <h4 className="text-sm font-mono uppercase tracking-wider text-accent mb-3 flex items-center gap-1.5">
                            <GitBranch size={13} aria-hidden="true" />
                            Engineering Decisions
                        </h4>
                        <div className="space-y-3">
                            {project.decisions.map((d, i) => (
                                <div key={i} className="glass-card !bg-bg-2/30 p-4 md:p-5">
                                    <div className="text-fg-bright font-display font-semibold text-sm md:text-base mb-1.5">
                                        {d.decision}
                                    </div>
                                    <p className="text-fg-dim text-sm leading-relaxed">{d.rationale}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tech Stack. */}
                {project.stack && (
                    <div className="mb-8 space-y-4">
                        <h4 className="text-sm font-mono uppercase tracking-wider text-fg-dim">
                            Tech Stack
                        </h4>
                        {project.stack.frontend && project.stack.frontend.length > 0 && (
                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-faint mr-2">Frontend:</span>
                                <div className="inline-flex flex-wrap gap-2 align-top">
                                    {project.stack.frontend.map((t) => (
                                        <Badge key={t} variant="accent" className="font-mono">{t}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {project.stack.backend && project.stack.backend.length > 0 && (
                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-faint mr-2">Backend:</span>
                                <div className="inline-flex flex-wrap gap-2 align-top">
                                    {project.stack.backend.map((t) => (
                                        <Badge key={t} variant="success" className="font-mono">{t}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {project.stack.tools && project.stack.tools.length > 0 && (
                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-faint mr-2">Tools:</span>
                                <div className="inline-flex flex-wrap gap-2 align-top">
                                    {project.stack.tools.map((t) => (
                                        <Badge key={t} variant="gold" className="font-mono">{t}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tags fallback (when no structured stack). */}
                {(!project.stack || Object.keys(project.stack).length === 0) && project.tags.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                            <Badge key={tag} variant={tagVariants[idx % tagVariants.length]} className="font-mono">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* External Resources. */}
                {project.resources && project.resources.length > 0 && (
                    <div className="mb-8">
                        <h4 className="text-sm font-mono uppercase tracking-wider text-fg-dim mb-3">
                            External Resources
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.resources.map((r) => {
                                const internal = isInternalRoute(r.href);
                                const Body = (
                                    <>
                                        <ExternalLink size={12} aria-hidden="true" />
                                        {r.label}
                                    </>
                                );
                                const cls = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-2/60 border border-bg-3/50 text-fg-dim text-xs font-medium hover:text-accent hover:border-accent/40 transition-colors";
                                return internal ? (
                                    <Link key={r.label} to={r.href} className={cls}>{Body}</Link>
                                ) : (
                                    <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>{Body}</a>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Actions — distinct primary/secondary. */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-bg-3/40">
                    {/* Live Demo — primary if available. */}
                    {project.demo && (
                        isInternalRoute(project.demo) ? (
                            <Link
                                to={project.demo}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-bg-base rounded-full text-sm font-bold hover:bg-fg-bright transition-colors glow-accent"
                            >
                                <Rocket size={16} aria-hidden="true" />
                                Live Demo
                            </Link>
                        ) : (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-bg-base rounded-full text-sm font-bold hover:bg-fg-bright transition-colors glow-accent"
                            >
                                <Rocket size={16} aria-hidden="true" />
                                Live Demo
                            </a>
                        )
                    )}
                    {/* Repository — secondary. */}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-bg-2 text-fg-bright rounded-full text-sm font-bold border border-bg-3 hover:border-accent/40 transition-colors"
                    >
                        <Github size={16} aria-hidden="true" />
                        Repository
                    </a>
                    {/* Documentation — tertiary, internal route. */}
                    {project.docs && isInternalRoute(project.docs) && (
                        <Link
                            to={project.docs}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-accent rounded-full text-sm font-bold border-2 border-accent hover:bg-accent/10 transition-colors"
                        >
                            <BookOpen size={16} aria-hidden="true" />
                            Documentation
                        </Link>
                    )}
                    {/* Case Study — alias for docs if no separate docs. */}
                    {project.caseStudy && !project.docs && (
                        <Link
                            to={project.caseStudy}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-accent rounded-full text-sm font-bold border-2 border-accent hover:bg-accent/10 transition-colors"
                        >
                            <BookOpen size={16} aria-hidden="true" />
                            Case Study
                        </Link>
                    )}
                </div>
            </div>
        </Modal>
    );
}

/* ---------------------------------------------------------------------------
 *  Featured project — large, prominent card. Always visible regardless of filter.
 * ------------------------------------------------------------------------- */
function FeaturedProject({ project, onOpen }: { project: ProjectData; onOpen: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="md:col-span-2 group glass-card glass-card-interactive overflow-hidden cursor-pointer relative"
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen();
                }
            }}
            aria-label={`View details for ${project.title}`}
        >
            {/* Featured ribbon — flush to top-left, no overlap. */}
            <div className="absolute top-5 left-5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/20 border border-gold/50 backdrop-blur-sm shadow-[0_0_15px_rgba(209,168,62,0.3)]">
                <Star size={11} className="text-gold fill-gold" aria-hidden="true" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold">Featured</span>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Image. */}
                <div className="lg:w-3/5 border-b lg:border-b-0 lg:border-r border-bg-3/40 bg-bg-base/50 p-6 flex items-center justify-center relative overflow-hidden pt-20 lg:pt-6">
                    <div className="absolute inset-0 bg-radial-spotlight opacity-50" aria-hidden="true" />
                    <ProjectMedia project={project} className="max-w-2xl relative z-10" />
                </div>

                {/* Content. */}
                <div className="lg:w-2/5 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-fg-bright mb-3 md:mb-4">
                        {project.title}
                    </h3>
                    <p className="text-fg-dim text-sm md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                        {project.tags.map((tag, idx) => (
                            <Badge key={tag} variant={tagVariants[idx % tagVariants.length]} className="font-mono">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <span className="inline-flex items-center gap-2 font-medium text-fg uppercase tracking-wider text-sm group-hover:text-accent transition-colors link-underline">
                            View Details
                            <ArrowRight size={16} aria-hidden="true" className="transform transition-transform group-hover:translate-x-1" />
                        </span>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Open ${project.title} live demo (opens in a new tab)`}
                                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-fg-dim hover:text-accent transition-colors"
                            >
                                <ExternalLink size={14} aria-hidden="true" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ---------------------------------------------------------------------------
 *  Product card — for standalone products (e.g. Pyrope).
 *  Spans 2 columns like Featured, but with a distinct visual identity:
 *  a palette showcase in place of a screenshot, a "Product" ribbon, and
 *  the product's brand color used as the accent. Never confused with the
 *  portfolio itself.
 * ------------------------------------------------------------------------- */
function ProductCard({ project, onOpen }: { project: ProjectData; onOpen: () => void }) {
    const brandColor = project.brandColor ?? "var(--color-accent)";

    // Pyrope-specific palette swatches (matches the design system).
    // For non-Pyrope products these would be derived from project data,
    // but Pyrope is currently the only product so this is fine.
    const palette = [
        { name: "Base", hex: "#171513" },
        { name: "Accent", hex: "#a8c155" },
        { name: "Gold", hex: "#d1a83e" },
        { name: "Garnet", hex: "#b5475c" },
        { name: "Rosewood", hex: "#b04f86" },
        { name: "Lagoon", hex: "#3f93a0" },
        { name: "Verdant", hex: "#4f9c87" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.05 }}
            className="md:col-span-2 group glass-card glass-card-interactive overflow-hidden cursor-pointer relative"
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen();
                }
            }}
            aria-label={`View details for ${project.title}`}
        >
            {/* Product ribbon — distinct from Featured. */}
            <div
                className="absolute top-5 left-5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm"
                style={{
                    backgroundColor: `color-mix(in srgb, ${brandColor} 18%, transparent)`,
                    borderColor: `color-mix(in srgb, ${brandColor} 50%, transparent)`,
                    border: "1px solid",
                    boxShadow: `0 0 15px ${brandColor}40`,
                }}
            >
                <Gem size={11} style={{ color: brandColor }} aria-hidden="true" />
                <span
                    className="text-[10px] font-mono uppercase tracking-wider font-bold"
                    style={{ color: brandColor }}
                >
                    Product
                </span>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Palette showcase — replaces the screenshot. */}
                <div
                    className="lg:w-3/5 border-b lg:border-b-0 lg:border-r border-bg-3/40 p-6 flex flex-col justify-center relative overflow-hidden pt-20 lg:pt-6 min-h-[260px]"
                    style={{
                        background: `linear-gradient(135deg, color-mix(in srgb, ${brandColor} 6%, var(--color-bg-base)) 0%, var(--color-bg-base) 60%)`,
                    }}
                >
                    {/* Dotted texture. */}
                    <div className="absolute inset-0 bg-dotted-grid opacity-50" aria-hidden="true" />

                    {/* Palette grid. */}
                    <div className="relative z-10 grid grid-cols-7 gap-2 max-w-md mx-auto w-full">
                        {palette.map((sw) => (
                            <div key={sw.name} className="flex flex-col items-center gap-1.5">
                                <div
                                    className="w-full aspect-square rounded-lg border border-glass-border group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        backgroundColor: sw.hex,
                                        boxShadow: `0 0 12px ${sw.hex}30`,
                                    }}
                                    aria-hidden="true"
                                />
                                <span className="text-[8px] font-mono uppercase tracking-wider text-fg-faint">
                                    {sw.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Hex label. */}
                    <div className="relative z-10 mt-5 text-center">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                            {palette.length} core tokens · WCAG AA verified
                        </span>
                    </div>
                </div>

                {/* Content. */}
                <div className="lg:w-2/5 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-fg-bright mb-3 md:mb-4">
                        {project.title}
                    </h3>
                    <p className="text-fg-dim text-sm md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                        {project.tags.map((tag, idx) => (
                            <Badge key={tag} variant={tagVariants[idx % tagVariants.length]} className="font-mono">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <span className="inline-flex items-center gap-2 font-medium text-fg uppercase tracking-wider text-sm group-hover:text-accent transition-colors link-underline">
                            View Details
                            <ArrowRight size={16} aria-hidden="true" className="transform transition-transform group-hover:translate-x-1" />
                        </span>
                        {project.demo && (
                            <Link
                                to={project.demo}
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Open ${project.title} showcase`}
                                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-fg-dim hover:text-accent transition-colors"
                            >
                                <ExternalLink size={14} aria-hidden="true" />
                                Open Showcase
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ---------------------------------------------------------------------------
 *  Standard project card — for non-featured, non-product projects.
 * ------------------------------------------------------------------------- */
function ProjectCard({ project, onOpen }: { project: ProjectData; onOpen: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="group glass-card glass-card-interactive overflow-hidden cursor-pointer flex flex-col h-full"
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen();
                }
            }}
            aria-label={`View details for ${project.title}`}
        >
            {/* Top image. */}
            <div className="border-b border-bg-3/40 bg-bg-base/50 p-6 flex items-center justify-center overflow-hidden relative">
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-bg-2/80 border border-bg-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ArrowUpRight size={14} className="text-accent" aria-hidden="true" />
                </div>
                <ProjectMedia project={project} aspectRatio="16/9" className="w-full" />
            </div>

            {/* Content. */}
            <div className="p-6 md:p-7 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-fg-bright truncate">
                        {project.title}
                    </h3>
                    {project.year && (
                        <span className="text-xs font-mono text-fg-faint shrink-0">{project.year}</span>
                    )}
                </div>
                <p className="text-fg-dim text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                        <Badge key={tag} variant={tagVariants[(idx + 2) % tagVariants.length]} className="font-mono">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 font-medium text-fg uppercase tracking-wider text-sm group-hover:text-accent transition-colors link-underline">
                        View Details
                        <ArrowRight size={16} aria-hidden="true" className="transform transition-transform group-hover:translate-x-1" />
                    </span>
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Open ${project.title} live demo (opens in a new tab)`}
                            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-fg-dim hover:text-accent transition-colors shrink-0"
                        >
                            <ExternalLink size={12} aria-hidden="true" />
                            Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ---------------------------------------------------------------------------
 *  Main Projects section.
 * ------------------------------------------------------------------------- */
export function Projects() {
    const [filter, setFilter] = useState<FilterKey>("all");
    const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

    const closeModal = useCallback(() => setActiveProject(null), []);

    const featuredProject = ProjectsContent.find((p) => p.featured) ?? ProjectsContent[0];
    if (!featuredProject) return null;

    // Pyrope is the standalone product.
    const productProject = ProjectsContent.find((p) => p.product);

    // Standard projects = everything except the featured + product entries.
    const standardProjects = ProjectsContent.filter(
        (p) => p !== featuredProject && p !== productProject,
    );

    const visibleStandard = standardProjects.filter((p) => matchesFilter(p, filter));
    const showFeatured = filter === "all" || filter === "featured" || matchesFilter(featuredProject, filter);
    const showProduct =
        productProject &&
        (filter === "all" || filter === "design" || matchesFilter(productProject, filter));

    return (
        <section id="projects" className="px-6 relative">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="02 — PROJECTS"
                    title="Selected Work"
                    description="A curated set of projects — each one explored in depth. Click any card for the full breakdown."
                />

                {/* Filter tabs — scalable, with touch-friendly sizing on mobile. */}
                <Reveal className="mb-8 md:mb-10" delay={0.1}>
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
                        {FILTERS.map((f) => {
                            const isActive = filter === f.key;
                            const count =
                                f.key === "all"
                                    ? ProjectsContent.length
                                    : f.key === "featured"
                                      ? ProjectsContent.filter((p) => p.featured).length
                                      : ProjectsContent.filter((p) => p.category === f.key).length;
                            if (count === 0 && f.key !== "all") return null;
                            return (
                                <button
                                    key={f.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setFilter(f.key)}
                                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${
                                        isActive
                                            ? "bg-accent text-bg-base border-accent glow-accent"
                                            : "bg-bg-2/50 text-fg-dim border-bg-3 hover:text-accent hover:border-accent/40"
                                    }`}
                                >
                                    {f.label}
                                    <span className={`text-[10px] font-mono ${isActive ? "text-bg-base/70" : "text-fg-faint"}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Grid. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {showFeatured && (
                        <FeaturedProject
                            project={featuredProject}
                            onOpen={() => setActiveProject(featuredProject)}
                        />
                    )}
                    {showProduct && productProject && (
                        <ProductCard
                            project={productProject}
                            onOpen={() => setActiveProject(productProject)}
                        />
                    )}
                    {visibleStandard.map((project) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            onOpen={() => setActiveProject(project)}
                        />
                    ))}
                </div>

                {/* Empty state for filters with no matches. */}
                {visibleStandard.length === 0 && !showFeatured && !showProduct && (
                    <div className="glass-card p-12 text-center text-fg-dim">
                        <p className="font-mono text-sm">No projects in this category yet.</p>
                    </div>
                )}

                {/* More on GitHub banner. */}
                <Reveal className="mt-8" delay={0.2}>
                    <a
                        href={PersonalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View more projects on GitHub (opens in a new tab)"
                        className="group relative glass-card glass-card-interactive overflow-hidden flex flex-row items-center justify-between p-6 md:px-8 min-h-[80px]"
                    >
                        {/* Animated shimmer sweep on hover. */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" aria-hidden="true" />

                        <div className="flex items-center gap-4 relative">
                            <div className="w-12 h-12 rounded-full bg-bg-2 border border-bg-3 flex items-center justify-center text-fg-dim group-hover:text-accent group-hover:border-accent/40 transition-colors shrink-0">
                                <Github size={22} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-display font-medium text-fg-bright">
                                    More on GitHub
                                </h3>
                                <p className="text-fg-faint text-xs hidden sm:block mt-0.5">
                                    Explore my repositories for more technical deep dives and side projects.
                                </p>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-2 text-fg-bright text-sm font-medium group-hover:text-accent transition-colors shrink-0 relative">
                            View Profile
                            <ArrowRight size={16} aria-hidden="true" className="transform transition-transform group-hover:translate-x-1" />
                        </span>
                    </a>
                </Reveal>
            </div>

            {/* Detail modal. */}
            {activeProject && (
                <ProjectModal project={activeProject} onClose={closeModal} />
            )}
        </section>
    );
}
