"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export default function RotatingText({
  texts,
  interval = 3000,
  className = "",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  if (!texts || texts.length === 0) return null;

  return (
    <div className={`relative inline-block overflow-hidden h-8 sm:h-10 md:h-12 align-middle ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-block whitespace-nowrap font-semibold text-gradient"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
