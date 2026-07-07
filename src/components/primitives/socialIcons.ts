import { Github, Linkedin, Twitter, Gitlab, Code2, Terminal, type LucideIcon } from "lucide-react";
import type { SocialLink } from "../../data/content";

/**
 * Maps a SocialLink.key to its Lucide icon. Centralized so Hero + Contact
 * stay perfectly in sync.
 */
export const socialIconMap: Record<SocialLink["key"], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  gitlab: Gitlab,
  leetcode: Code2,
  freecodecamp: Terminal,
};
