import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import LearningJourney from './components/LearningJourney';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import Testimonials from './components/Testimonials';

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
      // Use a timeout to avoid layout shift and let the main content load first
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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // JS-based smooth scrolling for anchor links
  useEffect(() => {
    const handleSmoothScroll = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        // Ensure it's a link to a section, not just "#"
        if (href && href.length > 1) { 
          event.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            // Calculate position, accounting for the sticky header
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
    // FIX: Cast querySelectorAll result to HTMLElement[] to access offset properties.
    const sectionElements = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    if (sectionElements.length === 0) return;

    let sectionData = sectionElements.map(el => ({
      id: el.id,
      offsetTop: el.offsetTop,
      offsetHeight: el.offsetHeight
    }));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2.5;
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
    
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-nord6 text-nord1 font-sans antialiased dark:bg-nord0 dark:text-nord4 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
      <main className="container mx-auto px-6 md:px-12">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <LearningJourney />
        <Testimonials />
        <Contact />
      </main>
      <Footer onPrivacyPolicyClick={handlePrivacyPolicyClick} />
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
