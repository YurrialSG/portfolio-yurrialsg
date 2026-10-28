"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { RevealText } from "./RevealText"

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
  const sectionRef = useRef<HTMLElement>(null)
  const groupsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-group",
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: groupsRef.current,
            start: "top 82%",
            end: "top 35%",
            scrub: 0.5,
          },
        }
      )

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
            end: "top 65%",
            scrub: 0.5,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-16 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealText delay={0} className="uppercase tracking-widest text-xs text-primary mb-6 md:mb-12 block">
          STACK
        </RevealText>

        <RevealText direction="y" delay={0.1} className="font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 md:mb-16 block">
          As ferramentas
          <br />
          com que
          <br />
          trabalho
        </RevealText>

        <div ref={groupsRef} className="flex flex-wrap gap-8 md:gap-16">
          {groups.map((group) => (
            <div key={group.name} className="stack-group">
              <p className="uppercase tracking-widest text-xs text-muted-foreground mb-3">
                {group.name}
              </p>
              <p className="text-foreground text-sm md:text-base lg:text-lg max-w-xs">
                {group.items}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={lineRef}
          className="w-full h-px bg-primary mt-8 md:mt-16"
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  )
}
