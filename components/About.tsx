import React from 'react';
import AnimatedSection from './AnimatedSection.tsx';
import { LuUser, LuCode, LuLightbulb, LuRocket } from 'react-icons/lu';

const interests = [
  { label: 'Web Development', icon: <LuCode /> },
  { label: 'UI/UX Design', icon: <LuLightbulb /> },
  { label: 'Modern Tech', icon: <LuRocket /> },
];

const About: React.FC = () => {
  return (
    <section id="about" className="my-16 md:my-24 relative">
       {/* Background Decor */}
       <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-nord9/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-nord10/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
       
      <AnimatedSection>
        <div className="bg-white/60 dark:bg-nord1/60 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 lg:p-12 border border-white/50 dark:border-nord3/50 shadow-xl dark:shadow-black/20 hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden">
           <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05] pointer-events-none"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column: Text Content */}
            <div className="space-y-6 text-center lg:text-left">
                <div className="w-full flex justify-center lg:justify-start">
                    <div className="inline-flex items-center justify-center p-3 bg-nord8/10 rounded-2xl mb-2 ring-1 ring-nord8/20 shadow-lg shadow-nord8/10">
                        <LuUser className="w-6 h-6 text-nord10 dark:text-nord8" />
                    </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-nord0 dark:text-nord6 tracking-tight">
                    Passion for <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord8 to-nord10">Code</span>,<br />
                    Eye for <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord8 to-nord10">Design</span>
                </h2>
                
                <div className="space-y-4 text-base md:text-lg text-nord3 dark:text-nord4 leading-relaxed text-justify lg:text-left max-w-2xl mx-auto lg:mx-0">
                    <p>
                        Hello! I'm Nirvik, an aspiring developer who finds joy in turning lines of code into <strong className="text-nord1 dark:text-nord6 font-semibold">interactive realities</strong>. My journey began with a curiosity for how things work on the web, which quickly evolved into a dedicated pursuit of mastering <strong className="text-nord10 dark:text-nord8 font-medium">frontend technologies</strong>.
                    </p>
                    <p>
                        I focus on building <span className="italic text-nord2 dark:text-nord5">accessible, responsive, and performant interfaces</span>. Whether it's experimenting with new UI libraries or diving deep into <strong className="text-nord1 dark:text-nord6 font-semibold">JavaScript fundamentals</strong>, I'm always learning and pushing my boundaries.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                    {interests.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-nord0/50 rounded-lg border border-nord4/50 dark:border-nord3/50 text-nord2 dark:text-nord4 text-sm font-medium hover:border-nord8/50 transition-colors">
                            <span className="text-nord8">{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Visual/Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto lg:max-w-none w-full">
                <div className="col-span-2 bg-gradient-to-br from-nord8 to-nord9 p-6 rounded-2xl text-white shadow-lg transform transition hover:-translate-y-1 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold mb-2">1.5+</div>
                    <div className="font-medium opacity-90 text-sm md:text-base">Years of Learning</div>
                </div>
                <div className="bg-white/50 dark:bg-nord0/50 p-6 rounded-2xl border border-nord4/50 dark:border-nord3/50 shadow-sm hover:border-nord8/50 transition-all duration-300 group backdrop-blur-sm text-center">
                     <div className="text-2xl md:text-3xl font-bold text-nord1 dark:text-nord5 mb-2 group-hover:text-nord8 transition-colors">10+</div>
                     <div className="text-sm text-nord3 dark:text-nord4">Projects Completed</div>
                </div>
                <div className="bg-white/50 dark:bg-nord0/50 p-6 rounded-2xl border border-nord4/50 dark:border-nord3/50 shadow-sm hover:border-nord8/50 transition-all duration-300 group backdrop-blur-sm text-center">
                     <div className="text-2xl md:text-3xl font-bold text-nord1 dark:text-nord5 mb-2 group-hover:text-nord8 transition-colors">100%</div>
                     <div className="text-sm text-nord3 dark:text-nord4">Dedication</div>
                </div>
                 <div className="col-span-2 p-6 rounded-2xl border border-dashed border-nord4 dark:border-nord3 text-center flex flex-col items-center justify-center gap-2 text-nord3 dark:text-nord4 bg-white/30 dark:bg-nord0/30">
                     <span className="text-sm">Currently focusing on</span>
                     <span className="font-bold text-base md:text-lg text-nord10 dark:text-nord8">React & Typescript Ecosystem</span>
                 </div>
            </div>
          </div>
          
        </div>
      </AnimatedSection>
    </section>
  );
};

export default React.memo(About);