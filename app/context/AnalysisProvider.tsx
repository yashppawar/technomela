"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AnalysisContextType {
    processedAnalysis: {
        strengths: string[];
        improvements: string[];
        summary: string;
        score: number;
    } | null;
    rawText: string | null;
    setProcessedAnalysis: (analysis: any) => void;
    setRawText: (text: string | null) => void;
}

export const AnalysisContext = createContext<AnalysisContextType>({
    processedAnalysis: null,
    rawText: null,
    setProcessedAnalysis: () => {},
    setRawText: () => {},
});

export const useAnalysis = () => useContext(AnalysisContext);

export function AnalysisProvider({ children }: { children: ReactNode }) {
    const [processedAnalysis, setProcessedAnalysis] = useState<{
        strengths: string[];
        improvements: string[];
        summary: string;
        score: number;
    } | null>(null);
    const [rawText, setRawText] = useState<string | null>(null);

    return (
        <AnalysisContext.Provider
            value={{
                processedAnalysis,
                rawText,
                setProcessedAnalysis,
                setRawText,
            }}
        >
            {children}
        </AnalysisContext.Provider>
    );
}
