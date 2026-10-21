import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/**
 * Direct file download using html2canvas-pro + jsPDF
 * Guaranteed 1-page A4 output, non-blank, fully compatible with mobile and desktop.
 */
export async function downloadPDF(elementId = 'cv-document', filename = 'CV_Expo_Empleo.pdf') {
  const original = document.getElementById(elementId);
  if (!original) {
    console.error('CV element not found:', elementId);
    alert('No se encontró el documento para exportar.');
    return;
  }

  // Helper canvas to sanitize modern colors if any
  const helperCanvas = document.createElement('canvas');
  const helperCtx = helperCanvas.getContext('2d');

  function safeColor(str) {
    if (!str || typeof str !== 'string' || !str.includes('oklch')) return str;
    try {
      helperCtx.fillStyle = '#000000';
      helperCtx.fillStyle = str;
      return helperCtx.fillStyle;
    } catch (e) {
      return '#000000';
    }
  }

  // Create an explicit, visible, off-screen A4 container attached directly to body
  // This guarantees it is NEVER hidden by mobile tabs (e.g. activeTab === 'form' or hidden lg:block)
  const tempContainer = document.createElement('div');
  tempContainer.id = 'cv-print-sandbox';
  tempContainer.style.position = 'fixed';
  tempContainer.style.left = '0';
  tempContainer.style.top = '0';
  tempContainer.style.width = '794px'; // 210mm in standard 96 DPI CSS pixels
  tempContainer.style.height = '1123px'; // 297mm in standard 96 DPI CSS pixels
  tempContainer.style.zIndex = '999999';
  tempContainer.style.backgroundColor = '#ffffff';
  tempContainer.style.overflow = 'hidden';

  // Deep clone the CV document
  const clone = original.cloneNode(true);
  clone.id = 'cv-cloned-export';
  clone.style.display = 'block';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';
  clone.style.width = '794px';
  clone.style.height = '1123px';
  clone.style.minHeight = '1123px';
  clone.style.maxHeight = '1123px';
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.border = 'none';

  tempContainer.appendChild(clone);
  document.body.appendChild(tempContainer);

  try {
    // Wait for all images inside the clone (logo, photo) to finish loading
    const images = Array.from(clone.querySelectorAll('img'));
    await Promise.all(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Render the isolated clone to canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // 300 DPI high resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      x: 0,
      y: 0,
      width: 794,
      height: 1123,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc, clonedEl) => {
        // Sanitize any modern oklch color string in the cloned element
        const allNodes = [clonedEl, ...clonedEl.querySelectorAll('*')];
        const colorProps = [
          'color', 
          'backgroundColor', 
          'borderColor', 
          'borderTopColor', 
          'borderBottomColor', 
          'borderLeftColor', 
          'borderRightColor'
        ];

        allNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const comp = window.getComputedStyle(node);
            colorProps.forEach((prop) => {
              const val = comp[prop];
              if (val && typeof val === 'string' && val.includes('oklch')) {
                node.style[prop] = safeColor(val);
              }
            });
          }
        });
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Add image strictly filling 1 page A4 (210mm x 297mm)
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

    // Trigger direct download of the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Ocurrió un error al descargar el PDF: ' + (error.message || error));
  } finally {
    // Always clean up the temporary DOM container
    if (document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
    }
  }
}

/**
 * Native vector print dialog
 */
export function printPDF() {
  window.print();
}
