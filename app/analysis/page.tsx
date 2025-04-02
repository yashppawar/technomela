'use client';

import { Raleway, Lato } from "next/font/google";
import { CheckCircle, AlertCircle, FileText, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '../components/navbar';
import Link from 'next/link';
import { useAnalysis } from '../context/AnalysisProvider';
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
  const { analysis } = useAnalysis();

  if (!analysis) {
    return (
      <div className={`relative min-h-screen w-full bg-[#0a0428] overflow-hidden ${raleway.className}`}>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <Navbar />
          <div className="mt-10 text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-red-500/20">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className={`text-xl font-bold text-white mb-2 ${raleway.className}`}>No Analysis Available</h2>
            <p className={`text-white/70 ${lato.className}`}>Please upload a resume first to see the analysis.</p>
            <Button asChild className="mt-6">
              <Link href="/resume-analyzer">Upload Resume</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative min-h-screen w-full bg-[#0a0428] overflow-hidden ${raleway.className}`}>
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

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="ats">ATS Analysis</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
                {/* Overall Score Circle */}
                <div className="mb-10 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10"></div>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="46" 
                        fill="none" 
                        stroke="url(#scoreGradient)" 
                        strokeWidth="8" 
                        strokeDasharray={`${analysis.overall.score * 2.9}, 1000`}
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
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold text-white ${raleway.className}`}>
                        {analysis.overall.score}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overall Summary */}
                <div className="mb-8">
                  <h3 className={`text-xl font-medium text-white mb-4 ${raleway.className}`}>Overall Summary</h3>
                  <p className={`text-white/80 leading-relaxed ${lato.className}`}>
                    {analysis.overall.summary}
                  </p>
                </div>

                {/* Keywords */}
                <div>
                  <h3 className={`text-xl font-medium text-white mb-4 ${raleway.className}`}>Key Terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.sections.keywords.map((keyword, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm border border-white/10"
                        title={keyword.context || ''}
                      >
                        {keyword.word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strengths">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
                <div className="grid gap-6">
                  {analysis.sections.strengths.map((strength, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 p-6">
                      <h3 className={`text-[#00d9ff] font-medium mb-2 flex items-center ${raleway.className}`}>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        {strength.title}
                      </h3>
                      <p className={`text-white/80 mb-3 ${lato.className}`}>{strength.description}</p>
                      {strength.impact && (
                        <p className={`text-[#00d9ff]/80 text-sm ${lato.className}`}>
                          Impact: {strength.impact}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="improvements">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
                <div className="grid gap-6">
                  {analysis.sections.improvements.map((improvement, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 p-6">
                      <h3 className={`text-[#ff5e98] font-medium mb-2 flex items-center ${raleway.className}`}>
                        <AlertCircle className="h-5 w-5 mr-2" />
                        {improvement.title}
                      </h3>
                      <p className={`text-white/80 mb-3 ${lato.className}`}>{improvement.description}</p>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className={`text-sm font-medium text-[#ff5e98]/90 mb-2 ${raleway.className}`}>
                          Recommendation
                        </h4>
                        <p className={`text-white/70 text-sm ${lato.className}`}>{improvement.recommendation}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ats">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
                {/* ATS Compatibility Score */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl font-medium text-white ${raleway.className}`}>ATS Compatibility</h3>
                    <span className={`text-2xl font-bold text-[#00d9ff] ${raleway.className}`}>
                      {analysis.ats.compatibility.score}%
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className={`text-sm font-medium text-white/90 mb-1 ${raleway.className}`}>Format</h4>
                      <p className={`text-white/70 ${lato.className}`}>{analysis.ats.compatibility.format}</p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium text-white/90 mb-1 ${raleway.className}`}>Parsability</h4>
                      <p className={`text-white/70 ${lato.className}`}>{analysis.ats.compatibility.parsability}</p>
                    </div>
                  </div>
                </div>

                {/* ATS Recommendations */}
                <div>
                  <h3 className={`text-xl font-medium text-white mb-4 ${raleway.className}`}>Recommendations</h3>
                  <ul className="space-y-3">
                    {analysis.ats.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="bg-[#00d9ff]/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#00d9ff]" />
                        </div>
                        <span className={`text-white/80 ${lato.className}`}>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
                {/* Technical Skills */}
                <div className="mb-8">
                  <h3 className={`text-xl font-medium text-white mb-4 ${raleway.className}`}>Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skills.technical.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full bg-[#00d9ff]/10 text-[#00d9ff] text-sm border border-[#00d9ff]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div className="mb-8">
                  <h3 className={`text-xl font-medium text-white mb-4 ${raleway.className}`}>Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skills.soft.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full bg-[#674cd7]/10 text-[#674cd7] text-sm border border-[#674cd7]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {analysis.skills.missing && analysis.skills.missing.length > 0 && (
                  <div>
                    <h3 className={`text-xl font-medium text-white mb-4 ${raleway.className}`}>Suggested Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.skills.missing.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full bg-[#ff5e98]/10 text-[#ff5e98] text-sm border border-[#ff5e98]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
            
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              asChild
              variant="outline" 
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Link href="/resume-analyzer">Upload New Resume</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}