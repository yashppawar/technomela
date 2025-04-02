'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Raleway, Lato } from "next/font/google";
import { CheckCircle, AlertCircle, FileText, ArrowLeft, Search, Bell, MoreVertical, Filter, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '../components/navbar';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import FeedbackForm from '../components/FeedbackForm';

// Adding Raleway and Lato fonts
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

// Sample data for charts
const skillsData = [
  { name: "Technical Skills", score: 85 },
  { name: "Soft Skills", score: 75 },
  { name: "Leadership", score: 65 },
  { name: "Communication", score: 80 },
];

const experienceData = [
  { name: "Work Experience", value: 60 },
  { name: "Projects", value: 25 },
  { name: "Certifications", value: 15 },
];

const keywordsData = [
  { name: "Python", score: 95 },
  { name: "Data Analysis", score: 85 },
  { name: "Project Management", score: 70 },
  { name: "Machine Learning", score: 65 },
  { name: "API Development", score: 80 },
];

const matchTrendData = [
  { month: "Jan", score: 40 },
  { month: "Feb", score: 55 },
  { month: "Mar", score: 65 },
  { month: "Apr", score: 75 },
  { month: "May", score: 85 },
];

const weeklyProgress = [
  { day: "Sun", value: 20 },
  { day: "Mon", value: 40 },
  { day: "Tue", value: 30 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 50 },
  { day: "Sat", value: 35 },
];

const COLORS = ["#8b5cf6", "#3b82f6", "#10B981"];
const TAB_VALUES = ["overview", "skills", "experience", "keywords"];

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
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto switch tabs for demo effect
    const interval = setInterval(() => {
      const currentIndex = TAB_VALUES.indexOf(activeTab);
      const nextIndex = (currentIndex + 1) % TAB_VALUES.length;
      setActiveTab(TAB_VALUES[nextIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeTab]);
  
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
    <div className={`min-h-screen w-full bg-[#18181b] ${raleway.className}`}>
      <div className="flex">
        {/* Left sidebar similar to Spectra dashboard */}
        <div className="w-full">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-[#202024] py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-white text-2xl font-medium">Analysis</h1>
            </div>
            
            <div className="flex items-center">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search here..." 
                  className="w-full bg-[#2a2a31] border-none rounded-full py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="p-6">
            <div className="mb-6 flex items-center">
              <Link 
                href="/resume-analyzer" 
                className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Upload</span>
              </Link>
            </div>
            
            {loading && (
              <div className="mt-10 text-center">
                <div className="w-16 h-16 border-4 border-indigo-300/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className={`text-gray-300 ${lato.className}`}>Loading analysis results...</p>
              </div>
            )}
            
            {error && !loading && (
              <div className="mt-10 text-center p-8 bg-[#2a2a31] rounded-xl border border-red-500/20">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className={`text-xl font-bold text-white mb-2 ${raleway.className}`}>Error Loading Analysis</h2>
                <p className={`text-gray-400 ${lato.className}`}>{error}</p>
                <Button asChild className="mt-6 bg-indigo-500 hover:bg-indigo-600">
                  <Link href="/resume-analyzer">Try Again</Link>
                </Button>
              </div>
            )}
            
            {analysis && !loading && !error && (
              <div className="space-y-6">
                <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100/10 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-white text-lg font-medium">
                        {filename ? decodeURIComponent(filename).split('-').slice(2).join('-') : 'Resume Analysis'}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {analysis.fileSize ? `${Math.round(analysis.fileSize / 1024)} KB` : 'Unknown'} • Uploaded {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      className="bg-[#2a2a31] text-gray-300 border-none hover:bg-[#34343d] flex items-center gap-2"
                      onClick={() => window.print()}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </Button>
                  </div>
                </div>
                
                {/* Main grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Score Card */}
                  <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-600/20 border-none rounded-xl overflow-hidden shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2 text-white">
                          <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-1.5 rounded-md text-white flex items-center justify-center shadow-md">
                            <span className="text-lg">📈</span>
                          </div>
                          <span>Resume Score</span>
                        </CardTitle>
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">
                          {analysis.analysis.score}<span className="text-xl text-indigo-300">/100</span>
                        </div>
                        <div className="bg-indigo-500/20 px-2 py-1 rounded-md flex items-center gap-1 text-indigo-300 text-sm border border-indigo-500/30">
                          <span>+14%</span>
                          <span>Since last analysis</span>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <div className="relative w-36 h-36">
                          {/* Background circle */}
                          <div className="absolute inset-0 rounded-full bg-indigo-950/30 border border-indigo-500/20"></div>
                          
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
                                <stop offset="0%" stopColor="#818cf8" />
                                <stop offset="100%" stopColor="#6366f1" />
                              </linearGradient>
                            </defs>
                          </svg>
                          
                          {/* Score text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">
                              {analysis.analysis.score}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Activity Card (Replacing Skills Distribution) */}
                  <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-none rounded-xl overflow-hidden col-span-1 lg:col-span-2 xl:col-span-1 shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white flex items-center gap-2">
                          <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-1.5 rounded-md text-white flex items-center justify-center shadow-md">
                            <span className="text-lg">📊</span>
                          </div>
                          <span>Activity</span>
                        </CardTitle>
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3 h-[220px]">
                      <div className="flex items-center gap-4 mb-2">
                        <button className="text-indigo-400 border-b-2 border-indigo-400 pb-1 text-sm font-medium">Overall</button>
                        <button className="text-gray-400 hover:text-white pb-1 text-sm">Details</button>
                      </div>
                      
                      <div className="flex justify-center items-center mt-4">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#44444d"
                              strokeWidth="8"
                            />
                            
                            {/* Progress arcs */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="url(#purpleGradient)"
                              strokeWidth="8"
                              strokeDasharray={`${analysis.analysis.score * 1.25}, 1000`}
                              strokeLinecap="round"
                              transform="rotate(-90, 50, 50)"
                            />
                            
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="url(#orangeGradient)"
                              strokeWidth="8"
                              strokeDasharray="45, 1000"
                              strokeLinecap="round"
                              transform="rotate(35, 50, 50)"
                            />
                            
                            <defs>
                              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#a78bfa" />
                              </linearGradient>
                              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#fb923c" />
                              </linearGradient>
                            </defs>
                          </svg>
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-white">+13%</span>
                            <span className="text-xs text-gray-400">Since last analysis</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="flex items-center gap-2 bg-zinc-800/50 p-2 rounded-lg border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                          <span className="text-sm text-gray-300">Keywords</span>
                          <span className="ml-auto text-sm text-white font-medium">452</span>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-zinc-800/50 p-2 rounded-lg border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span className="text-sm text-gray-300">Sections</span>
                          <span className="ml-auto text-sm text-white font-medium">412</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Experience Breakdown Card */}
                  <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-none rounded-xl overflow-hidden col-span-1 lg:col-span-2 xl:col-span-1 shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white flex items-center gap-2">
                          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-1.5 rounded-md text-white flex items-center justify-center shadow-md">
                            <span className="text-lg">💼</span>
                          </div>
                          <span>Experience Breakdown</span>
                        </CardTitle>
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3 h-[220px]">
                      <div className="h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={experienceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              stroke="rgba(30, 30, 46, 0.8)"
                              strokeWidth={2}
                            >
                              {experienceData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                  style={{
                                    filter: `drop-shadow(0px 0px 5px ${COLORS[index % COLORS.length]}80)`
                                  }}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(30, 30, 46, 0.9)',
                                borderColor: 'rgba(139, 92, 246, 0.3)',
                                color: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Strengths & Weaknesses Table */}
                  <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-none rounded-xl overflow-hidden col-span-1 lg:col-span-2 shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white flex items-center gap-2">
                          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-1.5 rounded-md text-white flex items-center justify-center shadow-md">
                            <span className="text-lg">✨</span>
                          </div>
                          <span>Analysis Details</span>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <button className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-gray-400 hover:bg-zinc-700 hover:text-white transition-colors">
                            <Filter className="h-4 w-4" />
                          </button>
                          <button className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-2 rounded-lg text-white hover:opacity-90 transition-opacity shadow-lg">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="overflow-auto">
                      <div className="flex flex-col md:flex-row gap-8 md:gap-4">
                        <div className="flex-1 border-b border-indigo-700/30 pb-4">
                          <h3 className="text-indigo-400 text-sm font-medium flex items-center gap-2">
                            <div className="bg-indigo-400/10 p-1 rounded-md">
                              <CheckCircle className="h-4 w-4 text-indigo-400" />
                            </div>
                            Strengths
                          </h3>
                          <ul className="mt-3 space-y-3">
                            {analysis.analysis.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-3 text-gray-300 group">
                                <div className="mt-1 text-indigo-400 bg-indigo-400/10 p-[3px] rounded-full group-hover:bg-indigo-400/20 transition-colors">
                                  <CheckCircle className="h-3 w-3" />
                                </div>
                                <span className="text-sm group-hover:text-white transition-colors">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex-1 border-b border-orange-700/30 pb-4">
                          <h3 className="text-orange-400 text-sm font-medium flex items-center gap-2">
                            <div className="bg-orange-400/10 p-1 rounded-md">
                              <AlertCircle className="h-4 w-4 text-orange-400" />
                            </div>
                            Areas to Improve
                          </h3>
                          <ul className="mt-3 space-y-3">
                            {analysis.analysis.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start gap-3 text-gray-300 group">
                                <div className="mt-1 text-orange-400 bg-orange-400/10 p-[3px] rounded-full group-hover:bg-orange-400/20 transition-colors">
                                  <AlertCircle className="h-3 w-3" />
                                </div>
                                <span className="text-sm group-hover:text-white transition-colors">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Skills Distribution Chart */}
                  <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-none rounded-xl overflow-hidden col-span-1 lg:col-span-1 shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white flex items-center gap-2">
                          <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-1.5 rounded-md text-white flex items-center justify-center shadow-md">
                            <span className="text-lg">🧩</span>
                          </div>
                          <span>Skills Distribution</span>
                        </CardTitle>
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={skillsData}
                            layout="vertical"
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid 
                              strokeDasharray="3 3" 
                              horizontal={true}
                              vertical={false}
                              stroke="rgba(255,255,255,0.1)" 
                            />
                            <XAxis 
                              type="number" 
                              domain={[0, 100]} 
                              tick={{ fill: '#9ca3af' }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis 
                              type="category" 
                              dataKey="name" 
                              tick={{ fill: '#9ca3af' }}
                              axisLine={false}
                              tickLine={false}
                              width={120}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(30, 30, 46, 0.9)',
                                borderColor: 'rgba(139, 92, 246, 0.3)',
                                color: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                              }}
                            />
                            <Bar 
                              dataKey="score" 
                              fill="url(#skillsBarGradient)" 
                              radius={[0, 4, 4, 0]}
                            />
                            <defs>
                              <linearGradient id="skillsBarGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#c084fc" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
                              </linearGradient>
                            </defs>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-90 transition-opacity text-white border-none shadow-lg px-6 py-5"
                    onClick={() => setFeedbackOpen(true)}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Feedback form modal */}
      <FeedbackForm 
        isOpen={feedbackOpen} 
        onClose={() => setFeedbackOpen(false)} 
      />
    </div>
  );
} 