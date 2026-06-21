import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-bg-base">
      {/* Ambient Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[8rem] md:text-[12rem] leading-none font-display font-bold text-fg-bright tracking-tighter">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-2xl md:text-3xl text-fg-dim font-medium">
            Page not found
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-bg-base rounded-full font-bold text-lg transition-all duration-300 hover:bg-fg-bright hover:shadow-[0_0_30px_rgba(168,193,85,0.4)]"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
