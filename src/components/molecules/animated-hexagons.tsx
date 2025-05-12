"use client";

import { motion } from "framer-motion";

// Seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return Number((x - Math.floor(x)).toFixed(4));
}

interface AnimatedHexagonsProps {
  count?: number;
  className?: string;
}

export default function AnimatedHexagons({
  count = 12,
  className = "",
}: AnimatedHexagonsProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const seed = i + 1;
        const left = Number((seededRandom(seed) * 100).toFixed(4));
        const top = Number((seededRandom(seed + 1) * 100).toFixed(4));
        const width = Number((seededRandom(seed + 2) * 150 + 50).toFixed(4));
        const height = Number((seededRandom(seed + 3) * 150 + 50).toFixed(4));
        const opacity = Number((seededRandom(seed + 4) * 0.2 + 0.1).toFixed(4));
        const duration = Number((seededRandom(seed + 5) * 15 + 10).toFixed(4));
        const delay = Number((seededRandom(seed + 6) * 5).toFixed(4));

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              rotate: [0, 30],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute border border-orange-500/20"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}px`,
              height: `${height}px`,
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              opacity,
            }}
          />
        );
      })}
    </div>
  );
}
