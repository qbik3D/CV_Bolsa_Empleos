import React from 'react';
import { Plus, Trash2, FolderGit2, Link as LinkIcon } from 'lucide-react';

export default function ProjectsForm({ items = [], onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: 'proj-' + Date.now(),
      title: '',
      description: '',
      link: ''
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
        <div className="text-center py-5 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <FolderGit2 className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs text-slate-500 mb-2">No agregaste proyectos académicos o personales aún.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar proyecto</span>
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
                <FolderGit2 className="w-4 h-4 text-purple-600" />
                <span>Proyecto #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition"
                title="Eliminar este proyecto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                  placeholder="Ej: Sistema Web de Gestión"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                  <LinkIcon className="w-3 h-3 text-slate-400" />
                  <span>Enlace / Demo / Repositorio</span>
                </label>
                <input
                  type="text"
                  value={item.link}
                  onChange={(e) => handleUpdate(index, 'link', e.target.value)}
                  placeholder="Ej: github.com/usuario/proyecto"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Breve descripción del proyecto y tecnologías utilizadas
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="Ej: Proyecto integrador de cátedra desarrollado con React y Node.js para automatizar inscripciones."
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
          <span>Agregar otro proyecto</span>
        </button>
      )}
    </div>
  );
}
