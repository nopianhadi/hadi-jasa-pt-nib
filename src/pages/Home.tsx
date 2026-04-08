import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import TrackingSection from '../components/TrackingSection';
import Testimonials from '../components/Testimonials';
import Clients from '../components/Clients';
import Articles from '../components/Articles';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Features />
      <Services />
      <TrackingSection />
      <Testimonials />
      <FAQ />
      <Articles />
      <CTA />
    </>
  );
}
