"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedShinyTextProps {
  children: ReactNode
  className?: string
}

export function AnimatedShinyText({ children, className = "" }: AnimatedShinyTextProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        style={{
          maskImage: "linear-gradient(90deg, transparent, black, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black, transparent)",
        }}
      />
    </motion.div>
  )
}
