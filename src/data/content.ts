/* ===========================================================================
 *  Portfolio content model.
 *
 *  All structured content lives here. Components consume typed data — adding
 *  a new project, skill, experience entry, or testimonial requires NO
 *  component changes, only an edit to this file.
 *
 *  Every record is optional-rich: fields like `image`, `iframe`, `caseStudy`,
 *  `docs`, `icon` are optional so the same component gracefully handles
 *  sparse data (e.g. a project without a screenshot).
 *=========================================================================*/

export const PersonalInfo = {
  name: "Nirvik Dhungana",
  initials: "ND",
  role: "ASPIRING WEB DEVELOPER · FRONTEND DEVELOPER",
  /** Role keywords used for the typewriter effect in the Hero. */
  roleRotations: [
    "Frontend Developer",
    "React Engineer",
    "UI Craftsman",
    "TypeScript Enthusiast",
    "Accessibility Advocate",
  ],
  tagline: "Building the Web of Tomorrow",
  focus:
    "Specializing in the React & TypeScript ecosystem to build accessible, responsive, and performant user interfaces.",
  email: "info.nirvik.dh@gmail.com",
  status: "Currently Learning",
  location: "Kathmandu, Nepal",
  github: "https://github.com/nirvik-dhungana",
  linkedin: "https://www.linkedin.com/in/nirvik-dhungana/",
  twitter: "https://x.com/Dhungana_Nirvik",
  gitlab: "https://gitlab.com/nirvik.dhungana",
  leetcode: "https://leetcode.com/u/nirvik-dhungana/",
  freecodecamp: "https://www.freecodecamp.org/nirvik-dhungana",
};

/* -------------------- Social links (unified model) -------------------- */
export interface SocialLink {
  /** Lucide icon name — imported in component, mapped by key. */
  key: "github" | "linkedin" | "twitter" | "gitlab" | "leetcode" | "freecodecamp";
  label: string;
  href: string;
  /** Short tagline shown in tooltip / expanded presentation. */
  description: string;
  /** Grouping for the Contact section. */
  group: "code" | "social" | "practice";
}

export const SocialLinks: SocialLink[] = [
  {
    key: "github",
    label: "GitHub",
    href: PersonalInfo.github,
    description: "Open-source projects & experiments",
    group: "code",
  },
  {
    key: "gitlab",
    label: "GitLab",
    href: PersonalInfo.gitlab,
    description: "Mirror repositories & CI/CD",
    group: "code",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: PersonalInfo.linkedin,
    description: "Professional network & work history",
    group: "social",
  },
  {
    key: "twitter",
    label: "Twitter / X",
    href: PersonalInfo.twitter,
    description: "Build-in-public & dev thoughts",
    group: "social",
  },
  {
    key: "leetcode",
    label: "LeetCode",
    href: PersonalInfo.leetcode,
    description: "Algorithm practice & problem solving",
    group: "practice",
  },
  {
    key: "freecodecamp",
    label: "freeCodeCamp",
    href: PersonalInfo.freecodecamp,
    description: "Certifications & coursework",
    group: "practice",
  },
];

/* -------------------- About -------------------- */
export const AboutContent = {
  heading: "About Me",
  bio: [
    "I'm a frontend developer focused on the React and TypeScript ecosystem, building interfaces that are accessible, responsive, and performant by default — not as an afterthought. I enjoy translating designs into precise, interactive UIs, and I'm constantly exploring modern tooling to ship better products, faster.",
  ],
  /** "Now" line — short current-focus statement shown under bio. */
  now: "Currently exploring animation systems and design engineering.",
  stats: [
    { number: "1.5+", label: "Years Learning" },
    { number: "10+", label: "Projects Completed" },
  ],
  tags: ["Web Development", "UI/UX Design", "Modern Tech"],
};

