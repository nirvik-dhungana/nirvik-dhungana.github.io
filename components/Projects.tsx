import React, { useRef, useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection.tsx';
import ProjectCard from './ProjectCard.tsx';
import { GoProject } from 'react-icons/go';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Project } from '../types';

// Placeholder projects data
const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    description: 'A responsive and animated portfolio built with React, TypeScript, and Tailwind CSS to showcase my skills and projects.',
    image: 'https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_800/v1762426343/portfolio-ss_uubkds.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: '#',
    githubUrl: 'https://github.com/nirvik-dhungana/portfolio',
  },
  {
    title: 'Nordic E-commerce Concept',
    description: 'A clean, minimalist e-commerce storefront concept. Features product listings, a shopping cart, and a checkout process.',
    image: 'https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_800/v1762426343/ecommerce-ss_k58ywh.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    githubUrl: 'https://github.com/nirvik-dhungana',
  },
  {
    title: 'AI Content Generator',
    description: 'A web app leveraging the Gemini API to generate blog posts, summaries, and other creative text formats from user prompts.',
    image: 'https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_800/v1762426343/ai-ss_f6t4u2.png',
    tags: ['React', 'Gemini API', 'Node.js', 'UI/UX Design'],
    liveUrl: '#',
    githubUrl: 'https://github.com/nirvik-dhungana',
  },
  {
    title: 'Weather Dashboard',
    description: 'A modern weather dashboard providing real-time weather data for any city, using the OpenWeatherMap API.',
    image: 'https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_800/v1762426344/weather-ss_g2h8jf.png',
    tags: ['React', 'API Integration', 'JavaScript', 'CSS Modules'],
    liveUrl: '#',
    githubUrl: 'https://github.com/nirvik-dhungana',
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
    <section id="projects" className="my-16 py-20 md:py-32">
      <div className="px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3">
              <GoProject className="w-8 h-8 text-nord13" />
              <h2 className="text-3xl md:text-4xl font-bold text-nord1 dark:text-nord6">Projects</h2>
            </div>
            <p className="text-lg text-nord3 dark:text-nord4 mt-4">A showcase of what I've been working on.</p>
            <div className="w-16 h-1 bg-nord13 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative group">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory space-x-6 md:space-x-8 py-4 -mx-6 px-6 md:-mx-12 md:px-12 scrollbar-hide"
            >
              {projects.map((project, index) => (
                <div key={index} className="snap-center shrink-0 w-[90%] sm:w-[80%] md:w-[45%] xl:w-[31%]">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            
            {/* Previous Button */}
            <button
              onClick={() => scroll('left')}
              aria-label="Previous project"
              className={`absolute top-1/2 -translate-y-1/2 left-0 md:left-2 z-10 p-3 bg-nord6/60 dark:bg-nord1/60 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                canScrollLeft ? 'hover:bg-nord8 hover:text-nord0' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Next Button */}
            <button
              onClick={() => scroll('right')}
              aria-label="Next project"
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

export default Projects;