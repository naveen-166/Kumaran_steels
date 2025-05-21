import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import image from '../Assets/heroimage.jpg'; // Adjust the path as necessary

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in ms
            once: true,     // Whether animation should happen only once
        });
    }, []);

    return (
        <div className="landing-page max-w-screen">

            <section
                id="home"
                className="min-h-screen flex items-center justify-center text-white"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                    <h1
                        className="text-4xl md:text-6xl font-bold mb-6"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        Sri Kumaran Steels
                    </h1>
                    <p
                        className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Premium quality TMT bars, cement, steel fencing, roofing solutions, and natural stone flooring
                    </p>
                    <div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <a
                            href="#product"
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Our Products <i className="fas fa-arrow-right ml-2"></i>
                        </a>
                        <a
                            href="#contact"
                            className="bg-transparent hover:bg-gray-800 border-2 border-white text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Contact Us <i className="fas fa-phone ml-2"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
