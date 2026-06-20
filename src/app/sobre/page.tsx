"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Shield } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";
import { themeConfig } from "@/config/theme-config";

export default function Sobre() {
  const { clinicConfig } = useDatabase();
  const about = clinicConfig.about;

  // Dynamic style for cards
  const cardStyleClass =
    themeConfig.styles.card === "glass"
      ? "glass-card"
      : themeConfig.styles.card === "bordered"
      ? "bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/40"
      : "bg-white dark:bg-stone-900 shadow-xl shadow-stone-500/5 dark:shadow-none border border-transparent";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Page Header */}
      <section className="relative py-20 bg-stone-100 dark:bg-stone-900/30 transition-colors text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            {about?.essence ? "Nossa Essência" : "Sobre Nós"}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-850 dark:text-stone-100 mt-3 mb-6">
            Sobre a {clinicConfig.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            {about?.essence || clinicConfig.slogan}
          </p>
        </div>
      </section>

      {/* Main Content: Story & Image */}
      <section className="py-20 bg-white dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Story Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-gold-550 block mb-2">
              {about?.storyYearText || "Nossa Trajetória"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-stone-800 dark:text-stone-150 mb-6 font-medium">
              {about?.storyTitle || "Uma história guiada pela beleza e pela ciência"}
            </h2>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 space-y-4 font-light leading-relaxed">
              {about?.storyParagraphs ? (
                about.storyParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>Carregando história da clínica...</p>
              )}
            </div>
          </div>

          {/* Luxury Room Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/50 dark:border-stone-800/40">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800"
                alt="Ambiente clínico luxuoso"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-gold-200/20 rounded-full blur-[40px] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-20 bg-stone-100 dark:bg-stone-900/40 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
              Nossos Pilares
            </span>
            <h2 className="font-serif text-3xl tracking-tight text-stone-850 dark:text-stone-150 mt-2 font-medium">
              Missão, Visão & Valores
            </h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Mission */}
            <motion.div
              variants={itemVariants}
              className={`${cardStyleClass} p-8 rounded-2xl flex flex-col items-start`}
            >
              <div className="w-10 h-10 rounded-lg bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-550 mb-5">
                <Heart size={20} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-250 mb-3">
                Nossa Missão
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                {about?.mission || "Proporcionar bem-estar, autoestima e rejuvenescimento saudável através de procedimentos estéticos."}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={itemVariants}
              className={`${cardStyleClass} p-8 rounded-2xl flex flex-col items-start`}
            >
              <div className="w-10 h-10 rounded-lg bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-550 mb-5">
                <Sparkles size={20} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-250 mb-3">
                Nossa Visão
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                {about?.vision || "Ser reconhecida nacionalmente como a principal marca boutique de estética premium."}
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={itemVariants}
              className={`${cardStyleClass} p-8 rounded-2xl flex flex-col items-start`}
            >
              <div className="w-10 h-10 rounded-lg bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-550 mb-5">
                <Shield size={20} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-250 mb-3">
                Nossos Valores
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                {about?.values || "Ética médica inflexível, naturalidade nos resultados, exclusividade no relacionamento concierge."}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* O Espaço */}
      <section className="py-20 bg-white dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Espaço Images Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600"
              alt="Lounge de espera"
              className="rounded-2xl shadow-lg aspect-[3/4] object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
              alt="Sala de atendimento facial"
              className="rounded-2xl shadow-lg aspect-[3/4] object-cover mt-8"
            />
          </div>

          {/* Espaço Text */}
          <div className="lg:col-span-6 text-left">
            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-gold-550 block mb-2">
              {about?.infraTag || "Espaço Conforto"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-stone-800 dark:text-stone-150 mb-6 font-medium">
              {about?.infraTitle || "Um ambiente projetado para aguçar seus sentidos"}
            </h2>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 space-y-4 font-light leading-relaxed">
              {about?.infraParagraphs ? (
                about.infraParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>Carregando informações da estrutura...</p>
              )}
          </div>
        </div>
      </div>
    </section>
  </div>
);
}
