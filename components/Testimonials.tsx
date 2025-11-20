import React, { useRef, useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import TestimonialCard from './TestimonialCard';
import { TESTIMONIALS } from '../constants';
import { LuMessageSquare, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const Testimonials: React.FC = () => {
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
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            checkScrollability();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      el.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
      
      return () => {
        el.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="my-24 py-20 bg-white/30 dark:bg-nord0/30 backdrop-blur-3xl relative overflow-hidden rounded-[3rem] border border-white/50 dark:border-nord3/30">
       {/* Background Accents */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-nord15/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
       <div className="absolute bottom-0 right-0 w-64 h-64 bg-nord10/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="px-6 md:px-12 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center mb-12 gap-6 text-center">
            <div className="max-w-3xl">
               <div className="inline-flex items-center justify-center p-3 bg-nord15/10 rounded-2xl mb-4 ring-1 ring-nord15/20 shadow-lg shadow-nord15/10">
                 <LuMessageSquare className="w-6 h-6 text-nord15" />
               </div>
               <h2 className="text-4xl md:text-5xl font-extrabold text-nord0 dark:text-nord6 tracking-tight">
                 Kind <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord15 to-pink-400">Words</span>
               </h2>
               <p className="text-lg text-nord3 dark:text-nord4 mt-2 leading-relaxed">
                  Feedback from co-workers and mentors I've had the pleasure of working with.
               </p>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-3">
               <button
                onClick={() => scroll('left')}
                aria-label="Previous"
                disabled={!canScrollLeft}
                className={`p-4 rounded-full border border-nord4 dark:border-nord3 transition-all duration-300 ${
                  canScrollLeft 
                    ? 'bg-white/80 dark:bg-nord1/80 hover:bg-nord15 hover:text-white hover:border-nord15 text-nord2 dark:text-nord4 shadow-md backdrop-blur-sm' 
                    : 'bg-transparent text-nord4 dark:text-nord2 cursor-not-allowed'
                }`}
              >
                <LuChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next"
                disabled={!canScrollRight}
                className={`p-4 rounded-full border border-nord4 dark:border-nord3 transition-all duration-300 ${
                  canScrollRight 
                    ? 'bg-white/80 dark:bg-nord1/80 hover:bg-nord15 hover:text-white hover:border-nord15 text-nord2 dark:text-nord4 shadow-md backdrop-blur-sm' 
                    : 'bg-transparent text-nord4 dark:text-nord2 cursor-not-allowed'
                }`}
              >
                <LuChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="relative -mx-6 px-6 md:-mx-12 md:px-12">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-12 pt-4 scrollbar-hide"
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="snap-center shrink-0 w-[85%] sm:w-[60%] lg:w-[40%] xl:w-[35%]">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);