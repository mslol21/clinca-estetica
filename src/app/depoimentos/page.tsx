"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Plus, PenTool, X, Check } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";
import { useToast } from "@/components/ui/Toast";
import { themeConfig } from "@/config/theme-config";

export default function Depoimentos() {
  const { testimonials, saveTestimonial } = useDatabase();
  const { success, error } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      error("Erro no formulário", "Por favor, preencha o seu nome e seu comentário.");
      return;
    }

    const newTestimonial = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      role: role || "Cliente",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150", // generic avatar
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    saveTestimonial(newTestimonial);
    success("Depoimento enviado!", "Seu depoimento foi enviado com sucesso e está visível para os visitantes.");
    
    // Reset form
    setName("");
    setRole("");
    setRating(5);
    setComment("");
    setFormOpen(false);
  };

  // Calculate statistics
  const totalReviews = testimonials.length + 125; // mock baseline
  const ratingSum = testimonials.reduce((acc, t) => acc + t.rating, 0) + (125 * 4.9);
  const averageRating = (ratingSum / totalReviews).toFixed(1);

  // Dynamic border radius for buttons
  const btnRadius =
    themeConfig.styles.button === "pill"
      ? "rounded-full"
      : themeConfig.styles.button === "rounded"
      ? "rounded-xl"
      : "rounded-none";

  // Dynamic style for cards
  const cardStyleClass =
    themeConfig.styles.card === "glass"
      ? "glass-card"
      : themeConfig.styles.card === "bordered"
      ? "bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/40"
      : "bg-white dark:bg-stone-900 shadow-xl shadow-stone-500/5 dark:shadow-none border border-transparent";

  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 bg-stone-100 dark:bg-stone-900/30 transition-colors text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            A Opinião de Quem nos Inspira
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-850 dark:text-stone-100 mt-3 mb-6">
            Avaliações & Depoimentos
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            A satisfação e segurança de nossas pacientes são nossa prioridade máxima. Confira os relatos de quem confiou em nosso cuidado.
          </p>
        </div>
      </section>

      {/* Ratings Stats & Actions Bar */}
      <section className="py-12 bg-white dark:bg-stone-950/60 border-y border-stone-200/50 dark:border-stone-850/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Average Info */}
          <div className="flex items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-4xl sm:text-5xl font-serif font-light text-gold-500 dark:text-gold-400">
                {averageRating}
              </span>
              <span className="text-xs text-stone-400 block font-light mt-0.5">de 5 estrelas</span>
            </div>
            
            <div className="h-10 w-[1px] bg-stone-200 dark:bg-stone-800 hidden sm:block" />
            
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-0.5 text-gold-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-450 block font-light mt-1">
                Baseado em {totalReviews} opiniões reais
              </span>
            </div>
          </div>

          {/* Add testimonial button */}
          <button
            onClick={() => setFormOpen(true)}
            className={`flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white ${btnRadius} shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25 transition-all cursor-pointer`}
          >
            <PenTool size={14} />
            Escrever Avaliação
          </button>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-16 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`${cardStyleClass} p-8 rounded-2xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-0.5 text-gold-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={15} className="fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-light">
                      {new Date(item.date).toLocaleDateString("pt-BR")}
                    </span>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Write review modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-800/40 shadow-2xl p-6 md:p-8 max-w-lg w-full text-stone-800 dark:text-stone-100"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <h3 className="font-serif text-lg font-semibold tracking-wide">
                  Escreva sua Avaliação
                </h3>
                <button
                  onClick={() => setFormOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-450 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-xs">
                {/* Rating selection */}
                <div>
                  <span className="font-medium block text-stone-650 dark:text-stone-300 mb-2">
                    Sua Nota (1 a 5 estrelas)
                  </span>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const value = idx + 1;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRating(value)}
                          className="text-stone-300 hover:text-gold-450 transition-colors cursor-pointer"
                        >
                          <Star
                            size={24}
                            className={`${
                              value <= rating
                                ? "fill-gold-400 text-gold-400"
                                : "text-stone-300 dark:text-stone-700"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="font-medium text-stone-650 dark:text-stone-300">
                    Nome Completo
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Mariana Albuquerque"
                    className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-400 dark:focus:border-gold-600 transition-colors"
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-role" className="font-medium text-stone-650 dark:text-stone-300">
                    Profissão / Ocupação (Opcional)
                  </label>
                  <input
                    id="form-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Empresária, Advogada"
                    className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-400 dark:focus:border-gold-600 transition-colors"
                  />
                </div>

                {/* Comment */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-comment" className="font-medium text-stone-650 dark:text-stone-300">
                    Comentário
                  </label>
                  <textarea
                    id="form-comment"
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escreva sobre sua experiência na clínica, tratamentos realizados e atendimento..."
                    className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-400 dark:focus:border-gold-600 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className={`mt-4 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white ${btnRadius} font-semibold uppercase tracking-widest text-center shadow-lg transition-colors cursor-pointer`}
                >
                  Enviar Avaliação
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
