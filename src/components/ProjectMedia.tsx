import type { ProjectData } from "../data/content";

/**
 * Renders the visual media inside a project card's browser-chrome mockup.
 *
 * Priority: `image` > `iframe` > branded placeholder.
 *
 * - `image`: renders an `<img>` with `object-cover` and 16/10 aspect ratio.
 * - `iframe`: renders a sandboxed `<iframe>` embedding the live site.
 * - neither: renders a polished branded placeholder (gradient + project
 *   monogram + "Preview coming soon" label) instead of a bare "Screenshot
 *   coming soon" text. Looks intentional rather than unfinished.
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
    // Derive a 1-2 character monogram for the branded placeholder.
    const monogram = project.title
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0] ?? "")
        .join("")
        .toUpperCase();

    return (
        <div
            className={`w-full bg-bg-base rounded-lg border border-bg-3/40 shadow-xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.03] ${className}`}
        >
            {/* Browser Chrome */}
            <div className="h-8 bg-bg-2 border-b border-bg-3/40 flex items-center px-4 gap-2 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-error/80" aria-hidden="true" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/80" aria-hidden="true" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/80" aria-hidden="true" />
                {/* Faux URL bar — adds realism to the browser chrome. */}
                <div className="ml-3 flex-1 h-3.5 bg-bg-base/60 rounded max-w-[200px] hidden sm:block" aria-hidden="true" />
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
                    /* Branded placeholder — looks intentional, not unfinished. */
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-bg-1 via-bg-2 to-bg-base">
                        {/* Decorative dotted texture. */}
                        <div
                            className="absolute inset-0 opacity-60"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, rgba(230,221,208,0.05) 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                            }}
                            aria-hidden="true"
                        />
                        {/* Ambient glow behind monogram. */}
                        <div
                            className="absolute w-32 h-32 rounded-full bg-accent/8 blur-3xl"
                            aria-hidden="true"
                        />

                        {/* Monogram in a tinted square. */}
                        <div
                            className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-display font-bold text-2xl md:text-3xl text-accent border border-accent/30 bg-accent/5 mb-3"
                            aria-hidden="true"
                        >
                            {monogram}
                        </div>

                        <span className="relative font-mono text-[10px] md:text-xs text-fg-dim tracking-[0.2em] uppercase">
                            Preview coming soon
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
