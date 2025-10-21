import React from 'react';
import ContactForm from './ContactForm'; // Your existing form component

const AboutContactSection = () => {
  return (
    // The stylish black background section
    <section className="py-16 bg-black">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: About Us */}
          <div>
            {/* Title with red "X" and red underline */}
            <h2 className="text-3xl font-bold text-white mb-8 uppercase relative
                           after:content-[''] after:block after:w-78 after:h-1 after:bg-red-600 after:mt-2">
              About Studio<span className="text-red-600">X</span> 4x4
            </h2>
            
            {/* --- NEW, EXPANDED CONTENT --- */}
            <p className="text-gray-300 leading-relaxed mb-4">
              Welcome to StudioX 4x4, Delhi's premier destination for serious off-road enthusiasts. We believe a 4x4 is more than a vehicle—it's a statement of freedom, a tool for adventure, and an extension of your passion for exploring the unexplored. Our mission is to transform your capable SUV into an unstoppable, trail-conquering machine that reflects your unique style.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our expertise lies in high-performance modifications that matter. From heavy-duty steel bumpers and advanced suspension systems that provide unmatched ground clearance, to state-of-the-art LED lighting that turns night into day, every product we offer is curated for durability and performance. We equip your Mahindra Thar, Suzuki Jimny, Land Rover Defender, or any 4x4 with the gear it needs to tackle any terrain with confidence.
            </p>
            <p className="text-gray-300 leading-relaxed">
              What sets StudioX 4x4 apart is our dedication to precision craftsmanship. Our team of skilled technicians are not just mechanics; they are passionate off-roaders who understand the punishment a vehicle endures on the trail. We are committed to using only the highest quality parts and ensuring every installation is flawless. Join the StudioX family and let us help you build the 4x4 of your dreams, ready for any adventure Delhi and beyond can throw at it.
            </p>
            {/* --- END OF NEW CONTENT --- */}
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            {/* Title with red underline */}
            <h3 className="text-2xl font-bold text-center text-black mb-8 uppercase relative
                           after:content-[''] after:block after:w-20 after:h-1 after:bg-red-600 after:mx-auto after:mt-2">
              Get In Touch
            </h3>
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContactSection;