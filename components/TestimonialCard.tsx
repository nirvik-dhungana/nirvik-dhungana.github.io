
import React from 'react';
import type { Testimonial } from '../types';
import { FaQuoteLeft } from 'react-icons/fa';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { quote, author, title, avatar } = testimonial;

  return (
    <div className="bg-nord5 dark:bg-nord1 p-8 rounded-lg shadow-2xl shadow-nord3/30 dark:shadow-black/30 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-nord8/20 dark:hover:shadow-nord8/10 border border-nord4/50 dark:border-nord3/50">
      <FaQuoteLeft className="w-10 h-10 text-nord13 mb-6" />
      <p className="text-nord2 dark:text-nord4 italic mb-6 flex-grow">"{quote}"</p>
      <div className="flex flex-col items-center">
        <img src={avatar} alt={author} className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-nord4 dark:border-nord3" loading="lazy" decoding="async" />
        <h4 className="font-bold text-lg text-nord1 dark:text-nord6">{author}</h4>
        <p className="text-sm text-nord3 dark:text-nord4">{title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;