import React from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';

const COMMON_LEVELS = [
  "Básico (A1 - A2)",
  "Intermedio (B1)",
  "Intermedio Avanzado (B2)",
  "Avanzado (C1)",
  "Bilingüe / Profesional (C2)",
  "Nativo"
];

export default function LanguagesForm({ items = [], onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: 'lang-' + Date.now(),
      name: 'Inglés',
      level: 'Intermedio (B1)'
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
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-center py-5 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Globe className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs text-slate-500 mb-2">No agregaste idiomas todavía.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar idioma</span>
          </button>
        </div>
      ) : (
        items.map((item, index) => (
          <div 
            key={item.id || index}
            className="flex items-center space-x-2 p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm"
          >
            <Globe className="w-4 h-4 text-blue-500 shrink-0 ml-1" />
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleUpdate(index, 'name', e.target.value)}
              placeholder="Idioma (ej: Inglés)"
              className="flex-1 px-2.5 py-1.5 text-xs sm:text-sm bg-slate-50/50 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <select
              value={item.level}
              onChange={(e) => handleUpdate(index, 'level', e.target.value)}
              className="flex-1 px-2.5 py-1.5 text-xs sm:text-sm bg-slate-50/50 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
            >
              {COMMON_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50 transition"
              title="Eliminar idioma"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))
      )}

      {items.length > 0 && (
        <button
          type="button"
          onClick={handleAdd}
          className="w-full py-2 border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-600 hover:text-blue-700 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Agregar otro idioma</span>
        </button>
      )}
    </div>
  );
}
