"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, X, BookOpen, ChevronRight } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";

export default function Blog() {
  const { blogPosts, clinicConfig } = useDatabase();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activePost = blogPosts.find((post) => post.slug === activeSlug);

  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 bg-stone-100 dark:bg-stone-900/30 transition-colors text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            Ciência, Beleza & Tendências
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-950 dark:text-stone-100 mt-3 mb-6">
            Blog - {clinicConfig.logoText || "Clínica"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Acompanhe artigos exclusivos escritos por nosso corpo médico com dicas de cuidados diários e o que há de mais inovador na estética mundial.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 dark:border-stone-800/30 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Post Image */}
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-stone-900/70 backdrop-blur-sm rounded text-white text-[9px] uppercase tracking-widest font-light">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Meta */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[10px] text-stone-400 font-light mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString("pt-BR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-semibold leading-snug tracking-wide text-stone-800 dark:text-stone-200 mb-3 group-hover:text-gold-550 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed font-light">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Read button */}
                <div className="px-6 pb-6 pt-4 border-t border-stone-100 dark:border-stone-800/40 flex items-center justify-between">
                  <span className="text-[10px] text-stone-450 font-light flex items-center gap-1.5">
                    <User size={12} className="text-gold-500" />
                    Por: {post.author}
                  </span>
                  
                  <button
                    onClick={() => setActiveSlug(post.slug)}
                    className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-gold-500 dark:text-gold-400 hover:text-gold-600 transition-colors cursor-pointer"
                  >
                    Ler Artigo
                    <ChevronRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Drawer/Modal */}
      <AnimatePresence>
        {activeSlug && activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-stone-950/60 backdrop-blur-sm flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-full max-w-2xl bg-white dark:bg-stone-900 h-full overflow-y-auto shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-155"
            >
              {/* Close Bar */}
              <div className="sticky top-0 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-stone-100 dark:border-stone-800 z-20">
                <span className="font-serif text-xs uppercase tracking-widest text-gold-500 font-semibold flex items-center gap-2">
                  <BookOpen size={14} /> Artigo - {clinicConfig.logoText || "Clínica"}
                </span>
                <button
                  onClick={() => setActiveSlug(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cover Image */}
              <div className="relative aspect-video w-full overflow-hidden shrink-0">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10" />
                <span className="absolute bottom-6 left-6 px-3 py-1 bg-gold-600/90 rounded text-white text-[10px] uppercase tracking-widest font-semibold z-10">
                  {activePost.category}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-10 flex-grow font-sans text-xs">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-6 text-[10px] text-stone-400 dark:text-stone-500 font-light mb-6 border-b border-stone-100 dark:border-stone-800/40 pb-4">
                  <span className="flex items-center gap-1.5">
                    <User size={12} className="text-gold-550" />
                    Autor: <strong>{activePost.author}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    Publicado: <strong>{new Date(activePost.date).toLocaleDateString("pt-BR")}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    Leitura: <strong>{activePost.readTime}</strong>
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-stone-950 dark:text-stone-100 leading-tight mb-8 font-medium">
                  {activePost.title}
                </h2>

                {/* Article content HTML */}
                <div
                  className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light space-y-6"
                  dangerouslySetInnerHTML={{ __html: activePost.content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
