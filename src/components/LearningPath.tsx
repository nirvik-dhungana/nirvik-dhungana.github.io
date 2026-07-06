import { motion, useReducedMotion } from "motion/react";
import { LearningPathContent } from "../data/content";
import { Check, Circle, ArrowDown } from "lucide-react";

// ---------------------------------------------------------------------------
//  Types — derived from the data model so adding a new stage "just works"
// ---------------------------------------------------------------------------

interface LearningStage {
  stage: string;
  status: string;
  /** Optional date/period label shown next to the status. */
  period?: string;
  points: string[];
}

type StageStatus = "completed" | "present" | "upcoming";

/**
 * Infer the visual status from the status string.
 * - "Present" / "Current" / "Now" → present (animated, accent)
 * - "Starting Point" / "Past" / "Done" / "Completed" → completed (dimmed)
 * - anything else → upcoming
 */
function inferStatus(status: string): StageStatus {
  const s = status.toLowerCase();
  if (s.includes("present") || s.includes("current") || s.includes("now")) {
    return "present";
  }
  if (
    s.includes("starting") ||
    s.includes("past") ||
    s.includes("done") ||
    s.includes("complete")
  ) {
    return "completed";
  }
  return "upcoming";
}

// ---------------------------------------------------------------------------
//  Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

// ---------------------------------------------------------------------------
//  Sub-components
// ---------------------------------------------------------------------------

/** The colored dot on the timeline rail. Visual treatment depends on status. */
function TimelineNode({ status }: { status: StageStatus }) {
  if (status === "present") {
    return (
      <span className="relative flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent" />
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className="flex h-4 w-4 rounded-full bg-bg-2 border-2 border-fg-faint items-center justify-center">
        <Check size={9} className="text-fg-faint" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="flex h-4 w-4 rounded-full bg-bg-2 border-2 border-bg-3 items-center justify-center">
      <Circle size={4} className="text-fg-faint fill-fg-faint" />
    </span>
  );
}

/** A single stage card on the timeline. */
function StageCard({
  stage,
  isLast,
}: {
  stage: LearningStage;
  isLast: boolean;
}) {
  const status = inferStatus(stage.status);
  const reduceMotion = useReducedMotion();

  const cardClass =
    status === "present"
      ? "bg-bg-2 border-2 border-accent/50 shadow-[0_0_30px_rgba(168,193,85,0.12)]"
      : status === "completed"
        ? "bg-bg-1 border border-bg-3/40 opacity-90 hover:opacity-100"
        : "bg-bg-1 border border-dashed border-bg-3/60";

  const statusLabelClass =
    status === "present"
      ? "text-accent font-bold"
      : status === "completed"
        ? "text-fg-faint"
        : "text-fg-faint";

  const titleClass =
    status === "present"
      ? "text-fg-bright"
      : status === "completed"
        ? "text-fg-dim"
        : "text-fg-dim";

  return (
    <motion.div variants={itemVariants} className="relative pl-12 pb-10">
      {/* Timeline node (positioned on the rail) */}
      <div className="absolute left-0 top-1.5">
        <TimelineNode status={status} />
      </div>

      {/* Connector line to the next stage (hidden for the last item) */}
      {!isLast && (
        <div
          className={`absolute left-[7px] top-6 bottom-0 w-0.5 ${
            status === "present"
              ? "bg-gradient-to-b from-accent/50 to-bg-3/50"
              : "bg-bg-3/50"
          }`}
        />
      )}

      {/* Card */}
      <div className={`${cardClass} rounded-xl p-6 transition-all duration-300`}>
        {/* Status row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span
            className={`font-mono text-xs uppercase tracking-[0.15em] ${statusLabelClass}`}
          >
            {stage.status}
          </span>
          {stage.period && (
            <span className="font-mono text-xs text-fg-faint">{stage.period}</span>
          )}
        </div>

        {/* Stage title */}
        <h3
          className={`font-display font-bold mb-4 ${titleClass} ${
            status === "present" ? "text-xl md:text-2xl" : "text-lg md:text-xl"
          }`}
        >
          {stage.stage}
        </h3>

        {/* Bullet points */}
        <ul className="space-y-2.5">
          {stage.points.map((pt, i) => (
            <li
              key={i}
              className={`flex items-start text-sm md:text-base ${
                status === "present" ? "text-fg" : "text-fg-dim"
              }`}
            >
              <span className="mr-3 mt-1.5 shrink-0">
                {status === "present" ? (
                  <motion.span
                    animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="block w-1.5 h-1.5 rounded-full bg-accent"
                  />
                ) : status === "completed" ? (
                  <Check size={12} className="text-fg-faint" strokeWidth={2.5} />
                ) : (
                  <span className="block w-1.5 h-1.5 rounded-full bg-bg-3" />
                )}
              </span>
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
//  Main component
// ---------------------------------------------------------------------------

export function LearningPath() {
  // Cast to the derived type — the data shape is structurally compatible.
  const stages = LearningPathContent as LearningStage[];

  return (
    <section id="growth" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto"
      >
        {/* Section header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 06 — GROWTH
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Learning Path
          </h2>
          <p className="text-fg-dim mt-4 max-w-2xl leading-[1.7]">
            A chronological view of the skills I've built and what I'm actively
            exploring next.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {stages.map((stage, idx) => (
            <StageCard
              key={`${stage.stage}-${idx}`}
              stage={stage}
              isLast={idx === stages.length - 1}
            />
          ))}
        </div>

        {/* "More to come" indicator — only if the last stage is "present" */}
        {(() => {
          const lastStage = stages[stages.length - 1];
          if (!lastStage) return null;
          return inferStatus(lastStage.status) === "present" ? (
            <motion.div
              variants={itemVariants}
              className="pl-12 flex items-center gap-3 text-fg-faint"
            >
              <ArrowDown size={16} className="animate-bounce" />
              <span className="font-mono text-xs uppercase tracking-wider">
                More to come
              </span>
            </motion.div>
          ) : null;
        })()}
      </motion.div>
    </section>
  );
}
