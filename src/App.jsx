import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpoBanner from './components/ExpoBanner';
import FormEditor from './components/FormEditor/FormEditor';
import PreviewPanel from './components/Preview/PreviewPanel';
import { sampleCVData, emptyCVData } from './constants/defaultData';
import { downloadPDF, printPDF } from './utils/pdfExport';
import { Download, Eye, FileText, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'unlam_cv_builder_v1';

export default function App() {
  const [cvData, setCvData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
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
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Top Header */}
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

      {/* Expo Empleo Banner with tips */}
      <ExpoBanner />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Form Editor (Visible always on lg+, controlled by activeTab on mobile) */}
          <div className={`lg:col-span-5 ${activeTab === 'form' ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Completar Información</span>
              </h2>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Auto-guardado activo</span>
              </span>
            </div>

            <FormEditor 
              cvData={cvData} 
              onChange={setCvData} 
            />
          </div>

          {/* Right: Live A4 Preview (Visible always on lg+, controlled by activeTab on mobile) */}
          <div className={`lg:col-span-7 sticky top-20 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <PreviewPanel
              cvData={cvData}
              onDownloadPDF={handleDownloadPDF}
              onPrint={handlePrint}
              isGeneratingPDF={isGeneratingPDF}
            />
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-4 right-4 lg:hidden z-50 flex flex-col space-y-2">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full shadow-2xl transition active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>{isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}</span>
        </button>
      </div>
    </div>
  );
}
