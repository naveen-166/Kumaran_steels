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
        <header className="bg-transparent text-white w-screen justify-center absolute top-0 z-50">
            <div
                className="container mx-auto px-4 py-3 flex justify-center"
                data-aos="fade-down"
            >

                <nav className="hidden md:flex space-x-10 text-lg " data-aos="fade-left" data-aos-delay="200">
                    <a href="#home" className="hover:bg-gray-700 w-24 h-9 flex items-center justify-center rounded-lg transition">Home</a>
                    <a href="#product" className="hover:bg-gray-700 w-24 h-9 flex items-center justify-center rounded-lg transition">Products</a>
                    <a href="#services" className="hover:bg-gray-700 w-24 h-9 flex items-center justify-center rounded-lg transition">Services</a>
                    <a href="#about" className="hover:bg-gray-700 w-24 h-9 flex items-center justify-center rounded-lg transition">About Us</a>
                    <a href="#contact" className="hover:bg-gray-700 w-24 h-9 flex items-center justify-center rounded-lg transition">Contact</a>
                </nav>


            </div>


        </header>
    );
};

export default Navbar;
