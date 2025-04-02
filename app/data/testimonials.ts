interface Testimonial {
    name: string;
    description: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Chen",
        description:
            "The AI analysis provided incredible insights into my resume. It helped me identify key areas for improvement and ultimately landed me my dream job in tech!",
        avatar: "/avatars/sarah.jpg",
    },
    {
        name: "Michael Rodriguez",
        description:
            "I was amazed by how detailed the feedback was. The keyword optimization suggestions helped my resume get past ATS systems and straight to hiring managers.",
        avatar: "/avatars/michael.jpg",
    },
    {
        name: "Emily Thompson",
        description:
            "The real-time analysis and industry-specific recommendations were game-changing. My interview callbacks increased significantly after implementing the suggestions.",
        avatar: "/avatars/emily.jpg",
    },
    {
        name: "David Park",
        description:
            "As a career switcher, this tool was invaluable. It helped me highlight my transferable skills and present them in a way that resonated with employers.",
        avatar: "/avatars/david.jpg",
    },
];

export default testimonials;
