/**
 * Centralized z-index scale for the entire portfolio.
 *
 * WHY THIS EXISTS
 * ---------------
 * Before this file existed, z-indices were scattered across components as
 * ad-hoc Tailwind classes (`z-40`, `z-[55]`, `z-[65]`, `z-[80]`, `z-[100]`).
 * That made the stacking order impossible to reason about globally and led
 * to subtle bugs where a modal (z-[100]) was visually trapped beneath the
 * navbar (z-40) because an ancestor `<section>` had `relative z-10`, which
 * created a stacking context that swallowed the modal's z-index.
 *
 * The fix has two parts:
 *   1. Render modals through a React Portal to `document.body` so they
 *      escape any ancestor stacking context (see `Modal.tsx`).
 *   2. Centralize the z-index scale here so the entire layering system
 *      is readable in one place, ordered from back to front.
 *
 * The scale is intentionally sparse — only the layers that actually need
 * to participate in z-index battles get a number. Every other element
 * stays at the default `auto` and never creates a stacking context.
 *
 * USAGE IN TAILWIND
 * -----------------
 * Use the literal value in arbitrary notation:
 *   className={`fixed ... z-[${zIndex.navbar}]`}
 * or import the constant and pass it inline. Both forms resolve to the
 * same CSS at build time.
 */

export const zIndex = {
    /**
     * Base layer for normal-flow content. Sections, cards, text.
     * Do NOT set this on positioned elements — leave their z-index as `auto`
     * so they don't accidentally create stacking contexts.
     */
    base: 0,

    /**
     * Decorative fixed overlays that should sit above content but never
     * capture pointer events (e.g. the animated grain texture).
     */
    decoration: 30,

    /**
     * The primary navigation bar. Sits above section content but below
     * every overlay (modals, dropdowns, command palettes).
     */
    navbar: 40,

    /**
     * The reading-progress bar at the very top of the viewport.
     * Above the navbar (so it draws on top of the navbar's top edge) but
     * below any interactive overlay.
     */
    scrollProgress: 45,

    /**
     * Ambient UI hints (vim-keys onboarding toast, prefix indicator).
     * Above the navbar but below modal overlays — they should never
     * block a dialog that the user just opened.
     */
    hint: 60,

    /**
     * Modal / dialog / sheet overlay layer.
     *
     * Modals are rendered through a React Portal to `document.body`, so
     * this z-index is interpreted at the document root — it always wins
     * over the navbar and section content regardless of where the modal
     * was invoked from.
     */
    modal: 100,
} as const;

export type ZIndexLayer = keyof typeof zIndex;
