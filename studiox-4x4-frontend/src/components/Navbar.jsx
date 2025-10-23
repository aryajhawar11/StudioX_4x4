import React, { useState, useEffect } from 'react';
// Import NavLink AND useLocation
import { NavLink, useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

// Import your logos
import logoBlack from '../assets/studioX_logo.jpg';
import logoWhite from '../assets/studioX_logo_white.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const onHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (!onHomePage) {
      setIsScrolled(true);
    } else {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onHomePage]);

  const isSolid = isScrolled || !onHomePage;

  // --- REMOVED TYPESCRIPT ANNOTATIONS ---
  const getLinkClass = ({ isActive }) => {
    const baseClasses = "uppercase font-bold transition-all duration-300";

    if (isActive) {
      // Use text-red-600 or your custom brand-red
      return `${baseClasses} text-red-600 border-b-2 border-red-600 pb-1`;
    }

    const hoverClasses = "hover:text-red-600";
    const inactiveBorder = "border-b-2 border-transparent pb-1";

    if (isSolid) {
      return `${baseClasses} ${hoverClasses} ${inactiveBorder} text-black`;
    }

    return `${baseClasses} ${hoverClasses} ${inactiveBorder} text-white`;
  };

  // --- REMOVED TYPESCRIPT ANNOTATIONS ---
  const getMobileLinkClass = ({ isActive }) => {
    if (isActive) {
      return "block px-4 py-2 uppercase font-bold text-red-600 border-l-4 border-red-600";
    }
    return "block px-4 py-2 uppercase font-bold text-black hover:text-red-600";
  };

  return (
    <nav
      className={`
        fixed top-0 z-50 w-full transition-all duration-500 ease-in-out
        ${isSolid ? 'bg-white shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex justify-between items-center h-20"> {/* Adjust height if needed */}

          <NavLink to="/">
            <img
              src={isSolid ? logoBlack : logoWhite}
              alt="StudioX 4x4 Logo"
              className="h-14 w-auto" // Adjust height if needed
            />
          </NavLink>

          <ul className="hidden md:flex items-center space-x-10">
            <li>
              <NavLink
                to="/"
                end
                className={getLinkClass}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavHashLink
                to="/#vehicles"
                smooth
                className={getLinkClass}
              >
                Products
              </NavHashLink>
            </li>

            <li>
              <NavHashLink
                to="/#about-contact"
                smooth
                className={getLinkClass}
              >
                Contact Us
              </NavHashLink>
            </li>
          </ul>

          <button
            className="md:hidden p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-7 h-7 transition-colors ${isSolid ? 'text-black' : 'text-white'}`}
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

        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <ul className="py-4 space-y-4 bg-white/95 backdrop-blur-sm rounded-b-lg">
            <li onClick={() => setMobileMenuOpen(false)}>
              <NavLink
                to="/"
                end
                className={getMobileLinkClass}
              >
                Home
              </NavLink>
            </li>

            <li onClick={() => setMobileMenuOpen(false)}>
              <NavHashLink
                to="/#vehicles"
                smooth
                className={getMobileLinkClass}
              >
                Products
              </NavHashLink>
            </li>

            <li onClick={() => setMobileMenuOpen(false)}>
              <NavHashLink
                to="/#about-contact"
                smooth
                className={getMobileLinkClass}
              >
                Contact Us
              </NavHashLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;