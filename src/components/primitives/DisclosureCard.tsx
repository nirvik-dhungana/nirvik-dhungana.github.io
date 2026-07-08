import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

/* ===========================================================================
 *  DISCLOSURE CARD — the unified expand/collapse primitive.
 *
 *  Used by Experience, Education, Learning Path, and any future
 *  progressive-disclosure surface. Replaces 3+ ad-hoc accordion
 *  implementations with one consistent, accessible pattern.
 *
 *  Guarantees:
 *    1. Collapsed state releases ALL vertical space below the header —
 *       no reserved whitespace, no row-stretch artifacts.
 *    2. Smooth height: 0 → auto animation via AnimatePresence + motion.div.
 *    3. Accessible: the header is a <button> with aria-expanded + aria-controls.
 *    4. Reduced-motion: animation disabled, content appears instantly.
 *    5. Consistent visual treatment: glass-card surface, chevron indicator
 *       that rotates + tints accent when expanded.
 *
 *  Two usage modes for the header:
 *    a) Static header (ReactNode) — DisclosureCard renders the header inside
 *       a <button> and appends its own DisclosureChevron.
 *    b) Render-prop header ((expanded) => ReactNode) — the consumer controls
 *       the full header layout including the chevron. Useful when the header
 *       needs the live `expanded` state (e.g. to tint the chevron).
 *
 *  Two state modes:
 *    a) Uncontrolled (default) — pass `defaultExpanded` for the initial state.
 *    b) Controlled — pass `expanded` + `onToggle` to manage state externally
 *       (useful when one card's expansion should collapse others).
 * ========================================================================= */

export type DisclosureHeaderRenderer = (expanded: boolean) => ReactNode;

interface DisclosureCardProps {
    /** Content shown in the always-visible header. Either a static node or a
     *  render function that receives the live `expanded` state. */
    header: ReactNode | DisclosureHeaderRenderer;
    /** Content shown when expanded. */
    children: ReactNode;
    /** Initial expanded state (uncontrolled mode). Default: false. */
    defaultExpanded?: boolean;
    /** Controlled expanded state. If provided, the card is controlled. */
    expanded?: boolean;
    /** Called when the toggle is requested (controlled mode). */
    onToggle?: () => void;
    /** Accessible label for the toggle button. */
    toggleLabel?: string;
    /** Extra classes on the outer card. */
    className?: string;
    /** Extra classes on the header <button>. Useful when the header uses a
     *  grid layout that the body should also participate in (e.g. a 12-col
     *  grid where the header places content in cols 1-4 and 5-12, and the
     *  body should align with cols 5-12). */
    headerClassName?: string;
    /** Extra classes on the expandable body wrapper. Useful when the body
     *  needs to align to a specific grid column (e.g. when the header uses
     *  a 12-col grid and the body should align with one of those columns
     *  rather than spanning full width). */
    bodyClassName?: string;
    /** Whether to auto-append a DisclosureChevron (only when `header` is a
     *  static ReactNode, not a render function). Default: true. */
    showChevron?: boolean;
    /** Unique id suffix for aria-controls linking. Required. */
    idSuffix: string;
}

export function DisclosureCard({
    header,
    children,
    defaultExpanded = false,
    expanded: controlledExpanded,
    onToggle,
    toggleLabel = "Toggle details",
    className = "",
    headerClassName = "",
    bodyClassName = "",
    showChevron = true,
    idSuffix,
}: DisclosureCardProps) {
    const isControlled = controlledExpanded !== undefined;
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const expanded = isControlled ? controlledExpanded : internalExpanded;
    const reduceMotion = useReducedMotion();

    const handleToggle = () => {
        if (isControlled) {
            onToggle?.();
        } else {
            setInternalExpanded((v) => !v);
        }
    };

    const isRenderProp = typeof header === "function";
    const headerContent = isRenderProp
        ? (header as DisclosureHeaderRenderer)(expanded)
        : (
            <>
                {header}
                {showChevron && <DisclosureChevron expanded={expanded} />}
            </>
        );

    return (
        <div className={`glass-card glass-card-interactive relative overflow-hidden ${className}`}>
            {/* Header — clickable to toggle. */}
            <button
                type="button"
                onClick={handleToggle}
                aria-expanded={expanded}
                aria-controls={`disclosure-panel-${idSuffix}`}
                aria-label={toggleLabel}
                className={`relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-[inherit] ${headerClassName}`}
            >
                {headerContent}
            </button>

            {/* Expandable content — AnimatePresence for proper mount/unmount
                so the collapsed state genuinely releases vertical space.

                Animation layers (all respect reduced-motion):
                  - height: 0 → auto     (the primary mechanism)
                  - opacity: 0 → 1       (fade in to soften the height pop)
                  - y: 8 → 0             (subtle slide-up for premium feel)

                The translateY is capped at 8px so it reads as a gentle
                settle rather than a slide-in. Anything larger would feel
                like a separate panel entering, which is exactly the
                "disconnected" sensation we want to avoid. */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        id={`disclosure-panel-${idSuffix}`}
                        key="disclosure-content"
                        initial={reduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0, y: 8 }}
                        animate={reduceMotion ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1, y: 0 }}
                        exit={reduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0, y: 8 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.32,
                            ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className={`overflow-hidden ${bodyClassName}`}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ---------------------------------------------------------------------------
 *  DisclosureChevron — the rotating chevron indicator used in disclosure
 *  headers. Extracted so every disclosure header gets the exact same
 *  indicator treatment (color, size, rotation, transition).
 * ------------------------------------------------------------------------- */
export function DisclosureChevron({
    expanded,
    className = "",
}: {
    expanded: boolean;
    className?: string;
}) {
    return (
        <div
            className={`shrink-0 self-start mt-1 ${className}`}
            aria-hidden="true"
        >
            <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    expanded
                        ? "bg-accent/15 border-accent/40 text-accent"
                        : "bg-bg-2/60 border-bg-3/50 text-fg-dim"
                }`}
            >
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}

export default DisclosureCard;
