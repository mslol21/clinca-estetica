"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextProps {
  toast: (type: ToastType, title: string, description?: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setMessages((prev) => [...prev, { id, type, title, description }]);
      
      // Auto close after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback((title: string, description?: string) => toast("success", title, description), [toast]);
  const error = useCallback((title: string, description?: string) => toast("error", title, description), [toast]);
  const warning = useCallback((title: string, description?: string) => toast("warning", title, description), [toast]);
  const info = useCallback((title: string, description?: string) => toast("info", title, description), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      
      {/* Toast Portal/Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {messages.map((msg) => {
            let Icon = Info;
            let iconColor = "text-blue-500";
            let bgStyles = "bg-white/95 border-l-4 border-l-blue-500 shadow-lg text-stone-900";
            
            if (msg.type === "success") {
              Icon = CheckCircle2;
              iconColor = "text-gold-500 dark:text-gold-400";
              bgStyles = "bg-stone-50/95 dark:bg-stone-900/95 border-l-4 border-l-gold-400 dark:border-l-gold-500 shadow-xl shadow-gold-500/5 text-stone-900 dark:text-stone-100 border border-stone-200/50 dark:border-stone-800/50";
            } else if (msg.type === "error") {
              Icon = AlertCircle;
              iconColor = "text-red-500";
              bgStyles = "bg-stone-50/95 dark:bg-stone-900/95 border-l-4 border-l-red-500 shadow-xl text-stone-900 dark:text-stone-100 border border-stone-200/50 dark:border-stone-800/50";
            } else if (msg.type === "warning") {
              Icon = AlertTriangle;
              iconColor = "text-amber-500";
              bgStyles = "bg-stone-50/95 dark:bg-stone-900/95 border-l-4 border-l-amber-500 shadow-xl text-stone-900 dark:text-stone-100 border border-stone-200/50 dark:border-stone-800/50";
            }

            return (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className={`flex gap-3 p-4 rounded-lg backdrop-blur-md pointer-events-auto ${bgStyles}`}
              >
                <div className="mt-0.5">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm leading-tight font-sans">{msg.title}</h4>
                  {msg.description && (
                    <p className="mt-1 text-xs opacity-80 leading-relaxed font-sans">{msg.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(msg.id)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
