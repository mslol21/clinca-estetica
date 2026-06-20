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

export const initialProcedures: Procedure[] = [
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
