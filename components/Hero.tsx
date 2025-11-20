import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { LuGithub, LuLinkedin, LuTwitter, LuArrowDown } from 'react-icons/lu';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] flex items-center justify-center pt-12 pb-20 md:pt-24 md:pb-32 lg:py-12 relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-nord8/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-nord10/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-16 z-10">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left z-10 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-nord10 dark:text-nord8 uppercase bg-nord8/10 dark:bg-nord8/10 rounded-full border border-nord8/20 opacity-0 animate-fadeInUp">
            Welcome to my portfolio
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-nord0 dark:text-nord6 leading-[1.1] mb-6 opacity-0 animate-fadeInUp [animation-delay:200ms]">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord8 via-nord9 to-nord10 animate-gradientShift bg-[length:200%_auto]">Nirvik Dhungana</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-nord2 dark:text-nord4 mb-6 opacity-0 animate-fadeInUp [animation-delay:400ms]">
            Building the <span className="relative whitespace-nowrap text-nord10 dark:text-nord8 font-semibold">
              Web of Tomorrow
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-nord8/30 dark:text-nord8/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-nord3 dark:text-nord4 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fadeInUp [animation-delay:600ms]">
            An aspiring web developer passionate about crafting immersive, user-centric digital experiences with modern technologies and clean design.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 opacity-0 animate-fadeInUp [animation-delay:800ms]">
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-nord10 text-white font-bold text-lg shadow-lg shadow-nord10/30 hover:shadow-nord10/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              View My Work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-transparent border-2 border-nord3/20 dark:border-nord4/20 text-nord1 dark:text-nord6 font-bold text-lg hover:bg-nord4/20 dark:hover:bg-nord3/20 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start space-x-6 opacity-0 animate-fadeInUp [animation-delay:1000ms]">
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-nord3 dark:text-nord4 hover:text-nord10 dark:hover:text-nord8 transition-all hover:scale-110 hover:-translate-y-1"><LuGithub className="w-7 h-7" /></a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-nord3 dark:text-nord4 hover:text-nord10 dark:hover:text-nord8 transition-all hover:scale-110 hover:-translate-y-1"><LuLinkedin className="w-7 h-7" /></a>
             <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-nord3 dark:text-nord4 hover:text-nord10 dark:hover:text-nord8 transition-all hover:scale-110 hover:-translate-y-1"><LuTwitter className="w-7 h-7" /></a>
          </div>
        </div>

        {/* Image/Graphic Content */}
        <div className="flex-1 flex justify-center lg:justify-end z-10 opacity-0 animate-fadeInUp [animation-delay:500ms]">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] group">
                {/* Decorative background blob */}
                <div className="absolute top-0 -right-4 w-full h-full bg-nord9/30 rounded-full blur-3xl filter opacity-50 animate-pulse-slow"></div>
                <div className="absolute -bottom-8 -left-8 w-full h-full bg-nord10/30 rounded-full blur-3xl filter opacity-50 animate-blob"></div>

                {/* Spinning border effect */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-nord8 via-nord9 to-nord10 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-[2rem] bg-nord6 dark:bg-nord1 border border-nord4/50 dark:border-nord3/50 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                    {/* Optimized LCP Image */}
                    <img 
                      src="https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_800/v1762424795/pfp_yggogi.png" 
                      alt="Nirvik Dhungana" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      width="512"
                      height="512"
                      // @ts-ignore
                      fetchPriority="high"
                    />
                </div>
                
                {/* Floating badge */}
                <div className="absolute bottom-6 -left-4 md:-left-8 lg:-left-12 z-20 bg-nord6/90 dark:bg-nord2/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-nord4/50 dark:border-nord3/50 animate-float [animation-delay:2s]">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-semibold text-xs md:text-sm text-nord1 dark:text-nord5">Open to Work</span>
                  </div>
                </div>
            </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20 hidden md:block">
        <a 
            href="#about" 
            aria-label="Scroll down"
            className="flex flex-col items-center gap-2 text-nord3/60 dark:text-nord4/60 hover:text-nord8 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <LuArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default Hero;