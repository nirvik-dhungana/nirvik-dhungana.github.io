import type { JSX, ReactNode } from "react";

/**
 * Shared Badge / pill component.
 *
 * Replaces the 4+ ad-hoc pill implementations across the site (project
 * tech-stack tags, education GPA badges, Learning Path status tags, hero
 * "Open to Work" pill) with a single component that enforces identical
 * padding, radius, and font-weight across every instance.
 *
 * Only the color/variant differs — shape is always:
 *   `inline-flex items-center rounded-full px-3 py-1 text-xs font-medium`
 *
 * Variants map to the Pyrope decorative jewel-tone palette + status colors.
 */

export type BadgeVariant =
  | "gold"
  | "lagoon"
  | "rosewood"
  | "verdant"
  | "garnet"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "muted";

const variantClasses: Record<BadgeVariant, string> = {
  gold: "text-gold border-gold/30 bg-gold/5",
  lagoon: "text-lagoon border-lagoon/30 bg-lagoon/5",
  rosewood: "text-rosewood border-rosewood/30 bg-rosewood/5",
  verdant: "text-verdant border-verdant/30 bg-verdant/5",
  garnet: "text-garnet border-garnet/30 bg-garnet/5",
  accent: "text-accent border-accent/30 bg-accent/5",
  success: "text-success border-success/30 bg-success/5",
  warning: "text-warning border-warning/30 bg-warning/5",
  error: "text-error border-error/30 bg-error/5",
  muted: "text-fg-dim border-bg-3 bg-bg-2",
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  /** Optional extra classes (e.g. `font-mono` for code-style tags). */
  className?: string;
}

export function Badge({
  children,
  variant = "muted",
  className = "",
}: BadgeProps): JSX.Element {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
