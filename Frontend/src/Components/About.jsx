import React from 'react';
import { FaFacebook, FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const AboutPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-16 flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-8">
          Meet Our Leadership
        </h1>
        <p className="text-center text-lg text-gray-700 mb-12">
          Driven by passion and expertise, our leaders guide us to excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center mb-12">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition-transform hover:scale-105">
            <div className="flex flex-col items-center">
              <img
                src="https://www.thefamouspeople.com/profiles/images/ratan-tata-3.jpg"
                alt="Kartheeban"
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-purple-300"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Kartheeban</h2>
              <p className="text-sm md:text-lg text-gray-700 text-center">
                Founder & Managing Director <br />
                Sri Kumaran Steel & Sri Ram Steels
              </p>
              <p className="mt-4 text-sm text-gray-600 text-center">
                With a vision to provide quality steel solutions, Kartheeban leads our company with dedication and integrity.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition-transform hover:scale-105">
            <div className="flex flex-col items-center">
              <img
                src="https://www.thefamouspeople.com/profiles/images/ratan-tata-3.jpg"
                alt="Another Kartheeban"
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-purple-300"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Kartheeban</h2>
              <p className="text-sm md:text-lg text-gray-700 text-center">
                Founder & Managing Director <br />
                Sri Kumaran Steel & Sri Ram Steels
              </p>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Driven by innovation, Kartheeban ensures our company stays at the forefront of the steel industry.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-6">
            {/* Social Icons */}
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <FaFacebook className="w-8 h-8 md:w-10 md:h-10" />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              <FaInstagram className="w-8 h-8 md:w-10 md:h-10" />
            </a>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-3">
              <MdLocationOn className="text-gray-600" size={24} />
              <p className="text-sm md:text-lg text-gray-700 text-center">
                322/13, KanjiKovil Road, Near Bypass, Perundurai, Erode-Dt <br />
                Pincode: 638 052
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-gray-600" size={18} />
              <p className="text-sm md:text-lg text-gray-700">
                Contact: [Your Phone Number Here]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;