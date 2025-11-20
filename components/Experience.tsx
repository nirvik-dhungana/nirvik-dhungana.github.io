import React from 'react';
import { PROFESSIONAL_EXPERIENCE } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { LuBriefcase, LuExternalLink, LuCalendar } from 'react-icons/lu';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="my-24 py-12 relative">
      {/* Background Track */}
      <div className="absolute top-0 left-8 bottom-0 w-px bg-gradient-to-b from-transparent via-nord13/20 to-transparent lg:block hidden"></div>

      <div className="px-0">
        <AnimatedSection>
          <div className="mb-16 relative z-10 text-center">
             <div className="inline-flex items-center justify-center p-3 bg-nord13/10 rounded-2xl mb-4 ring-1 ring-nord13/20 shadow-lg shadow-nord13/10">
                <LuBriefcase className="w-6 h-6 text-nord13" />
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-nord0 dark:text-nord6 mb-4 tracking-tight">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord13 to-orange-400">Experience</span>
             </h2>
             <p className="text-lg text-nord3 dark:text-nord4 max-w-2xl mx-auto leading-relaxed">
                My career journey and the professional roles that have shaped my technical expertise.
             </p>
          </div>
          
          <div className="relative space-y-8 md:space-y-12">
             {/* Continuous Vertical Line (Desktop only) */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nord13/50 via-nord13/20 to-transparent hidden lg:block"></div>

            {PROFESSIONAL_EXPERIENCE.map((job, index) => (
              <div key={index} className="relative lg:pl-24">
                 {/* Timeline Dot (Desktop) */}
                 <div className="hidden lg:flex absolute left-[23px] top-8 w-4 h-4 rounded-full bg-nord13 border-4 border-nord6 dark:border-nord0 shadow-[0_0_0_4px_rgba(235,203,139,0.2)] z-10 transition-transform duration-300 group-hover:scale-125"></div>

                <div className="group relative bg-white/60 dark:bg-nord1/60 backdrop-blur-2xl p-6 sm:p-8 rounded-[2rem] border border-white/50 dark:border-nord3/50 shadow-sm hover:shadow-2xl hover:shadow-nord13/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                   <div className="absolute -right-10 -top-10 w-32 h-32 bg-nord13/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"></div>

                   <div className="flex flex-col md:flex-row gap-6 relative z-10">
                      {/* Logo Section */}
                      <div className="flex-shrink-0">
                         {job.logo ? (
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-nord2 p-2 border border-nord4/50 dark:border-nord3/50 shadow-inner flex items-center justify-center">
                                <img 
                                  src={job.logo} 
                                  alt={job.company} 
                                  className="w-full h-full object-contain" 
                                  width="48"
                                  height="48"
                                  loading="lazy"
                                  decoding="async"
                                />
                            </div>
                         ) : (
                            <div className="w-16 h-16 rounded-2xl bg-nord13/10 flex items-center justify-center text-nord13">
                               <LuBriefcase className="w-8 h-8" />
                            </div>
                         )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-grow">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-xl md:text-2xl font-bold text-nord0 dark:text-nord6 group-hover:text-nord13 transition-colors">
                                {job.role}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nord4/50 dark:bg-nord3/50 text-xs font-bold uppercase tracking-wide text-nord2 dark:text-nord4 border border-nord4/50 dark:border-nord3/50">
                               <LuCalendar className="w-3 h-3" />
                               {job.period}
                            </div>
                         </div>

                         <div className="mb-6">
                            {job.url ? (
                              <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-medium text-nord3 dark:text-nord4 hover:text-nord13 transition-colors">
                                {job.company} <LuExternalLink className="w-3 h-3 opacity-50" />
                              </a>
                            ) : (
                              <span className="text-lg font-medium text-nord3 dark:text-nord4">{job.company}</span>
                            )}
                         </div>
                         
                         <ul className="space-y-3">
                            {job.description.map((point, i) => (
                              <li key={i} className="flex items-start gap-3 text-nord3 dark:text-nord4 text-sm md:text-base leading-relaxed group/li">
                                 <span className="mt-2 w-1.5 h-1.5 rounded-full bg-nord13 flex-shrink-0 group-hover/li:scale-150 transition-transform"></span>
                                 <span className="opacity-90">{point}</span>
                              </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default React.memo(Experience);