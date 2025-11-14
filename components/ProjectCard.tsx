
import React from 'react';
// FIX: Correctly import the Project type.
import type { Project } from '../types';
import { GithubIcon, ExternalLinkIcon } from '../constants';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, image, tags, liveUrl, githubUrl } = project;

  return (
    <div className="bg-nord6 dark:bg-nord2 rounded-lg shadow-2xl shadow-nord3/20 dark:shadow-black/20 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-nord8/20 dark:hover:shadow-nord8/10 group border border-nord4/50 dark:border-nord3/50">
      <div className="relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" loading="lazy" decoding="async" width="800" height="450" />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-nord1 dark:text-nord6 mb-2">{title}</h3>
        <p className="text-nord3 dark:text-nord4 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={tag} 
              className="bg-nord10/20 dark:bg-nord10/40 text-nord10 text-sm font-medium px-3 py-1 rounded-full opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-6">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-nord2 dark:text-nord5 hover:text-nord8 transition-all duration-300 transform hover:-translate-y-1">
              <ExternalLinkIcon className="w-5 h-5 mr-2" />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-nord2 dark:text-nord5 hover:text-nord8 transition-all duration-300 transform hover:-translate-y-1">
              <GithubIcon className="w-5 h-5 mr-2" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;