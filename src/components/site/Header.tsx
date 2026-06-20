"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDatabase } from "@/context/DatabaseContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { clinicConfig, btnRadius } = useDatabase();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomeAndNotScrolled = pathname === "/" && !scrolled;

  // Sync theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("luxe_theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("luxe_theme", "light");
      setTheme("light");
    }
  };

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    { name: "Procedimentos", path: "/procedimentos" },
    { name: "Galeria", path: "/galeria" },
    { name: "Antes & Depois", path: "/antes-e-depois" },
    { name: "Depoimentos", path: "/depoimentos" },
    { name: "Blog", path: "/blog" },
    { name: "Contato", path: "/contato" },
  ];

  // Helper for dynamic button radius
  const btnRadiusClass = btnRadius;

  // Don't show header in admin dashboard paths
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-header shadow-md shadow-gold-500/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 select-none">
            {clinicConfig.logoImage ? (
              <img
                src={clinicConfig.logoImage}
                alt={clinicConfig.name}
                className="h-10 w-auto object-contain max-h-[44px]"
              />
            ) : (
              <div className="flex flex-col">
                <span className={`font-serif text-xl tracking-[0.25em] uppercase font-medium ${
                  isHomeAndNotScrolled
                    ? "text-white"
                    : "text-primary dark:text-stone-100"
                }`}>
                  {clinicConfig.logoText || clinicConfig.name}
                </span>
                <span className={`text-[9px] tracking-[0.2em] uppercase font-light -mt-0.5 ${
                  isHomeAndNotScrolled
                    ? "text-white/70"
                    : "text-stone-600 dark:text-stone-400"
                }`}>
                  Premium Concept
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs uppercase tracking-widest font-medium transition-colors ${
                    isHomeAndNotScrolled
                      ? isActive
                        ? "text-primary font-semibold"
                        : "text-white/90 hover:text-primary"
                      : isActive
                      ? "text-primary font-semibold"
                      : "text-stone-900 dark:text-stone-300 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all ${
                isHomeAndNotScrolled
                  ? "border-white/20 text-white/90 hover:border-white hover:text-white"
                  : "border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-primary hover:text-primary"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Appointment Booking button */}
            <Link
              href="/agendamento"
              className={`flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-200 ${btnRadiusClass}`}
            >
              <Calendar size={14} />
              Agendar Avaliação
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border ${
                isHomeAndNotScrolled
                  ? "border-white/20 text-white/90"
                  : "border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300"
              }`}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-md border ${
                isHomeAndNotScrolled
                  ? "border-white/20 text-white"
                  : "border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100"
              }`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-200/50 dark:border-stone-800/50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-lg overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm uppercase tracking-widest font-medium py-1.5 border-b border-stone-100 dark:border-stone-900 transition-colors ${
                      isActive
                        ? "text-gold-500 dark:text-gold-400 font-semibold"
                        : "text-stone-600 dark:text-stone-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/agendamento"
                onClick={() => setMobileMenuOpen(false)}
                className={`mt-2 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg ${btnRadiusClass}`}
              >
                <Calendar size={14} />
                Agendar Avaliação
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
