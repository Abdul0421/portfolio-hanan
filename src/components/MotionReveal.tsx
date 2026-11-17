"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  distance?: number;
}

export default function MotionReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className = "",
  distance = 24,
}: MotionRevealProps) {
  let initialX = 0;
  let initialY = 0;

  if (direction === "up") initialY = distance;
  if (direction === "down") initialY = -distance;
  if (direction === "left") initialX = distance;
  if (direction === "right") initialX = -distance;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
