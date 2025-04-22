import {
  mobile,
  backend,
  creator,
  forchela,
  verona,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  python,
  carrent,
  siteverona,
  siteforchela,
  trendy,
  jobit,
  tripguide,
  threejs,
  virus
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Pentester",
    icon: virus,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "python",
    icon: python,
  },
];

const experiences = [
  {
    title: "Desenvolvedor Web React + Django",
    company_name: "Forchela Arte & Ferro",
    icon: forchela,
    iconBg: "#383E56",
    date: "Ago de 2022 - Out de 2022",
    points: [
      "Desenvolver e fornecer manuntenção a um site institucional",
      "Colaborando com profissionais parceiros do Web Design",
      "Implementando Design Responsivo e Banco de dados em PostgreSQL com Django",
      "Fornecendo atualizações constantes ao cliente e recebendo feedbacks construtivos",
    ],
  },
  {
    title: "Desenvolvedor Web React",
    company_name: "Portas de Aço Verona",
    icon: verona,
    iconBg: "#E6DEDD",
    date: "Dez 2021 - Ago 2022",
    points: [
      "Desenvolver e fornecer manuntenção a um site institucional",
      "Colaborando com profissionais parceiros do Web Design",
      "Implementando Design Responsivo, SEO e Google Tag Manager",
      "Fornecendo atualizações constantes ao cliente e recebendo feedbacks construtivos",
    ],
  },

];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Site Forchela",
    description:
      "Plataforma Institucional da empresa Forchela Arte & Ferro, desenvolvido para melhorar o sistema de orçamento da empresa.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "postgreSQL",
        color: "green-text-gradient",
      },
      {
        name: "django",
        color: "pink-text-gradient",
      },
    ],
    image: siteforchela,
    source_code_link: "https://github.com/Ilan-dev0/portfolio-forchela",
  },
  {
    name: "Site Verona",
    description:
      "Aplicação web da empresa Verona Portas de Aço, desenvolvido para melhorar o design da antiga versão do mesmo.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: siteverona,
    source_code_link: "https://github.com/Ilan-dev0/projeto-verona",
  },
  {
    name: "Trendy App",
    description:
      "Um aplicativo mobile desenvolvido em React Native para os usuários de redes sociais, contendo um algoritmo que apresenta as atuais tendencias das redes sobre Videos, Filmes, Animes, Livros e Música.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "node.js",
        color: "green-text-gradient",
      },
      {
        name: "restapi",
        color: "pink-text-gradient",
      },
    ],
    image: trendy,
    source_code_link: "https://github.com/Ilan-dev0/TrendyApp",
  },
];

export { services, technologies, experiences, testimonials, projects };

export const skills = [
  {
    label: "HTML 5",
    value: 99,
    icon: html,
  },
  {
    label: "CSS 3",
    value: 99,
    icon: css,
  },
  {
    label: "JavaScript",
    value: 85,
    icon: javascript,
  },
  {
    label: "React JS",
    value: 75,
    icon: reactjs,
  },
  {
    label: "Redux Toolkit",
    value: 25,
    icon: redux,
  },
  {
    label: "Tailwind CSS",
    value: 65,
    icon: tailwind,
  },
  {
    label: "Node JS",
    value: 70,
    icon: nodejs,
  },
  {
    label: "Three JS",
    value: 45,
    icon: threejs,
  },
  {
    label: "git",
    value: 85,
    icon: git,
  },
  {
    label: "figma",
    value: 55,
    icon: figma,
  },
  {
    label: "python",
    value: 60,
    icon: python,
  },
  {
    label: "TypeScript",
    value: 70,
    icon: typescript,
  },
];

// Exporte suas outras constantes aqui, se houver
export const otherConstant = 'valor';
