"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className = "",
  onClick,
}: ShimmerButtonProps) {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        }}
        style={{
          transform: "skewX(-45deg)",
        }}
      />
    </motion.button>
  );
}
