import { motion } from "motion/react";

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

// Token roles → Pyrope token classes
type Role = "k" | "f" | "t" | "s" | "n" | "c" | "p";
const roleClass: Record<Role, string> = {
  k: "text-accent font-bold",   // keywords
  f: "text-verdant",             // functions
  t: "text-lagoon italic",       // types
  s: "text-rosewood",            // strings
  n: "text-garnet",              // numbers / constants
  c: "text-fg-dim italic",       // comments
  p: "text-fg",                  // plain / punctuation
};

type Line = Array<[Role, string]>;

const code: Line[] = [
  [["c", "// Pyrope colorscheme — syntax role demo"]],
  [
    ["k", "import"], ["p", " React, "],
    ["p", "{"], ["p", " useState, useEffect "], ["p", "}"],
    ["p", " "], ["k", "from"], ["p", " "],
    ["s", "'react'"],
  ],
  [],
  [["k", "interface"], ["p", " "], ["t", "ThemeConfig"], ["p", " {"]],
  [["p", "  name: "], ["t", "string"]],
  [["p", "  variant: "], ["s", "'dark'"], ["p", " | "], ["s", "'light'"]],
  [["p", "  accentHex: "], ["t", "string"]],
  [["p", "}"]],
  [],
  [
    ["k", "const"], ["p", " "], ["f", "DEFAULT_CONFIG"],
    ["p", ": "], ["t", "ThemeConfig"], ["p", " = {"],
  ],
  [["p", "  name: "], ["s", "'pyrope'"], ["p", ","]],
  [["p", "  variant: "], ["s", "'dark'"], ["p", ","]],
  [["p", "  accentHex: "], ["s", "'#a8c155'"], ["p", ","]],
  [["p", "}"]],
  [],
  [
    ["k", "const"], ["p", " "], ["f", "ThemeProvider"],
    ["p", ": "], ["t", "React.FC"], ["p", "<{"],
    ["p", " config?: "], ["t", "ThemeConfig"],
    ["p", " }>"], ["p", " = ({"],
  ],
  [["p", "  config = "], ["f", "DEFAULT_CONFIG"], ["p", ","]],
  [["p", "})"], ["p", " =>"], ["p", " {"]],
  [
    ["p", "  "], ["k", "const"],
    ["p", " [active, "], ["f", "setActive"], ["p", "] = "],
    ["f", "useState"], ["p", "<"],
    ["t", "boolean"], ["p", ">"],
    ["p", "("], ["n", "true"], ["p", ")"],
  ],
  [],
  [["p", "  "], ["f", "useEffect"], ["p", "() => {"]],
  [["c", "    // Apply theme tokens to document root"]],
  [
    ["p", "    document."], ["f", "documentElement"],
    ["p", ".style."], ["f", "setProperty"], ["p", "("],
  ],
  [["p", "      "], ["s", "'--accent'"], ["p", ","]],
  [["p", "      config."], ["f", "accentHex"]],
  [["p", "    )"]],
  [["p", "  }, [config."], ["f", "accentHex"], ["p", "])"]],
  [],
  [
    ["p", "  "], ["k", "if"], ["p", " (!active) "],
    ["k", "return"], ["p", " "], ["n", "null"],
  ],
  [],
  [
    ["p", "  "], ["k", "return"], ["p", " <"],
    ["t", "div"], ["p", " className="],
    ["s", '"pyrope-root"'], ["p", " "],
    ["p", "data-theme={"], ["p", "config."], ["f", "variant"], ["p", "}"],
    ["p", " />"],
  ],
  [["p", "}"]],
  [],
  [
    ["k", "export"], ["p", " "],
    ["k", "default"], ["p", " "],
    ["f", "ThemeProvider"],
  ],
];

const legend: Array<{ cls: string; label: string }> = [
  { cls: "bg-accent", label: "Keywords" },
  { cls: "bg-verdant", label: "Functions" },
  { cls: "bg-lagoon", label: "Types" },
  { cls: "bg-rosewood", label: "Strings" },
  { cls: "bg-garnet", label: "Numbers" },
  { cls: "bg-fg-dim", label: "Comments" },
  { cls: "bg-fg", label: "Text" },
];

export function PyropeSyntax() {
  return (
    <section id="syntax" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 04 — SYNTAX
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Syntax Roles
          </h2>
          <p className="text-fg-dim mt-4 max-w-2xl leading-[1.7]">
            The same role assignments apply identically across VS Code, Neovim,
            Zed, and Kate.
          </p>
        </motion.div>

        {/* Code editor window */}
        <motion.div
          variants={itemVariants}
          className="bg-bg-base rounded-lg border border-bg-3/40 overflow-hidden shadow-2xl"
        >
          {/* Chrome bar with tab */}
          <div className="bg-bg-2 border-b border-bg-3/40 h-9 flex items-center px-4 gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-garnet" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            </div>
            <div className="ml-4 flex items-center gap-3">
              <div className="px-3 py-1 bg-bg-1 rounded-t-md border-t border-x border-bg-3/40 -mb-px">
                <span className="font-mono text-xs text-fg-bright">example.tsx</span>
              </div>
            </div>
          </div>

          {/* Code body with line numbers */}
          <div className="overflow-x-auto">
            <div className="flex min-w-max">
              {/* Line number gutter */}
              <div className="flex flex-col text-right py-5 px-4 border-r border-bg-3/30 bg-bg-base/50 select-none shrink-0">
                {code.map((_, i) => (
                  <span
                    key={i}
                    className="font-mono text-[13px] leading-[1.6] text-fg-faint/60"
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              {/* Code content */}
              <div className="py-5 px-4 flex-1">
                <pre
                  className="font-mono text-[13px] leading-[1.6]"
                  style={{ tabSize: 2 }}
                >
                  <code>
                    {code.map((line, lineIdx) => (
                      <div key={lineIdx} className="min-h-[1.6em]">
                        {line.length === 0 ? (
                          <>&nbsp;</>
                        ) : (
                          line.map((tok, tokIdx) => (
                            <span key={tokIdx} className={roleClass[tok[0]]}>
                              {tok[1]}
                            </span>
                          ))
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legend — wrapped in a card */}
        <motion.div
          variants={itemVariants}
          className="mt-6 glass-card px-5 py-4"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            {legend.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`${l.cls} w-2.5 h-2.5 rounded-full`} />
                <span className="text-fg-dim" style={{ fontSize: "13px" }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
