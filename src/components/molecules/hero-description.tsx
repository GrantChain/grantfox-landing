"use client"

import type React from "react"

import { motion } from "framer-motion"

interface HeroDescriptionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function HeroDescription({ children, delay = 0.9, className = "" }: HeroDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`relative ${className}`}
    >
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent"></div>
      <p className="text-gray-300 text-lg pl-4 max-w-xl">{children}</p>
    </motion.div>
  )
}
