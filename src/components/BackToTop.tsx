'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 400;

const buttonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15, ease: 'easeIn' } },
};

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-turfu-accent hover:bg-turfu-accent/90 text-white shadow-lg shadow-turfu-accent/25 transition-colors focus:outline-none focus:ring-2 focus:ring-turfu-accent focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          aria-label="Back to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
