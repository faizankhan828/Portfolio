import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: "💻", url: "https://github.com" },
    { name: "LinkedIn", icon: "💼", url: "https://linkedin.com" },
    { name: "Twitter", icon: "🐦", url: "https://twitter.com" },
    { name: "Email", icon: "✉️", url: "mailto:contact@example.com" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="px-2">
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Portfolio
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Building elegant solutions with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="px-2">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About", "Projects", "Skills", "Contact"].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 5 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm sm:text-base transition-colors block py-1"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="px-2">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors text-lg p-2"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-gray-200 dark:border-gray-700 text-center px-2"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            © {currentYear} Portfolio. Built with React, TypeScript & Tailwind
            CSS.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
