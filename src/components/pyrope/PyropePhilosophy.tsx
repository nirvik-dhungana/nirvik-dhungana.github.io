import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Eye, Layers, Sun } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const principles = [
  {
    icon: Eye,
    glyph: "1",
    title: "The green problem",
    body: "Cool greens, mints, and seafoams carry a blue component that, under a fully-active blue cone, reads as blue instead of green. Amethyst and purple do the same thing. Pyrope's accent is a warm, yellow-leaning pear green — high red channel, low blue channel — so it actually reads as green-gold, not blue.",
  },
  {
    icon: Layers,
    glyph: "2",
    title: "One palette, every tool",
    body: "Sapphire is always 'success.' Amber is always 'warning.' Garnet is always 'error' — whether it's a terminal, a text editor, a browser game, or a desktop environment. Cognitive load drops when the color-role mapping never changes between tools.",
  },
  {
    icon: Sun,
    glyph: "3",
    title: "Brightness as a backup signal",
    body: "Every status and accent color in the palette differs in lightness as well as hue, so that if two colors ever blur together perceptually, one is still clearly brighter than the other. Hue alone is never the only signal.",
  },
];

const rules = [
  {
    title: "Never pair pure red and pure green for meaning.",
    body: "Route status pairs through brightness AND a non-red-green hue axis.",
  },
  {
    title: "Blue (sapphire) stays rare.",
    body: "Reserve it for one specific meaning (success) so it never gets visually crowded out.",
  },
  {
    title: "Stagger lightness, not just hue.",
    body: "Every status color differs in brightness as a backup cue.",
  },
  {
    title: "Keep warm accents actually warm.",
    body: "Blue-channel value under ~20% of total RGB is the real test, not the abstract color name.",
  },
  {
    title: "Background warmth stays subtle.",
    body: "Darkness does the contrast work — never push saturation up to compensate.",
  },
  {
    title: "Night Color / Redshift: cap around 4800–5000K.",
    body: "Not the typical 3000–3500K — full warm shift suppresses blue further. Disable entirely during color-dependent work.",
  },
  {
    title: "Same hex, same role, every tool.",
    body: "Consistency across the entire desktop environment is the whole point.",
  },
];

export function PyropePhilosophy() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="philosophy" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 02 — PHILOSOPHY
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Designed for Deutan Vision
          </h2>
          <p className="text-fg-dim mt-4 max-w-3xl leading-[1.7]">
            Deuteranopia means the green photoreceptors are absent or
            non-functional. The blue channel runs at full strength. The red
            channel at ~75%. The green channel near zero. Most dark colorschemes
            ignore this entirely — Pyrope was built around it.
          </p>
        </motion.div>

        {/* Three principle cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={reduceMotion ? undefined : cardVariants}
                initial={reduceMotion ? undefined : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-bg-1 border border-bg-3/40 rounded-xl p-6 transition-colors hover:border-accent/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-bg-2 border border-bg-3/50 flex items-center justify-center text-accent">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="text-2xl text-accent/30 font-display font-bold">
                    {p.glyph}
                  </span>
                </div>
                <h3 className="font-display font-bold text-fg-bright text-lg mb-3">
                  {p.title}
                </h3>
                <p
                  className="text-fg-dim leading-[1.7]"
                  style={{ fontSize: "14px" }}
                >
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 7 rules — full-width structured card */}
        <motion.div
          variants={reduceMotion ? undefined : cardVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-bg-1 border border-bg-3/40 rounded-xl overflow-hidden"
        >
          {/* Card header */}
          <div className="px-6 md:px-8 py-5 border-b border-bg-3/40 bg-bg-2/50 flex items-center gap-3">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase font-medium">
              The 7 Design Rules
            </span>
          </div>

          {/* Rules list */}
          <div className="divide-y divide-bg-3/30">
            {rules.map((rule, idx) => (
              <motion.div
                key={idx}
                variants={reduceMotion ? undefined : itemVariants}
                initial={reduceMotion ? undefined : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-50px" }}
                className="px-6 md:px-8 py-5 flex gap-5 items-start"
              >
                <span
                  className="font-display font-bold text-accent shrink-0 text-right"
                  style={{
                    fontSize: "1.75rem",
                    lineHeight: 1.1,
                    minWidth: "2rem",
                  }}
                >
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <div
                    className="font-bold text-fg-bright mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    {rule.title}
                  </div>
                  <div
                    className="text-fg-dim"
                    style={{ fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {rule.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
