import React from 'react';
import type { Testimonial } from '../types';
import { LuQuote } from 'react-icons/lu';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { quote, author, title, avatar } = testimonial;

  return (
    <div className="h-full bg-white/80 dark:bg-nord1/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl shadow-nord4/20 dark:shadow-black/20 border border-white/60 dark:border-nord2/60 relative flex flex-col transition-transform duration-300 hover:-translate-y-1">
      <LuQuote className="absolute top-8 right-8 text-6xl text-nord6 dark:text-nord0 z-0 opacity-50" />
      
      <div className="relative z-10 flex-grow">
         <div className="flex items-center gap-4 mb-6">
             <img 
               src={avatar} 
               alt={author} 
               className="w-14 h-14 rounded-full object-cover border-2 border-nord4 dark:border-nord3 bg-nord6" 
               loading="lazy"
               decoding="async"
               width="56"
               height="56" 
             />
             <div>
                <h4 className="font-bold text-lg text-nord0 dark:text-nord6 leading-tight">{author}</h4>
                <p className="text-sm text-nord3 dark:text-nord4 font-medium opacity-80">{title}</p>
             </div>
         </div>
         <p className="text-nord2 dark:text-nord4 italic leading-relaxed">"{quote}"</p>
      </div>
    </div>
  );
};

export default React.memo(TestimonialCard);