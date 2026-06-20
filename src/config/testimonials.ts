export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  comment: string;
  date: string;
}

export const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Vanessa Gontijo",
    role: "Empresária",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150",
    rating: 5,
    comment: "A Luxe Estética é simplesmente espetacular! Desde a recepção com champagne até o atendimento médico impecável da Dra. Beatriz. Os resultados do Lavieen transformaram a minha pele. Indico de olhos fechados!",
    date: "2026-05-18"
  },
  {
    id: "t2",
    name: "Carla Pinheiro",
    role: "Advogada",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=150",
    rating: 5,
    comment: "Fiz o protocolo de Criolipólise com a Dra. Heloísa e foi maravilhoso. A clínica tem equipamentos de última geração e um ambiente muito acolhedor e luxuoso. Vale cada centavo investido.",
    date: "2026-06-02"
  },
  {
    id: "t3",
    name: "Patrícia Peixoto",
    role: "Influenciadora Digital",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150",
    rating: 5,
    comment: "O preenchimento e botox que fiz com a Dra. Beatriz ficaram super naturais! Todo mundo comenta que estou com ar descansado, mas ninguém percebe que fiz procedimento. É exatamente o que eu buscava.",
    date: "2026-06-12"
  }
];
