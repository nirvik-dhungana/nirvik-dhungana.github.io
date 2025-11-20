import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-nord4 dark:border-nord2 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-nord8 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;