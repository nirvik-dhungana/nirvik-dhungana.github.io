import type { ProjectData } from "../data/content";

/**
 * Renders the visual media inside a project card's browser-chrome mockup.
 *
 * Priority: `image` > `iframe` > placeholder.
 *
 * - `image`: renders an `<img>` with `object-cover` and 16/10 aspect ratio.
 * - `iframe`: renders a sandboxed `<iframe>` embedding the live site.
 * - neither: renders a bordered "Screenshot coming soon" placeholder using
 *   the site's existing muted text color (`text-fg-faint`).
 *
 * The browser chrome (colored dots) is always rendered above the media.
 */
export function ProjectMedia({
  project,
  className = "",
  aspectRatio = "16/10",
}: {
  project: ProjectData;
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div
      className={`w-full bg-bg-base rounded-lg border border-bg-3/40 shadow-xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.03] ${className}`}
    >
      {/* Browser Chrome */}
      <div className="h-8 bg-bg-2 border-b border-bg-3/40 flex items-center px-4 gap-2 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-error/80" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-warning/80" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-success/80" aria-hidden="true" />
      </div>

      {/* Media area */}
      <div
        className="relative bg-bg-base overflow-hidden"
        style={{ aspectRatio }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : project.iframe ? (
          <iframe
            src={project.iframe}
              title={`${project.title} live preview`}
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              tabIndex={-1}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-1 to-bg-2">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8L3N2Zz4=')] bg-repeat opacity-50" aria-hidden="true" />
            <span className="relative font-mono text-xs text-fg-faint tracking-wider uppercase">
              Screenshot coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
