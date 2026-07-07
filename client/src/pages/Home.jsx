import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";

function Home() {
  return (
    <div className="min-h-screen bg-green-50">
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
    </div>
  );
}

export default Home;