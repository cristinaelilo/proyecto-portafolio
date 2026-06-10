export interface Programmer {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  github: string;
  linkedin: string;
  tech: string[];
  gradient: string;
  photo: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  emoji: string;
  gradient: string;
  repo: string;
  demo?: string;
  tipo?: string;
  destacado?: boolean;
  // Relación con programadoras (array de IDs)
  programadores?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const PROGRAMMERS: Programmer[] = [
  {
    id: 'cristina-loja',
    name: 'Cristina Loja',
    role: 'Frontend / UI',
    bio: 'Estudiante de Ciencias de la Computación en la Universidad Politécnica Salesiana. Me especializo en desarrollo web moderno utilizando Angular, React y Astro. Me apasiona el diseño de interfaces atractivas y la creación de experiencias digitales innovadoras.',
    initials: 'CL',
    github: 'https://github.com/cristinaelilo',
    linkedin: 'https://linkedin.com/',
    tech: ['Angular', 'React', 'Tailwind CSS', 'TypeScript', 'Figma', 'UI/UX'],
    gradient: 'from-fuchsia-500 to-violet-500',
    photo: 'cristina.png'
  },
  {
    id: 'denisse-paredes',
    name: 'Denisse Paredes',
    role: 'Backend / Firebase',
    bio: 'Desarrolladora backend especializada en arquitecturas escalables, APIs e integración Firebase. Apasionada por construir sistemas robustos y eficientes que escalen con el negocio.',
    initials: 'DP',
    github: 'https://github.com/Pestefania',
    linkedin: 'https://linkedin.com/',
    tech: ['Node.js', 'Firebase', 'Firestore', 'Auth', 'Cloud Functions', 'REST APIs'],
    gradient: 'from-blue-500 to-cyan-500',
    photo: 'denisse.png'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'PPW Angular',
    description: 'Aplicación web desarrollada con Angular. Implementa componentes standalone, routing, signals, formularios y diseño moderno.',
    tech: ['Angular', 'TypeScript', 'Tailwind CSS'],
    emoji: '🅰️',
    gradient: 'from-red-500 to-pink-500',
    repo: 'https://github.com/cristinaelilo/icc-p68-ppw-angular',
    tipo: 'académico',
    destacado: true,
    // Ambas programadoras participaron
    programadores: ['cristina-loja', 'denisse-paredes']
  },
  {
    id: 'p2',
    name: 'PPW React',
    description: 'Proyecto web desarrollado con React utilizando componentes reutilizables, hooks y navegación dinámica.',
    tech: ['React', 'JavaScript', 'CSS'],
    emoji: '⚛️',
    gradient: 'from-cyan-500 to-blue-500',
    repo: 'https://github.com/cristinaelilo/icc-p68-ppw-react',
    tipo: 'académico',
    destacado: true,
    programadores: ['cristina-loja']
  },
  {
    id: 'p3',
    name: 'PPW Astro',
    description: 'Sitio web construido con Astro optimizando rendimiento, carga rápida y generación de contenido moderno.',
    tech: ['Astro', 'HTML', 'CSS'],
    emoji: '🚀',
    gradient: 'from-orange-500 to-purple-500',
    repo: 'https://github.com/cristinaelilo/icc-p68-ppw-astro',
    tipo: 'académico',
    destacado: false,
    programadores: ['cristina-loja']
  },
  {
    id: 'p4',
    name: 'PPW JavaScript',
    description: 'Aplicación web desarrollada con JavaScript puro aplicando manipulación del DOM, eventos y consumo de datos.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    emoji: '🟨',
    gradient: 'from-yellow-400 to-orange-500',
    repo: 'https://github.com/cristinaelilo/icc-p68-ppw-js',
    tipo: 'académico',
    destacado: false,
    programadores: ['denisse-paredes']
  },
  {
    id: 'p5',
    name: 'API REST Firebase',
    description: 'API escalable con Firebase Cloud Functions, Firestore y autenticación JWT. Incluye CRUD completo y reglas de seguridad.',
    tech: ['Firebase', 'Node.js', 'Firestore', 'Auth'],
    emoji: '🔥',
    gradient: 'from-orange-500 to-red-500',
    repo: 'https://github.com/Pestefania',
    tipo: 'personal',
    destacado: true,
    programadores: ['denisse-paredes']
  }
];

export const SERVICES: Service[] = [
  { id: 's1', title: 'Desarrollo Frontend', description: 'Interfaces modernas y responsivas con Angular, React y Tailwind.', icon: '✨' },
  { id: 's2', title: 'Desarrollo Backend', description: 'APIs robustas con Node.js, Firebase y arquitecturas escalables.', icon: '⚙️' },
  { id: 's3', title: 'Diseño UI/UX', description: 'Diseño centrado en el usuario, prototipado en Figma y sistemas de diseño.', icon: '🎨' },
  { id: 's4', title: 'Integración Firebase', description: 'Auth, Firestore, Cloud Functions y Firebase Hosting.', icon: '🔥' }
];