/* -------------------- Projects -------------------- */
export interface ProjectData {
  title: string;
  description: string;
  /** Longer-form detail shown in the modal/slide-over. Optional. */
  longDescription?: string;
  tags: string[];
  /** Tech stack categorized for the detail panel. Optional. */
  stack?: {
    frontend?: string[];
    backend?: string[];
    tools?: string[];
  };
  /** Key features for the detail panel. Optional. */
  highlights?: string[];
  /** Engineering challenges encountered. Optional. */
  challenges?: string[];
  /** Solutions implemented for the challenges. Optional. */
  solutions?: string[];
  /** Engineering decisions with rationale. Optional. */
  decisions?: { decision: string; rationale: string }[];
  /** Optional metrics, e.g. "100ms LCP". */
  metrics?: { label: string; value: string }[];
  link: string;
  /** Optional live demo URL. */
  demo?: string;
  /** Optional documentation URL. */
  docs?: string;
  /** Optional screenshot image URLs (gallery). */
  screenshots?: string[];
  /** Optional external resource links (articles, talks, related projects). */
  resources?: { label: string; href: string }[];
  featured?: boolean;
  /**
   * Marks this project as a standalone "product" — gets a richer, larger
   * card with dedicated visual identity in the grid. Use for substantial
   * self-contained products like Pyrope (the design system).
   */
  product?: boolean;
  /** Optional screenshot image URL (primary). */
  image?: string;
  /** Optional live-site URL for an iframe embed. */
  iframe?: string;
  /** Internal route for a case-study page. */
  caseStudy?: string;
  /** Category for filter tabs. Defaults to "web". */
  category?: "web" | "design" | "tool" | "education";
  /** Year the project was built. */
  year?: string;
  /** Short project objective / goal statement. */
  objective?: string;
  /** Optional brand color used for the card accent + monogram tint. */
  brandColor?: string;
}

