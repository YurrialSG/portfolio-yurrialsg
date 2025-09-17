"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedShinyText } from "./magic-ui/animated-shiny-text";

export function ProjectsSection() {
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Awari",
      description:
        "Plataforma de educação tecnológica e desenvolvimento profissional que oferece cursos online com aulas ao vivo, mentorias individuais e suporte de carreira.",
      image: "/awari.png",
      technologies: [
        "Wordpress",
        "HTML",
        "CSS",
        "Javascript",
        "PHP",
        "AWS",
        "Plugin Customizado",
        "Redis",
      ],
      liveUrl: "https://awari.com.br/",
    },
    {
      title: "Fluency Academy",
      description:
        "Aplicativo de gerenciamento de tarefas com colaboração em tempo real e notificações push.",
      image: "/task-management-interface.png",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "Dashboard meteorológico com previsões detalhadas, mapas interativos e alertas personalizados.",
      image: "/weather-dashboard-interface.png",
      technologies: ["React", "Tailwind CSS", "OpenWeather API", "Chart.js"],
      liveUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background overflow-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <AnimatedShinyText>Meus Projetos</AnimatedShinyText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Uma seleção dos meus trabalhos mais recentes e impactantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(16,185,129,0.1), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    <p className="text-muted-foreground text-sm text-pretty leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: techIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="outline"
                            className="text-xs hover:bg-primary/10 transition-colors"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 group/btn bg-primary text-white hover:bg-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 text-white" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
