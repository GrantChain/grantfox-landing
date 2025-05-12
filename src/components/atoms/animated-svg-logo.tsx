"use client"

import { motion } from "framer-motion"

interface AnimatedSvgLogoProps {
  width?: number
  height?: number
  opacity?: number
  className?: string
}

export default function AnimatedSvgLogo({
  width = 300,
  height = 300,
  opacity = 0.15,
  className = "",
}: AnimatedSvgLogoProps) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M50 10 L80 40 L50 90 L20 40 Z"
          fill="url(#orangeGradient)"
          stroke="#ff6b00"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M20 40 L50 60 L80 40"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M35 25 L20 40"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M65 25 L80 40"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
        />
        <motion.circle
          cx="40"
          cy="35"
          r="3"
          fill="#ff6b00"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.circle
          cx="60"
          cy="35"
          r="3"
          fill="#ff6b00"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <defs>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b00" />
            <stop offset="100%" stopColor="#ff9500" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
