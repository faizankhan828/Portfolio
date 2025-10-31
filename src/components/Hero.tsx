import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Hero as HeroType } from '../types/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  data: HeroType;
}

export default function Hero({ data }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
      aria-label="Hero section"
    >
      {/* Animated gradient orbs */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, var(--color-primary-400), transparent)',
              y,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, var(--color-accent-400), transparent)',
              y,
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants}>
            <span className="inline-block px-6 py-2 rounded-full glass-light text-sm font-medium text-primary-600 dark:text-primary-400">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="block text-neutral-900 dark:text-white font-['Space_Grotesk']">
              {data.name}
            </span>
          </motion.h1>

          {/* Title with gradient */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold gradient-text">
              {data.title}
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            {data.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.a
              href={data.cta.primary.href}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full overflow-hidden shadow-xl"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, boxShadow: 'var(--shadow-2xl)' }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {data.cta.primary.text}
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
            </motion.a>

            <motion.a
              href={data.cta.secondary.href}
              className="px-8 py-4 glass text-neutral-900 dark:text-white font-semibold rounded-full border-2 border-primary-200 dark:border-primary-800 hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              {data.cta.secondary.text}
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="pt-16"
          >
            <motion.button
              className="flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer"
              animate={shouldReduceMotion ? {} : {
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onClick={() => {
                const aboutSection = document.getElementById('about');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Scroll to about section"
            >
              <span className="text-sm font-medium">Scroll Down</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-10 w-3 h-3 rounded-full"
            style={{ backgroundColor: 'var(--color-primary-400)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/3 right-20 w-4 h-4 rounded-full"
            style={{ backgroundColor: 'var(--color-accent-400)' }}
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-primary-300)' }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </section>
  );
}
