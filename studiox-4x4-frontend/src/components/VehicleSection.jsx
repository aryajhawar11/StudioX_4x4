import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchVehicles, getStrapiMedia } from '../api/strapi';
// We are using Tailwind, so no CSS import is needed.

const VehicleSection = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Failed to load vehicles:", error);
      }
      setIsLoading(false);
    };
    loadVehicles();
  }, []); 

  if (isLoading) {
    return (
      <section className="container mx-auto max-w-6xl py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-white">
          Loading Vehicles...
        </h2>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-6xl py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 uppercase text-white relative
                     after:content-[''] after:block after:w-40 after:h-1 after:bg-red-600 after:mx-auto after:mt-2">
        Vehicles & Accessories
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {vehicles && vehicles.filter(Boolean).map(vehicle => (
          <Link 
            to={`/vehicles/${vehicle.documentId}`} 
            key={vehicle.id} 
            className="block border border-gray-200 rounded-lg overflow-hidden shadow-sm 
                       transition-all duration-300 ease-in-out
                       hover:shadow-xl hover:-translate-y-2"
          >
            <div className="h-64 bg-gray-100">
              <img 
                // --- THIS IS THE FIX ---
                // We now access 'vehicle.image' and 'vehicle.name' directly
                src={getStrapiMedia(vehicle.image)} 
                alt={vehicle.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-center text-xl font-medium p-5 bg-gray-50 text-black">
              {/* --- THIS IS THE FIX --- */}
              {vehicle.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default VehicleSection;