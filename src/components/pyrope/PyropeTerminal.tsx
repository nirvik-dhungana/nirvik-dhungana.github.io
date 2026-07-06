import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
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

// ANSI 16 colors — non-bright variants map to existing Pyrope tokens,
// bright variants use the dedicated ansi-br-* tokens.
const ansi16 = [
  { cls: "bg-bg-base", hex: "#171513" },         // 0 black
  { cls: "bg-garnet", hex: "#b5475c" },           // 1 red
  { cls: "bg-accent", hex: "#a8c155" },           // 2 green
  { cls: "bg-gold", hex: "#d1a83e" },             // 3 yellow
  { cls: "bg-success", hex: "#5683c4" },          // 4 blue
  { cls: "bg-rosewood", hex: "#b04f86" },         // 5 magenta
  { cls: "bg-lagoon", hex: "#3f93a0" },           // 6 cyan
  { cls: "bg-ansi-white", hex: "#c9bfb2" },       // 7 white
  { cls: "bg-bg-3", hex: "#3a3430" },             // 8 bright black
  { cls: "bg-ansi-br-red", hex: "#cf6478" },      // 9 bright red
  { cls: "bg-ansi-br-green", hex: "#c3d978" },    // 10 bright green
  { cls: "bg-ansi-br-yellow", hex: "#e0bc5a" },   // 11 bright yellow
  { cls: "bg-ansi-br-blue", hex: "#6f9bdb" },     // 12 bright blue
  { cls: "bg-ansi-br-magenta", hex: "#c570a0" },  // 13 bright magenta
  { cls: "bg-ansi-br-cyan", hex: "#56aab8" },     // 14 bright cyan
  { cls: "bg-fg-bright", hex: "#f0e9dd" },        // 15 bright white
];

// Fedora ASCII logo — rendered in ANSI blue (text-success), exactly as
// real neofetch would output it via ESC[34m. The logo is the compact
// Fedora "f" badge shape.
const FEDORA_LOGO = `      _______
     /       \\
    |  _____  |
    | |  F  | |
    | |_____| |
    |         |
     \\_______/`;

// Neofetch system info — Fedora 40 + Neovim-focused setup.
// Each entry is [label, value, valueClass?].
const neofetchInfo: Array<[string, string, string?]> = [
  ["OS", "Fedora Linux 40 (Workstation)"],
  ["Kernel", "6.9.7-200.fc40.x86_64"],
  ["Uptime", "4 hrs, 12 mins"],
  ["Shell", "zsh 5.9"],
  ["DE", "KDE Plasma 6.1"],
  ["WM", "KWin"],
  ["Terminal", "kitty"],
  ["CPU", "AMD Ryzen 7 5800X"],
  ["Editor", "Neovim v0.10.0"],
  ["Plugins", "42 (lazy.nvim)"],
  ["LSP", "lua_ls \u00b7 tsserver \u00b7 gopls"],
  ["Colorscheme", "Pyrope", "text-accent"],
  ["Font", "JetBrains Mono"],
];

const PROMPT_LINE = "nirvik@pyrope:~ $ neofetch";

