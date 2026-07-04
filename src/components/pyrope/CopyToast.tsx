import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

/**
 * Global copy-feedback toast. Listens for `pyrope-copy` custom events
 * dispatched by copyColor(). Renders a single toast at the bottom of the
 * screen showing the copied hex + a color swatch, auto-dismisses after 2s.
 *
 * Styled entirely with Pyrope tokens (bg-1, bg-3, fg-bright, accent, etc.)
 * — the only inline style is the swatch background, which displays the
 * actual copied hex value (user data, not a design token).
 */
export function CopyToast() {
  const [copied, setCopied] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handler = (e: Event) => {
      const hex = (e as CustomEvent<{ hex: string }>).detail.hex;
      setCopied(hex);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setCopied(null), 2000);
    };

    window.addEventListener("pyrope-copy", handler as EventListener);
    return () => {
      window.removeEventListener("pyrope-copy", handler as EventListener);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {copied && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="bg-bg-1 border border-bg-3/60 rounded-lg shadow-2xl px-5 py-3.5 flex items-center gap-3">
            {/* Swatch showing the actual copied color */}
            <div
              className="w-5 h-5 rounded-md border border-bg-3/60 shrink-0"
              style={{ backgroundColor: copied }}
            />
            {/* Hex value */}
            <span className="font-mono text-sm text-fg-bright">{copied}</span>
            {/* Divider */}
            <div className="w-px h-4 bg-bg-3" />
            {/* Label */}
            <span className="text-fg-dim text-xs uppercase tracking-wider">
              copied
            </span>
            {/* Check icon */}
            <Check size={14} className="text-accent" strokeWidth={2.5} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
