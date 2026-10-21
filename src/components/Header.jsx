import React, { useState, useRef } from 'react';
import { 
  Download, 
  Printer, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  Eye, 
  Upload, 
  Save, 
  GraduationCap, 
  ChevronDown,
  Check
} from 'lucide-react';

export default function Header({ 
  onLoadSample, 
  onReset, 
  onDownloadPDF, 
  onPrint, 
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Title */}
          <div className="flex items-center space-x-3">
            <img 
              src="./logo-centro.png" 
              alt="Logo Centro de Estudiantes LFU" 
              className="w-11 h-11 object-contain bg-white rounded-full p-0.5 shadow-md border border-slate-700" 
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  LFU • Centro de Estudiantes
                </span>
                <span className="text-xs bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded border border-rose-800/60 font-semibold">
                  Expo Empleo UNLaM
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                Generador de Curriculum Vitae
              </h1>
            </div>
          </div>

          {/* Center Mobile View Toggle */}
          <div className="flex lg:hidden bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'form'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Quick Actions Dropdown / Tools */}
            <button
              onClick={onLoadSample}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
              title="Cargar datos de ejemplo de un estudiante de UNLaM"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Cargar</span> Ejemplo
            </button>

            <button
              onClick={onReset}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition"
              title="Limpiar formulario para empezar de cero"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Limpiar</span>
            </button>

            {/* Backup JSON */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
                title="Guardar o cargar copia de tus datos"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Datos</span>
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

            {/* Print button */}
            <button
              onClick={onPrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
              title="Abrir diálogo de impresión para máxima nitidez vectorial"
            >
              <Printer className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden md:inline">Imprimir</span>
            </button>

            {/* Main Download PDF CTA */}
            <button
              onClick={onDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center space-x-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 ${isGeneratingPDF ? 'animate-bounce' : ''}`} />
              <span>{isGeneratingPDF ? 'Generando PDF...' : 'Descargar PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
