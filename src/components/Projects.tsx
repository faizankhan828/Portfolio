import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import LazyImage from "./LazyImage";
import type { Project } from "../types/portfolio";

interface ProjectsProps {
  data: Project[];
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0.08 : 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: isMobile ? 15 : 25 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: isMobile ? 0.4 : 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
};

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      variants={item}
      whileHover={shouldReduceMotion || isMobile ? {} : { y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-3xl cursor-pointer group relative w-full"
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Glow effect on hover - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-lg -z-10" />
      )}

      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-3xl">
        <LazyImage
          src={project.thumbnailPlaceholder}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {project.featured && (
          <motion.div
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 px-3 py-1.5 sm:px-4 sm:py-2 glass-light rounded-full text-xs sm:text-sm md:text-base font-bold text-accent-400 border border-accent-400/30 shadow-lg backdrop-blur-md"
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
        className="p-6 sm:p-8 md:p-10 lg:p-12 relative flex flex-col overflow-visible"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-5 group-hover:gradient-text transition-all duration-300 font-['Space_Grotesk'] leading-tight break-words">
          {project.title}
        </h3>

        <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-6 sm:mb-8 leading-relaxed break-words">
          {project.summary}
        </p>

        <div
          className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
          role="list"
          aria-label="Technologies used"
        >
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 sm:px-4 sm:py-2 glass-light text-primary-600 dark:text-primary-400 rounded-lg text-xs sm:text-sm md:text-base font-semibold border border-primary-400/20"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-semibold text-primary-600 dark:text-primary-400 group-hover:translate-x-2 transition-transform duration-300 mt-auto">
          <span>View Details</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
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
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { scale: 0.8, opacity: 0, y: 50 }
        }
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={
          shouldReduceMotion
            ? { opacity: 1 }
            : { scale: 0.8, opacity: 0, y: 50 }
        }
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-2xl -z-10" />

        <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden rounded-t-3xl">
          <LazyImage
            src={project.thumbnailPlaceholder}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 w-10 h-10 sm:w-12 sm:h-12 glass-light rounded-full flex items-center justify-center hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 border border-white/20"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {project.featured && (
            <motion.div
              className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 px-3 py-1.5 sm:px-4 sm:py-2 glass-light rounded-full text-xs sm:text-sm md:text-base font-bold text-accent-400 border border-accent-400/30 shadow-lg"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐ Featured Project
            </motion.div>
          )}
        </div>

        <div className="p-6 sm:p-8 md:p-10 lg:p-12">
          <motion.h2
            id="modal-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text font-['Space_Grotesk'] mb-4 sm:mb-5 md:mb-6"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.title}
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 mb-5 sm:mb-6 md:mb-8 leading-relaxed"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.shortDescription}
          </motion.p>

          <motion.div
            className="mb-5 sm:mb-6 md:mb-8"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-4">
              Technologies Used
            </h3>
            <div
              className="flex flex-wrap gap-3"
              role="list"
              aria-label="Technologies"
            >
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold text-center hover:shadow-xl hover:scale-105 transition-all shimmer focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm sm:text-base"
              aria-label={`Open live demo of ${project.title} in new tab`}
            >
              🚀 Live Demo
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-5 sm:px-6 py-3 sm:py-4 glass-light text-neutral-900 dark:text-white rounded-xl font-bold text-center hover:scale-105 transition-all border border-primary-400/20 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm sm:text-base"
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
  const [filter, setFilter] = useState<string>("All");
  const shouldReduceMotion = useReducedMotion();

  const allTags = ["All", ...Array.from(new Set(data.flatMap((p) => p.tags)))];

  const filteredProjects =
    filter === "All" ? data : data.filter((p) => p.tags.includes(filter));

  return (
    <section
      id="projects"
      className="section-container relative py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Decorative gradient orb */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -50, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-3 sm:mb-4 px-4 py-2 glass-light rounded-full text-primary-600 dark:text-primary-400 font-semibold border border-primary-400/20 text-sm sm:text-base">
            💼 My Work
          </div>
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-5 md:mb-6 font-['Space_Grotesk'] px-4"
          >
            Featured Projects
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-4 sm:mb-5 md:mb-6" />
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4 leading-relaxed">
            Explore my latest work and side projects. Click on any card to see
            more details.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-12 md:mb-16 px-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          {allTags.slice(0, 8).map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setFilter(tag)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                filter === tag
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                  : "glass-light text-neutral-900 dark:text-white hover:border-primary-400/40 border border-primary-400/20"
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
