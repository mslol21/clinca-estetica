"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dbService } from "@/services/dbService";
import {
  Procedure,
  Professional,
  Client,
  Appointment,
  GalleryItem,
  BeforeAfterItem,
  Testimonial,
  BlogPost,
  FinancialRecord,
  ClinicConfig,
} from "@/services/mockData";

interface DatabaseContextProps {
  procedures: Procedure[];
  professionals: Professional[];
  clients: Client[];
  appointments: Appointment[];
  gallery: GalleryItem[];
  beforeAfter: BeforeAfterItem[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  financialRecords: FinancialRecord[];
  clinicConfig: ClinicConfig;
  loading: boolean;

  // Actions
  refreshData: () => void;
  saveProcedure: (item: Procedure) => void;
  deleteProcedure: (id: string) => void;
  saveClient: (item: Client) => void;
  deleteClient: (id: string) => void;
  saveAppointment: (item: Appointment) => void;
  deleteAppointment: (id: string) => void;
  saveProfessional: (item: Professional) => void;
  deleteProfessional: (id: string) => void;
  saveGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  saveBeforeAfterItem: (item: BeforeAfterItem) => void;
  deleteBeforeAfterItem: (id: string) => void;
  saveTestimonial: (item: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  saveBlogPost: (item: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  saveFinancialRecord: (item: FinancialRecord) => void;
  deleteFinancialRecord: (id: string) => void;
  saveClinicConfig: (item: ClinicConfig) => void;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [clinicConfig, setClinicConfig] = useState<ClinicConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAllData = () => {
    setProcedures(dbService.getProcedures());
    setProfessionals(dbService.getProfessionals());
    setClients(dbService.getClients());
    setAppointments(dbService.getAppointments());
    setGallery(dbService.getGallery());
    setBeforeAfter(dbService.getBeforeAfter());
    setTestimonials(dbService.getTestimonials());
    setBlogPosts(dbService.getBlogPosts());
    setFinancialRecords(dbService.getFinancialRecords());
    setClinicConfig(dbService.getClinicConfig());
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const refreshData = () => {
    loadAllData();
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

  return (
    <DatabaseContext.Provider
      value={{
        procedures,
        professionals,
        clients,
        appointments,
        gallery,
        beforeAfter,
        testimonials,
        blogPosts,
        financialRecords,
        clinicConfig: clinicConfig || {
          name: "Carregando...",
          tagline: "",
          phone: "",
          whatsapp: "",
          email: "",
          address: "",
          workingHours: { weekdays: "", saturday: "", sunday: "" },
          googleMapsUrl: "",
          instagram: "",
          facebook: "",
          youtube: "",
          googleAnalyticsId: "",
          metaPixelId: "",
        },
        loading,
        refreshData,
        saveProcedure: wrapAction(dbService.saveProcedure),
        deleteProcedure: wrapDelete(dbService.deleteProcedure),
        saveClient: wrapAction(dbService.saveClient),
        deleteClient: wrapDelete(dbService.deleteClient),
        saveAppointment: wrapAction(dbService.saveAppointment),
        deleteAppointment: wrapDelete(dbService.deleteAppointment),
        saveProfessional: wrapAction(dbService.saveProfessional),
        deleteProfessional: wrapDelete(dbService.deleteProfessional),
        saveGalleryItem: wrapAction(dbService.saveGalleryItem),
        deleteGalleryItem: wrapDelete(dbService.deleteGalleryItem),
        saveBeforeAfterItem: wrapAction(dbService.saveBeforeAfterItem),
        deleteBeforeAfterItem: wrapDelete(dbService.deleteBeforeAfterItem),
        saveTestimonial: wrapAction(dbService.saveTestimonial),
        deleteTestimonial: wrapDelete(dbService.deleteTestimonial),
        saveBlogPost: wrapAction(dbService.saveBlogPost),
        deleteBlogPost: wrapDelete(dbService.deleteBlogPost),
        saveFinancialRecord: wrapAction(dbService.saveFinancialRecord),
        deleteFinancialRecord: wrapDelete(dbService.deleteFinancialRecord),
        saveClinicConfig: (config: ClinicConfig) => {
          dbService.saveClinicConfig(config);
          loadAllData();
        },
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};
