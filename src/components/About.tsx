import { motion } from "framer-motion";
import type { About as AboutType } from "../types/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface AboutProps {
  data: AboutType;
}

export default function About({ data }: AboutProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section
      id="about"
      className="section-container relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-cyan-50/50 via-white to-violet-50/50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800"
    >
      {/* Decorative gradient orbs - Desktop only, no heavy animations */}
      {!shouldReduceMotion && !isMobile && (
        <>
          <div
            className="absolute top-20 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-gradient-to-br from-cyan-400 to-blue-500"
          />
          <div
            className="absolute bottom-20 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-gradient-to-br from-violet-400 to-purple-500"
          />
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header - Fast animations */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-4 sm:mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: isMobile ? 0.3 : 0.4,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
              👨‍💻
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 font-['Space_Grotesk'] leading-tight px-4">
            About Me
          </h2>

          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" />
            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 rounded-full" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-violet-600 rounded-full" />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4 leading-relaxed">
            Passionate about creating exceptional digital experiences
          </p>
        </motion.div>

        {/* Main Content Card - Simplified, no 3D effects on mobile */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-light rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative shadow-xl"
        >
          {/* Gradient border effect - Static */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-600/10 pointer-events-none" />

          {/* Avatar - Simplified */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-6">
            <div className="relative w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl font-bold shadow-lg">
              {data.paragraph.charAt(0)}
            </div>
          </div>

          {/* About text */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-center max-w-4xl mx-auto break-words mb-8">
            {data.paragraph}
          </p>

          {/* Skill badges - Fast stagger */}
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "TypeScript", "Node.js", "UI/UX", "Framer Motion"].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="px-4 py-2 sm:px-6 sm:py-3 glass-light rounded-full text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
