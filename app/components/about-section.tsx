"use client"

import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { RevealText } from "./RevealText"

const paragraphs = [
  "Comecei a programar aos 16 anos e nunca parei. Hoje, construo produtos completos — do banco de dados ao que o usuário toca na tela.",
  "Especializo em React e Next.js no frontend, Node.js no backend. Tenho passagens por startups de ed-tech onde a performance do produto importava de verdade.",
  "Prefiro projetos onde o código precisa resolver um problema real, não apenas existir.",
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)

  const rotateX   = useMotionValue(0)
  const rotateY   = useMotionValue(0)
  const smoothRX  = useSpring(rotateX, { stiffness: 180, damping: 28 })
  const smoothRY  = useSpring(rotateY, { stiffness: 180, damping: 28 })
  const [glare, setGlare] = useState({ x: 50, y: 50, visible: false })

  const getCoords = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if ("touches" in e) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
    }
    return { clientX: e.clientX, clientY: e.clientY }
  }

  const onPhotoInteract = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const { clientX, clientY } = getCoords(e)
    const rx = (clientX - rect.left) / rect.width - 0.5
    const ry = (clientY - rect.top)  / rect.height - 0.5
    rotateX.set(-ry * 14)
    rotateY.set(rx * 14)
    setGlare({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top)  / rect.height) * 100,
      visible: true,
    })
  }

  const onPhotoReset = () => {
    rotateX.set(0)
    rotateY.set(0)
    setGlare((g) => ({ ...g, visible: false }))
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { x: -60, opacity: 0, scale: 1.06 },
        {
          x: 0, opacity: 1, scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 88%",
            end: "top 35%",
            scrub: 0.6,
          },
        }
      )

      const paras = textRef.current?.querySelectorAll("p")
      if (paras) {
        gsap.fromTo(
          paras,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              end: "top 25%",
              scrub: 0.8,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealText delay={0} className="uppercase tracking-widest text-xs text-primary mb-8 md:mb-16 block">
          SOBRE
        </RevealText>

        <div className="grid md:grid-cols-[40%_60%] gap-8 md:gap-12 lg:gap-16 items-start">
          <div
            ref={photoRef}
            className="relative w-full max-w-[280px] sm:max-w-[320px] h-[300px] sm:h-[360px] md:h-[400px] border border-primary overflow-hidden mx-auto md:mx-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              style={{
                rotateX: smoothRX,
                rotateY: smoothRY,
                transformPerspective: 900,
                width: "100%",
                height: "100%",
              }}
              onMouseMove={onPhotoInteract}
              onMouseLeave={onPhotoReset}
              onTouchMove={onPhotoInteract}
              onTouchEnd={onPhotoReset}
            >
              <Image
                src="/avatar.png"
                alt="Yuri Silveira"
                fill
                className="object-cover select-none"
                sizes="320px"
                draggable={false}
              />

              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(200, 169, 110, 0.2) 0%, transparent 55%)`,
                  opacity: glare.visible ? 1 : 0,
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(200,169,110,0.06) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
                }}
              />
            </motion.div>
          </div>

          <div ref={textRef} className="max-w-lg space-y-5 md:space-y-8 pt-2 md:pt-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
