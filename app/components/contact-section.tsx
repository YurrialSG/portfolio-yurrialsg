"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram } from "lucide-react"
import { RevealText } from "./RevealText"
import { useScrollReveal } from "../hooks/useScrollReveal"

const socials = [
  { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/in/yuri-silveira-sg" },
  { icon: Instagram, name: "Instagram", href: "https://www.instagram.com/yurisilveirasg" },
]

export function ContactSection() {
  const { ref: bottomRef, isInView: bottomInView } = useScrollReveal()

  return (
    <section
      id="contact"
      className="py-16 md:py-32 px-4"
      style={{ background: "linear-gradient(to bottom, #050505, #0a0804)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <RevealText delay={0} className="uppercase tracking-widest text-xs text-primary mb-5 md:mb-8 block">
          CONTATO
        </RevealText>

        <RevealText direction="y" delay={0.1} className="font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6 block">
          Vamos trabalhar juntos.
        </RevealText>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-8 md:mb-12"
        >
          Aberto a projetos freelance e posições CLT/PJ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="mailto:yuriinternacional86@gmail.com"
            className="group relative inline-block text-sm sm:text-base md:text-xl lg:text-2xl text-foreground"
          >
            yuriinternacional86@gmail.com
            <span className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-500" />
          </a>
        </motion.div>

        <div className="w-24 h-px bg-border mx-auto my-6 md:my-10" />

        <div
          ref={bottomRef as React.RefObject<HTMLDivElement>}
          className="flex justify-center gap-8"
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={bottomInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <s.icon className="w-4 h-4" />
              {s.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
