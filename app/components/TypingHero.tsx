"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingHeroProps {
  words?: string[];
  interval?: number;
  className?: string;
}

const TypingHero: React.FC<TypingHeroProps> = ({ 
  words = ['Voice', 'Vote', 'Vision', 'Power', 'Choice', 'Future'],
  interval = 2000,
  className = ''
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={`flex flex-col items-start justify-center ${className}`}>
      <h1 className="mb-8 text-8xl font-bold tracking-tight text-white flex items-center gap-4">
        <span>Your</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[currentWordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-[200px] inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300"
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </h1>
    </div>
  );
};

export default TypingHero;