import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]
  );

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = [
            "hero",
            "about",
            "projects",
            "skills",
            "testimonials",
            "timeline",
            "contact",
          ];

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
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Optimized smooth scroll with better performance
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 60 : 80; // Account for fixed nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
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
        style={{
          backgroundColor: shouldReduceMotion ? undefined : navBackground,
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/90 dark:bg-neutral-900/90 border-b-2 border-cyan-200/30 dark:border-violet-700/30 shadow-2xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo - MUCH LARGER with 3D Effect - Responsive */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.08 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              <button
                onClick={() => scrollToSection("hero")}
                className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 font-['Space_Grotesk'] focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-2.5 hover:scale-110 transition-transform"
                style={{
                  textShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                }}
                aria-label="Go to homepage"
              >
                {"</>"}
              </button>
            </motion.div>

            {/* Desktop Navigation - MUCH LARGER & Professional - Responsive */}
            <div className="hidden md:flex md:items-center md:gap-2 lg:gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-6 lg:px-8 py-3 lg:py-3.5 text-base lg:text-lg font-bold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${
                      isActive
                        ? "text-white dark:text-white"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                    style={
                      isActive
                        ? {
                            boxShadow:
                              "0 8px 30px rgba(34, 211, 238, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
                          }
                        : {}
                    }
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: -2 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                    aria-label={`Navigate to ${item.label} section`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Active indicator - ENHANCED 3D Gradient */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 rounded-2xl shadow-2xl"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover background - Enhanced */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-violet-50 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          boxShadow: "0 4px 15px rgba(168, 85, 247, 0.15)",
                        }}
                        initial={{ opacity: 0 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Theme Toggle - LARGER with 3D Effect */}
              <motion.button
                onClick={toggleTheme}
                className="ml-4 lg:ml-6 p-2.5 lg:p-3 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-2xl bg-gradient-to-br from-cyan-100 to-violet-100 dark:from-neutral-800 dark:to-neutral-700 hover:from-cyan-200 hover:to-violet-200 dark:hover:from-neutral-700 dark:hover:to-neutral-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                style={{
                  boxShadow: "0 4px 15px rgba(168, 85, 247, 0.2)",
                }}
                whileHover={{
                  scale: shouldReduceMotion ? 1 : 1.15,
                  rotate: shouldReduceMotion ? 0 : 180,
                }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? (
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Mobile theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-3 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                whileTap={{ scale: 0.9 }}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu - Enhanced */}
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { height: "auto", opacity: 1 },
            closed: { height: 0, opacity: 0 },
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            ease: "easeInOut",
          }}
          className="md:hidden overflow-hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700"
        >
          <div className="px-6 py-6 space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-5 py-4 text-base font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={isOpen ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                  aria-current={isActive ? "page" : undefined}
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
