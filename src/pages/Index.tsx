import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ForCompanies from "@/components/ForCompanies";
import ForTalents from "@/components/ForTalents";
import ValueProposition from "@/components/ValueProposition";
import Testimonials from "@/components/Testimonials";
import LeadCapture from "@/components/LeadCapture";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <ForCompanies />
        <ForTalents />
        <ValueProposition />
        <Testimonials />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  );
};

export default Index;