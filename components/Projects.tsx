import React, { useRef, useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection.tsx';
import ProjectCard from './ProjectCard.tsx';
import { LuProjector, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import type { Project } from '../types';

// Placeholder projects data
const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    description: 'A responsive and animated portfolio built with React, TypeScript, and Tailwind CSS to showcase my skills and projects.',
    image: 'https://res.cloudinary.com/dxt7szquk/image/upload/v1763755063/Screenshot_2025-11-22_at_01-42-20_Nirvik_Dhungana_Senior_Frontend_Developer_React_Specialist_qqfl12.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://nirvikdhungana.com.np',
    githubUrl: 'https://github.com/nirvik-dhungana/nirvik-dhungana.github.io',
  },
  {
    title: 'Gadgade Basic School',
    description: 'A clean, minimalist school website for Gadgade Basic School built with React, TypeScript, and Tailwind CSS.',
    image: 'https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_800/v1762426343/ecommerce-ss_k58ywh.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://gadgadeschool.edu.np',
    githubUrl: 'https://github.com/gadgade/gadgade#',
  },
];


const Projects: React.FC = () => {
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
    <section id="projects" className="my-16 py-20 relative">
       {/* Background Decoration */}
       <div className="absolute top-1/4 left-0 w-full h-3/4 bg-gradient-to-r from-nord8/10 via-transparent to-nord10/10 blur-3xl -z-10 transform -skew-y-3 pointer-events-none"></div>
       <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-nord13/5 rounded-full blur-3xl -z-10"></div>

      <div className="px-6 md:px-12">
        <AnimatedSection>
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center mb-12 gap-6 text-center">
            <div className="max-w-3xl">
               <div className="inline-flex items-center justify-center p-3 bg-nord10/10 rounded-2xl mb-4 ring-1 ring-nord10/20 shadow-lg shadow-nord10/10">
                  <LuProjector className="w-6 h-6 text-nord10 dark:text-nord8" />
               </div>
               <h2 className="text-4xl md:text-5xl font-extrabold text-nord0 dark:text-nord6 mb-4 tracking-tight">
                 Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord10 to-nord8">Projects</span>
               </h2>
               <p className="text-lg text-nord3 dark:text-nord4 leading-relaxed">
                  A selection of projects that display my passion for creating intuitive and performant web experiences.
               </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-3">
               <button
                 onClick={() => scroll('left')}
                 disabled={!canScrollLeft}
                 className={`p-4 rounded-full border border-nord4 dark:border-nord3 transition-all duration-300 group ${
                   canScrollLeft 
                     ? 'bg-white dark:bg-nord1 hover:bg-nord8 hover:border-nord8 hover:text-white shadow-md cursor-pointer' 
                     : 'bg-transparent text-nord4 dark:text-nord2 cursor-not-allowed opacity-50'
                 }`}
                 aria-label="Scroll previous"
               >
                 <LuChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </button>
               <button
                 onClick={() => scroll('right')}
                 disabled={!canScrollRight}
                 className={`p-4 rounded-full border border-nord4 dark:border-nord3 transition-all duration-300 group ${
                   canScrollRight 
                     ? 'bg-white dark:bg-nord1 hover:bg-nord8 hover:border-nord8 hover:text-white shadow-md cursor-pointer' 
                     : 'bg-transparent text-nord4 dark:text-nord2 cursor-not-allowed opacity-50'
                 }`}
                 aria-label="Scroll next"
               >
                 <LuChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </button>
            </div>
          </div>
          
          {/* Carousel Container */}
          <div className="relative -mx-6 px-6 md:-mx-12 md:px-12">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory space-x-6 md:space-x-8 py-10 -my-10 px-1 scrollbar-hide"
            >
              {projects.map((project, index) => (
                <div key={index} className="snap-center shrink-0 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[32%]">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default React.memo(Projects);