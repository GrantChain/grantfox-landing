"use client"

import { motion } from "framer-motion"

interface AnimatedHexagonsProps {
  count?: number
  className?: string
}

export default function AnimatedHexagons({ count = 12, className = "" }: AnimatedHexagonsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.2, 0],
            rotate: [0, 30],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="absolute border border-orange-500/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            opacity: Math.random() * 0.2 + 0.1,
          }}
        />
      ))}
    </div>
  )
}
