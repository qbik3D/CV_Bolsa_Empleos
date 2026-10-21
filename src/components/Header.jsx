import React, { useState, useRef } from 'react';
import { 
  Download, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  Eye, 
  Upload, 
  Save, 
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  onLoadSample, 
  onReset, 
  onDownloadPDF, 
  activeTab, 
  setActiveTab,
  onExportJSON,
  onImportJSON,
  isGeneratingPDF
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
      e.target.value = '';
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[58px] py-2">
          
          {/* Brand & Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <img 
              src="./logo-centro.png" 
              alt="Logo Centro de Estudiantes LFU" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain bg-white rounded-full p-0.5 shadow-md border border-slate-700 shrink-0" 
            />
            <div className="min-w-0">
              {/* Desktop badges */}
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  LFU • Centro de Estudiantes
                </span>
                <span className="text-[11px] bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded border border-rose-800/60 font-semibold">
                  Bolsa de Empleo LFU
                </span>
              </div>
              
              {/* Mobile text */}
              <div className="sm:hidden text-[10px] uppercase font-bold text-emerald-400 tracking-wider truncate">
                Centro de Estudiantes LFU
              </div>
              
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-tight truncate">
                Generador de Curriculum Vitae
              </h1>
            </div>
          </div>

          {/* Center Mobile View Toggle (Editar / Vista Previa) */}
          <div className="flex lg:hidden bg-slate-800/90 p-1 rounded-lg border border-slate-700 shrink-0 ml-2">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'form'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'preview'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa</span>
            </button>
          </div>

          {/* Right Action Buttons for Desktop */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            {/* Quick Actions Dropdown / Tools */}
            <button
              onClick={onLoadSample}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
              title="Cargar datos de ejemplo de un estudiante de UNLaM"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cargar Ejemplo</span>
            </button>

            <button
              onClick={onReset}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition"
              title="Limpiar formulario para empezar de cero"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>

            {/* Backup JSON */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
                title="Guardar o cargar copia de tus datos"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Datos</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showExportMenu && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50 text-xs text-slate-200"
                  onMouseLeave={() => setShowExportMenu(false)}
                >
                  <button
                    onClick={() => {
                      onExportJSON();
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-700 flex items-center space-x-2"
                  >
                    <Save className="w-3.5 h-3.5 text-blue-400" />
                    <span>Guardar datos en JSON</span>
                  </button>
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-700 flex items-center space-x-2"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cargar archivo JSON</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json"
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Main Download PDF CTA (Direct file download) */}
            <button
              onClick={onDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center space-x-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 ${isGeneratingPDF ? 'animate-bounce' : ''}`} />
              <span>{isGeneratingPDF ? 'Guardando PDF...' : 'Descargar PDF'}</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary toolbar for quick actions */}
        <div className="flex lg:hidden items-center justify-between py-1.5 border-t border-slate-800/80 text-xs">
          <button
            onClick={onLoadSample}
            className="flex items-center space-x-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/60 border border-slate-700/60"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Ejemplo</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 px-2 py-1 rounded bg-slate-800/40 border border-slate-700/40"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Limpiar</span>
          </button>
          <button
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center space-x-1 text-white bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded font-semibold shadow"
          >
            <Download className="w-3 h-3" />
            <span>{isGeneratingPDF ? 'Guardando...' : 'Descargar PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
