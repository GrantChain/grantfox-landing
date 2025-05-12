"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary"
  className?: string
  animate?: boolean
  delay?: number
}

export default function Badge({ children, variant = "default", className, animate = false, delay = 0 }: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"

  const variantStyles = {
    default: "bg-orange-500/10 text-orange-400",
    outline: "bg-transparent border border-orange-500/20 text-orange-400",
    secondary: "bg-gray-800/50 text-gray-300",
  }

  const badge = <div className={cn(baseStyles, variantStyles[variant], className)}>{children}</div>

  if (animate) {
    return (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.8 }}>
        {badge}
      </motion.div>
    )
  }

  return badge
}
