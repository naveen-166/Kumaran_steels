import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <BrandInfo />
                    <FooterNav />
                </div>
            </div>
        </footer>
    );
}

const BrandInfo = () => (
    <div className="mb-4 md:mb-0 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start">
            <i className="fas fa-industry text-2xl text-yellow-500 mr-2"></i>
            <h2 className="text-xl font-bold">Sri Kumaran Steels</h2>
        </div>
        <p className="text-sm mt-2">Building the future with strength and reliability</p>
    </div>
);

const FooterNav = () => (
    <div className="flex flex-col items-center md:items-end">
        <div className="flex space-x-6 mb-4">
            {["home", "products", "services", "about", "contact"].map((section) => (
                <a 
                    key={section} 
                    href={`#${section}`} 
                    className="hover:text-yellow-400 transition capitalize"
                >
                    {section}
                </a>
            ))}
        </div>
        <p className="text-sm">&copy; 2025 Sri Kumaran Steels. All Rights Reserved.</p>
    </div>
);

export default Footer;
