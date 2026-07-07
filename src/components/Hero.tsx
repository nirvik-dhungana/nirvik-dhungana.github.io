import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { Sparkles, MapPin } from "lucide-react";
import { PersonalInfo, SocialLinks } from "../data/content";
import { MagneticButton } from "./primitives/MagneticButton";
import { socialIconMap } from "./primitives/socialIcons";

/* ---------------------------------------------------------------------------
 *  Animation variants — staggered entrance for hero content.
 * ------------------------------------------------------------------------- */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 280, damping: 22 },
    },
};

/* ---------------------------------------------------------------------------
 *  Typewriter — cycles through role rotations with a typing/deleting effect.
 * ------------------------------------------------------------------------- */
function TypewriterRole({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;
        const currentWord = words[index] ?? "";
        if (subIndex === currentWord.length + 1 && !deleting) {
            const t = setTimeout(() => setDeleting(true), 1800);
            return () => clearTimeout(t);
        }
        if (subIndex === 0 && deleting) {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }
        const t = setTimeout(() => {
            setSubIndex((prev) => prev + (deleting ? -1 : 1));
        }, deleting ? 35 : 75);
        return () => clearTimeout(t);
    }, [subIndex, deleting, index, words, reduceMotion]);

    if (reduceMotion) {
        return <span className="text-accent">{words[0]}</span>;
    }

    return (
        <span className="text-accent">
            {(words[index] ?? "").substring(0, subIndex)}
            <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle animate-pulse" aria-hidden="true" />
        </span>
    );
}

/* ---------------------------------------------------------------------------
 *  Photo — circular avatar wrapped in an elegant layered glass ring.
 *
 *  Treatment (replaces the previous spinning conic-mask ring):
 *    1. Outer soft halo (blurred accent glow) — handled by `.photo-ring::before`
 *    2. A subtle two-stop gradient annulus — handled by `.photo-ring::after`
 *    3. A 1px inner "lit from above" highlight — handled by `.photo-ring__inner`
 *  No animation, no `mask` on a conic gradient (which rendered inconsistently
 *  across browsers). The result is quiet, premium, and visually stable.
 * ------------------------------------------------------------------------- */
const Photo = ({ className = "" }: { className?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, type: "spring" as const }}
        className={`photo-ring relative ${className}`}
    >
        <div className="photo-ring__inner absolute inset-0 rounded-full bg-bg-1 overflow-hidden z-10 flex items-center justify-center p-1.5">
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
                {/* Subtle inner tint for cohesion with the accent. */}
                <div className="absolute inset-0 bg-accent/[0.03] pointer-events-none" aria-hidden="true" />
            </div>
        </div>
    </motion.div>
);

