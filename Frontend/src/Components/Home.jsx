import React from 'react';
import img from "../Assets/home.webp";
import Lottie from 'lottie-react';
import animationData from '../Assets/home_ani.json';
import NavBar from './NavBar';

function Home() {
    return (
        <div>
            
            <NavBar />
            {/* Hero Section */}
            <div className="relative flex flex-col md:flex-row items-center justify-between h-[42.13rem] bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}>
                    
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-transparent opacity-80"></div>

                {/* Left Content - Text */}
                <div className="relative z-10 text-white font-serif max-w-2xl ml-10 md:ml-20">
                    <h1 className="text-6xl font-extrabold mb-4 animate-fadeInUp">Sri Kumaran Steels</h1>
                    <h2 className="text-4xl font-semibold mb-6 animate-fadeInUp delay-200">Sri Ram Steels</h2>
                    <p className="text-lg text-gray-300 animate-fadeInUp delay-400">
                        Leading suppliers of premium TMT bars, fencing steel, and cement. 
                        Built for durability, strength, and excellence.
                    </p>
                    <div className="mt-6 animate-fadeInUp delay-600">
                        <button className="bg-yellow-500 text-black px-6 py-3 text-lg font-medium rounded-lg mr-4 hover:bg-yellow-600 transition duration-300">
                            View Products
                        </button>
                        <button className="border border-yellow-500 text-white px-6 py-3 text-lg font-medium rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300">
                            Contact Us
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
