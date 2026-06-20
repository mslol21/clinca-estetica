"use client";

import React, { useState, useEffect, useRef } from "react";
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
  UserCheck,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  XCircle,
  FileDown,
  TrendingUp,
  Sliders,
  Menu,
  Star,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDatabase } from "@/context/DatabaseContext";
import { useToast } from "@/components/ui/Toast";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type AdminTab =
  | "dashboard"
  | "agenda"
  | "clientes"
  | "procedimentos"
  | "galeria"
  | "antes-e-depois"
  | "depoimentos"
  | "equipe"
  | "financeiro"
  | "relatorios"
  | "configuracoes";

export default function AdminPanel() {
  const { user, loading: authLoading, logout } = useAuth();
  const {
    procedures,
    professionals,
    clients,
    appointments,
    gallery,
    beforeAfter,
    testimonials,
    financialRecords,
    clinicConfig,
    saveProcedure,
    deleteProcedure,
    saveClient,
    deleteClient,
    saveAppointment,
    deleteAppointment,
    saveProfessional,
    deleteProfessional,
    saveGalleryItem,
    deleteGalleryItem,
    saveBeforeAfterItem,
    deleteBeforeAfterItem,
    saveTestimonial,
    deleteTestimonial,
    saveFinancialRecord,
    deleteFinancialRecord,
    saveClinicConfig,
  } = useDatabase();
  
  const { success, error } = useToast();
  const router = useRouter();

  // Tab State
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Global Search State
  const [globalSearch, setGlobalSearch] = useState("");

  // Overlays / Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"client" | "procedure" | "appointment" | "professional" | "gallery" | "beforeAfter" | "testimonial" | "financial" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Form Fields States
  const [clientForm, setClientForm] = useState({ name: "", phone: "", whatsapp: "", email: "", birthDate: "", observations: "" });
  const [procForm, setProcForm] = useState({ name: "", category: "facial" as any, description: "", duration: 45, price: 0, benefits: "", contraindications: "", faqQ: "", faqA: "" });
  const [apptForm, setApptForm] = useState({ clientId: "", procedureId: "", professionalId: "", date: "", time: "", notes: "" });
  const [profForm, setProfForm] = useState({ name: "", role: "", specialty: "", bio: "", image: "", hours: "09:00,10:00,11:00,14:00,15:00,16:00,17:00" });
  const [galForm, setGalForm] = useState({ title: "", category: "facial" as any, image: "" });
  const [baForm, setBaForm] = useState({ title: "", category: "facial" as any, description: "", beforeImage: "", afterImage: "" });
  const [testForm, setTestForm] = useState({ name: "", role: "", comment: "", rating: 5, photo: "" });
  const [finForm, setFinForm] = useState({ type: "entrada" as "entrada" | "saida", description: "", value: 0, date: "", category: "Procedimentos" });

  // Clinic config form
  const [configForm, setConfigForm] = useState({ ...clinicConfig });

  // Direct auth protection check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    setMounted(true);
    setConfigForm({ ...clinicConfig });
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

  const handleOpenAddModal = (type: typeof modalType) => {
    setModalType(type);
    setEditId(null);
    setIsModalOpen(true);
    // Reset forms
    if (type === "client") setClientForm({ name: "", phone: "", whatsapp: "", email: "", birthDate: "", observations: "" });
    if (type === "procedure") setProcForm({ name: "", category: "facial", description: "", duration: 45, price: 0, benefits: "", contraindications: "", faqQ: "", faqA: "" });
    if (type === "appointment") setApptForm({ clientId: "", procedureId: "", professionalId: "", date: "", time: "", notes: "" });
    if (type === "professional") setProfForm({ name: "", role: "", specialty: "", bio: "", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300", hours: "09:00,10:00,11:00,14:00,15:00,16:00,17:00" });
    if (type === "gallery") setGalForm({ title: "", category: "facial", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400" });
    if (type === "beforeAfter") setBaForm({ title: "", category: "facial", description: "", beforeImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400", afterImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=400" });
    if (type === "testimonial") setTestForm({ name: "", role: "Cliente", comment: "", rating: 5, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150" });
    if (type === "financial") setFinForm({ type: "entrada", description: "", value: 0, date: new Date().toISOString().split("T")[0], category: "Procedimentos" });
  };

  const handleEditModal = (type: typeof modalType, item: any) => {
    setModalType(type);
    setEditId(item.id);
    setIsModalOpen(true);
    
    if (type === "client") setClientForm({ name: item.name, phone: item.phone, whatsapp: item.whatsapp, email: item.email, birthDate: item.birthDate, observations: item.observations });
    if (type === "procedure") setProcForm({ name: item.name, category: item.category, description: item.description, duration: item.duration, price: item.price || 0, benefits: item.benefits.join(", "), contraindications: item.contraindications.join(", "), faqQ: item.faq?.[0]?.question || "", faqA: item.faq?.[0]?.answer || "" });
    if (type === "appointment") setApptForm({ clientId: item.clientId, procedureId: item.procedureId, professionalId: item.professionalId, date: item.date, time: item.time, notes: item.notes || "" });
    if (type === "professional") setProfForm({ name: item.name, role: item.role, specialty: item.specialty, bio: item.bio, image: item.image, hours: item.availableHours.join(",") });
    if (type === "gallery") setGalForm({ title: item.title, category: item.category, image: item.image });
    if (type === "beforeAfter") setBaForm({ title: item.title, category: item.category, description: item.description, beforeImage: item.beforeImage, afterImage: item.afterImage });
    if (type === "testimonial") setTestForm({ name: item.name, role: item.role, comment: item.comment, rating: item.rating, photo: item.photo });
    if (type === "financial") setFinForm({ type: item.type, description: item.description, value: item.value, date: item.date, category: item.category });
  };

  const handleDeleteItem = (type: typeof modalType, id: string) => {
    if (!confirm("Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.")) return;
    try {
      if (type === "client") deleteClient(id);
      if (type === "procedure") deleteProcedure(id);
      if (type === "appointment") deleteAppointment(id);
      if (type === "professional") deleteProfessional(id);
      if (type === "gallery") deleteGalleryItem(id);
      if (type === "beforeAfter") deleteBeforeAfterItem(id);
      if (type === "testimonial") deleteTestimonial(id);
      if (type === "financial") deleteFinancialRecord(id);
      success("Excluído com sucesso", "O item foi removido do banco de dados.");
    } catch {
      error("Erro ao excluir", "Não foi possível remover o item selecionado.");
    }
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = editId || Math.random().toString(36).substring(2, 9);
      
      if (modalType === "client") {
        saveClient({ id, ...clientForm, createdAt: new Date().toISOString() });
      }
      else if (modalType === "procedure") {
        saveProcedure({
          id,
          name: procForm.name,
          category: procForm.category,
          description: procForm.description,
          duration: Number(procForm.duration),
          price: Number(procForm.price),
          benefits: procForm.benefits.split(",").map((s) => s.trim()).filter(Boolean),
          contraindications: procForm.contraindications.split(",").map((s) => s.trim()).filter(Boolean),
          faq: procForm.faqQ ? [{ question: procForm.faqQ, answer: procForm.faqA }] : [],
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400",
        });
      }
      else if (modalType === "appointment") {
        const clientObj = clients.find((c) => c.id === apptForm.clientId);
        const procObj = procedures.find((p) => p.id === apptForm.procedureId);
        const profObj = professionals.find((p) => p.id === apptForm.professionalId);
        
        saveAppointment({
          id,
          clientId: apptForm.clientId,
          clientName: clientObj?.name || "Cliente Manual",
          clientPhone: clientObj?.phone || "",
          procedureId: apptForm.procedureId,
          procedureName: procObj?.name || "",
          professionalId: apptForm.professionalId,
          professionalName: profObj?.name || "",
          date: apptForm.date,
          time: apptForm.time,
          status: "confirmado",
          price: procObj?.price || 0,
          notes: apptForm.notes,
        });
      }
      else if (modalType === "professional") {
        saveProfessional({
          id,
          name: profForm.name,
          role: profForm.role,
          specialty: profForm.specialty,
          bio: profForm.bio,
          image: profForm.image,
          rating: 4.9,
          availableHours: profForm.hours.split(",").map((s) => s.trim()).filter(Boolean),
        });
      }
      else if (modalType === "gallery") {
        saveGalleryItem({
          id,
          title: galForm.title,
          category: galForm.category,
          image: galForm.image,
          createdAt: new Date().toISOString().split("T")[0],
        });
      }
      else if (modalType === "beforeAfter") {
        saveBeforeAfterItem({
          id,
          title: baForm.title,
          category: baForm.category,
          description: baForm.description,
          beforeImage: baForm.beforeImage,
          afterImage: baForm.afterImage,
          createdAt: new Date().toISOString().split("T")[0],
        });
      }
      else if (modalType === "testimonial") {
        saveTestimonial({
          id,
          name: testForm.name,
          role: testForm.role,
          comment: testForm.comment,
          rating: Number(testForm.rating),
          photo: testForm.photo,
          date: new Date().toISOString().split("T")[0],
        });
      }
      else if (modalType === "financial") {
        saveFinancialRecord({
          id,
          type: finForm.type,
          description: finForm.description,
          value: Number(finForm.value),
          date: finForm.date,
          category: finForm.category,
        });
      }

      success("Salvo com sucesso!", "Os dados foram gravados e atualizados reativamente.");
      setIsModalOpen(false);
    } catch {
      error("Erro ao salvar", "Ocorreu um erro no preenchimento. Revise os campos.");
    }
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveClinicConfig(configForm);
    success("Configurações salvas!", "As informações da clínica foram gravadas.");
  };

  // Recharts Chart Mock Data Sets
  const monthlyRevenueData = [
    { name: "Jan", receita: 18000, despesas: 8000, lucro: 10000 },
    { name: "Fev", receita: 22000, despesas: 9500, lucro: 12500 },
    { name: "Mar", receita: 25000, despesas: 11000, lucro: 14000 },
    { name: "Abr", receita: 30000, despesas: 12500, lucro: 17500 },
    { name: "Mai", receita: 28000, despesas: 10000, lucro: 18000 },
    { name: "Jun", receita: 35000, despesas: 13000, lucro: 22000 },
  ];

  const apptByCategoryData = [
    { name: "Facial", agendamentos: 45 },
    { name: "Corporal", agendamentos: 28 },
    { name: "Laser", agendamentos: 38 },
    { name: "Avançada", agendamentos: 19 },
  ];

  const clientGrowthData = [
    { name: "Jan", total: 85 },
    { name: "Fev", total: 110 },
    { name: "Mar", total: 140 },
    { name: "Abr", total: 185 },
    { name: "Mai", total: 210 },
    { name: "Jun", total: 248 },
  ];

  // Calculate quick metrics
  const totalRevenue = financialRecords
    .filter((f) => f.type === "entrada")
    .reduce((acc, curr) => acc + curr.value, 0);
  const totalExpenses = financialRecords
    .filter((f) => f.type === "saida")
    .reduce((acc, curr) => acc + curr.value, 0);
  const netProfit = totalRevenue - totalExpenses;

  const todayStr = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "agenda", name: "Agenda", icon: CalendarIcon },
    { id: "clientes", name: "Clientes", icon: Users },
    { id: "procedimentos", name: "Procedimentos", icon: Sparkles },
    { id: "galeria", name: "Galeria", icon: ImageIcon },
    { id: "antes-e-depois", name: "Antes e Depois", icon: Columns },
    { id: "depoimentos", name: "Depoimentos", icon: MessageSquare },
    { id: "equipe", name: "Equipe", icon: UserCheck },
    { id: "financeiro", name: "Financeiro", icon: DollarSign },
    { id: "relatorios", name: "Relatórios", icon: FileText },
    { id: "configuracoes", name: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col lg:flex-row font-sans text-xs transition-colors">
      
      {/* Mobile Drawer trigger */}
      <div className="lg:hidden bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850 px-4 py-3 flex items-center justify-between z-40 shrink-0">
        <span className="font-serif font-bold text-stone-800 dark:text-stone-100 text-sm tracking-wide">LUXE ADMIN</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded border border-stone-200 dark:border-stone-800">
          <Menu size={18} />
        </button>
      </div>

      {/* SIDEBAR CONTAINER */}
      {sidebarOpen && (
        <aside className="w-full lg:w-64 bg-stone-900 text-stone-300 flex flex-col shrink-0 z-30">
          {/* Sidebar Brand */}
          <div className="px-6 py-6 border-b border-stone-800 flex flex-col select-none">
            <span className="font-serif text-lg tracking-[0.25em] uppercase text-white font-medium">
              Luxe Estética
            </span>
            <span className="text-[8px] tracking-[0.2em] uppercase text-gold-400 font-light mt-0.5">
              Administração Concierge
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium tracking-wide transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-md shadow-gold-500/10"
                      : "text-stone-400 hover:bg-stone-800 hover:text-stone-100"
                  }`}
                >
                  <IconComp size={16} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-stone-800 flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-750 flex items-center justify-center">
                <span className="text-white text-xs font-serif">A</span>
              </div>
              <div className="overflow-hidden">
                <span className="text-stone-200 block truncate font-medium">{user.email}</span>
                <span className="text-[9px] text-stone-500 uppercase tracking-wider block">Diretor</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-stone-800 hover:text-red-300 font-semibold uppercase tracking-wider text-[10px] cursor-pointer mt-2"
            >
              <LogOut size={14} />
              Sair do Painel
            </button>
          </div>
        </aside>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col overflow-x-hidden min-h-0 bg-stone-50 dark:bg-stone-950">
        {/* Main top header */}
        <header className="bg-white dark:bg-stone-900 border-b border-stone-200/50 dark:border-stone-850/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-lg font-semibold tracking-wide text-stone-800 dark:text-white capitalize">
              {activeTab.replace("-", " ")}
            </h1>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Busca global rápida..."
              className="w-full pl-10 pr-4 py-2 bg-stone-100 dark:bg-stone-950/60 border border-transparent focus:border-gold-300 dark:focus:border-gold-800 rounded-full outline-none transition-all text-[11px] dark:text-white"
            />
          </div>
        </header>

        {/* Dynamic sub tab layout wrapper */}
        <div className="flex-1 p-6 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && mounted && (
            <div className="flex flex-col gap-8">
              {/* KPIs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light block">
                      Agendamentos do Dia
                    </span>
                    <span className="text-2xl font-serif font-semibold text-stone-850 dark:text-stone-100 block mt-2">
                      {todayAppointments.length}
                    </span>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl">
                    <CalendarIcon size={20} />
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light block">
                      Clientes Cadastrados
                    </span>
                    <span className="text-2xl font-serif font-semibold text-stone-850 dark:text-stone-100 block mt-2">
                      {clients.length}
                    </span>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 text-green-500 rounded-xl">
                    <Users size={20} />
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light block">
                      Faturamento Líquido
                    </span>
                    <span className="text-2xl font-serif font-semibold text-gold-550 dark:text-gold-400 block mt-2">
                      R$ {netProfit.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-gold-500 rounded-xl">
                    <DollarSign size={20} />
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light block">
                      Avaliações Ativas
                    </span>
                    <span className="text-2xl font-serif font-semibold text-stone-850 dark:text-stone-100 block mt-2">
                      {testimonials.length}
                    </span>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-500 rounded-xl">
                    <MessageSquare size={20} />
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Revenue graph */}
                <div className="lg:col-span-8 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
                  <h3 className="font-serif text-sm font-semibold tracking-wide text-stone-800 dark:text-stone-200 mb-6 flex items-center gap-2">
                    <TrendingUp size={16} className="text-gold-550" /> Fluxo de Caixa Financeiro (Lucro Líquido)
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyRevenueData}>
                        <defs>
                          <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C5A880" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#C5A880" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="lucro" name="Lucro Líquido (R$)" stroke="#C5A880" fillOpacity={1} fill="url(#colorLucro)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Categorized bar graph */}
                <div className="lg:col-span-4 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
                  <h3 className="font-serif text-sm font-semibold tracking-wide text-stone-800 dark:text-stone-200 mb-6">
                    Procedimentos por Categoria
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={apptByCategoryData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="agendamentos" name="Agendamentos" fill="#b0926a" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Next appointments table */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm p-6">
                <h3 className="font-serif text-sm font-semibold tracking-wide text-stone-800 dark:text-stone-200 mb-6">
                  Próximos Atendimentos
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs font-light">
                    <thead>
                      <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400 font-medium">
                        <th className="py-3 px-4">Paciente</th>
                        <th className="py-3 px-4">Procedimento</th>
                        <th className="py-3 px-4">Especialista</th>
                        <th className="py-3 px-4">Data</th>
                        <th className="py-3 px-4">Horário</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800/40">
                      {appointments.slice(0, 4).map((appt) => (
                        <tr key={appt.id} className="text-stone-600 dark:text-stone-300">
                          <td className="py-3.5 px-4 font-semibold text-stone-800 dark:text-stone-100">
                            {appt.clientName}
                          </td>
                          <td className="py-3.5 px-4">{appt.procedureName}</td>
                          <td className="py-3.5 px-4">{appt.professionalName}</td>
                          <td className="py-3.5 px-4">
                            {new Date(appt.date + "T00:00:00").toLocaleDateString("pt-BR")}
                          </td>
                          <td className="py-3.5 px-4 font-medium">{appt.time}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 dark:bg-green-950/20 border border-green-200/30 text-green-600 text-[10px] font-semibold uppercase">
                              <CheckCircle size={10} /> {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AGENDA MANAGER */}
          {activeTab === "agenda" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <span className="text-xs text-stone-500 font-light">
                  Gerenciamento de datas, horários e profissionais.
                </span>
                <button
                  onClick={() => handleOpenAddModal("appointment")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Novo Agendamento
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-light">
                  <thead>
                    <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400">
                      <th className="py-3 px-4">Código</th>
                      <th className="py-3 px-4">Paciente</th>
                      <th className="py-3 px-4">Telefone</th>
                      <th className="py-3 px-4">Procedimento</th>
                      <th className="py-3 px-4">Especialista</th>
                      <th className="py-3 px-4">Data/Hora</th>
                      <th className="py-3 px-4">Faturamento</th>
                      <th className="py-3 px-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/40">
                    {appointments
                      .filter((a) => a.clientName.toLowerCase().includes(globalSearch.toLowerCase()) || a.procedureName.toLowerCase().includes(globalSearch.toLowerCase()))
                      .map((appt) => (
                        <tr key={appt.id} className="text-stone-600 dark:text-stone-300">
                          <td className="py-3.5 px-4 font-mono text-[10px] text-stone-450">{appt.id}</td>
                          <td className="py-3.5 px-4 font-semibold text-stone-850 dark:text-stone-100">{appt.clientName}</td>
                          <td className="py-3.5 px-4">{appt.clientPhone}</td>
                          <td className="py-3.5 px-4">{appt.procedureName}</td>
                          <td className="py-3.5 px-4">{appt.professionalName}</td>
                          <td className="py-3.5 px-4">
                            <span className="block font-medium">
                              {new Date(appt.date + "T00:00:00").toLocaleDateString("pt-BR")}
                            </span>
                            <span className="text-[10px] text-stone-400 font-light block">{appt.time}</span>
                          </td>
                          <td className="py-3.5 px-4 font-serif font-semibold text-gold-600 dark:text-gold-455">
                            R$ {appt.price.toLocaleString("pt-BR")}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditModal("appointment", appt)}
                                className="p-1 text-stone-400 hover:text-gold-500 rounded border border-transparent hover:border-stone-200 dark:hover:border-stone-800 cursor-pointer"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem("appointment", appt.id)}
                                className="p-1 text-stone-400 hover:text-red-500 rounded border border-transparent hover:border-stone-200 dark:hover:border-stone-800 cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTS CRUD */}
          {activeTab === "clientes" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <span className="text-xs text-stone-500 font-light">
                  Lista de prontuários simples, contatos e observações clínicas.
                </span>
                <button
                  onClick={() => handleOpenAddModal("client")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Cadastrar Cliente
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-light">
                  <thead>
                    <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400">
                      <th className="py-3 px-4">Nome</th>
                      <th className="py-3 px-4">Telefone</th>
                      <th className="py-3 px-4">WhatsApp</th>
                      <th className="py-3 px-4">E-mail</th>
                      <th className="py-3 px-4">Nascimento</th>
                      <th className="py-3 px-4">Observações Clínicas</th>
                      <th className="py-3 px-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/40">
                    {clients
                      .filter((c) => c.name.toLowerCase().includes(globalSearch.toLowerCase()) || c.email.toLowerCase().includes(globalSearch.toLowerCase()))
                      .map((c) => (
                        <tr key={c.id} className="text-stone-600 dark:text-stone-300">
                          <td className="py-3.5 px-4 font-semibold text-stone-850 dark:text-stone-100">{c.name}</td>
                          <td className="py-3.5 px-4">{c.phone}</td>
                          <td className="py-3.5 px-4">{c.whatsapp}</td>
                          <td className="py-3.5 px-4">{c.email}</td>
                          <td className="py-3.5 px-4">
                            {c.birthDate ? new Date(c.birthDate + "T00:00:00").toLocaleDateString("pt-BR") : "Não inf."}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs truncate" title={c.observations}>
                            {c.observations || "Nenhuma observação cadastrada."}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditModal("client", c)}
                                className="p-1 text-stone-400 hover:text-gold-500 rounded border border-transparent hover:border-stone-200 dark:hover:border-stone-800 cursor-pointer"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem("client", c.id)}
                                className="p-1 text-stone-400 hover:text-red-500 rounded border border-transparent hover:border-stone-200 dark:hover:border-stone-800 cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PROCEDURES CRUD */}
          {activeTab === "procedimentos" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <span className="text-xs text-stone-500 font-light">
                  Edição do catálogo de tratamentos exibido no site e agendamento.
                </span>
                <button
                  onClick={() => handleOpenAddModal("procedure")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Novo Procedimento
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {procedures.map((proc) => (
                  <div
                    key={proc.id}
                    className="p-5 rounded-2xl border border-stone-250 dark:border-stone-800/40 bg-stone-50 dark:bg-stone-950/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-2 py-0.5 rounded bg-gold-100/50 dark:bg-gold-950/20 text-gold-600 dark:text-gold-400 text-[8px] uppercase tracking-wider font-semibold">
                          {proc.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditModal("procedure", proc)}
                            className="p-1 text-stone-400 hover:text-gold-500 cursor-pointer"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("procedure", proc.id)}
                            className="p-1 text-stone-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-150 mb-2">
                        {proc.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed font-light mb-4">
                        {proc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/50 dark:border-stone-800/30 flex justify-between items-center text-[10px]">
                      <span className="text-stone-450 font-light">Duração: {proc.duration} min</span>
                      {proc.price && (
                        <span className="font-serif font-semibold text-gold-600 dark:text-gold-455">
                          R$ {proc.price.toLocaleString("pt-BR")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY CRUD */}
          {activeTab === "galeria" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <span className="text-xs text-stone-500 font-light">
                  Upload de imagens institucionais e fotos de tratamento na galeria.
                </span>
                <button
                  onClick={() => handleOpenAddModal("gallery")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Adicionar Foto
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.map((g) => (
                  <div
                    key={g.id}
                    className="relative group rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 aspect-[4/3]"
                  >
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                    
                    {/* Dark controls overlay */}
                    <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                      <span className="text-[9px] uppercase tracking-widest bg-gold-600/80 px-2 py-0.5 rounded self-start">
                        {g.category}
                      </span>
                      <div className="flex items-center justify-between w-full mt-auto">
                        <span className="text-[10px] truncate pr-2 font-medium">{g.title}</span>
                        <button
                          onClick={() => handleDeleteItem("gallery", g.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors cursor-pointer shrink-0"
                          title="Excluir"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BEFORE AND AFTER CRUD */}
          {activeTab === "antes-e-depois" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <span className="text-xs text-stone-500 font-light">
                  Gerenciar sliders de comparação interativa de resultados.
                </span>
                <button
                  onClick={() => handleOpenAddModal("beforeAfter")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Novo Caso Clínico
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {beforeAfter.map((ba) => (
                  <div
                    key={ba.id}
                    className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800/40 bg-stone-50 dark:bg-stone-950/20 flex flex-col gap-4 justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-gold-100/50 dark:bg-gold-950/20 text-gold-600 dark:text-gold-400 text-[8px] uppercase tracking-wider font-semibold">
                          {ba.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-155 mt-2">
                          {ba.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditModal("beforeAfter", ba)}
                          className="p-1 text-stone-400 hover:text-gold-500 cursor-pointer"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("beforeAfter", ba.id)}
                          className="p-1 text-stone-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 aspect-video">
                      <div className="relative rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800">
                        <img src={ba.beforeImage} alt="Antes" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] text-white">Antes</span>
                      </div>
                      <div className="relative rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800">
                        <img src={ba.afterImage} alt="Depois" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] text-white">Depois</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-light line-clamp-2">
                      {ba.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS MANAGER */}
          {activeTab === "depoimentos" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <span className="text-xs text-stone-500 font-light">
                  Moderação e modulação de depoimentos e notas do site.
                </span>
                <button
                  onClick={() => handleOpenAddModal("testimonial")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Inserir Depoimento
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800/40 bg-stone-50 dark:bg-stone-950/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-0.5 text-gold-450">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} size={12} className="fill-gold-450 text-gold-450" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditModal("testimonial", t)}
                            className="p-1 text-stone-400 hover:text-gold-500 cursor-pointer"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("testimonial", t.id)}
                            className="p-1 text-stone-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-light italic mb-4">
                        &ldquo;{t.comment}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-stone-200/50 dark:border-stone-800/30">
                      <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="font-semibold text-stone-800 dark:text-stone-250 text-xs">{t.name}</h4>
                        <span className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-light">
                          {t.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: STAFF MANAGEMENT */}
          {activeTab === "equipe" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <span className="text-xs text-stone-500 font-light">
                  Cadastro de profissionais, especialidades e escalas horárias.
                </span>
                <button
                  onClick={() => handleOpenAddModal("professional")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Novo Especialista
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((prof) => (
                  <div
                    key={prof.id}
                    className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800/40 bg-stone-50 dark:bg-stone-950/20 flex flex-col justify-between"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gold-300/20 mb-3">
                        <img src={prof.image} alt={prof.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-semibold text-stone-850 dark:text-stone-150 text-xs">{prof.name}</h4>
                      <span className="text-[9px] uppercase tracking-widest text-gold-550 mt-0.5">{prof.role}</span>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed font-light mt-3">
                        {prof.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/30 mt-4 flex justify-between items-center">
                      <span className="text-[9px] text-stone-400 block font-light">
                        {prof.availableHours.length} horários ativos
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditModal("professional", prof)}
                          className="p-1 text-stone-400 hover:text-gold-500 cursor-pointer"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("professional", prof.id)}
                          className="p-1 text-stone-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: FINANCIAL CONTROL */}
          {activeTab === "financeiro" && (
            <div className="flex flex-col gap-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/40">
                <div className="flex gap-6">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-light">Total Entradas</span>
                    <span className="text-sm font-serif font-semibold text-green-600 block mt-0.5">
                      R$ {totalRevenue.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-light">Total Saídas</span>
                    <span className="text-sm font-serif font-semibold text-red-500 block mt-0.5">
                      R$ {totalExpenses.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-light">Lucro Líquido</span>
                    <span className="text-sm font-serif font-semibold text-gold-600 dark:text-gold-455 block mt-0.5">
                      R$ {netProfit.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenAddModal("financial")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Registrar Transação
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-light">
                  <thead>
                    <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400">
                      <th className="py-3 px-4">Data</th>
                      <th className="py-3 px-4">Descrição</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Tipo</th>
                      <th className="py-3 px-4">Valor</th>
                      <th className="py-3 px-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/40">
                    {financialRecords
                      .filter((f) => f.description.toLowerCase().includes(globalSearch.toLowerCase()))
                      .map((record) => (
                        <tr key={record.id} className="text-stone-600 dark:text-stone-300">
                          <td className="py-3.5 px-4">
                            {new Date(record.date + "T00:00:00").toLocaleDateString("pt-BR")}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-stone-850 dark:text-stone-100">
                            {record.description}
                          </td>
                          <td className="py-3.5 px-4">{record.category}</td>
                          <td className="py-3.5 px-4">
                            {record.type === "entrada" ? (
                              <span className="inline-flex px-2 py-0.5 rounded bg-green-50 dark:bg-green-950/20 text-green-600 font-semibold uppercase text-[9px]">
                                Entrada
                              </span>
                            ) : (
                              <span className="inline-flex px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/20 text-red-500 font-semibold uppercase text-[9px]">
                                Saída
                              </span>
                            )}
                          </td>
                          <td
                            className={`py-3.5 px-4 font-serif font-semibold text-xs ${
                              record.type === "entrada"
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {record.type === "entrada" ? "+" : "-"} R$ {record.value.toLocaleString("pt-BR")}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditModal("financial", record)}
                                className="p-1 text-stone-400 hover:text-gold-500 rounded cursor-pointer"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem("financial", record.id)}
                                className="p-1 text-stone-400 hover:text-red-500 rounded cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: REPORTS EXPORTER */}
          {activeTab === "relatorios" && (
            <div className="flex flex-col gap-8">
              <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm">
                <span className="text-xs text-stone-500 block font-light mb-6">
                  Gere arquivos de auditoria prontos para impressão ou exportação.
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Report Card 1 */}
                  <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/20 flex flex-col gap-4">
                    <h4 className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-150">
                      Clientes Cadastrados
                    </h4>
                    <p className="text-[10px] text-stone-500 leading-relaxed font-light flex-1">
                      Exporta o cadastro completo contendo nomes, contatos, e-mails, aniversários e observações de prontuário de cada paciente ativo.
                    </p>
                    <button
                      onClick={() => {
                        alert("Auditoria gerada! Preparando impressão...");
                        window.print();
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg font-semibold uppercase tracking-wider text-[10px] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <FileDown size={13} /> Gerar PDF / Imprimir
                    </button>
                  </div>

                  {/* Report Card 2 */}
                  <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/20 flex flex-col gap-4">
                    <h4 className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-150">
                      Agenda de Consultas
                    </h4>
                    <p className="text-[10px] text-stone-500 leading-relaxed font-light flex-1">
                      Relatório completo de agendamentos futuros e passados, detalhado por data, profissional e procedimento associado.
                    </p>
                    <button
                      onClick={() => {
                        // Generate mock CSV data download
                        const csvContent = "data:text/csv;charset=utf-8,ID,Cliente,Procedimento,Data,Hora,Valor\n" + 
                          appointments.map(a => `"${a.id}","${a.clientName}","${a.procedureName}","${a.date}","${a.time}","${a.price}"`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "auditoria_agenda_luxe.csv");
                        document.body.appendChild(link);
                        link.click();
                        success("Download Iniciado", "Planilha Excel (CSV) baixada com sucesso.");
                      }}
                      className="w-full py-2.5 bg-stone-900 dark:bg-stone-800 text-stone-200 rounded-lg font-semibold uppercase tracking-wider text-[10px] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <FileDown size={13} /> Exportar Excel
                    </button>
                  </div>

                  {/* Report Card 3 */}
                  <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/20 flex flex-col gap-4">
                    <h4 className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-150">
                      Balanço Financeiro
                    </h4>
                    <p className="text-[10px] text-stone-500 leading-relaxed font-light flex-1">
                      Consolidado de todas as entradas de procedimentos e saídas operacionais, contendo data, descrição e cálculo líquido de margem de lucro.
                    </p>
                    <button
                      onClick={() => {
                        alert("Auditoria gerada! Preparando impressão...");
                        window.print();
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg font-semibold uppercase tracking-wider text-[10px] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <FileDown size={13} /> Gerar PDF / Imprimir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: CONFIGURATIONS */}
          {activeTab === "configuracoes" && (
            <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 shadow-sm max-w-2xl">
              <form onSubmit={handleConfigSubmit} className="flex flex-col gap-6 font-sans text-xs">
                
                {/* Clinic base details */}
                <div>
                  <h3 className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-150 mb-4 border-b pb-2">
                    Dados Gerais da Clínica
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Nome da Clínica</label>
                      <input
                        type="text"
                        value={configForm.name}
                        onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Slogan / Tagline</label>
                      <input
                        type="text"
                        value={configForm.tagline}
                        onChange={(e) => setConfigForm({ ...configForm, tagline: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Telefone Fixo</label>
                      <input
                        type="text"
                        value={configForm.phone}
                        onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-medium text-stone-650 dark:text-stone-300">WhatsApp Comercial</label>
                      <input
                        type="text"
                        value={configForm.whatsapp}
                        onChange={(e) => setConfigForm({ ...configForm, whatsapp: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mt-4">
                    <label className="font-medium text-stone-650 dark:text-stone-300">Endereço Completo</label>
                    <input
                      type="text"
                      value={configForm.address}
                      onChange={(e) => setConfigForm({ ...configForm, address: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Social Networks */}
                <div>
                  <h3 className="font-serif text-sm font-semibold text-stone-850 dark:text-stone-150 mb-4 border-b pb-2">
                    Redes Sociais & Integrações
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Instagram URL</label>
                      <input
                        type="text"
                        value={configForm.instagram}
                        onChange={(e) => setConfigForm({ ...configForm, instagram: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Google Analytics ID</label>
                      <input
                        type="text"
                        value={configForm.googleAnalyticsId}
                        onChange={(e) => setConfigForm({ ...configForm, googleAnalyticsId: e.target.value })}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg font-semibold uppercase tracking-wider text-center shadow-md cursor-pointer mt-4"
                >
                  Salvar Alterações
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* GLOBAL DYNAMIC OVERLAY MODAL FOR CRUD */}
      <AnimatePresence>
        {isModalOpen && modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 max-w-xl w-full p-6 text-stone-800 dark:text-stone-100 font-sans"
            >
              <h3 className="font-serif text-sm font-semibold tracking-wider border-b pb-3 mb-4 uppercase">
                {editId ? "Editar Cadastro" : "Criar Novo Registro"} - {modalType}
              </h3>

              <form onSubmit={handleSaveSubmit} className="flex flex-col gap-4 text-xs">
                
                {/* 1. Client form */}
                {modalType === "client" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Nome</label>
                      <input
                        type="text"
                        required
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Telefone</label>
                        <input
                          type="text"
                          required
                          value={clientForm.phone}
                          onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">WhatsApp</label>
                        <input
                          type="text"
                          required
                          value={clientForm.whatsapp}
                          onChange={(e) => setClientForm({ ...clientForm, whatsapp: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">E-mail</label>
                        <input
                          type="email"
                          required
                          value={clientForm.email}
                          onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Nascimento</label>
                        <input
                          type="date"
                          value={clientForm.birthDate}
                          onChange={(e) => setClientForm({ ...clientForm, birthDate: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Observações</label>
                      <textarea
                        rows={3}
                        value={clientForm.observations}
                        onChange={(e) => setClientForm({ ...clientForm, observations: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Procedure Form */}
                {modalType === "procedure" && (
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Nome</label>
                        <input
                          type="text"
                          required
                          value={procForm.name}
                          onChange={(e) => setProcForm({ ...procForm, name: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Categoria</label>
                        <select
                          value={procForm.category}
                          onChange={(e) => setProcForm({ ...procForm, category: e.target.value as any })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        >
                          <option value="facial">Facial</option>
                          <option value="corporal">Corporal</option>
                          <option value="laser">Laser</option>
                          <option value="avancada">Avançada</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Duração (min)</label>
                        <input
                          type="number"
                          required
                          value={procForm.duration}
                          onChange={(e) => setProcForm({ ...procForm, duration: Number(e.target.value) })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Valor (R$)</label>
                        <input
                          type="number"
                          required
                          value={procForm.price}
                          onChange={(e) => setProcForm({ ...procForm, price: Number(e.target.value) })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Descrição</label>
                      <textarea
                        rows={2}
                        value={procForm.description}
                        onChange={(e) => setProcForm({ ...procForm, description: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Benefícios (sep. por vírgula)</label>
                        <input
                          type="text"
                          value={procForm.benefits}
                          onChange={(e) => setProcForm({ ...procForm, benefits: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Contraindicações (sep. por vírgula)</label>
                        <input
                          type="text"
                          value={procForm.contraindications}
                          onChange={(e) => setProcForm({ ...procForm, contraindications: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Appointment Form */}
                {modalType === "appointment" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Paciente</label>
                      <select
                        required
                        value={apptForm.clientId}
                        onChange={(e) => setApptForm({ ...apptForm, clientId: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                      >
                        <option value="">Selecione o Cliente</option>
                        {clients.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.phone})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Procedimento</label>
                        <select
                          required
                          value={apptForm.procedureId}
                          onChange={(e) => setApptForm({ ...apptForm, procedureId: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        >
                          <option value="">Selecione o Procedimento</option>
                          {procedures.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} (R$ {p.price})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Especialista</label>
                        <select
                          required
                          value={apptForm.professionalId}
                          onChange={(e) => setApptForm({ ...apptForm, professionalId: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        >
                          <option value="">Selecione o Profissional</option>
                          {professionals.map((pr) => (
                            <option key={pr.id} value={pr.id}>
                              {pr.name} ({pr.role})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Data</label>
                        <input
                          type="date"
                          required
                          value={apptForm.date}
                          onChange={(e) => setApptForm({ ...apptForm, date: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Horário</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: 14:00"
                          value={apptForm.time}
                          onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Notas Adicionais</label>
                      <textarea
                        rows={2}
                        value={apptForm.notes}
                        onChange={(e) => setApptForm({ ...apptForm, notes: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* 4. Professional Form */}
                {modalType === "professional" && (
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Nome</label>
                        <input
                          type="text"
                          required
                          value={profForm.name}
                          onChange={(e) => setProfForm({ ...profForm, name: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Cargo / Função</label>
                        <input
                          type="text"
                          required
                          value={profForm.role}
                          onChange={(e) => setProfForm({ ...profForm, role: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Especialidade Principal</label>
                      <input
                        type="text"
                        required
                        value={profForm.specialty}
                        onChange={(e) => setProfForm({ ...profForm, specialty: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Biografia Curta</label>
                      <textarea
                        rows={2}
                        value={profForm.bio}
                        onChange={(e) => setProfForm({ ...profForm, bio: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Horários (sep. por vírgula)</label>
                      <input
                        type="text"
                        required
                        value={profForm.hours}
                        onChange={(e) => setProfForm({ ...profForm, hours: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 5. Gallery Form */}
                {modalType === "gallery" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Título da Foto</label>
                      <input
                        type="text"
                        required
                        value={galForm.title}
                        onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Categoria</label>
                        <select
                          value={galForm.category}
                          onChange={(e) => setGalForm({ ...galForm, category: e.target.value as any })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        >
                          <option value="facial">Facial</option>
                          <option value="corporal">Corporal</option>
                          <option value="laser">Laser</option>
                          <option value="avancada">Avançada</option>
                          <option value="clinica">A Clínica</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">URL da Imagem</label>
                        <input
                          type="text"
                          required
                          value={galForm.image}
                          onChange={(e) => setGalForm({ ...galForm, image: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Before After Form */}
                {modalType === "beforeAfter" && (
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Título</label>
                        <input
                          type="text"
                          required
                          value={baForm.title}
                          onChange={(e) => setBaForm({ ...baForm, title: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Categoria</label>
                        <select
                          value={baForm.category}
                          onChange={(e) => setBaForm({ ...baForm, category: e.target.value as any })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        >
                          <option value="facial">Facial</option>
                          <option value="corporal">Corporal</option>
                          <option value="laser">Laser</option>
                          <option value="avancada">Avançada</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">URL Imagem Antes</label>
                        <input
                          type="text"
                          required
                          value={baForm.beforeImage}
                          onChange={(e) => setBaForm({ ...baForm, beforeImage: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">URL Imagem Depois</label>
                        <input
                          type="text"
                          required
                          value={baForm.afterImage}
                          onChange={(e) => setBaForm({ ...baForm, afterImage: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Legenda / Resultado</label>
                      <textarea
                        rows={2}
                        value={baForm.description}
                        onChange={(e) => setBaForm({ ...baForm, description: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* 7. Testimonial Form */}
                {modalType === "testimonial" && (
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Nome</label>
                        <input
                          type="text"
                          required
                          value={testForm.name}
                          onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Cargo / Função</label>
                        <input
                          type="text"
                          required
                          value={testForm.role}
                          onChange={(e) => setTestForm({ ...testForm, role: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Nota (1-5)</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          required
                          value={testForm.rating}
                          onChange={(e) => setTestForm({ ...testForm, rating: Number(e.target.value) })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Foto URL</label>
                        <input
                          type="text"
                          required
                          value={testForm.photo}
                          onChange={(e) => setTestForm({ ...testForm, photo: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Comentário</label>
                      <textarea
                        rows={3}
                        required
                        value={testForm.comment}
                        onChange={(e) => setTestForm({ ...testForm, comment: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* 8. Financial Form */}
                {modalType === "financial" && (
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Tipo</label>
                        <select
                          value={finForm.type}
                          onChange={(e) => setFinForm({ ...finForm, type: e.target.value as any })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        >
                          <option value="entrada">Entrada (Faturamento)</option>
                          <option value="saida">Saída (Despesa)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Valor (R$)</label>
                        <input
                          type="number"
                          required
                          value={finForm.value}
                          onChange={(e) => setFinForm({ ...finForm, value: Number(e.target.value) })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Data</label>
                        <input
                          type="date"
                          required
                          value={finForm.date}
                          onChange={(e) => setFinForm({ ...finForm, date: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-medium text-stone-650 dark:text-stone-300">Categoria</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Marketing, Insumos, Procedimentos"
                          value={finForm.category}
                          onChange={(e) => setFinForm({ ...finForm, category: e.target.value })}
                          className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-stone-650 dark:text-stone-300">Descrição / Justificativa</label>
                      <input
                        type="text"
                        required
                        value={finForm.description}
                        onChange={(e) => setFinForm({ ...finForm, description: e.target.value })}
                        className="p-2 border rounded-lg bg-stone-50 dark:bg-stone-950 dark:border-stone-800 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Footer buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t mt-4 border-stone-200 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-stone-500 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    Salvar Registro
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
