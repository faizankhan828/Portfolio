import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'testimonials', 'timeline', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.nav
        style={{ backgroundColor: shouldReduceMotion ? undefined : navBackground }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              <button
                onClick={() => scrollToSection('hero')}
                className="text-3xl font-bold gradient-text-sky font-['Space_Grotesk'] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2 text-white"
                aria-label="Go to homepage"
              >
                {'< />'}
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-5 py-2.5 text-lg font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-200 hover:text-white'
                    }`}
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.08 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                    aria-label={`Navigate to ${item.label} section`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    
                    {/* Active indicator - Sky Blue */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-sky-400/40 via-blue-500/40 to-cyan-500/40 rounded-full -z-10 glow-sky"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover glow - Sky Blue */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-cyan-500/20 rounded-full -z-20 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                );
              })}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="ml-4 p-3 text-gray-200 hover:text-white rounded-full glass transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent"
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.15, rotate: shouldReduceMotion ? 0 : 180 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Mobile theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 text-gray-300 hover:text-white rounded-full glass transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileTap={{ scale: 0.9 }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-white rounded-lg glass transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { height: 'auto', opacity: 1 },
            closed: { height: 0, opacity: 0 },
          }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden glass border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600/30 to-cyan-600/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={isOpen ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
