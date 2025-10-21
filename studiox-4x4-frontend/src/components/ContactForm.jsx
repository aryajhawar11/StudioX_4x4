import React, { useState, useEffect } from 'react';
import { submitQuery } from '../api/strapi'; // Make sure this function exists and works

const ContactForm = ({ productName }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    message: '',
  });
  
  const [status, setStatus] = useState({ sent: false, message: '', type: '' });

  useEffect(() => {
    if (productName) {
      setFormData(prevData => ({
        ...prevData,
        message: `I'm interested in a quote for the: ${productName}.`
      }));
    }
  }, [productName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sent: false, message: 'Sending...', type: 'sending' });
    
    try {
      await submitQuery(formData); 
      setStatus({ sent: true, message: 'Message sent! We will get back to you soon.', type: 'success' });
      setFormData({ full_name: '', email: '', contact_number: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus({ sent: false, message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> 
        <input 
          type="text" 
          name="full_name" 
          placeholder="Full Name *" 
          value={formData.full_name} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent" 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email *" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
        />
      </div>
      
      <div>
        <input 
          type="text" 
          name="contact_number" 
          placeholder="Contact Number *" 
          value={formData.contact_number} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
        />
      </div>
      
      <textarea 
        name="message" 
        placeholder="Your Message" 
        rows="5"
        value={formData.message} 
        onChange={handleChange}
        // --- 1. Added placeholder color HERE ---
        className="w-full px-4 py-3 border text-black border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
      ></textarea>
      
      <button 
        type="submit" 
        // --- 2. Changed button background colors HERE ---
        className="w-full bg-black text-white py-3 px-6 rounded-md font-bold uppercase transition-colors duration-300 hover:bg-gray-800 disabled:bg-gray-400"
        disabled={status.type === 'sending'}
      >
        {status.type === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      
      {status.message && (
        <p className={`text-center font-medium mt-4 ${
          status.type === 'success' ? 'text-green-600' : 
          status.type === 'error' ? 'text-red-600' : 
          'text-gray-600'
        }`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;