"use client"

import { motion } from "framer-motion"

interface AnimatedParticlesProps {
  count?: number
  className?: string
}

export default function AnimatedParticles({ count = 15, className = "" }: AnimatedParticlesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0.5],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * -200],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            delay: Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-orange-500"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 15 + 5}px`,
            height: `${Math.random() * 15 + 5}px`,
            opacity: Math.random() * 0.3 + 0.1,
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  )
}