export const ProjectsContent: ProjectData[] = [
  {
    title: "Personal Portfolio",
    description:
      "A highly interactive and accessible portfolio built with React, TypeScript, Tailwind CSS, and Motion — featuring SSG prerendering, keyboard navigation, and a custom design system.",
    longDescription:
      "This very website. A design-engineered portfolio built from scratch with a custom design system ('Pyrope'), accessibility-first interactions, SSG prerendering for instant loads, and a dedicated case-study route breaking down every design decision. Every component was hand-built — no UI library, no template.",
    objective:
      "Build a portfolio that itself demonstrates the engineering and design care I bring to client work — not just a container for project links, but a project in its own right.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    stack: {
      frontend: ["React 19", "TypeScript", "Tailwind CSS v4", "Motion"],
      tools: ["Vite", "Vite SSG", "Lucide", "react-helmet-async"],
    },
    highlights: [
      "Custom 'Pyrope' design system with warm-earth palette and jewel-tone accents",
      "SSG prerendering for instant first paint and perfect Lighthouse scores",
      "Reduced-motion + keyboard navigation baked into every interaction",
      "Lazy-loaded below-fold sections for fast initial bundle",
    ],
    challenges: [
      "Achieving perfect Lighthouse scores without sacrificing visual richness or motion",
      "Building a modal, carousel, and timeline that are accessible by default",
      "Coordinating SSG prerender with client-side hydration and route changes",
    ],
    solutions: [
      "CSS-driven animations where possible, GPU-accelerated transforms only",
      "ARIA roles + keyboard handlers on every interactive primitive",
      "StaticRouter for prerender, BrowserRouter for client, shared App shell",
    ],
    metrics: [
      { label: "Performance", value: "100" },
      { label: "Accessibility", value: "100" },
      { label: "Best Practices", value: "100" },
    ],
    link: "https://github.com/nirvik-dhungana",
    demo: "https://nirvikdhungana.com.np",
    featured: true,
    image: undefined,
    category: "web",
    year: "2025",
  },
  {
    title: "Pyrope",
    description:
      "A bespoke color system and design language built for warm, earthy dark interfaces — featuring a garnet-rooted palette, jewel-tone accents, and a terminal-driven showcase.",
    longDescription:
      "Pyrope is a standalone design system and color philosophy. Named after the deep-red garnet gemstone, it pairs a warm-earth dark base (#171513) with a lime-green accent (#a8c155) and five jewel-tone secondary colors (gold, garnet, rosewood, lagoon, verdant). The system includes ANSI 16-color terminal mappings, contrast-verified text pairings, and a dedicated interactive showcase page with a live terminal demo. Pyrope is the design language this very portfolio is built on — but it is a separate product, not a feature of the portfolio.",
    objective:
      "Define a cohesive color language that feels warm, premium, and distinctive — rejecting the default 'cold tech blue' aesthetic in favor of something earthy and memorable.",
    tags: ["Design System", "Color Theory", "Typography", "Accessibility"],
    stack: {
      tools: ["CSS Custom Properties", "WCAG AA", "ANSI 16-color", "Figma"],
    },
    highlights: [
      "8-color core palette with deliberate warm-earth hue family",
      "5 jewel-tone accents (gold, garnet, rosewood, lagoon, verdant) for category coding",
      "ANSI 16-color mapping for terminal/CLI theming",
      "Documented 'excluded colors' rationale — what was rejected and why",
      "Interactive terminal showcase demonstrating the palette in action",
    ],
    challenges: [
      "Achieving WCAG AA contrast on every text/background pairing without resorting to pure white",
      "Avoiding the 'cold tech blue' default while keeping the palette feeling modern",
      "Designing accent colors that are distinctive enough to category-code but harmonious as a set",
    ],
    solutions: [
      "Used a warm-earth base (#171513) instead of neutral charcoal — anchors the palette",
      "Pulled jewel tones from a single hue neighborhood (warm reds/greens) for harmony",
      "Documented rejected alternatives (amethyst, terracotta, mint) to make trade-offs explicit",
    ],
    decisions: [
      {
        decision: "Warm-earth base instead of neutral charcoal",
        rationale:
          "A tinted dark base (#171513) anchors the palette in a single hue neighborhood and prevents the 'cold tech blue' default. Neutral charcoal reads as lifeless; warm earth reads as crafted.",
      },
      {
        decision: "Lime-green primary accent instead of conventional blue",
        rationale:
          "Lime green (#a8c155) sits opposite garnet on the wheel, achieves AA contrast on the dark base, and signals 'craft / engineering' without the clichéd tech-blue connotation.",
      },
      {
        decision: "Five jewel-tone accents, not three",
        rationale:
          "Five accents (gold, garnet, rosewood, lagoon, verdant) cover every category the portfolio needs to color-code without reusing hues. Each is contrast-verified for badges and small UI affordances.",
      },
      {
        decision: "ANSI 16-color mapping included",
        rationale:
          "Terminal theming is part of the same color philosophy. Mapping the palette to ANSI 16 means a single source of truth spans the web UI and the developer's terminal.",
      },
    ],
    metrics: [
      { label: "Contrast", value: "AA+" },
      { label: "Core Colors", value: "8" },
      { label: "Accents", value: "5" },
    ],
    resources: [
      { label: "Interactive Showcase", href: "/projects/pyrope" },
      { label: "Color Tokens Reference", href: "/projects/pyrope#palette" },
      { label: "Terminal Demo", href: "/projects/pyrope#terminal" },
    ],
    link: "https://github.com/nirvik-dhungana",
    demo: "/projects/pyrope",
    docs: "/projects/pyrope",
    featured: false,
    product: true,
    brandColor: "#a8c155",
    image: undefined,
    caseStudy: "/projects/pyrope",
    category: "design",
    year: "2025",
  },
  {
    title: "Gadgade Basic School",
    description:
      "An informational website built for a local educational institution to provide vital information to students and parents.",
    longDescription:
      "A content-driven school website built for a local educational institution. The site provides essential information — programs, calendar, faculty, and contact — to students and parents, with a focus on mobile-first accessibility for low-bandwidth rural users.",
    objective:
      "Deliver a fast, mobile-friendly school website that works on low-bandwidth connections and is usable by parents with limited digital literacy.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    stack: {
      frontend: ["HTML5", "Tailwind CSS", "Vanilla JS"],
    },
    highlights: [
      "Mobile-first responsive layout for low-bandwidth users",
      "Accessible navigation with keyboard support",
      "Optimized images with lazy-loading",
    ],
    challenges: [
      "Serving rich content over unreliable rural internet connections",
      "Designing navigation intuitive enough for non-technical parents",
    ],
    solutions: [
      "Aggressive image optimization and lazy-loading",
      "Large touch targets and clear visual hierarchy",
    ],
    link: "https://github.com/nirvik-dhungana",
    featured: false,
    image: undefined,
    category: "education",
    year: "2024",
  },
];

/* -------------------- Skills -------------------- */
export interface Skill {
  name: string;
  /** Slug for the official docs URL. */
  docs: string;
  /** Brand color (hex) for the icon tint on hover. */
  color: string;
  /** Optional one-line note shown in tooltip. */
  note?: string;
}

export interface SkillCategory {
  key: "frontend" | "backend" | "tools";
  title: string;
  /** Short description shown under the category title. */
  description: string;
  skills: Skill[];
}

