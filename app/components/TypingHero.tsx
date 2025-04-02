"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingHero = () => {
  const words = ['Optimize', 'Boost', 'Upgrade', 'Polish', 'Revamp'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="mb-8 text-8xl font-bold tracking-tight text-white flex items-center gap-4">
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
        <span>Resume</span>
      </h1>
    </div>
  );
};

export default TypingHero;