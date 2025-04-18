import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:4000/services');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  const ServiceCard = ({ service }) => (
    <Link
      to={`/services/${service._id}`}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-200 cursor-pointer block"
    >
      <div className="h-48 w-full bg-gray-100">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
          onError={(e) => (e.target.src = '/fallback.jpg')}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <span className="text-yellow-600 font-semibold hover:text-yellow-700 transition inline-block">
          View Details <i className="fas fa-chevron-right ml-1"></i>
        </span>
      </div>
    </Link>
  );

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Professional Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Beyond supplying materials, we provide expert installation services for complete solutions.
          </p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No services found.</p>
        )}
      </div>
    </section>
  );
}

export default Services;
