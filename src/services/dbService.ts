import {
  INITIAL_PROCEDURES,
  INITIAL_CLIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_GALLERY,
  INITIAL_BEFORE_AFTER,
  INITIAL_TESTIMONIALS,
  INITIAL_BLOG,
  DEFAULT_CLINIC_CONFIG,
  Procedure,
  Client,
  Appointment,
  GalleryItem,
  BeforeAfterItem,
  Testimonial,
  BlogPost,
  ClinicConfig,
} from "./mockData";

// Safe localStorage helper for SSR environments
const getLocal = <T>(key: string, initial: T): T => {
  if (typeof window === "undefined") return initial;
  const data = localStorage.getItem(`luxe_clinic_${key}`);
  if (!data) {
    localStorage.setItem(`luxe_clinic_${key}`, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data) as T;
  } catch {
    return initial;
  }
};

const setLocal = <T>(key: string, data: T): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`luxe_clinic_${key}`, JSON.stringify(data));
};

export const dbService = {
  // Procedures
  getProcedures: (): Procedure[] => getLocal("procedures", INITIAL_PROCEDURES),
  saveProcedure: (item: Procedure) => {
    const list = dbService.getProcedures();
    const index = list.findIndex((p) => p.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    setLocal("procedures", list);
  },
  deleteProcedure: (id: string) => {
    const list = dbService.getProcedures().filter((p) => p.id !== id);
    setLocal("procedures", list);
  },

  // Clients
  getClients: (): Client[] => getLocal("clients", INITIAL_CLIENTS),
  saveClient: (item: Client) => {
    const list = dbService.getClients();
    const index = list.findIndex((c) => c.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    setLocal("clients", list);
  },
  deleteClient: (id: string) => {
    const list = dbService.getClients().filter((c) => c.id !== id);
    setLocal("clients", list);
  },

  // Appointments
  getAppointments: (): Appointment[] =>
    getLocal("appointments", INITIAL_APPOINTMENTS),
  saveAppointment: (item: Appointment) => {
    const list = dbService.getAppointments();
    const index = list.findIndex((a) => a.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    setLocal("appointments", list);
  },
  deleteAppointment: (id: string) => {
    const list = dbService.getAppointments().filter((a) => a.id !== id);
    setLocal("appointments", list);
  },

  // Gallery
  getGallery: (): GalleryItem[] => getLocal("gallery", INITIAL_GALLERY),
  saveGalleryItem: (item: GalleryItem) => {
    const list = dbService.getGallery();
    const index = list.findIndex((g) => g.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    setLocal("gallery", list);
  },
  deleteGalleryItem: (id: string) => {
    const list = dbService.getGallery().filter((g) => g.id !== id);
    setLocal("gallery", list);
  },

  // Before After
  getBeforeAfter: (): BeforeAfterItem[] =>
    getLocal("beforeAfter", INITIAL_BEFORE_AFTER),
  saveBeforeAfterItem: (item: BeforeAfterItem) => {
    const list = dbService.getBeforeAfter();
    const index = list.findIndex((b) => b.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    setLocal("beforeAfter", list);
  },
  deleteBeforeAfterItem: (id: string) => {
    const list = dbService.getBeforeAfter().filter((b) => b.id !== id);
    setLocal("beforeAfter", list);
  },

  // Testimonials
  getTestimonials: (): Testimonial[] =>
    getLocal("testimonials", INITIAL_TESTIMONIALS),
  saveTestimonial: (item: Testimonial) => {
    const list = dbService.getTestimonials();
    const index = list.findIndex((t) => t.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    setLocal("testimonials", list);
  },
  deleteTestimonial: (id: string) => {
    const list = dbService.getTestimonials().filter((t) => t.id !== id);
    setLocal("testimonials", list);
  },

  // Blog Posts
  getBlogPosts: (): BlogPost[] => getLocal("blog", INITIAL_BLOG),
  saveBlogPost: (item: BlogPost) => {
    const list = dbService.getBlogPosts();
    const index = list.findIndex((b) => b.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    setLocal("blog", list);
  },
  deleteBlogPost: (id: string) => {
    const list = dbService.getBlogPosts().filter((b) => b.id !== id);
    setLocal("blog", list);
  },

  // Clinic Config
  getClinicConfig: (): ClinicConfig =>
    getLocal("clinicConfig", DEFAULT_CLINIC_CONFIG),
  saveClinicConfig: (item: ClinicConfig) => {
    setLocal("clinicConfig", item);
  },
};
