import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-transparent text-white w-screen absolute top-0 z-50">
            <div
                className="container mx-auto px-4 py-3 flex justify-between items-center"
                data-aos="fade-down"
            >
                <div className="flex items-center" data-aos="fade-right" data-aos-delay="100">
                    <i className="fas fa-industry text-2xl text-yellow-500 mr-2"></i>
                    <h1 className="text-xl font-bold">Sri Kumaran Steels</h1>
                </div>

                <nav className="hidden md:flex space-x-8" data-aos="fade-left" data-aos-delay="200">
                    <a href="#home" className="hover:text-yellow-400 transition">Home</a>
                    <a href="#product" className="hover:text-yellow-400 transition">Products</a>
                    <a href="#services" className="hover:text-yellow-400 transition">Services</a>
                    <a href="#about" className="hover:text-yellow-400 transition">About Us</a>
                    <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
                </nav>

                <button
                    className="md:hidden text-xl"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-gray-800 w-full py-2`}
                data-aos="fade-down"
                data-aos-delay="300"
            >
                <div className="container mx-auto px-4 flex flex-col space-y-3">
                    <a href="#home" className="hover:text-yellow-400 transition py-1">Home</a>
                    <a href="#product" className="hover:text-yellow-400 transition py-1">Products</a>
                    <a href="#services" className="hover:text-yellow-400 transition py-1">Services</a>
                    <a href="#about" className="hover:text-yellow-400 transition py-1">About Us</a>
                    <a href="#testimonials" className="hover:text-yellow-400 transition py-1">Testimonials</a>
                    <a href="#contact" className="hover:text-yellow-400 transition py-1">Contact</a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
