import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Award, 
  Globe, 
  FolderGit2, 
  Palette, 
  ChevronDown, 
  CheckCircle,
  Sliders
} from 'lucide-react';

import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import CoursesForm from './CoursesForm';
import LanguagesForm from './LanguagesForm';
import ProjectsForm from './ProjectsForm';
import ThemeCustomizer from './ThemeCustomizer';

const SECTIONS = [
  { id: 'personal', title: 'Datos Personales y Contacto', icon: User },
  { id: 'summary', title: 'Sobre Mí / Objetivo Profesional', icon: FileText },
  { id: 'education', title: 'Educación y Universidad', icon: GraduationCap },
  { id: 'experience', title: 'Experiencia Laboral', icon: Briefcase },
  { id: 'skills', title: 'Habilidades y Competencias', icon: Wrench },
  { id: 'courses', title: 'Cursos y Certificaciones', icon: Award },
  { id: 'languages', title: 'Idiomas', icon: Globe },
  { id: 'projects', title: 'Proyectos y Actividades', icon: FolderGit2 },
  { id: 'theme', title: 'Diseño, Colores y Logo', icon: Palette },
];

export default function FormEditor({ cvData, onChange }) {
  const [openSections, setOpenSections] = useState({
    personal: true,
    summary: true,
    education: true,
    experience: true,
    skills: false,
    courses: false,
    languages: false,
    projects: false,
    theme: false,
  });

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all = {};
    SECTIONS.forEach(s => all[s.id] = true);
    setOpenSections(all);
  };

  const collapseAll = () => {
    const none = {};
    SECTIONS.forEach(s => none[s.id] = false);
    setOpenSections(none);
  };

  // Calculate completion percentage
  let completed = 0;
  if (cvData.personalInfo?.fullName) completed += 15;
  if (cvData.personalInfo?.email) completed += 10;
  if (cvData.personalInfo?.phone) completed += 10;
  if (cvData.summary) completed += 15;
  if (cvData.education?.length > 0) completed += 20;
  if (cvData.experience?.length > 0) completed += 15;
  if (cvData.skills?.technical?.length > 0) completed += 10;
  if (cvData.languages?.length > 0) completed += 5;
  const progressPercent = Math.min(100, completed);

  return (
    <div className="space-y-4">
      {/* Progress & Quick controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">Completitud del CV:</span>
            <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {progressPercent}%
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={expandAll}
              className="text-slate-500 hover:text-blue-600 underline font-medium"
            >
              Expandir todo
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={collapseAll}
              className="text-slate-500 hover:text-blue-600 underline font-medium"
            >
              Colapsar
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isOpen = openSections[section.id];

          return (
            <div 
              key={section.id} 
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className={`w-full px-4 py-3.5 flex items-center justify-between text-left transition ${
                  isOpen ? 'bg-slate-50/80 border-b border-slate-200' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-lg ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </div>
              </button>

              {isOpen && (
                <div className="p-4 sm:p-5">
                  {section.id === 'personal' && (
                    <PersonalInfoForm 
                      data={cvData.personalInfo} 
                      onChange={(val) => onChange({ ...cvData, personalInfo: val })} 
                    />
                  )}
                  {section.id === 'summary' && (
                    <SummaryForm 
                      value={cvData.summary} 
                      onChange={(val) => onChange({ ...cvData, summary: val })} 
                    />
                  )}
                  {section.id === 'education' && (
                    <EducationForm 
                      items={cvData.education} 
                      onChange={(val) => onChange({ ...cvData, education: val })} 
                    />
                  )}
                  {section.id === 'experience' && (
                    <ExperienceForm 
                      items={cvData.experience} 
                      onChange={(val) => onChange({ ...cvData, experience: val })} 
                    />
                  )}
                  {section.id === 'skills' && (
                    <SkillsForm 
                      skills={cvData.skills} 
                      onChange={(val) => onChange({ ...cvData, skills: val })} 
                    />
                  )}
                  {section.id === 'courses' && (
                    <CoursesForm 
                      items={cvData.courses} 
                      onChange={(val) => onChange({ ...cvData, courses: val })} 
                    />
                  )}
                  {section.id === 'languages' && (
                    <LanguagesForm 
                      items={cvData.languages} 
                      onChange={(val) => onChange({ ...cvData, languages: val })} 
                    />
                  )}
                  {section.id === 'projects' && (
                    <ProjectsForm 
                      items={cvData.projects} 
                      onChange={(val) => onChange({ ...cvData, projects: val })} 
                    />
                  )}
                  {section.id === 'theme' && (
                    <ThemeCustomizer 
                      customization={cvData.customization} 
                      onChange={(val) => onChange({ ...cvData, customization: val })} 
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
