import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import CVDocument from './CVDocument';

const getOptimalZoom = () => {
  if (typeof window === 'undefined') return 0.85;
  if (window.innerWidth < 640) {
    // 794px is the width of 210mm A4 sheet at 96 DPI.
    return Math.max(0.36, Math.min(0.52, (window.innerWidth - 24) / 794));
  }
  if (window.innerWidth < 1024) {
    return 0.65;
  }
  return 0.85;
};

export default function PreviewPanel({ 
  cvData, 
  onDownloadPDF, 
  onPrint, 
  isGeneratingPDF 
}) {
  const [zoom, setZoom] = useState(getOptimalZoom);

  useEffect(() => {
    const handleResize = () => {
      setZoom(getOptimalZoom());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.35));
  const handleResetZoom = () => setZoom(getOptimalZoom());

  return (
    <div className="flex flex-col h-full lg:min-h-0 print:block print:p-0 print:m-0">
      {/* Top toolbar inside preview (strictly hidden when printing) */}
      <div className="no-print print:hidden preview-toolbar bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl border border-b-0 border-slate-200 flex items-center justify-between shadow-2xs shrink-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span className="text-xs font-bold text-slate-700">Vista Previa A4</span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400">• Modelo Oficial Expo Empleo</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          <button
            onClick={handleZoomOut}
            className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Reducir zoom"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-600 w-10 sm:w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition text-[11px] font-semibold flex items-center space-x-0.5"
            title="Ajustar a pantalla"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ajustar</span>
          </button>
        </div>
      </div>

      {/* Scrollable Document Area (Independent scroll pane on PC) */}
      <div 
        id="cv-preview-wrapper"
        className="flex-1 bg-slate-300/80 p-2 sm:p-6 overflow-y-auto overflow-x-auto rounded-b-xl border border-slate-200 flex justify-center items-start shadow-inner min-h-[480px] lg:min-h-0 print:p-0 print:m-0 print:bg-white print:border-none print:shadow-none print:overflow-visible print:block"
      >
        <div 
          id="cv-zoom-container"
          className="print:transform-none print:m-0 print:p-0"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            marginBottom: `${(zoom - 1) * 600}px`
          }}
        >
          <CVDocument data={cvData} />
        </div>
      </div>
    </div>
  );
}
