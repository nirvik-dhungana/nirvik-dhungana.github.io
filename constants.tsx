
import React from 'react';
import type { Skill, Experience, Testimonial, Education } from './types';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaFigma,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaLaptopCode,
  FaBullhorn,
  FaBrain,
  FaLinux,
  FaPenNib,
  FaExternalLinkAlt,
  FaBriefcase,
  FaUniversity,
  FaInfinity,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGooglegemini,
  SiGoogleads,
  SiMeta,
  SiVite,
  SiFirebase,
  SiJest,
} from 'react-icons/si';

// --- SKILLS ---
export const SKILLS: { [key: string]: Skill[] } = {
  'Frontend': [
    { name: 'React', icon: <FaReact className="w-5 h-5 text-nord8" />, url: 'https://react.dev/' },
    { name: 'TypeScript', icon: <SiTypescript className="w-5 h-5 text-nord8" />, url: 'https://www.typescriptlang.org/' },
    { name: 'JavaScript', icon: <SiJavascript className="w-5 h-5 text-nord8" />, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5 text-nord8" />, url: 'https://tailwindcss.com/' },
    { name: 'Vite', icon: <SiVite className="w-5 h-5 text-nord8" />, url: 'https://vitejs.dev/' },
  ],
  'Backend': [
    { name: 'Node.js', icon: <FaNodeJs className="w-5 h-5 text-nord8" />, url: 'https://nodejs.org/' },
    { name: 'Express', icon: <SiExpress className="w-5 h-5 text-nord8" />, url: 'https://expressjs.com/' },
    { name: 'MongoDB', icon: <SiMongodb className="w-5 h-5 text-nord8" />, url: 'https://www.mongodb.com/' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-5 h-5 text-nord8" />, url: 'https://www.postgresql.org/' },
    { name: 'Firebase', icon: <SiFirebase className="w-5 h-5 text-nord8" />, url: 'https://firebase.google.com/' },
  ],
  'Tools & Others': [
    { name: 'Git & GitHub', icon: <FaGithub className="w-5 h-5 text-nord8" />, url: 'https://git-scm.com/' },
    { name: 'Docker', icon: <FaDocker className="w-5 h-5 text-nord8" />, url: 'https://www.docker.com/' },
    { name: 'Figma', icon: <FaFigma className="w-5 h-5 text-nord8" />, url: 'https://www.figma.com/' },
    { name: 'Gemini API', icon: <SiGooglegemini className="w-5 h-5 text-nord8" />, url: 'https://ai.google.dev/' },
    { name: 'Jest', icon: <SiJest className="w-5 h-5 text-nord8" />, url: 'https://jestjs.io/' },
    { name: 'CI/CD', icon: <FaInfinity className="w-5 h-5 text-nord8" /> },
    { name: 'AI Prompting', icon: <FaBrain className="w-5 h-5 text-nord8" /> },
    { name: 'Linux', icon: <FaLinux className="w-5 h-5 text-nord8" />, url: 'https://www.linux.org/' },
  ],
  'Digital Marketing & Content': [
    { name: 'Digital Marketing', icon: <FaBullhorn className="w-5 h-5 text-nord8" /> },
    { name: 'Google Ads', icon: <SiGoogleads className="w-5 h-5 text-nord8" /> },
    { name: 'Meta Ads', icon: <SiMeta className="w-5 h-5 text-nord8" /> },
    { name: 'Content Creation', icon: <FaPenNib className="w-5 h-5 text-nord8" /> },
  ],
};

// --- PROFESSIONAL EXPERIENCE ---
export const PROFESSIONAL_EXPERIENCE: Experience[] = [
  {
    role: 'Frontend Developer Intern',
    company: 'Innovate Solutions',
    period: 'Summer 2023',
    description: [
      'Collaborated with senior developers to build and maintain responsive user interfaces for client websites using React and Tailwind CSS.',
      'Assisted in debugging and resolving front-end issues, improving website performance and user experience.',
      'Participated in daily stand-ups and sprint planning meetings, gaining valuable insight into the Agile development lifecycle.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-nord13" />,
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
      'Specialized in advanced computer science, physics, and mathematics, achieving a final GPA of 3.92.',
      'Actively participated in hackathons and built numerous projects, gaining hands-on development experience.',
      'Secured my first professional role during my studies, applying academic knowledge in a real-world environment.',
      'Developed leadership and public speaking skills through participation in Model United Nations (MUN) and other events.',
    ],
    icon: <FaUniversity className="w-6 h-6 text-nord13" />,
    logo: 'https://res.cloudinary.com/dxt7szquk/image/upload/v1763126619/kanji_iciikj.png',
    url: 'https://www.kanjisl.edu.np/',
  },
  {
    degree: 'School Level (PG - Grade 10)',
    institution: 'Everest English School',
    period: '2009 - 2023',
    description: [
      'Graduated with a GPA of 3.90 in the Secondary Education Examination (SEE).',
      'Built a strong foundation in computer science basics, which sparked my passion for coding.',
      'Engaged actively in extracurriculars as a member of Friends of the Zoo (FOZ) and the Red Cross Society.',
      'Consistently participated in school clubs and events, developing teamwork and communication skills.',
    ],
    icon: <FaUniversity className="w-6 h-6 text-nord13" />,
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
      'Diving deep into the React ecosystem, including hooks, context, and component-based architecture.',
      'Building personal projects to apply React concepts in a real-world setting.',
      'Exploring UI libraries like Tailwind CSS to create modern and responsive designs.',
    ],
    icon: <FaReact className="w-6 h-6 text-nord13" />,
  },
  {
    role: 'Web Development Fundamentals',
    company: 'Online Courses & Tutorials',
    period: 'Starting Point',
    description: [
      'Mastered the core concepts of HTML5, CSS3, and JavaScript (ES6+).',
      'Developed a solid understanding of responsive design and cross-browser compatibility.',
      'Gained experience with version control using Git and GitHub for project management.',
    ],
    icon: <FaLaptopCode className="w-6 h-6 text-nord13" />,
  },
];

// --- TESTIMONIALS ---
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Nirvik has a remarkable ability to grasp complex concepts quickly and apply them effectively. His passion for clean code and user-centric design is evident in all his work. A true asset to any development team.",
    author: "Jane Doe",
    title: "Senior Developer, TechCorp",
    avatar: "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762429452/avatar1_j5h3g4.jpg",
  },
  {
    quote: "Working with Nirvik was a pleasure. He's a proactive learner, always seeking feedback and pushing the boundaries of his knowledge. His positive attitude and collaborative spirit make him a joy to work with.",
    author: "John Smith",
    title: "Project Manager, Innovate LLC",
    avatar: "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762429452/avatar2_z7x2df.jpg",
  },
  {
    quote: "I was impressed by Nirvik's dedication to quality and his keen eye for detail. He consistently delivered high-quality work and was always eager to take on new challenges. He has a bright future ahead of him.",
    author: "Emily White",
    title: "UI/UX Designer, Creative Solutions",
    avatar: "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_100/v1762429452/avatar3_d2xqfq.jpg",
  },
  {
    quote: "Nirvik is a fast learner and a dedicated developer. His enthusiasm for tackling new challenges and his collaborative approach make him a valuable team member. I'm excited to see his growth in the field.",
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

// FIX: Export icon components for use in ProjectCard.
export { FaGithub as GithubIcon, FaExternalLinkAlt as ExternalLinkIcon };
