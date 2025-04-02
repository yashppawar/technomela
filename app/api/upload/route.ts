import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

// Configure runtime for the API
export const config = {
  runtime: 'nodejs' // Use Node.js runtime for file system operations
};

export async function POST(req: NextRequest) {
  try {
    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'uploads');
    fs.ensureDirSync(uploadDir);

    // Parse the FormData from the request
    const formData = await req.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      throw new Error('No file uploaded');
    }
    
    // Validate file type
    if (!file.type || file.type !== 'application/pdf') {
      throw new Error('Only PDF files are allowed');
    }
    
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + '-' + file.name;
    const filePath = path.join(uploadDir, filename);
    
    // Convert the file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write the file to disk
    fs.writeFileSync(filePath, buffer);
    
    // Read the file for processing
    const fileContent = fs.readFileSync(filePath);
    console.log(fileContent);
    // Parse PDF content (in a real app, you'd use a PDF parsing library here)
    // For this example, we'll just return some mock analysis
    const analysisResult = {
      filename: filename,
      fileSize: fileContent.length,
      success: true,
      analysis: {
        score: 85,
        suggestions: [
          "Add more quantifiable achievements",
          "Include more industry-specific keywords",
          "Improve your summary section for better impact"
        ],
        strengths: [
          "Clear organization",
          "Good action verbs",
          "Appropriate length"
        ]
      }
    };
    
    return NextResponse.json(analysisResult, { status: 200 });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing resume' },
      { status: 400 }
    );
  }
} 