import React from 'react';
import { SKILLS } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { LuWrench, LuLayers } from 'react-icons/lu';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="my-24 relative z-10">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-nord8/5 to-transparent blur-2xl -z-10 pointer-events-none"></div>
      
      <AnimatedSection>
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center p-3 bg-nord8/10 rounded-2xl mb-4 ring-1 ring-nord8/20 shadow-lg shadow-nord8/10">
            <LuWrench className="w-6 h-6 text-nord10 dark:text-nord8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-nord0 dark:text-nord6 mb-4 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord8 to-nord10">Arsenal</span>
          </h2>
          <p className="text-lg text-nord3 dark:text-nord4 max-w-2xl mx-auto leading-relaxed">
            The tools, languages, and frameworks I leverage to engineer scalable and high-performance digital solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <div 
              key={category} 
              className={`group relative overflow-hidden bg-white/60 dark:bg-nord1/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/60 dark:border-nord3/60 shadow-xl dark:shadow-black/20 transition-all duration-500 hover:shadow-2xl hover:shadow-nord8/10 hover:-translate-y-1 ${
                 index === 0 && Object.keys(SKILLS).length % 2 !== 0 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Decorative Gradient Blob inside card */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-nord8/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none"></div>

              <h3 className="relative z-10 text-xl font-bold text-nord0 dark:text-nord6 mb-8 flex items-center justify-center md:justify-start gap-3">
                  <div className="p-2 rounded-lg bg-nord4/50 dark:bg-nord2/50 text-nord8">
                    <LuLayers className="w-5 h-5" />
                  </div>
                  {category}
              </h3>
              
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/item flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-nord0/50 rounded-2xl border border-nord4/30 dark:border-nord3/30 hover:bg-white dark:hover:bg-nord2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden ${!skill.url ? 'cursor-default pointer-events-none' : ''}`}
                    title={skill.name}
                    style={{
                        // @ts-ignore - Custom variable for hover color
                        '--hover-color': skill.color
                    }}
                  >
                     {/* Hover border color using dynamic style */}
                    <div 
                        className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300 pointer-events-none"
                        style={{ borderColor: skill.color }}
                    ></div>

                    {/* Icon Container - Ensures consistent size and visibility */}
                    <div 
                        className="mb-3 h-12 w-12 p-2 rounded-xl bg-white/80 dark:bg-nord1/80 shadow-sm flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 filter grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100"
                    >
                       <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: skill.color }}>
                          {React.isValidElement(skill.icon) 
                            ? React.cloneElement(skill.icon as React.ReactElement, { className: "w-full h-full object-contain" })
                            : skill.icon
                          }
                       </div>
                    </div>
                    <span className="text-xs font-bold text-nord2 dark:text-nord4 text-center group-hover/item:text-nord0 dark:group-hover/item:text-nord6 transition-colors">
                      {skill.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default React.memo(Skills);