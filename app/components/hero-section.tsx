"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, ArrowDown, Download } from "lucide-react";
import { motion } from "framer-motion";
import { TypingAnimation } from "./magic-ui/typing-animation";
import { ShimmerButton } from "./magic-ui/shimmer-button";
import { AnimatedShinyText } from "./magic-ui/animated-shiny-text";
import { WordRotate } from "./magic-ui/word-rotate";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Lottie from "lottie-react";

import programingAnimation from "@/public/animations/programming-computer.json";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home">
      <BackgroundBeamsWithCollision className="relative min-h-[calc(100vh_-_1px)] flex items-center overflow-hidden">
        <div className="relative z-20 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                <div className="mb-6">
                  <div className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
                    <WordRotate
                      words={[
                        "Engenheiro de Software",
                        "Full Stack",
                        "Frontend",
                        "Backend",
                      ]}
                      duration={3000}
                    />
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
                    <AnimatedShinyText className="text-5xl lg:text-7xl font-bold">
                      Yuri
                    </AnimatedShinyText>
                    <span className="block text-primary">
                      <TypingAnimation
                        text="Silveira"
                        duration={150}
                        className="text-5xl lg:text-7xl font-bold"
                      />
                    </span>
                  </h1>
                </div>

                <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-xl text-pretty leading-relaxed">
                  Transformando ideias em soluções digitais inovadoras com
                  tecnologias modernas e design centrado no usuário.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                  <ShimmerButton
                    className="text-lg px-8 py-3 h-12 cursor-pointer"
                    onClick={() => scrollToSection("projects")}
                  >
                    Ver Meus Projetos
                  </ShimmerButton>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-3 h-12 group bg-transparent"
                  >
                    <Download className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                    Download CV
                  </Button>
                </div>

                <div className="flex justify-center lg:justify-start space-x-6">
                  {[
                    { icon: Linkedin, href: "#" },
                    { icon: Github, href: "#" },
                    { icon: Instagram, href: "#" },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="hidden lg:flex justify-center items-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              >
                <div className="relative w-80 h-80 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shadow-2xl backdrop-blur-sm border border-primary/20 overflow-hidden">
                  <Lottie
                    animationData={programingAnimation}
                    loop={true}
                    className="w-80 h-80"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </BackgroundBeamsWithCollision>
    </section>
  );
}
