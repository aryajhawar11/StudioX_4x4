import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { fetchCarouselSlides, getStrapiMedia } from '../api/strapi';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const data = await fetchCarouselSlides();
        setSlides(data);
      } catch (error) {
        console.error("Failed to load carousel slides:", error);
      }
    };
    loadSlides();
  }, []);

  // Don't render carousel until slides are loaded and there's more than one
  if (!slides || slides.length <= 1) {
    // You could show a static image or a loading indicator here
    // For now, just render the first slide if it exists, without the Carousel wrapper
    const firstSlide = slides?.[0];
    return (
      <div className="hero-carousel-container relative">
        {firstSlide && (
           <div key={firstSlide.id} className="slide-item relative h-[90vh] max-h-[950px] bg-black">
             <img
               src={getStrapiMedia(firstSlide.image)}
               alt={firstSlide.title}
               className="w-full h-full object-cover opacity-70"
             />
             <div className="legend-overlay absolute top-1/2 left-[10%] -translate-y-1/2 text-left text-white max-w-lg">
                {/* <h1 className="text-5xl font-bold uppercase drop-shadow-lg">{firstSlide.title}</h1> */}
             </div>
           </div>
        )}
      </div>
    );
  }


  // Render the Carousel only when there are multiple slides
  return (
    <div className="hero-carousel-container relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        stopOnHover={false}   // --- ADD THIS LINE ---
        selectedItem={0}    // --- ADD THIS LINE ---
      >
        {slides.filter(Boolean).map(slide => ( // filter(Boolean) is good practice here too
          <div key={slide.id} className="slide-item relative h-[90vh] max-h-[full] bg-black">
            <img
              src={getStrapiMedia(slide.image)}
              alt={slide.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="legend-overlay absolute top-1/2 left-[10%] -translate-y-1/2 text-left text-white max-w-lg">
              {/* <h1 className="text-5xl font-bold uppercase drop-shadow-lg">{slide.title}</h1> */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;