import React from 'react';
import type { Skill, Experience, Testimonial, Education } from './types';
import {
  LuGithub,
  LuLinkedin,
  LuTwitter,
  LuMail,
  LuExternalLink,
  LuCode,
  LuTerminal,
  LuBriefcase,
  LuGraduationCap,
  LuQuote,
  LuUser,
  LuLightbulb,
  LuRocket,
  LuFolderGit2,
  LuCpu,
  LuLayers,
  LuCheckCircle,
  LuChevronUp,
  LuMoon,
  LuSun,
  LuX,
  LuSchool,
  LuMegaphone,
  LuBrain,
  LuInfinity,
  LuPenTool,
} from 'react-icons/lu';

// --- SKILLS ---
export const SKILLS: { [key: string]: Skill[] } = {
  'Frontend': [
    { 
      name: 'React', 
      icon: <img src="https://cdn.simpleicons.org/react" alt="React" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://react.dev/', 
      color: '#61DAFB' 
    },
    { 
      name: 'TypeScript', 
      icon: <img src="https://cdn.simpleicons.org/typescript" alt="TypeScript" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://www.typescriptlang.org/', 
      color: '#3178C6' 
    },
    { 
      name: 'JavaScript', 
      icon: <img src="https://cdn.simpleicons.org/javascript" alt="JavaScript" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 
      color: '#F7DF1E' 
    },
    { 
      name: 'Tailwind CSS', 
      icon: <img src="https://cdn.simpleicons.org/tailwindcss" alt="Tailwind CSS" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://tailwindcss.com/', 
      color: '#06B6D4' 
    },
    { 
      name: 'Vite', 
      icon: <img src="https://cdn.simpleicons.org/vite" alt="Vite" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://vitejs.dev/', 
      color: '#646CFF' 
    },
  ],
  'Backend': [
    { 
      name: 'Node.js', 
      icon: <img src="https://cdn.simpleicons.org/nodedotjs" alt="Node.js" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://nodejs.org/', 
      color: '#339933' 
    },
    { 
      name: 'Express', 
      icon: <img src="https://cdn.simpleicons.org/express/gray" alt="Express" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://expressjs.com/', 
      color: '#000000' 
    },
    { 
      name: 'MongoDB', 
      icon: <img src="https://cdn.simpleicons.org/mongodb" alt="MongoDB" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://www.mongodb.com/', 
      color: '#47A248' 
    },
    { 
      name: 'PostgreSQL', 
      icon: <img src="https://cdn.simpleicons.org/postgresql" alt="PostgreSQL" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://www.postgresql.org/', 
      color: '#4169E1' 
    },
    { 
      name: 'Firebase', 
      icon: <img src="https://cdn.simpleicons.org/firebase" alt="Firebase" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://firebase.google.com/', 
      color: '#FFCA28' 
    },
  ],
  'Tools & Others': [
    { 
      name: 'Git', 
      icon: <img src="https://cdn.simpleicons.org/git" alt="Git" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://git-scm.com/', 
      color: '#F05032' 
    },
    { 
      name: 'Docker', 
      icon: <img src="https://cdn.simpleicons.org/docker" alt="Docker" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://www.docker.com/', 
      color: '#2496ED' 
    },
    { 
      name: 'Figma', 
      icon: <img src="https://cdn.simpleicons.org/figma" alt="Figma" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://www.figma.com/', 
      color: '#F24E1E' 
    },
    { 
      name: 'Gemini API', 
      icon: <img src="https://cdn.simpleicons.org/googlegemini" alt="Gemini API" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://ai.google.dev/', 
      color: '#8E75B2' 
    },
    { 
      name: 'Jest', 
      icon: <img src="https://cdn.simpleicons.org/jest" alt="Jest" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://jestjs.io/', 
      color: '#C21325' 
    },
    { 
      name: 'CI/CD', 
      icon: <LuInfinity />, 
      color: '#4C566A' 
    },
    { 
      name: 'Linux', 
      icon: <img src="https://cdn.simpleicons.org/linux" alt="Linux" loading="lazy" decoding="async" width="24" height="24" />, 
      url: 'https://www.linux.org/', 
      color: '#FCC624' 
    },
    { 
      name: 'AI Prompting', 
      icon: <LuBrain />, 
      color: '#FF69B4' 
    },
  ],
  'Digital Marketing & Content': [
    { 
      name: 'Digital Marketing', 
      icon: <LuMegaphone />, 
      color: '#FF5722' 
    },
    { 
      name: 'Google Ads', 
      icon: <img src="https://cdn.simpleicons.org/googleads" alt="Google Ads" loading="lazy" decoding="async" width="24" height="24" />, 
      color: '#4285F4' 
    },
    { 
      name: 'Meta Ads', 
      icon: <img src="https://cdn.simpleicons.org/meta" alt="Meta Ads" loading="lazy" decoding="async" width="24" height="24" />, 
      color: '#0668E1' 
    },
    { 
      name: 'Content Creation', 
      icon: <LuPenTool />, 
      color: '#DA1F26' 
    },
  ],
};

