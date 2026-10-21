import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Download, Printer, Check } from 'lucide-react';
import CVDocument from './CVDocument';

export default function PreviewPanel({ 
  cvData, 
  onDownloadPDF, 
  onPrint, 
  isGeneratingPDF 
}) {
  const [zoom, setZoom] = useState(0.85); // 85% default zoom fits nicely on 1080p and laptop screens

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.85);

  return (
    <div className="flex flex-col h-full">
      {/* Top toolbar inside preview */}
      <div className="bg-white px-4 py-2.5 rounded-t-xl border border-b-0 border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-700">Vista Previa (Formato A4)</span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400">• Modelo Oficial Expo Empleo</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Reducir zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-600 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Ajustar al 85%"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable Document Area */}
      <div 
        id="cv-preview-wrapper"
        className="flex-1 bg-slate-300/80 p-4 sm:p-6 overflow-auto rounded-b-xl border border-slate-200 flex justify-center items-start shadow-inner min-h-[500px]"
      >
        <div 
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            marginBottom: `${(zoom - 1) * 320}px`
          }}
        >
          <CVDocument data={cvData} />
        </div>
      </div>
    </div>
  );
}
