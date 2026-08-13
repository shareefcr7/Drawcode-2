import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import EasyCom from '@/components/EasyCom';
import Technologies from '@/components/Technologies';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <>
      {/* Scroll Reveal Animation Controller */}
      <ScrollReveal />

      {/* Navigation Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* End-to-End Digital Services — staggered card grid */}
        <Services />

        {/* EasyCom Section */}
        <EasyCom />

        {/* Technology — floating stack grid */}
        <Technologies />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA — glass banner */}
        <CTA />
      </main>

      {/* Footer Navigation & Details */}
      <Footer />
    </>
  );
}
