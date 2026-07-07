import { motion } from "motion/react";
import {
  Code2,
  Terminal,
  Box,
  FileCode,
  Monitor,
  Cat,
  Square,
  Crown,
  ExternalLink,
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const PYROPE_REPO = "https://github.com/nirvik-dhungana/pyrope/tree/main/ports";

const ports = [
  {
    icon: Code2,
    name: "VS Code",
    file: "theme.json",
    desc: "Semantic token mapping for full language support",
    url: `${PYROPE_REPO}/vscode`,
  },
  {
    icon: Terminal,
    name: "Neovim",
    file: "init.lua",
    desc: "Treesitter + LSP highlight group assignments",
    url: `${PYROPE_REPO}/neovim`,
  },
  {
    icon: Box,
    name: "Zed",
    file: ".zed-theme",
    desc: "Editor and UI token configuration",
    url: `${PYROPE_REPO}/zed`,
  },
  {
    icon: FileCode,
    name: "Kate",
    file: "kateschema",
    desc: "KDE-native syntax color scheme",
    url: `${PYROPE_REPO}/kate`,
  },
  {
    icon: Monitor,
    name: "KDE Plasma",
    file: ".colors",
    desc: "Full Breeze palette override for the desktop",
    url: `${PYROPE_REPO}/kde`,
  },
  {
    icon: Cat,
    name: "Kitty",
    file: "kitty.conf",
    desc: "16-color ANSI + extended color configuration",
    url: `${PYROPE_REPO}/kitty`,
  },
  {
    icon: Square,
    name: "Alacritty",
    file: "alacritty.toml",
    desc: "Terminal ANSI palette and cursor colors",
    url: `${PYROPE_REPO}/alacritty`,
  },
  {
    icon: Crown,
    name: "Lichess",
    file: "CSS variables",
    desc: "Board, pieces, and interface theming",
    url: `${PYROPE_REPO}/lichess`,
  },
];

export function PyropePorts() {
  return (
    <section id="ports" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 05 — PORTS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Available For
          </h2>
          <p className="text-fg-dim mt-4 max-w-2xl leading-[1.7]">
            One palette definition. Theme files generated per-application with
            consistent role assignments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ports.map((p) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.name} theme file on GitHub in a new tab`}
                variants={cardVariants}
                className="group block glass-card glass-card-interactive p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-md bg-bg-2 border border-bg-3/50 flex items-center justify-center text-accent" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <ExternalLink
                    size={16}
                    aria-hidden="true"
                    className="text-fg-faint group-hover:text-accent transition-colors"
                  />
                </div>
                <h3 className="text-base font-display font-bold text-fg-bright mb-2 group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <span className="inline-block px-2.5 py-1 font-mono text-[11px] text-fg-dim bg-bg-2 border border-bg-3 rounded-md mb-3">
                  {p.file}
                </span>
                <p className="text-fg-dim" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
