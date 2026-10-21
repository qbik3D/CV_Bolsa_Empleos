import React, { useState } from 'react';
import { Info, X, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function ExpoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [showTips, setShowTips] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white px-3 py-2 sm:px-6 sm:py-3 shadow-inner border-b border-emerald-900/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg shrink-0 mt-0.5 sm:mt-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <p className="font-medium text-slate-100">
              <span className="font-bold text-amber-300">¡Preparate para la Expo Empleo!</span> Este modelo oficial del Centro de Estudiantes está optimizado para reclutadores de empresas y pasantías.
            </p>
            {showTips && (
              <div className="mt-2.5 pt-2.5 border-t border-blue-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                <div className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1 carilla recomendada:</strong> Sintético, claro y directo.</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Educación UNLaM:</strong> Detallá tu carrera, año y materias clave.</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Primer empleo:</strong> Si no tenés experiencia formal, sumá proyectos o cursos.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3 self-end md:self-auto shrink-0">
          <button
            onClick={() => setShowTips(!showTips)}
            className="text-xs text-blue-300 hover:text-white underline flex items-center space-x-0.5"
          >
            <span>{showTips ? 'Ocultar consejos' : 'Ver consejos para la Expo'}</span>
            <ChevronRight className={`w-3 h-3 transform transition-transform ${showTips ? 'rotate-90' : ''}`} />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
            title="Cerrar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
