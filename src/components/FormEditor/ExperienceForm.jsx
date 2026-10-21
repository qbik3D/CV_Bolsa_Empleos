import React from 'react';
import { Plus, Trash2, Briefcase, Building, Calendar, Info } from 'lucide-react';

export default function ExperienceForm({ items = [], onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: 'exp-' + Date.now(),
      position: '',
      company: '',
      startDate: '',
      endDate: 'Actualidad',
      current: true,
      description: '• '
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
      {/* Tip for students without formal work experience */}
      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start space-x-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">¿Buscás tu primer empleo?</span> Si aún no tenés experiencia formal en empresas, podés destacar <strong>proyectos prácticos de la facultad</strong>, <strong>ayudantías</strong>, <strong>trabajos de cátedra</strong>, <strong>emprendimientos</strong> o <strong>voluntariados</strong>. ¡Todo suma para los reclutadores!
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-500 mb-3">No agregaste experiencia laboral todavía.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar experiencia laboral / proyecto</span>
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
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Experiencia #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition"
                title="Eliminar esta experiencia"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Puesto o Rol *
                </label>
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => handleUpdate(index, 'position', e.target.value)}
                  placeholder="Ej: Pasante de Desarrollo / Asistente Contable"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                  <Building className="w-3 h-3 text-slate-400" />
                  <span>Empresa u Organización *</span>
                </label>
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                  placeholder="Ej: Banco Galicia / Estudio Jurídico / Freelance"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Fecha de Inicio</span>
                </label>
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                  placeholder="Ej: Marzo 2023"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Fecha de Fin</span>
                  </label>
                  <label className="flex items-center space-x-1 text-xs text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.current || false}
                      onChange={(e) => {
                        const isCurrent = e.target.checked;
                        handleUpdate(index, 'current', isCurrent);
                        if (isCurrent) {
                          handleUpdate(index, 'endDate', 'Actualidad');
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Actual</span>
                  </label>
                </div>
                <input
                  type="text"
                  disabled={item.current}
                  value={item.endDate}
                  onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                  placeholder="Ej: Diciembre 2023 o Actualidad"
                  className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none transition ${
                    item.current ? 'bg-slate-100 text-slate-500' : 'bg-slate-50/50 focus:ring-2 focus:ring-blue-500 focus:bg-white'
                  }`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tareas y logros (Usá viñetas • para ordenar)
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="• Tareas principales desarrolladas...&#10;• Logros cuantitativos o herramientas aplicadas..."
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition leading-relaxed font-sans"
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
          <span>Agregar otra experiencia</span>
        </button>
      )}
    </div>
  );
}
