export interface ClinicConfig {
  name: string;
  slogan: string;
  logoText: string;
  logoImage?: string;
  heroImage?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsUrl: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  integrations: {
    googleAnalyticsId?: string;
    metaPixelId?: string;
  };
  about: {
    essence: string;
    storyTitle: string;
    storyYearText: string;
    storySubtitle: string;
    storyParagraphs: string[];
    mission: string;
    vision: string;
    values: string;
    infraTag: string;
    infraTitle: string;
    infraParagraphs: string[];
  };
}

export const clinicConfig: ClinicConfig = {
  name: "Luxe Estética Premium",
  slogan: "A arte de realçar sua beleza natural com exclusividade e alta tecnologia.",
  logoText: "Luxe",
  phone: "(11) 3333-4444",
  whatsapp: "(11) 99999-8888",
  email: "contato@luxeestetica.com.br",
  address: "Av. Brigadeiro Faria Lima, 4200 - Bloco A, Conj. 1201 - Itaim Bibi, São Paulo - SP",
  workingHours: {
    weekdays: "Segunda a Sexta: 08:00 às 20:00",
    saturday: "Sábado: 09:00 às 15:00",
    sunday: "Fechado",
  },
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3656.326261543781!2d-46.68536852372728!3d-23.592615878782046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5745199676e1%3A0xc3c5f21fe1f1cb4f!2sAv.%20Brig.%20Faria%20Lima%20-%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1718918239018!5m2!1spt-BR!2sbr",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  seo: {
    title: "Luxe Estética Premium | Harmonização, Botox e Alta Tecnologia",
    description: "Clínica de estética de luxo em São Paulo. Especialista em Harmonização Facial, Botox, Laser Lavieen e rejuvenescimento corporal de alto padrão.",
    keywords: ["clinica de estetica de luxo", "estetica premium", "harmonizacao facial faria lima", "botox sao paulo", "laser lavieen"],
    ogImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800",
  },
  integrations: {
    googleAnalyticsId: "G-XXXXXXXXXX",
    metaPixelId: "PX-XXXXXXXXXX",
  },
  about: {
    essence: "Uma clínica boutique idealizada para oferecer o máximo em sofisticação, segurança clínica e resultados estéticos personalizados.",
    storyTitle: "Uma história guiada pelo amor à beleza natural e à ciência",
    storyYearText: "Desde 2016",
    storySubtitle: "Uma história guiada pelo amor à beleza natural e à ciência",
    storyParagraphs: [
      "A Luxe Estética Premium nasceu em 2016 da visão da Dra. Beatriz Calisto, que percebeu no mercado a necessidade de uma clínica estética que integrasse a segurança e ética da medicina dermatológica ao acolhimento personalizado de um concierge de luxo.",
      "Iniciamos como um pequeno consultório e, em poucos anos, nos tornamos referência em tratamentos estéticos não-invasivos. Nosso diferencial reside no compromisso inegociável de manter a individualidade de cada paciente, combatendo os exageros e entregando rejuvenescimento que harmoniza com as características originais.",
      "Hoje, contamos com uma equipe multidisciplinar capacitada nas tecnologias mais consagradas do mundo, proporcionando protocolos individualizados sob rigorosos critérios científicos."
    ],
    mission: "Proporcionar bem-estar, autoestima e rejuvenescimento saudável através de procedimentos estéticos de alta performance, com ética, segurança e total personalização.",
    vision: "Ser reconhecida nacionalmente como a principal marca boutique de estética premium, liderando em tecnologia, elegância e humanização dos tratamentos.",
    values: "Ética médica inflexível, naturalidade nos resultados, exclusividade no relacionamento concierge, inovação científica e compromisso com a biossegurança.",
    infraTag: "Infraestrutura de Alto Padrão",
    infraTitle: "Um ambiente projetado para aguçar seus sentidos",
    infraParagraphs: [
      "Cada detalhe da clínica foi planejado para oferecer uma experiência acolhedora. Da escolha das cores neutras e nudes ao aroma suave de baunilha e orquídea que permeia o ambiente, sua visita torna-se um ritual de autocuidado e desconexão.",
      "Contamos com consultórios equipados com macas elétricas aquecidas com controle ergonômico, sistemas de climatização por sala com filtragem de ar avançada e lavatórios privativos integrados.",
      "Dispomos também de um espaço de relaxamento pós-procedimento onde servimos um menu cortesia de infusões orgânicas, cafés especiais e espumante brut, permitindo que você se recupere com toda a privacidade antes de retomar suas atividades diárias."
    ]
  }
};
