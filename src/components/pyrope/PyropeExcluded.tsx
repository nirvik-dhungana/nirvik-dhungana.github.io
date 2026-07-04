import { motion } from "motion/react";
import { Info } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const excluded = [
  {
    stripeCls: "bg-excluded-amethyst",
    name: "Amethyst / Purple",
    hex: "#7b6fb0",
    reason:
      "Reads as blue once the blue cone overrides the muted red component. Looked 'blue' in practice despite the math suggesting otherwise.",
  },
  {
    stripeCls: "bg-excluded-terracotta",
    name: "Terracotta / Red as primary accent",
    hex: "#c96a3a",
    reason:
      "Disliked aesthetically. Unrelated to vision — just not the right visual fit for the warm-dark-jeweltone direction.",
  },
  {
    stripeCls: "bg-excluded-mint",
    name: "Cool mint / Seafoam",
    hex: "#5bb8a0",
    reason:
      "Same problem as amethyst — the blue component dominates perceptually under a fully-active blue cone.",
  },
  {
    stripeCls: "bg-excluded-green",
    name: "Pure saturated green as meaning-bearing",
    hex: "#22c55e",
    reason:
      "With green cone function at ~0%, anything riding purely on green hue is invisible regardless of how 'safe' it looks in a color checker.",
  },
];

export function PyropeExcluded() {
  return (
    <section id="excluded" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 06 — EXCLUDED
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            What Didn't Make It — and Why
          </h2>
          <p className="text-fg-dim mt-4 max-w-2xl leading-[1.7]">
            Design by exclusion is as important as design by inclusion. These
            colors were considered and rejected for specific, documented
            reasons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {excluded.map((c) => (
            <motion.div
              key={c.hex}
              variants={cardVariants}
              className="bg-bg-1 border border-bg-3/40 rounded-xl overflow-hidden flex transition-colors hover:border-bg-3"
            >
              {/* Left stripe — the rejected color */}
              <div className={`${c.stripeCls} w-1.5 shrink-0`} />
              {/* Content */}
              <div className="p-6 flex-1">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h3 className="font-display font-bold text-fg-bright text-base leading-tight">
                    {c.name}
                  </h3>
                  <span className="font-mono text-xs text-fg-faint shrink-0">
                    {c.hex}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-fg-faint uppercase tracking-[0.15em] mb-2">
                  Why it's out
                </div>
                <p className="text-fg-dim" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {c.reason}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          variants={cardVariants}
          className="mt-6 bg-bg-2 border-l-2 border-gold rounded-r-md px-5 py-4 flex gap-3 items-start"
        >
          <Info size={16} className="text-gold shrink-0 mt-0.5" />
          <p className="text-fg-dim text-sm leading-relaxed">
            The blue-channel test: any color with a blue RGB component above
            ~20% of total is a candidate for perceptual collapse to blue. This
            is the actual filter applied when evaluating new palette additions.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
