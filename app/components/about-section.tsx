"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Lightbulb, Users, Zap } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const technologies = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Git",
  ];

  const softSkills = [
    {
      icon: Code,
      title: "Pensamento Analítico",
      description: "Resolução eficiente de problemas complexos",
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Sempre buscando soluções criativas e modernas",
    },
    {
      icon: Users,
      title: "Trabalho em Equipe",
      description: "Colaboração efetiva em projetos multidisciplinares",
    },
    {
      icon: Zap,
      title: "Adaptabilidade",
      description: "Rápida adaptação a novas tecnologias e metodologias",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Sobre Mim
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Conheça um pouco mais sobre minha trajetória e habilidades
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="w-64 h-64 relative rounded-xl bg-primary shadow-lg overflow-hidden">
                  <Image
                    src="/avatar.png"
                    alt="Imagem de perfil do Yuri"
                    fill
                    className="object-cover rounded-xl"
                    sizes="256px"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Minha Jornada
                </h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  Sou um engenheiro de software apaixonado por criar
                  experiências digitais excepcionais. Com experiência sólida em
                  desenvolvimento full-stack, especializo-me em tecnologias
                  modernas como React, Next.js e Node.js. Minha abordagem
                  combina código limpo, design intuitivo e performance otimizada
                  para entregar soluções que realmente fazem a diferença.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Tecnologias que Domino
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Soft Skills
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {softSkills.map((skill, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <skill.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
