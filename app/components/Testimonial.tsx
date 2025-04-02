import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";   
import testimonials from "../data/testimonials";

export default function Testimonials() {
    return (
        <section className="relative mt-20 py-20 px-6 lg:px-16 bg-gradient-to-b from-white to-gray-100" id="testimonials">
            <div className="absolute inset-0 bg-[url('/assets/pattern.png')] opacity-5 z-20"></div>
            <div className="container mx-auto relative z-30">
                <div className="w-full flex flex-col items-center">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            Voter Experiences
                        </h2>
                        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                            Hear what our citizens have to say about their voting experience
                        </p>
                    </div>

                    <Carousel 
                        opts={{ 
                            align: "start", 
                            loop: true 
                        }} 
                        className="w-full max-w-6xl mx-auto"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                                >
                                    <Card className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full">
                                        <CardContent className="flex flex-col space-y-6">
                                            <div className="flex items-center space-x-4">
                                                <Avatar className="w-20 h-20 border-4 border-gray-100">
                                                    <AvatarImage
                                                        src={testimonial.avatar}
                                                        alt={testimonial.name}
                                                    />
                                                    <AvatarFallback className="bg-gray-100 text-gray-600 text-2xl">
                                                        {testimonial.name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-2xl font-semibold text-gray-900">
                                                        {testimonial.name}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <svg className="absolute -top-4 -left-4 w-8 h-8 text-blue-400/20" fill="currentColor" viewBox="0 0 32 32">
                                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                                                </svg>
                                                <p className="text-lg text-gray-600 leading-relaxed pl-8">
                                                    {testimonial.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex bg-white border-gray-200 hover:bg-gray-50 text-gray-700 -left-12" />
                        <CarouselNext className="hidden md:flex bg-white border-gray-200 hover:bg-gray-50 text-gray-700 -right-12" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}