import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { axiosClient } from '../AxiosClient';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchServices = async () => {
      try {
        const res = await axiosClient.get('services');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const ServiceCard = ({ service, index }) => (
    <Link
      to={`/services/${service._id}`}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-200 cursor-pointer block"
      data-aos="fade-up"
      data-aos-delay={index * 100}
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
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Professional Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Beyond supplying materials, we provide expert installation services for complete solutions.
          </p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : services.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {services.map((service, index) => (
              <ServiceCard key={service._id} service={service} index={index} />
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
