import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  size?: number;
  color?: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  delay?: number;
}

export default function AnimatedSphere({ 
  size = 300, 
  color = 'cyan', 
  position = 'center',
  delay = 0 
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const positionClasses = {
    'top-left': '-top-20 -left-20',
    'top-right': '-top-20 -right-20',
    'bottom-left': '-bottom-20 -left-20',
    'bottom-right': '-bottom-20 -right-20',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const gradients = {
    cyan: 'from-cyan-400 via-blue-500 to-cyan-600',
    violet: 'from-violet-400 via-purple-500 to-violet-600',
    blue: 'from-blue-400 via-sky-500 to-blue-600',
    mixed: 'from-cyan-400 via-violet-500 to-blue-600',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none ${isMobile ? 'hidden' : ''}`}
      style={{
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
        rotateZ: shouldReduceMotion ? 0 : [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    >
      {/* Outer glow */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradients[color as keyof typeof gradients] || gradients.cyan} blur-3xl opacity-40`} />
      
      {/* Middle layer */}
      <motion.div
        className={`absolute inset-8 rounded-full bg-gradient-to-br ${gradients[color as keyof typeof gradients] || gradients.cyan} blur-2xl`}
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5,
        }}
      />
      
      {/* Inner core */}
      <motion.div
        className={`absolute inset-16 rounded-full bg-gradient-to-br ${gradients[color as keyof typeof gradients] || gradients.cyan} blur-xl opacity-70`}
        animate={shouldReduceMotion ? {} : {
          scale: [1, 0.9, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          delay: delay + 1,
        }}
      />

      {/* Sparkle effect */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-white"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay + 2,
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-white"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: delay + 3,
            }}
          />
        </>
      )}
    </motion.div>
  );
}
