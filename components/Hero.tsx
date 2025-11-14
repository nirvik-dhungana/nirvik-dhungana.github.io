
import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="py-24 md:py-32 flex items-center">
      <div className="w-full flex flex-col-reverse md:grid md:grid-cols-5 gap-8 lg:gap-16 items-center">
        <div className="md:col-span-3 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold text-nord1 dark:text-nord6 leading-tight mb-4 opacity-0 animate-fadeInUp">
            Hi, I'm <span className="text-nord8">Nirvik Dhungana</span>
          </h1>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-nord2 dark:text-nord5 mb-6 opacity-0 animate-fadeInUp [animation-delay:200ms]">
            An Aspiring Web Developer
          </h2>
          <p className="text-lg xl:text-xl text-nord3 dark:text-nord4 mb-8 max-w-2xl opacity-0 animate-fadeInUp [animation-delay:400ms] mx-auto md:mx-0">
            I'm just starting my journey into the world of web development, passionate about learning and creating beautiful, user-friendly digital experiences.
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-6 mb-8 opacity-0 animate-fadeInUp [animation-delay:600ms]">
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile" className="text-nord3 dark:text-nord4 hover:text-nord8 transition-all duration-300 transform hover:scale-110"><FaGithub className="w-8 h-8" /></a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile" className="text-nord3 dark:text-nord4 hover:text-nord8 transition-all duration-300 transform hover:scale-110"><FaLinkedin className="w-8 h-8" /></a>
             <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit my Twitter profile" className="text-nord3 dark:text-nord4 hover:text-nord8 transition-all duration-300 transform hover:scale-110"><FaTwitter className="w-8 h-8" /></a>
          </div>
          <a
            href="#contact"
            className="inline-block bg-nord8 text-nord0 font-bold py-3 px-6 xl:py-4 xl:px-8 xl:text-lg rounded-lg hover:bg-nord9 transition-all duration-300 shadow-lg shadow-nord8/30 dark:shadow-nord8/20 opacity-0 animate-fadeInUp [animation-delay:800ms]"
          >
            Get In Touch
          </a>
        </div>
        <div className="md:col-span-2 flex justify-center md:justify-end opacity-0 animate-fadeInUp [animation-delay:500ms]">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[30rem] xl:h-[30rem]">
                <div className="absolute inset-0 bg-nord8 rounded-full blur-3xl opacity-40"></div>
                <img src="https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_800/v1762424795/pfp_yggogi.png" alt="Nirvik Dhungana" className="relative w-full h-full object-cover rounded-full border-4 border-nord4 dark:border-nord3 shadow-2xl shadow-nord8/50 dark:shadow-nord8/30" loading="lazy" decoding="async" width="480" height="480"/>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;