export function Hero() {
    const reduceMotion = useReducedMotion();

    /* Mouse parallax — subtle depth effect on desktop only. */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 50, damping: 20 };
    const blob1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);
    const blob1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), springConfig);
    const blob2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), springConfig);
    const blob2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), springConfig);
    const photoX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
    const photoY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (reduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    /* Code + practice socials go in the hero (LinkedIn + Twitter + GitHub + GitLab). */
    const heroSocials = SocialLinks.filter((s) => s.group !== "practice").slice(0, 4);

    const scrollTo = (e: React.MouseEvent, target: string) => {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) {
            const rect = el.getBoundingClientRect();
            const offset = 96 + 24;
            window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: "smooth" });
        }
    };

    return (
        <section
            className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-28 isolate"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ===== Ambient background =====
                A cohesive layered ambient system that reinforces the design
                language rather than competing with it:
                  1. Dotted grid base — establishes the "engineering" texture.
                  2. Two slow-drifting aurora blobs (accent + gold) — the
                     primary ambient motion. Colors echo the brand palette.
                  3. A radial vignette at the center-bottom that draws the
                     eye toward the content and creates depth.
                  4. A bottom fade for a smooth transition into the next
                     section (no hard seam).
                Everything is GPU-friendly (transform + opacity + filter only)
                and disabled by reduced-motion.
            */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {/* Dotted grid base texture. */}
                <div className="absolute inset-0 bg-dotted-grid opacity-60" />

                {/* Primary accent aurora — top-left, larger, slow drift. */}
                <motion.div
                    animate={reduceMotion ? undefined : { x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.05, 0.95, 1] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    style={reduceMotion ? undefined : { x: blob1X, y: blob1Y }}
                    className="absolute top-[12%] left-[8%] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] bg-accent/10 rounded-full blur-3xl animate-aurora"
                />
                {/* Secondary gold aurora — bottom-right, smaller, counter-drift. */}
                <motion.div
                    animate={reduceMotion ? undefined : { x: [0, -36, 18, 0], y: [0, 28, -18, 0], scale: [1, 0.96, 1.04, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={reduceMotion ? undefined : { x: blob2X, y: blob2Y }}
                    className="absolute bottom-[6%] right-[6%] w-[38vw] h-[38vw] max-w-[520px] max-h-[520px] bg-gold/8 rounded-full blur-3xl animate-aurora"
                />
                {/* Tertiary garnet blob — center-right, gently pulses,
                    balances the composition with a warm jewel-tone. */}
                <motion.div
                    animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[42%] right-[28%] w-[22vw] h-[22vw] max-w-[280px] max-h-[280px] bg-garnet/8 rounded-full blur-3xl"
                />

                {/* Center radial vignette — depth + focus. */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 50% 60%, transparent 0%, transparent 50%, rgba(23, 21, 19, 0.55) 100%)",
                    }}
                />

                {/* Bottom fade-out for smooth section transition. */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-base to-transparent" />
            </div>

            {/* ===== Main content ===== */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pb-16">
                {/* Text column. */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[60%] w-full"
                >
                    {/* Availability badge. */}
                    <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card !rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold animate-pulse-glow" />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-fg-bright">
                                {PersonalInfo.status}
                            </span>
                            <span className="w-px h-3 bg-bg-3" />
                            <span className="inline-flex items-center gap-1 text-xs text-fg-dim">
                                <MapPin size={11} aria-hidden="true" />
                                {PersonalInfo.location}
                            </span>
                        </div>
                    </motion.div>

                    {/* Mobile photo. */}
                    <div className="lg:hidden mb-6 w-full flex justify-center">
                        <Photo className="w-40 h-40 sm:w-48 sm:h-48" />
                    </div>

                    {/* Eyebrow + typewriter role. */}
                    <motion.div variants={itemVariants} className="mb-4">
                        <p className="font-mono text-accent text-xs md:text-base tracking-[0.2em] uppercase min-h-[1.2em]">
                            <Sparkles size={12} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                            <TypewriterRole words={PersonalInfo.roleRotations} />
                        </p>
                    </motion.div>

                    {/*
                      Name — balanced heading weights.
                      Both words now use the same weight (bold). "Dhungana"
                      gets the gradient accent (lime -> gold) for visual
                      interest without dominating "Nirvik". The gradient is
                      subtle enough that both words read as equal-weight.
                    */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <h1
                            className="font-display font-bold leading-[1.05] tracking-tight"
                            style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
                        >
                            <span className="text-fg-bright">Nirvik</span>{" "}
                            <span className="text-gradient-accent">Dhungana</span>
                        </h1>
                    </motion.div>

                    {/* Tagline. */}
                    <motion.div variants={itemVariants} className="mb-4">
                        <p className="text-xl md:text-3xl font-medium text-fg-dim">
                            {PersonalInfo.tagline}
                        </p>
                    </motion.div>

                    {/* Focus statement. */}
                    <motion.div variants={itemVariants} className="mb-8 md:mb-10 max-w-2xl">
                        <p className="text-sm md:text-lg text-fg-faint leading-relaxed">
                            {PersonalInfo.focus}
                        </p>
                    </motion.div>

                    {/* CTAs — magnetic. */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 w-full sm:w-auto"
                    >
                        <MagneticButton
                            href="#projects"
                            onClick={(e) => scrollTo(e, "#projects")}
                            className="group w-full sm:w-auto px-7 py-3.5 bg-accent text-bg-base rounded-full text-sm sm:text-base font-bold transition-all duration-300 hover:bg-fg-bright hover:shadow-[0_0_30px_rgba(168,193,85,0.5)] text-center glow-accent min-h-[52px]"
                        >
                            View Projects
                            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </MagneticButton>
                        <MagneticButton
                            href="#contact"
                            onClick={(e) => scrollTo(e, "#contact")}
                            className="w-full sm:w-auto px-7 py-3.5 bg-transparent text-accent rounded-full text-sm sm:text-base font-bold border-2 border-accent transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(168,193,85,0.2)] text-center min-h-[52px]"
                        >
                            Get in Touch
                        </MagneticButton>
                    </motion.div>

                    {/*
                      Socials — responsive:
                      - Mobile: icon-only circles, single row (saves space).
                      - Desktop: labeled pill buttons with tooltips.
                    */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5"
                    >
                        <span className="text-xs font-mono text-fg-faint uppercase tracking-wider mr-1 hidden md:inline">
                            Find me on
                        </span>
                        {heroSocials.map((social) => {
                            const Icon = socialIconMap[social.key];
                            return (
                                <a
                                    key={social.key}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${social.label} — ${social.description} (opens in a new tab)`}
                                    className="tooltip-host group relative inline-flex items-center justify-center sm:gap-2 px-3 sm:px-3.5 py-2.5 sm:py-2 rounded-full bg-bg-2/50 border border-bg-3/50 text-fg-dim hover:text-accent hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base min-h-[44px] min-w-[44px]"
                                >
                                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                                    <span className="text-xs font-medium hidden sm:inline">{social.label}</span>
                                    <span className="tooltip" role="tooltip">{social.description}</span>
                                </a>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Desktop photo column — mouse parallax. */}
                <motion.div
                    className="hidden lg:flex lg:w-[40%] justify-center xl:justify-end"
                    style={reduceMotion ? undefined : { x: photoX, y: photoY }}
                >
                    <Photo className="w-80 h-80 xl:w-[400px] xl:h-[400px]" />
                </motion.div>
            </div>

            {/* ===== Modern mouse-scroll indicator =====
                A single, subtle scroll affordance — replaces the previous
                redundant triple-element indicator (label + animated line +
                chevron). The mouse-outline + animated wheel dot is a
                universally-recognized "scroll down" cue that doesn't compete
                with the primary CTAs above.
                  - Positioned lower (bottom-6) so it sits naturally below the
                    content rather than overlapping the social row.
                  - Mouse-outline is a thin stroke; the wheel dot animates
                    vertically inside it (top → bottom → fade).
                  - Hidden on very short viewports (vertical) to avoid
                    overlapping content.
                  - Reduced-motion: the wheel dot is static, no animation.
            */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20"
                aria-hidden="true"
            >
                {/* Mouse outline + animated wheel. */}
                <div className="relative w-6 h-10 rounded-full border-2 border-fg-dim/50">
                    {/* Wheel dot — animates top → bottom → fades. */}
                    {reduceMotion ? (
                        <span className="absolute left-1/2 top-2 -translate-x-1/2 w-1 h-1.5 rounded-full bg-accent" />
                    ) : (
                        <motion.span
                            animate={{ y: [4, 16, 4], opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-1/2 -translate-x-1/2 w-1 h-1.5 rounded-full bg-accent"
                            style={{ boxShadow: "0 0 6px var(--color-accent)" }}
                        />
                    )}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-fg-faint">
                    Scroll
                </span>
            </motion.div>
        </section>
    );
}
