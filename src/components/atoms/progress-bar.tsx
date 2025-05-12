"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  className?: string
  animate?: boolean
  delay?: number
}

export default function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  className,
  animate = true,
  delay = 0,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn("space-y-2", className)}>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        {animate ? (
          <motion.div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay, duration: 1.5, ease: "easeOut" }}
          />
        ) : (
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>

      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Progress</span>
          <span className="text-white">{percentage}%</span>
        </div>
      )}
    </div>
  )
}
