"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { analyzeResume, type AnalysisResult } from "../actions/analyze-resume";

export default function AnalysisPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fileName = searchParams.get("file");
        if (!fileName) {
            router.push("/");
            return;
        }

        const getAnalysis = async () => {
            try {
                const result = await analyzeResume(fileName);
                setAnalysisResult(result);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to analyze resume"
                );
            } finally {
                setLoading(false);
            }
        };

        getAnalysis();
    }, [searchParams, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black/90 flex items-center justify-center">
                <div className="text-white text-xl">
                    Analyzing your resume...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black/90 flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black/90 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">
                    Resume Analysis
                </h1>
                <div className="bg-zinc-800/50 border border-white/20 rounded-lg p-6 text-white whitespace-pre-wrap">
                    {analysisResult?.text}
                </div>
                {analysisResult && analysisResult.safetyRatings.length > 0 && (
                    <div className="mt-6 bg-zinc-800/50 border border-white/20 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">
                            Safety Analysis
                        </h2>
                        <div className="grid gap-4">
                            {analysisResult.safetyRatings.map(
                                (rating, index) => (
                                    <div key={index} className="text-white">
                                        <div className="font-medium">
                                            {rating.category}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Probability: {rating.probability} (
                                            {rating.probabilityScore})
                                            <br />
                                            Severity: {rating.severity} (
                                            {rating.severityScore})
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
