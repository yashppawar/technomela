import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
    try {
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

        const { text, providerMetadata } = await generateText({
            model,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Say hello and introduce yourself as an AI assistant",
                        },
                    ],
                },
            ],
        });

        return NextResponse.json(
            {
                message: text,
                metadata: providerMetadata,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error testing Gemini API:", error);
        return NextResponse.json(
            {
                error: "Failed to test Gemini API",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
