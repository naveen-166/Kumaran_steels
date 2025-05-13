import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { axiosClient } from '../AxiosClient';

// Reusable Component: Feature Card
const FeatureCard = ({ benefit }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
    <div className="mt-1 flex-shrink-0">
      <i className="fas fa-check-circle text-green-400 text-xl"></i>
    </div>
    <p className="text-gray-300">{benefit}</p>
  </div>
);

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosClient.get(`services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-xl space-y-4">
        <p>Service not found.</p>
        <Link to="/" className="underline text-blue-400 hover:text-blue-300">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black font-sans text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-700/20 to-teal-500/20 backdrop-blur-sm z-0"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 text-blue-300 text-sm uppercase tracking-wider border border-blue-500/30">
            Service Details
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-teal-200">
            {service.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {service.description || 'No description available.'}
          </p>

          {/* Back Button */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to Services</span>
            </Link>
          </div>
        </div>

        {/* Decorative floating shapes */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>


      {/* Sample Images Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Work Samples
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.simage && service.simage.length > 0 ? (
              service.simage.map((imgObj, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-64 w-full bg-gray-800 flex items-center justify-center">
                    <img
                      src={imgObj.img}
                      alt={`Sample ${i + 1}`}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => (e.target.src = '/fallback.jpg')}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">No sample images available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Floating Contact Footer */}
      <footer className="fixed bottom-6 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-black/30 border border-white/10 rounded-full px-6 py-3 shadow-lg z-50">
        <div className="flex items-center justify-center gap-3">
          <i className="fas fa-phone-alt text-blue-400"></i>
          <span className="text-sm text-gray-300">Contact for Service:</span>
          <a href="tel:+919843511222" className="text-blue-400 font-semibold">+91 98435 11222</a>
        </div>
      </footer>
    </div>
  );
}