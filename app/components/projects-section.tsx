"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { RevealText } from "./RevealText"

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

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current
        const section = sectionRef.current
        if (!track || !section) return

        const panels = track.querySelectorAll<HTMLElement>(".project-panel")

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * panels.length),
                panels.length - 1
              )
              if (counterRef.current) {
                counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`
              }
            },
          },
        })

      })

      mm.add("(max-width: 767px)", () => {
        const panels = document.querySelectorAll<HTMLElement>(".project-panel")
        gsap.fromTo(
          panels,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 20%",
              scrub: 0.8,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="overflow-hidden">
      <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b border-border">
        <RevealText delay={0} className="uppercase tracking-widest text-xs text-primary">
          PROJETOS
        </RevealText>
        <span
          ref={counterRef}
          className="uppercase tracking-widest text-xs text-muted-foreground tabular-nums"
        >
          01 / 03
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row"
        style={{ willChange: "transform" }}
      >
        {projects.map((project) => (
          <div
            key={project.number}
            className="project-panel flex-shrink-0 flex flex-col md:flex-row w-full md:w-screen md:h-[calc(100vh-57px)]"
          >
            <div
              className="relative overflow-hidden w-full md:w-[65%] flex-shrink-0 h-[50vw] sm:h-64 md:h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
              <div
                className="absolute inset-0 hidden md:block"
                style={{ background: "linear-gradient(to right, transparent 50%, #050505 100%)" }}
              />
              <div
                className="absolute inset-0 block md:hidden"
                style={{ background: "linear-gradient(to bottom, transparent 50%, #0d0d0d 100%)" }}
              />
            </div>

            <div
              className="panel-info relative flex flex-col justify-start md:justify-center bg-card w-full md:w-[35%] flex-shrink-0 p-6 sm:p-8 md:p-10"
            >
              <span
                className="absolute top-4 right-4 md:top-6 md:right-6 text-6xl md:text-7xl lg:text-8xl font-black text-foreground select-none pointer-events-none"
                style={{ opacity: 0.08 }}
              >
                {project.number}
              </span>

              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
                {project.description}
              </p>
              <p className="text-xs text-muted-foreground tracking-wide mb-6">
                {project.technologies}
              </p>

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
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
