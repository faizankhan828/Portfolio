import { motion } from 'framer-motion';
import type { TimelineItem } from '../types/portfolio';

interface TimelineProps {
  data: TimelineItem[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 }
};

export default function Timeline({ data }: TimelineProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="timeline" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center"
        >
          Experience & Education
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          My professional journey and educational background
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden md:block" />

          <div className="space-y-8">
            {data.map((timelineItem, index) => (
              <motion.div
                key={timelineItem.id}
                variants={item}
                className="relative pl-0 md:pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute left-6 top-6 w-5 h-5 bg-white dark:bg-gray-800 border-4 border-indigo-500 rounded-full hidden md:block"
                />

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
                      {timelineItem.year}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      timelineItem.type === 'work' 
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                        : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    }`}>
                      {timelineItem.type === 'work' ? '💼 Work' : '🎓 Education'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {timelineItem.title}
                  </h3>

                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
                    {timelineItem.company}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {timelineItem.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
