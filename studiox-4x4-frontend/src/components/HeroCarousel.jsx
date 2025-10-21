import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { fetchCarouselSlides, getStrapiMedia } from '../api/strapi';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Keep this
// You can delete HeroCarousel.css

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loadSlides = async () => {
      const data = await fetchCarouselSlides();
      setSlides(data);
    };
    loadSlides();
  }, []);

  return (
    // Use Tailwind for styling
    <div className="hero-carousel-container relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
      >
        {slides && slides.filter(Boolean).map(slide => (
          <div key={slide.id} className="slide-item relative h-[85vh] max-h-[800px] bg-black">
            <img 
              // --- THIS IS THE FIX ---
              // Access 'slide.image' and 'slide.title' directly
              src={getStrapiMedia(slide.image)} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="legend-overlay absolute top-1/2 left-[10%] -translate-y-1/2 text-left text-white max-w-lg">
              
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;