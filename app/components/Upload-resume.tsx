'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, Zap, Lock, BarChart, Loader2 } from 'lucide-react';
import { Raleway, Lato } from "next/font/google";
import Navbar from './navbar';
import { useRouter } from 'next/navigation';

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

export default function UploadResume() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    // Reset states when a new file is selected
    setAnalysisResult(null);
    setError(null);
    
    if (selectedFile) {
      // Check if file is PDF
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setUploadStatus('success');
      } else {
        setFile(null);
        setUploadStatus('error');
        setError('Please upload a PDF file');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    try {
      setIsAnalyzing(true);
      setError(null);
      
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('resume', file);
      
      // Make the API request
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      // Parse the response JSON
      const data = await response.json();
      
      // Check if response is not ok, throw the error from the API
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }
      
      // Set the analysis result in state
      setAnalysisResult(data);
      
      // Redirect to the analysis page with the filename as a query parameter
      router.push(`/analysis?filename=${encodeURIComponent(data.filename)}`);
      
    } catch (err: any) {
      console.error('Error analyzing resume:', err);
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={`relative h-screen w-full bg-[#0a0428] overflow-hidden flex flex-col ${raleway.className}`}>
      {/* Decorative elements - similar to the image but more subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left cylinder */}
        <div className="absolute -left-10 top-1/3 w-56 h-72 opacity-70">
          <div className="absolute top-0 w-full h-16 rounded-full bg-gradient-to-b from-[#4b3c8c]/40 to-[#322473]/40 backdrop-blur-md"></div>
          <div className="absolute top-10 w-full h-52 bg-gradient-to-b from-[#322473]/30 to-[#241a4f]/30 backdrop-blur-md"></div>
          <div className="absolute bottom-0 w-full h-16 rounded-full bg-gradient-to-t from-[#241a4f]/40 to-[#322473]/40 backdrop-blur-md"></div>
          {/* Glowing base */}
          <div className="absolute bottom-14 left-1/4 w-28 h-4 bg-white/20 rounded-full blur-md"></div>
        </div>
        
        {/* Right cylinder */}
        <div className="absolute -right-10 top-1/3 w-56 h-72 opacity-70">
          <div className="absolute top-0 w-full h-16 rounded-full bg-gradient-to-b from-[#254896]/40 to-[#1a347c]/40 backdrop-blur-md"></div>
          <div className="absolute top-10 w-full h-52 bg-gradient-to-b from-[#1a347c]/30 to-[#13245a]/30 backdrop-blur-md"></div>
          <div className="absolute bottom-0 w-full h-16 rounded-full bg-gradient-to-t from-[#13245a]/40 to-[#1a347c]/40 backdrop-blur-md"></div>
          {/* Glowing base */}
          <div className="absolute bottom-14 right-1/4 w-28 h-4 bg-white/20 rounded-full blur-md"></div>
        </div>
        
        {/* Bottom center decorative element - smaller pink cylinder */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-100px] w-64 h-48 opacity-70">
          <div className="absolute top-0 w-full h-16 rounded-full bg-gradient-to-b from-[#ff5e98]/30 to-[#ff4577]/30 backdrop-blur-md"></div>
          <div className="absolute top-12 w-full h-30 bg-gradient-to-b from-[#ff4577]/20 to-[#ff2957]/20 backdrop-blur-md"></div>
          {/* Glowing base */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-white/20 rounded-full blur-md"></div>
        </div>
        
        {/* Floating document illustrations - similar to the reference */}
        <div className="absolute top-1/4 right-[15%] w-16 h-20 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 transform rotate-12 shadow-lg">
          <div className="h-3 w-8 bg-[#00d9ff]/30 rounded-sm absolute top-3 left-2"></div>
          <div className="h-2 w-10 bg-white/20 rounded-sm absolute top-8 left-2"></div>
          <div className="h-2 w-8 bg-white/20 rounded-sm absolute top-12 left-2"></div>
          <div className="h-2 w-6 bg-white/20 rounded-sm absolute top-16 left-2"></div>
        </div>
        
        <div className="absolute bottom-1/4 left-[15%] w-16 h-20 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 transform -rotate-6 shadow-lg">
          <div className="h-6 w-6 bg-[#ff5e98]/30 rounded-full absolute top-3 left-5"></div>
          <div className="h-2 w-10 bg-white/20 rounded-sm absolute top-12 left-3"></div>
          <div className="h-2 w-8 bg-white/20 rounded-sm absolute top-16 left-3"></div>
        </div>
        
        {/* Decorative floating dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.3)]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full container mx-auto px-4">
        
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8">
            <h1 className={`text-4xl md:text-5xl font-bold text-white mb-3 ${raleway.className}`}>
              Resume analysis
            </h1>
            <p className={`text-lg text-white/70 max-w-xl mx-auto ${lato.className}`}>
              Let our AI analyze your resume and get instant feedback
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto mb-6 md:mb-10">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#00d9ff]/20 flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-[#00d9ff]" />
              </div>
              <h3 className={`text-white text-sm font-medium mb-1 ${raleway.className}`}>Instant Analysis</h3>
              <p className={`text-white/60 text-xs ${lato.className}`}>Get results in seconds</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#ff5e98]/20 flex items-center justify-center mb-2">
                <Lock className="h-5 w-5 text-[#ff5e98]" />
              </div>
              <h3 className={`text-white text-sm font-medium mb-1 ${raleway.className}`}>Private & Secure</h3>
              <p className={`text-white/60 text-xs ${lato.className}`}>Your data stays confidential</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#674cd7]/20 flex items-center justify-center mb-2">
                <BarChart className="h-5 w-5 text-[#674cd7]" />
              </div>
              <h3 className={`text-white text-sm font-medium mb-1 ${raleway.className}`}>Detailed Insights</h3>
              <p className={`text-white/60 text-xs ${lato.className}`}>Comprehensive feedback</p>
            </div>
          </div>
          
          <div className="w-full max-w-2xl mx-auto relative">
            {/* Glass card */}
            <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(103,76,215,0.15)]">
              {!analysisResult ? (
                <>
                  <div 
                    className={`
                      border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all
                      ${isDragging ? 'border-[#ff5e98] bg-[#ff5e98]/5' : 'border-white/20 hover:border-white/30'}
                      ${uploadStatus === 'success' ? 'border-[#00d9ff]/70 bg-[#00d9ff]/5' : ''}
                      ${uploadStatus === 'error' ? 'border-[#ff4577]/70 bg-[#ff4577]/5' : ''}
                      backdrop-blur-sm
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                  >
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef}
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)} 
                    />
                    
                    {uploadStatus === 'idle' && (
                      <div className="flex flex-col items-center">
                        {/* Glowing cylinder for upload icon */}
                        <div className="relative mb-4">
                          <div className="w-20 h-4 bg-[#674cd7]/40 rounded-full blur-md"></div>
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-b from-[#674cd7]/30 to-[#4b3c8c]/10 backdrop-blur-md flex items-center justify-center">
                            <Upload className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <p className={`text-white text-xl font-medium mb-1 ${raleway.className}`}>
                          Upload your resume
                        </p>
                        <p className={`text-white/60 text-sm ${lato.className}`}>
                          Drop your PDF file here, or click to browse
                        </p>
                      </div>
                    )}
                    
                    {uploadStatus === 'success' && (
                      <div className="flex flex-col items-center">
                        {/* Glowing cylinder for success icon */}
                        <div className="relative mb-4">
                          <div className="w-20 h-4 bg-[#00d9ff]/40 rounded-full blur-md"></div>
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-b from-[#00d9ff]/30 to-[#0088ff]/10 backdrop-blur-md flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <p className={`text-white text-xl font-medium mb-1 ${raleway.className}`}>
                          {file?.name}
                        </p>
                        <p className={`text-[#00d9ff]/90 text-sm ${lato.className}`}>
                          Ready for analysis
                        </p>
                      </div>
                    )}
                    
                    {uploadStatus === 'error' && (
                      <div className="flex flex-col items-center">
                        {/* Glowing cylinder for error icon */}
                        <div className="relative mb-4">
                          <div className="w-20 h-4 bg-[#ff4577]/40 rounded-full blur-md"></div>
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-b from-[#ff4577]/30 to-[#ff2957]/10 backdrop-blur-md flex items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <p className={`text-white text-xl font-medium mb-1 ${raleway.className}`}>
                          Invalid file format
                        </p>
                        <p className={`text-[#ff4577]/90 text-sm ${lato.className}`}>
                          Please upload a PDF file
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-[#ff4577]/10 border border-[#ff4577]/30 rounded-lg">
                      <p className="text-[#ff4577] text-sm">{error}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleSubmit}
                      disabled={!file || uploadStatus === 'error' || isAnalyzing}
                      className={`
                        px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]
                        ${!file || uploadStatus === 'error' || isAnalyzing
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-white text-[#0a0428] hover:bg-white/90'
                        }
                      `}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          {file ? 'Analyze Resume' : 'Upload Resume First'} 
                          {file && <ArrowRight className="h-4 w-4" />}
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                // Analysis Results View
                <div className="text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold ${raleway.className}`}>Analysis Results</h2>
                    <Button 
                      onClick={() => {
                        setAnalysisResult(null);
                        setFile(null);
                        setUploadStatus('idle');
                      }}
                      variant="ghost" 
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      New Analysis
                    </Button>
                  </div>
                  
                  <div className="mb-6 flex items-center">
                    <div className="w-16 h-16 rounded-full bg-[#00d9ff]/20 flex items-center justify-center mr-4">
                      <span className={`text-2xl font-bold text-[#00d9ff] ${raleway.className}`}>{analysisResult.analysis.score}</span>
                    </div>
                    <div>
                      <h3 className={`text-xl font-medium ${raleway.className}`}>Resume Score</h3>
                      <p className={`text-white/60 text-sm ${lato.className}`}>
                        {analysisResult.analysis.score >= 80 
                          ? 'Excellent resume! You\'re ready to apply.' 
                          : analysisResult.analysis.score >= 60 
                            ? 'Good resume with some room for improvement.'
                            : 'Your resume needs significant improvements.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <h3 className={`text-[#00d9ff] text-sm font-medium mb-2 ${raleway.className}`}>Strengths</h3>
                      <ul className="space-y-2">
                        {analysisResult.analysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#00d9ff] mt-0.5 flex-shrink-0" />
                            <span className={`text-white/80 text-sm ${lato.className}`}>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <h3 className={`text-[#ff5e98] text-sm font-medium mb-2 ${raleway.className}`}>Improvement Areas</h3>
                      <ul className="space-y-2">
                        {analysisResult.analysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-[#ff5e98] mt-0.5 flex-shrink-0" />
                            <span className={`text-white/80 text-sm ${lato.className}`}>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-[#0a0428]/50 rounded-xl p-3 text-center">
                    <p className={`text-white/60 text-xs ${lato.className}`}>
                      File analyzed: <span className="text-white/80">{analysisResult.filename}</span> ({Math.round(analysisResult.fileSize / 1024)} KB)
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Floating decorative elements around the card */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#674cd7]/20 rounded-full blur-lg"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#ff5e98]/20 rounded-full blur-lg"></div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-6 md:mt-10 text-center">
            <p className={`text-white/40 text-xs mb-2 ${lato.className}`}>TRUSTED BY THOUSANDS OF JOB SEEKERS</p>
            <div className="flex justify-center space-x-4 items-center">
              <div className="h-4 w-16 bg-white/20 rounded"></div>
              <div className="h-4 w-20 bg-white/20 rounded"></div>
              <div className="h-4 w-14 bg-white/20 rounded"></div>
              <div className="h-4 w-18 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom padding */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}
