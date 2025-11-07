import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Skill } from '../types/portfolio';

interface SkillsProps {
  data: Skill[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export default function Skills({ data }: SkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="skills" className="section-container relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-visible" aria-labelledby="skills-heading">
      {/* Decorative gradient orbs - Hidden on mobile */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="hidden md:block absolute top-40 left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
            style={{ y }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hidden md:block absolute bottom-20 right-20 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section heading - Responsive */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 glass-light rounded-full text-primary-600 dark:text-primary-400 font-semibold text-sm sm:text-base border border-primary-400/20">
            ⚡ Expertise
          </div>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4 font-['Space_Grotesk'] px-4"
          >
            Skills & Technologies
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>
        
        {/* Skills Grid - Clean & Responsive */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {data.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative"
            >
              <motion.div
                className="glass-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer relative h-full flex flex-col items-center justify-center text-center"
                whileHover={shouldReduceMotion ? {} : { 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-300 -z-10" />
                
                {/* Skill name */}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 font-['Space_Grotesk'] leading-tight">
                  {skill.name}
                </h3>
            
                {/* Circular progress */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4">
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
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </svg>
                  
                  {/* Percentage */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">
                      {skill.level}%
                    </span>
                  </motion.div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
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
