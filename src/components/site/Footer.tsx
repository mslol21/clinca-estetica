"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, ShieldAlert } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";

const Instagram: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Youtube: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { clinicConfig } = useDatabase();

  // Hide footer on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-stone-105 dark:bg-stone-900 border-t border-stone-200/60 dark:border-stone-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Clinic Identity */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex flex-col select-none">
              <span className="font-serif text-xl tracking-[0.25em] uppercase text-stone-800 dark:text-stone-100 font-medium">
                {clinicConfig.name}
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 font-light -mt-0.5">
                Premium Concept
              </span>
            </Link>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
              {clinicConfig.slogan}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={clinicConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700/50 text-stone-600 dark:text-stone-300 hover:text-gold-500 dark:hover:text-gold-400 hover:border-gold-300 transition-all shadow-sm"
              >
                <Instagram size={14} />
              </a>
              <a
                href={clinicConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700/50 text-stone-600 dark:text-stone-300 hover:text-gold-500 dark:hover:text-gold-400 hover:border-gold-300 transition-all shadow-sm"
              >
                <Facebook size={14} />
              </a>
              <a
                href={clinicConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700/50 text-stone-600 dark:text-stone-300 hover:text-gold-500 dark:hover:text-gold-400 hover:border-gold-300 transition-all shadow-sm"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.15em] text-stone-800 dark:text-stone-100 font-semibold mb-5">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Início", path: "/" },
                { name: "Sobre a Clínica", path: "/sobre" },
                { name: "Procedimentos", path: "/procedimentos" },
                { name: "Galeria de Fotos", path: "/galeria" },
                { name: "Antes & Depois", path: "/antes-e-depois" },
                { name: "Agendamento Online", path: "/agendamento" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-xs text-stone-500 dark:text-stone-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Working Hours */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.15em] text-stone-800 dark:text-stone-100 font-semibold mb-5">
              Horários
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-stone-500 dark:text-stone-400 font-light">
              <li>
                <span className="font-medium block text-stone-700 dark:text-stone-300">
                  Segunda a Sexta:
                </span>
                {clinicConfig.workingHours.weekdays}
              </li>
              <li>
                <span className="font-medium block text-stone-700 dark:text-stone-300">
                  Sábado:
                </span>
                {clinicConfig.workingHours.saturday}
              </li>
              <li>
                <span className="font-medium block text-stone-700 dark:text-stone-300">
                  Domingo:
                </span>
                {clinicConfig.workingHours.sunday}
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Address */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.15em] text-stone-800 dark:text-stone-100 font-semibold mb-5">
              Contato
            </h4>
            <ul className="flex flex-col gap-4 text-xs text-stone-500 dark:text-stone-400 font-light">
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold-550 shrink-0 mt-0.5" />
                <span>{clinicConfig.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={14} className="text-gold-550 shrink-0" />
                <span>{clinicConfig.phone}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={14} className="text-gold-550 shrink-0" />
                <span>{clinicConfig.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-stone-200/50 dark:border-stone-850/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-stone-400 dark:text-stone-550 font-light">
            &copy; {new Date().getFullYear()} {clinicConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-[10px] text-stone-400 hover:text-gold-500 dark:text-stone-500 dark:hover:text-gold-400 transition-colors uppercase tracking-widest font-semibold border border-dashed border-stone-300 dark:border-stone-800 px-3 py-1 rounded"
            >
              <ShieldAlert size={12} />
              Acesso Administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
