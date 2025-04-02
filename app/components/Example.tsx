"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const COLORS = ["#7C3AED", "#3B82F6", "#10B981"];
const TAB_VALUES = ["overview", "skills", "experience", "keywords"];

export default function Example() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            const currentIndex = TAB_VALUES.indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % TAB_VALUES.length;
            setActiveTab(TAB_VALUES[nextIndex]);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeTab]);

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-800/90 via-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/20"></div>

            {/* Animated gradient orbs */}
            <div
                className={`absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl transition-opacity duration-1000 ${
                    isVisible ? "opacity-70" : "opacity-0"
                }`}
            ></div>
            <div
                className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl transition-opacity duration-1000 delay-300 ${
                    isVisible ? "opacity-70" : "opacity-0"
                }`}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-100">
                        Resume Analysis Demo
                    </h2>
                    <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                        See how our AI-powered analysis breaks down your resume
                        and provides valuable insights
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <div className="flex justify-center mb-8">
                            <TabsList className="grid grid-cols-4 w-[600px] rounded-full p-1 bg-zinc-800/50">
                                <TabsTrigger
                                    value="overview"
                                    className="rounded-full text-gray-300 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="skills"
                                    className="rounded-full text-gray-300 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    Skills
                                </TabsTrigger>
                                <TabsTrigger
                                    value="experience"
                                    className="rounded-full text-gray-300 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    Experience
                                </TabsTrigger>
                                <TabsTrigger
                                    value="keywords"
                                    className="rounded-full text-gray-300 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    Keywords
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="relative">
                            <div className="min-h-[500px] max-h-[600px] h-[600px] flex items-center">
                                <TabsContent
                                    value="overview"
                                    className="m-0 w-full h-full"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                                    >
                                        {/* Cards with consistent dark theme styling */}
                                        <Card className="bg-zinc-800/50 border-none shadow-lg hover:bg-zinc-800/80 transition-all duration-300 group">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-gray-100">
                                                    <span className="text-2xl">
                                                        📈
                                                    </span>
                                                    Match Score
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-5xl font-bold text-indigo-400">
                                                    85%
                                                </div>
                                                <p className="text-sm text-gray-300 mt-2">
                                                    Overall match with job
                                                    requirements
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card className="bg-zinc-800/50 border-none shadow-lg hover:bg-zinc-800/80 transition-all duration-300 group">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-gray-100">
                                                    <span className="text-2xl">
                                                        💪
                                                    </span>
                                                    Key Strengths
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2 text-gray-300">
                                                    {[
                                                        "Strong technical background",
                                                        "Project management",
                                                        "Team leadership",
                                                    ].map((strength) => (
                                                        <li
                                                            key={strength}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                                                            {strength}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>

                                        <Card className="bg-zinc-800/50 border-none shadow-lg hover:bg-zinc-800/80 transition-all duration-300 group">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-gray-100">
                                                    <span className="text-2xl">
                                                        🎯
                                                    </span>
                                                    Areas to Improve
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2 text-gray-300">
                                                    {[
                                                        "Certifications",
                                                        "International experience",
                                                        "Publications",
                                                    ].map((area) => (
                                                        <li
                                                            key={area}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                                                            {area}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>

                                <TabsContent
                                    value="skills"
                                    className="m-0 w-full h-full"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="w-full"
                                    >
                                        <Card className="bg-zinc-800/50 border-none shadow-lg hover:bg-zinc-800/80 transition-all duration-300">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-gray-100">
                                                    <span className="text-2xl">
                                                        🎯
                                                    </span>
                                                    Skills Distribution
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[400px] text-gray-300">
                                                <ResponsiveContainer
                                                    width="100%"
                                                    height="100%"
                                                >
                                                    <BarChart
                                                        data={skillsData}
                                                        margin={{
                                                            top: 20,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            className="opacity-10"
                                                        />
                                                        <XAxis
                                                            dataKey="name"
                                                            stroke="#D1D5DB"
                                                        />
                                                        <YAxis stroke="#D1D5DB" />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor:
                                                                    "#1F2937",
                                                                border: "none",
                                                                borderRadius:
                                                                    "0.5rem",
                                                            }}
                                                            labelStyle={{
                                                                color: "#F3F4F6",
                                                            }}
                                                        />
                                                        <Bar dataKey="score">
                                                            {skillsData.map(
                                                                (_, index) => (
                                                                    <Cell
                                                                        key={`cell-${index}`}
                                                                        fill={`hsl(${
                                                                            250 +
                                                                            index *
                                                                                30
                                                                        }, 70%, 60%)`}
                                                                    />
                                                                )
                                                            )}
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>

                                <TabsContent
                                    value="experience"
                                    className="m-0 w-full h-full"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <Card className="bg-zinc-800/50 border-none shadow-lg hover:bg-zinc-800/80 transition-all duration-300">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-gray-100">
                                                    <span className="text-2xl">
                                                        💼
                                                    </span>
                                                    Experience Breakdown
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[400px] text-gray-300">
                                                <ResponsiveContainer
                                                    width="100%"
                                                    height="100%"
                                                >
                                                    <PieChart>
                                                        <Pie
                                                            data={
                                                                experienceData
                                                            }
                                                            cx="50%"
                                                            cy="50%"
                                                            labelLine={false}
                                                            label={({
                                                                name,
                                                                value,
                                                            }) =>
                                                                `${name}: ${value}%`
                                                            }
                                                            outerRadius={150}
                                                            dataKey="value"
                                                        >
                                                            {experienceData.map(
                                                                (
                                                                    entry,
                                                                    index
                                                                ) => (
                                                                    <Cell
                                                                        key={`cell-${index}`}
                                                                        fill={
                                                                            COLORS[
                                                                                index %
                                                                                    COLORS.length
                                                                            ]
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </Pie>
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor:
                                                                    "#1F2937",
                                                                border: "none",
                                                                borderRadius:
                                                                    "0.5rem",
                                                            }}
                                                            labelStyle={{
                                                                color: "#F3F4F6",
                                                            }}
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>

                                <TabsContent
                                    value="keywords"
                                    className="m-0 w-full h-full"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <Card className="bg-zinc-800/50 border-none shadow-lg hover:bg-zinc-800/80 transition-all duration-300">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-gray-100">
                                                    <span className="text-2xl">
                                                        🔍
                                                    </span>
                                                    Keyword Analysis
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid gap-8 md:grid-cols-2">
                                                    <div>
                                                        <h4 className="font-semibold mb-4 text-lg flex items-center gap-2 text-gray-100">
                                                            <span className="text-indigo-400">
                                                                ✓
                                                            </span>
                                                            Found Keywords
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {[
                                                                "React",
                                                                "TypeScript",
                                                                "Node.js",
                                                                "Project Management",
                                                                "Agile",
                                                                "Team Leadership",
                                                            ].map((keyword) => (
                                                                <span
                                                                    key={
                                                                        keyword
                                                                    }
                                                                    className="px-3 py-1.5 bg-indigo-500/10 text-indigo-200 rounded-full text-sm font-medium transition-all hover:scale-105 hover:bg-indigo-500/20"
                                                                >
                                                                    {keyword}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold mb-4 text-lg flex items-center gap-2 text-gray-100">
                                                            <span className="text-purple-400">
                                                                ×
                                                            </span>
                                                            Missing Keywords
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {[
                                                                "DevOps",
                                                                "AWS",
                                                                "Machine Learning",
                                                            ].map((keyword) => (
                                                                <span
                                                                    key={
                                                                        keyword
                                                                    }
                                                                    className="px-3 py-1.5 bg-purple-500/10 text-purple-200 rounded-full text-sm font-medium transition-all hover:scale-105 hover:bg-purple-500/20"
                                                                >
                                                                    {keyword}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>
                            </div>
                        </div>
                    </Tabs>
                </motion.div>
            </div>
        </section>
    );
}
