'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Raleway, Lato } from "next/font/google";
import { CheckCircle, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '../components/navbar';
import Link from 'next/link';

// Adding Raleway and Lato fonts
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

// Define analysis result type
type AnalysisResult = {
  filename: string;
  fileSize: number;
  success: boolean;
  analysis: {
    score: number;
    suggestions: string[];
    strengths: string[];
  }
};

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const filename = searchParams.get('filename');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!filename) {
        setError('No filename provided');
        setLoading(false);
        return;
      }
      
      try {
        // In a real implementation, you would fetch the analysis result from the server
        // For this example, we'll just simulate it with static data
        
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock analysis data
        const mockAnalysis: AnalysisResult = {
          filename: filename,
          fileSize: 128000, // Approximated file size
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
        
        setAnalysis(mockAnalysis);
      } catch (err: any) {
        console.error('Failed to fetch analysis:', err);
        setError(err.message || 'Failed to fetch analysis');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalysis();
  }, [filename]);
  
  return (
    <div className={`relative min-h-screen w-full bg-[#0a0428] overflow-hidden ${raleway.className}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left glow */}
        <div className="absolute -left-20 top-1/3 w-40 h-80 bg-[#4b3c8c]/30 rounded-full blur-3xl"></div>
        
        {/* Right glow */}
        <div className="absolute -right-20 top-1/4 w-40 h-80 bg-[#254896]/30 rounded-full blur-3xl"></div>
        
        {/* Bottom glow */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-100px] w-full h-40 bg-[#ff5e98]/20 rounded-full blur-3xl"></div>
        
        {/* Floating document illustration */}
        <div className="absolute top-1/4 right-[15%] w-16 h-20 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 transform rotate-12 shadow-lg">
          <div className="h-3 w-8 bg-[#00d9ff]/30 rounded-sm absolute top-3 left-2"></div>
          <div className="h-2 w-10 bg-white/20 rounded-sm absolute top-8 left-2"></div>
          <div className="h-2 w-8 bg-white/20 rounded-sm absolute top-12 left-2"></div>
          <div className="h-2 w-6 bg-white/20 rounded-sm absolute top-16 left-2"></div>
        </div>
        
        {/* Decorative floating dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]"></div>
      </div>

      {/* Main content */}
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
          <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${raleway.className}`}>
            Resume Analysis Results
          </h1>
          
          {loading && (
            <div className="mt-10 text-center">
              <div className="w-16 h-16 border-4 border-[#674cd7]/30 border-t-[#674cd7] rounded-full animate-spin mx-auto mb-4"></div>
              <p className={`text-white ${lato.className}`}>Loading analysis results...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className="mt-10 text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-red-500/20">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className={`text-xl font-bold text-white mb-2 ${raleway.className}`}>Error Loading Analysis</h2>
              <p className={`text-white/70 ${lato.className}`}>{error}</p>
              <Button asChild className="mt-6">
                <Link href="/resume-analyzer">Try Again</Link>
              </Button>
            </div>
          )}
          
          {analysis && !loading && !error && (
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
                <div className="bg-white/10 rounded-full p-4 backdrop-blur-md border border-white/20">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-medium text-white mb-1 ${raleway.className}`}>
                    {filename ? decodeURIComponent(filename).split('-').slice(2).join('-') : 'Resume Analysis'}
                  </h2>
                  <p className={`text-white/60 ${lato.className}`}>
                    File size: {analysis.fileSize ? `${Math.round(analysis.fileSize / 1024)} KB` : 'Unknown'}
                  </p>
                </div>
              </div>
              
              <div className="mb-10 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  {/* Background circle */}
                  <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10"></div>
                  
                  {/* Score circle with gradient */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="46" 
                      fill="none" 
                      stroke="url(#scoreGradient)" 
                      strokeWidth="8" 
                      strokeDasharray={`${analysis.analysis.score * 2.9}, 1000`}
                      strokeLinecap="round"
                      transform="rotate(-90, 50, 50)"
                    />
                    
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d9ff" />
                        <stop offset="100%" stopColor="#674cd7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Score text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold text-white ${raleway.className}`}>
                      {analysis.analysis.score}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-2">
                <h3 className={`text-xl font-medium text-white mb-4 ${raleway.className}`}>Analysis Summary</h3>
                <p className={`text-white/80 mb-6 ${lato.className}`}>
                  {analysis.analysis.score >= 80 
                    ? 'Your resume is well-structured and presents your qualifications effectively. With a few small improvements, you can make it even more impactful.' 
                    : analysis.analysis.score >= 60 
                      ? 'Your resume has good elements but needs some improvements to stand out to recruiters and ATS systems.'
                      : 'Your resume needs significant improvements to effectively showcase your qualifications and pass through ATS systems.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className={`text-[#00d9ff] font-medium mb-4 flex items-center ${raleway.className}`}>
                    <CheckCircle className="h-5 w-5 mr-2" /> Strengths
                  </h3>
                  <ul className="space-y-3">
                    {analysis.analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="bg-[#00d9ff]/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                          <CheckCircle className="h-3 w-3 text-[#00d9ff]" />
                        </div>
                        <span className={`text-white/80 ${lato.className}`}>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className={`text-[#ff5e98] font-medium mb-4 flex items-center ${raleway.className}`}>
                    <AlertCircle className="h-5 w-5 mr-2" /> Improvement Areas
                  </h3>
                  <ul className="space-y-3">
                    {analysis.analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="bg-[#ff5e98]/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                          <AlertCircle className="h-3 w-3 text-[#ff5e98]" />
                        </div>
                        <span className={`text-white/80 ${lato.className}`}>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-[#00d9ff] to-[#674cd7] text-white border-none hover:opacity-90"
                >
                  Download Detailed Report
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  <Link href="/resume-analyzer">Upload New Resume</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 