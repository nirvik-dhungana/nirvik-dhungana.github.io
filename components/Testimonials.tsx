import React, { useRef, useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import TestimonialCard from './TestimonialCard';
import { TESTIMONIALS } from '../constants';
import { FaCommentDots, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability, { passive: true });
      
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
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
    <section id="testimonials" className="my-16 py-20 md:py-32 bg-nord5 dark:bg-nord1 bg-dots-light dark:bg-dots-dark rounded-3xl shadow-2xl shadow-nord3/20 dark:shadow-black/20">
      <div className="px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3">
              <FaCommentDots className="w-8 h-8 text-nord13" />
              <h2 className="text-3xl md:text-4xl font-bold text-nord1 dark:text-nord6">Testimonials</h2>
            </div>
            <p className="text-lg text-nord3 dark:text-nord4 mt-4">Kind words from colleagues and collaborators.</p>
            <div className="w-16 h-1 bg-nord13 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative group">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory space-x-6 md:space-x-8 py-4 -mx-6 px-6 md:-mx-12 md:px-12 scrollbar-hide"
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="snap-center shrink-0 w-[90%] sm:w-[80%] md:w-[45%] xl:w-[31%]">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
            
            {/* Previous Button */}
            <button
              onClick={() => scroll('left')}
              aria-label="Previous testimonial"
              className={`absolute top-1/2 -translate-y-1/2 left-0 md:left-2 z-10 p-3 bg-nord6/60 dark:bg-nord1/60 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                canScrollLeft ? 'hover:bg-nord8 hover:text-nord0' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Next Button */}
            <button
              onClick={() => scroll('right')}
              aria-label="Next testimonial"
              className={`absolute top-1/2 -translate-y-1/2 right-0 md:right-2 z-10 p-3 bg-nord6/60 dark:bg-nord1/60 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                canScrollRight ? 'hover:bg-nord8 hover:text-nord0' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;