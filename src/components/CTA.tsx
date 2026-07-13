import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Mail, MapPin, Clock, Code2, Users, GraduationCap } from "lucide-react";
import { CTAContent, PersonalInfo, SocialLinks, type SocialLink } from "../data/content";
import { MagneticButton } from "./primitives/MagneticButton";
import { socialIconMap } from "./primitives/socialIcons";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 22 } },
};

// Compute the year ONCE at module load. This is deterministic per build —
// the prerendered HTML and the client hydration see the same value, avoiding
// a hydration mismatch warning. (Using `new Date()` inline in JSX would
// evaluate at render time, which can differ between the prerender build
// clock and the visitor's clock.)
const CURRENT_YEAR = new Date().getFullYear();

/* Group social links by category for organized presentation. */
const groupLabels: Record<SocialLink["group"], string> = {
    code: "Code",
    social: "Social",
    practice: "Practice",
};

const groupOrder: SocialLink["group"][] = ["code", "social", "practice"];

const groupIcons: Record<SocialLink["group"], typeof Code2> = {
    code: Code2,
    social: Users,
    practice: GraduationCap,
};

export function CTA() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="contact"
            className="relative w-full bg-bg-1/60 pt-24 lg:pt-32 pb-12 px-6 overflow-hidden border-t border-bg-3/40"
        >
            {/* Ambient animated blob. */}
            <motion.div
                animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.18, 0.28, 0.18] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"
                aria-hidden="true"
            />
            {/* Dotted texture. */}
            <div className="absolute inset-0 bg-dotted-grid opacity-40 pointer-events-none" aria-hidden="true" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 max-w-5xl mx-auto"
            >
                {/* Eyebrow. */}
                <motion.div variants={itemVariants} className="text-center mb-6">
                    <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
                        // 08 — CONTACT
                    </span>
                </motion.div>

                {/* Heading. */}
                <motion.h2
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-fg-bright mb-6 tracking-tight text-center"
                >
                    {CTAContent.heading}
                </motion.h2>

                {/* Subtext. */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-fg-dim mb-10 max-w-2xl mx-auto text-center"
                >
                    {CTAContent.subtext}
                </motion.p>

                {/*
                  Primary contact action — the SINGLE mailto CTA.
                  The email address is shown as a subtle hint directly under
                  the button (read-only, no separate action), so users can
                  copy it manually if they prefer. No duplicate email card,
                  no separate copy button — every action serves a unique
                  purpose.
                */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 mb-14">
                    <MagneticButton
                        href={`mailto:${CTAContent.email}`}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-bg-base rounded-full font-bold text-lg transition-all duration-300 hover:bg-fg-bright glow-accent min-h-[52px]"
                    >
                        <Mail size={20} aria-hidden="true" />
                        Start a Conversation
                        <ArrowRight
                            size={20}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1.5"
                            strokeWidth={2.5}
                        />
                    </MagneticButton>
                    {/* Email hint — read-only, no action. The button above
                        already initiates the email. This is just a visual
                        affordance so the address is visible/scannable. */}
                    <p className="font-mono text-xs text-fg-faint tracking-wider">
                        {CTAContent.email}
                    </p>
                </motion.div>

                {/*
                  Social profiles — the secondary discoverability surface.
                  Each group gets its own labeled card row: Code, Social,
                  Practice. Icons are ALWAYS visible (even on mobile) so the
                  profiles are scannable at a glance.
                */}
                <motion.div variants={itemVariants} className="mb-14">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-fg-faint text-center mb-6">
                        Or find me on
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                        {groupOrder.map((group) => {
                            const links = SocialLinks.filter((s) => s.group === group);
                            if (links.length === 0) return null;
                            const GroupIcon = groupIcons[group];
                            return (
                                <div
                                    key={group}
                                    className="glass-card p-5 md:p-6 flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-bg-2 border border-bg-3/60 flex items-center justify-center text-accent shrink-0">
                                            <GroupIcon size={15} aria-hidden="true" />
                                        </div>
                                        <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-fg-bright font-semibold">
                                            {groupLabels[group]}
                                        </h4>
                                        <span className="ml-auto text-[10px] font-mono text-fg-faint">
                                            {links.length}
                                        </span>
                                    </div>
                                    {/*
                                      Social links — labeled on all breakpoints
                                      (not icon-only on mobile) so they're more
                                      discoverable. Touch-friendly sizing.
                                    */}
                                    <div className="flex flex-col gap-2">
                                        {links.map((social) => {
                                            const Icon = socialIconMap[social.key];
                                            return (
                                                <a
                                                    key={social.key}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${social.label} — ${social.description} (opens in a new tab)`}
                                                    className="group relative inline-flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-bg-2/40 border border-bg-3/40 text-fg-dim hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 min-h-[44px]"
                                                >
                                                    <Icon size={16} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
                                                    <span className="text-xs font-medium flex-1 truncate">{social.label}</span>
                                                    <ArrowRight
                                                        size={12}
                                                        aria-hidden="true"
                                                        className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0"
                                                    />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Footer grid: location / availability / response — 3 equal columns. */}
                <motion.div
                    variants={itemVariants}
                    className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-12 border-t border-bg-3/40"
                >
                    {/* Location. */}
                    <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                        <div className="w-9 h-9 rounded-full bg-bg-2 border border-bg-3/50 flex items-center justify-center text-accent">
                            <MapPin size={16} aria-hidden="true" />
                        </div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-fg-dim mt-2">Location</h4>
                        <p className="text-sm text-fg-bright">{PersonalInfo.location}</p>
                    </div>

                    {/* Availability. */}
                    <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                        <div className="w-9 h-9 rounded-full bg-bg-2 border border-bg-3/50 flex items-center justify-center text-accent relative">
                            <Clock size={16} aria-hidden="true" />
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gold rounded-full border-2 border-bg-1" />
                        </div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-fg-dim mt-2">Status</h4>
                        <p className="text-sm text-fg-bright">{PersonalInfo.status}</p>
                    </div>

                    {/* Response time. */}
                    <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                        <div className="w-9 h-9 rounded-full bg-bg-2 border border-bg-3/50 flex items-center justify-center text-accent">
                            <Mail size={16} aria-hidden="true" />
                        </div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-fg-dim mt-2">Response</h4>
                        <p className="text-sm text-fg-bright">Usually within 24h</p>
                    </div>
                </motion.div>

                {/* Footer meta. */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center gap-2 mt-12 pt-8 border-t border-bg-3/40 text-center"
                >
                    <p className="text-sm text-fg-faint font-medium">
                        &copy; {CURRENT_YEAR} {PersonalInfo.name}. All rights reserved.
                    </p>
                    <p className="text-xs font-mono text-fg-faint/60 tracking-wider">
                        {PersonalInfo.location.toUpperCase()} · BUILT WITH REACT, TYPESCRIPT &amp; TAILWIND
                    </p>
                    <p className="text-xs text-fg-faint mt-1">
                        This site uses cookie-free analytics. No personal data is collected.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
