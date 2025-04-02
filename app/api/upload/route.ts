import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { analyzeResume } from '../../actions/analyze-resume';

export const config = {
  runtime: 'nodejs'
};

const ACCEPTED_PDF_TYPES = [
  'application/pdf',
  'application/x-pdf',
  'application/acrobat',
  'application/vnd.pdf',
  'text/pdf',
  'text/x-pdf'
];

export async function POST(req: NextRequest) {
  try {
    console.log('Starting file upload process...');
    const uploadDir = path.join(process.cwd(), 'uploads');
    fs.ensureDirSync(uploadDir);

    const formData = await req.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      console.error('No file received in the request');
      throw new Error('No file uploaded');
    }
    
    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    const isValidMimeType = ACCEPTED_PDF_TYPES.includes(file.type);
    const hasValidExtension = file.name.toLowerCase().endsWith('.pdf');
    
    console.log('File validation:', {
      mimeType: file.type,
      isValidMimeType,
      hasValidExtension
    });

    if (!isValidMimeType && !hasValidExtension) {
      throw new Error(
        `Invalid file format. Only PDF files are allowed. Received file type: ${file.type || 'unknown'}`
      );
    }
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + '-' + file.name;
    const filePath = path.join(uploadDir, filename);
    
    console.log('Saving file:', {
      filename,
      path: filePath
    });
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    fs.writeFileSync(filePath, buffer);
    console.log('File saved successfully');
    
    console.log('Starting AI analysis...');
    const analysis = await analyzeResume(filename);
    console.log('AI analysis completed');
    console.log(analysis);
    
    return NextResponse.json({
      filename,
      fileSize: buffer.length,
      success: true,
      analysis
    }, { status: 200 });
  } catch (error: any) {
    console.error('File upload error:', {
      message: error.message,
      stack: error.stack,
      type: error.constructor.name
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Error processing resume',
        details: {
          type: error.constructor.name,
          timestamp: new Date().toISOString()
        }
      },
      { status: 400 }
    );
  }
}