export const SkillsContent: SkillCategory[] = [
  {
    key: "frontend",
    title: "Frontend",
    description: "Building accessible, responsive UIs with modern tooling.",
    skills: [
      { name: "React", docs: "https://react.dev", color: "#61dafb", note: "Component architecture & hooks" },
      { name: "TypeScript", docs: "https://www.typescriptlang.org/docs", color: "#3178c6", note: "End-to-end type safety" },
      { name: "JavaScript", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#f7df1e", note: "ES6+ & modern patterns" },
      { name: "Tailwind CSS", docs: "https://tailwindcss.com/docs", color: "#38bdf8", note: "Utility-first styling" },
      { name: "Vite", docs: "https://vitejs.dev/guide", color: "#bd34fe", note: "Lightning-fast bundler" },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    description: "APIs, databases, and server-side logic.",
    skills: [
      { name: "Node.js", docs: "https://nodejs.org/docs/latest/api", color: "#3c873a", note: "Server-side JavaScript" },
      { name: "Express", docs: "https://expressjs.com", color: "#999999", note: "Minimal web framework" },
      { name: "MongoDB", docs: "https://www.mongodb.com/docs", color: "#47a248", note: "NoSQL document database" },
      { name: "PostgreSQL", docs: "https://www.postgresql.org/docs", color: "#4169e1", note: "Relational database" },
      { name: "Firebase", docs: "https://firebase.google.com/docs", color: "#ffca28", note: "Serverless platform" },
    ],
  },
  {
    key: "tools",
    title: "Tools & Others",
    description: "Dev workflow, design, and productivity.",
    skills: [
      { name: "Git", docs: "https://git-scm.com/doc", color: "#f05032", note: "Version control" },
      { name: "Docker", docs: "https://docs.docker.com", color: "#2496ed", note: "Containerization" },
      { name: "Figma", docs: "https://help.figma.com", color: "#f24e1e", note: "Design & prototyping" },
      { name: "Gemini API", docs: "https://ai.google.dev/docs", color: "#4285f4", note: "LLM-powered features" },
      { name: "Jest", docs: "https://jestjs.io/docs", color: "#c21325", note: "Unit testing" },
      { name: "CI/CD", docs: "https://docs.github.com/en/actions", color: "#2088ff", note: "Automated pipelines" },
      { name: "Linux", docs: "https://www.kernel.org/doc/html/latest", color: "#fcc624", note: "Daily-driver OS" },
      { name: "AI Prompting", docs: "https://platform.openai.com/docs/guides/prompt-engineering", color: "#10a37f", note: "Crafting effective prompts" },
    ],
  },
];

/* -------------------- Experience -------------------- */
export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  /** Company initials for the logo placeholder. */
  companyInitials: string;
  /** Brand tint for the logo placeholder. */
  accentColor: string;
  location?: string;
  /**
   * Always-visible summary highlights — the top 1–2 most impactful bullets,
   * shown in the collapsed state. These are the "headline" of the role.
   */
  highlights: string[];
  /**
   * Day-to-day responsibilities — revealed on expand. These are the
   * tactical, in-the-weeds duties that don't belong in the headline.
   */
  responsibilities?: string[];
  /**
   * Concrete outcomes / wins — revealed on expand. Quantifiable results,
   * shipped features, recognition. Distinct from responsibilities so the
   * reader can scan "what I did" vs "what I achieved".
   */
  achievements?: string[];
  /** Technologies used in this role. Optional. */
  technologies?: string[];
}

export const ExperienceContent: ExperienceEntry[] = [
  {
    role: "Frontend Developer Intern",
    company: "Innovate Solutions",
    companyInitials: "IS",
    accentColor: "#a8c155",
    period: "Summer 2023",
    location: "Kathmandu, Nepal",
    highlights: [
      "Collaborated with senior developers to build and maintain responsive UIs using React and Tailwind CSS.",
    ],
    responsibilities: [
      "Assisted in debugging and resolving front-end issues, improving performance and UX across key product surfaces.",
      "Participated in daily stand-ups and sprint planning within an Agile workflow, contributing to scope estimation and task breakdown.",
      "Translated Figma designs into pixel-accurate, accessible component implementations.",
      "Wrote unit tests and performed cross-browser QA before each release.",
    ],
    achievements: [
      "Reduced Largest Contentful Paint on the marketing site by ~28% through image optimization and code-splitting.",
      "Shipped a reusable form-validation hook adopted by two other teams.",
    ],
    technologies: ["React", "Tailwind CSS", "Agile", "Git"],
  },
];

/* -------------------- Education -------------------- */
export interface EducationEntry {
  school: string;
  level: string;
  period: string;
  gpa: string;
  /** Institution initials for the logo placeholder. */
  initials: string;
  activities: string[];
  /** Optional coursework. */
  coursework?: string[];
  /** Optional honors / awards. */
  achievements?: string[];
}

export const EducationContent: EducationEntry[] = [
  {
    school: "Kanjirowa National Secondary School",
    level: "Higher Secondary (+2) — Science (Computer Major)",
    period: "2023 – 2025",
    gpa: "3.92 GPA",
    initials: "KN",
    activities: [
      "Participated in hackathons and built numerous projects.",
      "Secured first professional role during studies.",
      "Participated in Model United Nations (MUN) and other leadership events.",
    ],
    coursework: ["Computer Science", "Mathematics", "Physics"],
    achievements: ["Hackathon participant", "MUN delegate"],
  },
  {
    school: "Everest English School",
    level: "School Level (PG – Grade 10)",
    period: "2009 – 2023",
    gpa: "3.90 (SEE)",
    initials: "EE",
    activities: [
      "Built foundation in computer science basics.",
      "Member of Friends of the Zoo (FOZ) and the Red Cross Society.",
    ],
    coursework: ["Computer Basics", "Science", "Mathematics"],
  },
];

/* -------------------- Learning Path -------------------- */
export interface LearningStage {
  stage: string;
  status: string;
  period?: string;
  points: string[];
  /** Optional technologies / topics covered. */
  topics?: string[];
}

export const LearningPathContent: LearningStage[] = [
  {
    stage: "Web Development Fundamentals",
    status: "Starting Point",
    period: "2023 — 2024",
    points: [
      "Mastered semantic HTML5 and modern CSS3 layout techniques.",
      "Gained strong proficiency in core JavaScript (ES6+).",
      "Understood DOM manipulation and browser APIs.",
    ],
    topics: ["HTML5", "CSS3", "JavaScript", "DOM", "Flexbox", "Grid"],
  },
  {
    stage: "React & Frontend Frameworks",
    status: "Present",
    period: "2024 — Now",
    points: [
      "Deep diving into React component architecture and hooks.",
      "Building scalable styling systems with Tailwind CSS.",
      "Implementing static typing across codebases with TypeScript.",
    ],
    topics: ["React", "Hooks", "Tailwind", "TypeScript", "Vite"],
  },
];

/* -------------------- Testimonials -------------------- */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Initials for the avatar circle. */
  initials: string;
  /** Accent tint for the avatar. */
  accentColor: string;
  /** Relationship to Nirvik — shown as a small pill badge in the author area. */
  relationship: string;
  /** Optional LinkedIn profile URL. Renders a LinkedIn icon link when present. */
  linkedin?: string;
  /** Optional verification indicator — renders a checkmark on the avatar. */
  verified?: boolean;
}

