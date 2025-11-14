
import React from 'react';
import AnimatedSection from './AnimatedSection.tsx';
import { FaUser } from 'react-icons/fa';

const backgroundPills = [
  'Web Development Journey',
  'Technology & Creativity',
  'Passion for Coding',
  'Curious & Dedicated Learner',
  'Intuitive & Engaging UIs',
  'Foundational Skills (HTML, CSS, JS)',
  'React Ecosystem',
  'Enthusiastic Beginner',
  'Challenge Seeker',
  'Collaborative Spirit',
  'Seeking Growth Opportunities',
];


const About: React.FC = () => {
  return (
    <section id="about" className="my-16 py-20 md:py-32 bg-nord5 dark:bg-nord1 bg-dots-light dark:bg-dots-dark rounded-3xl shadow-2xl shadow-nord3/20 dark:shadow-black/20">
      <div className="px-6 md:px-12">
        <AnimatedSection>
          <div>
            {/* Title Section */}
            <div className="text-center mb-16">
              <div className="flex justify-center items-center gap-3">
                  <FaUser className="w-8 h-8 text-nord13" />
                  <h2 className="text-3xl md:text-4xl font-bold text-nord1 dark:text-nord6">
                      About Me
                  </h2>
              </div>
              <div className="w-20 h-1 bg-nord13 mx-auto mt-4 rounded-full"></div>
            </div>
            
            {/* Content Pills Section */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                {backgroundPills.map((pill, index) => (
                  <div
                    key={index}
                    className="bg-nord6 dark:bg-nord2 text-nord1 dark:text-nord5 font-medium px-4 py-2 rounded-lg shadow-md border border-nord4/50 dark:border-nord3/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {pill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;