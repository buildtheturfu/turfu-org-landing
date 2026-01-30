'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const iconVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.5 },
  animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, rotate: 90, scale: 0.5, transition: { duration: 0.15, ease: 'easeIn' } },
};

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch - render placeholder with same dimensions
  if (!mounted) {
    return (
      <div
        className="fixed bottom-5 right-20 z-30 w-11 h-11"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-20 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-[var(--overlay-hover)] hover:bg-[var(--overlay)] text-[var(--foreground)] shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-center"
          >
            <Sun size={20} aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-center"
          >
            <Moon size={20} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
