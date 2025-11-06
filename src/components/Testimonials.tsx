import { motion } from "framer-motion";
import type { Testimonial } from "../types/portfolio";

interface TestimonialsProps {
  data: Testimonial[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Testimonials({ data }: TestimonialsProps) {
  if (!data || data.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="section-container py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-cyan-50/30 to-violet-50/30 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6 text-center font-['Space_Grotesk'] px-4"
        >
          Client Testimonials
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 text-center mb-16 sm:mb-20 max-w-3xl mx-auto px-4"
        >
          What people say about working with me
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-8"
        >
          {data.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-light rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-cyan-500/20 transition-all w-full max-w-md"
              style={{
                boxShadow: "0 10px 40px rgba(34, 211, 238, 0.15)",
              }}
            >
              <div className="flex flex-col items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 p-1 mb-4"
                />
                <div className="text-center">
                  <h3 className="font-bold text-xl text-neutral-900 dark:text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-yellow-400 text-xl"
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-center text-base">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
