"use client";
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feedback {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/feedback');
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch feedback');
        }
        
        setFeedbacks(result.data);
      } catch (err: any) {
        console.error('Error fetching feedback:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
      />
    ));
  };
  
  // Empty state when no feedback exists
  if (!isLoading && feedbacks.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0a0428] to-[#080318]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative elements */}
        <div className="absolute -left-20 top-1/3 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 bottom-1/4 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-indigo-200/80 max-w-2xl mx-auto">
            Discover how our resume analysis tool has helped professionals improve their job application success rate.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={feedback._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex gap-1 mb-3">
                  {renderStars(feedback.rating)}
                </div>
                <blockquote className="text-white mb-5 line-clamp-4">
                  "{feedback.comment}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/80 flex items-center justify-center text-white font-medium text-sm">
                    {feedback.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <cite className="font-medium text-white not-italic">{feedback.name}</cite>
                    <p className="text-indigo-200/50 text-sm">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 