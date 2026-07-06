import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Gitlab,
  Code2,
  Terminal,
} from "lucide-react";
import { CTAContent, PersonalInfo } from "../data/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function CTA() {
  return (
    <section
      id="contact"
      className="relative w-full bg-bg-1 pt-[96px] lg:pt-[140px] pb-12 px-6 overflow-hidden border-t border-bg-3/40"
    >
      {/* Ambient Blob */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 08 — CONTACT
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-display font-bold text-fg-bright mb-6 tracking-tight"
        >
          {CTAContent.heading}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-fg-dim mb-12 max-w-2xl"
        >
          {CTAContent.subtext}
        </motion.p>

        <motion.div variants={itemVariants} className="mb-24">
          <a
            href={`mailto:${CTAContent.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-bg-base rounded-full font-bold text-lg transition-all duration-300 hover:bg-fg-bright hover:shadow-[0_0_30px_rgba(168,193,85,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
          >
            Start a Conversation
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
              strokeWidth={2.5}
            />
          </a>
        </motion.div>

        {/* Footer info */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col items-center gap-6 pt-12 border-t border-bg-3/40"
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              {
                icon: Github,
                href: PersonalInfo.github,
                label: "GitHub Profile",
              },
              {
                icon: Linkedin,
                href: PersonalInfo.linkedin,
                label: "LinkedIn Profile",
              },
              {
                icon: Twitter,
                href: PersonalInfo.twitter,
                label: "Twitter Profile",
              },
              {
                icon: Gitlab,
                href: PersonalInfo.gitlab,
                label: "GitLab Profile",
              },
              {
                icon: Code2,
                href: PersonalInfo.leetcode,
                label: "LeetCode Profile",
              },
              {
                icon: Terminal,
                href: PersonalInfo.freecodecamp,
                label: "freeCodeCamp Profile",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                className="text-fg-dim hover:text-accent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 rounded-md"
              >
                <social.icon size={24} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 mt-4 text-center">
            <p className="text-sm text-fg-faint font-medium">
              &copy; {new Date().getFullYear()} {PersonalInfo.name}. All rights
              reserved.
            </p>
            <p className="text-xs font-mono text-fg-faint/60 tracking-wider">
              BUILT WITH REACT, TYPESCRIPT & TAILWIND
            </p>
            <p className="text-xs text-fg-faint mt-1">
              This site uses cookie-free analytics. No personal data is
              collected.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
