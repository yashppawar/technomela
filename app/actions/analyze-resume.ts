"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import type { GoogleGenerativeAIProviderMetadata } from "@ai-sdk/google";
import fs from "fs-extra";
import path from "path";

export interface SafetyRating {
    category: string;
    probability: string;
    probabilityScore: number;
    severity: string;
    severityScore: number;
    blocked?: boolean;
}

export interface AnalysisResult {
    text: string;
    safetyRatings: SafetyRating[];
}

export async function analyzeResume(fileName: string): Promise<AnalysisResult> {
    try {
        console.log("Starting resume analysis for file:", fileName);

        // Construct the full file path using the uploads directory
        const uploadDir = path.join(process.cwd(), "uploads");
        const filePath = path.join(uploadDir, fileName);

        console.log("Checking file existence:", filePath);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);
            throw new Error(`Resume file not found: ${fileName}`);
        }

        console.log("File exists, initializing AI model...");

        const model = google("gemini-2.0-flash-thinking-exp-01-21", {
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

        console.log("Reading file content...");
        const fileContent = fs.readFileSync(filePath);
        console.log("File content read, size:", fileContent.length, "bytes");

        console.log("Generating AI analysis...");
        const { text, providerMetadata } = await generateText({
            model,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Please analyze this resume and provide a comprehensive analysis including:
              1. Overall impression
              2. Key strengths
              3. Areas for improvement
              4. Keyword analysis
              5. ATS compatibility score
              6. Specific recommendations`,
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

        console.log("AI analysis completed, processing results...");

        const metadata = providerMetadata?.google as
            | GoogleGenerativeAIProviderMetadata
            | undefined;
        const safetyRatings =
            (metadata?.safetyRatings as unknown as SafetyRating[]) || [];

        console.log("Analysis processing complete", {
            textLength: text.length,
            safetyRatingsCount: safetyRatings.length,
        });
        console.log(text)
        return {
            text,
            safetyRatings,
        };
    } catch (error) {
        console.error("Error analyzing resume:", {
            error:
                error instanceof Error
                    ? {
                          message: error.message,
                          stack: error.stack,
                          name: error.name,
                      }
                    : error,
            fileName,
            timestamp: new Date().toISOString(),
        });
        throw error;
    }
}
