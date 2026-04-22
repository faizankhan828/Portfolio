import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f] text-white"
    >
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Elegant rotating border */}
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #4F8EF7, #7B5CF5)',
              padding: '4px',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="w-full h-full rounded-full bg-[#111118] flex items-center justify-center shadow-2xl border border-white/10">
              <span className="text-4xl sm:text-5xl font-bold gradient-text font-['Space_Grotesk']">
                {'</>'}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(0, 212, 255, 0.45)',
              opacity: 0.3,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl font-semibold gradient-text mb-3">
            Loading Portfolio
          </p>

          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: '#00d4ff' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-48 h-1 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
