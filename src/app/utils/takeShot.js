import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

async function generatePDFFrom() {
  // Get the HTML content of the arabic-content div
  const arabicContentDiv = document.getElementById('arabic-content');
  const arabicContentHTML = arabicContentDiv.innerHTML;

  // Load the custom font
  const fontURL = '@/../../../../public/assets/font/noorehuda.ttf';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
    noorehuda: {
      normal: fontURL,
    },
  };

  console.log('Font URL:', fontURL); // Check font URL in console
  console.log('Fonts:', pdfMake.fonts); // Check if fonts are properly defined

  // Create a document definition for pdfmake
  const docDefinition = {
    content: [
      {
        text: arabicContentHTML,
        font: 'noorehuda', // Set the custom font
        fontSize: 12,
        color: '#000000',
      }
    ],
    defaultStyle: {
      font: 'noorehuda', // Set the custom font as default
    }
  };

  console.log('Document Definition:', docDefinition); // Check document definition

  // Create the PDF
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  console.log('PDF Document Generator:', pdfDocGenerator); // Check PDF document generator

  // Download the PDF
  pdfDocGenerator.download('arabic-content.pdf');
}

export default generatePDFFrom;
