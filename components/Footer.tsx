
import React from 'react';

interface FooterProps {
  onPrivacyPolicyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyPolicyClick }) => {
  return (
    <footer className="bg-nord5/80 dark:bg-nord1/80 backdrop-blur-md border-t border-nord4/50 dark:border-nord1/50">
      <div className="container mx-auto px-6 md:px-12 py-6 text-center text-nord3 dark:text-nord4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2 text-sm">
          <span>&copy; {new Date().getFullYear()} Nirvik Dhungana. All Rights Reserved.</span>
          <span className="hidden sm:inline text-nord3/50 dark:text-nord3/50">|</span>
          <button 
            onClick={onPrivacyPolicyClick}
            className="hover:text-nord8 dark:hover:text-nord7 underline focus:outline-none"
          >
            Privacy Policy
          </button>
        </div>
        <p className="text-sm text-nord3/80 dark:text-nord3 mt-2">Designed & Built by Nirvik Dhungana</p>
      </div>
    </footer>
  );
};

export default Footer;
