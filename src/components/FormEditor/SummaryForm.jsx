import React from 'react';
import { Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  {
    label: "Ingeniería / Informática",
    text: "Estudiante avanzado de Ingeniería en Informática de la UNLaM con sólida formación en desarrollo de software, algoritmos y bases de datos. Proactivo y con alto interés en el aprendizaje continuo y las metodologías ágiles. Busco integrarme a un equipo dinámico mediante una pasantía o posición Jr. para aplicar mis conocimientos y aportar valor."
  },
  {
    label: "Cs. Económicas / Administración",
    text: "Estudiante de la carrera de Administración / Contador Público en la UNLaM, con orientación a finanzas, auditoría y análisis de procesos comerciales. Manejo avanzado de Excel y herramientas de gestión. Comprometido con la mejora continua y el trabajo en equipo, con motivación para iniciar mi desarrollo profesional en la Expo Empleo."
  },
  {
    label: "Comunicación / Diseño",
    text: "Estudiante de Comunicación Social / Diseño Gráfico en la UNLaM, apasionado por la creación de contenidos estratégicos, gestión de redes e identidad de marca. Excelente redacción, creatividad y habilidades interpersonales. Interesado en formar parte de proyectos innovadores y dinámicos."
  },
  {
    label: "Primer Empleo / Sin Experiencia",
    text: "Estudiante universitario en la UNLaM, comprometido, puntual y con gran capacidad de aprendizaje. Cuento con excelente disposición para el trabajo en equipo y resolución de problemas cotidianos. Busco mi primera experiencia laboral formal para comenzar mi trayectoria profesional y poner en práctica mis habilidades académicas."
  }
];

export default function SummaryForm({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          Sobre Mí / Objetivo Profesional
        </label>
        <span className="text-xs text-slate-400">
          {value ? value.length : 0} caracteres
        </span>
      </div>

      <textarea
        rows={4}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Redactá un breve resumen (3 a 5 líneas) sobre tu perfil, carrera en la UNLaM, fortalezas y lo que buscás aportar a las empresas en la Expo Empleo..."
        className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition leading-relaxed"
      />

      {/* Suggested Starters */}
      <div className="pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-600 mb-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Plantillas de redacción sugeridas (hacé clic para usar):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(item.text)}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 border border-slate-200 rounded-md transition text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
