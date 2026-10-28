"use client"

import { motion } from "framer-motion"
import { RevealText } from "./RevealText"
import { useScrollReveal } from "../hooks/useScrollReveal"

const groups = [
  {
    name: "FRONTEND",
    items: "React · Next.js · TypeScript · Tailwind CSS · Vue.js · WordPress",
  },
  {
    name: "BACKEND & INFRA",
    items: "Node.js · Python · PostgreSQL · MongoDB · AWS · Docker · Git",
  },
  {
    name: "MOBILE & TOOLS",
    items: "React Native · Flutter · Expo · Figma · GitHub Actions · Postman",
  },
]

export function TechSkillsSection() {
  const { ref: groupsRef, isInView: groupsInView } = useScrollReveal()
  const { ref: lineRef, isInView: lineInView } = useScrollReveal()

  return (
    <section id="skills" className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealText delay={0} className="uppercase tracking-widest text-xs text-primary mb-12 block">
          STACK
        </RevealText>

        <RevealText direction="y" delay={0.1} className="font-black text-5xl lg:text-6xl leading-tight mb-16 block">
          As ferramentas
          <br />
          com que
          <br />
          trabalho
        </RevealText>

        <div
          ref={groupsRef as React.RefObject<HTMLDivElement>}
          className="flex flex-wrap gap-16"
        >
          {groups.map((group, i) => (
            <motion.div
              key={group.name}
              initial={{ x: -24, opacity: 0 }}
              animate={groupsInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="uppercase tracking-widest text-xs text-muted-foreground mb-3">
                {group.name}
              </p>
              <p className="text-foreground text-lg max-w-xs">
                {group.items}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={lineRef as React.RefObject<HTMLDivElement>}
          initial={{ scaleX: 0 }}
          animate={lineInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "left" }}
          className="w-full h-px bg-primary mt-16"
        />
      </div>
    </section>
  )
}
