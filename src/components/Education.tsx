import { motion } from "motion/react";
import { EducationContent } from "../data/content";
import { GraduationCap } from "lucide-react";
import { Badge } from "./Badge";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.15 },
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

export function Education() {
  return (
    <section id="education" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 05 — EDUCATION
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Academic Background
          </h2>
        </div>

        <div className="space-y-6">
          {EducationContent.map((edu, idx) => (
            <motion.div
              key={`${edu.school}-${idx}`}
              variants={cardVariants}
              className="bg-bg-1 border border-bg-3/40 rounded-2xl p-6 md:p-8 transition-transform hover:-translate-y-1 hover:border-accent/30"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-fg-bright flex items-center gap-3">
                    <GraduationCap className="text-fg-dim" size={24} aria-hidden="true" />
                    {edu.school}
                  </h3>
                  <div className="text-accent mt-1">{edu.level}</div>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <Badge variant="muted" className="font-mono">
                    {edu.period}
                  </Badge>
                  {edu.gpa && (
                    <Badge variant="gold" className="font-mono font-bold">
                      {edu.gpa}
                    </Badge>
                  )}
                </div>
              </div>

              <ul className="space-y-2 mt-4 ml-1 md:ml-9">
                {edu.activities.map((act, i) => (
                  <li key={i} className="flex items-start text-fg-dim">
                    <span className="mr-3 text-bg-3 mt-1.5 opacity-80 text-[10px]" aria-hidden="true">
                      ■
                    </span>
                    <span className="leading-relaxed">{act}</span>
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
