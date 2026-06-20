"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Key, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";

export default function AdminLogin() {
  const { login, user } = useAuth();
  const { success, error } = useToast();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin panel
  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    const successLogin = await login(email, password);

    if (successLogin) {
      success("Acesso autorizado", "Bem-vindo de volta ao Painel Luxe Estética.");
      router.push("/admin");
    } else {
      error("Acesso negado", "E-mail ou senha incorretos. Tente os dados de demonstração.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4 py-12 relative font-sans text-xs transition-colors">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gold-400/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 bg-gradient-to-tr from-gold-500 to-gold-300 items-center justify-center rounded-full border border-gold-400/30 text-white shadow-xl shadow-gold-500/5 mb-4">
            <span className="font-serif text-2xl font-light">L</span>
          </div>
          <h2 className="font-serif text-2xl tracking-[0.2em] uppercase text-stone-850 dark:text-stone-100">
            Painel Concierge
          </h2>
          <p className="text-[10px] tracking-[0.1em] uppercase text-stone-500 dark:text-stone-400 font-light mt-1">
            Administração Luxe Estética
          </p>
        </div>

        {/* Login glass-card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl shadow-2xl shadow-gold-500/5 border border-stone-200/40 dark:border-stone-800/40">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="font-medium text-stone-600 dark:text-stone-300">
                E-mail de Acesso
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@luxe.com"
                  className="w-full pl-11 pr-4 py-3 bg-stone-50/50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 dark:focus:border-gold-650 transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="font-medium text-stone-600 dark:text-stone-300">
                Senha
              </label>
              <div className="relative">
                <Key size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-stone-50/50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 dark:focus:border-gold-650 transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Demo Help Banner */}
            <div className="p-3.5 bg-gold-50/60 dark:bg-gold-950/10 border border-gold-300/30 rounded-xl mt-2">
              <span className="font-semibold text-gold-600 dark:text-gold-400 block mb-1 flex items-center gap-1">
                <Sparkles size={12} /> Acesso Demonstrativo:
              </span>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                E-mail: <strong className="font-semibold select-all">admin@luxe.com</strong> <br />
                Senha: <strong className="font-semibold select-all">admin123</strong>
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-3.5 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-gold-500 dark:to-gold-400 dark:hover:from-gold-600 dark:hover:to-gold-500 dark:text-white text-white rounded-xl font-semibold uppercase tracking-widest text-center shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                "Autenticando..."
              ) : (
                <>
                  Entrar no Painel <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
