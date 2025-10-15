"use client";

// import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
// import HowItWorks from "@/components/HowItWorks";
// import ServicesSection from "@/components/ServicesSection";
// import Testimonials from "@/components/Testimonials";
// import ContactSection from "@/components/ContactSection";
// import Footer from "@/components/Footer";
// import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="flex flex-col bg-white">
      {/* <TopNav /> */}
      <HeroSection />
      <AboutSection />
      {/* <HowItWorks />
      <ServicesSection />
      <Testimonials />
      <ContactSection />
      <Footer />
      <BackToTop /> */}
    </main>
  );
}
