import React from 'react';
import { SOCIAL_LINKS, GithubIcon, LinkedinIcon, TwitterIcon } from '../constants';

interface FooterProps {
  onPrivacyPolicyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyPolicyClick }) => {
  return (
    <footer className="bg-white/40 dark:bg-nord0/40 backdrop-blur-2xl border-t border-nord4/50 dark:border-nord3/50 mt-24 relative overflow-hidden">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-nord4/30 dark:to-nord1/30 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                
                {/* Brand Area */}
                <div className="text-center md:text-left space-y-2">
                    <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-nord10 to-nord8">
                        Nirvik Dhungana
                    </h3>
                    <p className="text-nord3 dark:text-nord4 text-sm font-medium">
                        Crafting exceptional digital experiences with code.
                    </p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4 bg-white/50 dark:bg-nord1/50 p-2 rounded-full border border-nord4/50 dark:border-nord3/50 shadow-sm">
                    <a 
                        href={SOCIAL_LINKS.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="GitHub"
                        className="p-2.5 text-nord3 dark:text-nord4 hover:text-white hover:bg-nord0 dark:hover:bg-nord8 hover:scale-110 rounded-full transition-all duration-300"
                    >
                        <GithubIcon className="w-5 h-5" />
                    </a>
                    <a 
                        href={SOCIAL_LINKS.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="LinkedIn"
                        className="p-2.5 text-nord3 dark:text-nord4 hover:text-white hover:bg-[#0077b5] hover:scale-110 rounded-full transition-all duration-300"
                    >
                        <LinkedinIcon className="w-5 h-5" />
                    </a>
                     <a 
                        href={SOCIAL_LINKS.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Twitter"
                        className="p-2.5 text-nord3 dark:text-nord4 hover:text-white hover:bg-black dark:hover:bg-black hover:scale-110 rounded-full transition-all duration-300"
                    >
                        <TwitterIcon className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-nord4/40 dark:border-nord3/40 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-nord3/60 dark:text-nord4/60">
                <p>&copy; {new Date().getFullYear()} Nirvik Dhungana. All Rights Reserved.</p>
                
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                    <button 
                        onClick={onPrivacyPolicyClick} 
                        className="hover:text-nord10 dark:hover:text-nord8 transition-colors"
                    >
                        Privacy Policy
                    </button>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span>Built with React & Tailwind</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;