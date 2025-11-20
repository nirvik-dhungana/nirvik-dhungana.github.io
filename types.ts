
import type { ReactElement, ReactNode } from 'react';

// FIX: Add and export the Project interface.
export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  icon: ReactElement;
  url?: string;
  color: string; // Hex code for the brand color
}

// Interface for professional experience or learning journey entries
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: ReactNode[];
  icon: ReactElement;
  logo?: string;
  url?: string;
}

// Interface for education history
export interface Education {
  degree: ReactNode;
  institution: string;
  period: string;
  description: ReactNode[];
  icon: ReactElement;
  logo?: string;
  url?: string;
}

export interface Testimonial {
  quote: ReactNode;
  author: string;
  title: string;
  avatar: string;
}
