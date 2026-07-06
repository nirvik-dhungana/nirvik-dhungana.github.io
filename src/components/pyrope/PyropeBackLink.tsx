import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PersonalInfo } from "../../data/content";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PyropeBackLink() {
  return (
    <section className="px-6 relative z-10 pb-8">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-bg-1 border border-bg-3/40 rounded-xl px-6 md:px-8 py-6 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Attribution */}
            <div>
              <div className="font-mono text-xs text-fg-dim tracking-[0.2em] uppercase">
                // PYROPE — COLORSCHEME
              </div>
              <div className="text-fg-faint mt-1.5 text-sm">
                Designed by {PersonalInfo.name} · 2026
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                state={{ scrollTo: "#projects" }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border border-bg-3 text-fg-bright hover:text-accent hover:border-accent transition-colors duration-300 rounded-lg text-sm font-semibold whitespace-nowrap"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Projects
              </Link>
              <a
                href={PersonalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent hover:bg-fg-bright text-bg-base transition-colors duration-300 rounded-lg text-sm font-semibold whitespace-nowrap"
              >
                View on GitHub
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
