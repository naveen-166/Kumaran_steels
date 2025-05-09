import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { axiosClient } from '../AxiosClient';

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosClient.get(`services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error('Error fetching service:', err);
      }
    };

    fetchService();
  }, [id]);

  if (!service) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen font-[Montserrat] gradient-bg relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-green-100 opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-200 opacity-10 blur-xl"></div>
      </div>

      {/* Header */}
      <div className="pt-7 px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full mb-4 shadow-md">
          <i className="fas fa-tools mr-2"></i>
          <span className="text-sm font-semibold">Service Details</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-3 glow-text">
          {service.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {service.description}
        </p>
      </div>

      {/* Benefits */}
      <div className="mt-10 px-6 text-center relative z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Work Samples</h2>
        <ul className="list-disc list-inside max-w-2xl mx-auto text-gray-700 space-y-2 text-left">
          {service.benefits?.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      {/* Sample Images */}
      <div className="flex-1 px-6 pb-20 mt-10 flex items-center justify-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {service.simage?.length > 0 ? (
            service.simage.map((imgObj, i) => (
              <div key={i} className="sample-card p-4 flex flex-col items-center justify-center">
                <img
                  src={imgObj.img}
                  alt={`Sample ${i}`}
                  className="w-full h-60 object-cover rounded shadow"
                  onError={(e) => (e.target.src = '/fallback.jpg')}
                />
              </div>
            ))
          ) : (
            <p>No sample images available.</p>
          )}
        </div>
      </div>

      {/* Floating CTA */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center justify-center space-x-2 z-20">
        <i className="fas fa-phone-alt text-blue-600"></i>
        <span className="text-sm font-semibold text-gray-800">
          Contact Us for Service Details:
        </span>
        <span className="text-blue-600 font-bold">+91 98435 11222</span>
      </div>

      {/* Extra styles */}
      <style>{`
        .sample-card {
          transition: all 0.4s ease-in-out;
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        .sample-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #3b82f6, #10b981);
        }

        .sample-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .gradient-bg {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}

export default ServiceDetail;
