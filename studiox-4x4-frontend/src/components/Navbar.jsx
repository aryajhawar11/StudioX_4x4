import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import your logos
import logoBlack from '../assets/studioX_logo.jpg';
import logoWhite from '../assets/studioX_logo_white.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  
  // Get current location/path
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if navbar should be transparent
  // Only transparent on home page AND not scrolled
  const isTransparent = isHomePage && !isScrolled;

  const handleNavClick = (tab, sectionId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getLinkClass = (isActive) => {
    const baseClasses = "uppercase font-bold transition-all duration-300 cursor-pointer";
    
    if (isActive) {
      return `${baseClasses} text-red-600 border-b-2 border-red-600 pb-1`;
    }

    const hoverClasses = "hover:text-red-600";
    
    // Use isTransparent instead of just isScrolled
    if (isTransparent) {
      return `${baseClasses} ${hoverClasses} text-white`;
    }
    
    return `${baseClasses} ${hoverClasses} text-black`;
  };

  return (
    <nav 
      className={`
        fixed top-0 z-50 w-full transition-all duration-500 ease-in-out
        ${isTransparent ? 'bg-black' : 'bg-white shadow-2xl'} 
      `}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer w-50 h-10" 
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={isTransparent ? logoWhite : logoBlack} 
              alt="StudioX 4x4 Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-10">
            <li>
              <div 
                className={getLinkClass(activeTab === 'home')}
                onClick={() => handleNavClick('home')}
              >
                Home
              </div>
            </li>
            
            <li>
              <div 
                className={getLinkClass(activeTab === 'products')}
                onClick={() => handleNavClick('products', 'vehicles')}
              >
                Products
              </div>
            </li>
            
            <li>
              <div 
                className={getLinkClass(activeTab === 'contact')}
                onClick={() => handleNavClick('contact', 'about-contact')}
              >
                Contact Us
              </div>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className={`w-7 h-7 transition-colors ${isTransparent ? 'text-white' : 'text-black'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <ul className="py-4 space-y-4 bg-white/95 backdrop-blur-sm rounded-b-lg">
            <li>
              <div
                className={`block px-4 py-2 uppercase font-bold transition-colors cursor-pointer ${
                  activeTab === 'home' ? 'text-red-600 border-l-4 border-red-600' : 'text-black hover:text-red-600'
                }`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </div>
            </li>
            
            <li>
              <div
                className={`block px-4 py-2 uppercase font-bold transition-colors cursor-pointer ${
                  activeTab === 'products' ? 'text-red-600 border-l-4 border-red-600' : 'text-black hover:text-red-600'
                }`}
                onClick={() => handleNavClick('products', 'vehicles')}
              >
                Products
              </div>
            </li>
            
            <li>
              <div
                className={`block px-4 py-2 uppercase font-bold transition-colors cursor-pointer ${
                  activeTab === 'contact' ? 'text-red-600 border-l-4 border-red-600' : 'text-black hover:text-red-600'
                }`}
                onClick={() => handleNavClick('contact', 'about-contact')}
              >
                Contact Us
              </div>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;