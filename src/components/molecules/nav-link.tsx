"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  delay?: number
  animate?: boolean
}

export default function NavLink({ href, children, className, onClick, delay = 0, animate = false }: NavLinkProps) {
  const link = (
    <Link
      href={href}
      className={cn("text-gray-300 hover:text-orange-400 transition-colors", className)}
      onClick={onClick}
    >
      {children}
    </Link>
  )

  if (animate) {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ delay }}
      >
        {link}
      </motion.div>
    )
  }

  return link
}
