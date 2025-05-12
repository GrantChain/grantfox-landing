"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ScrollIndicatorProps {
  text?: string
  delay?: number
}

export default function ScrollIndicator({ text = "Scroll to explore", delay = 1.5 }: ScrollIndicatorProps) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay,
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-gray-400 text-sm">{text}</span>
        <ArrowRight size={20} className="text-orange-400 transform rotate-90" />
      </motion.div>
    </div>
  )
}
