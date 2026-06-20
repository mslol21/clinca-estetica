"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Info, Check, HelpCircle, Calendar, Plus, Minus } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";

function ProcedimentosContent() {
  const { procedures } = useDatabase();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<"todos" | "facial" | "corporal" | "laser" | "avancada">("todos");
  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const catParam = searchParams?.get("category");
    if (catParam && ["facial", "corporal", "laser", "avancada"].includes(catParam)) {
      setSelectedCategory(catParam as any);
    }
  }, [searchParams]);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "facial", name: "Facial" },
    { id: "corporal", name: "Corporal" },
    { id: "laser", name: "Laser" },
    { id: "avancada", name: "Estética Avançada" },
  ];

  const filteredProcedures =
    selectedCategory === "todos"
      ? procedures
      : procedures.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 bg-stone-100 dark:bg-stone-900/30 transition-colors text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            Nossos Protocolos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-850 dark:text-stone-100 mt-3 mb-6">
            Procedimentos e Tratamentos
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Explore nossa seleção curada de procedimentos clínicos voltados à restauração cutânea, harmonização dos traços e contorno corporal.
          </p>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="py-8 bg-white dark:bg-stone-950/60 border-y border-stone-200/50 dark:border-stone-850/50 sticky top-[72px] lg:top-[80px] z-40 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 md:px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-500/10"
                    : "text-stone-500 hover:text-stone-850 dark:text-stone-400 dark:hover:text-stone-200 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Procedures List */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
          <AnimatePresence mode="popLayout">
            {filteredProcedures.length > 0 ? (
              filteredProcedures.map((proc, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={proc.id}
                    id={`proc-${proc.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-36 p-6 md:p-10 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-800/40 shadow-xl shadow-stone-500/5`}
                  >
                    {/* Image Column */}
                    <div className={`lg:col-span-5 ${!isEven ? "lg:order-2" : ""}`}>
                      <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                        <img
                          src={proc.image}
                          alt={proc.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Price & Duration quick info */}
                      <div className="mt-6 flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-100 dark:border-stone-850/50">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gold-550 shrink-0" />
                          <span className="text-xs text-stone-500 dark:text-stone-400 font-light">
                            Duração: <strong>{proc.duration} min</strong>
                          </span>
                        </div>
                        {proc.price && (
                          <div className="text-right">
                            <span className="text-[10px] text-stone-400 block font-light">A partir de</span>
                            <span className="font-serif text-sm font-semibold text-gold-600 dark:text-gold-400">
                              R$ {proc.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CTA button */}
                      <Link
                        href={`/agendamento?procedureId=${proc.id}`}
                        className="mt-4 w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white rounded-xl shadow-lg transition-all"
                      >
                        <Calendar size={14} />
                        Agendar este procedimento
                      </Link>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-7 flex flex-col items-start ${!isEven ? "lg:order-1" : ""}`}>
                      <span className="px-2.5 py-0.5 rounded bg-gold-100/50 dark:bg-gold-950/20 border border-gold-300/20 text-gold-600 dark:text-gold-400 text-[9px] uppercase tracking-widest font-semibold mb-3">
                        Estética {proc.category}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-stone-850 dark:text-stone-100 font-medium mb-4">
                        {proc.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light mb-6">
                        {proc.description}
                      </p>

                      {/* Benefits & Contraindications Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
                        <div>
                          <h4 className="font-serif text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Check size={14} className="text-gold-550" /> Benefícios
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {proc.benefits.map((b, idx) => (
                              <li key={idx} className="text-xs text-stone-500 dark:text-stone-400 font-light flex gap-2">
                                <span className="text-gold-400 select-none">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-serif text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Info size={14} className="text-stone-400" /> Contraindicações
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {proc.contraindications.map((c, idx) => (
                              <li key={idx} className="text-xs text-stone-500 dark:text-stone-400 font-light flex gap-2">
                                <span className="text-stone-300 dark:text-stone-700 select-none">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* FAQ Section Accordion */}
                      {proc.faq && proc.faq.length > 0 && (
                        <div className="w-full border-t border-stone-100 dark:border-stone-800/40 pt-6">
                          <h4 className="font-serif text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                            <HelpCircle size={14} className="text-gold-550" /> Dúvidas Frequentes
                          </h4>
                          <div className="flex flex-col gap-3 w-full">
                            {proc.faq.map((faqItem, fIdx) => {
                              const faqId = `${proc.id}-faq-${fIdx}`;
                              const isExpanded = !!expandedFaq[faqId];
                              return (
                                <div
                                  key={fIdx}
                                  className="border border-stone-200/50 dark:border-stone-800/40 rounded-xl overflow-hidden bg-stone-50/50 dark:bg-stone-950/20"
                                >
                                  <button
                                    onClick={() => toggleFaq(faqId)}
                                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                                  >
                                    <span className="text-xs font-medium text-stone-750 dark:text-stone-350 pr-4">
                                      {faqItem.question}
                                    </span>
                                    {isExpanded ? (
                                      <Minus size={14} className="text-stone-400 shrink-0" />
                                    ) : (
                                      <Plus size={14} className="text-stone-400 shrink-0" />
                                    )}
                                  </button>
                                  
                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="p-4 pt-0 text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light border-t border-stone-200/30 dark:border-stone-800/20 mt-1">
                                          {faqItem.answer}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20 text-stone-400">
                Nenhum procedimento cadastrado nesta categoria.
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default function Procedimentos() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center font-sans text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-500 font-light">Carregando procedimentos...</p>
        </div>
      </div>
    }>
      <ProcedimentosContent />
    </Suspense>
  );
}
