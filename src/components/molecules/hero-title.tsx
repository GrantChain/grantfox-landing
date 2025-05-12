"use client"

import { motion } from "framer-motion"
import AnimatedWordRotator from "@/components/atoms/animated-word-rotator"

interface HeroTitleProps {
  title: string[]
  subtitle?: string
  rotatingWords?: string[]
  className?: string
}

export default function HeroTitle({
  title,
  subtitle,
  rotatingWords = ["Blockchains", "DAOs", "Hackathons", "Events"],
  className = "",
}: HeroTitleProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold leading-tight"
      >
        {title.map((line, index) => (
          <span
            key={index}
            className={
              index === 1
                ? "block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
                : "block text-white"
            }
          >
            {line}
          </span>
        ))}
      </motion.h1>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-center gap-2 text-xl md:text-2xl text-gray-400"
        >
          <span>{subtitle}</span>
          <AnimatedWordRotator words={rotatingWords} />
        </motion.div>
      )}
    </div>
  )
}
