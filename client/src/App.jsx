import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-darkSoft text-slate-100 bg-hero-gradient bg-fixed">
      <div className="min-h-screen bg-gradient-to-b from-black/60 via-black/70 to-black/90">
        
        <Navbar />

        <main>
          <Hero />
          <Services />
          <Testimonials />
          <HowItWorks />
          <Pricing />
          <Contact />
        </main>

        {/* Floating button should be outside main */}
        <WhatsAppFloat />
        <Chatbot />

        <Footer />
      </div>
    </div>
  );
}
