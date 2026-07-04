import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectsContent, PersonalInfo } from "../data/content";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const pillColors = [
  "text-gold border-gold/30 bg-gold/5",
  "text-lagoon border-lagoon/30 bg-lagoon/5",
  "text-rosewood border-rosewood/30 bg-rosewood/5",
  "text-verdant border-verdant/30 bg-verdant/5",
];

export function Projects() {
  const featuredProject =
    ProjectsContent.find((p) => p.featured) || ProjectsContent[0];
  const otherProjects = ProjectsContent.filter((p) => p !== featuredProject);

  return (
    <section id="projects" className="px-6 relative z-10">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 02 — PROJECTS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            Selected Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Project (Full Width) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 group bg-bg-1 border border-bg-3/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(168,193,85,0.06)]"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image / Chrome Mockup */}
              <div className="lg:w-3/5 border-b lg:border-b-0 lg:border-r border-bg-3/40 bg-bg-base/50 p-6 flex items-center justify-center relative overflow-hidden">
                <div className="w-full max-w-2xl bg-bg-base rounded-lg border border-bg-3/40 shadow-xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.03]">
                  {/* Browser Chrome */}
                  <div className="h-8 bg-bg-2 border-b border-bg-3/40 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-error/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
                  </div>
                  {/* Image Placeholder area */}
                  <div
                    className="aspect-[16/10] bg-gradient-to-br from-bg-1 to-bg-2 relative"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8L3N2Zz4=')] bg-repeat opacity-50" />
                    <div className="absolute inset-0 flex flex-col p-6">
                      <div className="flex justify-between items-center mb-8 opacity-40">
                        <div className="w-10 h-4 rounded bg-accent" />
                        <div className="flex gap-3">
                          <div className="w-8 h-1.5 bg-fg-dim rounded" />
                          <div className="w-8 h-1.5 bg-fg-dim rounded" />
                          <div className="w-8 h-1.5 bg-fg-dim rounded" />
                        </div>
                      </div>
                      <div className="w-3/4 h-8 rounded bg-accent opacity-20 mb-4" />
                      <div className="w-1/2 h-4 rounded bg-accent opacity-10 mb-auto" />

                      <div className="flex gap-6 mt-8 h-20">
                        <div className="flex-[2] space-y-3">
                          <div className="w-full h-2 rounded bg-fg-dim opacity-10" />
                          <div className="w-5/6 h-2 rounded bg-fg-dim opacity-10" />
                          <div className="w-4/6 h-2 rounded bg-fg-dim opacity-10" />
                        </div>
                        <div className="flex-1 rounded-sm bg-accent opacity-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-2/5 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-fg-bright mb-3 md:mb-4 truncate md:whitespace-normal">
                  {featuredProject.title}
                </h3>
                <p className="text-fg-dim text-sm md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                  {featuredProject.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 font-mono text-xs rounded-md border ${pillColors[idx % pillColors.length]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <a
                    href={featuredProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${featuredProject.title} project on GitHub (opens in a new tab)`}
                    className="inline-flex items-center gap-2 font-medium text-fg uppercase tracking-wider text-sm transition-colors group-hover:text-accent relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-accent after:transition-all after:duration-300 group-hover:after:w-full w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded"
                  >
                    View Project{" "}
                    <ArrowRight
                      size={16}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  {/* Internal case study link — only the Personal Portfolio featured project has this */}
                  {featuredProject.title === "Personal Portfolio" && (
                    <Link
                      to="/projects/pyrope"
                      className="inline-flex items-center gap-2 font-medium text-accent uppercase tracking-wider text-sm transition-colors hover:text-fg-bright w-fit"
                    >
                      Case Study
                      <ArrowRight
                        size={16}
                        className="transform transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Project */}
          {otherProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group bg-bg-1 border border-bg-3/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(168,193,85,0.05)] flex flex-col"
            >
              {/* Top Image Box */}
              <div
                className="aspect-[16/9] border-b border-bg-3/40 bg-bg-base/50 p-6 flex items-center justify-center overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-bg-2 to-bg-base rounded border border-bg-3/40 shadow-lg transform transition-transform duration-500 group-hover:scale-[1.05] relative">
                  <div className="absolute inset-0 flex flex-col p-4">
                    <div className="w-1/3 h-4 rounded bg-accent opacity-30 mb-4" />
                    <div className="grid grid-cols-3 gap-3 flex-grow">
                      <div className="rounded bg-accent opacity-[0.08]" />
                      <div className="rounded bg-accent opacity-[0.08]" />
                      <div className="rounded bg-accent opacity-[0.08]" />
                    </div>
                    <div className="h-8 mt-3 rounded bg-fg-faint opacity-[0.05]" />
                  </div>
                </div>
              </div>
              {/* Bottom Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-display font-bold text-fg-bright mb-2 md:mb-3 truncate md:whitespace-normal">
                  {project.title}
                </h3>
                <p className="text-fg-dim text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-3 md:line-clamp-none">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 font-mono text-[11px] rounded-md border ${pillColors[(idx + 2) % pillColors.length]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-fg uppercase tracking-wider text-sm transition-colors group-hover:text-accent relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 group-hover:after:w-full"
                  >
                    View Project{" "}
                    <ArrowRight
                      size={16}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* More Projects CTA Card */}
          <motion.div
            variants={cardVariants}
            className="group relative bg-transparent border border-dashed border-bg-3 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:bg-accent/5 flex flex-col items-center justify-center p-12 min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-bg-2 flex items-center justify-center mb-6 text-fg-dim group-hover:text-accent transition-colors group-hover:scale-110 duration-300">
              <Github size={32} />
            </div>
            <h3 className="text-xl font-display font-medium text-fg-bright mb-2">
              More on GitHub
            </h3>
            <p className="text-fg-faint text-center max-w-xs mb-6">
              Explore my repositories for more technical deep dives and side
              projects.
            </p>
            <a
              href={PersonalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-transparent text-fg-bright rounded-full font-medium border border-bg-3 transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              View Profile
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
