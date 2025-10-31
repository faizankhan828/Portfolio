import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function AnimatedBackground() {
  const { theme } = useTheme();
  
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 20,
  }));

  return (
    <div className="particles-bg">
      {/* Subtle floating orbs */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: `radial-gradient(circle, ${
              particle.id % 2 === 0
                ? 'var(--color-primary-400)'
                : 'var(--color-accent-400)'
            }${theme === 'dark' ? '20' : '15'}, transparent)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, -20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Large gradient overlays */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent-400/10 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
