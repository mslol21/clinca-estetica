"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Phone,
  Mail,
  UserCheck,
} from "lucide-react";
import { useDatabase } from "@/context/DatabaseContext";
import { useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";

function AgendamentoContent() {
  const { procedures, saveAppointment, saveClient, clients, clinicConfig, btnRadius, cardStyleClass } = useDatabase();
  const { success, error } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Wizard Step (1: Service, 2: Date & Time, 3: Client Details)
  const [step, setStep] = useState(1);

  // Selections state
  const [selectedProcId, setSelectedProcId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Customer state
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custNotes, setCustNotes] = useState("");

  // Completed booking detail
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedId, setConfirmedId] = useState("");

  // Pre-select procedure from URL query param if present
  useEffect(() => {
    const procId = searchParams?.get("procedureId");
    if (procId && procedures.some((p) => p.id === procId)) {
      setSelectedProcId(procId);
      setStep(2); // Move directly to step 2
    }
  }, [searchParams, procedures]);

  const selectedProcedure = procedures.find((p) => p.id === selectedProcId);

  const nextStep = () => {
    if (step === 1 && !selectedProcId) {
      error("Seleção incompleta", "Por favor, escolha um procedimento.");
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      error("Seleção incompleta", "Por favor, escolha data e horário.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim() || !custEmail.trim()) {
      error("Dados incompletos", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // 1. Create client if doesn't exist
    let clientId = "";
    const matchedClient = clients.find(
      (c) => c.email.toLowerCase() === custEmail.toLowerCase() || c.phone === custPhone
    );

    if (matchedClient) {
      clientId = matchedClient.id;
    } else {
      clientId = `c-${Math.random().toString(36).substring(2, 9)}`;
      const newClient = {
        id: clientId,
        name: custName,
        phone: custPhone,
        whatsapp: custPhone,
        email: custEmail,
        birthDate: "",
        observations: custNotes,
        createdAt: new Date().toISOString(),
      };
      saveClient(newClient);
    }

    // 2. Register Appointment
    const appointmentId = `a-${Math.random().toString(36).substring(2, 9)}`;
    const newAppointment = {
      id: appointmentId,
      clientId,
      clientName: custName,
      clientPhone: custPhone,
      procedureId: selectedProcId,
      procedureName: selectedProcedure?.name || "",
      date: selectedDate,
      time: selectedTime,
      status: "confirmado" as const, // auto confirmed in demo
      price: selectedProcedure?.price || 0,
      notes: custNotes,
    };

    saveAppointment(newAppointment);
    setConfirmedId(appointmentId);

    // 3. Play luxury celebration confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#C5A880", "#FAF6F0", "#b0926a"],
    });

    success(
      "Agendamento confirmado!",
      "Seu agendamento foi registrado e confirmado com sucesso."
    );
    setBookingConfirmed(true);
  };

  // Generate dynamic date list for the calendar (next 7 business days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    let daysAdded = 0;

    while (daysAdded < 7) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + count);

      const dayOfWeek = nextDate.getDay();
      if (dayOfWeek !== 0) {
        // Exclude Sunday
        dates.push({
          raw: nextDate.toISOString().split("T")[0],
          label: nextDate.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric" }),
          formatted: nextDate.toLocaleDateString("pt-BR", { day: "numeric", month: "short" }),
          dayName: nextDate.toLocaleDateString("pt-BR", { weekday: "long" }),
        });
        daysAdded++;
      }
      count++;
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  // Get available clinic hours depending on Saturday vs Weekdays
  const getAvailableHours = (dateStr: string) => {
    if (!dateStr) return [];
    const dateObj = new Date(dateStr + "T00:00:00");
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 6) {
      // Saturday
      return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
    }
    // Weekdays
    return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
  };

  const timeSlots = getAvailableHours(selectedDate);



  if (bookingConfirmed && selectedProcedure) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center font-sans text-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${cardStyleClass} p-8 rounded-3xl flex flex-col items-center`}
        >
          <div className="w-16 h-16 rounded-full bg-gold-100/50 dark:bg-gold-950/20 border border-gold-300/30 flex items-center justify-center text-gold-550 mb-6">
            <CheckCircle2 size={36} className="text-gold-500 animate-bounce" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 block mb-2">
            Tudo Pronto!
          </span>
          <h2 className="font-serif text-2xl text-stone-950 dark:text-stone-100 mb-6 font-medium">
            Agendamento Confirmado
          </h2>

          <div className="w-full h-[1px] bg-stone-100 dark:bg-stone-800 mb-6" />

          {/* Details summary */}
          <ul className="w-full flex flex-col gap-4 text-left text-xs text-stone-600 dark:text-stone-300 font-light pb-6 border-b border-stone-100 dark:border-stone-800">
            <li className="flex justify-between">
              <span className="font-medium text-stone-400">Procedimento:</span>
              <span className="text-stone-950 dark:text-stone-100 font-semibold">
                {selectedProcedure.name}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-stone-400">Data agendada:</span>
              <span className="text-stone-950 dark:text-stone-100 font-semibold">
                {new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-stone-400">Horário:</span>
              <span className="text-stone-950 dark:text-stone-100 font-semibold">
                {selectedTime}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-stone-400">Paciente:</span>
              <span className="text-stone-950 dark:text-stone-100 font-semibold">{custName}</span>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-100 dark:border-stone-800/50 w-full text-stone-450 leading-relaxed font-light mb-8">
            <p>
              Enviamos os detalhes da confirmação e orientações pré-procedimento para o seu e-mail (
              <strong>{custEmail}</strong>) e entraremos em contato via WhatsApp no número <strong>{custPhone}</strong>.
            </p>
          </div>

          <div className="flex gap-4 w-full">
            <button
              onClick={() => router.push("/")}
              className={`flex-1 py-3 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 ${btnRadius} font-semibold uppercase tracking-widest cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors`}
            >
              Voltar ao Início
            </button>
            <button
              onClick={() => router.push("/procedimentos")}
              className={`flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white ${btnRadius} font-semibold uppercase tracking-widest cursor-pointer transition-all`}
            >
              Ver Outros
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-sans text-xs">
      <div className="text-center mb-10">
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-gold-500">
          Agenda Digital - {clinicConfig.logoText || "Clínica"}
        </span>
        <h1 className="font-serif text-3xl tracking-tight text-stone-950 dark:text-stone-100 mt-2 font-medium">
          Agendamento Online
        </h1>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
      </div>

      {/* Progress Wizard Steps */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-stone-200 dark:bg-stone-800 z-0" />
        {[1, 2, 3].map((stepIdx) => {
          const isCompleted = step > stepIdx;
          const isActive = step === stepIdx;
          return (
            <div key={stepIdx} className="flex flex-col items-center relative z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border font-semibold tracking-wider transition-all duration-300 ${
                  isCompleted
                    ? "bg-gold-500 border-gold-500 text-white shadow-md shadow-gold-500/10"
                    : isActive
                    ? "bg-white dark:bg-stone-900 border-gold-500 text-gold-500 scale-110 shadow-lg"
                    : "bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-400"
                }`}
              >
                {stepIdx}
              </div>
              <span
                className={`text-[8px] uppercase tracking-wider mt-2 font-medium ${
                  isActive ? "text-gold-500 font-semibold" : "text-stone-400"
                }`}
              >
                {stepIdx === 1 ? "Serviço" : stepIdx === 2 ? "Horário" : "Dados"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Steps Content Panel */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: SELECT PROCEDURE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col animate-fade-in"
            >
              <h3 className="font-serif text-lg text-stone-800 dark:text-stone-150 mb-6 font-semibold flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                <Sparkles size={16} className="text-gold-550" /> Selecione o Procedimento
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {procedures.map((proc) => {
                  const isSelected = selectedProcId === proc.id;
                  return (
                    <button
                      key={proc.id}
                      onClick={() => {
                        setSelectedProcId(proc.id);
                        setSelectedDate("");
                        setSelectedTime("");
                      }}
                      className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center gap-4 ${
                        isSelected
                          ? "bg-gold-50/50 dark:bg-gold-950/10 border-gold-450 shadow-md"
                          : "bg-stone-50/50 dark:bg-stone-950/20 border-stone-150 dark:border-stone-800/60 hover:bg-stone-100/50 dark:hover:bg-stone-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={proc.image}
                          alt={proc.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <h4 className="font-semibold text-xs text-stone-950 dark:text-stone-200">
                            {proc.name}
                          </h4>
                          <span className="text-[10px] text-stone-400 block font-light mt-0.5">
                            Duração: {proc.duration} min
                          </span>
                        </div>
                      </div>
                      
                      {proc.price && (
                        <span className="font-serif text-xs font-semibold text-gold-600 dark:text-gold-400">
                          R$ {proc.price.toLocaleString("pt-BR")}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATE AND TIME */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col"
            >
              <h3 className="font-serif text-lg text-stone-800 dark:text-stone-150 mb-6 font-semibold flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                <CalendarIcon size={16} className="text-gold-550" /> Escolha Data & Horário
              </h3>

              {/* Date horizontal scroller */}
              <span className="font-medium text-stone-600 dark:text-stone-300 block mb-3">
                Selecione a Data
              </span>
              <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.raw;
                  return (
                    <button
                      key={d.raw}
                      onClick={() => {
                        setSelectedDate(d.raw);
                        setSelectedTime("");
                      }}
                      className={`p-4 rounded-xl border text-center shrink-0 min-w-[90px] cursor-pointer transition-all ${
                        isSelected
                          ? "bg-gold-500 border-gold-500 text-white shadow-md"
                          : "bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider block font-light opacity-80 mb-1">
                        {d.label.split(".")[0]}
                      </span>
                      <span className="font-serif text-base font-semibold block leading-none">
                        {d.formatted}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Time grid slots */}
              {selectedDate ? (
                <div>
                  <span className="font-medium text-stone-600 dark:text-stone-300 block mb-3">
                    Horários Disponíveis
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {timeSlots.map((hr) => {
                      const isSelected = selectedTime === hr;
                      return (
                        <button
                          key={hr}
                          onClick={() => setSelectedTime(hr)}
                          className={`py-3 rounded-xl border text-center font-medium cursor-pointer transition-all ${
                            isSelected
                              ? "bg-gold-500 border-gold-500 text-white shadow-md"
                              : "bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          {hr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-stone-400 bg-stone-50 dark:bg-stone-950/20 rounded-xl border border-dashed border-stone-200 dark:border-stone-800">
                  Por favor, selecione uma data acima para visualizar os horários.
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: CLIENT DETAILS & CONFIRM */}
          {step === 3 && selectedProcedure && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col"
            >
              <h3 className="font-serif text-lg text-stone-800 dark:text-stone-150 mb-6 font-semibold flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                <UserCheck size={16} className="text-gold-550" /> Confirmar seus Dados
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Form fields */}
                <form
                  onSubmit={handleBookingSubmit}
                  className="md:col-span-7 flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="booking-name" className="font-medium text-stone-650 dark:text-stone-300">
                      Nome Completo *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="Ex: Mariana Albuquerque"
                      className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 transition-colors dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="booking-phone" className="font-medium text-stone-650 dark:text-stone-300">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="Ex: (11) 99999-8888"
                        className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 transition-colors dark:text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="booking-email" className="font-medium text-stone-650 dark:text-stone-300">
                        E-mail *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={custEmail}
                        onChange={(e) => setCustEmail(e.target.value)}
                        placeholder="Ex: mariana@email.com"
                        className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 transition-colors dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="booking-notes" className="font-medium text-stone-650 dark:text-stone-300">
                      Observações / Dúvidas
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      value={custNotes}
                      onChange={(e) => setCustNotes(e.target.value)}
                      placeholder="Diga se possui alguma restrição médica, alergia ou quer complementar os detalhes..."
                      className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 transition-colors resize-none dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`mt-2 w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white ${btnRadius} font-semibold uppercase tracking-widest text-center shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2`}
                  >
                    Confirmar Agendamento
                  </button>
                </form>

                {/* Booking summary sidebar */}
                <div className={`${cardStyleClass} md:col-span-5 p-6 rounded-2xl flex flex-col gap-4 text-xs font-light`}>
                  <h4 className="font-serif text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider pb-2 border-b border-stone-200/50 dark:border-stone-800/40">
                    Resumo do Agendamento
                  </h4>

                  <div className="flex items-center gap-3">
                    <img
                      src={selectedProcedure.image}
                      alt={selectedProcedure.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <span className="font-semibold block text-stone-750 dark:text-stone-200 leading-snug">
                        {selectedProcedure.name}
                      </span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5 block">
                        Duração: {selectedProcedure.duration} min
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-150 dark:border-stone-800/40 flex flex-col gap-2 font-sans text-stone-600 dark:text-stone-400">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><CalendarIcon size={13} className="text-gold-550" /> Data:</span>
                      <span className="font-semibold text-stone-950 dark:text-stone-200">
                        {new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><Clock size={13} className="text-gold-550" /> Horário:</span>
                      <span className="font-semibold text-stone-950 dark:text-stone-200">{selectedTime}</span>
                    </div>
                  </div>

                  {selectedProcedure.price && (
                    <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/40 flex justify-between items-end">
                      <span className="font-medium text-stone-400">Faturamento Previsto</span>
                      <span className="font-serif text-lg font-bold text-gold-600 dark:text-gold-400 leading-none">
                        R$ {selectedProcedure.price.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Controls */}
        {!bookingConfirmed && (
          <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft size={16} /> Voltar
            </button>

            {step < 3 && (
              <button
                onClick={nextStep}
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-500 hover:text-gold-600 transition-colors cursor-pointer"
              >
                Avançar <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Agendamento() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center font-sans text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-500 font-light">Carregando formulário de agendamento...</p>
        </div>
      </div>
    }>
      <AgendamentoContent />
    </Suspense>
  );
}
