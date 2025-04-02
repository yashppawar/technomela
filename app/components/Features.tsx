"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { BrainCog, LineChart, Target } from "lucide-react";

export default function FeaturesSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (sectionRef.current)
                        observer.unobserve(sectionRef.current);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px",
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const features = [
        {
            icon: BrainCog,
            title: "AI-Powered Analysis",
            description: "Smart Resume Scanning",
            details:
                "Our advanced AI analyzes your resume against current industry standards and job market requirements",
        },
        {
            icon: Target,
            title: "Real-time Optimization",
            description: "Get Instant Feedback",
            details:
                "Receive immediate suggestions to improve your resume's impact and ATS compatibility",
        },
        {
            icon: LineChart,
            title: "Success Tracking",
            description: "Monitor Your Progress",
            details:
                "Track your resume's improvement and success rate across different job applications",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-800/90 via-zinc-900"
        >
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
                {/* Header with animation */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div
                        className={`transform transition-all duration-700 ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-200 relative">
                            Resume Analysis Features
                            <span className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transform transition-all duration-1000 delay-300 origin-left scale-x-0 group-hover:scale-x-100"></span>
                        </h2>
                        <div
                            className={`h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-4 transition-all duration-1000 delay-500 ${
                                isVisible ? "w-20" : "w-0"
                            }`}
                        ></div>
                    </div>
                    <div
                        className={`transform transition-all duration-700 delay-200 ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Leverage the power of AI to optimize your resume and
                            increase your chances of landing your dream job
                        </p>
                    </div>
                </div>

                {/* Divider with animation */}
                <div
                    className={`w-full h-px bg-gray-700/50 mb-20 transform transition-all duration-1000 ${
                        isVisible ? "scale-x-100" : "scale-x-0"
                    }`}
                ></div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center group bg-zinc-800/50 rounded-xl p-8 hover:bg-zinc-800/80 transition-colors duration-300"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? "translateY(0)"
                                        : "translateY(30px)",
                                    transition: `all 700ms ease-out ${
                                        300 + index * 150
                                    }ms`,
                                }}
                            >
                                {/* Icon with pulse animation */}
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 relative">
                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl animate-pulse"></div>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative z-10">
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 bg-[length:200%_100%] animate-shimmer"></div>
                                        <Icon className="w-8 h-8 text-white relative z-10" />
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="text-center mb-6">
                                    <h3 className="text-xl text-gray-200 font-medium mb-2 group-hover:text-white transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-indigo-400 font-medium group-hover:text-indigo-300 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                                    {feature.details}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                .animate-shimmer {
                    animation: shimmer 4s infinite linear;
                }
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 0.4;
                    }
                }
                .animate-pulse {
                    animation: pulse 3s infinite;
                }
            `}</style>
        </section>
    );
}
