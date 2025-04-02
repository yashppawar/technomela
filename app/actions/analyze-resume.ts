"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import type { GoogleGenerativeAIProviderMetadata } from "@ai-sdk/google";

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
        const model = google("gemini-1.5-pro-latest", {
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

        const { text, providerMetadata } = await generateText({
            model,
            prompt: `Analyze this resume file: ${fileName}. 
        Provide a comprehensive analysis including:
        1. Overall impression
        2. Key strengths
        3. Areas for improvement
        4. Keyword analysis
        5. ATS compatibility score
        6. Specific recommendations`,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Please analyze this resume in detail",
                        },
                        {
                            type: "file",
                            data: fileName,
                            mimeType: "application/pdf",
                        },
                    ],
                },
            ],
        });

        const metadata = providerMetadata?.google as
            | GoogleGenerativeAIProviderMetadata
            | undefined;
        const safetyRatings =
            (metadata?.safetyRatings as unknown as SafetyRating[]) || [];

        return {
            text,
            safetyRatings,
        };
    } catch (error) {
        console.error("Error analyzing resume:", error);
        throw new Error("Failed to analyze resume");
    }
}
