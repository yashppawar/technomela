import { Raleway, Lato } from "next/font/google";
import CarouselComponent from "./carousel-component";
import Navbar from "./navbar";
import TypingHero from "./TypingHero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Testimonials from "./Testimonial";

// Adding Raleway and Lato fonts
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function HeroSection() {

  return (
    <div
      className={`relative min-h-screen w-full bg-black/90 p-8 overflow-hidden ${raleway.className}`}
    >
      <CarouselComponent />
      <div className="relative z-100 min-h-[calc(100vh-4rem)] rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm flex flex-col">
        <Navbar />
        <div className="flex flex-col items-start  flex-1 p-16">
          <h2
            className={`mb-2 text-2xl font-light text-white/80 ${lato.className}`}
          >
            Your Dream Job Starts With a Great Resume!
          </h2>
          <TypingHero />
          <p
            className={`mb-8 max-w-md text-lg text-white/80 ${lato.className}`}
          >
            Upload your resume and get instant AI feedback to stand out from the crowd.
          </p>
          <Button
            asChild
            className="rounded border border-white/20 bg-white/10 px-8 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
          </Button>
        </div>
      </div>
    </div>
  );
}
