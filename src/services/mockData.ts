export interface Procedure {
  id: string;
  name: string;
  category: "facial" | "corporal" | "laser" | "avancada";
  description: string;
  benefits: string[];
  duration: number; // in minutes
  price?: number;
  contraindications: string[];
  faq: { question: string; answer: string }[];
  image: string;
}

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

export interface Professional {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  rating: number;
  bio: string;
  availableHours: string[];
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  procedureId: string;
  procedureName: string;
  professionalId: string;
  professionalName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: "confirmado" | "pendente" | "cancelado";
  price: number;
  notes?: string;
}

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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  comment: string;
  date: string;
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

export interface FinancialRecord {
  id: string;
  type: "entrada" | "saida";
  description: string;
  value: number;
  date: string;
  category: string;
}

export interface ClinicConfig {
  name: string;
  tagline: string;
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
  instagram: string;
  facebook: string;
  youtube: string;
  googleAnalyticsId: string;
  metaPixelId: string;
}

// Initial Data
export const INITIAL_PROCEDURES: Procedure[] = [
  {
    id: "p1",
    name: "Harmonização Facial",
    category: "facial",
    description: "Conjunto de procedimentos estéticos que visam equilibrar os traços do rosto, promovendo o rejuvenescimento e realçando a beleza natural com o uso de ácido hialurônico e bioestimuladores.",
    benefits: [
      "Melhora da simetria facial",
      "Definição do contorno da mandíbula",
      "Suavização de sulcos e rugas profundas",
      "Rejuvenescimento imediato e natural"
    ],
    duration: 60,
    price: 3200,
    contraindications: [
      "Gestantes e lactantes",
      "Doenças autoimunes ativas",
      "Infecção no local da aplicação"
    ],
    faq: [
      {
        question: "Quanto tempo dura a Harmonização?",
        answer: "Os resultados costumam durar de 12 a 18 meses, dependendo do organismo do paciente e da quantidade de produto utilizada."
      },
      {
        question: "O procedimento é doloroso?",
        answer: "Utilizamos anestésicos locais altamente eficazes e agulhas muito finas (ou microcânulas), tornando o procedimento bastante tolerável."
      }
    ],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800"
  },
  {
    id: "p2",
    name: "Toxina Botulínica (Botox)",
    category: "facial",
    description: "Tratamento para prevenção e suavização de linhas de expressão dinâmicas (testa, glabela e 'pés de galinha') por meio do relaxamento temporário da musculatura facial.",
    benefits: [
      "Prevenção de rugas estáticas profundas",
      "Aspecto de descanso e rejuvenescimento facial",
      "Resultados rápidos em poucos dias",
      "Procedimento rápido e sem pós-operatório"
    ],
    duration: 30,
    price: 1200,
    contraindications: [
      "Alergia à toxina botulínica",
      "Gestantes e lactantes",
      "Doenças neuromusculares (ex: Miastenia Gravis)"
    ],
    faq: [
      {
        question: "Quando começam a surgir os efeitos?",
        answer: "Os resultados começam a aparecer entre 2 e 5 dias, com efeito máximo atingido em até 15 dias após a aplicação."
      },
      {
        question: "De quanto em quanto tempo devo reaplicar?",
        answer: "A recomendação é realizar a aplicação a cada 4 a 6 meses para manter os resultados preventivos."
      }
    ],
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800"
  },
  {
    id: "p3",
    name: "Laser Lavieen (Efeito BB Laser)",
    category: "laser",
    description: "Tecnologia de laser de túlio que restaura o viço, brilho e uniformidade da pele. Trata manchas, melasma, poros abertos e cicatrizes de acne com tempo mínimo de recuperação.",
    benefits: [
      "Efeito 'BB Cream' permanente",
      "Clareamento significativo de manchas e melasma",
      "Fechamento de poros e melhora da textura da pele",
      "Estímulo potente de colágeno na derme"
    ],
    duration: 45,
    price: 850,
    contraindications: [
      "Pele bronzeada recentemente",
      "Infecções ativas na área tratada",
      "Uso de isotretinoína há menos de 6 meses"
    ],
    faq: [
      {
        question: "A pele descama muito após o procedimento?",
        answer: "Ocorre uma descamação muito fina, semelhante a uma poeira na pele, que dura cerca de 3 a 5 dias. É facilmente disfarçada com hidratante."
      },
      {
        question: "Quantas sessões são necessárias?",
        answer: "Muitos pacientes notam melhora na primeira sessão, mas recomendamos protocolos de 3 a 5 sessões para resultados extraordinários e duradouros."
      }
    ],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800"
  },
  {
    id: "p4",
    name: "Bioestimulador de Colágeno (Sculptra)",
    category: "avancada",
    description: "Injeção de ácido poli-L-lático que atua nas camadas profundas da pele para estimular a produção natural de colágeno do próprio organismo, tratando a flacidez facial e corporal de dentro para fora.",
    benefits: [
      "Combate intenso à flacidez e perda de firmeza",
      "Restauração do volume facial de forma sutil",
      "Melhora global da espessura e qualidade da pele",
      "Efeito rejuvenescedor gradual de longa duração"
    ],
    duration: 45,
    price: 2600,
    contraindications: [
      "Infecção cutânea ativa na área",
      "Tendência a queloides",
      "Gestantes e lactantes"
    ],
    faq: [
      {
        question: "Quando vejo o resultado final?",
        answer: "Por ser um estímulo biológico, o resultado surge de forma gradual, com ápice em torno de 3 meses após a última sessão."
      },
      {
        question: "Quantas sessões preciso fazer?",
        answer: "A recomendação geral é de 2 a 3 sessões, espaçadas com 30 dias de intervalo, dependendo do grau de flacidez."
      }
    ],
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800"
  },
  {
    id: "p5",
    name: "Criolipólise de Contraste",
    category: "corporal",
    description: "Tratamento inovador que combina períodos de aquecimento e resfriamento para cristalizar e eliminar as células de gordura localizada de forma segura e não invasiva.",
    benefits: [
      "Redução de até 30% da gordura localizada na região tratada",
      "Método seguro, aprovado pelos órgãos de saúde",
      "Eliminação natural da gordura pelo sistema linfático",
      "Não requer repouso ou afastamento das atividades cotidianas"
    ],
    duration: 90,
    price: 900,
    contraindications: [
      "Hérnia no local da aplicação",
      "Sensibilidade excessiva ao frio (Urticária ao frio)",
      "Crioglobulinemia"
    ],
    faq: [
      {
        question: "O procedimento dói?",
        answer: "Nos primeiros 10 minutos sente-se um puxão firme (vácuo) e um frio intenso. Logo após, a região fica dormente e o processo torna-se confortável."
      },
      {
        question: "Em quanto tempo vejo os resultados?",
        answer: "Os resultados começam a ficar visíveis a partir de 15 dias, atingindo o efeito máximo em aproximadamente 90 dias."
      }
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800"
  }
];

export const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: "dr1",
    name: "Dra. Beatriz Calisto",
    role: "Dermatologista & Fundadora",
    specialty: "Harmonização e Laser Avançado",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600",
    rating: 4.9,
    bio: "Graduada em Medicina pela USP com residência em Dermatologia. Especialista internacional em rejuvenescimento facial e tratamentos com laser. Há mais de 10 anos transformando vidas com ética e naturalidade.",
    availableHours: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]
  },
  {
    id: "dr2",
    name: "Dra. Heloísa Nogueira",
    role: "Fisioterapeuta Dermato-Funcional",
    specialty: "Corporal & Alta Tecnologia",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600",
    rating: 4.8,
    bio: "Pós-graduada em Fisioterapia Dermato-Funcional. Especialista em tratamento de gordura localizada, flacidez corporal e reabilitação estética. Referência em protocolos combinados de alta performance.",
    availableHours: ["09:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30"]
  },
  {
    id: "dr3",
    name: "Dra. Mariana Costa",
    role: "Esteticista Facial Avançada",
    specialty: "Cosmetologia & Tratamentos Premium",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
    rating: 4.9,
    bio: "Esteticista com formação em cosmetologia e peelings regeneradores. Dedicada a restaurar a barreira cutânea e potencializar o viço da pele através de terapias manuais e microcorrentes.",
    availableHours: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  }
];

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
  },
  {
    id: "c3",
    name: "Roberto Silveira Diniz",
    phone: "(11) 96666-5555",
    whatsapp: "(11) 96666-5555",
    email: "roberto.diniz@email.com",
    birthDate: "1979-11-05",
    observations: "Buscando rejuvenescimento facial. Primeira vez realizando procedimentos injetáveis.",
    createdAt: "2026-03-10T16:15:00Z"
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
    professionalId: "dr1",
    professionalName: "Dra. Beatriz Calisto",
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
    professionalId: "dr2",
    professionalName: "Dra. Heloísa Nogueira",
    date: "2026-06-20",
    time: "14:30",
    status: "confirmado",
    price: 900,
    notes: "Aplicação na região abdominal inferior."
  },
  {
    id: "a3",
    clientId: "c3",
    clientName: "Roberto Silveira Diniz",
    clientPhone: "(11) 96666-5555",
    procedureId: "p1",
    procedureName: "Harmonização Facial",
    professionalId: "dr1",
    professionalName: "Dra. Beatriz Calisto",
    date: "2026-06-21",
    time: "11:00",
    status: "pendente",
    price: 3200,
    notes: "Avaliação inicial e preenchimento de mento/mandíbula."
  },
  {
    id: "a4",
    clientId: "c1",
    clientName: "Mariana Souza Albuquerque",
    clientPhone: "(11) 98888-7777",
    procedureId: "p3",
    procedureName: "Laser Lavieen (Efeito BB Laser)",
    professionalId: "dr1",
    professionalName: "Dra. Beatriz Calisto",
    date: "2026-06-23",
    time: "16:00",
    status: "pendente",
    price: 850,
    notes: "Tratamento de poros abertos e melasma."
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
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

export const INITIAL_BEFORE_AFTER: BeforeAfterItem[] = [
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
    afterImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600", // Soft lighting representative of healthy body contouring
    createdAt: "2026-04-10"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
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

export const INITIAL_BLOG: BlogPost[] = [
  {
    id: "b1",
    title: "O Segredo do Efeito BB Laser: Tudo sobre o Laser Lavieen",
    slug: "segredo-efeito-bb-laser-lavieen",
    summary: "Descubra como essa tecnologia inovadora de laser de túlio está revolucionando as clínicas de estética com sua promessa de pele radiante e livre de imperfeições com recuperação rápida.",
    content: "<p>O <strong>Laser Lavieen</strong> tornou-se a grande estrela dos consultórios dermatológicos em todo o mundo. Conhecido popularmente como o 'BB Laser', ele reproduz o efeito dos cremes BB Cream na pele: uniformidade instantânea, brilho saudável e fechamento de poros, mas com duração prolongada.</p><p>Trata-se de um laser de túlio sub-ablativo de 1927 nm, com alta afinidade pela água da pele. Sua tecnologia penetra suavemente na epiderme e derme superficial, estimulando a renovação celular celular intensa e a produção acelerada de colágeno.</p><h3>Os Principais Benefícios</h3><ul><li>Clareamento de manchas persistentes, incluindo o melasma;</li><li>Uniformização do tom da pele;</li><li>Suavização de rugas finas e linhas de expressão;</li><li>Redução de poros dilatados e melhora das cicatrizes de acne.</li></ul><p>O grande diferencial do Lavieen é o seu 'downtime' (tempo de recuperação) extremamente curto. Diferente de lasers mais agressivos, o paciente pode voltar ao trabalho imediatamente após a aplicação, apenas mantendo a hidratação e o uso indispensável do protetor solar.</p>",
    author: "Dra. Beatriz Calisto",
    date: "2026-05-10",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800",
    readTime: "4 min"
  },
  {
    id: "b2",
    title: "Como Cuidar da Pele Após Aplicação de Toxina Botulínica",
    slug: "cuidados-pos-botox-linhas-expressao",
    summary: "Quer garantir que seu botox dure o máximo possível? Confira as principais dicas e recomendações médicas fundamentais para o período pós-aplicação imediato.",
    content: "<p>A aplicação de <strong>toxina botulínica</strong> é um procedimento rápido, mas que requer alguns cuidados simples para assegurar que a toxina se instale adequadamente nos receptores musculares e garanta um resultado durável.</p><p>Nas primeiras 4 a 6 horas após a aplicação, é crucial evitar abaixar a cabeça, massagear o rosto ou realizar deitar-se. Manter a postura ereta evita que o produto migre para outras áreas musculares indesejadas.</p><h3>Dicas de Ouro pós-Botox</h3><ul><li>Não realize exercícios físicos intensos nas primeiras 24 horas;</li><li>Evite exposição solar intensa e saunas por pelo menos 3 dias;</li><li>Não massageie as áreas aplicadas ao passar protetor ou hidratante no primeiro dia.</li></ul><p>Lembre-se também de que o tabagismo e a alta exposição aos raios UV aceleram a degradação do colágeno e diminuem a longevidade dos resultados estéticos.</p>",
    author: "Dra. Beatriz Calisto",
    date: "2026-05-28",
    category: "Dicas de Cuidados",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800",
    readTime: "3 min"
  },
  {
    id: "b3",
    title: "Bioestimuladores de Colágeno: O que são e quando começar?",
    slug: "bioestimuladores-de-colageno-flacidez",
    summary: "Com o passar dos anos, a produção de colágeno diminui drasticamente. Entenda como bioestimuladores como Sculptra e Radiesse devolvem a firmeza e sustentação.",
    content: "<p>A partir dos 25 anos, nosso corpo reduz gradualmente a síntese de colágeno em cerca de 1% ao ano. Para combater a flacidez facial e corporal decorrente desse processo, os <strong>bioestimuladores de colágeno</strong> tornaram-se ferramentas indispensáveis na estética de alta performance.</p><p>Substâncias como o Ácido Poli-L-Lático (comercialmente conhecido como Sculptra) e a Hidroxiapatita de Cálcio (Radiesse) são injetadas em pontos estratégicos para provocar uma reação inflamatória controlada na derme. Essa reação estimula os fibroblastos a produzirem colágeno novo, restaurando a firmeza estrutural e a elasticidade.</p>",
    author: "Dra. Heloísa Nogueira",
    date: "2026-06-15",
    category: "Estética Avançada",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800",
    readTime: "5 min"
  }
];

export const INITIAL_FINANCIAL: FinancialRecord[] = [
  { id: "f1", type: "entrada", description: "Harmonização Facial - Mariana Souza", value: 3200, date: "2026-06-20", category: "Procedimentos" },
  { id: "f2", type: "entrada", description: "Botox - Vanessa Gontijo", value: 1200, date: "2026-06-20", category: "Procedimentos" },
  { id: "f3", type: "saida", description: "Compra de Ácido Hialurônico (Galderma)", value: 1800, date: "2026-06-18", category: "Insumos" },
  { id: "f4", type: "entrada", description: "Criolipólise - Clara Mendes", value: 900, date: "2026-06-20", category: "Procedimentos" },
  { id: "f5", type: "saida", description: "Aluguel da Sala Comercial", value: 4500, date: "2026-06-05", category: "Operacional" },
  { id: "f6", type: "saida", description: "Marketing e Anúncios Instagram", value: 1500, date: "2026-06-10", category: "Marketing" },
  { id: "f7", type: "entrada", description: "Laser Lavieen - Júlia Martins", value: 850, date: "2026-06-19", category: "Procedimentos" },
  { id: "f8", type: "entrada", description: "Bioestimulador Sculptra - Patrícia Peixoto", value: 2600, date: "2026-06-19", category: "Procedimentos" }
];

export const DEFAULT_CLINIC_CONFIG: ClinicConfig = {
  name: "Luxe Estética Premium",
  tagline: "A arte de realçar sua beleza natural com exclusividade e alta tecnologia.",
  phone: "(11) 3333-4444",
  whatsapp: "(11) 99999-8888",
  email: "contato@luxeestetica.com.br",
  address: "Av. Brigadeiro Faria Lima, 4200 - Bloco A, Conj. 1201 - Itaim Bibi, São Paulo - SP",
  workingHours: {
    weekdays: "Segunda a Sexta: 08:00 às 20:00",
    saturday: "Sábado: 09:00 às 15:00",
    sunday: "Fechado"
  },
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3656.326261543781!2d-46.68536852372728!3d-23.592615878782046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5745199676e1%3A0xc3c5f21fe1f1cb4f!2sAv.%20Brig.%20Faria%20Lima%20-%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1718918239018!5m2!1spt-BR!2sbr",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  googleAnalyticsId: "G-XXXXXXXXXX",
  metaPixelId: "PX-XXXXXXXXXX"
};
