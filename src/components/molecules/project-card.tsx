"use client"

import { motion } from "framer-motion"
import ProgressBar from "@/components/atoms/progress-bar"

interface ProjectCardProps {
  title?: string
  subtitle?: string
  status?: string
  progress?: number
  totalFunding?: string
  releasedFunding?: string
  nextMilestone?: string
  daysLeft?: number
  delay?: number
}

export default function ProjectCard({
  title = "Smart Escrow",
  subtitle = "Trustless Funding",
  status = "Active",
  progress = 65,
  totalFunding = "120,000 USDC",
  releasedFunding = "78,000 USDC",
  nextMilestone = "Frontend Implementation",
  daysLeft = 3,
  delay = 0.7,
}: ProjectCardProps) {
  return (
    <motion.div
      className="lg:col-span-5"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 1 }}
    >
      <div className="relative">
        {/* Glowing effect behind card */}
        <div className="absolute -inset-4 bg-orange-500/20 rounded-2xl blur-xl"></div>

        {/* Main card */}
        <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

          {/* Card content */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="#ff6b00" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">{title}</h3>
                  <p className="text-gray-400 text-sm">{subtitle}</p>
                </div>
              </div>
              <div className="px-2 py-1 bg-orange-500/10 rounded text-orange-400 text-sm">{status}</div>
            </div>

            <ProgressBar value={progress} delay={delay + 0.5} />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Total Funding</p>
                <p className="text-white font-medium">{totalFunding}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Released</p>
                <p className="text-white font-medium">{releasedFunding}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Next Milestone</p>
                <p className="text-orange-400 text-sm">{daysLeft} days left</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-white text-sm">{nextMilestone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
