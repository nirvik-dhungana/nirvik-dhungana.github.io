import React from 'react';
import { SKILLS } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { FaWrench } from 'react-icons/fa';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="my-16 py-20 md:py-32 bg-nord5 dark:bg-nord1 bg-dots-light dark:bg-dots-dark rounded-3xl shadow-2xl shadow-nord3/20 dark:shadow-black/20">
      <div className="px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3">
              <FaWrench className="w-8 h-8 text-nord13" />
              <h2 className="text-3xl md:text-4xl font-bold text-nord1 dark:text-nord6">Skills</h2>
            </div>
            <p className="text-lg text-nord3 dark:text-nord4 mt-4 max-w-2xl mx-auto">A collection of the key technologies I'm using to hone my skills and build modern web applications.</p>
            <div className="w-20 h-1 bg-nord13 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[max-content,1fr] gap-x-12 gap-y-8 md:gap-y-10 items-start">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <React.Fragment key={category}>
                <h3 className="text-xl font-semibold text-nord13 md:text-right">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <a
                      key={skill.name}
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Learn more about ${skill.name}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-nord6 dark:bg-nord2 rounded-full transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl hover:shadow-nord8/20 focus:outline-none focus:-translate-y-1 focus:shadow-xl focus:shadow-nord8/20 border border-nord4/50 dark:border-nord3/50"
                    >
                      {skill.icon}
                      <span className="text-nord2 dark:text-nord5 font-medium whitespace-nowrap">{skill.name}</span>
                    </a>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
