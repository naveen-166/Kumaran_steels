import React from 'react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-transparent text-white w-screen absolute  top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <i className="fas fa-industry text-2xl text-yellow-500 mr-2"></i>
                    <h1 className="text-xl font-bold">Sri Kumaran Steels</h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                    <a href="#home" className="hover:text-yellow-400 transition">Home</a>
                    <a href="#products" className="hover:text-yellow-400 transition">Products</a>
                    <a href="#services" className="hover:text-yellow-400 transition">Services</a>
                    <a href="#about" className="hover:text-yellow-400 transition">About Us</a>
                    <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
                </nav>
                <button className="md:hidden text-xl" onClick={toggleMobileMenu}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-gray-800 w-full py-2`}>
                <div className="container mx-auto px-4 flex flex-col space-y-3">
                    <a href="#home" className="hover:text-yellow-400 transition py-1">Home</a>
                    <a href="#products" className="hover:text-yellow-400 transition py-1">Products</a>
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
