import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Info } from "lucide-react";
import { copyColor } from "./copyColor";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const swatchVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

type BgSwatch = {
  cls: string;
  role: string;
  hex: string;
  rgb: string;
  border?: boolean;
};

const backgrounds: BgSwatch[] = [
  { cls: "bg-bg-base", role: "bg / base", hex: "#171513", rgb: "23 · 21 · 19", border: true },
  { cls: "bg-bg-1", role: "bg +1", hex: "#1e1b19", rgb: "30 · 27 · 25" },
  { cls: "bg-bg-2", role: "bg +2", hex: "#282420", rgb: "40 · 36 · 32" },
  { cls: "bg-bg-3", role: "bg +3", hex: "#3a3430", rgb: "58 · 52 · 48" },
];

type FgSwatch = {
  textCls: string;
  role: string;
  hex: string;
};

const foregrounds: FgSwatch[] = [
  { textCls: "text-fg", role: "fg / main text", hex: "#e6ddd0" },
  { textCls: "text-fg-dim", role: "fg dim / secondary", hex: "#9c9186" },
  { textCls: "text-fg-faint", role: "fg faint / disabled", hex: "#6b625a" },
  { textCls: "text-fg-bright", role: "fg bright / emphasis", hex: "#f0e9dd" },
];

type StatusSwatch = {
  cls: string;
  name: string;
  hex: string;
  badge: string;
};

const accents: StatusSwatch[] = [
  { cls: "bg-accent", name: "Pear Green", hex: "#a8c155", badge: "PRIMARY ACCENT" },
  { cls: "bg-success", name: "Sapphire", hex: "#5683c4", badge: "SUCCESS ONLY" },
  { cls: "bg-warning", name: "Amber", hex: "#d4893f", badge: "WARNING" },
  { cls: "bg-error", name: "Crimson", hex: "#c33d5e", badge: "ERROR" },
  { cls: "bg-gold", name: "Gold", hex: "#d1a83e", badge: "SECONDARY" },
];

const jewels: StatusSwatch[] = [
  { cls: "bg-garnet", name: "Garnet", hex: "#b5475c", badge: "DECORATIVE" },
  { cls: "bg-rosewood", name: "Rosewood", hex: "#b04f86", badge: "DECORATIVE" },
  { cls: "bg-lagoon", name: "Lagoon", hex: "#3f93a0", badge: "DECORATIVE" },
  { cls: "bg-verdant", name: "Verdant", hex: "#4f9c87", badge: "DECORATIVE" },
];

