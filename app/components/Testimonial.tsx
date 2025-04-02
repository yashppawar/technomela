import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";   
export default function Testimonials {
    <section className="bg-black py-12 px-6 lg:px-16" id="work">
    <div className="container mx-auto flex flex-col space-y-16">
        <div className="w-full flex flex-col text-center">
            <h2 className="text-4xl font-bold text-white mb-12">
                Client Experiences with Our Services
            </h2>

            <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-3 md:-ml-6">
                    {testimonials.map((testimonial: {
                        name: string,
                        description: string,
                        avatar: string,
                    }, index: number) => (
                        <CarouselItem
                            key={index}
                            className="pl-3 md:pl-6 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >
                            <Card className="bg-[#2F4F2F]/80 border-0 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
                                <CardContent className="flex flex-col space-y-4 h-full">
                                    {/* Profile Picture & Name */}
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="w-14 h-14">
                                            <AvatarImage
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                            />
                                            <AvatarFallback>
                                                {testimonial.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-xl font-semibold text-white">
                                                {testimonial.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-base text-gray-300 leading-relaxed text-left">
                                        {testimonial.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
        <TestimonialsContact />
    </div>
</section>
}