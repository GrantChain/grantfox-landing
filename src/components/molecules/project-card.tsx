"use client"

import { motion } from "framer-motion"
import React from "react"

interface ContributionCardProps {
  repoName?: string
  repoOwner?: string
  issueTitle?: string
  issueLabels?: string[]
  applicants?: number
  status?: "Open" | "Assigned" | "In Review"
  contributorsCount?: number
  prsMerged?: number
  stars?: number // optional
  delay?: number
}

function GitHubIcon() {
  return (
    <img
      src="/images/github-logo.png"
      alt="Project logo"
      className="w-10 h-10 object-contain"
      aria-hidden
    />
  )
}

function StatusBadge({ status }: { status: ContributionCardProps["status"] }) {
  const base = "px-3 py-1 rounded text-sm font-medium"
  if (status === "Assigned") {
    return <div className={base + " bg-orange-500/10 text-orange-400 border border-orange-500"}>{status}</div>
  }
  if (status === "In Review") {
    return <div className={base + " bg-amber-500/8 text-amber-400 border border-amber-600"}>{status}</div>
  }
  return <div className={base + " bg-gray-800/60 text-gray-300 border border-gray-700"}>{status}</div>
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="space-y-1">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  )
}

export default function ProjectCard({
  repoName = "grantfox-landing",
  repoOwner = "GrantFox",
  issueTitle = "Add contribution card component",
  issueLabels = ["frontend", "typescript", "good first issue"],
  applicants = 5,
  status = "Assigned",
  contributorsCount = 12,
  prsMerged = 87,
  stars = 320,
  delay = 0.7,
}: ContributionCardProps) {
  return (
    <motion.div
      className="lg:col-span-5"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.9 }}
    >
      <div className="relative">
        {/* Glowing effect behind card */}
        <div className="absolute -inset-3 bg-orange-500/20 rounded-2xl blur-xl"></div>

        {/* Main card */}
        <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 overflow-hidden hover:scale-[1.002] transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none"></div>

          {/* Card content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <GitHubIcon />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{repoOwner}</p>
                  <h3 className="text-white font-medium">{repoOwner}/{repoName}</h3>
                </div>
              </div>
              <StatusBadge status={status} />
            </div>

            {/* Issue highlight */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.15, duration: 0.6 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white font-semibold">{issueTitle}</p>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    {issueLabels.map((label, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300 border border-gray-700"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ml-4 text-right flex-shrink-0">
                  <p className="text-gray-400 text-xs">{applicants} applicants</p>
                  <p className="text-sm mt-2">
                    {status === "Assigned" ? (
                      <span className="text-orange-400 font-medium">Assigned to you</span>
                    ) : status === "In Review" ? (
                      <span className="text-amber-400 font-medium">In Review</span>
                    ) : (
                      <span className="text-gray-300 text-sm">Open</span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 text-center">
              <Stat label="Contributors" value={contributorsCount} />
              <Stat label="PRs Merged" value={prsMerged} />
              {stars !== undefined ? <Stat label="Stars" value={stars} /> : <div />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

