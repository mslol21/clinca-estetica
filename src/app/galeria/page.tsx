"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize2, Sparkles } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";

export default function Galeria() {
  const { gallery, btnRadius, cardStyleClass } = useDatabase();
  const [selectedFilter, setSelectedFilter] = useState<"todos" | "facial" | "corporal" | "laser" | "clinica">("todos");
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  const filters = [
    { id: "todos", name: "Todos" },
    { id: "facial", name: "Facial" },
    { id: "corporal", name: "Corporal" },
    { id: "laser", name: "Laser" },
    { id: "clinica", name: "A Clínica" },
  ];

  const filteredPhotos =
    selectedFilter === "todos"
      ? gallery
      : gallery.filter((item) => item.category === selectedFilter);

  const activeItem = gallery.find((item) => item.id === activePhoto);

  const handleOpenLightbox = (id: string) => {
    setActivePhoto(id);
    setZoomScale(1);
  };

  const handleCloseLightbox = () => {
    setActivePhoto(null);
    setZoomScale(1);
  };

  const zoomIn = () => setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setZoomScale((prev) => Math.max(prev - 0.25, 0.75));



  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 bg-stone-100 dark:bg-stone-900/30 transition-colors text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            Nossos Espaços & Procedimentos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-850 dark:text-stone-100 mt-3 mb-6">
            Galeria de Fotos
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Uma imersão visual em nossa recepção, salas de atendimento e na precisão cirúrgica de nossos tratamentos de beleza.
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
                className={`px-5 py-2 ${btnRadius} text-xs uppercase tracking-widest font-semibold transition-all ${
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

      {/* Gallery Grid */}
      <section className="py-16 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`${cardStyleClass} rounded-2xl overflow-hidden group relative cursor-pointer`}
                  onClick={() => handleOpenLightbox(photo.id)}
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-stone-100 dark:border-stone-800/40 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {photo.title}
                      </h4>
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-light mt-0.5 block">
                        {photo.category}
                      </span>
                    </div>
                    <Sparkles size={14} className="text-gold-450 opacity-60" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-stone-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Header controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
              <div className="flex flex-col">
                <h3 className="font-serif text-sm uppercase tracking-wider text-gold-400">
                  {activeItem.title}
                </h3>
                <span className="text-[10px] uppercase tracking-widest font-light text-stone-400 mt-0.5">
                  Categoria: {activeItem.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors ml-4"
                  title="Fechar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Display Image */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center overflow-hidden z-10"
            >
              <motion.img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomScale})` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
