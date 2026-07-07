import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const ports = [
  "VS Code",
  "Neovim",
  "Zed",
  "Kate",
  "KDE Plasma",
  "Kitty",
  "Alacritty",
  "Lichess",
];

export function PyropeHero() {
  const reduceMotion = useReducedMotion();
  const itemV = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : itemVariants;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 overflow-hidden pt-32 pb-24">
      {/* Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 1.05, 0.95, 1],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-accent/[0.08] rounded-full blur-3xl"
        />
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -40, 20, 0],
                  y: [0, 30, -20, 0],
                  scale: [1, 0.95, 1.05, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-gold/[0.06] rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center"
      >
        {/* Pill tag */}
        <motion.div variants={itemV} className="mb-8">
          <span className="inline-block px-4 py-1.5 rounded-md bg-bg-2 border border-bg-3/50 font-mono text-xs tracking-[0.2em] uppercase text-accent">
            // COLORSCHEME PROJECT
          </span>
        </motion.div>

        {/* Giant heading — two lines */}
        <motion.h1
          variants={itemV}
          className="font-display font-bold text-fg-bright leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
        >
          Pyrope
        </motion.h1>
        <motion.h2
          variants={itemV}
          className="font-display font-normal text-fg-dim tracking-normal mt-2"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
        >
          A deutan-aware dark colorscheme.
        </motion.h2>

        {/* Descriptor */}
        <motion.p
          variants={itemV}
          className="text-fg mt-8 max-w-2xl"
          style={{ fontSize: "18px", lineHeight: 1.7 }}
        >
          One palette. Seven design rules. Consistent roles across every tool.
        </motion.p>

        {/* Port chips — wrapped in a glass card */}
        <motion.div
          variants={itemV}
          className="mt-10 glass-card px-5 py-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ports.map((port, idx) => (
              <span
                key={port}
                className="flex items-center gap-2"
              >
                <span className="px-3 py-1.5 font-mono text-[11px] text-fg-dim bg-bg-2 border border-bg-3 rounded-md tracking-wider">
                  {port}
                </span>
                {idx < ports.length - 1 && (
                  <span className="text-fg-faint text-xs hidden sm:inline">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stat tiles */}
        <motion.div
          variants={itemV}
          className="mt-10 grid grid-cols-2 gap-4 w-full max-w-lg"
        >
          {[
            { number: "16", label: "ANSI Colors" },
            { number: "7", label: "Design Rules" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card glass-card-interactive p-6 flex flex-col justify-center min-h-[120px]"
            >
              <div className="text-4xl lg:text-5xl font-display font-bold text-gradient-accent mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-fg-dim font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
