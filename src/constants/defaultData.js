export const sampleCVData = {
  personalInfo: {
    fullName: "Lucía Florencia Benítez",
    title: "Estudiante de Ingeniería en Informática | Desarrolladora Jr.",
    email: "lucia.benitez@estudiantes.unlam.edu.ar",
    phone: "+54 9 11 3456-7890",
    location: "San Justo, Buenos Aires",
    linkedin: "linkedin.com/in/lucia-benitez",
    github: "github.com/lucia-benitez",
    dni: "",
    birthDate: "",
    photoUrl: "", // Optional user uploaded base64 photo
    showPhoto: true,
  },
  summary: "Estudiante de 3er año de Ingeniería en Informática en la Universidad Nacional de La Matanza (UNLaM), con sólida base en estructuras de datos, desarrollo frontend (React, JavaScript) y bases de datos SQL. Proactiva, con marcado interés en la resolución de problemas y el trabajo colaborativo en equipos multidisciplinarios. Busco incorporarme a un equipo dinámico mediante una pasantía o posición Jr. en el marco de la Expo Empleo.",
  education: [
    {
      id: "edu-1",
      degree: "Ingeniería en Informática",
      institution: "Universidad Nacional de La Matanza (UNLaM)",
      status: "En curso (3er año - 60% aprobado)",
      startDate: "2022",
      endDate: "Actualidad",
      description: "Promedio académico: 8.40. Participación en proyectos de cátedra de Programación Web y Algoritmos."
    },
    {
      id: "edu-2",
      degree: "Técnico en Informática Personal y Profesional",
      institution: "Escuela de Educación Secundaria Técnica",
      status: "Graduado",
      startDate: "2016",
      endDate: "2021",
      description: "Orientación en desarrollo de software y mantenimiento de sistemas."
    }
  ],
  experience: [
    {
      id: "exp-1",
      position: "Desarrolladora Web Trainee / Pasantía",
      company: "Estudio Digital Innovar",
      startDate: "Marzo 2024",
      endDate: "Actualidad",
      current: true,
      description: "• Desarrollo y maquetación de interfaces responsivas utilizando React y Tailwind CSS.\n• Consumo de APIs RESTful e integración con bases de datos relacionales (PostgreSQL).\n• Colaboración en equipo utilizando control de versiones Git y metodologías ágiles Scrum."
    },
    {
      id: "exp-2",
      position: "Asistente Técnica y Soporte",
      company: "Soluciones Informáticas Oeste",
      startDate: "Junio 2023",
      endDate: "Diciembre 2023",
      current: false,
      description: "• Diagnóstico y resolución de incidencias de hardware y software.\n• Soporte al usuario y configuración de redes locales (LAN)."
    }
  ],
  courses: [
    {
      id: "crs-1",
      title: "Desarrollo Frontend Moderno con React",
      institution: "Capacitación Centro de Estudiantes UNLaM",
      year: "2024",
      hours: "40 hs"
    },
    {
      id: "crs-2",
      title: "Bases de Datos Relacionales y SQL Avanzado",
      institution: "Plataforma de Formación Profesional",
      year: "2023",
      hours: "30 hs"
    }
  ],
  skills: {
    technical: [
      "JavaScript (ES6+)",
      "React",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Git & GitHub",
      "SQL / PostgreSQL",
      "C++",
      "Node.js (Básico)",
      "Figma"
    ],
    soft: [
      "Trabajo en equipo",
      "Comunicación efectiva",
      "Pensamiento analítico",
      "Adaptabilidad y aprendizaje rápido",
      "Gestión del tiempo"
    ]
  },
  languages: [
    {
      id: "lang-1",
      name: "Español",
      level: "Nativo"
    },
    {
      id: "lang-2",
      name: "Inglés",
      level: "Intermedio B2 (Técnico / Conversacional)"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Sistema de Gestión de Turnos",
      description: "Aplicación web completa construida con React y Node.js para reserva y administración de citas.",
      link: "github.com/lucia-benitez/turnos-app"
    }
  ],
  customization: {
    themeColor: "lfu",
    fontFamily: "sans",
    showPhoto: true,
    showCentroBadge: true,
    customLogoUrl: "",
  }
};

export const emptyCVData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    dni: "",
    birthDate: "",
    photoUrl: "",
    showPhoto: true,
  },
  summary: "",
  education: [],
  experience: [],
  courses: [],
  skills: {
    technical: [],
    soft: []
  },
  languages: [],
  projects: [],
  customization: {
    themeColor: "lfu",
    fontFamily: "sans",
    showPhoto: true,
    showCentroBadge: true,
    customLogoUrl: "",
  }
};

export const COLOR_THEMES = {
  lfu: {
    name: "Oficial LFU (Verde)",
    primary: "#0d6b38",
    primaryLight: "#dcfce7",
    sidebarBg: "#f8fafc",
    sidebarBorder: "#cbd5e1",
    accent: "#aa1b22",
    textDark: "#0f172a",
    headingColor: "#0d6b38",
  },
  navy: {
    name: "Azul UNLaM / Marino",
    primary: "#1e3a8a",
    primaryLight: "#dbeafe",
    sidebarBg: "#f8fafc",
    sidebarBorder: "#cbd5e1",
    accent: "#2563eb",
    textDark: "#0f172a",
    headingColor: "#1e3a8a",
  },
  slate: {
    name: "Grafito Ejecutivo",
    primary: "#334155",
    primaryLight: "#f1f5f9",
    sidebarBg: "#f8fafc",
    sidebarBorder: "#cbd5e1",
    accent: "#475569",
    textDark: "#0f172a",
    headingColor: "#1e293b",
  },
  burgundy: {
    name: "Borgoña Institucional",
    primary: "#881337",
    primaryLight: "#ffe4e6",
    sidebarBg: "#fff1f2",
    sidebarBorder: "#fecdd3",
    accent: "#be123c",
    textDark: "#1f2937",
    headingColor: "#881337",
  },
  emerald: {
    name: "Verde Esmeralda",
    primary: "#065f46",
    primaryLight: "#d1fae5",
    sidebarBg: "#f0fdf4",
    sidebarBorder: "#a7f3d0",
    accent: "#059669",
    textDark: "#064e3b",
    headingColor: "#065f46",
  },
  royal: {
    name: "Azul Francia",
    primary: "#1d4ed8",
    primaryLight: "#eff6ff",
    sidebarBg: "#f8fafc",
    sidebarBorder: "#bfdbfe",
    accent: "#2563eb",
    textDark: "#1e293b",
    headingColor: "#1d4ed8",
  }
};
