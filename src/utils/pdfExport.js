import html2pdf from 'html2pdf.js';

/**
 * Direct file download using html2pdf
 */
export async function downloadPDF(elementId = 'cv-document', filename = 'CV_Expo_Empleo.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('CV Element not found for PDF export');
    return;
  }

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error in html2pdf, falling back to window.print():', error);
    window.print();
  }
}

/**
 * Native vector print dialog (highest possible text crispness)
 */
export function printPDF() {
  window.print();
}
