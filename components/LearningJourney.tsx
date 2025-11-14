import React, { useRef, useState, useEffect } from 'react';
import { LEARNING_JOURNEY } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { FaGraduationCap, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LearningJourney: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = carouselRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0 && hasOverflow);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1 && hasOverflow);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability, { passive: true });
      
      const observer = new MutationObserver(checkScrollability);
      observer.observe(el, { childList: true, subtree: true });

      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
        observer.disconnect();
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.85 : clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="learning-journey" className="my-16 py-20 md:py-32 bg-nord5 dark:bg-nord1 bg-dots-light dark:bg-dots-dark rounded-3xl shadow-2xl shadow-nord3/20 dark:shadow-black/20">
      <div className="px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3">
              <FaGraduationCap className="w-8 h-8 text-nord13" />
              <h2 className="text-3xl md:text-4xl font-bold text-nord1 dark:text-nord6">Learning Path</h2>
            </div>
            <p className="text-lg text-nord3 dark:text-nord4 mt-4">An overview of my progress and milestones.</p>
            <div className="w-16 h-1 bg-nord13 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden max-w-3xl mx-auto relative group">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory space-x-6 py-4 -mx-6 px-6 scrollbar-hide"
            >
              {LEARNING_JOURNEY.map((item, index) => (
                <div key={index} className="snap-center shrink-0 w-[90%] sm:w-[80%]">
                  <div className="bg-nord6 dark:bg-nord2 p-6 rounded-lg shadow-xl shadow-nord3/20 dark:shadow-black/20 h-full transform transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex flex-col items-start mb-2">
                      <h3 className="text-xl font-bold text-nord1 dark:text-nord6">{item.role}</h3>
                      <span className="text-nord13 text-sm font-semibold mt-1">{item.period}</span>
                    </div>
                    <p className="text-nord3 dark:text-nord4 mb-4 font-medium">{item.company}</p>
                    <h4 className="font-semibold text-nord2 dark:text-nord5 mb-2 mt-4">Key Milestones:</h4>
                    <ul className="list-disc list-inside text-nord3 dark:text-nord4 space-y-2">
                      {item.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => scroll('left')}
              aria-label="Previous learning entry"
              className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 p-3 bg-nord6/60 dark:bg-nord1/60 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                canScrollLeft ? 'hover:bg-nord8 hover:text-nord0' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              aria-label="Next learning entry"
              className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 p-3 bg-nord6/60 dark:bg-nord1/60 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                canScrollRight ? 'hover:bg-nord8 hover:text-nord0' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block max-w-3xl mx-auto">
            <div className="relative border-l-2 border-nord4 dark:border-nord3">
              {LEARNING_JOURNEY.map((job, index) => (
                <AnimatedSection key={index}>
                  <div className="mb-12 ml-12">
                    <div className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-nord6 dark:bg-nord0 rounded-full ring-4 ring-nord5 dark:ring-nord1">
                      {job.icon}
                    </div>
                    <div className="bg-nord6 dark:bg-nord2 p-6 rounded-lg shadow-xl shadow-nord3/20 dark:shadow-black/20 transform transition-transform duration-300 hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <h3 className="text-xl font-bold text-nord1 dark:text-nord6">{job.role}</h3>
                        <span className="text-nord13 text-sm font-semibold mt-1 md:mt-0">{job.period}</span>
                      </div>
                      <p className="text-nord3 dark:text-nord4 mb-4 font-medium">{job.company}</p>
                      <h4 className="font-semibold text-nord2 dark:text-nord5 mb-2 mt-4">Key Milestones:</h4>
                      <ul className="list-disc list-inside text-nord3 dark:text-nord4 space-y-2">
                        {job.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LearningJourney;