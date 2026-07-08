import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { zIndex } from "../../lib/zIndex";

/* ===========================================================================
 *  MODAL — the unified overlay primitive for the entire portfolio.
 *
 *  One architecture for every popup, dialog, slide-over, and overlay:
 *    - Project details modal
 *    - Keyboard shortcuts help
 *    - Mobile navigation sheet
 *    - Future overlay components
 *
 *  Guarantees:
 *    1. Highest layer: renders at `zIndex.modal` (above the navbar, scroll
 *       progress, and ambient hints). The layering is centralized in
 *       `src/lib/zIndex.ts` so the entire stacking system is readable in
 *       one place.
 *    2. PORTAL RENDERING — the overlay is rendered into `document.body`
 *       via `createPortal`. This is the critical architectural decision
 *       that prevents the bug where a modal was visually trapped beneath
 *       the navbar because an ancestor `<section>` had `relative z-10`,
 *       which created a stacking context that swallowed the modal's
 *       z-index. By portaling to `document.body`, the modal's z-index is
 *       interpreted at the document root, where it always wins.
 *    3. Background scroll locked while open (body overflow hidden).
 *    4. Escape key closes the modal.
 *    5. Click on the backdrop closes the modal (unless `closeOnBackdropClick`
 *       is false — useful for non-dismissable dialogs).
 *    6. Focus trap: focus moves into the modal on open, restores to the
 *       previously-focused element on close. Tab/Shift+Tab cycles within.
 *    7. Accessible: role="dialog", aria-modal="true", aria-labelledby.
 *    8. Reduced-motion: animation disabled, content appears instantly.
 *    9. Consistent transitions: backdrop fades, panel slides up (mobile) /
 *       scales in (desktop). Spring physics for a premium feel.
 *
 *  Variants:
 *    - "sheet"  (default) — slides up from the bottom on mobile, scales in
 *                on desktop. Used for content-rich modals (project details,
 *                mobile navigation).
 *    - "center" — scales in from the center on all breakpoints. Used for
 *                focused dialogs (keyboard shortcuts help).
 * ========================================================================= */

export type ModalVariant = "sheet" | "center";

interface ModalProps {
    /** When true, the modal is rendered. */
    isOpen: boolean;
    /** Called when the modal requests to close (Escape, backdrop click, close button). */
    onClose: () => void;
    /** Accessible label for the dialog. Used as aria-label. */
    ariaLabel: string;
    /** Optional id of the element that labels the dialog (aria-labelledby). */
    ariaLabelledBy?: string;
    /** Visual variant. Default: "sheet". */
    variant?: ModalVariant;
    /** Whether clicking the backdrop closes the modal. Default: true. */
    closeOnBackdropClick?: boolean;
    /** Whether to show the built-in close button. Default: true. */
    showCloseButton?: boolean;
    /** Accessible label for the close button. Default: "Close dialog". */
    closeButtonLabel?: string;
    /** Max width class for the panel (Tailwind). Default: "max-w-4xl". */
    maxWidthClass?: string;
    /** Panel content. */
    children: ReactNode;
    /** Extra classes on the panel. */
    className?: string;
}

