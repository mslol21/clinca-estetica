"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  Sparkles,
  Image as ImageIcon,
  Columns,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  XCircle,
  Menu,
  Star,
  Clock,
  Save,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDatabase } from "@/context/DatabaseContext";
import { useToast } from "@/components/ui/Toast";
import { themeConfig } from "@/config/theme-config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AdminTab =
  | "dashboard"
  | "agenda"
  | "clientes"
  | "galeria"
  | "procedimentos"
  | "depoimentos"
  | "configuracoes";

export default function AdminPanel() {
  const { user, loading: authLoading, logout } = useAuth();
  const {
    procedures,
    clients,
    appointments,
    gallery,
    beforeAfter,
    testimonials,
    clinicConfig,
    saveProcedure,
    deleteProcedure,
    saveClient,
    deleteClient,
    saveAppointment,
    deleteAppointment,
    saveGalleryItem,
    deleteGalleryItem,
    saveBeforeAfterItem,
    deleteBeforeAfterItem,
    saveTestimonial,
    deleteTestimonial,
    saveClinicConfig,
  } = useDatabase();
  
  const { success, error } = useToast();
  const router = useRouter();

  // Tab State
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");

  // Sub-tab inside Galeria ("photos" or "before-after")
  const [gallerySubTab, setGallerySubTab] = useState<"photos" | "before-after">("photos");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"client" | "procedure" | "appointment" | "gallery" | "beforeAfter" | "testimonial" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Form Fields States
  const [clientForm, setClientForm] = useState({ name: "", phone: "", whatsapp: "", email: "", birthDate: "", observations: "" });
  const [procForm, setProcForm] = useState({ name: "", category: "facial", description: "", duration: 45, price: 0, benefits: "", contraindications: "" });
  const [apptForm, setApptForm] = useState({ clientId: "", clientName: "", clientPhone: "", procedureId: "", date: "", time: "", notes: "", price: 0, status: "confirmado" as "confirmado" | "cancelado" | "pendente" });
  const [galForm, setGalForm] = useState({ title: "", category: "facial", image: "" });
  const [baForm, setBaForm] = useState({ title: "", category: "facial", description: "", beforeImage: "", afterImage: "" });
  const [testForm, setTestForm] = useState({ name: "", role: "", comment: "", rating: 5, photo: "" });

  // Clinic config form state
  const [configForm, setConfigForm] = useState({
    name: "",
    slogan: "",
    logoText: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    workingHours: { weekdays: "", saturday: "", sunday: "" },
    googleMapsUrl: "",
    social: { instagram: "", facebook: "", youtube: "" },
    seo: { title: "", description: "", keywords: [] as string[], ogImage: "" },
  });

  // Protect Admin route
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  // Sync config form
  useEffect(() => {
    if (clinicConfig) {
      setConfigForm({
        name: clinicConfig.name || "",
        slogan: clinicConfig.slogan || "",
        logoText: clinicConfig.logoText || "",
        phone: clinicConfig.phone || "",
        whatsapp: clinicConfig.whatsapp || "",
        email: clinicConfig.email || "",
        address: clinicConfig.address || "",
        workingHours: {
          weekdays: clinicConfig.workingHours?.weekdays || "",
          saturday: clinicConfig.workingHours?.saturday || "",
          sunday: clinicConfig.workingHours?.sunday || "",
        },
        googleMapsUrl: clinicConfig.googleMapsUrl || "",
        social: {
          instagram: clinicConfig.social?.instagram || "",
          facebook: clinicConfig.social?.facebook || "",
          youtube: clinicConfig.social?.youtube || "",
        },
        seo: {
          title: clinicConfig.seo?.title || "",
          description: clinicConfig.seo?.description || "",
          keywords: clinicConfig.seo?.keywords || [],
          ogImage: clinicConfig.seo?.ogImage || "",
        },
      });
    }
  }, [clinicConfig]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center font-sans text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-500 font-light">Carregando painel de controle...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    success("Sessão encerrada", "Você saiu do painel de administração.");
    router.push("/admin/login");
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveClinicConfig({
      ...clinicConfig,
      ...configForm,
    });
    success("Configurações salvas!", "Os dados da clínica foram atualizados globalmente.");
  };

  // Modal Open Actions
  const handleOpenAddModal = (type: typeof modalType) => {
    setEditId(null);
    setModalType(type);
    
    if (type === "client") setClientForm({ name: "", phone: "", whatsapp: "", email: "", birthDate: "", observations: "" });
    if (type === "procedure") setProcForm({ name: "", category: "facial", description: "", duration: 45, price: 0, benefits: "", contraindications: "" });
    if (type === "appointment") setApptForm({ clientId: "", clientName: "", clientPhone: "", procedureId: "", date: "", time: "", notes: "", price: 0, status: "confirmado" });
    if (type === "gallery") setGalForm({ title: "", category: "facial", image: "" });
    if (type === "beforeAfter") setBaForm({ title: "", category: "facial", description: "", beforeImage: "", afterImage: "" });
    if (type === "testimonial") setTestForm({ name: "", role: "", comment: "", rating: 5, photo: "" });

    setIsModalOpen(true);
  };

  const handleOpenEditModal = (type: typeof modalType, id: string) => {
    setEditId(id);
    setModalType(type);

    if (type === "client") {
      const match = clients.find((c) => c.id === id);
      if (match) setClientForm({ name: match.name, phone: match.phone, whatsapp: match.whatsapp, email: match.email, birthDate: match.birthDate, observations: match.observations });
    }
    if (type === "procedure") {
      const match = procedures.find((p) => p.id === id);
      if (match) setProcForm({ name: match.name, category: match.category, description: match.description, duration: match.duration, price: match.price || 0, benefits: match.benefits.join(", "), contraindications: match.contraindications.join(", ") });
    }
    if (type === "appointment") {
      const match = appointments.find((a) => a.id === id);
      if (match) setApptForm({ clientId: match.clientId, clientName: match.clientName, clientPhone: match.clientPhone, procedureId: match.procedureId, date: match.date, time: match.time, notes: match.notes || "", price: match.price, status: match.status });
    }
    if (type === "gallery") {
      const match = gallery.find((g) => g.id === id);
      if (match) setGalForm({ title: match.title, category: match.category, image: match.image });
    }
    if (type === "beforeAfter") {
      const match = beforeAfter.find((b) => b.id === id);
      if (match) setBaForm({ title: match.title, category: match.category, description: match.description, beforeImage: match.beforeImage, afterImage: match.afterImage });
    }
    if (type === "testimonial") {
      const match = testimonials.find((t) => t.id === id);
      if (match) setTestForm({ name: match.name, role: match.role, comment: match.comment, rating: match.rating, photo: match.photo });
    }

    setIsModalOpen(true);
  };

  // Submit Modal Actions
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalType === "client") {
      const id = editId || `c-${Math.random().toString(36).substring(2, 9)}`;
      saveClient({ id, ...clientForm, createdAt: new Date().toISOString() });
      success("Cliente salvo", "O cadastro do cliente foi atualizado.");
    }
    if (modalType === "procedure") {
      const id = editId || `p-${Math.random().toString(36).substring(2, 9)}`;
      saveProcedure({
        id,
        name: procForm.name,
        category: procForm.category as any,
        description: procForm.description,
        duration: Number(procForm.duration),
        price: Number(procForm.price),
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600",
        benefits: procForm.benefits.split(",").map((b) => b.trim()).filter(Boolean),
        contraindications: procForm.contraindications.split(",").map((c) => c.trim()).filter(Boolean),
        faq: []
      });
      success("Procedimento salvo", "O procedimento foi atualizado.");
    }
    if (modalType === "appointment") {
      const id = editId || `a-${Math.random().toString(36).substring(2, 9)}`;
      const proc = procedures.find((p) => p.id === apptForm.procedureId);
      saveAppointment({
        id,
        clientId: apptForm.clientId || "c1",
        clientName: apptForm.clientName || "Cliente Demo",
        clientPhone: apptForm.clientPhone || "(11) 99999-9999",
        procedureId: apptForm.procedureId,
        procedureName: proc?.name || "Procedimento",
        date: apptForm.date,
        time: apptForm.time,
        notes: apptForm.notes,
        price: Number(apptForm.price || proc?.price || 0),
        status: apptForm.status,
      });
      success("Agendamento salvo", "O agendamento foi atualizado.");
    }
    if (modalType === "gallery") {
      const id = editId || `g-${Math.random().toString(36).substring(2, 9)}`;
      saveGalleryItem({
        id,
        title: galForm.title,
        category: galForm.category as any,
        image: galForm.image,
        createdAt: new Date().toISOString().split("T")[0],
      });
      success("Foto salva", "A foto foi adicionada à galeria.");
    }
    if (modalType === "beforeAfter") {
      const id = editId || `ba-${Math.random().toString(36).substring(2, 9)}`;
      saveBeforeAfterItem({
        id,
        title: baForm.title,
        category: baForm.category as any,
        description: baForm.description,
        beforeImage: baForm.beforeImage,
        afterImage: baForm.afterImage,
        createdAt: new Date().toISOString().split("T")[0],
      });
      success("Caso salvo", "O caso antes e depois foi registrado.");
    }
    if (modalType === "testimonial") {
      const id = editId || `t-${Math.random().toString(36).substring(2, 9)}`;
      saveTestimonial({
        id,
        ...testForm,
        photo: testForm.photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150",
        date: new Date().toISOString().split("T")[0]
      });
      success("Depoimento salvo", "O depoimento foi atualizado.");
    }

    setIsModalOpen(false);
  };

  // Delete Actions
  const handleDeleteItem = (type: "client" | "procedure" | "appointment" | "gallery" | "beforeAfter" | "testimonial", id: string) => {
    if (window.confirm("Deseja realmente excluir este item?")) {
      if (type === "client") deleteClient(id);
      if (type === "procedure") deleteProcedure(id);
      if (type === "appointment") deleteAppointment(id);
      if (type === "gallery") deleteGalleryItem(id);
      if (type === "beforeAfter") deleteBeforeAfterItem(id);
      if (type === "testimonial") deleteTestimonial(id);
      success("Excluído com sucesso", "O item foi removido do sistema.");
    }
  };

  // Group appointments by date for the dashboard chart
  const getChartData = () => {
    const counts: { [key: string]: number } = {};
    appointments.forEach((a) => {
      counts[a.date] = (counts[a.date] || 0) + 1;
    });
    return Object.keys(counts)
      .sort()
      .slice(-7)
      .map((date) => ({
        date: new Date(date + "T00:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "short" }),
        Agendamentos: counts[date],
      }));
  };

  const chartData = getChartData();
  const todayStr = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "agenda", name: "Agenda", icon: CalendarIcon },
    { id: "clientes", name: "Clientes", icon: Users },
    { id: "galeria", name: "Galeria & Casos", icon: ImageIcon },
    { id: "procedimentos", name: "Procedimentos", icon: Sparkles },
    { id: "depoimentos", name: "Depoimentos", icon: MessageSquare },
    { id: "configuracoes", name: "Configurações", icon: Settings },
  ];

  // Dynamic button style from themeConfig
  const btnRadius =
    themeConfig.styles.button === "pill"
      ? "rounded-full"
      : themeConfig.styles.button === "rounded"
      ? "rounded-xl"
      : "rounded-none";

  // Dynamic card style from themeConfig
  const cardStyleClass =
    themeConfig.styles.card === "glass"
      ? "glass-card"
      : themeConfig.styles.card === "bordered"
      ? "bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/40"
      : "bg-white dark:bg-stone-900 shadow-xl shadow-stone-500/5 dark:shadow-none border border-transparent";

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col lg:flex-row font-sans text-xs transition-colors">
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850 px-4 py-3 flex items-center justify-between z-40 shrink-0">
        <span className="font-serif font-bold text-stone-800 dark:text-stone-100 text-sm tracking-wide">
          {clinicConfig.logoText || "LUXE"} ADMIN
        </span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300">
          <Menu size={16} />
        </button>
      </div>

      {/* Sidebar navigation */}
      <aside className={`w-full lg:w-64 bg-stone-50 dark:bg-stone-900 border-r border-stone-200 dark:border-stone-850 flex flex-col justify-between p-6 shrink-0 lg:block ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col gap-8">
          <div className="hidden lg:flex flex-col">
            <span className="font-serif font-bold text-base tracking-widest text-stone-850 dark:text-stone-100">
              {clinicConfig.logoText || "LUXE"}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-550 mt-1 font-semibold">Painel Administrativo</span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-gold-500 text-white shadow-md shadow-gold-500/10"
                      : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-850"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-850 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-950/20 text-gold-600 flex items-center justify-center font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold block text-stone-800 dark:text-stone-200 truncate">{user.email}</span>
              <span className="text-[9px] text-stone-400 block font-light">Administrador</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/15 rounded-xl flex items-center gap-3 font-semibold transition-colors cursor-pointer text-left"
          >
            <LogOut size={16} />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main content body */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {/* Global Search & Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl text-stone-850 dark:text-stone-100 font-medium capitalize">
              {activeTab === "galeria" ? "Galeria & Casos" : activeTab === "configuracoes" ? "Configurações" : activeTab}
            </h2>
            <p className="text-[10px] text-stone-400 font-light mt-1">
              Controle comercial e de catálogo da {clinicConfig.name}.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Admin View Tabs */}
        <AnimatePresence mode="wait">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-8"
            >
              {/* Statistic cards row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`${cardStyleClass} p-5 rounded-2xl`}>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light">Agendados Hoje</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-2xl font-semibold text-stone-850 dark:text-stone-100">{todayAppointments.length}</span>
                    <span className="text-[10px] text-stone-450">atendimentos</span>
                  </div>
                </div>

                <div className={`${cardStyleClass} p-5 rounded-2xl`}>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light">Clientes Ativos</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-2xl font-semibold text-stone-850 dark:text-stone-100">{clients.length}</span>
                    <span className="text-[10px] text-stone-450">fichas</span>
                  </div>
                </div>

                <div className={`${cardStyleClass} p-5 rounded-2xl`}>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light">Fotos na Galeria</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-2xl font-semibold text-stone-850 dark:text-stone-100">{gallery.length + beforeAfter.length}</span>
                    <span className="text-[10px] text-stone-450">imagens</span>
                  </div>
                </div>

                <div className={`${cardStyleClass} p-5 rounded-2xl`}>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light">Avaliações</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-2xl font-semibold text-stone-850 dark:text-stone-100">{testimonials.length}</span>
                    <span className="text-[10px] text-stone-450">comentários</span>
                  </div>
                </div>
              </div>

              {/* Chart and daily preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Bookings Chart */}
                <div className={`${cardStyleClass} lg:col-span-8 p-6 rounded-2xl flex flex-col gap-6`}>
                  <span className="font-serif text-sm font-semibold text-stone-800 dark:text-stone-200">Volumetria de Agendamentos (Últimos Dias)</span>
                  <div className="h-64 w-full">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <XAxis dataKey="date" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                          <Tooltip contentStyle={{ background: "#1c1917", border: "none", borderRadius: "8px", fontSize: "10px", color: "#fff" }} />
                          <Bar dataKey="Agendamentos" fill="#c5a880" radius={[4, 4, 0, 0]} barSize={25} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-stone-400">Nenhum agendamento registrado.</div>
                    )}
                  </div>
                </div>

                {/* Today's schedule list */}
                <div className={`${cardStyleClass} lg:col-span-4 p-6 rounded-2xl flex flex-col gap-4`}>
                  <span className="font-serif text-sm font-semibold text-stone-800 dark:text-stone-200">Agenda de Hoje</span>
                  <div className="flex flex-col gap-3 overflow-y-auto max-h-[260px] pr-1">
                    {todayAppointments.length > 0 ? (
                      todayAppointments.map((appt) => (
                        <div key={appt.id} className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-150 dark:border-stone-850 flex items-center justify-between gap-3">
                          <div>
                            <span className="font-semibold block text-stone-750 dark:text-stone-200 leading-snug">{appt.clientName}</span>
                            <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-0.5 block">{appt.procedureName}</span>
                          </div>
                          <span className="px-2 py-1 bg-gold-100/50 dark:bg-gold-950/20 text-gold-600 rounded text-[9px] font-semibold flex items-center gap-1">
                            <Clock size={10} /> {appt.time}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-stone-400 bg-stone-50/50 dark:bg-stone-950/10 rounded-xl border border-dashed border-stone-200 dark:border-stone-800">
                        Nenhum atendimento agendado para hoje.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: AGENDA */}
          {activeTab === "agenda" && (
            <motion.div
              key="agenda"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`${cardStyleClass} p-6 rounded-2xl flex flex-col`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-200">Lista de Agendamentos</span>
                <button
                  onClick={() => handleOpenAddModal("appointment")}
                  className={`px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center gap-1.5 ${btnRadius} shadow-sm cursor-pointer`}
                >
                  <Plus size={14} /> Novo Agendamento
                </button>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-850 text-stone-400">
                      <th className="pb-3 font-medium">Paciente</th>
                      <th className="pb-3 font-medium">Contato</th>
                      <th className="pb-3 font-medium">Procedimento</th>
                      <th className="pb-3 font-medium">Data/Hora</th>
                      <th className="pb-3 font-medium text-right">Valor</th>
                      <th className="pb-3 font-medium text-center">Status</th>
                      <th className="pb-3 font-medium text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-900">
                    {appointments
                      .filter((a) =>
                        a.clientName.toLowerCase().includes(globalSearch.toLowerCase()) ||
                        a.procedureName.toLowerCase().includes(globalSearch.toLowerCase())
                      )
                      .map((appt) => (
                        <tr key={appt.id} className="text-stone-600 dark:text-stone-300">
                          <td className="py-4 font-semibold text-stone-850 dark:text-stone-255">{appt.clientName}</td>
                          <td className="py-4">{appt.clientPhone}</td>
                          <td className="py-4">{appt.procedureName}</td>
                          <td className="py-4">
                            <strong>{new Date(appt.date + "T00:00:00").toLocaleDateString("pt-BR")}</strong> às {appt.time}
                          </td>
                          <td className="py-4 text-right font-serif font-medium">
                            R$ {appt.price?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-4 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-semibold ${
                                appt.status === "confirmado"
                                  ? "bg-green-100/60 dark:bg-green-950/20 text-green-600 border border-green-200/30"
                                  : appt.status === "cancelado"
                                  ? "bg-red-100/60 dark:bg-red-950/20 text-red-600 border border-red-200/30"
                                  : "bg-amber-100/60 dark:bg-amber-950/20 text-amber-600 border border-amber-200/30"
                              }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal("appointment", appt.id)}
                                className="p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                                title="Editar"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem("appointment", appt.id)}
                                className="p-1 text-stone-400 hover:text-red-500"
                                title="Excluir"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CLIENTES */}
          {activeTab === "clientes" && (
            <motion.div
              key="clientes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`${cardStyleClass} p-6 rounded-2xl flex flex-col`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-200">Fichas Cadastrais</span>
                <button
                  onClick={() => handleOpenAddModal("client")}
                  className={`px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center gap-1.5 ${btnRadius} shadow-sm cursor-pointer`}
                >
                  <Plus size={14} /> Novo Cliente
                </button>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-850 text-stone-400">
                      <th className="pb-3 font-medium">Nome do Paciente</th>
                      <th className="pb-3 font-medium">Telefone</th>
                      <th className="pb-3 font-medium">WhatsApp</th>
                      <th className="pb-3 font-medium">E-mail</th>
                      <th className="pb-3 font-medium">Observações Clínicas / Alergias</th>
                      <th className="pb-3 font-medium text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-900">
                    {clients
                      .filter((c) =>
                        c.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
                        c.email.toLowerCase().includes(globalSearch.toLowerCase())
                      )
                      .map((client) => (
                        <tr key={client.id} className="text-stone-600 dark:text-stone-300">
                          <td className="py-4 font-semibold text-stone-850 dark:text-stone-255">{client.name}</td>
                          <td className="py-4">{client.phone}</td>
                          <td className="py-4">{client.whatsapp}</td>
                          <td className="py-4">{client.email}</td>
                          <td className="py-4 font-light text-[11px] max-w-xs truncate" title={client.observations}>
                            {client.observations || "Nenhuma observação clínica registrada."}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal("client", client.id)}
                                className="p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem("client", client.id)}
                                className="p-1 text-stone-400 hover:text-red-500"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 4: GALERIA & CASOS */}
          {activeTab === "galeria" && (
            <motion.div
              key="galeria"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              {/* Gallery Toggle Bar */}
              <div className="flex gap-2">
                <button
                  onClick={() => setGallerySubTab("photos")}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold ${btnRadius} transition-all cursor-pointer ${
                    gallerySubTab === "photos"
                      ? "bg-gold-500 text-white shadow-md"
                      : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                  }`}
                >
                  Fotos da Recepção & Salas
                </button>
                <button
                  onClick={() => setGallerySubTab("before-after")}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold ${btnRadius} transition-all cursor-pointer ${
                    gallerySubTab === "before-after"
                      ? "bg-gold-500 text-white shadow-md"
                      : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                  }`}
                >
                  Casos Antes e Depois
                </button>
              </div>

              {gallerySubTab === "photos" ? (
                <div className={`${cardStyleClass} p-6 rounded-2xl flex flex-col`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-200">Portfólio de Fotos</span>
                    <button
                      onClick={() => handleOpenAddModal("gallery")}
                      className={`px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center gap-1.5 ${btnRadius} shadow-sm cursor-pointer`}
                    >
                      <Plus size={14} /> Adicionar Foto
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {gallery
                      .filter((g) => g.title.toLowerCase().includes(globalSearch.toLowerCase()))
                      .map((photo) => (
                        <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-stone-200 dark:border-stone-850 bg-stone-50 dark:bg-stone-950 aspect-video flex flex-col">
                          <img src={photo.image} alt={photo.title} className="w-full h-28 object-cover" />
                          <div className="p-3 flex justify-between items-center">
                            <div className="overflow-hidden mr-2">
                              <span className="font-semibold block truncate">{photo.title}</span>
                              <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-0.5 block">{photo.category}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteItem("gallery", photo.id)}
                              className="p-1 text-stone-400 hover:text-red-500 cursor-pointer shrink-0"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className={`${cardStyleClass} p-6 rounded-2xl flex flex-col`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-200">Comparativo Antes e Depois</span>
                    <button
                      onClick={() => handleOpenAddModal("beforeAfter")}
                      className={`px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center gap-1.5 ${btnRadius} shadow-sm cursor-pointer`}
                    >
                      <Plus size={14} /> Novo Caso
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {beforeAfter
                      .filter((b) => b.title.toLowerCase().includes(globalSearch.toLowerCase()))
                      .map((caseItem) => (
                        <div key={caseItem.id} className="relative group rounded-xl overflow-hidden border border-stone-200 dark:border-stone-850 bg-stone-50 dark:bg-stone-950 flex flex-col">
                          <div className="grid grid-cols-2 gap-0.5 bg-stone-200 dark:bg-stone-800">
                            <img src={caseItem.beforeImage} alt="Antes" className="w-full h-24 object-cover" />
                            <img src={caseItem.afterImage} alt="Depois" className="w-full h-24 object-cover" />
                          </div>
                          <div className="p-4 flex justify-between items-center">
                            <div>
                              <span className="font-semibold block">{caseItem.title}</span>
                              <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-0.5 block">{caseItem.category}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteItem("beforeAfter", caseItem.id)}
                              className="p-1 text-stone-400 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: PROCEDIMENTOS */}
          {activeTab === "procedimentos" && (
            <motion.div
              key="procedimentos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`${cardStyleClass} p-6 rounded-2xl flex flex-col`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-200">Catálogo de Procedimentos</span>
                <button
                  onClick={() => handleOpenAddModal("procedure")}
                  className={`px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center gap-1.5 ${btnRadius} shadow-sm cursor-pointer`}
                >
                  <Plus size={14} /> Novo Procedimento
                </button>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-850 text-stone-400">
                      <th className="pb-3 font-medium">Nome do Tratamento</th>
                      <th className="pb-3 font-medium">Categoria</th>
                      <th className="pb-3 font-medium">Duração</th>
                      <th className="pb-3 font-medium text-right">Valor Inicial</th>
                      <th className="pb-3 font-medium">Descrição Resumida</th>
                      <th className="pb-3 font-medium text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-900">
                    {procedures
                      .filter((p) => p.name.toLowerCase().includes(globalSearch.toLowerCase()))
                      .map((proc) => (
                        <tr key={proc.id} className="text-stone-600 dark:text-stone-300">
                          <td className="py-4 font-semibold text-stone-850 dark:text-stone-255">{proc.name}</td>
                          <td className="py-4 capitalize">{proc.category}</td>
                          <td className="py-4">{proc.duration} min</td>
                          <td className="py-4 text-right font-serif font-medium">
                            R$ {proc.price?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-4 font-light text-[11px] max-w-xs truncate" title={proc.description}>
                            {proc.description}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal("procedure", proc.id)}
                                className="p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem("procedure", proc.id)}
                                className="p-1 text-stone-400 hover:text-red-500"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 6: DEPOIMENTOS */}
          {activeTab === "depoimentos" && (
            <motion.div
              key="depoimentos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`${cardStyleClass} p-6 rounded-2xl flex flex-col`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-200">Depoimentos Moderação</span>
                <button
                  onClick={() => handleOpenAddModal("testimonial")}
                  className={`px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center gap-1.5 ${btnRadius} shadow-sm cursor-pointer`}
                >
                  <Plus size={14} /> Adicionar Depoimento
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials
                  .filter((t) => t.name.toLowerCase().includes(globalSearch.toLowerCase()))
                  .map((test) => (
                    <div key={test.id} className="p-5 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-150 dark:border-stone-850/60 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-0.5 text-gold-450">
                            {Array.from({ length: test.rating }).map((_, i) => (
                              <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
                            ))}
                          </div>
                          <span className="text-[9px] text-stone-400 font-light">{test.date}</span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 italic font-light leading-relaxed">&ldquo;{test.comment}&rdquo;</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-200/50 dark:border-stone-800/40">
                        <div className="flex items-center gap-3">
                          <img src={test.photo} alt={test.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-semibold block leading-tight text-stone-800 dark:text-stone-200">{test.name}</span>
                            <span className="text-[9px] text-stone-400 uppercase tracking-widest font-light block">{test.role}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteItem("testimonial", test.id)}
                          className="p-1.5 text-stone-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* TAB 7: CONFIGURAÇÕES (WHITE-LABEL CONTROL) */}
          {activeTab === "configuracoes" && (
            <motion.div
              key="configuracoes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`${cardStyleClass} p-6 rounded-2xl flex flex-col`}
            >
              <span className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-200 mb-6 pb-2 border-b border-stone-200/50 dark:border-stone-800/40">
                Dados Comerciais & Identidade
              </span>

              <form onSubmit={handleSaveConfig} className="flex flex-col gap-6 max-w-3xl">
                {/* Basic info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Nome da Clínica</label>
                    <input
                      type="text"
                      value={configForm.name}
                      onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Slogan Tagline</label>
                    <input
                      type="text"
                      value={configForm.slogan}
                      onChange={(e) => setConfigForm({ ...configForm, slogan: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Logo Text</label>
                    <input
                      type="text"
                      value={configForm.logoText}
                      onChange={(e) => setConfigForm({ ...configForm, logoText: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>
                </div>

                {/* Contact data */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Telefone Fixo</label>
                    <input
                      type="text"
                      value={configForm.phone}
                      onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">WhatsApp</label>
                    <input
                      type="text"
                      value={configForm.whatsapp}
                      onChange={(e) => setConfigForm({ ...configForm, whatsapp: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">E-mail Comercial</label>
                    <input
                      type="email"
                      value={configForm.email}
                      onChange={(e) => setConfigForm({ ...configForm, email: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>
                </div>

                {/* Address & Google Maps */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-stone-650 dark:text-stone-300">Endereço Comercial Completo</label>
                  <input
                    type="text"
                    value={configForm.address}
                    onChange={(e) => setConfigForm({ ...configForm, address: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-stone-650 dark:text-stone-300">Google Maps Iframe URL</label>
                  <input
                    type="text"
                    value={configForm.googleMapsUrl}
                    onChange={(e) => setConfigForm({ ...configForm, googleMapsUrl: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                  />
                </div>

                {/* Working hours */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Horários (Segunda a Sexta)</label>
                    <input
                      type="text"
                      value={configForm.workingHours.weekdays}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          workingHours: { ...configForm.workingHours, weekdays: e.target.value },
                        })
                      }
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Horários (Sábado)</label>
                    <input
                      type="text"
                      value={configForm.workingHours.saturday}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          workingHours: { ...configForm.workingHours, saturday: e.target.value },
                        })
                      }
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Horários (Domingo)</label>
                    <input
                      type="text"
                      value={configForm.workingHours.sunday}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          workingHours: { ...configForm.workingHours, sunday: e.target.value },
                        })
                      }
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>
                </div>

                {/* SEO Configurations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Título SEO Principal</label>
                    <input
                      type="text"
                      value={configForm.seo.title}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          seo: { ...configForm.seo, title: e.target.value },
                        })
                      }
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-stone-650 dark:text-stone-300">Meta Descrição SEO</label>
                    <input
                      type="text"
                      value={configForm.seo.description}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          seo: { ...configForm.seo, description: e.target.value },
                        })
                      }
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl outline-none focus:border-gold-450 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`mt-4 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center justify-center gap-2 ${btnRadius} shadow-md cursor-pointer`}
                >
                  <Save size={14} /> Salvar Configurações
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CRUD Overlay Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl p-6 w-full max-w-lg text-stone-800 dark:text-stone-100 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800/40 mb-6">
                <h3 className="font-serif text-lg font-semibold capitalize">
                  {editId ? "Editar" : "Adicionar"} {modalType === "beforeAfter" ? "Antes e Depois" : modalType}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-850 text-stone-400"
                >
                  <XCircle size={18} />
                </button>
              </div>

              <form onSubmit={handleModalSubmit} className="flex flex-col gap-4 font-sans text-xs">
                
                {/* Client fields */}
                {modalType === "client" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Nome Completo</label>
                      <input
                        type="text"
                        required
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Telefone</label>
                        <input
                          type="text"
                          required
                          value={clientForm.phone}
                          onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">WhatsApp</label>
                        <input
                          type="text"
                          required
                          value={clientForm.whatsapp}
                          onChange={(e) => setClientForm({ ...clientForm, whatsapp: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">E-mail</label>
                      <input
                        type="email"
                        required
                        value={clientForm.email}
                        onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Data de Nascimento</label>
                      <input
                        type="date"
                        value={clientForm.birthDate}
                        onChange={(e) => setClientForm({ ...clientForm, birthDate: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Observações Clínicas / Prontuário</label>
                      <textarea
                        rows={3}
                        value={clientForm.observations}
                        onChange={(e) => setClientForm({ ...clientForm, observations: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Procedure fields */}
                {modalType === "procedure" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Nome do Procedimento</label>
                      <input
                        type="text"
                        required
                        value={procForm.name}
                        onChange={(e) => setProcForm({ ...procForm, name: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Categoria</label>
                        <select
                          value={procForm.category}
                          onChange={(e) => setProcForm({ ...procForm, category: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 text-stone-800 dark:text-stone-300"
                        >
                          <option value="facial">Facial</option>
                          <option value="corporal">Corporal</option>
                          <option value="laser">Laser</option>
                          <option value="avancada">Avançada</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Duração (minutos)</label>
                        <input
                          type="number"
                          required
                          value={procForm.duration}
                          onChange={(e) => setProcForm({ ...procForm, duration: Number(e.target.value) })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Preço Inicial (R$)</label>
                      <input
                        type="number"
                        required
                        value={procForm.price}
                        onChange={(e) => setProcForm({ ...procForm, price: Number(e.target.value) })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Descrição</label>
                      <textarea
                        rows={3}
                        required
                        value={procForm.description}
                        onChange={(e) => setProcForm({ ...procForm, description: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Benefícios (Separados por vírgula)</label>
                      <input
                        type="text"
                        value={procForm.benefits}
                        onChange={(e) => setProcForm({ ...procForm, benefits: e.target.value })}
                        placeholder="Ex: Estimula colágeno, Clareia manchas"
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Contraindicações (Separadas por vírgula)</label>
                      <input
                        type="text"
                        value={procForm.contraindications}
                        onChange={(e) => setProcForm({ ...procForm, contraindications: e.target.value })}
                        placeholder="Ex: Gestantes, Infecções ativas"
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                  </div>
                )}

                {/* Appointment fields */}
                {modalType === "appointment" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Paciente (Selecione)</label>
                      <select
                        value={apptForm.clientId}
                        onChange={(e) => {
                          const client = clients.find(c => c.id === e.target.value);
                          setApptForm({
                            ...apptForm,
                            clientId: e.target.value,
                            clientName: client?.name || "",
                            clientPhone: client?.phone || "",
                          });
                        }}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 text-stone-805 dark:text-stone-300"
                      >
                        <option value="">Selecione um paciente...</option>
                        {clients.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {!apptForm.clientId && (
                      <div className="grid grid-cols-2 gap-3 border p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-semibold">Nome Manual</label>
                          <input
                            type="text"
                            value={apptForm.clientName}
                            onChange={(e) => setApptForm({ ...apptForm, clientName: e.target.value })}
                            className="p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-semibold">Telefone Manual</label>
                          <input
                            type="text"
                            value={apptForm.clientPhone}
                            onChange={(e) => setApptForm({ ...apptForm, clientPhone: e.target.value })}
                            className="p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Procedimento</label>
                      <select
                        value={apptForm.procedureId}
                        onChange={(e) => {
                          const proc = procedures.find(p => p.id === e.target.value);
                          setApptForm({
                            ...apptForm,
                            procedureId: e.target.value,
                            price: proc?.price || 0,
                          });
                        }}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 text-stone-805 dark:text-stone-300"
                      >
                        <option value="">Selecione um procedimento...</option>
                        {procedures.map((p) => (
                          <option key={p.id} value={p.id}>{p.name} (R$ {p.price})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Data</label>
                        <input
                          type="date"
                          required
                          value={apptForm.date}
                          onChange={(e) => setApptForm({ ...apptForm, date: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Horário</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: 14:00"
                          value={apptForm.time}
                          onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Preço Cobrado (R$)</label>
                        <input
                          type="number"
                          value={apptForm.price}
                          onChange={(e) => setApptForm({ ...apptForm, price: Number(e.target.value) })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Status</label>
                        <select
                          value={apptForm.status}
                          onChange={(e) => setApptForm({ ...apptForm, status: e.target.value as any })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 text-stone-805 dark:text-stone-300"
                        >
                          <option value="confirmado">Confirmado</option>
                          <option value="pendente">Pendente</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Observações do Agendamento</label>
                      <textarea
                        rows={2}
                        value={apptForm.notes}
                        onChange={(e) => setApptForm({ ...apptForm, notes: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Gallery photo fields */}
                {modalType === "gallery" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Título da Foto</label>
                      <input
                        type="text"
                        required
                        value={galForm.title}
                        onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Categoria</label>
                      <select
                        value={galForm.category}
                        onChange={(e) => setGalForm({ ...galForm, category: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 text-stone-800 dark:text-stone-350"
                      >
                        <option value="facial">Facial</option>
                        <option value="corporal">Corporal</option>
                        <option value="laser">Laser</option>
                        <option value="clinica">A Clínica</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Image URL (Unsplash ou Firebase)</label>
                      <input
                        type="text"
                        required
                        placeholder="https://..."
                        value={galForm.image}
                        onChange={(e) => setGalForm({ ...galForm, image: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                  </div>
                )}

                {/* Before After fields */}
                {modalType === "beforeAfter" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Título do Caso</label>
                      <input
                        type="text"
                        required
                        value={baForm.title}
                        onChange={(e) => setBaForm({ ...baForm, title: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Categoria</label>
                      <select
                        value={baForm.category}
                        onChange={(e) => setBaForm({ ...baForm, category: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 text-stone-800 dark:text-stone-350"
                      >
                        <option value="facial">Facial</option>
                        <option value="corporal">Corporal</option>
                        <option value="laser">Laser</option>
                        <option value="avancada">Avançada</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Descrição do Caso</label>
                      <textarea
                        rows={2}
                        value={baForm.description}
                        onChange={(e) => setBaForm({ ...baForm, description: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none focus:border-gold-450 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Antes (Image URL)</label>
                        <input
                          type="text"
                          required
                          value={baForm.beforeImage}
                          onChange={(e) => setBaForm({ ...baForm, beforeImage: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Depois (Image URL)</label>
                        <input
                          type="text"
                          required
                          value={baForm.afterImage}
                          onChange={(e) => setBaForm({ ...baForm, afterImage: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonial fields */}
                {modalType === "testimonial" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Nome da Paciente</label>
                      <input
                        type="text"
                        required
                        value={testForm.name}
                        onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Ocupação / Cargo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Advogada"
                        value={testForm.role}
                        onChange={(e) => setTestForm({ ...testForm, role: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Nota (1 a 5)</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          required
                          value={testForm.rating}
                          onChange={(e) => setTestForm({ ...testForm, rating: Number(e.target.value) })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold">Foto URL (Opcional)</label>
                        <input
                          type="text"
                          value={testForm.photo}
                          onChange={(e) => setTestForm({ ...testForm, photo: e.target.value })}
                          className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold">Comentário / Relato</label>
                      <textarea
                        rows={3}
                        required
                        value={testForm.comment}
                        onChange={(e) => setTestForm({ ...testForm, comment: e.target.value })}
                        className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className={`mt-4 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold flex items-center justify-center gap-1.5 ${btnRadius} shadow-md cursor-pointer`}
                >
                  <CheckCircle size={14} /> Salvar Item
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
