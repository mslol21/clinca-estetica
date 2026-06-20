"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
export default function Home() {
  const { clinicConfig, procedures, testimonials, beforeAfter, btnRadius, cardStyleClass } = useDatabase();
  const [activeTab, setActiveTab] = useState<"facial" | "corporal" | "laser" | "avancada">("facial");

  // Filter procedures by tab
  const tabProcedures = procedures.filter((p) => p.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Parallax Hero Image Backing */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50/95 via-stone-50/80 to-transparent dark:from-stone-950/95 dark:via-stone-950/85 dark:to-transparent z-10" />
          <img
            src={clinicConfig.heroImage || clinicConfig.seo?.ogImage || ""}
            alt="Recepção de luxo da clínica"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/60 dark:bg-gold-950/30 border border-gold-300/30 text-gold-600 dark:text-gold-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Sparkles size={12} className="animate-spin-slow" />
              Conceito de Luxo & Alta Tecnologia
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-stone-950 dark:text-stone-100 leading-[1.1] mb-6"
            >
              Realce sua <br />
              <span className="font-serif italic font-light text-gold-500 dark:text-gold-400">
                beleza natural
              </span>{" "}
              com exclusividade
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-lg leading-relaxed mb-8 font-light"
            >
              {clinicConfig.slogan}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/agendamento"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white shadow-xl shadow-gold-500/10 hover:shadow-gold-500/25 transform hover:-translate-y-0.5 transition-all duration-200 ${btnRadius}`}
              >
                <Calendar size={14} />
                Agendar Avaliação
              </Link>
              
              <a
                href={`https://wa.me/55${clinicConfig.whatsapp?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold px-8 py-4 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-stone-200 dark:border-stone-800 hover:border-gold-300 dark:hover:border-gold-700 dark:text-stone-200 text-stone-700 transition-all duration-200 shadow-md hover:shadow-lg ${btnRadius}`}
              >
                <MessageSquare size={14} className="text-green-500" />
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Hero Decorative Floating Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="lg:col-span-5 hidden lg:block relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 dark:border-stone-800/40">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800"
                alt="Profissional aplicando tratamento estético"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              
              {/* Floating review card */}
              <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-xl shadow-xl flex items-center gap-3 ${cardStyleClass}`}>
                <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center border border-gold-300">
                  <Star className="text-gold-500 fill-gold-500 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                    Atendimento Concierge
                  </h4>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 font-light mt-0.5">
                    Foco na satisfação e naturalidade do resultado
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DIFERENCIAIS SECTION */}
      <section className="py-20 bg-stone-100 dark:bg-stone-900/40 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
              Exclusividade & Cuidado
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-stone-950 dark:text-stone-100 mt-2 font-medium">
              Diferenciais da {clinicConfig.name}
            </h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-2xl ${cardStyleClass}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-500 mb-6 border border-gold-300/20">
                <Award size={22} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-200 mb-3">
                Corpo Clínico Premium
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                Profissionais pós-graduados e médicos especializados com ampla vivência e constantes especializações internacionais.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-2xl ${cardStyleClass}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-500 mb-6 border border-gold-300/20">
                <Sparkles size={22} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-200 mb-3">
                Tecnologia de Ponta
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                Utilizamos os aparelhos mais consagrados da estética mundial, como Ultraformer III e Laser Lavieen, aprovados pelos órgãos de saúde.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-2xl ${cardStyleClass}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold-100/50 dark:bg-gold-950/20 flex items-center justify-center text-gold-500 mb-6 border border-gold-300/20">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-stone-200 mb-3">
                Atendimento Concierge
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                Ambientes sofisticados, salas individuais climatizadas e chá gourmet com serviço exclusivo para garantir seu conforto e privacidade.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. PROCEDIMENTOS DESTAQUE */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
                Tratamentos de Alta Performance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-stone-950 dark:text-stone-100 mt-2 font-medium">
                Procedimentos em Destaque
              </h2>
            </div>
            <Link
              href="/procedimentos"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gold-500 dark:text-gold-400 hover:text-gold-600 transition-colors group"
            >
              Ver todos os procedimentos
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Categories tab filters */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-stone-200/50 dark:border-stone-800/40 pb-4">
            {[
              { id: "facial", name: "Estética Facial" },
              { id: "corporal", name: "Estética Corporal" },
              { id: "laser", name: "Laser Lavieen & Outros" },
              { id: "avancada", name: "Estética Avançada" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-500/10"
                    : "text-stone-500 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Procedures List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tabProcedures.length > 0 ? (
              tabProcedures.map((proc) => (
                <div
                  key={proc.id}
                  className={`rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 ${cardStyleClass}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={proc.image}
                      alt={proc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-stone-900/65 backdrop-blur-sm px-3 py-1 rounded text-white text-[9px] uppercase tracking-widest font-light">
                      {proc.duration} min
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-stone-800 dark:text-stone-250 mb-2">
                        {proc.name}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed font-light mb-5">
                        {proc.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800/40 flex items-center justify-between">
                      {proc.price && (
                        <div>
                          <span className="text-[10px] text-stone-400 block font-light">A partir de</span>
                          <span className="font-serif text-sm font-semibold text-gold-500 dark:text-gold-400">
                            R$ {proc.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}
                      
                      <Link
                        href={`/procedimentos#proc-${proc.id}`}
                        className="p-2 rounded-full border border-stone-200 dark:border-stone-800 group-hover:border-gold-300 group-hover:text-gold-500 dark:text-stone-300 transition-colors"
                      >
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-stone-450">
                Nenhum procedimento cadastrado nesta categoria.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. ANTES E DEPOIS INTERATIVO */}
      <section className="py-20 bg-stone-100 dark:bg-stone-900/40 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
              Resultados Comprovados
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-stone-950 dark:text-stone-100 mt-2 font-medium">
              Transformações Reais
            </h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Interative Slider */}
            <div>
              {beforeAfter.length > 0 ? (
                <BeforeAfterSlider
                  beforeImage={beforeAfter[0].beforeImage}
                  afterImage={beforeAfter[0].afterImage}
                  beforeLabel="Antes"
                  afterLabel="Depois"
                />
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-stone-200 flex items-center justify-center">
                  Carregando imagem de comparação...
                </div>
              )}
            </div>

            {/* Right: Explanatory Column */}
            <div className="flex flex-col items-start">
              <span className="px-3 py-1 rounded bg-gold-100/50 dark:bg-gold-950/20 border border-gold-300/20 text-gold-600 dark:text-gold-400 text-[10px] uppercase tracking-widest font-semibold mb-4">
                Estudo de Caso
              </span>
              <h3 className="font-serif text-2xl tracking-tight text-stone-800 dark:text-stone-150 mb-4">
                {beforeAfter[0]?.title || "Harmonização Facial Regenerativa"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light mb-6">
                {beforeAfter[0]?.description ||
                  "Combinação de tratamentos clínicos focados em restauração cutânea, devolvendo a simetria natural de forma equilibrada e sem alterar a essência."}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-semibold text-gold-500 dark:text-gold-400">3 Sessões</span>
                  <span className="text-[10px] text-stone-450 uppercase tracking-wider font-light">Intervalo</span>
                </div>
                <div className="h-8 w-[1px] bg-stone-300 dark:bg-stone-800" />
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-semibold text-gold-500 dark:text-gold-400">90 Dias</span>
                  <span className="text-[10px] text-stone-450 uppercase tracking-wider font-light">Duração Total</span>
                </div>
              </div>

              <Link
                href="/antes-e-depois"
                className={`flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-6 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-750 dark:text-stone-300 hover:text-gold-500 dark:hover:text-gold-400 transition-all ${btnRadius}`}
              >
                Ver Galeria Antes e Depois
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEPOIMENTOS */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
              A Opinião das Nossas Clientes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-stone-950 dark:text-stone-100 mt-2 font-medium">
              Avaliações & Depoimentos
            </h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className={`p-8 rounded-2xl flex flex-col justify-between ${cardStyleClass}`}
              >
                <div>
                  <div className="flex items-center gap-0.5 text-gold-400 mb-5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light italic mb-6">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800/40">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-gold-300/30"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest font-light">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONVENIO & PAGAMENTO */}
      <section className="py-16 bg-white dark:bg-stone-950 relative z-10 transition-colors border-t border-b border-stone-100 dark:border-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Refund orientated */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-500 dark:text-gold-400">
                Praticidade & Conforto
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-stone-950 dark:text-stone-100 mt-2 mb-4 font-medium">
                Atendimento Particular com Reembolso Orientado
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light mb-6">
                Oferecemos toda a documentação necessária (relatórios médicos, laudos descritivos e notas fiscais) para você solicitar o reembolso das suas consultas e procedimentos junto ao seu convênio médico de forma simples e rápida.
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs font-light text-stone-600 dark:text-stone-300">
                <span className="px-3 py-1 bg-stone-100 dark:bg-stone-900 rounded">Amil</span>
                <span className="px-3 py-1 bg-stone-100 dark:bg-stone-900 rounded">Care Plus</span>
                <span className="px-3 py-1 bg-stone-100 dark:bg-stone-900 rounded">Bradesco Saúde</span>
                <span className="px-3 py-1 bg-stone-100 dark:bg-stone-900 rounded">SulAmérica</span>
                <span className="px-3 py-1 bg-stone-100 dark:bg-stone-900 rounded">Omint</span>
              </div>
            </div>

            {/* Right Column: Payments */}
            <div className={`p-8 rounded-2xl ${cardStyleClass}`}>
              <h4 className="font-serif text-lg text-stone-950 dark:text-stone-100 mb-4 font-medium">
                Condições de Pagamento
              </h4>
              <ul className="flex flex-col gap-3 text-xs text-stone-500 dark:text-stone-400 font-light">
                <li className="flex items-center gap-2">
                  <Star size={12} className="text-gold-500 shrink-0" />
                  <span>Parcelamento em até 10x sem juros nos cartões de crédito.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star size={12} className="text-gold-500 shrink-0" />
                  <span>5% de desconto adicional para pagamentos à vista via Pix.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star size={12} className="text-gold-500 shrink-0" />
                  <span>Programas e pacotes de tratamentos anuais recorrentes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-24 bg-stone-100 dark:bg-stone-900/35 relative z-10 transition-colors text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            Sua Transformação Começa Aqui
          </span>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-950 dark:text-stone-100 mt-3 mb-6 font-light">
            Pronta para vivenciar <br />
            o seu momento <span className="font-serif italic font-light text-gold-500 dark:text-gold-400">Luxe</span>?
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto font-light leading-relaxed mb-8">
            Agende hoje uma avaliação personalizada com uma de nossas doutoras e descubra o plano ideal para suas metas.
          </p>
          
          <Link
            href="/agendamento"
            className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white shadow-xl shadow-gold-500/10 hover:shadow-gold-500/25 transition-all duration-200 transform hover:-translate-y-0.5 ${btnRadius}`}
          >
            <Calendar size={14} />
            Agendar Consulta
          </Link>
        </div>
      </section>
    </div>
  );
}
