import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails, getStrapiMediaList } from '../api/strapi';
import ContactForm from '../components/ContactForm';

// Import carousel components
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Import Strapi block renderer
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProductDetails(productId);
      setProduct(data);
      setLoading(false);
    };
    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        Product not found.
      </div>
    );
  }

  const {
    name,
    description,
    use_case_purpose,
    key_benefits,
    indicative_cost,
    installation_time,
    images
  } = product;

  const productImages = getStrapiMediaList(images);

  return (
    // We use a larger max-width container for this page
    <div className="container mx-auto max-w-7xl py-16 px-4">
      {/* === LAYOUT CHANGE === */}
      {/* Changed to a 5-column grid on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-16">
        
        {/* === IMAGE AREA CHANGE === */}
        {/* The gallery now spans 3 of the 5 columns (60%) */}
        <div className="product-gallery lg:col-span-3">
          {productImages.length > 0 ? (
            <Carousel 
              autoPlay={true} 
              infiniteLoop={true} 
              showThumbs={true} 
              showStatus={false}
              className="rounded-lg shadow-lg border border-gray-200 overflow-hidden bg-gray-100"
            >
              {productImages.map((imgSrc, index) => (
                // Increased height from h-96 to h-[500px]
                <div key={index} className="h-[500px] bg-white"> 
                  <img 
                    src={imgSrc} 
                    alt={`${name} ${index + 1}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            // Increased height here too
            <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
              No Image
            </div>
          )}
        </div>
        
        {/* === INFO AREA CHANGE === */}
        {/* The info area now spans 2 of the 5 columns (40%) */}
        <div className="product-info lg:col-span-2 mt-8 lg:mt-0">
          <h1 className="text-4xl font-bold text-brand-black mb-4">{name}</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{description}</p>

          <div className="space-y-6">
            <div className="specs-section">
              <h3 className="text-xl font-bold text-brand-black border-b-2 border-gray-200 pb-2 mb-3">
                Use Case / Purpose
              </h3>
              {use_case_purpose && (
                <div className="prose max-w-none">
                  <BlocksRenderer content={use_case_purpose} />
                </div>
              )}
            </div>

            <div className="specs-section">
              <h3 className="text-xl font-bold text-brand-black border-b-2 border-gray-200 pb-2 mb-3">
                Key Benefits
              </h3>
              {key_benefits && (
                <div className="prose max-w-none">
                  <BlocksRenderer content={key_benefits} />
                </div>
              )}
            </div>

            <div className="specs-section">
              <h3 className="text-xl font-bold text-brand-black border-b-2 border-gray-200 pb-2 mb-3">
                Indicative Cost
              </h3>
              <p className="text-2xl font-bold text-white">{indicative_cost}</p>
            </div>

            <div className="specs-section">
              <h3 className="text-xl font-bold text-brand-black border-b-2 border-gray-200 pb-2 mb-3">
                Installation Time
              </h3>
              <p className="text-lg text-white">{installation_time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form Section */}
      <div className="quote-section mt-24 pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-10 uppercase text-brand-black relative
                       after:content-[''] after:block after:w-20 after:h-1 after:bg-brand-red after:mx-auto after:mt-2">
          Get a Quote for this Product
        </h2>
        <div className="max-w-3xl mx-auto">
          <ContactForm productName={name} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;