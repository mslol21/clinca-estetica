"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";
import { useToast } from "@/components/ui/Toast";

export default function Contato() {
  const { clinicConfig, btnRadius, cardStyleClass } = useDatabase();
  const { success, error } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      error("Dados incompletos", "Por favor, preencha os campos obrigatórios.");
      return;
    }

    setSending(true);
    // Simulate sending message
    setTimeout(() => {
      success(
        "Mensagem enviada!",
        "Agradecemos o contato. Nossa concierge retornará o seu e-mail/WhatsApp em breve."
      );
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSending(false);
    }, 1200);
  };

  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 bg-stone-100 dark:bg-stone-900/30 transition-colors text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 dark:text-gold-400">
            Fale Conosco
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-950 dark:text-stone-100 mt-3 mb-6">
            Contato & Localização
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Estamos prontos para atender você. Agende sua visita ou tire suas dúvidas através de nossos canais de atendimento premium.
          </p>
        </div>
      </section>

      {/* Main Section: Details & Form */}
      <section className="py-20 bg-white dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-gold-550 block mb-2">
                Atendimento Exclusivo
              </span>
              <h2 className="font-serif text-2xl tracking-tight text-stone-950 dark:text-stone-150 mb-6 font-medium">
                Canais de Relacionamento
              </h2>
              
              <ul className="flex flex-col gap-6 text-xs text-stone-500 dark:text-stone-400 font-light font-sans">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-gold-550 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-750 dark:text-stone-300">Localização</h4>
                    <p className="mt-0.5 leading-relaxed">{clinicConfig.address}</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-gold-550 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-750 dark:text-stone-300">Telefone Fixo</h4>
                    <p className="mt-0.5">{clinicConfig.phone}</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-gold-550 shrink-0">
                    <MessageSquare size={16} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-750 dark:text-stone-300">WhatsApp Concierge</h4>
                    <p className="mt-0.5">{clinicConfig.whatsapp}</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-gold-550 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-750 dark:text-stone-300">E-mail Comercial</h4>
                    <p className="mt-0.5">{clinicConfig.email}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Working hours box */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/40 border border-stone-150 dark:border-stone-800/40">
              <h4 className="font-serif text-sm text-stone-950 dark:text-stone-150 mb-3 font-semibold flex items-center gap-2">
                <Clock size={16} className="text-gold-550" /> Horários de Funcionamento
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-stone-500 dark:text-stone-400 font-light">
                <li className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span className="font-medium">{clinicConfig.workingHours.weekdays}</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="font-medium">{clinicConfig.workingHours.saturday}</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="font-medium text-red-500 dark:text-red-400">{clinicConfig.workingHours.sunday}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Column */}
          <div className={`lg:col-span-7 p-6 md:p-10 ${cardStyleClass} rounded-3xl`}>
            <h3 className="font-serif text-xl text-stone-950 dark:text-stone-155 mb-6 font-medium">
              Envie uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-medium text-stone-650 dark:text-stone-300">
                    Nome Completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Mariana Albuquerque"
                    className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-400 dark:focus:border-gold-650 transition-colors dark:text-white"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-medium text-stone-650 dark:text-stone-300">
                    E-mail *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: mariana@email.com"
                    className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-400 dark:focus:border-gold-650 transition-colors dark:text-white"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-phone" className="font-medium text-stone-650 dark:text-stone-300">
                  Telefone / WhatsApp
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (11) 99999-8888"
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-400 dark:focus:border-gold-650 transition-colors dark:text-white"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-medium text-stone-650 dark:text-stone-300">
                  Mensagem *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sobre suas dúvidas, orçamento ou interesse em procedimentos..."
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-400 dark:focus:border-gold-650 transition-colors dark:text-white resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className={`mt-2 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white ${btnRadius} font-semibold uppercase tracking-widest text-center shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2`}
              >
                {sending ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send size={14} /> Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      {clinicConfig.googleMapsUrl && (
        <section className="w-full h-96 relative border-t border-stone-200/50 dark:border-stone-800/40">
          <iframe
            src={clinicConfig.googleMapsUrl}
            className="w-full h-full border-0 grayscale opacity-90 dark:opacity-75"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Localização ${clinicConfig.name} no Google Maps`}
          />
        </section>
      )}
    </div>
  );
}
