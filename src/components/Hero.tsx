import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  Gitlab,
  ChevronDown,
  Mouse,
} from "lucide-react";
import { PersonalInfo } from "../data/content";

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

const Photo = ({ className = "" }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2, type: "spring" as const }}
    className={`relative ${className}`}
  >
    <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
    <div className="absolute inset-0 rounded-full border border-accent/30 bg-bg-1 overflow-hidden z-10 flex items-center justify-center p-2">
      <div className="w-full h-full rounded-full overflow-hidden relative bg-bg-2">
        <picture>
          <source
            srcSet="https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_400/v1762424795/pfp_yggogi.png"
            type="image/webp"
          />
          <img
            src="https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_400/v1762424795/pfp_yggogi.png"
            srcSet="
              https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_200/v1762424795/pfp_yggogi.png 200w,
              https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_400/v1762424795/pfp_yggogi.png 400w
            "
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 400px"
            alt={PersonalInfo.name}
            className="w-full h-full object-cover"
            width="400"
            height="400"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
      </div>
    </div>
  </motion.div>
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-28">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-accent/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-success/8 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pb-16">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[60%] w-full"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-2 border border-bg-3/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-fg-bright">
                {PersonalInfo.status}
              </span>
            </div>
          </motion.div>

          {/* Mobile Photo Representation */}
          <div className="lg:hidden mb-6 w-full flex justify-center">
            <Photo className="w-40 h-40 sm:w-48 sm:h-48" />
          </div>

          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className="font-mono text-accent text-xs md:text-base tracking-[0.2em] uppercase">
              {PersonalInfo.role}
            </p>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1
              className="font-display font-bold text-fg-bright leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
            >
              Nirvik <span className="text-accent">Dhungana</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className="text-xl md:text-3xl font-medium text-fg-dim">
              {PersonalInfo.tagline}
            </p>
          </motion.div>

          {/* Focus Statement */}
          <motion.div
            variants={itemVariants}
            className="mb-8 md:mb-10 max-w-2xl"
          >
            <p className="text-sm md:text-lg text-fg-faint leading-relaxed">
              {PersonalInfo.focus}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-accent text-bg-base rounded-full text-sm sm:text-base font-bold transition-all duration-300 hover:bg-fg-bright hover:shadow-[0_0_20px_rgba(168,193,85,0.4)] text-center"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-transparent text-accent rounded-full text-sm sm:text-base font-bold border-2 border-accent transition-all duration-300 hover:bg-accent/10 text-center"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
          >
            {[
              { icon: Github, href: PersonalInfo.github, label: "GitHub" },
              {
                icon: Linkedin,
                href: PersonalInfo.linkedin,
                label: "LinkedIn",
              },
              { icon: Twitter, href: PersonalInfo.twitter, label: "Twitter" },
              { icon: Gitlab, href: PersonalInfo.gitlab, label: "GitLab" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-fg-dim hover:text-accent transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(168,193,85,0.6)]"
              >
                <social.icon size={24} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Desktop Photo Column */}
        <div className="hidden lg:flex lg:w-[40%] justify-center xl:justify-end">
          <Photo className="w-80 h-80 xl:w-[400px] xl:h-[400px]" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-1 md:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-dim"
      >
        <Mouse size={20} strokeWidth={1.5} />
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} strokeWidth={2} />
        </motion.div>
      </motion.div>
    </section>
  );
}
