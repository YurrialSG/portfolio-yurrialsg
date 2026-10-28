"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { RevealText } from "./RevealText"
import { useScrollReveal } from "../hooks/useScrollReveal"

const projects = [
  {
    number: "01",
    title: "Awari by Fluency",
    description: "Plataforma de educação tech com aulas ao vivo e mentorias.",
    technologies: "WordPress · PHP · AWS · Redis",
    image: "/awari.png",
    type: "website" as const,
    liveUrl: "https://awari.com.br/",
  },
  {
    number: "02",
    title: "ACPO Empreendimentos",
    description: "Site institucional para construtora.",
    technologies: "Next.js · Tailwind CSS · Chart.js",
    image: "/acpo.png",
    type: "website" as const,
    liveUrl: "https://www.acpo.com.br/",
  },
  {
    number: "03",
    title: "Fluency Academy — App",
    description: "App de inglês com tutor de IA e correção em tempo real.",
    technologies: "Flutter · Socket.io · Eleven Labs",
    image: "/fluency-app.png",
    type: "mobile" as const,
    androidUrl: "https://play.google.com/store/apps/details?id=io.fluencyacademy.fluency_app&pcampaignid=web_share",
    iosUrl: "https://apps.apple.com/br/app/fluency/id6737087903",
  },
]

function ProjectCard({ project, index, onVisible }: {
  project: typeof projects[number]
  index: number
  onVisible: (i: number) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { ref: imgRef, isInView: imgInView } = useScrollReveal()

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(index) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index, onVisible])

  return (
    <div
      ref={cardRef}
      className="grid lg:grid-cols-[60%_40%] min-h-[60vh] lg:min-h-[70vh]"
    >
      <motion.div
        ref={imgRef as React.RefObject<HTMLDivElement>}
        initial={{ scale: 1.06 }}
        animate={imgInView ? { scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="relative overflow-hidden order-1"
        style={{ minHeight: "40vh" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, transparent 60%, #050505)" }}
        />
      </motion.div>

      <motion.div
        initial={{ x: 32, opacity: 0 }}
        animate={imgInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="relative flex flex-col justify-center bg-card order-2"
        style={{ padding: "48px" }}
      >
        <span
          className="absolute top-4 right-4 text-8xl font-black text-foreground select-none pointer-events-none"
          style={{ opacity: 0.08 }}
        >
          {project.number}
        </span>

        <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
        <p className="text-xs text-muted-foreground tracking-wide mb-6">{project.technologies}</p>

        {project.type === "website" ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver projeto
          </a>
        ) : (
          <div className="flex gap-6">
            <a
              href={project.androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Android
            </a>
            <a
              href={project.iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              iOS
            </a>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)

  return (
    <section id="projects" className="py-16">
      <div className="max-w-6xl mx-auto px-4 mb-12 flex items-center justify-between">
        <RevealText delay={0} className="uppercase tracking-widest text-xs text-primary">
          PROJETOS
        </RevealText>
        <span className="uppercase tracking-widest text-xs text-muted-foreground">
          {String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="space-y-px">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            onVisible={setActiveProject}
          />
        ))}
      </div>
    </section>
  )
}
