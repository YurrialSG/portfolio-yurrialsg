"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Linkedin, Instagram } from "lucide-react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function createCircleTexture() {
  const size = 32
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, "rgba(200, 169, 110, 1)")
  gradient.addColorStop(0.4, "rgba(200, 169, 110, 0.6)")
  gradient.addColorStop(1, "rgba(200, 169, 110, 0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 })
  const contentX = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const contentY = useTransform(springY, [-0.5, 0.5], [-8, 8])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5)
      mouseY.set((e.clientY / window.innerHeight) - 0.5)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to(canvasRef.current, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 5

    const particleCount = 180
    const positions = new Float32Array(particleCount * 3)
    const velocities: { vx: number; vy: number; bvx: number; bvy: number }[] = []

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2
      const bvx = (Math.random() * 0.0004 + 0.0002) * (Math.random() > 0.5 ? 1 : -1)
      const bvy = (Math.random() * 0.0004 + 0.0002) * (Math.random() > 0.5 ? 1 : -1)
      velocities.push({ vx: bvx, vy: bvy, bvx, bvy })
    }

    const geometry = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(positions, 3)
    geometry.setAttribute("position", posAttr)

    const texture = createCircleTexture()
    const material = new THREE.PointsMaterial({
      size: 4,
      map: texture,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const bounds = 5
    let animId: number

    const mouse3D = { x: 0, y: 0, active: false }
    const REPEL_RADIUS = 1.8
    const REPEL_FORCE  = 0.003
    const BURST_FORCE  = 0.028
    const MAX_SPEED    = 0.032

    const toWorld = (cx: number, cy: number) => {
      const aspect = window.innerWidth / window.innerHeight
      const halfH  = Math.tan((75 * Math.PI / 180) / 2) * camera.position.z
      const ndcX   = (cx / window.innerWidth) * 2 - 1
      const ndcY   = -((cy / window.innerHeight) * 2 - 1)
      return { x: ndcX * halfH * aspect, y: ndcY * halfH }
    }

    const applyBurst = (cx: number, cy: number) => {
      const w = toWorld(cx, cy)
      for (let i = 0; i < particleCount; i++) {
        const dx   = positions[i * 3] - w.x
        const dy   = positions[i * 3 + 1] - w.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 2.5 && dist > 0.001) {
          const f = BURST_FORCE * (1 - dist / 2.5)
          velocities[i].vx += (dx / dist) * f
          velocities[i].vy += (dy / dist) * f
        }
      }
    }

    const onMouseMove  = (e: MouseEvent) => {
      const w = toWorld(e.clientX, e.clientY)
      mouse3D.x = w.x; mouse3D.y = w.y; mouse3D.active = true
    }
    const onMouseLeave = () => { mouse3D.active = false }
    const onClick      = (e: MouseEvent) => applyBurst(e.clientX, e.clientY)
    const onTouchMove  = (e: TouchEvent) => {
      const t = e.touches[0]
      const w = toWorld(t.clientX, t.clientY)
      mouse3D.x = w.x; mouse3D.y = w.y; mouse3D.active = true
    }
    const onTouchEnd   = () => { mouse3D.active = false }
    const onTouchStart = (e: TouchEvent) => applyBurst(e.touches[0].clientX, e.touches[0].clientY)

    window.addEventListener("mousemove",  onMouseMove)
    window.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("click",      onClick)
    window.addEventListener("touchmove",  onTouchMove,  { passive: true })
    window.addEventListener("touchend",   onTouchEnd)
    window.addEventListener("touchstart", onTouchStart, { passive: true })

    const animate = () => {
      for (let i = 0; i < particleCount; i++) {
        const v = velocities[i]

        v.vx += (v.bvx - v.vx) * 0.018
        v.vy += (v.bvy - v.vy) * 0.018

        if (mouse3D.active) {
          const dx   = positions[i * 3] - mouse3D.x
          const dy   = positions[i * 3 + 1] - mouse3D.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_RADIUS && dist > 0.001) {
            const f = REPEL_FORCE * (1 - dist / REPEL_RADIUS)
            v.vx += (dx / dist) * f
            v.vy += (dy / dist) * f
          }
        }

        const speed = Math.sqrt(v.vx * v.vx + v.vy * v.vy)
        if (speed > MAX_SPEED) {
          v.vx = (v.vx / speed) * MAX_SPEED
          v.vy = (v.vy / speed) * MAX_SPEED
        }

        positions[i * 3]     += v.vx
        positions[i * 3 + 1] += v.vy
        if (positions[i * 3] > bounds || positions[i * 3] < -bounds) v.vx *= -1
        if (positions[i * 3 + 1] > bounds || positions[i * 3 + 1] < -bounds) v.vy *= -1
      }
      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize",     handleResize)
      window.removeEventListener("mousemove",  onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("click",      onClick)
      window.removeEventListener("touchmove",  onTouchMove)
      window.removeEventListener("touchend",   onTouchEnd)
      window.removeEventListener("touchstart", onTouchStart)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(200, 169, 110, 0.07) 0%, transparent 75%)",
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-px z-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(200,169,110,0.35), transparent)" }}
        initial={{ top: "0%" }}
        animate={{ top: "105%" }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
      >
        <motion.div ref={contentRef} style={{ x: contentX, y: contentY }} className="flex flex-col items-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "left" }}
            className="w-16 h-px bg-primary mb-6"
          />

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="uppercase tracking-widest text-xs text-primary mb-4"
          >
            ENGENHEIRO DE SOFTWARE
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] font-black leading-none tracking-tight text-foreground"
            >
              YURI
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
              className="text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] font-black leading-none tracking-tight text-primary"
            >
              SILVEIRA
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "left" }}
            className="w-full h-px bg-border mt-4 mb-4 md:mt-6 md:mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-muted-foreground max-w-md"
          >
            Full Stack Engineer. Código limpo, produto real.
          </motion.p>

          <div className="flex gap-6 mt-5 md:mt-8">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/yuri-silveira-sg" },
              { icon: Instagram, href: "https://www.instagram.com/yurisilveirasg" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.7 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ scale: 1.15 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="uppercase tracking-widest text-xs text-muted-foreground group-hover:text-primary transition-colors">
          SCROLL
        </span>
        <div className="w-px bg-primary animate-scroll-pulse" />
      </button>
    </section>
  )
}
