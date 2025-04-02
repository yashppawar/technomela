"use client";

import { Raleway, Lato } from "next/font/google";
import { CheckCircle, AlertCircle, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useAnalysis } from "../context/AnalysisProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Adding Raleway and Lato fonts
const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const lato = Lato({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
});

export default function AnalysisPage() {
    const { processedAnalysis, rawText } = useAnalysis();

    if (!processedAnalysis || !rawText) {
        return (
            <div
                className={`relative min-h-screen w-full bg-[#0a0428] overflow-hidden ${raleway.className}`}
            >
                <div className="relative z-10 container mx-auto px-4 py-8">
                    <Navbar />
                    <div className="mt-10 text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-red-500/20">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h2
                            className={`text-xl font-bold text-white mb-2 ${raleway.className}`}
                        >
                            No Analysis Available
                        </h2>
                        <p className={`text-white/70 ${lato.className}`}>
                            Please upload a resume first to see the analysis.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/resume-analyzer">Upload Resume</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative min-h-screen w-full bg-[#0a0428] overflow-hidden ${raleway.className}`}
        >
            {/* ...existing decorative elements... */}

            <div className="relative z-10 container mx-auto px-4 py-8">
                <Navbar />

                <div className="mt-8 mb-8">
                    <Link
                        href="/resume-analyzer"
                        className="inline-flex items-center text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Upload
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h1
                        className={`text-4xl md:text-5xl font-bold text-white mb-4 ${raleway.className}`}
                    >
                        Resume Analysis Results
                    </h1>

                    <Tabs defaultValue="formatted" className="w-full">
                        <TabsList className="bg-white/5 border border-white/10">
                            <TabsTrigger
                                value="formatted"
                                className="data-[state=active]:bg-white/10"
                            >
                                Formatted Analysis
                            </TabsTrigger>
                            <TabsTrigger
                                value="raw"
                                className="data-[state=active]:bg-white/10"
                            >
                                Raw Output
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="formatted">
                            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
                                    <div className="bg-white/10 rounded-full p-4 backdrop-blur-md border border-white/20">
                                        <FileText className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                <div className="mb-10 flex items-center justify-center">
                                    <div className="relative w-32 h-32">
                                        {/* Background circle */}
                                        <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10"></div>

                                        {/* Score circle with gradient */}
                                        <svg
                                            className="absolute inset-0 w-full h-full"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="46"
                                                fill="none"
                                                stroke="url(#scoreGradient)"
                                                strokeWidth="8"
                                                strokeDasharray={`${
                                                    processedAnalysis.score *
                                                    2.9
                                                }, 1000`}
                                                strokeLinecap="round"
                                                transform="rotate(-90, 50, 50)"
                                            />

                                            <defs>
                                                <linearGradient
                                                    id="scoreGradient"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="100%"
                                                    y2="0%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="#00d9ff"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#674cd7"
                                                    />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        {/* Score text */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span
                                                className={`text-3xl font-bold text-white ${raleway.className}`}
                                            >
                                                {processedAnalysis.score}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <h3
                                        className={`text-xl font-medium text-white mb-4 ${raleway.className}`}
                                    >
                                        Analysis Summary
                                    </h3>
                                    <p
                                        className={`text-white/80 mb-6 ${lato.className}`}
                                    >
                                        {processedAnalysis.summary}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                        <h3
                                            className={`text-[#00d9ff] font-medium mb-4 flex items-center ${raleway.className}`}
                                        >
                                            <CheckCircle className="h-5 w-5 mr-2" />{" "}
                                            Strengths
                                        </h3>
                                        <ul className="space-y-3">
                                            {processedAnalysis.strengths.map(
                                                (strength, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div className="bg-[#00d9ff]/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                                                            <CheckCircle className="h-3 w-3 text-[#00d9ff]" />
                                                        </div>
                                                        <span
                                                            className={`text-white/80 ${lato.className}`}
                                                        >
                                                            {strength}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                        <h3
                                            className={`text-[#ff5e98] font-medium mb-4 flex items-center ${raleway.className}`}
                                        >
                                            <AlertCircle className="h-5 w-5 mr-2" />{" "}
                                            Improvement Areas
                                        </h3>
                                        <ul className="space-y-3">
                                            {processedAnalysis.improvements.map(
                                                (improvement, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div className="bg-[#ff5e98]/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                                                            <AlertCircle className="h-3 w-3 text-[#ff5e98]" />
                                                        </div>
                                                        <span
                                                            className={`text-white/80 ${lato.className}`}
                                                        >
                                                            {improvement}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="text-white border-white/20 hover:bg-white/10"
                                    >
                                        <Link href="/resume-analyzer">
                                            Upload New Resume
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="raw">
                            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
                                <pre className="whitespace-pre-wrap font-mono text-sm text-white/80 p-4 bg-white/5 rounded-lg">
                                    {rawText}
                                </pre>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            variant="outline"
                            className="text-white border-white/20 hover:bg-white/10"
                        >
                            <Link href="/resume-analyzer">
                                Upload New Resume
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
