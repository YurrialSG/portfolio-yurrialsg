"use client"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function useScrollReveal(_threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" })
  return { ref, isInView }
}
