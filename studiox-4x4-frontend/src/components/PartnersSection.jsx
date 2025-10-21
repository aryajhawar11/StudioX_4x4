import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPartners, getStrapiMedia } from '../api/strapi';

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const loadPartners = async () => {
      const data = await fetchPartners();
      setPartners(data);
    };
    loadPartners();
  }, []);

  // Duplicate the array for a seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
<h2 className="text-3xl font-bold text-center mb-10 uppercase text-black relative
               after:content-[''] after:block after:w-20 after:h-1 after:bg-red-600 after:mx-auto after:mt-2">
  Our Partners
</h2>
      <div className="w-full">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            duration: 20, // Adjust duration for speed
            repeat: Infinity,
          }}
        >
          {/* Add .filter(Boolean) as a safety check */}
          {duplicatedPartners.filter(Boolean).map((partner, index) => (
            <div key={index} className="flex-shrink-0 mx-12 flex items-center" style={{ minWidth: '150px' }}>
              <img 
                // --- THIS IS THE FIX ---
                src={getStrapiMedia(partner.logo)} 
                alt={partner.name} 
                // --- END OF FIX ---
                className="h-20 w-auto object-contain grayscale opacity-60"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;