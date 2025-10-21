import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVehicleWithProducts, getStrapiMedia } from '../api/strapi';
// No CSS import needed, we are using Tailwind

const VehicleProductsPage = () => {
  const { vehicleId } = useParams(); // This is the 'documentId' from the URL
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // This function already uses the 'vehicleId' (which is the documentId)
        const data = await fetchVehicleWithProducts(vehicleId);
        setVehicle(data);
      } catch (error) {
        console.error("Failed to load vehicle products:", error);
      }
      setLoading(false);
    };
    loadData();
  }, [vehicleId]);

  // Use Tailwind for loading/error messages
  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        Loading products...
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        Vehicle not found.
      </div>
    );
  }

  // --- THIS IS THE FIX ---
  // Access 'name' and 'products' directly from the 'vehicle' object
  const vehicleName = vehicle.name;
  const products = vehicle.products || []; // Add a fallback for safety

  return (
    // Add Tailwind container and padding
    <div className="container mx-auto max-w-6xl py-16 px-4">
      {/* Tailwind Section Title */}
      <h2 className="text-3xl font-bold text-center mb-10 uppercase text-white relative
                     after:content-[''] after:block after:w-20 after:h-1 after:bg-red-600 after:mx-auto after:mt-2">
        Products for {vehicleName}
      </h2>
      
      {/* Tailwind Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map(product => (
            // Your 'documentId' update was correct here
            <Link 
              to={`/products/${product.documentId}`} 
              key={product.documentId} 
              className="block border border-gray-200 rounded-lg overflow-hidden shadow-sm 
                         transition-all duration-300 ease-in-out
                         hover:shadow-xl hover:-translate-y-2"
            >
              <div className="h-64 bg-gray-100">
                <img 
                  // --- THIS IS THE FIX ---
                  // Access the flat 'images' array and get the first one.
                  // Our getStrapiMedia helper will handle the flat image object.
                  src={getStrapiMedia(product.images?.[0])} 
                  alt={product.name} // Access 'product.name' directly
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center text-xl font-medium p-5 bg-gray-50 text-black">
                {product.name} {/* Access 'product.name' directly */}
              </h3>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            No products found for this vehicle.
          </p>
        )}
      </div>
    </div>
  );
};

export default VehicleProductsPage;