import { motion } from "motion/react";
import { AboutContent } from "../data/content";

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

const pillColors = [
  "text-gold border-gold/30 bg-gold/5",
  "text-lagoon border-lagoon/30 bg-lagoon/5",
  "text-verdant border-verdant/30 bg-verdant/5",
];

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
                {
                  AboutContent.bio[0].split(
                    "accessible, responsive, and performant",
                  )[0]
                }
                <span className="text-accent font-medium">
                  accessible, responsive, and performant
                </span>
                {
                  AboutContent.bio[0].split(
                    "accessible, responsive, and performant",
                  )[1]
                }
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-3"
            >
              {AboutContent.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${pillColors[idx % pillColors.length]}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:w-2/5 w-full flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {AboutContent.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-bg-1 border border-bg-3/40 rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(168,193,85,0.05)] flex flex-col justify-center min-h-[120px]"
                >
                  <div
                    className={`${stat.number.length > 5 ? "text-base sm:text-xl lg:text-2xl mt-1 leading-tight mb-2" : "text-3xl lg:text-4xl mb-2"} font-display font-bold text-accent break-words`}
                  >
                    {stat.number === "Kathmandu, Nepal" ? (
                      <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                          KTM
                        </span>
                        <span className="text-xs text-accent/80 font-mono mt-1 font-medium tracking-wider">
                          KATHMANDU, NEPAL
                        </span>
                      </div>
                    ) : (
                      stat.number
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-fg-dim font-medium">
                    {stat.number === "Kathmandu, Nepal"
                      ? "Based in"
                      : stat.label}
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
