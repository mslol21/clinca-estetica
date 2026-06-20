"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Clock, Star } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";

export default function AntesEDepois() {
  const { beforeAfter, btnRadius, cardStyleClass } = useDatabase();
  const [selectedFilter, setSelectedFilter] = useState<"todos" | "facial" | "corporal" | "laser" | "avancada">("todos");

  const filters = [
    { id: "todos", name: "Todos os Resultados" },
    { id: "facial", name: "Facial" },
    { id: "corporal", name: "Corporal" },
    { id: "laser", name: "Laser" },
    { id: "avancada", name: "Avançada" },
  ];

  const filteredItems =
    selectedFilter === "todos"
      ? beforeAfter
      : beforeAfter.filter((item) => item.category === selectedFilter);



  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 bg-stone-100 dark:bg-stone-900/30 transition-colors text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            Galeria de Resultados Clínicos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-850 dark:text-stone-100 mt-3 mb-6">
            Antes e Depois
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Comparações interativas de casos clínicos autorizados. Arraste a linha central para visualizar a transformação obtida.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-8 bg-white dark:bg-stone-950/60 border-y border-stone-200/50 dark:border-stone-850/50 sticky top-[72px] lg:top-[80px] z-40 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-5 py-2.5 ${btnRadius} text-xs uppercase tracking-widest font-semibold transition-all ${
                  selectedFilter === f.id
                    ? "bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-500/10"
                    : "text-stone-500 hover:text-stone-850 dark:text-stone-400 dark:hover:text-stone-200 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Before After Case List */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${cardStyleClass} p-6 md:p-10 rounded-3xl`}
                  >
                    {/* Slider Column */}
                    <div className={`lg:col-span-6 ${!isEven ? "lg:order-2" : ""}`}>
                      <BeforeAfterSlider
                        beforeImage={item.beforeImage}
                        afterImage={item.afterImage}
                        beforeLabel="Antes"
                        afterLabel="Depois"
                      />
                    </div>

                    {/* Explanatory Column */}
                    <div className={`lg:col-span-6 text-left flex flex-col items-start ${!isEven ? "lg:order-1" : ""}`}>
                      <span className="px-2.5 py-0.5 rounded bg-gold-100/50 dark:bg-gold-950/20 border border-gold-300/20 text-gold-600 dark:text-gold-400 text-[9px] uppercase tracking-widest font-semibold mb-3">
                        Procedimento {item.category}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-stone-850 dark:text-stone-100 font-medium mb-4">
                        {item.title}
                      </h2>
                      
                      <div className="h-[1px] w-12 bg-gold-400 mb-6" />
                      
                      <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light mb-6">
                        {item.description}
                      </p>

                      {/* Information badges */}
                      <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-100 dark:border-stone-850/50 w-full">
                        <div className="flex-1 text-center">
                          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light block mb-1">
                            Anestesia
                          </span>
                          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                            Local / Creme
                          </span>
                        </div>
                        <div className="w-[1px] h-8 bg-stone-200 dark:bg-stone-800" />
                        <div className="flex-1 text-center">
                          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light block mb-1">
                            Recuperação
                          </span>
                          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                            Imediata
                          </span>
                        </div>
                        <div className="w-[1px] h-8 bg-stone-200 dark:bg-stone-800" />
                        <div className="flex-1 text-center">
                          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light block mb-1">
                            Indicação
                          </span>
                          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                            Flacidez / Tom
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20 text-stone-400">
                Nenhum resultado cadastrado nesta categoria.
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Medical disclaimer note */}
      <section className="py-12 bg-white dark:bg-stone-950 transition-colors border-t border-stone-100 dark:border-stone-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[10px] text-stone-400 dark:text-stone-500 leading-relaxed font-light">
            * Nota de Ética Médica: As fotos de antes e depois apresentadas nesta página correspondem a pacientes reais da clínica que autorizaram expressamente a divulgação de seus resultados para fins informativos e educacionais, em conformidade com as diretrizes do Conselho Federal de Medicina (CFM) e da Sociedade Brasileira de Dermatologia (SBD). Lembramos que cada organismo reage de forma individual e os resultados podem variar.
          </p>
        </div>
      </section>
    </div>
  );
}
