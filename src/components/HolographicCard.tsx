import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicCard({ children, className = '' }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 50, y: 50 });
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={shouldReduceMotion ? {} : {
        scale: 1.05,
        rotateX: (mousePosition.y - 50) * 0.1,
        rotateY: (mousePosition.x - 50) * 0.1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Holographic gradient overlay */}
      {isHovered && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(34, 211, 238, 0.8), 
              rgba(168, 85, 247, 0.6) 30%, 
              transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Rainbow shimmer effect */}
      {isHovered && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(135deg, 
              transparent 0%, 
              rgba(34, 211, 238, 0.3) 25%, 
              rgba(168, 85, 247, 0.3) 50%, 
              rgba(59, 130, 246, 0.3) 75%, 
              transparent 100%)`,
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Glowing border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          boxShadow: isHovered 
            ? `0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)`
            : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      />

      {/* Sparkles */}
      {isHovered && !shouldReduceMotion && (
        <>
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50"
            style={{
              left: `${mousePosition.x + 10}%`,
              top: `${mousePosition.y - 10}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.3,
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-0" style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
