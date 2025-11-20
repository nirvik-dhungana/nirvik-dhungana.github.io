import React from 'react';
import { EDUCATION } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { LuSchool, LuExternalLink, LuCalendar } from 'react-icons/lu';

const Education: React.FC = () => {
  return (
    <section id="education" className="my-12 py-12 relative">
      {/* Background Track */}
      <div className="absolute top-0 left-8 bottom-0 w-px bg-gradient-to-b from-transparent via-nord10/20 to-transparent lg:block hidden"></div>

      <div className="px-0">
        <AnimatedSection>
           <div className="mb-16 relative z-10 text-center">
             <div className="inline-flex items-center justify-center p-3 bg-nord10/10 dark:bg-nord8/10 rounded-2xl mb-4 ring-1 ring-nord10/20 shadow-lg shadow-nord10/10">
                <LuSchool className="w-6 h-6 text-nord10 dark:text-nord8" />
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-nord0 dark:text-nord6 mb-4 tracking-tight">
                Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord10 to-nord8">Background</span>
             </h2>
             <p className="text-lg text-nord3 dark:text-nord4 max-w-2xl mx-auto leading-relaxed">
                The educational foundation that supports my technical journey.
             </p>
          </div>

          <div className="relative space-y-8 md:space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nord10/50 via-nord10/20 to-transparent hidden lg:block"></div>

            {EDUCATION.map((edu, index) => (
              <div key={index} className="relative lg:pl-24">
                 {/* Timeline Dot */}
                 <div className="hidden lg:flex absolute left-[23px] top-8 w-4 h-4 rounded-full bg-nord10 dark:bg-nord8 border-4 border-nord6 dark:border-nord0 shadow-[0_0_0_4px_rgba(136,192,208,0.2)] z-10 transition-transform duration-300 group-hover:scale-125"></div>

                <div className="group relative bg-white/60 dark:bg-nord1/60 backdrop-blur-2xl p-6 sm:p-8 rounded-[2rem] border border-white/50 dark:border-nord3/50 shadow-sm hover:shadow-2xl hover:shadow-nord10/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                   <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-nord10/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"></div>

                   <div className="flex flex-col md:flex-row gap-6 relative z-10">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                         {edu.logo ? (
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-nord2 p-2 border border-nord4/50 dark:border-nord3/50 shadow-inner flex items-center justify-center">
                                <img 
                                  src={edu.logo} 
                                  alt={edu.institution} 
                                  className="w-full h-full object-contain"
                                  width="48"
                                  height="48"
                                  loading="lazy"
                                  decoding="async"
                                />
                            </div>
                         ) : (
                            <div className="w-16 h-16 rounded-2xl bg-nord10/10 flex items-center justify-center text-nord10">
                               <LuSchool className="w-8 h-8" />
                            </div>
                         )}
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="text-xl md:text-2xl font-bold text-nord0 dark:text-nord6 group-hover:text-nord10 dark:group-hover:text-nord8 transition-colors">
                                {edu.degree}
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nord4/50 dark:bg-nord3/50 text-xs font-bold uppercase tracking-wide text-nord2 dark:text-nord4 border border-nord4/50 dark:border-nord3/50">
                               <LuCalendar className="w-3 h-3" />
                               {edu.period}
                            </div>
                         </div>

                         <div className="mb-6">
                             {edu.url ? (
                                <a href={edu.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-medium text-nord3 dark:text-nord4 hover:text-nord10 dark:hover:text-nord8 transition-colors">
                                  {edu.institution} <LuExternalLink className="w-3 h-3 opacity-50" />
                                </a>
                              ) : (
                                <p className="text-lg font-medium text-nord3 dark:text-nord4">{edu.institution}</p>
                              )}
                         </div>
                   
                         <ul className="space-y-3">
                            {edu.description.map((point, i) => (
                              <li key={i} className="flex items-start gap-3 text-nord3 dark:text-nord4 text-sm md:text-base leading-relaxed group/li">
                                 <span className="mt-2 w-1.5 h-1.5 rounded-full bg-nord10 dark:bg-nord8 flex-shrink-0 group-hover/li:scale-150 transition-transform"></span>
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

export default React.memo(Education);