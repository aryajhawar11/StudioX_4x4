import axios from "axios";

// Get the Strapi URL from the .env file
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// Create a pre-configured axios instance for Strapi API
export const strapiApi = axios.create({
  baseURL: STRAPI_URL,
});

/**
 * Helper function to get the full URL for Strapi media (images, files)
 * This version correctly handles flat data.
 */
export const getStrapiMedia = (media) => {
  if (!media) return null;

  // Check for new "flat" structure (e.g., media.url)
  if (media.url) {
    const url = media.url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${STRAPI_URL}${url}`;
  }

  // Check for old "nested" structure (e.g., media.data.attributes.url)
  if (media.data?.attributes?.url) {
    const url = media.data.attributes.url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${STRAPI_URL}${url}`;
  }

  return null;
};


//
// --- THIS IS THE FIX ---
//
/**
 * Helper function to get a list of media URLs from a flat array
 * @param {Array} mediaArray - An array of flat media objects (e.g., product.images)
 * @returns {Array} An array of full image URLs
 */
export const getStrapiMediaList = (mediaArray) => {
  // We check the 'mediaArray' directly, not 'mediaList.data'
  if (!mediaArray || !Array.isArray(mediaArray)) return [];
  
  // Use the existing getStrapiMedia helper on each item in the array
  return mediaArray.map(mediaItem => getStrapiMedia(mediaItem));
};
//
// --- END OF FIX ---
//


// --- API Fetching Functions ---

export const fetchCarouselSlides = async () => {
  const response = await strapiApi.get("/api/carousel-slides?populate=image");
  return response.data.data;
};

export const fetchVehicles = async () => {
  try {
    const response = await strapiApi.get("/api/vehicles?populate=image");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};

export const fetchPartners = async () => {
  const response = await strapiApi.get("/api/partners?populate=logo");
  return response.data.data;
};

export const fetchTestimonials = async () => {
  const response = await strapiApi.get("/api/testimonials");
  return response.data.data;
};

export const fetchVehicleWithProducts = async (vehicleId) => {
  // This assumes 'vehicleId' is the 'documentId'
  const response = await strapiApi.get(
    `/api/vehicles/${vehicleId}?populate[products][populate]=images`
  );
  // This might need to be 'response.data' if your 'findOne' is also flat
  return response.data.data; 
};

export const fetchProductDetails = async (productId) => {
  // This assumes 'productId' is the 'documentId'
  const response = await strapiApi.get(`/api/products/${productId}?populate=images`);
  console.log("fetchProductDetails response:", response.data);
  return response.data.data; // This is correct for flat data
};

export const submitQuery = async (formData) => {
  const response = await strapiApi.post("/api/query-form", formData);
  return response.data;
};