function InfoBanner({
  borderColor,
  iconColor,
  children,
}: {
  borderColor: string;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-6 bg-bg-2 border-l-2 ${borderColor} rounded-r-md px-5 py-4 flex gap-3 items-start`}
    >
      <Info size={16} className={`${iconColor} shrink-0 mt-0.5`} />
      <p className="text-fg-dim text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function SwatchCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-1 border border-bg-3/40 rounded-xl p-6 md:p-8">
      <p className="font-mono text-xs text-fg-dim uppercase tracking-wider mb-6">
        {label}
      </p>
      {children}
    </div>
  );
}

/**
 * Shared swatch button — wraps the color block + metadata in a clickable
 * <button> that copies the hex value on click. Hover state: ring around the
 * swatch + hex text brightens. Uses group utilities for the hover effect.
 */
function SwatchButton({
  hex,
  variants,
  children,
}: {
  hex: string;
  variants: Record<string, Record<string, unknown>>;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      variants={variants as never}
      onClick={() => copyColor(hex)}
      aria-label={`Copy color ${hex} to clipboard`}
      title={`Click to copy ${hex}`}
      className="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 rounded-md"
    >
      {children}
    </motion.button>
  );
}

export function PyropePalette() {
  const reduceMotion = useReducedMotion();
  const swatchV = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : swatchVariants;

  return (
    <section id="palette" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 01 — PALETTE
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            The Colors
          </h2>
          <p className="text-fg-dim mt-4 max-w-2xl" style={{ fontSize: "16px" }}>
            Every color earns its place. No arbitrary additions, no decorative
            noise without purpose.
          </p>
          <p className="text-fg-faint mt-2 font-mono text-xs">
            Click any swatch to copy its hex value.
          </p>
        </motion.div>

        {/* Stack of subsection cards */}
        <div className="flex flex-col gap-6">
          {/* 2a. Backgrounds */}
          <motion.div variants={itemVariants}>
            <SwatchCard label="Backgrounds — the surface stack">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {backgrounds.map((bg) => (
                  <SwatchButton key={bg.hex} hex={bg.hex} variants={swatchV}>
                    <div
                      className={`${bg.cls} h-[100px] rounded-md transition-all group-hover:ring-2 group-hover:ring-accent/40 ${
                        bg.border ? "border border-bg-3" : ""
                      }`}
                    />
                    <div className="mt-3">
                      <div className="font-mono text-xs text-fg-dim">{bg.role}</div>
                      <div className="font-mono text-sm text-accent mt-0.5 group-hover:text-fg-bright transition-colors">
                        {bg.hex}
                      </div>
                      <div className="font-mono text-[11px] text-fg-faint mt-0.5">
                        {bg.rgb}
                      </div>
                    </div>
                  </SwatchButton>
                ))}
              </div>
            </SwatchCard>
          </motion.div>

          {/* 2b. Foreground */}
          <motion.div variants={itemVariants}>
            <SwatchCard label="Foreground — text on a surface">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {foregrounds.map((fg) => (
                  <SwatchButton key={fg.hex} hex={fg.hex} variants={swatchV}>
                    <div className="bg-bg-2 h-[100px] rounded-md flex items-center justify-center px-3 transition-all group-hover:ring-2 group-hover:ring-accent/40">
                      <span className={`${fg.textCls} font-mono text-sm text-center leading-tight`}>
                        The quick brown fox
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="font-mono text-xs text-fg-dim">{fg.role}</div>
                      <div className="font-mono text-sm text-accent mt-0.5 group-hover:text-fg-bright transition-colors">
                        {fg.hex}
                      </div>
                    </div>
                  </SwatchButton>
                ))}
              </div>
            </SwatchCard>
          </motion.div>

          {/* 2c. Accent + Status */}
          <motion.div variants={itemVariants}>
            <SwatchCard label="Accent & Status — meaning-bearing only">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {accents.map((s) => (
                  <SwatchButton key={s.hex} hex={s.hex} variants={swatchV}>
                    <div className={`${s.cls} h-[120px] rounded-md transition-all group-hover:ring-2 group-hover:ring-accent/40`} />
                    <div className="mt-3">
                      <div className="font-display font-bold text-sm text-fg-bright">
                        {s.name}
                      </div>
                      <div className="font-mono text-xs text-accent mt-0.5 group-hover:text-fg-bright transition-colors">
                        {s.hex}
                      </div>
                      <div className="font-mono text-[10px] text-fg-faint uppercase tracking-wider mt-1.5">
                        {s.badge}
                      </div>
                    </div>
                  </SwatchButton>
                ))}
              </div>
              <InfoBanner borderColor="border-success" iconColor="text-success">
                Sapphire (blue) is used for exactly one meaning across the entire
                scheme. Reserving a strong, reliable hue for one purpose is a
                core deutan-safe strategy.
              </InfoBanner>
            </SwatchCard>
          </motion.div>

          {/* 2d. Decorative jewel tones */}
          <motion.div variants={itemVariants}>
            <SwatchCard label="Decorative — visual variety, never meaning">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {jewels.map((s) => (
                  <SwatchButton key={s.hex} hex={s.hex} variants={swatchV}>
                    <div className={`${s.cls} h-[120px] rounded-md transition-all group-hover:ring-2 group-hover:ring-accent/40`} />
                    <div className="mt-3">
                      <div className="font-display font-bold text-sm text-fg-bright">
                        {s.name}
                      </div>
                      <div className="font-mono text-xs text-accent mt-0.5 group-hover:text-fg-bright transition-colors">
                        {s.hex}
                      </div>
                      <div className="font-mono text-[10px] text-fg-faint uppercase tracking-wider mt-1.5">
                        {s.badge}
                      </div>
                    </div>
                  </SwatchButton>
                ))}
              </div>
              <InfoBanner borderColor="border-gold" iconColor="text-gold">
                These are for visual texture only — tag chips, avatar rings,
                decorative accents. They never encode status or meaning.
              </InfoBanner>
            </SwatchCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
