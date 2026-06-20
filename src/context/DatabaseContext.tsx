"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dbService } from "@/services/dbService";
import {
  Procedure,
  Client,
  Appointment,
  GalleryItem,
  BeforeAfterItem,
  Testimonial,
  BlogPost,
  ClinicConfig,
} from "@/services/mockData";
import { themeConfig, ThemeConfig } from "@/config/theme-config";

interface DatabaseContextProps {
  procedures: Procedure[];
  clients: Client[];
  appointments: Appointment[];
  gallery: GalleryItem[];
  beforeAfter: BeforeAfterItem[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  clinicConfig: ClinicConfig;
  theme: ThemeConfig;
  loading: boolean;

  // Actions
  refreshData: () => void;
  saveProcedure: (item: Procedure) => void;
  deleteProcedure: (id: string) => void;
  saveClient: (item: Client) => void;
  deleteClient: (id: string) => void;
  saveAppointment: (item: Appointment) => void;
  deleteAppointment: (id: string) => void;
  saveGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  saveBeforeAfterItem: (item: BeforeAfterItem) => void;
  deleteBeforeAfterItem: (id: string) => void;
  saveTestimonial: (item: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  saveBlogPost: (item: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  saveClinicConfig: (item: ClinicConfig) => void;
  saveTheme: (theme: ThemeConfig) => void;

  // Dynamic Theme Styling Classes
  btnRadius: string;
  cardStyleClass: string;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [clinicConfig, setClinicConfig] = useState<ClinicConfig | null>(null);
  const [theme, setThemeState] = useState<ThemeConfig>(themeConfig);
  const [loading, setLoading] = useState(true);

  const loadAllData = () => {
    setProcedures(dbService.getProcedures());
    setClients(dbService.getClients());
    setAppointments(dbService.getAppointments());
    setGallery(dbService.getGallery());
    setBeforeAfter(dbService.getBeforeAfter());
    setTestimonials(dbService.getTestimonials());
    setBlogPosts(dbService.getBlogPosts());
    setClinicConfig(dbService.getClinicConfig());
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
    // Load persisted theme
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("luxe_clinic_theme_config");
      if (savedTheme) {
        try {
          setThemeState(JSON.parse(savedTheme));
        } catch (_) {}
      }
    }
  }, []);

  const refreshData = () => {
    loadAllData();
  };

  const saveTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("luxe_clinic_theme_config", JSON.stringify(newTheme));
    }
  };

  const wrapAction = <T,>(saveFn: (item: T) => void, reload: boolean = true) => {
    return (item: T) => {
      saveFn(item);
      if (reload) loadAllData();
    };
  };

  const wrapDelete = (deleteFn: (id: string) => void, reload: boolean = true) => {
    return (id: string) => {
      deleteFn(id);
      if (reload) loadAllData();
    };
  };

  // Compute theme style helpers reactively
  const btnRadius =
    theme.styles.button === "pill"
      ? "rounded-full"
      : theme.styles.button === "rounded"
      ? "rounded-xl"
      : "rounded-none";

  const cardStyleClass =
    theme.styles.card === "glass"
      ? "glass-card"
      : theme.styles.card === "bordered"
      ? "bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/40"
      : "bg-white dark:bg-stone-900 shadow-xl shadow-stone-500/5 dark:shadow-none border border-transparent";

  return (
    <DatabaseContext.Provider
      value={{
        procedures,
        clients,
        appointments,
        gallery,
        beforeAfter,
        testimonials,
        blogPosts,
        clinicConfig: clinicConfig || {
          name: "Carregando...",
          slogan: "",
          logoText: "",
          logoImage: "",
          heroImage: "",
          phone: "",
          whatsapp: "",
          email: "",
          address: "",
          workingHours: { weekdays: "", saturday: "", sunday: "" },
          googleMapsUrl: "",
          social: { instagram: "", facebook: "", youtube: "" },
          seo: { title: "", description: "", keywords: [], ogImage: "" },
          integrations: { googleAnalyticsId: "", metaPixelId: "" },
          about: {
            essence: "",
            storyTitle: "",
            storyYearText: "",
            storySubtitle: "",
            storyParagraphs: [],
            mission: "",
            vision: "",
            values: "",
            infraTag: "",
            infraTitle: "",
            infraParagraphs: [],
          },
        },
        theme,
        loading,
        refreshData,
        saveProcedure: wrapAction(dbService.saveProcedure),
        deleteProcedure: wrapDelete(dbService.deleteProcedure),
        saveClient: wrapAction(dbService.saveClient),
        deleteClient: wrapDelete(dbService.deleteClient),
        saveAppointment: wrapAction(dbService.saveAppointment),
        deleteAppointment: wrapDelete(dbService.deleteAppointment),
        saveGalleryItem: wrapAction(dbService.saveGalleryItem),
        deleteGalleryItem: wrapDelete(dbService.deleteGalleryItem),
        saveBeforeAfterItem: wrapAction(dbService.saveBeforeAfterItem),
        deleteBeforeAfterItem: wrapDelete(dbService.deleteBeforeAfterItem),
        saveTestimonial: wrapAction(dbService.saveTestimonial),
        deleteTestimonial: wrapDelete(dbService.deleteTestimonial),
        saveBlogPost: wrapAction(dbService.saveBlogPost),
        deleteBlogPost: wrapDelete(dbService.deleteBlogPost),
        saveClinicConfig: (config: ClinicConfig) => {
          dbService.saveClinicConfig(config);
          loadAllData();
        },
        saveTheme,
        btnRadius,
        cardStyleClass,
      }}
    >
      <ThemeStyleInjectorInternal />
      {children}
    </DatabaseContext.Provider>
  );
};

const ThemeStyleInjectorInternal = () => {
  const { theme } = useDatabase();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--luxe-primary", theme.colors.primary);
      root.style.setProperty("--luxe-secondary", theme.colors.secondary);
      root.style.setProperty("--luxe-accent", theme.colors.accent);
      root.style.setProperty("--luxe-bg-light", theme.colors.backgroundLight);
      root.style.setProperty("--luxe-bg-dark", theme.colors.backgroundDark);
      
      // Update font properties dynamically
      root.style.setProperty("--luxe-font-heading", theme.fonts.heading);
      root.style.setProperty("--luxe-font-body", theme.fonts.body);
    }
  }, [theme]);

  return null;
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};
