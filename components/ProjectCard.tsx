import React from 'react';
import type { Project } from '../types';
import { GithubIcon, ExternalLinkIcon } from '../constants';
import { LuCode } from 'react-icons/lu';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, image, tags, liveUrl, githubUrl } = project;

  return (
    <div className="group relative h-full flex flex-col bg-white/80 dark:bg-nord1/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/60 dark:border-nord3/60 shadow-lg shadow-nord4/20 dark:shadow-black/20 transition-all duration-500 hover:shadow-2xl hover:shadow-nord8/20 hover:-translate-y-2 hover:border-nord8/40">
      
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden bg-nord4/20 dark:bg-nord3/20">
        <div className="absolute inset-0 bg-nord0/10 dark:bg-nord0/20 z-10 group-hover:opacity-0 transition-opacity duration-500" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
          loading="lazy" 
          decoding="async"
          width="600"
          height="400"
        />
        
        {/* Floating Action Buttons Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-nord0/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-white/90 text-nord0 rounded-full hover:bg-nord8 hover:text-white transition-all duration-300 shadow-lg hover:scale-110 flex items-center justify-center"
              aria-label="View Live Demo"
              title="View Live Demo"
            >
              <ExternalLinkIcon className="w-5 h-5" />
            </a>
          )}
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-nord0/90 text-white rounded-full hover:bg-nord8 hover:text-white transition-all duration-300 shadow-lg hover:scale-110 flex items-center justify-center"
              aria-label="View Source Code"
              title="View Source Code"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow relative">
        {/* Decorative element */}
        <div className="absolute top-0 right-8 w-12 h-1 bg-gradient-to-r from-nord8 to-nord10 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold text-nord0 dark:text-nord6 mb-3 group-hover:text-nord10 dark:group-hover:text-nord8 transition-colors flex items-center gap-2">
             {title}
          </h3>
          <p className="text-nord3 dark:text-nord4 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </p>
        </div>
        
        {/* Tags */}
        <div className="mt-auto pt-6 border-t border-nord4/50 dark:border-nord3/30">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div 
                key={tag} 
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full bg-nord4/30 dark:bg-nord3/30 text-nord2 dark:text-nord4 border border-nord4/50 dark:border-nord3/50 hover:bg-nord8/10 hover:text-nord10 dark:hover:text-nord8 transition-colors"
              >
                <LuCode className="w-2.5 h-2.5 opacity-70" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;