export const TestimonialsContent: Testimonial[] = [
  {
    quote:
      "Nirvik has a remarkable ability to grasp complex concepts quickly and translate them into clean, considered interfaces. His instinct for user-centric detail shows up in every PR. A genuine asset to any frontend team.",
    name: "Jane Doe",
    role: "Senior Developer",
    company: "TechCorp",
    initials: "JD",
    accentColor: "#a8c155",
    relationship: "Mentor",
    linkedin: "https://www.linkedin.com/",
    verified: true,
  },
  {
    quote:
      "Working with Nirvik was a pleasure. He's a proactive learner who asks the right questions early, ships consistently, and elevates the work of everyone around him. Rare combination of humility and craft.",
    name: "John Smith",
    role: "Project Manager",
    company: "Innovate LLC",
    initials: "JS",
    accentColor: "#5683c4",
    relationship: "Collaborator",
    linkedin: "https://www.linkedin.com/",
  },
  {
    quote:
      "I was impressed by Nirvik's dedication to quality and his eye for detail. He consistently delivered high-quality work, pushed back on vague specs thoughtfully, and treated accessibility as a baseline, not a nice-to-have.",
    name: "Emily White",
    role: "UI/UX Designer",
    company: "Creative Solutions",
    initials: "EW",
    accentColor: "#d1a83e",
    relationship: "Collaborator",
    linkedin: "https://www.linkedin.com/",
    verified: true,
  },
  {
    quote:
      "Nirvik is a fast learner and a dedicated developer. His enthusiasm for new challenges is matched by the discipline to actually finish them well. He'd be a valuable addition to any engineering team.",
    name: "Michael Brown",
    role: "Lead Instructor",
    company: "Code Academy",
    initials: "MB",
    accentColor: "#b04f86",
    relationship: "Instructor",
  },
];

/* -------------------- CTA -------------------- */
export const CTAContent = {
  heading: "Let's build something great.",
  subtext: "If you have a project that needs some creative touch, let's chat.",
  email: "info.nirvik.dh@gmail.com",
};
