import { clinicConfig, ClinicConfig } from "@/config/clinic-config";
import { initialProcedures, Procedure } from "@/config/procedures";
import { initialTestimonials, Testimonial } from "@/config/testimonials";
import { initialGallery, initialBeforeAfter, GalleryItem, BeforeAfterItem } from "@/config/gallery";

export type { ClinicConfig, Procedure, Testimonial, GalleryItem, BeforeAfterItem };

export interface Client {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  birthDate: string;
  observations: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  procedureId: string;
  procedureName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: "confirmado" | "pendente" | "cancelado";
  price: number;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

// Initial Data mapped from clinic config files
export const INITIAL_PROCEDURES: Procedure[] = initialProcedures;
export const INITIAL_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Mariana Souza Albuquerque",
    phone: "(11) 98888-7777",
    whatsapp: "(11) 98888-7777",
    email: "mariana.albuquerque@email.com",
    birthDate: "1988-04-12",
    observations: "Paciente possui leve melasma na bochecha esquerda. Realizou Botox e tem interesse no Laser Lavieen.",
    createdAt: "2026-01-15T10:30:00Z"
  },
  {
    id: "c2",
    name: "Clara Mendes Peixoto",
    phone: "(11) 97777-6666",
    whatsapp: "(11) 97777-6666",
    email: "clara.peixoto@email.com",
    birthDate: "1994-09-22",
    observations: "Pele sensível. Alérgica a fragrâncias fortes. Em tratamento de gordura localizada com Criolipólise.",
    createdAt: "2026-02-20T14:45:00Z"
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    clientId: "c1",
    clientName: "Mariana Souza Albuquerque",
    clientPhone: "(11) 98888-7777",
    procedureId: "p2",
    procedureName: "Toxina Botulínica (Botox)",
    date: "2026-06-20",
    time: "10:00",
    status: "confirmado",
    price: 1200,
    notes: "Aplicação preventiva de botox na testa e glabela."
  },
  {
    id: "a2",
    clientId: "c2",
    clientName: "Clara Mendes Peixoto",
    clientPhone: "(11) 97777-6666",
    procedureId: "p5",
    procedureName: "Criolipólise de Contraste",
    date: "2026-06-20",
    time: "14:30",
    status: "confirmado",
    price: 900,
    notes: "Aplicação na região abdominal inferior."
  }
];

export const INITIAL_GALLERY: GalleryItem[] = initialGallery;
export const INITIAL_BEFORE_AFTER: BeforeAfterItem[] = initialBeforeAfter;
export const INITIAL_TESTIMONIALS: Testimonial[] = initialTestimonials;

export const INITIAL_BLOG: BlogPost[] = [
  {
    id: "b1",
    title: "O Segredo do Efeito BB Laser: Tudo sobre o Laser Lavieen",
    slug: "segredo-efeito-bb-laser-lavieen",
    summary: "Descubra como essa tecnologia inovadora de laser de túlio está revolucionando as clínicas de estética com sua promessa de pele radiante e livre de imperfeições com recuperação rápida.",
    content: "<p>O <strong>Laser Lavieen</strong> tornou-se a grande estrela dos consultórios dermatológicos em todo o mundo. Conhecido popularmente como o 'BB Laser', ele reproduz o efeito dos cremes BB Cream na pele: uniformidade instantânea, brilho saudável e fechamento de poros, mas com duração prolongada.</p><p>Trata-se de um laser de túlio sub-ablativo de 1927 nm, com alta afinidade pela água da pele. Sua tecnologia penetra suavemente na epiderme e derme superficial, estimulando a renovação celular celular intensa e a produção acelerada de colágeno.</p><h3>Os Principais Benefícios</h3><ul><li>Clareamento de manchas persistentes, incluindo o melasma;</li><li>Uniformização do tom da pele;</li><li>Suavização de sulcos e rugas finas;</li><li>Redução de poros dilatados e melhora das cicatrizes de acne.</li></ul><p>O grande diferencial do Lavieen é o seu 'downtime' (tempo de recuperação) extremamente curto. Diferente de lasers mais agressivos, o paciente pode voltar ao trabalho imediatamente após a aplicação, apenas mantendo a hidratação e o uso indispensável do protetor solar.</p>",
    author: "Luxe Concierge",
    date: "2026-05-10",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800",
    readTime: "4 min"
  }
];

export const DEFAULT_CLINIC_CONFIG: ClinicConfig = clinicConfig;
