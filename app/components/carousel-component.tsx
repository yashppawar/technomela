"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const backgrounds = [
  "/assets/bg1.jpg", // Green Forest
  "/assets/bg3.jpg", // Mountain
  "/assets/bg2.jpg", // Grey Clouds
  "/assets/bg6.jpg", // Water Stream
  "/assets/bg5.jpg", // Night Camping
];

export default function CarouselComponent() {
  const [current, setCurrent] = useState(0);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="absolute inset-0 h-screen w-screen">
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {backgrounds.map((bg, index) => (
            <CarouselItem key={index} className="relative h-screen w-screen">
              <Image
                src={bg}
                alt={`Background Image ${index + 1}`}
                fill
                className="object-cover brightness-75"
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="absolute bottom-12 right-12 flex items-center gap-4 z-30">
          <button
            onClick={() => api?.scrollPrev()}
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
          {backgrounds.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-3 w-3 rounded-full ${
                i === current ? "bg-white" : "bg-white/40"
              } transition-colors hover:bg-white`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
