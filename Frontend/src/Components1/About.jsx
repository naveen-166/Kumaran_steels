import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img from '../Assets/About.jpeg';

function About() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const features = [
        { icon: "fas fa-medal", label: "Quality Assurance" },
        { icon: "fas fa-truck", label: "Timely Delivery" },
        { icon: "fas fa-rupee-sign", label: "Competitive Pricing" },
        { icon: "fas fa-headset", label: "Customer Support" },
    ];

    const FeatureItem = ({ icon, label, delay }) => (
        <div
            className="flex items-center"
            data-aos="fade-up"
            data-aos-delay={delay}
        >
            <div className="bg-yellow-200 p-3 rounded-full mr-3">
                <i className={`${icon} text-yellow-900`}></i>
            </div>
            <span className="font-medium">{label}</span>
        </div>
    );

    const AboutImage = () => (
        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12" data-aos="fade-right">
            <img
                src={img}
                alt="Steel Factory"
                className="rounded-lg shadow-xl w-full"
            />
        </div>
    );

    const AboutContent = () => (
        <div className="lg:w-1/2" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Sri Kumaran Steels</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
                Established in 2022, Sri Kumaran Steels has been a trusted name in the construction materials industry,
                providing high-quality TMT bars, cement, steel fencing, roofing solutions, and natural stone flooring
                to builders, contractors, and homeowners across the region.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
                With over 2 years of experience, we take pride in our commitment to quality, reliability, and customer
                satisfaction. Our products meet all industry standards and are sourced from reputable manufacturers.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {features.map((feature, index) => (
                    <FeatureItem
                        key={index}
                        icon={feature.icon}
                        label={feature.label}
                        delay={index * 100}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <section id="about" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    <AboutImage />
                    <AboutContent />
                </div>
            </div>
        </section>
    );
}

export default About;
