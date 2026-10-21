import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FolderGit2, 
  User, 
  CheckCircle2, 
  Calendar,
  ExternalLink,
  Shield
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';
import { COLOR_THEMES } from '../../constants/defaultData';

export default function CVDocument({ data }) {
  const {
    personalInfo = {},
    summary = '',
    education = [],
    experience = [],
    courses = [],
    skills = { technical: [], soft: [] },
    languages = [],
    projects = [],
    customization = {}
  } = data || {};

  const themeKey = customization.themeColor || 'lfu';
  const theme = COLOR_THEMES[themeKey] || COLOR_THEMES.lfu;
  
  // Photo visibility respects both personalInfo.showPhoto and customization.showPhoto
  const showPhoto = personalInfo.showPhoto !== false && customization.showPhoto !== false;
  const showCentroBadge = customization.showCentroBadge !== false;
  const customLogoUrl = customization.customLogoUrl || '';

  return (
    <div
      id="cv-document"
      className="bg-white text-slate-800 shadow-2xl mx-auto overflow-hidden print:shadow-none print:m-0"
      style={{
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex h-[297mm] max-h-[297mm]">
        {/* ======================================================== */}
        {/* LEFT SIDEBAR (Columna Izquierda)                         */}
        {/* ======================================================== */}
        <aside
          className="w-[68mm] shrink-0 p-5 flex flex-col justify-between border-r h-full overflow-hidden"
          style={{
            backgroundColor: theme.sidebarBg,
            borderColor: theme.sidebarBorder,
          }}
        >
          <div className="space-y-4">
            {/* Foto de Perfil */}
            {showPhoto && (
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-24 h-24 rounded-full overflow-hidden border-3 shadow-sm bg-white flex items-center justify-center shrink-0"
                  style={{ borderColor: theme.primary }}
                >
                  {personalInfo.photoUrl ? (
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.fullName || "Foto de perfil"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sello / Logo del Centro de Estudiantes */}
            {showCentroBadge && (
              <div 
                className="p-2 rounded-xl border text-center transition bg-white shadow-2xs"
                style={{ borderColor: theme.sidebarBorder }}
              >
                <img 
                  src={customLogoUrl || "./logo-centro.png"} 
                  alt="Logo Centro de Estudiantes LFU" 
                  className="max-h-14 max-w-full mx-auto object-contain drop-shadow-2xs"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden items-center justify-center space-x-1.5 py-1">
                  <div 
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white font-black text-xs shrink-0"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black tracking-wider uppercase leading-none" style={{ color: theme.primary }}>
                      CENTRO DE ESTUDIANTES
                    </p>
                    <p className="text-[8px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                      EXPO EMPLEO
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CONTACTO */}
            <div className="space-y-2">
              <h3 
                className="text-[11px] font-bold uppercase tracking-wider pb-0.5 border-b"
                style={{ color: theme.primary, borderColor: theme.sidebarBorder }}
              >
                Contacto
              </h3>

              <div className="space-y-1.5 text-[10.5px] text-slate-700">
                {personalInfo.email && (
                  <div className="flex items-start space-x-1.5 break-all">
                    <Mail className="w-3 h-3 shrink-0 mt-0.5" style={{ color: theme.primary }} />
                    <span className="font-medium">{personalInfo.email}</span>
                  </div>
                )}

                {personalInfo.phone && (
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                    <span className="font-medium">{personalInfo.phone}</span>
                  </div>
                )}

                {personalInfo.location && (
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                    <span>{personalInfo.location}</span>
                  </div>
                )}

                {personalInfo.linkedin && (
                  <div className="flex items-center space-x-1.5 break-all">
                    <LinkedinIcon className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                    <span>{personalInfo.linkedin}</span>
                  </div>
                )}

                {personalInfo.github && (
                  <div className="flex items-center space-x-1.5 break-all">
                    <GithubIcon className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                    <span>{personalInfo.github}</span>
                  </div>
                )}

                {personalInfo.dni && (
                  <div className="flex items-center space-x-1.5 text-slate-500 text-[9.5px] pt-0.5">
                    <span>DNI: {personalInfo.dni}</span>
                  </div>
                )}
              </div>
            </div>

            {/* HABILIDADES TÉCNICAS */}
            {skills.technical && skills.technical.length > 0 && (
              <div className="space-y-1.5">
                <h3 
                  className="text-[11px] font-bold uppercase tracking-wider pb-0.5 border-b"
                  style={{ color: theme.primary, borderColor: theme.sidebarBorder }}
                >
                  Habilidades Técnicas
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.technical.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 text-[9.5px] font-semibold rounded bg-white border shadow-2xs"
                      style={{
                        borderColor: theme.sidebarBorder,
                        color: theme.textDark,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* HABILIDADES BLANDAS */}
            {skills.soft && skills.soft.length > 0 && (
              <div className="space-y-1.5">
                <h3 
                  className="text-[11px] font-bold uppercase tracking-wider pb-0.5 border-b"
                  style={{ color: theme.primary, borderColor: theme.sidebarBorder }}
                >
                  Competencias
                </h3>
                <ul className="space-y-0.5 text-[10px] text-slate-700">
                  {skills.soft.map((skill, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-1.5">
                <h3 
                  className="text-[11px] font-bold uppercase tracking-wider pb-0.5 border-b"
                  style={{ color: theme.primary, borderColor: theme.sidebarBorder }}
                >
                  Idiomas
                </h3>
                <div className="space-y-1">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="text-[10px]">
                      <div className="flex justify-between font-semibold text-slate-800">
                        <span>{lang.name}</span>
                        <span className="text-[9.5px] text-slate-500 font-normal">{lang.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Bottom note */}
          <div className="pt-2 mt-2 border-t border-slate-200 text-center text-[8.5px] text-slate-400">
            Formato oficial Expo Empleo UNLaM
          </div>
        </aside>

        {/* ======================================================== */}
        {/* RIGHT MAIN COLUMN (Columna Principal)                    */}
        {/* ======================================================== */}
        <main className="flex-1 p-6 flex flex-col justify-between h-full overflow-hidden">
          <div className="space-y-3.5">
            {/* Header del Postulante */}
            <div className="border-b pb-2.5" style={{ borderColor: '#e2e8f0' }}>
              <h1 
                className="text-2xl font-extrabold tracking-tight uppercase leading-tight"
                style={{ color: theme.headingColor }}
              >
                {personalInfo.fullName || "Nombre y Apellido"}
              </h1>
              <p 
                className="text-xs font-semibold tracking-wide uppercase mt-0.5 text-slate-600"
              >
                {personalInfo.title || "Titular Profesional / Perfil"}
              </p>
            </div>

            {/* SOBRE MÍ / PERFIL PROFESIONAL */}
            {summary && (
              <section className="space-y-1 break-inside-avoid">
                <h2 
                  className="text-[11px] font-extrabold uppercase tracking-wider flex items-center space-x-1.5"
                  style={{ color: theme.primary }}
                >
                  <span className="w-1.5 h-1.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
                  <span>Perfil Profesional</span>
                </h2>
                <p className="text-[10px] leading-relaxed text-slate-700 text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <section className="space-y-2 break-inside-avoid">
                <h2 
                  className="text-[11px] font-extrabold uppercase tracking-wider flex items-center space-x-1.5"
                  style={{ color: theme.primary }}
                >
                  <span className="w-1.5 h-1.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
                  <span>Educación</span>
                </h2>
                
                <div className="space-y-2">
                  {education.map((item, idx) => (
                    <div key={idx} className="relative pl-3 border-l-2" style={{ borderColor: theme.primaryLight }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                          {item.degree}
                        </h4>
                        <span className="text-[9.5px] font-semibold text-slate-500">
                          {item.startDate && item.endDate ? `${item.startDate} — ${item.endDate}` : item.endDate || item.startDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-600 font-medium mt-0.5">
                        <span>{item.institution}</span>
                        {item.status && (
                          <span 
                            className="px-1.5 py-0.2 rounded text-[8.5px] font-bold"
                            style={{ backgroundColor: theme.primaryLight, color: theme.primary }}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[9.5px] text-slate-600 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <section className="space-y-2 break-inside-avoid">
                <h2 
                  className="text-[11px] font-extrabold uppercase tracking-wider flex items-center space-x-1.5"
                  style={{ color: theme.primary }}
                >
                  <span className="w-1.5 h-1.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
                  <span>Experiencia Laboral</span>
                </h2>

                <div className="space-y-2">
                  {experience.map((item, idx) => (
                    <div key={idx} className="relative pl-3 border-l-2" style={{ borderColor: theme.primaryLight }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                          {item.position}
                        </h4>
                        <span className="text-[9.5px] font-semibold text-slate-500">
                          {item.startDate && item.endDate ? `${item.startDate} — ${item.endDate}` : item.endDate || item.startDate}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-700 mt-0.5">
                        {item.company}
                      </p>
                      {item.description && (
                        <div className="text-[9.5px] text-slate-600 mt-0.5 leading-relaxed whitespace-pre-line">
                          {item.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CURSOS Y CERTIFICACIONES */}
            {courses && courses.length > 0 && (
              <section className="space-y-1.5 break-inside-avoid">
                <h2 
                  className="text-[11px] font-extrabold uppercase tracking-wider flex items-center space-x-1.5"
                  style={{ color: theme.primary }}
                >
                  <span className="w-1.5 h-1.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
                  <span>Cursos y Certificaciones</span>
                </h2>

                <div className="grid grid-cols-1 gap-1">
                  {courses.map((course, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-[10px]">
                      <div>
                        <span className="font-bold text-slate-900">{course.title}</span>
                        {course.institution && (
                          <span className="text-slate-500 font-medium"> • {course.institution}</span>
                        )}
                        {course.hours && (
                          <span className="text-[9px] text-slate-400"> ({course.hours})</span>
                        )}
                      </div>
                      {course.year && (
                        <span className="text-[9px] font-semibold text-slate-500 shrink-0 ml-2">
                          {course.year}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROYECTOS DESTACADOS */}
            {projects && projects.length > 0 && (
              <section className="space-y-1.5 break-inside-avoid">
                <h2 
                  className="text-[11px] font-extrabold uppercase tracking-wider flex items-center space-x-1.5"
                  style={{ color: theme.primary }}
                >
                  <span className="w-1.5 h-1.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
                  <span>Proyectos Destacados</span>
                </h2>

                <div className="space-y-1.5">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="text-[10px]">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900">{proj.title}</span>
                        {proj.link && (
                          <span className="text-[9px] text-emerald-700 font-medium">
                            {proj.link}
                          </span>
                        )}
                      </div>
                      {proj.description && (
                        <p className="text-[9.5px] text-slate-600 mt-0.5 leading-tight">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Footer oficial de la página */}
          <footer className="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-400">
            <span>Universidad Nacional de La Matanza • Expo Empleo</span>
            <span>Centro de Estudiantes LFU</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
