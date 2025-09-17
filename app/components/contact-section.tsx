"use client";

import type React from "react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import {
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
// import { useState } from "react";

export function ContactSection() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
  //   setFormData({ name: "", email: "", message: "" });
  // };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "yuriinternacional86@gmail.com",
      href: "mailto:yuriinternacional86@gmail.com",
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (53) 99182-3163",
      href: "tel:+5553991823163",
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "Pelotas, RS - Brasil",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/yuri-silveira-sg",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/yurisilveirasg",
      color: "hover:text-pink-600",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Vamos conversar sobre seu próximo projeto ou oportunidade de
              colaboração
            </p>
            <div className="flex justify-center mt-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
                <div className="absolute inset-2 bg-secondary/20 rounded-full animate-pulse" />
                <MessageCircle className="w-8 h-8 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          <div className="grid gap-12">
            {/* <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Envie uma Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Seu email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Sua mensagem"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card> */}

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Informações de Contato
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {info.title}
                        </p>
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Redes Sociais
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">
                  Disponível para Projetos
                </h4>
                <p className="text-muted-foreground text-sm text-pretty">
                  Estou sempre aberto a discutir novas oportunidades e projetos
                  interessantes. Vamos criar algo incrível juntos!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