// --- PROFESSIONAL EXPERIENCE ---
export const PROFESSIONAL_EXPERIENCE: Experience[] = [
  {
    role: 'Frontend Developer Intern',
    company: 'Innovate Solutions',
    period: 'Summer 2023',
    description: [
      <>Collaborated with senior developers to build and maintain <strong className="text-nord1 dark:text-nord5">responsive user interfaces</strong> for client websites using <strong className="text-nord10 dark:text-nord8">React</strong> and <strong className="text-nord10 dark:text-nord8">Tailwind CSS</strong>.</>,
      <>Assisted in debugging and resolving <span className="italic">front-end issues</span>, significantly improving website <strong className="text-nord1 dark:text-nord5">performance</strong> and user experience.</>,
      <>Participated in daily stand-ups and sprint planning meetings, gaining valuable insight into the <strong className="text-nord1 dark:text-nord5">Agile development lifecycle</strong>.</>,
    ],
    icon: <LuBriefcase className="w-6 h-6 text-nord13" />,
    logo: 'https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762432987/innovate-logo_c1v2qg.png',
    url: 'https://example.com',
  },
];

// --- EDUCATION ---
export const EDUCATION: Education[] = [
  {
    degree: (
      <>
        Higher Secondary (+2)
        <br />
        <span className="text-lg font-medium text-nord3 dark:text-nord4">
          Science (Computer Major)
        </span>
      </>
    ),
    institution: 'Kanjirowa National Secondary School',
    period: '2023 - 2025',
    description: [
      <>Specialized in advanced computer science, physics, and mathematics, achieving a <strong className="text-nord10 dark:text-nord8">final GPA of 3.92</strong>.</>,
      <>Actively participated in <strong className="text-nord1 dark:text-nord5">hackathons</strong> and built numerous projects, gaining hands-on development experience.</>,
      <>Secured my <strong className="text-nord1 dark:text-nord5">first professional role</strong> during my studies, applying academic knowledge in a real-world environment.</>,
      <>Developed leadership and public speaking skills through participation in <strong className="text-nord10 dark:text-nord8">Model United Nations (MUN)</strong> and other events.</>,
    ],
    icon: <LuSchool className="w-6 h-6 text-nord13" />,
    logo: 'https://res.cloudinary.com/dxt7szquk/image/upload/v1763126619/kanji_iciikj.png',
    url: 'https://www.kanjisl.edu.np/',
  },
  {
    degree: 'School Level (PG - Grade 10)',
    institution: 'Everest English School',
    period: '2009 - 2023',
    description: [
      <>Graduated with a <strong className="text-nord10 dark:text-nord8">GPA of 3.90</strong> in the Secondary Education Examination (SEE).</>,
      <>Built a strong foundation in <strong className="text-nord1 dark:text-nord5">computer science basics</strong>, which sparked my passion for coding.</>,
      <>Engaged actively in extracurriculars as a member of <strong className="text-nord1 dark:text-nord5">Friends of the Zoo (FOZ)</strong> and the Red Cross Society.</>,
      <>Consistently participated in school clubs and events, developing <span className="italic">teamwork</span> and <span className="italic">communication skills</span>.</>,
    ],
    icon: <LuSchool className="w-6 h-6 text-nord13" />,
    logo: 'https://res.cloudinary.com/dxt7szquk/image/upload/v1763126438/everest_g04fzq.png',
    url: 'https://everestenglishschool.edu.np/',
  },
];

