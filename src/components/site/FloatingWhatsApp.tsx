"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X, Send, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDatabase } from "@/context/DatabaseContext";

export const FloatingWhatsApp: React.FC = () => {
  const { clinicConfig } = useDatabase();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Simulate clinic assistant typing shortly after opening
  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const formattedPhone = clinicConfig.whatsapp
      ? clinicConfig.whatsapp.replace(/\D/g, "")
      : "11999998888";
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/55${formattedPhone}?text=${text}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9990] select-none">
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-gold-500/20 z-55 cursor-pointer relative"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-300"></span>
        </span>
        <MessageSquare size={22} className="animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0 w-80 bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-850/50 rounded-2xl shadow-2xl overflow-hidden z-50 text-stone-800 dark:text-stone-150"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-800 dark:from-stone-950 dark:to-stone-900 px-4 py-4 text-white flex items-center justify-between border-b border-gold-500/20">
              <div className="flex items-center gap-3">
                {/* Assistant Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-500 to-gold-300 flex items-center justify-center border border-white/20 relative">
                  <span className="font-serif text-sm font-light text-stone-900">L</span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white dark:border-stone-900 rounded-full" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold-400">
                    Luxe Estética
                  </h4>
                  <p className="text-[9px] text-stone-400 font-light">Online • Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Conversation Area */}
            <div className="h-44 p-4 bg-stone-50 dark:bg-stone-950 overflow-y-auto flex flex-col gap-3 font-sans">
              <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl rounded-tl-none shadow-sm border border-stone-100 dark:border-stone-900/50 max-w-[90%] self-start">
                <p className="text-xs leading-relaxed font-light">
                  Olá! Seja muito bem-vinda à Luxe Estética Premium. ✨
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl rounded-tl-none shadow-sm border border-stone-100 dark:border-stone-900/50 max-w-[90%] self-start">
                <p className="text-xs leading-relaxed font-light">
                  Eu sou a Concierge Virtual da clínica. Como posso auxiliar em sua jornada de beleza e bem-estar hoje?
                </p>
              </div>

              {isTyping && (
                <div className="flex gap-1 items-center bg-white dark:bg-stone-900 px-3 py-2.5 rounded-full shadow-sm max-w-[60px] self-start border border-stone-100 dark:border-stone-900/50">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-850 flex items-center gap-2 font-sans"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className="flex-1 text-xs px-3 py-2 bg-stone-100 dark:bg-stone-950 border border-transparent focus:border-gold-300 dark:focus:border-gold-700 rounded-full outline-none transition-all dark:text-white"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white rounded-full transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
