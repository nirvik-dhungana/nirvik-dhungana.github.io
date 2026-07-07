import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * SectionHeading — the unified section header (eyebrow + title + optional
 * description).
 *
 * Every section uses this for consistent rhythm and typography. The eyebrow
 * is a numbered marker (`// 01 — ABOUT`) in mono accent. The title is a
 * large display-font heading. An optional description sits below in muted
 * text.
 *
 * Layout:
 *   [// 0X — LABEL]
 *   [Title]
 *   [Optional description]
 *
 * Replaces the per-section "header block" boilerplate.
 */

interface SectionHeadingProps {
    /** Eyebrow marker, e.g. "01 — ABOUT". */
    eyebrow: string;
    /** Main section title. */
    title: string;
    /** Optional supporting paragraph below the title. */
    description?: string;
    /** Optional right-aligned content (e.g. nav arrows for testimonials). */
    actions?: ReactNode;
    /** Center the heading. Default: left. */
    align?: "left" | "center";
    className?: string;
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    actions,
    align = "left",
    className = "",
}: SectionHeadingProps) {
    const isCenter = align === "center";

    return (
        <Reveal
            className={`mb-12 md:mb-16 flex flex-col md:flex-row md:items-end ${
                isCenter ? "items-center text-center md:text-center" : "md:justify-between"
            } gap-6 md:gap-0 ${className}`}
        >
            <div className={isCenter ? "max-w-3xl mx-auto" : "max-w-2xl"}>
                <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
                    // {eyebrow}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-fg-bright mt-3 tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="text-base md:text-lg text-fg-dim mt-4 leading-[1.7] max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
        </Reveal>
    );
}

export default SectionHeading;
