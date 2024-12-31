import { PDFDocument } from 'pdf-lib';

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  
  let text = '';
  for (const page of pages) {
    const content = await page.getText();
    text += content + '\n';
  }
  
  return text;
}