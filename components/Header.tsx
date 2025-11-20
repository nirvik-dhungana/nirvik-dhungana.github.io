import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import {
  LuTerminal,
  LuHome,
  LuUser,
  LuWrench,
  LuBriefcase,
  LuSchool,
  LuGraduationCap,
  LuMessageSquare,
  LuSend,
  LuProjector,
} from 'react-icons/lu';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Handle Header Background
          setScrolled(window.scrollY > 10);

          // Handle Progress Bar
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          setScrollProgress(scrolled);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home', id: 'hero', icon: <LuHome className="w-4 h-4" /> },
    { href: '#about', label: 'About', id: 'about', icon: <LuUser className="w-4 h-4" /> },
    { href: '#projects', label: 'Projects', id: 'projects', icon: <LuProjector className="w-4 h-4" /> },
    { href: '#skills', label: 'Skills', id: 'skills', icon: <LuWrench className="w-4 h-4" /> },
    { href: '#experience', label: 'Exp.', id: 'experience', icon: <LuBriefcase className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? 'py-0 bg-nord6/80 dark:bg-nord0/80 backdrop-blur-md border-b border-nord4/50 dark:border-nord2/50 shadow-sm' 
          : 'py-4 bg-transparent'
      }`}
      style={{ '--header-height': '64px' } as React.CSSProperties}
    >
      <div className={`mx-auto max-w-7xl transition-all duration-300 px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Area */}
          <a 
            href="#hero" 
            aria-label="Go to homepage" 
            className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-nord8 to-nord10 text-white shadow-lg shadow-nord8/20 hover:shadow-nord8/40 transition-all duration-300 hover:scale-105 hover:-rotate-3"
          >
            <LuTerminal className="w-6 h-6" />
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <ul className="flex space-x-1 bg-white/50 dark:bg-nord1/50 backdrop-blur-md rounded-full px-2 py-1.5 border border-nord4/30 dark:border-nord3/30 shadow-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out group ${
                        isActive 
                          ? 'text-nord10 dark:text-nord8 bg-white dark:bg-nord2 shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                          : 'text-nord3 dark:text-nord4 hover:text-nord10 dark:hover:text-nord8 hover:bg-nord4/30 dark:hover:bg-nord3/30'
                      }`}
                    >
                      <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Mobile Nav Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-nord1 dark:text-nord4 focus:outline-none p-2.5 rounded-xl hover:bg-nord4 dark:hover:bg-nord2 transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-px' : ''}`} />
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-px' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-nord8 via-nord9 to-nord10 shadow-[0_0_10px_rgba(136,192,208,0.5)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Nav Menu */}
      <div 
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-[calc(var(--header-height,64px))] bg-nord6 dark:bg-nord0 border-b border-nord4/50 dark:border-nord2/50 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-40 origin-top ${
          isOpen ? 'max-h-[85vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >
        <div className="px-4 py-6 space-y-2 overflow-y-auto max-h-[80vh] scrollbar-hide">
          {[
            ...navLinks, 
            { href: '#education', label: 'Education', id: 'education', icon: <LuSchool className="w-4 h-4" /> },
            { href: '#learning-journey', label: 'Learning', id: 'learning-journey', icon: <LuGraduationCap className="w-4 h-4" /> },
            { href: '#testimonials', label: 'Testimonials', id: 'testimonials', icon: <LuMessageSquare className="w-4 h-4" /> },
            { href: '#contact', label: 'Contact', id: 'contact', icon: <LuSend className="w-4 h-4" /> }
          ].map((link) => {
              const isActive = activeSection === link.id;
            return (
              <a 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-nord8/10 text-nord10 dark:text-nord8 border border-nord8/20 shadow-sm' 
                    : 'text-nord2 dark:text-nord4 hover:bg-nord4/50 dark:hover:bg-nord2/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className={`p-2 rounded-lg ${isActive ? 'bg-nord10 dark:bg-nord8 text-white dark:text-nord0' : 'bg-nord4 dark:bg-nord3 text-nord1 dark:text-nord5'}`}>
                    {link.icon}
                </span>
                <span>{link.label}</span>
                {isActive && <span className="ml-auto w-2 h-2 bg-nord10 dark:bg-nord8 rounded-full animate-pulse"></span>}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;