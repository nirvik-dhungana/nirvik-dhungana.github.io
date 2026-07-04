import { motion } from "motion/react";
import { ExperienceContent } from "../data/content";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function Experience() {
  return (
    <section id="experience" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 04 — EXPERIENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Where I&apos;ve Worked
          </h2>
        </div>

        <div className="relative border-l-2 border-bg-3/50 md:ml-4">
          {ExperienceContent.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${idx}`}
              variants={itemVariants}
              className="mb-12 ml-8 relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-bg-base border-2 border-success z-10 transition-transform group-hover:scale-125 group-hover:bg-success" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-display font-bold text-fg-bright">
                    {exp.role}{" "}
                    <span className="text-accent font-medium">
                      @ {exp.company}
                    </span>
                  </h3>
                </div>
                <div className="font-mono text-sm text-fg-dim">
                  {exp.period}
                </div>
              </div>

              <ul className="space-y-3">
                {exp.responsibilities.map((req, i) => (
                  <li key={i} className="flex items-start text-fg">
                    <span className="mr-3 text-fg-dim mt-1.5 opacity-50 text-[10px]">
                      ▶
                    </span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
