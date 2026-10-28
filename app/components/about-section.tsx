"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { RevealText } from "./RevealText"
import { useScrollReveal } from "../hooks/useScrollReveal"

const paragraphs = [
  "Comecei a programar aos 16 anos e nunca parei. Hoje, construo produtos completos — do banco de dados ao que o usuário toca na tela.",
  "Especializo em React e Next.js no frontend, Node.js no backend. Tenho passagens por startups de ed-tech onde a performance do produto importava de verdade.",
  "Prefiro projetos onde o código precisa resolver um problema real, não apenas existir.",
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: photoRef, isInView: photoInView } = useScrollReveal()
  const { ref: textRef, isInView: textInView } = useScrollReveal()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const photoY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 20])

  return (
    <section id="about" ref={sectionRef} className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealText delay={0} className="uppercase tracking-widest text-xs text-primary mb-16 block">
          SOBRE
        </RevealText>

        <div className="grid lg:grid-cols-[40%_60%] gap-16 items-start">
          <motion.div
            ref={photoRef as React.RefObject<HTMLDivElement>}
            style={{ y: photoY }}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={photoInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-full max-w-[320px] h-[400px] border border-primary overflow-hidden mx-auto lg:mx-0"
          >
            <Image
              src="/avatar.png"
              alt="Yuri Silveira"
              fill
              className="object-cover"
              sizes="320px"
            />
          </motion.div>

          <motion.div
            ref={textRef as React.RefObject<HTMLDivElement>}
            style={{ y: textY }}
            className="max-w-lg space-y-8 pt-4"
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ y: 24, opacity: 0 }}
                animate={textInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.76, 0, 0.24, 1] }}
                className="text-foreground/80 leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
