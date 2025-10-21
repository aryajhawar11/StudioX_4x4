import React from 'react';

// Import all the components for the homepage
import HeroCarousel from '../components/HeroCarousel';
import VehicleSection from '../components/VehicleSection';
import PartnersSection from '../components/PartnersSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutContactSection from '../components/AboutContactSection';

const HomePage = () => {
  return (
    <div className="homepage">
      <HeroCarousel />
      
      {/* --- ADDED SECTION WRAPPER WITH ID --- */}
      <section id="vehicles">
        <VehicleSection />
      </section>

      {/* --- ADDED SECTION WRAPPER WITH ID --- */}
      <section id="about-contact">
        <AboutContactSection />
      </section>
      
      <PartnersSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;