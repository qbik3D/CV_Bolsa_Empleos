import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Direct file download using html2canvas + jsPDF
 * Renders exact 1-page A4 and triggers browser file download directly
 */
export async function downloadPDF(elementId = 'cv-document', filename = 'CV_Expo_Empleo.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('CV element not found:', elementId);
    return;
  }

  // Temporarily reset preview zoom container so html2canvas captures 100% full scale
  const zoomContainer = document.getElementById('cv-zoom-container');
  const originalTransform = zoomContainer ? zoomContainer.style.transform : '';
  const originalMargin = zoomContainer ? zoomContainer.style.marginBottom : '';

  if (zoomContainer) {
    zoomContainer.style.transform = 'none';
    zoomContainer.style.marginBottom = '0';
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution (approx 300 DPI)
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      windowHeight: 1123,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Add image fitting strictly into 1 page A4 (210mm x 297mm)
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

    // Trigger direct download of the PDF file
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Ocurrió un error al descargar el PDF: ' + (error.message || error));
  } finally {
    // Restore preview zoom transform
    if (zoomContainer) {
      zoomContainer.style.transform = originalTransform;
      zoomContainer.style.marginBottom = originalMargin;
    }
  }
}

/**
 * Native vector print dialog
 */
export function printPDF() {
  window.print();
}
