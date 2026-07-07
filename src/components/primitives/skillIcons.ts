/**
 * Skill icon registry.
 *
 * Maps a skill name to either:
 *   - a remote Simple Icons SVG URL (https://cdn.simpleicons.org) — gives us
 *     official brand icons without bundling them, perfect for a portfolio
 *   - OR a single-character fallback (the first letter) for skills without
 *     a Simple Icons entry (e.g. "AI Prompting", "CI/CD")
 *
 * The icon is rendered inside the SkillBadge as an <img>, tinted via CSS
 * mask so we can colorize it with the brand color on hover.
 */

const SIMPLE_ICONS_BASE = "https://cdn.simpleicons.org";

/** Skills with a Simple Icons slug. */
const slugMap: Record<string, string> = {
  // Frontend
  React: "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwindcss",
  Vite: "vite",

  // Backend
  "Node.js": "nodedotjs",
  Express: "express",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  Firebase: "firebase",

  // Tools
  Git: "git",
  Docker: "docker",
  Figma: "figma",
  "Gemini API": "googlegemini",
  Jest: "jest",
  "CI/CD": "githubactions",
  Linux: "linux",
  "AI Prompting": "openai",
};

/**
 * Get the icon URL for a skill, or null if the skill should fall back to
 * an initial-letter avatar.
 */
export function getSkillIconUrl(skillName: string): string | null {
  const slug = slugMap[skillName];
  if (!slug) return null;
  // Simple Icons CDN returns a monochrome SVG (currentColor). We use the
  // `/white` variant so the icon shows up on dark backgrounds. We'll tint
  // via CSS filter on hover using the brand color.
  return `${SIMPLE_ICONS_BASE}/${slug}/e6ddd0`;
}

/** First-letter fallback for skills without a Simple Icons entry. */
export function getSkillInitial(skillName: string): string {
  // For multi-word skills, take the first letter of the first two words.
  const words = skillName.split(/[\s/]+/).filter(Boolean);
  if (words.length >= 2 && words[0]?.[0] && words[1]?.[0]) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return skillName.slice(0, 2).toUpperCase();
}
