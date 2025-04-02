"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define feedback interface
interface Feedback {
    _id: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function Testimonials() {
    const [isVisible, setIsVisible] = useState(false);
    const [testimonials, setTestimonials] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsVisible(true);
        
        // Fetch testimonials from API
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/feedback');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                
                const data = await response.json();
                if (data.success && Array.isArray(data.data)) {
                    setTestimonials(data.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError('Unable to load testimonials');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchTestimonials();
    }, []);

    // Display stars based on rating
    const renderStars = (rating: number) => {
        return (
            <div className="flex space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                        key={star}
                        className={`w-5 h-5 ${rating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
                        fill={rating >= star ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section className="relative py-20 px-6 lg:px-16 bg-gradient-to-b from-zinc-900 to-zinc-800/90 via-zinc-900">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/20"></div>

            {/* Animated gradient orbs */}
            <div
                className={`absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl transition-opacity duration-1000 ${
                    isVisible ? "opacity-70" : "opacity-0"
                }`}
            ></div>
            {/* <div
                className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl transition-opacity duration-1000 delay-300 ${
                    isVisible ? "opacity-70" : "opacity-0"
                }`}
            ></div> */}

            <div className="container mx-auto relative z-30">
                <div className="w-full flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
                            Resume Reviews
                        </h2>
                        <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                            See what our users say about their resume analysis
                            experience
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="w-full flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-gray-300 p-8 bg-zinc-800/50 rounded-lg border border-zinc-700 max-w-md mx-auto">
                            <p>{error}</p>
                            <p className="mt-2 text-sm">Check back later for user testimonials</p>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center text-gray-300 p-8 bg-zinc-800/50 rounded-lg border border-zinc-700 max-w-md mx-auto">
                            <p>No reviews yet</p>
                            <p className="mt-2 text-sm">Be the first to share your experience</p>
                        </div>
                    ) : (
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full max-w-6xl mx-auto"
                        >
                            <CarouselContent className="-ml-4 md:-ml-6">
                                {testimonials.map((testimonial, index) => (
                                    <CarouselItem
                                        key={testimonial._id}
                                        className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                                    >
                                        <Card className="bg-zinc-800/50 border-none shadow-lg hover:bg-zinc-800/80 transition-all duration-300 transform hover:scale-105 h-full backdrop-blur-sm">
                                            <CardContent className="flex flex-col space-y-6 p-8">
                                                <div className="flex items-center space-x-4">
                                                    <Avatar className="w-20 h-20 border-4 border-zinc-700">
                                                        <AvatarFallback className="bg-indigo-500/10 text-indigo-200 text-2xl">
                                                            {testimonial.name[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-2xl font-semibold text-gray-100">
                                                            {testimonial.name}
                                                        </p>
                                                        {renderStars(testimonial.rating)}
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <svg
                                                        className="absolute -top-4 -left-4 w-8 h-8 text-indigo-500/20"
                                                        fill="currentColor"
                                                        viewBox="0 0 32 32"
                                                    >
                                                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                                    </svg>
                                                    <p className="text-lg text-gray-300 leading-relaxed pl-8">
                                                        "{testimonial.comment}"
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(testimonial.createdAt).toLocaleDateString()}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/80 text-gray-200 -left-12" />
                            <CarouselNext className="hidden md:flex bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/80 text-gray-200 -right-12" />
                        </Carousel>
                    )}
                </div>
            </div>
        </section>
    );
}
