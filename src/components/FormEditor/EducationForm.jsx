import React from 'react';
import { Plus, Trash2, GraduationCap, Building2, Calendar } from 'lucide-react';

export default function EducationForm({ items = [], onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: 'edu-' + Date.now(),
      degree: '',
      institution: 'Universidad Nacional de La Matanza (UNLaM)',
      status: 'En curso',
      startDate: '',
      endDate: 'Actualidad',
      description: ''
    };
    onChange([...items, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    onChange(newItems);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-500 mb-3">No agregaste estudios todavía.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar carrera o estudio</span>
          </button>
        </div>
      ) : (
        items.map((item, index) => (
          <div 
            key={item.id || index}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3 relative group"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Estudio #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition"
                title="Eliminar este estudio"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Carrera / Título *
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                  placeholder="Ej: Lic. en Administración / Ing. en Informática"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>Institución *</span>
                </label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                  placeholder="Universidad Nacional de La Matanza"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estado académico
                </label>
                <input
                  type="text"
                  value={item.status}
                  onChange={(e) => handleUpdate(index, 'status', e.target.value)}
                  placeholder="Ej: En curso (3er año) / Graduado"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Año Inicio</span>
                </label>
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                  placeholder="Ej: 2022"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Año Fin / Estimado</span>
                </label>
                <input
                  type="text"
                  value={item.endDate}
                  onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                  placeholder="Ej: Actualidad / 2026"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detalles adicionales (Promedio, materias aprobadas o cátedras)
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="Ej: Promedio académico: 8.20. Cátedras de investigación destacadas."
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>
            </div>
          </div>
        ))
      )}

      {items.length > 0 && (
        <button
          type="button"
          onClick={handleAdd}
          className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-600 hover:text-blue-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar otro estudio o secundario</span>
        </button>
      )}
    </div>
  );
}
