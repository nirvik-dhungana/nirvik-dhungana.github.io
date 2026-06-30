import { motion } from "motion/react";
import { LearningPathContent } from "../data/content";
import { ArrowRight, ArrowDown } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function LearningPath() {
  const stage1 = LearningPathContent[0];
  const stage2 = LearningPathContent[1];

  return (
    <section id="growth" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 06 — GROWTH
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Learning Path
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-8 lg:gap-12 relative p-4">
          {/* Stage 1: Past */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-5/12 flex-shrink-0 z-10"
          >
            <div className="bg-bg-1 border border-bg-3 rounded-2xl p-6 opacity-80 transition-opacity hover:opacity-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-mono text-fg-faint uppercase">
                  {stage1.status}
                </span>
                <div className="w-3 h-3 rounded-full bg-bg-3" />
              </div>
              <h3 className="text-xl font-display font-semibold text-fg-dim mb-4">
                {stage1.stage}
              </h3>
              <ul className="space-y-3">
                {stage1.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start text-fg-faint text-sm"
                  >
                    <span className="mr-2 mt-1">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Connector */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 z-0 flex items-center justify-center py-4 md:py-0 md:px-4 flex-col md:flex-row gap-2"
          >
            <div className="hidden md:block w-8 xl:w-16 border-t-2 border-dashed border-accent/50" />
            <div className="block md:hidden h-8 border-l-2 border-dashed border-accent/50" />
            <div className="text-accent/50">
              <ArrowRight size={24} className="hidden md:block" />
              <ArrowDown size={24} className="block md:hidden" />
            </div>
          </motion.div>

          {/* Stage 2: Present */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-6/12 flex-shrink-0 z-10 p-2 md:p-4"
          >
            <div className="bg-bg-2 border-2 border-accent/50 shadow-[0_0_30px_rgba(168,193,85,0.15)] rounded-2xl p-7 md:p-8 transform transition-all duration-300 hover:scale-[1.03] md:hover:scale-105 hover:shadow-[0_0_40px_rgba(168,193,85,0.25)]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-mono text-accent uppercase font-bold tracking-wider">
                  {stage2.status}
                </span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-fg-bright mb-5">
                {stage2.stage}
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {stage2.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start text-fg text-sm md:text-base"
                  >
                    <span className="mr-3 text-accent mt-0.5 animate-pulse">
                      ●
                    </span>
                    <span className="leading-relaxed font-medium md:font-normal">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
