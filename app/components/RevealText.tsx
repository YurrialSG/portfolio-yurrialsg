"use client"
import { motion } from "framer-motion"

interface RevealTextProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "x" | "y"
}

export function RevealText({ children, delay = 0, className = "", direction = "x" }: RevealTextProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ clipPath: direction === "x" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
