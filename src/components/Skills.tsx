import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Skill } from '../types/portfolio';

interface SkillsProps {
  data: Skill[];
}

export default function Skills({ data }: SkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: isMobile ? 10 : 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section id="skills" className="section-container relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden" aria-labelledby="skills-heading">
      {/* Decorative gradient orbs - Static, desktop only */}
      {!isMobile && (
        <>
          <div className="hidden md:block absolute top-40 left-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
          <div className="hidden md:block absolute bottom-20 right-20 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 glass-light rounded-full text-primary-600 dark:text-primary-400 font-semibold text-sm sm:text-base border border-primary-400/20">
            ⚡ Expertise
          </div>
          <h2
            id="skills-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4 font-['Space_Grotesk'] px-4"
          >
            Skills & Technologies
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>
        
        {/* Skills Grid - Fast loading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto"
        >
          {data.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative"
            >
              <motion.div
                className="glass-light rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 transition-all duration-200 cursor-pointer relative h-full flex flex-col items-center justify-center text-center"
                whileHover={shouldReduceMotion || isMobile ? {} : { 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                style={{
                  boxShadow: '0 2px 15px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Skill name */}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4 font-['Space_Grotesk'] leading-tight">
                  {skill.name}
                </h3>
            
                {/* Circular progress */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-neutral-200 dark:text-neutral-700"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      whileInView={{
                        strokeDashoffset: 2 * Math.PI * 45 * (1 - skill.level / 100),
                      }}
                      transition={{ duration: isMobile ? 1 : 1.2, delay: index * 0.05, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </svg>
                  
                  {/* Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-base sm:text-lg md:text-xl font-bold gradient-text">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: isMobile ? 1 : 1.2, delay: index * 0.05, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* SVG gradient definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary-500)" />
            <stop offset="100%" stopColor="var(--color-accent-500)" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
