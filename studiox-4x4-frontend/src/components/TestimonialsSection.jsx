import React, { useState, useEffect } from 'react';
import { fetchTestimonials } from '../api/strapi';
// --- 1. Import motion and AnimatePresence from framer-motion ---
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // --- 2. Add state for the current testimonial index ---
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      }
      setIsLoading(false);
    };
    loadTestimonials();
  }, []);

  // --- 3. Add effect to cycle through testimonials ---
  useEffect(() => {
    // Only start the interval if testimonials are loaded and there's more than one
    if (testimonials.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000); // Change every 4 seconds (4000 milliseconds)

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [testimonials]); // Re-run this effect if the testimonials array changes

  // --- 4. Get the current testimonial based on the index ---
  const currentTestimonial = testimonials[currentIndex];

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          Loading testimonials...
        </div>
      </section>
    );
  }

  // If no testimonials after loading, render nothing
  if (!currentTestimonial) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-10 uppercase text-black relative
                       after:content-[''] after:block after:w-20 after:h-1 after:bg-brand-red after:mx-auto after:mt-2">
          Customer's Testimonials
        </h2>
        {/* --- 5. Wrap the changing content in AnimatePresence --- */}
        <div className="max-w-3xl mx-auto text-center h-40 relative"> {/* Set fixed height */}
          <AnimatePresence mode="wait"> {/* 'mode="wait"' ensures one fades out before the next fades in */}
            <motion.div
              key={currentIndex} // Important: Key changes trigger the animation
              initial={{ opacity: 0, y: 20 }} // Start slightly down and invisible
              animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
              exit={{ opacity: 0, y: -20 }} // Animate out slightly up and invisible
              transition={{ duration: 0.5 }} // Animation speed
              className="absolute inset-0" // Position elements on top of each other
            >
              <p className="text-xl italic text-gray-700 leading-relaxed">
                "{currentTestimonial.quote}"
              </p>
              <p className="mt-6 text-lg font-bold text-brand-red uppercase">
                - {currentTestimonial.author_name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;