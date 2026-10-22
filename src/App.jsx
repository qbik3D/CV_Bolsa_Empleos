import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FormEditor from './components/FormEditor/FormEditor';
import PreviewPanel from './components/Preview/PreviewPanel';
import { sampleCVData, emptyCVData } from './constants/defaultData';
import { downloadPDF, printPDF } from './utils/pdfExport';
import { Download, Eye, FileText, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'unlam_cv_builder_v3';

export default function App() {
  const [cvData, setCvData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default theme is LFU Green
        if (!parsed.customization?.themeColor || parsed.customization?.themeColor === 'navy') {
          parsed.customization = {
            ...parsed.customization,
            themeColor: 'lfu'
          };
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error loading saved CV from localStorage:', e);
    }
    return sampleCVData;
  });

  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'preview' (for mobile)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Guardado');

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
      setSaveStatus('Guardado');
    } catch (e) {
      console.error('Error saving CV to localStorage:', e);
    }
  }, [cvData]);

  const handleLoadSample = () => {
    if (window.confirm("¿Querés cargar los datos de ejemplo del estudiante de UNLaM? Se reemplazarán los datos actuales.")) {
      setCvData(sampleCVData);
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que deseás vaciar el formulario para comenzar de cero?")) {
      setCvData(emptyCVData);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `${cvData.personalInfo?.fullName?.replace(/\s+/g, '_') || 'Mi_CV'}_datos.json`;
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        setCvData(parsed);
        alert("¡Datos cargados exitosamente!");
      } catch (err) {
        alert("El archivo seleccionado no es un JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const studentName = cvData.personalInfo?.fullName?.trim()?.replace(/\s+/g, '_') || 'Estudiante';
      const filename = `CV_${studentName}_Expo_Empleo.pdf`;
      await downloadPDF('cv-document', filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    printPDF();
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col bg-slate-100 print:bg-white print:h-auto print:overflow-visible">
      {/* Top Header (Hidden on print) */}
      <div className="no-print print:hidden shrink-0">
        <Header
          onLoadSample={handleLoadSample}
          onReset={handleReset}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onExportJSON={handleExportJSON}
          onImportJSON={handleImportJSON}
          isGeneratingPDF={isGeneratingPDF}
        />
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 pb-28 lg:pb-6 lg:overflow-hidden flex flex-col min-h-0 print:p-0 print:m-0 print:max-w-none print:overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start lg:flex-1 lg:h-full lg:min-h-0 print:block print:p-0">
          
          {/* Left: Form Editor (Independent smooth scroll on desktop) */}
          <div className={`lg:col-span-5 no-print print:hidden form-editor-container lg:h-full lg:overflow-y-auto lg:pr-3 lg:pb-12 ${activeTab === 'form' ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-3 px-1 sticky top-0 bg-slate-100/95 backdrop-blur-xs py-1 z-10">
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Completar Información</span>
              </h2>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Auto-guardado activo</span>
              </span>
            </div>

            <FormEditor 
              cvData={cvData} 
              onChange={setCvData} 
            />
          </div>

          {/* Right: Live A4 Preview (Independent smooth scroll on desktop) */}
          <div className={`lg:col-span-7 lg:h-full lg:flex lg:flex-col lg:min-h-0 print:static print:w-full print:p-0 print:m-0 preview-container ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <PreviewPanel
              cvData={cvData}
              onDownloadPDF={handleDownloadPDF}
              onPrint={handlePrint}
              isGeneratingPDF={isGeneratingPDF}
            />
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile (Hidden on print) */}
      <div className="fixed bottom-4 right-4 lg:hidden z-50 flex flex-col space-y-2 no-print print:hidden">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-5 rounded-full shadow-2xl transition active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>{isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}</span>
        </button>
      </div>
    </div>
  );
}
