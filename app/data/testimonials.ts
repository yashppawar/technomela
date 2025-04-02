interface Testimonial {
    name: string;
    description: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Rajesh Kumar",
        description: "The online voter registration process was smooth and efficient. The staff was very helpful in guiding me through the process.",
        avatar: "/avatars/rajesh.jpg"
    },
    {
        name: "Priya Sharma",
        description: "I appreciate the transparency in the election process. The VVPAT system gives us confidence in the voting system.",
        avatar: "/avatars/priya.jpg"
    },
    {
        name: "Amit Patel",
        description: "The voter ID verification process was quick and hassle-free. Great service from the Election Commission!",
        avatar: "/avatars/amit.jpg"
    },
    {
        name: "Meera Singh",
        description: "The accessibility features for senior citizens and differently-abled voters are commendable.",
        avatar: "/avatars/meera.jpg"
    }
];

export default testimonials; 