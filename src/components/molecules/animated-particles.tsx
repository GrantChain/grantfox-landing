"use client";

import { motion } from "framer-motion";

// Seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return Number((x - Math.floor(x)).toFixed(4));
}

interface AnimatedParticlesProps {
  count?: number;
  className?: string;
}

export default function AnimatedParticles({
  count = 15,
  className = "",
}: AnimatedParticlesProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const seed = i + 1;
        const left = Number((seededRandom(seed) * 100).toFixed(4));
        const top = Number((seededRandom(seed + 1) * 100).toFixed(4));
        const width = Number((seededRandom(seed + 2) * 15 + 5).toFixed(4));
        const height = Number((seededRandom(seed + 3) * 15 + 5).toFixed(4));
        const opacity = Number((seededRandom(seed + 4) * 0.3 + 0.1).toFixed(4));
        const duration = Number((seededRandom(seed + 5) * 8 + 8).toFixed(4));
        const delay = Number((seededRandom(seed + 6) * 5).toFixed(4));
        const x = Number((seededRandom(seed + 7) * 200 - 100).toFixed(4));
        const y = Number((seededRandom(seed + 8) * -200).toFixed(4));

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0.5],
              x: [0, x],
              y: [0, y],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-orange-500"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}px`,
              height: `${height}px`,
              opacity,
              filter: "blur(2px)",
            }}
          />
        );
      })}
    </div>
  );
}
