"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface HeroPortraitCardProps {
  avatarUrl: string;
  name: string;
  gpa?: string;
  major?: string;
}

export default function HeroPortraitCard({
  avatarUrl,
  name,
  gpa = "3.65",
  major = "S1 Teknik Industri",
}: HeroPortraitCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });

  // 3D Motion Values for smooth perspective tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    setGlarePos({ x: mouseX, y: mouseY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className="relative w-full max-w-[330px] sm:max-w-md mx-auto perspective-1000 select-none py-4 px-2 sm:px-4">
      
      {/* Ambient Pulsing Atmospheric Glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-sky-500/25 rounded-[36px] blur-2xl -z-10 pointer-events-none"
      />

      {/* Floating Levitation Wrapper */}
      <motion.div
        animate={{
          y: isHovered ? 0 : [-6, 6, -6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >

        {/* Interactive 3D Card Main Container */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchEnd={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-3xl p-3 sm:p-4 bg-white/95 dark:bg-[#101726]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-2xl transition-all duration-300 hover:shadow-emerald-500/10 cursor-pointer overflow-hidden group"
        >
          
          {/* Spotlight Cursor Glare */}
          {isHovered && (
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle 280px at ${glarePos.x}px ${glarePos.y}px, rgba(16, 185, 129, 0.18), transparent 75%)`,
              }}
            />
          )}

          {/* Photo Frame Container */}
          <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
            
            {/* Portrait Image */}
            <Image
              src={avatarUrl}
              alt={name}
              fill
              priority
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              unoptimized
            />

            {/* Subtle Diagonal Shimmer Sweep (Keren & High-Tech) */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent skew-x-12"
              animate={{
                x: ["-180%", "280%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
            />

            {/* Bottom Dark Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none z-10" />

            {/* Floating Info Overlay (Clean Executive Card) */}
            <div className="absolute bottom-3 left-3 right-3 z-20 p-3 sm:p-3.5 rounded-xl bg-white/95 dark:bg-[#0b101d]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/15 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold font-formal text-slate-900 dark:text-white truncate">
                    {name}
                  </p>
                  <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                    {major} • IPK {gpa}
                  </p>
                </div>

                {/* Radar Ping Active Pill */}
                <div className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-ui">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Active</span>
                </div>
              </div>
            </div>

          </div>

        </motion.div>

      </motion.div>
    </div>
  );
}
