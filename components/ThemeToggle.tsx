import React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full text-nord3 dark:text-nord4 hover:bg-nord4 dark:hover:bg-nord3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-nord8"
    >
      {theme === 'light' ? (
        <LuMoon className="h-6 w-6" />
      ) : (
        <LuSun className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeToggle;