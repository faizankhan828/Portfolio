import { motion, useScroll, useTransform } from 'framer-motion';
import type { About as AboutType } from '../types/portfolio';
import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AboutProps {
  data: AboutType;
}

export default function About({ data }: AboutProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="section-container relative bg-white dark:bg-neutral-900"
    >
      {/* Decorative gradient orb */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-400), transparent)',
            y,
          }}
        />
      )}

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto"
        style={shouldReduceMotion ? {} : { opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl">👨‍💻</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 font-['Space_Grotesk']">
            About Me
          </h2>
          
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
        </motion.div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Animated corner accents */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary-400 rounded-tl-3xl"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-accent-400 rounded-br-3xl"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </>
          )}

          {/* Avatar placeholder with glow */}
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-5xl md:text-6xl font-bold shadow-2xl">
              {data.paragraph.charAt(0)}
            </div>
          </motion.div>

          {/* About text */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-center max-w-2xl mx-auto"
          >
            {data.paragraph}
          </motion.p>

          {/* Skill badges */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {['React', 'TypeScript', 'Node.js', 'UI/UX', 'Framer Motion'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -5 }}
                className="px-6 py-3 glass-light rounded-full text-sm font-semibold text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 card-hover"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats or highlights */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200 dark:border-neutral-700"
          >
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '50+', label: 'Projects' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
