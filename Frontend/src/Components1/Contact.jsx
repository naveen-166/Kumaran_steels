import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { axiosClient } from '../AxiosClient';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        phone: '',
        description: ''
    });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post('contact', formData);
            alert(res.data.message);
            setFormData({ name: '', email: '', category: '', phone: '', description: '' });
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
        <section id="contact" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    <p className="max-w-2xl mx-auto mt-4 text-gray-300">
                        Ready to start your next project? Contact us today for a quote or more information about our products and services.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Contact Information */}
                    <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10" data-aos="fade-right">
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <ContactInfo icon="fas fa-map-marker-alt" title="Our Location">
                                322/13, Kanji Kovil Road, Near Bypass, Perundurai
                            </ContactInfo>
                            <ContactInfo icon="fas fa-phone-alt" title="Phone Number">
                                <p>+91 98435 11222</p>
                                <p>+91 70107 48292</p>
                            </ContactInfo>
                            <ContactInfo icon="fas fa-envelope" title="Email Address">
                                <p>srikumaransteels2022@gmail.com</p>
                            </ContactInfo>
                            <ContactInfo icon="fas fa-clock" title="Working Hours">
                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 9:00 AM - 2:00 PM</p>
                            </ContactInfo>
                        </div>

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
                                <InputField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <InputField id="category" label="Category *" type="select" value={formData.category} onChange={handleChange} options={categoryOptions} />
                                <InputField id="phone" label="Phone *" type="text" value={formData.phone} onChange={handleChange} />
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

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded font-semibold transition">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

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

const InputField = ({ id, label, type, value, onChange, options }) => (
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
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
            />
        )}
    </div>
);

const SocialIcon = ({ href, icon, hover = "hover:bg-blue-600" }) => (
    <a href={href} className={`bg-gray-800 ${hover} w-10 h-10 rounded-full flex items-center justify-center transition`}>
        <i className={icon}></i>
    </a>
);

export default Contact;
