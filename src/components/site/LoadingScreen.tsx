"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clinicConfig } from "@/config/clinic-config";

export const LoadingScreen: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Elegant timing to show loading branding
    const timer = setTimeout(() => setShow(false), 1650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950"
        >
          <div className="relative flex flex-col items-center">
            {/* Pulsing branding crest */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-full border border-gold-300/30"
            >
              <div className="absolute inset-1 rounded-full border border-gold-400/30 animate-pulse" />
              <div className="absolute inset-3 rounded-full border border-gold-400/70 animate-ping opacity-15" />
              <span className="font-serif text-3xl font-light tracking-[0.1em] text-gold-500 dark:text-gold-400">
                {clinicConfig.logoText?.[0] || "L"}
              </span>
            </motion.div>

            {/* Typography with letters breathing */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-2xl tracking-[0.35em] uppercase text-stone-800 dark:text-stone-100"
            >
              {clinicConfig.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-2 text-[10px] font-light tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 text-center max-w-xs"
            >
              {clinicConfig.slogan}
            </motion.p>

            {/* Micro progress indicator */}
            <div className="w-28 h-[1px] bg-stone-200 dark:bg-stone-800 mt-8 relative overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
