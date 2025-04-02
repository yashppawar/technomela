'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { ResumeAnalysis } from '../actions/analyze-resume';

interface AnalysisContextType {
    analysis: ResumeAnalysis | null;
    setAnalysis: (analysis: ResumeAnalysis | null) => void;
}

export const AnalysisContext = createContext<AnalysisContextType>({
    analysis: null,
    setAnalysis: () => {},
});

export const useAnalysis = () => useContext(AnalysisContext);

export function AnalysisProvider({ children }: { children: ReactNode }) {
    const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

    return (
        <AnalysisContext.Provider value={{ 
            analysis,
            setAnalysis
        }}>
            {children}
        </AnalysisContext.Provider>
    );
}
