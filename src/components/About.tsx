import { motion, useScroll, useTransform } from "framer-motion";
import type { About as AboutType } from "../types/portfolio";
import { useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import FloatingCard3D from "./FloatingCard3D";
import AnimatedSphere from "./AnimatedSphere";

interface AboutProps {
  data: AboutType;
}

export default function About({ data }: AboutProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-container relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-cyan-50/50 via-white to-violet-50/50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800"
    >
      {/* Decorative gradient orbs + 3D Spheres */}
      {!shouldReduceMotion && (
        <>
          <AnimatedSphere
            size={350}
            color="cyan"
            position="top-left"
            delay={0}
          />
          <AnimatedSphere
            size={300}
            color="violet"
            position="bottom-right"
            delay={3}
          />

          <motion.div
            className="absolute top-20 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent)",
              y,
            }}
          />
          <motion.div
            className="absolute bottom-20 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)",
              y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
            }}
          />
        </>
      )}

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        style={shouldReduceMotion ? {} : { opacity }}
      >
        {/* Section Header - Perfectly Centered - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-28"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-6 sm:mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: 0.2,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-2xl sm:text-3xl shadow-xl">
              👨‍💻
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-8 sm:mb-10 font-['Space_Grotesk'] leading-tight px-4">
            About Me
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" />
            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 rounded-full" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-violet-600 rounded-full" />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4 leading-relaxed">
            Passionate about creating exceptional digital experiences
          </p>
        </motion.div>

        {/* Main Content Card - Enhanced with 3D Effect */}
        <FloatingCard3D intensity={15} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-light rounded-3xl p-12 sm:p-14 md:p-16 lg:p-20 relative overflow-visible shadow-2xl"
            style={{
              boxShadow:
                "0 25px 60px -15px rgba(34, 211, 238, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
            }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-600/20 pointer-events-none" />

            {/* Animated corner accents */}
            {!shouldReduceMotion && (
              <>
                <motion.div
                  className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-cyan-400 rounded-tl-3xl opacity-50"
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
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: 0.4,
              }}
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
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                delay: 0.5,
              }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-center max-w-3xl mx-auto px-4 break-words"
            >
              {data.paragraph}
            </motion.p>

            {/* Skill badges */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                delay: 0.6,
              }}
              viewport={{ once: true }}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              {["React", "TypeScript", "Node.js", "UI/UX", "Framer Motion"].map(
                (skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.4,
                      delay: 0.7 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -5 }}
                    className="px-6 py-3 glass-light rounded-full text-sm font-semibold text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 card-hover"
                  >
                    {skill}
                  </motion.span>
                )
              )}
            </motion.div>
          </motion.div>
        </FloatingCard3D>
      </motion.div>
    </section>
  );
}
