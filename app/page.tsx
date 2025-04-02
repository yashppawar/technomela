import Example from "./components/Example";
import FeaturesSection from "./components/Features";
import Footer from "./components/Footer";
import LandingPage from "./components/landingPage";
import Testimonials from "./components/Testimonial";
import FeedbackSection from "./components/FeedbackSection";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <Testimonials />
      <FeaturesSection />
      <Example />
      <FeedbackSection />
      <Footer />
    </div>
    );
}
