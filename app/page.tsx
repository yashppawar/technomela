import Example from "./components/Example";
import FeaturesSection from "./components/Features";
import Footer from "./components/Footer";
import LandingPage from "./components/landingPage";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <FeaturesSection />
      <Example />
      <Footer />
    </div>
    );
}
