import React from 'react';
import Navbar from './Navbar'; // Make sure Navbar is in the same folder or update the path

const LandingPage = () => {
    return (
        <div className="landing-page">

            <section
                id="home"
                className="min-h-screen flex items-center justify-center text-white"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Building Strong Foundations</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Premium quality TMT bars, cement, steel fencing, roofing solutions, and natural stone flooring
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="#products"
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
