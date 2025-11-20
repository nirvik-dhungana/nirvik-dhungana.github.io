import React from 'react';
import { LEARNING_JOURNEY } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { LuGraduationCap, LuCheckCircle } from 'react-icons/lu';

const LearningJourney: React.FC = () => {
  return (
    <section id="learning-journey" className="my-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-radial-gradient from-nord14/5 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <AnimatedSection>
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-nord14/10 rounded-2xl mb-4 ring-1 ring-nord14/20 shadow-lg shadow-nord14/10">
              <LuGraduationCap className="w-6 h-6 text-nord14" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-nord0 dark:text-nord6 mb-4 tracking-tight">
              Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord14 to-green-400">Path</span>
            </h2>
            <p className="text-lg text-nord3 dark:text-nord4 max-w-2xl mx-auto leading-relaxed">
               A continuous journey of growth, curiosity, and technical mastery.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 relative z-10">
            {LEARNING_JOURNEY.map((item, index) => (
               <div key={index} className="group relative bg-white/80 dark:bg-nord1/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-nord2/60 shadow-lg hover:shadow-xl hover:shadow-nord14/10 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nord14 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-start justify-between mb-6">
                     <div className="p-3 bg-nord6 dark:bg-nord0 rounded-2xl text-nord14 group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <span className="px-3 py-1 bg-nord14/10 text-nord14 text-xs font-bold uppercase tracking-wider rounded-full border border-nord14/20">
                        {item.period}
                     </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-nord0 dark:text-nord6 mb-2 group-hover:text-nord14 transition-colors">
                     {item.role}
                  </h3>
                  <p className="text-nord3 dark:text-nord4 font-medium text-sm mb-6">{item.company}</p>
                  
                  <div className="mt-auto bg-white/50 dark:bg-nord0/50 rounded-xl p-5 border border-nord4/30 dark:border-nord3/30">
                     <h4 className="text-xs font-bold text-nord2 dark:text-nord5 uppercase tracking-wider mb-3 opacity-70">Milestones</h4>
                     <ul className="space-y-3">
                        {item.description.map((point, i) => (
                           <li key={i} className="flex items-start gap-3 text-sm text-nord3 dark:text-nord4">
                              <LuCheckCircle className="w-4 h-4 text-nord14 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{point}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            ))}
          </div>
      </AnimatedSection>
    </section>
  );
};

export default React.memo(LearningJourney);