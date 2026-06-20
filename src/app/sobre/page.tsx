"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Award, Shield } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";

export default function Sobre() {
  const { clinicConfig } = useDatabase();

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
            Nossa Essência
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-850 dark:text-stone-100 mt-3 mb-6">
            Sobre a Luxe Estética
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Uma clínica boutique idealizada para oferecer o máximo em sofisticação, segurança clínica e resultados estéticos personalizados.
          </p>
        </div>
      </section>

      {/* Main Content: Story & Image */}
      <section className="py-20 bg-white dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Story Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-gold-550 block mb-2">
              Desde 2016
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-stone-800 dark:text-stone-150 mb-6 font-medium">
              Uma história guiada pelo amor à beleza natural e à ciência
            </h2>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 space-y-4 font-light leading-relaxed">
              <p>
                A Luxe Estética Premium nasceu em 2016 da visão da Dra. Beatriz Calisto, que percebeu no mercado a necessidade de uma clínica estética que integrasse a segurança e ética da medicina dermatológica ao acolhimento personalizado de um concierge de luxo.
              </p>
              <p>
                Iniciamos como um pequeno consultório e, em poucos anos, nos tornamos referência na região da Faria Lima em tratamentos estéticos não-invasivos. Nosso diferencial reside no compromisso inegociável de manter a individualidade de cada paciente, combatendo os exageros e entregando rejuvenescimento que harmoniza com as características originais.
              </p>
              <p>
                Hoje, contamos com uma equipe multidisciplinar capacitada nas tecnologias mais consagradas do mundo, proporcionando protocolos individualizados sob rigorosos critérios científicos.
              </p>
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
              className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-xl shadow-stone-500/5 flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-550 mb-5">
                <Heart size={20} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-250 mb-3">
                Nossa Missão
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                Proporcionar bem-estar, autoestima e rejuvenescimento saudável através de procedimentos estéticos de alta performance, com ética, segurança e total personalização.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-xl shadow-stone-500/5 flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-550 mb-5">
                <Sparkles size={20} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-250 mb-3">
                Nossa Visão
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                Ser reconhecida nacionalmente como a principal marca boutique de estética premium, liderando em tecnologia, elegância e humanização dos tratamentos.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-xl shadow-stone-500/5 flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-550 mb-5">
                <Shield size={20} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-250 mb-3">
                Nossos Valores
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                Ética médica inflexível, naturalidade nos resultados, exclusividade no relacionamento concierge, inovação científica e compromisso com a biossegurança.
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
              Infraestrutura de Alto Padrão
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-stone-800 dark:text-stone-150 mb-6 font-medium">
              Um ambiente projetado para aguçar seus sentidos
            </h2>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 space-y-4 font-light leading-relaxed">
              <p>
                Cada detalhe da Luxe Estética foi planejado para oferecer uma experiência acolhedora. Da escolha das cores neutras e nudes ao aroma suave de baunilha e orquídea que permeia o ambiente, sua visita torna-se um ritual de autocuidado e desconexão.
              </p>
              <p>
                Contamos com consultórios médicos equipados com macas elétricas aquecidas com controle ergonômico, sistemas de climatização por sala com filtragem de ar avançada e lavatórios privativos integrados.
              </p>
              <p>
                Dispomos também de um espaço de relaxamento pós-procedimento onde servimos um menu cortesia de infusões orgânicas, cafés especiais e espumante brut, permitindo que você se recupere com toda a privacidade antes de retomar suas atividades diárias.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
