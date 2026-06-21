import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PersonalInfo } from '../data/content';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const newIsScrolled = window.scrollY > 50;
      setIsScrolled(prev => prev !== newIsScrolled ? newIsScrolled : prev);

      // Simple active section detection
      const sections = navLinks.map(link => link.name.toLowerCase());
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(prev => prev !== current ? current : prev);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount
    onScroll();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`absolute md:fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'md:bg-bg-1/70 md:backdrop-blur-md md:border-b md:border-bg-3/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative flex items-center justify-center w-10 h-10 group">
            <div className="absolute inset-0 bg-accent/10 rounded-sm transform transition-transform group-hover:scale-110 group-hover:rotate-3" />
            <span className="relative font-display font-bold text-lg text-accent tracking-tighter">
              {PersonalInfo.initials}
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-accent group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(link.name.toLowerCase());
                  }}
                >
                  <span className={`relative z-10 ${isActive ? 'text-accent' : 'text-fg-dim group-hover:text-fg-bright'}`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-accent rounded-t-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
             <a
              href="#contact"
              className="px-5 py-2.5 bg-accent hover:bg-fg-bright text-bg-base transition-colors duration-300 rounded-full text-sm font-semibold whitespace-nowrap"
               onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
              Let&apos;s Talk
            </a>
            {/* TODO: place actual resume.pdf in /public — this file does not exist yet. */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-transparent border border-bg-3 hover:border-accent text-fg-bright hover:text-accent transition-colors duration-300 rounded-full text-sm font-semibold whitespace-nowrap"
            >
              Resume
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden fixed top-5 right-6 z-50 p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-bg-1/80 backdrop-blur-md border border-bg-3/40 text-fg-bright shadow-[0_4px_16px_rgba(0,0,0,0.1)]' 
                : 'bg-transparent text-fg-dim hover:text-fg-bright'
            }`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg-base flex flex-col justify-center px-8"
          >
            <button
              className="absolute top-6 right-6 p-2 text-fg-dim hover:text-fg-bright"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="font-display text-4xl font-semibold text-fg hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-8 flex flex-col gap-4"
              >
                <a
                    href="#contact"
                    className="text-xl font-medium text-accent hover:text-fg-bright transition-colors w-fit"
                     onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                >
                  Let&apos;s Talk &rarr;
                </a>
                {/* TODO: place actual resume.pdf in /public — this file does not exist yet. */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium text-fg hover:text-accent transition-colors w-fit"
                >
                  Download Resume &rarr;
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
