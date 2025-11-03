import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  icon: string;
  title: string;
  size?: number;
}

export default function RotatingCube3D({ icon, title, size = 120 }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative mx-auto"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
        }}
        animate={shouldReduceMotion ? {} : {
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={shouldReduceMotion ? {} : {
          scale: 1.1,
          rotateZ: 45,
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-2xl"
          style={{
            transform: `translateZ(${size / 2}px)`,
            backfaceVisibility: 'hidden',
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)',
          }}
        >
          {icon}
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl shadow-2xl"
          style={{
            transform: `translateZ(-${size / 2}px) rotateY(180deg)`,
            backfaceVisibility: 'hidden',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
          }}
        >
          {icon}
        </div>

        {/* Right Face */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-2xl"
          style={{
            transform: `rotateY(90deg) translateZ(${size / 2}px)`,
            backfaceVisibility: 'hidden',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)',
          }}
        >
          {icon}
        </div>

        {/* Left Face */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl shadow-2xl"
          style={{
            transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
            backfaceVisibility: 'hidden',
            boxShadow: '0 0 40px rgba(147, 51, 234, 0.4)',
          }}
        >
          {icon}
        </div>

        {/* Top Face */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl bg-gradient-to-br from-cyan-300 to-blue-400 rounded-2xl shadow-2xl"
          style={{
            transform: `rotateX(90deg) translateZ(${size / 2}px)`,
            backfaceVisibility: 'hidden',
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.3)',
          }}
        >
          {icon}
        </div>

        {/* Bottom Face */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl bg-gradient-to-br from-violet-300 to-purple-400 rounded-2xl shadow-2xl"
          style={{
            transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
            backfaceVisibility: 'hidden',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
          }}
        >
          {icon}
        </div>
      </motion.div>

      {/* Title below cube */}
      <motion.div
        className="text-center mt-6 text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {title}
      </motion.div>
    </div>
  );
}