export function Modal({
    isOpen,
    onClose,
    ariaLabel,
    ariaLabelledBy,
    variant = "sheet",
    closeOnBackdropClick = true,
    showCloseButton = true,
    closeButtonLabel = "Close dialog",
    maxWidthClass = "max-w-4xl",
    children,
    className = "",
}: ModalProps) {
    const reduceMotion = useReducedMotion();
    const panelRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    /* ----- Body scroll lock + Escape key + focus management ----- */
    useEffect(() => {
        if (!isOpen) return;

        // Capture the element that had focus before the modal opened.
        previouslyFocused.current = document.activeElement as HTMLElement;

        // Lock background scroll.
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Move focus into the modal.
        const focusTimer = window.setTimeout(() => {
            closeBtnRef.current?.focus();
        }, 50);

        // Escape to close.
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                onClose();
                return;
            }
            // Focus trap — Tab / Shift+Tab cycles within the modal.
            if (e.key === "Tab" && panelRef.current) {
                const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!first || !last) return;
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener("keydown", handleKey);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKey);
            window.clearTimeout(focusTimer);
            // Restore focus to the element that opened the modal.
            previouslyFocused.current?.focus?.();
        };
    }, [isOpen, onClose]);

    /* ----- Animation configs per variant ----- */
    const panelInitial =
        variant === "sheet"
            ? reduceMotion
                ? { opacity: 0 }
                : { y: "100%", opacity: 0, scale: 0.98 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.95, y: 20 };
    const panelAnimate = { y: 0, opacity: 1, scale: 1 };
    const panelExit =
        variant === "sheet"
            ? reduceMotion
                ? { opacity: 0 }
                : { y: "100%", opacity: 0, scale: 0.98 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.95, y: 20 };
    const panelTransition =
        variant === "sheet"
            ? { type: "spring" as const, stiffness: 280, damping: 28 }
            : { duration: 0.2 };

    /* ----- Shared panel classes ----- */
    const panelBase =
        variant === "sheet"
            ? "relative glass-card !bg-bg-1/95 w-full overflow-y-auto rounded-t-3xl md:rounded-3xl hide-scrollbar max-h-[92vh] md:max-h-[85vh]"
            : "relative bg-bg-1 border border-bg-3/60 rounded-2xl w-full shadow-2xl";

    const containerClass =
        variant === "sheet"
            ? "fixed inset-0 flex items-end md:items-center justify-center p-0 md:p-6"
            : "fixed inset-0 bg-bg-base/80 backdrop-blur-sm flex items-center justify-center p-6";

    const containerStyle = { zIndex: zIndex.modal } as const;

    // The portal target is `document.body`. Rendering here means the modal's
    // `z-index` is interpreted at the document root, so it can NEVER be
    // trapped inside an ancestor's stacking context. This is the
    // architectural fix for the navbar/modal overlap bug.
    //
    // During SSR/prerender `document` is undefined, so we render nothing —
    // the modal is open-state-driven and never part of the SSR HTML anyway.
    //
    // STRUCTURE NOTE: The Portal is rendered on the OUTSIDE and
    // `AnimatePresence` on the INSIDE. The reverse (Portal inside
    // AnimatePresence) does NOT work — AnimatePresence can only track the
    // mount/unmount of motion components it can clone props onto, and a
    // Portal element is opaque to it. With this structure the portal target
    // stays stable across renders and AnimatePresence cleanly animates the
    // inner motion.div in and out.
    const portalTarget =
        typeof document !== "undefined" ? document.body : null;

    if (!portalTarget) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={containerClass}
                    style={containerStyle}
                    role="dialog"
                    aria-modal="true"
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    onClick={closeOnBackdropClick ? onClose : undefined}
                >
                    {/* Backdrop — only for the "sheet" variant (the "center"
                        variant uses the container's own bg). */}
                    {variant === "sheet" && (
                        <div
                            className="absolute inset-0 bg-bg-base/80 backdrop-blur-md"
                            aria-hidden="true"
                        />
                    )}

                    <motion.div
                        ref={panelRef}
                        initial={panelInitial}
                        animate={panelAnimate}
                        exit={panelExit}
                        transition={panelTransition}
                        onClick={(e) => e.stopPropagation()}
                        className={`${panelBase} ${maxWidthClass} ${className}`}
                    >
                        {/* Built-in close button — sticky for the "sheet"
                            variant (stays visible while scrolling), absolute
                            for the "center" variant. */}
                        {showCloseButton && (
                            <button
                                ref={closeBtnRef}
                                type="button"
                                onClick={onClose}
                                aria-label={closeButtonLabel}
                                className={
                                    variant === "sheet"
                                        ? "sticky top-4 right-4 ml-auto block w-10 h-10 rounded-full bg-bg-2 border border-bg-3 flex items-center justify-center text-fg-dim hover:text-accent hover:border-accent/40 transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
                                        : "absolute top-4 right-4 w-9 h-9 rounded-full bg-bg-2 border border-bg-3 flex items-center justify-center text-fg-dim hover:text-accent hover:border-accent/40 transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
                                }
                            >
                                <X size={variant === "sheet" ? 18 : 16} aria-hidden="true" />
                            </button>
                        )}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        portalTarget,
    );
}

export default Modal;
