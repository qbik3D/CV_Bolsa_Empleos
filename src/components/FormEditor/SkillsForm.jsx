import React, { useState } from 'react';
import { Tag, Plus, X, Wrench, HeartHandshake, Sparkles } from 'lucide-react';

const SUGGESTED_TECH = [
  "Excel Avanzado", "Power BI", "SQL", "Python", "JavaScript", 
  "React", "Git & GitHub", "C++", "Java", "Liquidación de Sueldos", 
  "Sistema Tango / Bejerman", "AutoCAD", "Figma", "Marketing Digital", "Facturación"
];

const SUGGESTED_SOFT = [
  "Trabajo en equipo", "Comunicación asertiva", "Resolución de problemas", 
  "Proactividad", "Pensamiento analítico", "Adaptabilidad", "Orientación al detalle", "Liderazgo"
];

export default function SkillsForm({ skills = { technical: [], soft: [] }, onChange }) {
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const handleAddTech = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed || skills.technical?.includes(trimmed)) return;
    onChange({
      ...skills,
      technical: [...(skills.technical || []), trimmed]
    });
    setTechInput('');
  };

  const handleRemoveTech = (index) => {
    onChange({
      ...skills,
      technical: skills.technical.filter((_, i) => i !== index)
    });
  };

  const handleAddSoft = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed || skills.soft?.includes(trimmed)) return;
    onChange({
      ...skills,
      soft: [...(skills.soft || []), trimmed]
    });
    setSoftInput('');
  };

  const handleRemoveSoft = (index) => {
    onChange({
      ...skills,
      soft: skills.soft.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Technical skills */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
          <Wrench className="w-3.5 h-3.5 text-blue-600" />
          <span>Habilidades Técnicas y Herramientas</span>
        </label>

        {/* Input box */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                handleAddTech(techInput);
              }
            }}
            placeholder="Escribí una herramienta o habilidad y presioná Enter..."
            className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <button
            type="button"
            onClick={() => handleAddTech(techInput)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>

        {/* Added tags */}
        <div className="flex flex-wrap gap-1.5 min-h-8">
          {(skills.technical || []).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveTech(index)}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {(skills.technical || []).length === 0 && (
            <span className="text-xs text-slate-400 italic">No hay habilidades técnicas agregadas.</span>
          )}
        </div>

        {/* Suggestions */}
        <div className="pt-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Sugerencias rápidas:</span>
          </span>
          <div className="flex flex-wrap gap-1">
            {SUGGESTED_TECH.filter(item => !(skills.technical || []).includes(item)).map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddTech(item)}
                className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded border border-slate-200 transition"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Soft skills */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <label className="block text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-indigo-600" />
          <span>Habilidades Blandas / Competencias</span>
        </label>

        {/* Input box */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                handleAddSoft(softInput);
              }
            }}
            placeholder="Ej: Trabajo en equipo, Liderazgo, etc..."
            className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <button
            type="button"
            onClick={() => handleAddSoft(softInput)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>

        {/* Added tags */}
        <div className="flex flex-wrap gap-1.5 min-h-8">
          {(skills.soft || []).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSoft(index)}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {(skills.soft || []).length === 0 && (
            <span className="text-xs text-slate-400 italic">No hay habilidades blandas agregadas.</span>
          )}
        </div>

        {/* Suggestions */}
        <div className="pt-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Sugerencias rápidas:</span>
          </span>
          <div className="flex flex-wrap gap-1">
            {SUGGESTED_SOFT.filter(item => !(skills.soft || []).includes(item)).map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSoft(item)}
                className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded border border-slate-200 transition"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
