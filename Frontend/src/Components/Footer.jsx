import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Corrected import for FaEnvelope
import { MdLocationOn } from 'react-icons/md'; // Import for MdLocationOn

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Left Side: Contact Details */}
        <div className="mb-6 md:mb-0 md:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-gray-400" />
              <p>+91 98435 11222</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-gray-400" />
              <p>+91 70107 48292</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-400" />
              <p>info@example.com</p> {/* Replace with your email */}
            </div>
            <div className="flex items-start space-x-2">
              <MdLocationOn className="text-gray-400 mt-1" />
              <p>
                322/13, KanjiKovil Road, Near Bypass, <br />
                Perundurai, Erode-Dt - 638 052
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Additional Information */}
        <div className="md:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/about" className="hover:text-gray-400 transition-colors">About Us</a>
            <a href="/services" className="hover:text-gray-400 transition-colors">Services</a>
            <a href="/products" className="hover:text-gray-400 transition-colors">Products</a>
            <a href="/contact" className="hover:text-gray-400 transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t pt-4 border-gray-700">
        <p>&copy; {new Date().getFullYear()} Sri Kumaran Steels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;