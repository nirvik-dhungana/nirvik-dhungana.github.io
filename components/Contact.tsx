
import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import AnimatedSection from './AnimatedSection.tsx';
import { FaPaperPlane, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="my-16 py-20 md:py-32 bg-nord5 dark:bg-nord1 bg-dots-light dark:bg-dots-dark rounded-3xl shadow-2xl shadow-nord3/20 dark:shadow-black/20">
      <div className="px-6 md:px-12">
        <AnimatedSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3">
              <FaPaperPlane className="w-8 h-8 text-nord13" />
              <h2 className="text-3xl md:text-4xl font-bold text-nord1 dark:text-nord6">Get In Touch</h2>
            </div>
            <div className="w-20 h-1 bg-nord13 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Left Column: CTA Text */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-nord1 dark:text-nord6 mb-4">Let's Connect!</h3>
              <p className="text-lg text-nord3 dark:text-nord4">
                I'm actively looking for new opportunities and collaborations. My inbox is always open, whether you have a question or just want to say hi. I'll do my best to get back to you!
              </p>
            </div>

            {/* Right Column: Contact Card */}
            <div className="bg-nord6 dark:bg-nord2 p-8 rounded-lg shadow-xl shadow-nord3/20 dark:shadow-black/20 border border-nord4/50 dark:border-nord3/50">
              <div className="flex flex-col space-y-6">
                {/* Email */}
                <a 
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex items-center group"
                  aria-label="Send me an email"
                >
                  <div className="p-3 bg-nord8/20 rounded-full mr-4">
                    <FiMail className="w-6 h-6 text-nord8" />
                  </div>
                  <div>
                    <p className="text-nord3 dark:text-nord4 text-sm">Email</p>
                    <p className="text-nord1 dark:text-nord5 font-semibold group-hover:text-nord8 transition-colors duration-300">
                      {SOCIAL_LINKS.email}
                    </p>
                  </div>
                </a>
                
                {/* Divider */}
                <div className="border-t border-nord4/50 dark:border-nord3/50"></div>

                {/* Socials */}
                <div>
                  <p className="text-nord3 dark:text-nord4 text-sm mb-3 text-center">On the Web</p>
                  <div className="flex items-center justify-center space-x-6">
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile" className="text-nord3 dark:text-nord4 hover:text-nord8 transition-all duration-300 transform hover:scale-110"><FaGithub className="w-7 h-7" /></a>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile" className="text-nord3 dark:text-nord4 hover:text-nord8 transition-all duration-300 transform hover:scale-110"><FaLinkedin className="w-7 h-7" /></a>
                    <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit my Twitter profile" className="text-nord3 dark:text-nord4 hover:text-nord8 transition-all duration-300 transform hover:scale-110"><FaTwitter className="w-7 h-7" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;