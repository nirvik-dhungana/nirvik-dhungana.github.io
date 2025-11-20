import React, { useState, useEffect } from 'react';
import { LuChevronUp } from 'react-icons/lu';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 bg-nord8/80 backdrop-blur-md text-nord6 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-nord9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nord6 dark:focus:ring-offset-nord0 focus:ring-nord8 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <LuChevronUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollToTopButton;