import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { LuSend, LuGithub, LuLinkedin, LuTwitter, LuCopy, LuCheck, LuMail, LuArrowUpRight } from 'react-icons/lu';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="my-12 md:my-24 py-12 relative">
       {/* Background Glow for Contact Section */}
       <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-nord8/20 dark:bg-nord8/10 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

      <div className="px-0 md:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto bg-white/40 dark:bg-nord1/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/50 dark:border-nord3/50 shadow-2xl shadow-nord4/40 dark:shadow-black/40 overflow-hidden p-6 sm:p-8 md:p-16 relative">
            
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center relative z-10">
              
              {/* Left Side: Heading & Text */}
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-nord13/10 rounded-2xl mb-2 ring-1 ring-nord13/20 shadow-lg shadow-nord13/10">
                  <LuSend className="w-6 h-6 text-nord13" />
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-nord0 dark:text-nord6 leading-tight tracking-tight">
                  Let's build something <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord8 to-nord10">Amazing Together.</span>
                </h2>
                
                <p className="text-base md:text-lg text-nord3 dark:text-nord4 leading-relaxed max-w-md mx-auto">
                  I'm currently available for freelance work and open to new opportunities. If you have a project that needs some creative touch, let's chat.
                </p>
              </div>

              {/* Right Side: Action Cards */}
              <div className="flex flex-col gap-4 md:gap-6">
                 {/* Email Card */}
                 <div className="group relative bg-white/60 dark:bg-nord0/60 p-6 rounded-3xl border border-white/60 dark:border-nord3/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-nord8/10 to-nord9/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                       <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                          <div className="p-4 bg-nord6 dark:bg-nord2 rounded-2xl text-nord8 group-hover:scale-110 transition-transform duration-300">
                             <LuMail className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="text-sm text-nord3 dark:text-nord4 font-medium">Mail me at</p>
                             <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-base md:text-lg font-bold text-nord1 dark:text-nord6 hover:underline decoration-nord8 underline-offset-4 transition-all break-all">
                                {SOCIAL_LINKS.email}
                             </a>
                          </div>
                       </div>
                       
                       <button 
                         onClick={handleCopyEmail}
                         className="p-3 rounded-xl hover:bg-nord4/50 dark:hover:bg-nord3/50 text-nord3 dark:text-nord4 transition-colors"
                         aria-label="Copy email address"
                         title="Copy email address"
                       >
                          {copied ? <LuCheck className="w-5 h-5 text-green-500" /> : <LuCopy className="w-5 h-5" />}
                       </button>
                    </div>
                 </div>

                 {/* Social Links Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: <LuGithub />, label: 'GitHub', url: SOCIAL_LINKS.github },
                      { icon: <LuLinkedin />, label: 'LinkedIn', url: SOCIAL_LINKS.linkedin },
                      { icon: <LuTwitter />, label: 'Twitter', url: SOCIAL_LINKS.twitter },
                    ].map((social, idx) => (
                       <a 
                         key={idx}
                         href={social.url}
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="group flex flex-col items-center justify-center gap-3 p-6 bg-white/60 dark:bg-nord0/60 rounded-3xl border border-white/60 dark:border-nord3/60 shadow-lg hover:shadow-xl hover:border-nord8/50 transition-all duration-300 hover:-translate-y-1"
                       >
                          <div className="text-3xl text-nord3 dark:text-nord4 group-hover:text-nord10 dark:group-hover:text-nord8 transition-colors transform group-hover:scale-110 duration-300">
                             {social.icon}
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-nord2 dark:text-nord5">
                             {social.label}
                             <LuArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0" />
                          </div>
                       </a>
                    ))}
                 </div>
              </div>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default React.memo(Contact);