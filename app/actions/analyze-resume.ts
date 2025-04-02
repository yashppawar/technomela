"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from 'ai';
import { z } from 'zod';
import fs from "fs-extra";
import path from "path";

// Define the schema for resume analysis
const resumeAnalysisSchema = z.object({
    overall: z.object({
        summary: z.string().describe('A comprehensive summary of the resume'),
        score: z.number().min(0).max(100).describe('ATS compatibility score out of 100'),
    }),
    sections: z.object({
        strengths: z.array(z.object({
            title: z.string(),
            description: z.string(),
            impact: z.string().optional(),
        })),
        improvements: z.array(z.object({
            title: z.string(),
            description: z.string(),
            recommendation: z.string(),
        })),
        keywords: z.array(z.object({
            word: z.string(),
            relevance: z.string().optional(),
            context: z.string().optional(),
        })),
    }),
    ats: z.object({
        compatibility: z.object({
            score: z.number().min(0).max(100),
            format: z.string(),
            parsability: z.string(),
        }),
        recommendations: z.array(z.string()),
    }),
    skills: z.object({
        technical: z.array(z.string()),
        soft: z.array(z.string()),
        missing: z.array(z.string()).optional(),
    }),
});

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;

export async function analyzeResume(fileName: string): Promise<ResumeAnalysis> {
    try {
        console.log('Starting resume analysis for file:', fileName);

        const uploadDir = path.join(process.cwd(), 'uploads');
        const filePath = path.join(uploadDir, fileName);

        console.log('Checking file existence:', filePath);

        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            throw new Error(`Resume file not found: ${fileName}`);
        }

        console.log('File exists, initializing AI model...');

        // const model = google("gemini-2.0-flash-thinking-exp-01-21", {
        const model = google("gemini-2.5-pro-exp-03-25", {
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_LOW_AND_ABOVE",
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
            ],
        });

        console.log('Reading file content...');
        const fileContent = fs.readFileSync(filePath);
        console.log('File content read, size:', fileContent.length, 'bytes');

        console.log('Generating structured AI analysis...');
        const { object } = await generateObject({
            model,
            schema: resumeAnalysisSchema,
            schemaName: 'ResumeAnalysis',
            schemaDescription: 'A comprehensive analysis of a resume including strengths, improvements, and ATS compatibility',
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Please analyze this resume and provide a detailed analysis including:
                                1. Overall impression and summary
                                2. Key strengths with specific examples
                                3. Areas for improvement with actionable recommendations
                                4. ATS compatibility analysis
                                5. Key skills assessment
                                Please be specific and provide actionable insights.`,
                        },
                        {
                            type: "file",
                            data: fileContent,
                            mimeType: "application/pdf",
                        },
                    ],
                },
            ],
        });

        console.log('Analysis generation complete');
        return object;
        
    } catch (error) {
        console.error("Error analyzing resume:", {
            error: error instanceof Error ? {
                message: error.message,
                stack: error.stack,
                name: error.name
            } : error,
            fileName,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}
