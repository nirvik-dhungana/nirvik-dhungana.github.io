import React, { useState, useEffect, Suspense, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components below the fold to improve initial load time
const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Education = React.lazy(() => import('./components/Education'));
const LearningJourney = React.lazy(() => import('./components/LearningJourney'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Contact = React.lazy(() => import('./components/Contact'));

// Define gtag on the window object to avoid TypeScript errors
declare global {
  interface Window {
    gtag: (command: string, action: string, params: { [key: string]: string }) => void;
  }
}

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')!;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && !localStorage.getItem('cookie_consent')) {
      const timer = setTimeout(() => {
        setShowCookieConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowCookieConsent(false);
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted'
      });
    }
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowCookieConsent(false);
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied'
      });
    }
  };

  const handlePrivacyPolicyClick = () => {
    setShowPrivacyModal(true);
  };

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleSmoothScroll = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) { 
          event.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    if (sectionElements.length === 0) return;

    let sectionData = sectionElements.map(el => ({
      id: el.id,
      offsetTop: el.offsetTop,
      offsetHeight: el.offsetHeight
    }));

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 3;
          let currentSection = sectionData[0]?.id || 'hero';

          for (const section of sectionData) {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
              currentSection = section.id;
              break;
            }
          }

          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSection = sectionData[sectionData.length - 1]?.id || 'contact';
          }
          
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      sectionData = sectionElements.map(el => ({
        id: el.id,
        offsetTop: el.offsetTop,
        offsetHeight: el.offsetHeight
      }));
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-nord6 text-nord1 font-sans antialiased dark:bg-nord0 dark:text-nord4 transition-colors duration-300 overflow-hidden selection:bg-nord8/30 selection:text-nord10 dark:selection:text-nord6">
      {/* Ambient Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[45rem] h-[45rem] bg-nord8/20 dark:bg-nord8/10 rounded-full mix-blend-multiply filter blur-[130px] opacity-40 animate-blob"></div>
         <div className="absolute top-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-nord9/20 dark:bg-nord9/10 rounded-full mix-blend-multiply filter blur-[130px] opacity-40 animate-blob [animation-delay:2s]"></div>
         <div className="absolute -bottom-32 left-[20%] w-[45rem] h-[45rem] bg-nord10/20 dark:bg-nord10/10 rounded-full mix-blend-multiply filter blur-[130px] opacity-40 animate-blob [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
        <main className="container mx-auto px-4 sm:px-6 md:px-12 pb-24 space-y-12 sm:space-y-24">
          {/* Hero is eager loaded for fast LCP */}
          <Hero />
          
          {/* Lazy load the rest of the content */}
          <Suspense fallback={<LoadingSpinner />}>
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Education />
            <LearningJourney />
            <Testimonials />
            <Contact />
          </Suspense>
        </main>
        <Footer onPrivacyPolicyClick={handlePrivacyPolicyClick} />
      </div>
      
      <ScrollToTopButton />
      {showCookieConsent && (
        <CookieConsent 
          onAccept={handleAcceptCookies} 
          onDecline={handleDeclineCookies}
          onPrivacyPolicyClick={handlePrivacyPolicyClick}
        />
      )}
      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </div>
  );
};

export default App;