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
      staggerChildren: 0.08
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0
  }
};

export default function Skills({ data }: SkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="skills" className="section-container relative py-12 sm:py-16 md:py-20 lg:py-32 pb-[500px] px-4 sm:px-6 md:px-8 mb-96 overflow-visible" aria-labelledby="skills-heading">
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
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
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
        
        {/* Circular orbit container */}
        <div className="relative w-full max-w-5xl mx-auto aspect-square max-h-[900px] min-h-[700px] overflow-visible px-8 mb-96 pb-64">
          {/* Center icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center relative group"
              animate={shouldReduceMotion ? {} : {
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
              <div className="text-4xl md:text-5xl relative z-10">💻</div>
            </motion.div>
          </motion.div>

          {/* Orbit rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-200/20 dark:border-primary-700/20"
              style={{
                width: `${(ring + 1) * 33}%`,
                height: `${(ring + 1) * 33}%`,
              }}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: ring * 0.1 }}
              viewport={{ once: true }}
            />
          ))}

          {/* Skills in orbit */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative w-full h-full overflow-visible"
          >
            {data.map((skill, index) => {
              const angle = (index / data.length) * 360;
              const radius = 44; // percentage from center - increased for more space
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="absolute overflow-visible"
                  style={{
                    left: `calc(50% + ${x}%)`,
                    top: `calc(50% + ${y}%)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <motion.div
                    className="glass-light rounded-2xl p-4 md:p-5 hover:scale-105 transition-all duration-300 cursor-pointer group relative w-[170px] md:w-[190px] overflow-visible"
                    whileHover={shouldReduceMotion ? {} : { 
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                    animate={shouldReduceMotion ? {} : {
                      y: [0, -8, 0],
                    }}
                    transition={{
                      y: {
                        duration: 3 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all duration-300 blur-xl -z-10" />
                    
                    <div className="relative text-center overflow-visible z-10">
                      <h3 className="text-xs md:text-sm font-bold text-neutral-900 dark:text-white mb-2 font-['Space_Grotesk'] break-words leading-snug min-h-[40px] flex items-center justify-center px-2 overflow-visible whitespace-normal">
                        {skill.name}
                      </h3>
                      
                      {/* Circular progress */}
                      <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                          {/* Background circle */}
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-neutral-200 dark:text-neutral-700"
                          />
                          {/* Progress circle */}
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                            whileInView={{
                              strokeDashoffset: 2 * Math.PI * 28 * (1 - skill.level / 100),
                            }}
                            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </svg>
                        
                        {/* Percentage in center */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-xs md:text-sm font-bold gradient-text">
                            {skill.level}%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
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
        
        {/* Large spacing div to prevent overlap */}
        <div className="h-[400px]"></div>
      </div>
    </section>
  );
}
