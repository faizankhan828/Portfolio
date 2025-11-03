import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import LazyImage from './LazyImage';
import type { Project } from '../types/portfolio';

interface ProjectsProps {
  data: Project[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 }
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      variants={item}
      style={shouldReduceMotion ? {} : {
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? {} : { scale: 1.03, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="glass rounded-3xl cursor-pointer group relative depth-3d w-full"
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
          filter: 'blur(20px)',
          transform: 'translateZ(-1px)',
        }}
      />
      
      <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-t-3xl">
        <LazyImage 
          src={project.thumbnailPlaceholder} 
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {project.featured && (
          <motion.div 
            className="absolute top-5 right-5 px-4 py-2 glass-light rounded-full text-sm sm:text-base font-bold text-accent-400 border border-accent-400/30 shadow-lg backdrop-blur-md"
            aria-label="Featured project"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ Featured
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <motion.div 
        className="p-12 sm:p-14 md:p-16 relative flex flex-col overflow-visible"
        style={shouldReduceMotion ? {} : { transform: "translateZ(40px)" }}
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-5 group-hover:gradient-text transition-all duration-300 font-['Space_Grotesk'] leading-tight break-words">
          {project.title}
        </h3>
        
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed break-words">
          {project.summary}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-8" role="list" aria-label="Technologies used">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 glass-light text-primary-600 dark:text-primary-400 rounded-lg text-sm sm:text-base font-semibold border border-primary-400/20"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-base sm:text-lg font-semibold text-primary-600 dark:text-primary-400 group-hover:translate-x-2 transition-transform duration-300 mt-auto">
          <span>View Details</span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-2xl -z-10" />
        
        <div className="relative h-72 md:h-96 overflow-hidden rounded-t-3xl">
          <LazyImage 
            src={project.thumbnailPlaceholder} 
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 glass-light rounded-full flex items-center justify-center hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 border border-white/20"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {project.featured && (
            <motion.div 
              className="absolute top-6 left-6 px-4 py-2 glass-light rounded-full font-bold text-accent-400 border border-accent-400/30 shadow-lg"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐ Featured Project
            </motion.div>
          )}
        </div>
        
        <div className="p-8 md:p-12">
          <motion.h2 
            id="modal-title" 
            className="text-4xl md:text-5xl font-bold gradient-text font-['Space_Grotesk'] mb-6"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.title}
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.shortDescription}
          </motion.p>
          
          <motion.div 
            className="mb-8"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-4">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3" role="list" aria-label="Technologies">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="px-4 py-2 glass-light text-neutral-900 dark:text-white rounded-xl font-semibold border border-primary-400/20 hover:border-primary-400/40 hover:scale-105 transition-all"
                  role="listitem"
                  whileHover={{ y: -2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold text-center hover:shadow-xl hover:scale-105 transition-all shimmer focus:outline-none focus:ring-2 focus:ring-primary-400"
              aria-label={`Open live demo of ${project.title} in new tab`}
            >
              🚀 Live Demo
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 glass-light text-neutral-900 dark:text-white rounded-xl font-bold text-center hover:scale-105 transition-all border border-primary-400/20 focus:outline-none focus:ring-2 focus:ring-primary-400"
              aria-label={`View source code of ${project.title} on GitHub in new tab`}
            >
              💻 View Code
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ data }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  const allTags = ['All', ...Array.from(new Set(data.flatMap(p => p.tags)))];
  
  const filteredProjects = filter === 'All' 
    ? data 
    : data.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" className="section-container relative py-32 px-6 sm:px-8 overflow-hidden" aria-labelledby="projects-heading">
      {/* Decorative gradient orb */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
        animate={shouldReduceMotion ? {} : {
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4 px-4 py-2 glass-light rounded-full text-primary-600 dark:text-primary-400 font-semibold border border-primary-400/20">
            💼 My Work
          </div>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 font-['Space_Grotesk']"
          >
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6" />
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Explore my latest work and side projects. Click on any card to see more details.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="group"
          aria-label="Filter projects by technology"
        >
          {allTags.slice(0, 8).map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setFilter(tag)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                filter === tag
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'glass-light text-neutral-900 dark:text-white hover:border-primary-400/40 border border-primary-400/20'
              }`}
              aria-pressed={filter === tag}
              aria-label={`Filter by ${tag}`}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Project grid */}
        <motion.div
          key={filter}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 w-full px-2"
          role="list"
          aria-label="Project cards"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
            role="status"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xl font-medium">
              No projects found with this filter.
            </p>
          </motion.div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
