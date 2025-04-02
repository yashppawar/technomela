"use client";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Mail, Github, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set isVisible to true when the footer enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we don't need to observe anymore
          if (footerRef.current) observer.unobserve(footerRef.current);
        }
      },
      {
        // Start animation when element is 10% visible
        threshold: 0.1,
        // Start animation slightly before element comes into view
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);
  
  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800 relative overflow-hidden"
    >
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Wave Pattern */}
        <div className={`h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl mx-4 opacity-90 relative transition-transform duration-700 ${isVisible ? 'scale-100' : 'scale-x-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" 
               style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
        </div>
        
        <div className="px-6 py-16 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* About Section */}
            <div className={`space-y-5 transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <span className="font-bold text-white relative z-10">RA</span>
                </div>
                <h3 className="text-white text-lg font-bold">Resume Analyzer</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advanced AI-powered resume analysis to help you optimize your resume and land your dream job.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className={`space-y-5 transform transition-all duration-700 delay-100 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-white text-lg font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-10 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 pb-2">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div className={`space-y-5 transform transition-all duration-700 delay-200 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-white text-lg font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-10 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 pb-2">Support</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact & Social */}
            <div className={`space-y-5 transform transition-all duration-700 delay-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-white text-lg font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-10 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 pb-2">Connect With Us</h3>
              <p className="text-sm">
                <Link href="mailto:support@resumeanalyzer.com" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <span className="p-2 rounded-full bg-gray-800 group-hover:bg-indigo-600 transition-colors duration-200 group-hover:scale-110 transform">
                    <Mail size={14} />
                  </span>
                  support@resumeanalyzer.com
                </Link>
              </p>
              <div className="flex gap-3 mt-4">
                {isVisible && (
                  <>
                    <Link href="https://github.com" className="p-2 bg-gray-800 hover:bg-[#171515] rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#171515]/20 animate-fade-in-right" style={{animationDelay: '0ms'}} aria-label="GitHub">
                      <Github size={18} className="animate-[spin_10s_linear_infinite]" />
                    </Link>
                    <Link href="https://linkedin.com" className="p-2 bg-gray-800 hover:bg-[#0077B5] rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0077B5]/20 animate-fade-in-right" style={{animationDelay: '100ms'}} aria-label="LinkedIn">
                      <Linkedin size={18} />
                    </Link>
                    <Link href="https://twitter.com" className="p-2 bg-gray-800 hover:bg-[#1DA1F2] rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1DA1F2]/20 animate-fade-in-right" style={{animationDelay: '200ms'}} aria-label="Twitter">
                      <Twitter size={18} />
                    </Link>
                    <Link href="https://facebook.com" className="p-2 bg-gray-800 hover:bg-[#1877F2] rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/20 animate-fade-in-right" style={{animationDelay: '300ms'}} aria-label="Facebook">
                      <Facebook size={18} />
                    </Link>
                    <Link href="https://instagram.com" className="p-2 bg-gray-800 hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FD1D1D]/20 animate-fade-in-right" style={{animationDelay: '400ms'}} aria-label="Instagram">
                      <Instagram size={18} />
                    </Link>
                    <Link href="https://youtube.com" className="p-2 bg-gray-800 hover:bg-[#FF0000] rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/20 animate-fade-in-right" style={{animationDelay: '500ms'}} aria-label="YouTube">
                      <Youtube size={18} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className={`border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-gray-500">
              © {currentYear} <span className="text-gray-400">Resume Analyzer</span>. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-medium rounded text-sm relative group">
                Designed to help you succeed
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 bg-[length:200%_100%] animate-shimmer"></span>
              </span>
            </div>
          </div>
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
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.5s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
