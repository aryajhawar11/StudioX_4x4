import React from 'react';
import logoWhite from '../assets/studioX_logo_white.png';
import { FaInstagram, FaYoutube, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import { NavHashLink } from 'react-router-hash-link';

const Footer = () => {
  const companyInfo = {
    address: 'Ground Floor, 33 and 33 A, Rama Rd, Block C, Najafgarh Road Industrial Area, Delhi, 110015',
    googleMapsLink: 'https://share.google/3W8unsrVnpifIHnlV',
    phone: '+91 90700 07040',
    email: 'support@studiox.in',
  };

  const openingHours = {
    showroom: 'Mon-Sat: 10:30am - 7:30pm (Sunday closed)',
    workshop: 'Mon-Sat: 10:30am - 7:30pm (Sunday closed)',
  };

  const socialLinks = [
    { icon: FaInstagram, url: 'https://www.instagram.com/studioxindia/' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@StudioXbyAdventoMotors' },
    { icon: FaXTwitter, url: 'https://x.com/StudioXindia' },
    { icon: FaEnvelope, url: `mailto:${companyInfo.email}` },
  ];

  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Column 1: Logo, About, Socials */}
          <div className="lg:col-span-2">
            <img src={logoWhite} alt="StudioX 4x4" className="h-18 w-auto mb-2" />
            <p className="text-sm leading-relaxed mb-6">
              At StudioX 4x4, we believe in building lasting relationships with our customers. StudioX Car Accessories in Delhi is a premium destination for top-quality car accessories, including custom seat covers, advanced audio systems, durable foot mats, and professional paint protection films.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-brand-red text-white p-2 rounded transition-colors" // Use brand-red or red-600
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Our Company */}
          <div>
            <h4 className="text-white text-base font-bold uppercase tracking-wider mb-5">Our Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <NavHashLink
                  to="/#about-contact"
                  smooth
                  className="hover:text-brand-red transition-colors" // Use brand-red or red-600
                >
                  About Us
                </NavHashLink>
              </li>
              {/* --- ADDED VEHICLES LINK HERE --- */}
              <li>
                <NavHashLink
                  to="/#vehicles" // Points to the vehicles section ID
                  smooth
                  className="hover:text-brand-red transition-colors" // Use brand-red or red-600
                >
                  Vehicles & Accessories
                </NavHashLink>
              </li>
              {/* --- END OF ADDED LINK --- */}
              <li>
                <NavHashLink
                  to="/#testimonials"
                  smooth
                  className="hover:text-brand-red transition-colors" // Use brand-red or red-600
                >
                  Testimonials
                </NavHashLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-section">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Contact Info</h4>
            <a href={companyInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className="block mb-2 hover:text-brand-red transition-colors">
              📍 {companyInfo.address}
            </a>
            <a href={`tel:${companyInfo.phone}`} className="block mb-2 hover:text-brand-red transition-colors">
              📞 {companyInfo.phone}
            </a>
            <a href={`mailto:${companyInfo.email}`} className="block mb-2 hover:text-brand-red transition-colors">
              📧 {companyInfo.email}
            </a>
          </div>

          {/* Column 4: Opening Hours */}
          <div className="footer-section">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Opening Hours</h4>
            <p className="mb-2">
              <strong>Showroom:</strong><br />
              {openingHours.showroom}
            </p>
            <p>
              <strong>Workshop:</strong><br />
              {openingHours.workshop}
            </p>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>Copyright © {new Date().getFullYear()} StudioX India. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;