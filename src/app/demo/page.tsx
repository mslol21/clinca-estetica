"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Upload,
  Phone,
  Smile,
  Type,
  Layout,
  CheckCircle,
} from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";
import { useToast } from "@/components/ui/Toast";
import { themePresets, themeConfig as defaultTheme } from "@/config/theme-config";
import { clinicConfig as defaultClinic } from "@/config/clinic-config";
import Home from "../page";

export default function DemoPage() {
  const { clinicConfig, theme, saveClinicConfig, saveTheme } = useDatabase();
  const { success } = useToast();
  const [presentationMode, setPresentationMode] = useState(false);

  // File Upload states for UI visual feedback
  const [logoFileName, setLogoFileName] = useState("");
  const [heroFileName, setHeroFileName] = useState("");

  const handleApplyPreset = (presetName: "luxo" | "rose" | "modern") => {
    const selectedPreset = themePresets[presetName];
    saveTheme(selectedPreset);
    success("Tema Aplicado!", `O tema "${presetName === "luxo" ? "Luxo Premium" : presetName === "rose" ? "Rose Beauty" : "Modern Clinic"}" foi carregado.`);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        saveClinicConfig({
          ...clinicConfig,
          logoImage: reader.result as string,
        });
        success("Logo Atualizado", "O logotipo foi alterado no cabeçalho.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        saveClinicConfig({
          ...clinicConfig,
          heroImage: reader.result as string,
        });
        success("Hero Banner Atualizado", "A imagem principal do banner foi alterada.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestore = () => {
    // Reset config & theme to factory defaults
    saveClinicConfig(defaultClinic);
    saveTheme(defaultTheme);
    setLogoFileName("");
    setHeroFileName("");
    success("Demonstração Restaurada", "Todas as configurações e imagens voltaram ao padrão original.");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Home Page Component for Live Preview */}
      <div className="relative z-0">
        <Home />
      </div>

      {/* Editor Panel Controls Overlay */}
      <AnimatePresence>
        {!presentationMode && (
          <motion.div
            initial={{ x: -380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -380, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed top-20 left-4 bottom-4 w-[350px] bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-2xl border border-stone-200/50 dark:border-stone-800/40 shadow-2xl p-6 overflow-y-auto z-50 flex flex-col gap-6 font-sans text-xs scrollbar-thin"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800/40 shrink-0">
              <div className="flex items-center gap-2">
                <Settings className="text-gold-550 animate-spin-slow" size={16} />
                <h2 className="font-serif text-sm font-semibold tracking-wider text-stone-800 dark:text-stone-100">
                  Painel de Demonstração
                </h2>
              </div>
              <button
                onClick={() => setPresentationMode(true)}
                className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                title="Modo Apresentação"
              >
                <EyeOff size={15} />
              </button>
            </div>

            {/* Content inputs */}
            <div className="flex flex-col gap-5 flex-grow">
              {/* Presets Manager */}
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                  <Sparkles size={11} className="text-gold-550" /> Seleção de Temas
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleApplyPreset("luxo")}
                    className="p-2 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-gold-450 dark:hover:border-gold-600 hover:bg-gold-50/10 transition-all text-center flex flex-col items-center gap-1"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#c5a880] border border-white" />
                    <span className="font-medium text-[9px] block">Luxo</span>
                  </button>
                  <button
                    onClick={() => handleApplyPreset("rose")}
                    className="p-2 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-gold-450 dark:hover:border-gold-600 hover:bg-gold-50/10 transition-all text-center flex flex-col items-center gap-1"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#e5b0a3] border border-white" />
                    <span className="font-medium text-[9px] block">Rose</span>
                  </button>
                  <button
                    onClick={() => handleApplyPreset("modern")}
                    className="p-2 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-gold-450 dark:hover:border-gold-600 hover:bg-gold-50/10 transition-all text-center flex flex-col items-center gap-1"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#0f4c81] border border-white" />
                    <span className="font-medium text-[9px] block">Modern</span>
                  </button>
                </div>
              </div>

              {/* Text fields */}
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-widest text-[9px] flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800/40 pb-1">
                  <Smile size={11} className="text-gold-550" /> Textos da Clínica
                </span>
                
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-stone-500">Nome da Clínica</label>
                  <input
                    type="text"
                    value={clinicConfig.name}
                    onChange={(e) => saveClinicConfig({ ...clinicConfig, name: e.target.value })}
                    className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 text-stone-800 dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-stone-500">Slogan / Tagline</label>
                  <input
                    type="text"
                    value={clinicConfig.slogan}
                    onChange={(e) => saveClinicConfig({ ...clinicConfig, slogan: e.target.value })}
                    className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 text-stone-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Contacts */}
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-widest text-[9px] flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800/40 pb-1">
                  <Phone size={11} className="text-gold-550" /> Contatos comerciais
                </span>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-stone-500">WhatsApp</label>
                  <input
                    type="text"
                    value={clinicConfig.whatsapp}
                    onChange={(e) => saveClinicConfig({ ...clinicConfig, whatsapp: e.target.value })}
                    className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 text-stone-800 dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-stone-500">Instagram URL</label>
                  <input
                    type="text"
                    value={clinicConfig.social.instagram}
                    onChange={(e) =>
                      saveClinicConfig({
                        ...clinicConfig,
                        social: { ...clinicConfig.social, instagram: e.target.value },
                      })
                    }
                    className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 text-stone-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Visual Colors & Shapes */}
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-widest text-[9px] flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800/40 pb-1">
                  <Layout size={11} className="text-gold-550" /> Cores e Formatos
                </span>

                <div className="flex items-center justify-between gap-3">
                  <label className="font-medium text-stone-500">Cor Principal (Hex/Picker)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.colors.primary}
                      onChange={(e) =>
                        saveTheme({
                          ...theme,
                          colors: { ...theme.colors, primary: e.target.value },
                        })
                      }
                      className="w-7 h-7 rounded border border-stone-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.primary}
                      onChange={(e) =>
                        saveTheme({
                          ...theme,
                          colors: { ...theme.colors, primary: e.target.value },
                        })
                      }
                      className="w-20 p-1.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-lg outline-none font-mono text-[10px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-stone-500">Formato Botões</label>
                    <select
                      value={theme.styles.button}
                      onChange={(e) =>
                        saveTheme({
                          ...theme,
                          styles: { ...theme.styles, button: e.target.value as any },
                        })
                      }
                      className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none text-stone-750 dark:text-stone-300"
                    >
                      <option value="pill">Pill (Arredondado)</option>
                      <option value="rounded">Rounded (Suave)</option>
                      <option value="square">Square (Reto)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-stone-500">Estilo Cards</label>
                    <select
                      value={theme.styles.card}
                      onChange={(e) =>
                        saveTheme({
                          ...theme,
                          styles: { ...theme.styles, card: e.target.value as any },
                        })
                      }
                      className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none text-stone-750 dark:text-stone-300"
                    >
                      <option value="glass">Glassmorphism</option>
                      <option value="bordered">Borda Fina</option>
                      <option value="flat">Sem Efeitos</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Graphic Assets Upload */}
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-widest text-[9px] flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800/40 pb-1">
                  <Upload size={11} className="text-gold-550" /> Elementos Gráficos
                </span>

                {/* Logo upload */}
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-stone-500">Logotipo (PNG / JPG / WEBP)</label>
                  <label className="p-3 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-950 transition-colors flex items-center justify-center gap-2 cursor-pointer text-stone-500 text-center">
                    <Upload size={14} />
                    <span className="truncate max-w-[200px]">
                      {logoFileName || "Selecione o logo..."}
                    </span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Hero Banner upload */}
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-stone-500">Banner Principal Hero</label>
                  <label className="p-3 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-950 transition-colors flex items-center justify-center gap-2 cursor-pointer text-stone-500 text-center">
                    <Upload size={14} />
                    <span className="truncate max-w-[200px]">
                      {heroFileName || "Selecione o banner..."}
                    </span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleHeroUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Actions Buttons */}
            <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/40 flex flex-col gap-2 shrink-0">
              <button
                onClick={handleRestore}
                className="w-full py-3 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850 rounded-xl font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-stone-600 dark:text-stone-300"
              >
                <RefreshCw size={13} />
                Restaurar Demonstração
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Settings Gear Trigger for Presentation Mode */}
      <AnimatePresence>
        {presentationMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setPresentationMode(false)}
            className="fixed bottom-6 left-6 p-4 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-2xl z-[99999] hover:rotate-45 transition-transform duration-300 cursor-pointer"
            title="Voltar ao Modo Editor"
          >
            <Eye size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
