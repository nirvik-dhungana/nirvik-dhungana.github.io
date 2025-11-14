import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import {
  FaTerminal,
  FaHome,
  FaUser,
  FaWrench,
  FaBriefcase,
  FaUniversity,
  FaGraduationCap,
  FaCommentDots,
  FaPaperPlane,
} from 'react-icons/fa';
import { GoProject } from 'react-icons/go';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'Home', id: 'hero', icon: <FaHome className="w-4 h-4" /> },
    { href: '#about', label: 'About', id: 'about', icon: <FaUser className="w-4 h-4" /> },
    { href: '#projects', label: 'Projects', id: 'projects', icon: <GoProject className="w-4 h-4" /> },
    { href: '#skills', label: 'Skills', id: 'skills', icon: <FaWrench className="w-4 h-4" /> },
    { href: '#experience', label: 'Experience', id: 'experience', icon: <FaBriefcase className="w-4 h-4" /> },
    { href: '#education', label: 'Education', id: 'education', icon: <FaUniversity className="w-4 h-4" /> },
    { href: '#learning-journey', label: 'Learning', id: 'learning-journey', icon: <FaGraduationCap className="w-4 h-4" /> },
    { href: '#testimonials', label: 'Testimonials', id: 'testimonials', icon: <FaCommentDots className="w-4 h-4" /> },
    { href: '#contact', label: 'Contact', id: 'contact', icon: <FaPaperPlane className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-nord6/80 dark:bg-nord0/80 backdrop-blur-lg sticky top-0 z-50 transition-colors duration-300 border-b border-nord4/50 dark:border-nord1/50">
      <nav className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <a href="#hero" aria-label="Go to homepage" className="flex items-center justify-center p-2 rounded-full bg-nord8/10 text-nord8 hover:bg-nord8/20 hover:text-nord9 dark:text-nord8 dark:hover:text-nord7 transition-all duration-300">
          <FaTerminal className="w-7 h-7" />
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-2 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out ${
                  isActive 
                    ? 'bg-nord8 text-nord0 shadow-md shadow-nord8/30' 
                    : 'text-nord3 dark:text-nord4 hover:bg-nord5 dark:hover:bg-nord2'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            );
          })}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        
        {/* Mobile Nav Button */}
        <div className="lg:hidden flex items-center">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-nord1 dark:text-nord4 ml-4 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <div 
        id="mobile-menu"
        className={`lg:hidden absolute top-full left-0 right-0 bg-nord5/95 dark:bg-nord1/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 shadow-lg' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col items-center">
          {navLinks.map((link) => {
              const isActive = activeSection === link.id;
            return (
              <a 
                key={link.href} 
                href={link.href} 
                className={`flex items-center justify-center gap-2 w-full text-center px-4 py-2 rounded-full text-base font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'bg-nord8 text-nord0 shadow-md' 
                    : 'text-nord1 dark:text-nord4 hover:bg-nord4 dark:hover:bg-nord3'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;