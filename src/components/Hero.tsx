import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Hero as HeroType } from "../types/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Props {
  data: HeroType;
}

export default function Hero({ data }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const itemTransition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50 dark:from-secondary-900 dark:via-neutral-900 dark:to-neutral-800"
      aria-label="Hero section"
    >
      {/* Animated gradient orbs - Optimized */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 -left-1/4 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)",
              y,
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)",
              y,
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              x: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Content - Perfectly Centered & Responsive */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8 md:space-y-10"
        >
          {/* Greeting Badge - Responsive */}
          <motion.div variants={itemVariants} transition={itemTransition}>
            <span className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full glass-light text-sm sm:text-lg md:text-xl font-bold text-cyan-600 dark:text-cyan-400 shadow-2xl border-2 border-cyan-300/70 dark:border-cyan-500/50">
              <span className="text-xl sm:text-2xl md:text-3xl">👋</span>
              <span className="hidden xs:inline">Welcome to my portfolio</span>
              <span className="xs:hidden">Welcome</span>
            </span>
          </motion.div>

          {/* Name - MUCH LARGER with 3D Effect - Responsive */}
          <motion.h1
            variants={itemVariants}
            transition={itemTransition}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none px-2"
            style={{
              textShadow:
                "4px 4px 8px rgba(0, 0, 0, 0.15), 0 0 40px rgba(34, 211, 238, 0.2)",
            }}
          >
            <span className="block text-neutral-900 dark:text-white font-['Space_Grotesk'] mb-2 sm:mb-4">
              {data.name}
            </span>
          </motion.h1>

          {/* Title with Enhanced Gradient - LARGER - Responsive */}
          <motion.div variants={itemVariants} transition={itemTransition}>
            <h2
              className="hero-title-white text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2"
              style={{
                textShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)",
              }}
            >
              {data.title}
            </h2>
          </motion.div>

          {/* Tagline - LARGER & Better Readability - Responsive */}
          <motion.p
            variants={itemVariants}
            transition={itemTransition}
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-cyan-700 dark:text-cyan-300 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-semibold px-4"
            style={{
              textShadow: "0 2px 10px rgba(6, 182, 212, 0.3)",
            }}
          >
            {data.tagline}
          </motion.p>

          {/* CTA Buttons - LARGER with 3D Effects - Responsive */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 pt-4 sm:pt-6 md:pt-8 px-4"
          >
            <motion.a
              href={data.cta.primary.href}
              className="group relative w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 text-white font-bold text-base sm:text-lg md:text-xl rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
              style={{
                boxShadow:
                  "0 10px 40px rgba(34, 211, 238, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
              }}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: -2 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span>{data.cta.primary.text}</span>
                <motion.svg
                  className="w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href={data.cta.secondary.href}
              className="group w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 glass-light text-neutral-900 dark:text-white font-bold text-base sm:text-lg md:text-xl rounded-2xl border-2 border-cyan-300/70 dark:border-violet-500/50 hover:border-cyan-500 dark:hover:border-violet-400 transition-all duration-300 hover:shadow-2xl"
              style={{
                boxShadow: "0 5px 20px rgba(168, 85, 247, 0.2)",
              }}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: -2 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                {data.cta.secondary.text}
              </span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator - With More Spacing - Responsive */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="pt-16 sm:pt-24 md:pt-32 lg:pt-40 flex justify-center"
          >
            <motion.button
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex flex-col items-center gap-2 sm:gap-3 text-neutral-500 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer group mx-auto"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, 10, 0],
                    }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-label="Scroll to content"
            >
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">
                Scroll to explore
              </span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
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
            style={{ backgroundColor: "var(--color-primary-400)" }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/3 right-20 w-4 h-4 rounded-full"
            style={{ backgroundColor: "var(--color-accent-400)" }}
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-primary-300)" }}
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
