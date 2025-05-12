"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"

interface CtaButtonsProps {
  primaryText?: string
  secondaryText?: string
  primaryHref?: string
  secondaryHref?: string
  delay?: number
  className?: string
}

export default function CtaButtons({
  primaryText = "Get Started",
  secondaryText = "Learn More",
  primaryHref = "#",
  secondaryHref = "#",
  delay = 1.1,
  className = "",
}: CtaButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`flex flex-col sm:flex-row gap-4 ${className}`}
    >
      <Button
        size="lg"
        className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-none rounded-lg group relative overflow-hidden"
        asChild
      >
        <a href={primaryHref}>
          <span className="relative z-10 flex items-center">
            {primaryText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </a>
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="border-gray-700 text-gray-300 hover:bg-gray-800 backdrop-blur-sm rounded-lg group"
        asChild
      >
        <a href={secondaryHref}>
          <span className="flex items-center">
            {secondaryText}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      </Button>
    </motion.div>
  )
}
