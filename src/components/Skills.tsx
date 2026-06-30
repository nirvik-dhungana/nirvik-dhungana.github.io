import { motion } from "motion/react";
import { Layout, Server, Wrench, BarChart } from "lucide-react";
import { SkillsContent } from "../data/content";

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
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const iconMap = {
  frontend: Layout,
  backend: Server,
  tools: Wrench,
  marketing: BarChart,
};

const titleMap = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & Others",
  marketing: "Digital Marketing & Content",
};

export function Skills() {
  return (
    <section id="skills" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 03 — SKILLS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Tools & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(
            Object.keys(SkillsContent) as Array<keyof typeof SkillsContent>
          ).map((categoryKey) => {
            const Icon = iconMap[categoryKey];
            const skills = SkillsContent[categoryKey];

            return (
              <motion.div
                key={categoryKey}
                variants={cardVariants}
                className="bg-bg-1 border border-bg-3/40 rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:border-accent/20"
              >
                <div className="w-10 h-10 rounded-lg bg-bg-2 flex items-center justify-center mb-5 text-accent border border-bg-3/50">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-display font-semibold text-fg-bright mb-6">
                  {titleMap[categoryKey]}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 font-mono text-xs text-fg bg-bg-2 border border-bg-3 rounded-md transition-colors hover:border-accent hover:text-accent cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