// --- LEARNING JOURNEY ---
export const LEARNING_JOURNEY: Experience[] = [
  {
    role: 'Learning React & Frontend Frameworks',
    company: 'Self-Directed Learning',
    period: 'Present',
    description: [
      <>Diving deep into the <strong className="text-nord10 dark:text-nord8">React ecosystem</strong>, including <strong className="text-nord1 dark:text-nord5">hooks, context</strong>, and component-based architecture.</>,
      <>Building personal projects to apply React concepts in a <span className="italic">real-world setting</span>.</>,
      <>Exploring UI libraries like <strong className="text-nord10 dark:text-nord8">Tailwind CSS</strong> to create modern and responsive designs.</>,
    ],
    icon: <img src="https://cdn.simpleicons.org/react" alt="React" className="w-6 h-6" loading="lazy" decoding="async" width="24" height="24" />,
  },
  {
    role: 'Web Development Fundamentals',
    company: 'Online Courses & Tutorials',
    period: 'Starting Point',
    description: [
      <>Mastered the core concepts of <strong className="text-nord10 dark:text-nord8">HTML5, CSS3, and JavaScript (ES6+)</strong>.</>,
      <>Developed a solid understanding of <strong className="text-nord1 dark:text-nord5">responsive design</strong> and cross-browser compatibility.</>,
      <>Gained experience with version control using <strong className="text-nord1 dark:text-nord5">Git and GitHub</strong> for project management.</>,
    ],
    icon: <LuCode className="w-6 h-6 text-nord13" />,
  },
];

// --- TESTIMONIALS ---
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: <>Nirvik has a remarkable ability to <strong className="text-nord10 dark:text-nord8">grasp complex concepts quickly</strong> and apply them effectively. His passion for <strong className="text-nord1 dark:text-nord5">clean code</strong> and user-centric design is evident in all his work. A true asset to any development team.</>,
    author: "Jane Doe",
    title: "Senior Developer, TechCorp",
    avatar: "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762429452/avatar1_j5h3g4.jpg",
  },
  {
    quote: <>Working with Nirvik was a pleasure. He's a <strong className="text-nord1 dark:text-nord5">proactive learner</strong>, always seeking feedback and pushing the boundaries of his knowledge. His <span className="italic">positive attitude</span> and collaborative spirit make him a joy to work with.</>,
    author: "John Smith",
    title: "Project Manager, Innovate LLC",
    avatar: "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762429452/avatar2_z7x2df.jpg",
  },
  {
    quote: <>I was impressed by Nirvik's dedication to quality and his <strong className="text-nord1 dark:text-nord5">keen eye for detail</strong>. He consistently delivered high-quality work and was always eager to take on new challenges. He has a <strong className="text-nord10 dark:text-nord8">bright future</strong> ahead of him.</>,
    author: "Emily White",
    title: "UI/UX Designer, Creative Solutions",
    avatar: "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762429452/avatar3_d2xqfq.jpg",
  },
  {
    quote: <>Nirvik is a <strong className="text-nord10 dark:text-nord8">fast learner</strong> and a dedicated developer. His enthusiasm for tackling new challenges and his <strong className="text-nord1 dark:text-nord5">collaborative approach</strong> make him a valuable team member.</>,
    author: "Michael Brown",
    title: "Lead Instructor, Code Academy",
    avatar: "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762429453/avatar4_s9f8gh.jpg",
  },
];


// --- SOCIAL LINKS ---
export const SOCIAL_LINKS = {
  github: 'https://github.com/nirvik-dhungana',
  linkedin: 'https://www.linkedin.com/in/nirvik-dhungana/',
  twitter: 'https://x.com/Dhungana_Nirvik',
  email: 'info.nirvik.dh@gmail.com',
};

// Export icons for usage in other components
export { 
  LuGithub as GithubIcon, 
  LuLinkedin as LinkedinIcon, 
  LuTwitter as TwitterIcon, 
  LuExternalLink as ExternalLinkIcon,
  LuCode,
  LuTerminal,
  LuBriefcase,
  LuGraduationCap,
  LuQuote,
  LuUser,
  LuLightbulb,
  LuRocket,
  LuFolderGit2,
  LuCpu,
  LuLayers,
  LuCheckCircle,
  LuChevronUp,
  LuMoon,
  LuSun,
  LuX,
  LuSchool,
  LuMail,
  LuMegaphone,
  LuBrain,
  LuInfinity,
  LuPenTool,
};