export function PyropeTerminal() {
  const reduceMotion = useReducedMotion();
  const [typedChars, setTypedChars] = useState<number>(reduceMotion ? PROMPT_LINE.length : 0);
  const [showRest, setShowRest] = useState<boolean>(reduceMotion ? true : false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef<boolean>(false);

  useEffect(() => {
    if (reduceMotion) {
      setTypedChars(PROMPT_LINE.length);
      setShowRest(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    // Track the active interval + timeout so we can clean them up if the
    // component unmounts mid-typing. Without this, the interval keeps
    // calling setTypedChars on an unmounted component (React warning + leak).
    let activeInterval: ReturnType<typeof setInterval> | null = null;
    let activeTimeout: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            let i = 0;
            activeInterval = setInterval(() => {
              i++;
              setTypedChars(i);
              if (i >= PROMPT_LINE.length) {
                if (activeInterval) clearInterval(activeInterval);
                activeTimeout = setTimeout(() => setShowRest(true), 280);
              }
            }, 55);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (activeInterval) clearInterval(activeInterval);
      if (activeTimeout) clearTimeout(activeTimeout);
    };
  }, [reduceMotion]);

  const renderPromptLine = () => {
    const typedCommand = PROMPT_LINE.replace("nirvik@pyrope:~ $ ", "").slice(
      0,
      Math.max(0, typedChars - "nirvik@pyrope:~ $ ".length),
    );
    return (
      <div className="font-mono text-[13px] leading-[1.6]">
        <span className="text-accent">nirvik@pyrope</span>
        <span className="text-fg-dim">:</span>
        <span className="text-lagoon">~</span>
        <span className="text-fg"> $ </span>
        <span className="text-fg-bright">{typedCommand}</span>
        {typedChars < PROMPT_LINE.length && (
          <span className="inline-block w-[7px] h-[14px] bg-accent align-middle ml-0.5 animate-pulse" />
        )}
      </div>
    );
  };

  return (
    <section id="terminal" className="px-6 relative z-10">
      <motion.div
        ref={sectionRef}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 03 — TERMINAL
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            ANSI 16 in Action
          </h2>
          <p className="text-fg-dim mt-4 max-w-2xl leading-[1.7]">
            The 16-color ANSI palette is the backbone of terminal theming.
            Every color maps directly to a Pyrope token.
          </p>
          <p className="text-fg-faint mt-2 font-mono text-xs">
            Click any color block to copy its hex value.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          variants={itemVariants}
          className="bg-bg-base rounded-lg border border-bg-3/40 overflow-hidden shadow-2xl"
        >
          {/* Chrome bar */}
          <div className="bg-bg-2 border-b border-bg-3/40 h-9 flex items-center px-4 relative shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-garnet" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-fg-faint">
              kitty — 100×28
            </span>
          </div>

          {/* Body */}
          <div className="p-5 md:p-6 font-mono text-[13px] leading-[1.6]">
            {/* Line 1 — typed prompt */}
            {renderPromptLine()}

            {/* Neofetch output */}
            {showRest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-3"
              >
                {/* Logo + system info side by side */}
                <div className="flex gap-4 md:gap-6">
                  {/* Fedora ASCII logo — hidden on narrow screens */}
                  <pre className="text-success font-mono text-[10px] md:text-[11px] leading-[1.3] shrink-0 hidden sm:block whitespace-pre">
                    {FEDORA_LOGO}
                  </pre>

                  {/* System info */}
                  <div className="space-y-0.5 font-mono text-[13px] leading-[1.5] min-w-0">
                    <div className="text-accent font-bold">nirvik@pyrope</div>
                    <div className="text-fg-faint">{"-".repeat(16)}</div>
                    {neofetchInfo.map(([label, value, valueCls]) => (
                      <div key={label} className="flex gap-2">
                        <span className="text-fg-dim shrink-0">{label}:</span>
                        <span className={`text-fg ${valueCls ?? ""} truncate`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ANSI 16 color grid — full width below the neofetch info */}
                <div className="mt-5 pt-4 border-t border-bg-3/30">
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 md:gap-2">
                    {ansi16.map((c, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => copyColor(c.hex)}
                        aria-label={`Copy color ${c.hex} to clipboard`}
                        title={`Click to copy ${c.hex}`}
                        className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-md"
                      >
                        <div
                          className={`${c.cls} w-6 h-6 md:w-7 md:h-7 rounded-sm transition-all group-hover:ring-2 group-hover:ring-accent/50 group-hover:scale-110`}
                        />
                        <span className="font-mono text-[9px] md:text-[10px] text-fg-faint group-hover:text-accent transition-colors">
                          {c.hex}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blank */}
            {showRest && <div className="h-3" />}

            {/* git diff demo */}
            {showRest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="space-y-0.5"
              >
                <div>
                  <span className="text-fg">$ </span>
                  <span className="text-fg-bright">git diff</span>
                </div>
                <div className="text-garnet">- removed line in old code</div>
                <div className="text-accent">+ added line in new code</div>
                <div className="text-fg-dim italic text-[12px] mt-1">
                  (git diff reads as garnet-red vs pear-gold-green — two genuinely
                  separated hues, not a guess)
                </div>
              </motion.div>
            )}

            {/* Blank */}
            {showRest && <div className="h-3" />}

            {/* idle prompt */}
            {showRest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-mono text-[13px] leading-[1.6]"
              >
                <span className="text-accent">nirvik@pyrope</span>
                <span className="text-fg-dim">:</span>
                <span className="text-lagoon">~</span>
                <span className="text-fg"> $ </span>
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-[7px] h-[14px] bg-accent align-middle"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          variants={itemVariants}
          className="mt-6 bg-bg-2 border-l-2 border-success rounded-r-md px-5 py-4 flex gap-3 items-start"
        >
          <span className="font-mono text-success shrink-0 mt-0.5">ⓘ</span>
          <p className="text-fg-dim text-sm leading-relaxed">
            ANSI green is the Pear accent itself — not a teal substitute. This
            is intentional. The git diff pairing (garnet/red vs pear-green)
            gives two colors that are separated by both hue AND lightness,
            making them distinguishable even without reliable green-cone
            function.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
