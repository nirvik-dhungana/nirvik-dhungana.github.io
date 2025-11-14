import React from 'react';
import { PROFESSIONAL_EXPERIENCE } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="my-16 py-20 md:py-32 bg-nord5 dark:bg-nord1 bg-dots-light dark:bg-dots-dark rounded-3xl shadow-2xl shadow-nord3/20 dark:shadow-black/20">
      <div className="px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3">
              <FaBriefcase className="w-8 h-8 text-nord13" />
              <h2 className="text-3xl md:text-4xl font-bold text-nord1 dark:text-nord6">Experience</h2>
            </div>
            <p className="text-lg text-nord3 dark:text-nord4 mt-4">My professional roles and accomplishments.</p>
            <div className="w-16 h-1 bg-nord13 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative md:border-l-2 md:border-nord4 md:dark:border-nord3">
              {PROFESSIONAL_EXPERIENCE.map((job, index) => (
                <AnimatedSection key={index}>
                  <div className="mb-12 md:ml-12">
                    <div className="absolute -left-5 hidden md:flex items-center justify-center w-10 h-10 bg-nord6 dark:bg-nord0 rounded-full ring-4 ring-nord5 dark:ring-nord1">
                      {job.icon}
                    </div>
                    <div className="bg-nord6 dark:bg-nord2 p-6 rounded-lg shadow-xl shadow-nord3/20 dark:shadow-black/20 transform transition-transform duration-300 hover:-translate-y-1">
                      {/* Desktop Layout */}
                      <div className="hidden md:flex items-start gap-4">
                        {job.logo && (
                          <a href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${job.company}'s website`} className="flex-shrink-0">
                            <img 
                              src={job.logo} 
                              alt={`${job.company} logo`} 
                              className="w-16 h-16 rounded-md object-contain bg-white p-1 shadow-md"
                              loading="lazy"
                              decoding="async"
                              width="64"
                              height="64"
                            />
                          </a>
                        )}
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xl font-bold text-nord1 dark:text-nord6">{job.role}</h3>
                            <span className="text-nord13 text-sm font-semibold flex-shrink-0">{job.period}</span>
                          </div>
                          {job.url ? (
                            <a href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`Learn more about ${job.company}`} className="inline-flex items-center text-nord3 dark:text-nord4 mb-3 font-medium hover:text-nord8 transition-colors">
                              <span>{job.company}</span>
                              <FaExternalLinkAlt className="w-3 h-3 ml-2 opacity-70" />
                            </a>
                          ) : (
                            <p className="text-nord3 dark:text-nord4 mb-3 font-medium">{job.company}</p>
                          )}
                          <h4 className="font-semibold text-nord2 dark:text-nord5 mb-2 mt-2">Key Responsibilities:</h4>
                          <ul className="list-disc list-inside text-nord3 dark:text-nord4 space-y-2">
                            {job.description.map((point, i) => <li key={i}>{point}</li>)}
                          </ul>
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="md:hidden">
                        <div className="flex items-center gap-4">
                          {job.logo && (
                            <a href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${job.company}'s website`} className="flex-shrink-0">
                              <img src={job.logo} alt={`${job.company} logo`} className="w-14 h-14 rounded-md object-contain bg-white p-1 shadow-md" width="56" height="56"/>
                            </a>
                          )}
                          <h3 className="text-xl font-bold text-nord1 dark:text-nord6">{job.role}</h3>
                        </div>
                        <div className="mt-4">
                          <span className="block text-nord13 text-sm font-semibold mb-2">{job.period}</span>
                           {job.url ? (
                            <a href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`Learn more about ${job.company}`} className="inline-flex items-center text-nord3 dark:text-nord4 mb-3 font-medium hover:text-nord8 transition-colors">
                              <span>{job.company}</span>
                              <FaExternalLinkAlt className="w-3 h-3 ml-2 opacity-70" />
                            </a>
                          ) : (
                            <p className="text-nord3 dark:text-nord4 mb-3 font-medium">{job.company}</p>
                          )}
                          <h4 className="font-semibold text-nord2 dark:text-nord5 mb-2 mt-2">Key Responsibilities:</h4>
                          <ul className="list-disc list-inside text-nord3 dark:text-nord4 space-y-2">
                            {job.description.map((point, i) => <li key={i}>{point}</li>)}
                          </ul>
                        </div>
                      </div>
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

export default Experience;