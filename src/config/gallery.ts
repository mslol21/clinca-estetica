export interface GalleryItem {
  id: string;
  title: string;
  category: "facial" | "corporal" | "laser" | "avancada" | "clinica";
  image: string;
  createdAt: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: "facial" | "corporal" | "laser" | "avancada";
  description: string;
  beforeImage: string;
  afterImage: string;
  createdAt: string;
}

export const initialGallery: GalleryItem[] = [
  {
    id: "g1",
    title: "Sala de Atendimento Premium",
    category: "clinica",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800",
    createdAt: "2026-01-10"
  },
  {
    id: "g2",
    title: "Recepção e Lounge de Espera",
    category: "clinica",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800",
    createdAt: "2026-01-12"
  },
  {
    id: "g3",
    title: "Aplicação de Microagulhamento",
    category: "avancada",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800",
    createdAt: "2026-02-05"
  },
  {
    id: "g4",
    title: "Sessão de Massagem Modeladora",
    category: "corporal",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    createdAt: "2026-02-18"
  },
  {
    id: "g5",
    title: "Equipamento Laser Lavieen",
    category: "laser",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800",
    createdAt: "2026-03-01"
  }
];

export const initialBeforeAfter: BeforeAfterItem[] = [
  {
    id: "ba1",
    title: "Rejuvenescimento com Laser Lavieen",
    category: "laser",
    description: "Resultado de melhora na textura cutânea, redução de poros e melasma após 3 sessões de Laser Lavieen.",
    beforeImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    afterImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600",
    createdAt: "2026-03-15"
  },
  {
    id: "ba2",
    title: "Tratamento de Gordura Localizada",
    category: "corporal",
    description: "Redução de medidas na região abdominal após 1 sessão de Criolipólise de Contraste e 4 sessões de Drenagem.",
    beforeImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
    afterImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600",
    createdAt: "2026-04-10"
  }
];
