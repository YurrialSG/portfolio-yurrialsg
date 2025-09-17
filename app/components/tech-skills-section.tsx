"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Smartphone,
  Cloud,
  Brain,
  GitBranch,
  Globe,
  Server,
  Zap,
} from "lucide-react";
import { NumberTicker } from "./magic-ui/number-ticker";
import { Marquee } from "./magic-ui/marquee";
import { AnimatedShinyText } from "./magic-ui/animated-shiny-text";

const skillCategories = [
  {
    title: "Front-end",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Vue.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "WordPress", level: 80 },
    ],
  },
  {
    title: "Back-end",
    icon: <Server className="w-6 h-6" />,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "PHP", level: 80 },
      { name: "Express.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "Mobile",
    icon: <Smartphone className="w-6 h-6" />,
    skills: [
      { name: "React Native", level: 85 },
      { name: "Flutter", level: 80 },
      { name: "Expo", level: 85 },
      { name: "Android Studio", level: 75 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="w-6 h-6" />,
    skills: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 85 },
      { name: "Git", level: 95 },
      { name: "GitHub Actions", level: 80 },
      { name: "Vercel", level: 90 },
      { name: "Netlify", level: 85 },
    ],
  },
  {
    title: "AI & Data",
    icon: <Brain className="w-6 h-6" />,
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "OpenAI API", level: 80 },
      { name: "LangChain", level: 75 },
      { name: "Data Analysis", level: 80 },
      { name: "Pandas", level: 75 },
    ],
  },
  {
    title: "Tools & Others",
    icon: <Zap className="w-6 h-6" />,
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 85 },
      { name: "Postman", level: 90 },
      { name: "Jira", level: 80 },
      { name: "Slack", level: 90 },
      { name: "Notion", level: 85 },
    ],
  },
];

export function TechSkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <AnimatedShinyText className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tech Skills
            </AnimatedShinyText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções completas e
            inovadoras
          </p>

          <div className="flex justify-center mt-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div
                className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-2 border-4 border-secondary/30 rounded-full animate-spin"
                style={{
                  animationDuration: "2s",
                  animationDirection: "reverse",
                }}
              />
              <div
                className="absolute inset-4 border-4 border-primary/40 rounded-full animate-spin"
                style={{ animationDuration: "4s" }}
              />
              <Zap className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">
                        <NumberTicker value={skill.level} duration={1.5} />%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                        }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "linear",
                            delay:
                              categoryIndex * 0.1 + skillIndex * 0.05 + 0.5,
                          }}
                          style={{
                            transform: "skewX(-45deg)",
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-16 h-32 overflow-hidden">
          <Marquee speed={30} className="absolute top-8">
            <div className="flex gap-12 text-4xl opacity-20 mr-12">
              <Code className="w-8 h-8" />
              <Database className="w-8 h-8" />
              <Smartphone className="w-8 h-8" />
              <Cloud className="w-8 h-8" />
              <Brain className="w-8 h-8" />
              <GitBranch className="w-8 h-8" />
              <Globe className="w-8 h-8" />
              <Server className="w-8 h-8" />
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
