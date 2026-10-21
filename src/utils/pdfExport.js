import html2pdf from 'html2pdf.js';

/**
 * Direct file download using html2pdf without triggering print dialog
 */
export async function downloadPDF(elementId = 'cv-document', filename = 'CV_Expo_Empleo.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('CV Element not found for PDF export');
    return;
  }

  // Resolve html2pdf function reliably in ESM
  const html2pdfModule = typeof html2pdf === 'function' ? html2pdf : (html2pdf?.default || window.html2pdf);
  if (!html2pdfModule) {
    console.error('html2pdf module not found');
    return;
  }

  // Create isolated off-screen sandbox to avoid zoom transform interference
  const sandbox = document.createElement('div');
  sandbox.style.position = 'fixed';
  sandbox.style.left = '0';
  sandbox.style.top = '-20000px';
  sandbox.style.width = '210mm';
  sandbox.style.height = '297mm';
  sandbox.style.zIndex = '-99999';
  sandbox.style.background = '#ffffff';

  const clone = element.cloneNode(true);
  clone.id = 'cv-export-clone';
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.width = '210mm';
  clone.style.height = '297mm';
  clone.style.minHeight = '297mm';
  clone.style.maxHeight = '297mm';
  clone.style.boxShadow = 'none';
  clone.style.border = 'none';

  sandbox.appendChild(clone);
  document.body.appendChild(sandbox);

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
      windowWidth: 794,
      windowHeight: 1123,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  try {
    await html2pdfModule().set(opt).from(clone).save();
  } catch (error) {
    console.error('Error during direct PDF generation:', error);
    alert('Hubo un error al generar el PDF. Por favor intentá nuevamente.');
  } finally {
    if (document.body.contains(sandbox)) {
      document.body.removeChild(sandbox);
    }
  }
}

/**
 * Optional native print dialog
 */
export function printPDF() {
  window.print();
}
