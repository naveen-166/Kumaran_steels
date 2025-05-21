import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { axiosClient } from '../AxiosClient';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    phone: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter valid Phone number";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axiosClient.post('contact', formData);
      setFormData({ name: '', email: '', category: '', phone: '', description: '' });
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to send message. Please try again later.');
    }
  };

  const categoryOptions = [
    { label: "Select Category", value: "" },
    { label: "Product", value: "product" },
    { label: "Service", value: "service" }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-4 text-gray-300">
            Ready to start your next project? Contact us today for a quote or more information about our products and services.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Contact Info */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10" data-aos="fade-right">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <ContactInfo icon="fas fa-map-marker-alt" title="Our Location">
                322/13, Kanji Kovil Road, Near Bypass, Perundurai
              </ContactInfo>
              <ContactInfo icon="fas fa-phone" title="Phone Number">
                <a href="tel:+919843511222">+91 98435 11222</a><br />
                <a href="tel:+917010748292">+91 70107 48292</a>
              </ContactInfo>
              <ContactInfo icon="fas fa-envelope" title="Email Address">
                <p>srikumaransteels2022@gmail.com</p>
              </ContactInfo>
              <ContactInfo icon="fas fa-clock" title="Working Hours">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
              </ContactInfo>
            </div>

            {/* Social Icons */}
            <div className="mt-10" data-aos="fade-left">
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <SocialIcon href="#" icon="fab fa-facebook-f" />
                <SocialIcon href="#" icon="fab fa-twitter" />
                <SocialIcon href="#" icon="fab fa-youtube" hover="hover:bg-red-600" />
                <SocialIcon href="#" icon="fab fa-linkedin-in" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 flex justify-center">Send Us a Message</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InputField id="name" label="Name *" type="text" value={formData.name} onChange={handleChange} />
                <InputField
                  id="email"
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InputField
                  id="category"
                  label="Category *"
                  type="select"
                  value={formData.category}
                  onChange={handleChange}
                  options={categoryOptions}
                />
                <InputField
                  id="phone"
                  label="Phone *"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-300 mb-2">Your Message</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="w-full px-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                  required
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full transform transition-all scale-100 animate-scaleIn">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center justify-self-center">
                Sent Successfully!
              </h2>
              <button onClick={() => setShowSuccessModal(false)} className="text-gray-400 hover:text-white transition">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col items-center gap-6">
              {/* Animated Illustration */}
              <div className="w-32 h-32 p-4 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.4898 2 2 6.4898 2 12C2 17.5102 6.4898 22 12 22C17.5102 22 22 17.5102 22 12C22 6.4898 17.5102 2 12 2ZM15.5714 10.4694L11.4898 14.551C11.2857 14.6531 11.1837 14.7551 10.9796 14.7551C10.7755 14.7551 10.5714 14.6531 10.4694 14.551L8.42857 12.5102C8.12245 12.2041 8.12245 11.6939 8.42857 11.3878C8.73469 11.0816 9.2449 11.0816 9.55102 11.3878L11.0816 12.9184L14.6531 9.34694C14.9592 9.04082 15.4694 9.04082 15.7755 9.34694C15.8776 9.7551 15.8776 10.1633 15.5714 10.4694Z" fill="#2fd22d"></path> </g></svg>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Thank you for reaching out! We've received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-transform hover:scale-105 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Components
const ContactInfo = ({ icon, title, children }) => (
  <div className="flex items-start">
    <div className="bg-blue-600 p-3 rounded-full mr-4">
      <i className={`${icon} text-white`}></i>
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <div className="text-gray-300">{children}</div>
    </div>
  </div>
);

const InputField = ({ id, label, type, value, onChange, options, error }) => (
  <div>
    <label htmlFor={id} className="block text-gray-300 mb-2">{label}</label>
    {type === "select" ? (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 bg-gray-700 border ${error ? 'border-red-500' : 'border-gray-600'} rounded focus:outline-none focus:border-blue-500`}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </>
    )}
  </div>
);

const SocialIcon = ({ href, icon, hover = "hover:bg-blue-600" }) => (
  <a href={href} className={`bg-gray-800 ${hover} w-10 h-10 rounded-full flex items-center justify-center transition`}>
    <i className={icon}></i>
  </a>
);