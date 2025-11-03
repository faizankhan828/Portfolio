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
    <section id="timeline" className="py-32 px-6 md:px-8 mt-[600px] pt-96 clear-both bg-gradient-to-br from-cyan-50/30 via-white to-violet-50/30 dark:bg-gradient-to-br dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6 text-center font-['Space_Grotesk']"
        >
          Experience & Education
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 text-center mb-20 max-w-3xl mx-auto"
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
          {/* Timeline line - Centered gradient */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-violet-600 hidden md:block rounded-full" />

          <div className="space-y-12">
            {data.map((timelineItem, index) => (
              <motion.div
                key={timelineItem.id}
                variants={item}
                className="relative"
              >
                {/* Timeline dot - Centered */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute left-1/2 -translate-x-1/2 top-8 w-6 h-6 bg-white dark:bg-neutral-800 border-4 border-cyan-500 rounded-full hidden md:block z-10 shadow-lg shadow-cyan-500/50"
                />

                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="glass-light rounded-2xl p-8 md:p-10 shadow-2xl hover:shadow-cyan-500/20 transition-all max-w-2xl mx-auto"
                  style={{
                    boxShadow: '0 10px 40px rgba(34, 211, 238, 0.15)'
                  }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                    <span className="text-base font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/50 px-5 py-2 rounded-full shadow-md">
                      {timelineItem.year}
                    </span>
                    <span className={`text-base font-semibold px-5 py-2 rounded-full shadow-md ${
                      timelineItem.type === 'work' 
                        ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    }`}>
                      {timelineItem.type === 'work' ? '💼 Work' : '🎓 Education'}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 text-center">
                    {timelineItem.title}
                  </h3>

                  <p className="text-lg text-cyan-600 dark:text-cyan-400 font-semibold mb-4 text-center">
                    {timelineItem.company}
                  </p>

                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-center text-base">
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
