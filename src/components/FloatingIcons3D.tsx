import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Icon {
  symbol: string;
  color: string;
  size: string;
  delay: number;
}

const icons: Icon[] = [
  { symbol: '⚡', color: 'text-cyan-400', size: 'text-6xl', delay: 0 },
  { symbol: '💻', color: 'text-blue-400', size: 'text-5xl', delay: 1 },
  { symbol: '🚀', color: 'text-violet-400', size: 'text-7xl', delay: 2 },
  { symbol: '✨', color: 'text-cyan-300', size: 'text-4xl', delay: 3 },
  { symbol: '🎨', color: 'text-purple-400', size: 'text-6xl', delay: 4 },
  { symbol: '🔥', color: 'text-orange-400', size: 'text-5xl', delay: 5 },
];

const positions = [
  { top: '10%', left: '5%' },
  { top: '20%', right: '8%' },
  { top: '40%', left: '3%' },
  { top: '60%', right: '5%' },
  { top: '75%', left: '7%' },
  { top: '85%', right: '10%' },
];

export default function FloatingIcons3D() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className={`absolute ${icon.color} ${icon.size}`}
          style={{
            ...positions[index],
            filter: 'drop-shadow(0 0 20px currentColor)',
          }}
          initial={{ opacity: 0, scale: 0, rotateZ: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
            rotateZ: shouldReduceMotion ? 0 : [0, 360],
            y: shouldReduceMotion ? 0 : [0, -30, 0],
          }}
          transition={{
            duration: 8 + icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: icon.delay,
          }}
        >
          <motion.span
            animate={shouldReduceMotion ? {} : {
              rotateY: [0, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              display: 'inline-block',
              transformStyle: 'preserve-3d',
            }}
          >
            {icon.symbol}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
