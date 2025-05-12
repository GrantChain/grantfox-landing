"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedWordRotatorProps {
  words: string[]
  interval?: number
  className?: string
}

export default function AnimatedWordRotator({
  words,
  interval = 2000,
  className = "text-orange-400 font-medium",
}: AnimatedWordRotatorProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <div className="h-8 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute ${className}`}
        >
          {words[currentWordIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
