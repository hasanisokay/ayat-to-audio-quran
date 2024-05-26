import html2pdf from 'html2pdf.js';

const generatePDF = () => {
  const input = document.getElementById('arabic-content');
  const contentHeight = input.clientHeight; // Height of your content

  const pageWidth = 210 * 72 / 25.4; // Convert mm to points
  const pageHeight = 297 * 72 / 25.4; // Convert mm to points
  const bottomMargin = 20; // Bottom margin in points
  const topMargin = 20; // Top margin in points

  // Calculate remaining space on the page after considering content height and margins
  const remainingSpace = pageHeight - contentHeight - bottomMargin - topMargin;

  // Adjust content height to include space at the beginning and end
  input.style.marginTop = `${topMargin}px`;
  input.style.marginBottom = `${bottomMargin}px`;

  html2pdf(input, {
    margin: 10,
    filename: 'download.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { dpi: 192, letterRendering: true },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
  }).from(input).save();
};

export default generatePDF;
