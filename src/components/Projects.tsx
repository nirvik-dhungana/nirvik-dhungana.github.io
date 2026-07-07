import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectsContent, PersonalInfo } from "../data/content";
import { ProjectMedia } from "./ProjectMedia";
import { Badge, type BadgeVariant } from "./Badge";

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

// Cycle through jewel-tone variants for tech-stack tags.
const tagVariants: BadgeVariant[] = ["gold", "lagoon", "rosewood", "verdant"];

export function Projects() {
  const featuredProject =
    ProjectsContent.find((p) => p.featured) ?? ProjectsContent[0];

  // If there are no projects at all, render nothing.
  if (!featuredProject) return null;

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
                <ProjectMedia project={featuredProject} className="max-w-2xl" />
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
                    <Badge key={tag} variant={tagVariants[idx % tagVariants.length]} className="font-mono">
                      {tag}
                    </Badge>
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
                      aria-hidden="true"
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  {/* Internal case-study link — driven by the `caseStudy` data
                      field so any project can opt in. */}
                  {featuredProject.caseStudy && (
                    <Link
                      to={featuredProject.caseStudy}
                      className="inline-flex items-center gap-2 font-medium text-accent uppercase tracking-wider text-sm transition-colors hover:text-fg-bright w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded"
                    >
                      Case Study
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transform transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Projects */}
          {otherProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group bg-bg-1 border border-bg-3/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(168,193,85,0.05)] flex flex-col"
            >
              {/* Top Image Box */}
              <div className="border-b border-bg-3/40 bg-bg-base/50 p-6 flex items-center justify-center overflow-hidden">
                <ProjectMedia project={project} aspectRatio="16/9" className="w-full" />
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
                    <Badge key={tag} variant={tagVariants[(idx + 2) % tagVariants.length]} className="font-mono">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} project on GitHub (opens in a new tab)`}
                    className="inline-flex items-center gap-2 font-medium text-fg uppercase tracking-wider text-sm transition-colors group-hover:text-accent relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 group-hover:after:w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded"
                  >
                    View Project{" "}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More on GitHub — full-width horizontal banner below the grid */}
        <motion.a
          href={PersonalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View more projects on GitHub (opens in a new tab)"
          variants={cardVariants}
          className="mt-8 group relative bg-transparent border border-dashed border-bg-3 rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent hover:bg-accent/5 flex flex-row items-center justify-between p-6 md:px-8 min-h-[80px]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-bg-2 flex items-center justify-center text-fg-dim group-hover:text-accent transition-colors shrink-0">
              <Github size={20} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-fg-bright">
                More on GitHub
              </h3>
              <p className="text-fg-faint text-xs hidden sm:block">
                Explore my repositories for more technical deep dives and side
                projects.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-fg-bright text-sm font-medium group-hover:text-accent transition-colors shrink-0">
            View Profile
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transform transition-transform group-hover:translate-x-1"
            />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
