import { motion } from "motion/react";
import { AboutContent } from "../data/content";
import { Badge, type BadgeVariant } from "./Badge";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tagVariants: BadgeVariant[] = ["gold", "lagoon", "verdant"];

export function About() {
  return (
    <section id="about" className="px-6 relative">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Column (60%) */}
          <div className="lg:w-3/5">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
                // 01 — ABOUT
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
                {AboutContent.heading}
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-lg text-fg leading-[1.7]"
            >
              <p>
                {(() => {
                  const bio = AboutContent.bio[0];
                  if (!bio) return null;
                  const [before, after] = bio.split(
                    "accessible, responsive, and performant",
                  );
                  return (
                    <>
                      {before}
                      <span className="text-accent font-medium">
                        accessible, responsive, and performant
                      </span>
                      {after}
                    </>
                  );
                })()}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-3"
            >
              {AboutContent.tags.map((tag, idx) => (
                <Badge key={tag} variant={tagVariants[idx % tagVariants.length]}>
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:w-2/5 w-full flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {AboutContent.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-bg-1 border border-bg-3/40 rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(168,193,85,0.05)] flex flex-col justify-center min-h-[120px]"
                >
                  <div className="text-3xl lg:text-4xl mb-2 font-display font-bold text-accent break-words">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-fg-dim font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
