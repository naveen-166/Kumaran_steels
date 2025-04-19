import React from "react";
import { motion } from "framer-motion";
import bg from "../Assets/background.jpg"

const Products = () => {
    return (
        <div className="flex flex-col justify-center items-center h- bg-gradient-to-b from-gray-900 to-black p-8 text-white" style={{ backgroundImage: `url(${bg})` }}>
            <motion.h2 
                className="text-5xl font-extrabold text-center tracking-wide mt-14"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Our Trusted Partner Companies
            </motion.h2>
            
            <p className="text-lg text-center max-w-3xl mb-8 opacity-80">
                We take pride in collaborating their respective fields.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl w-full p-6">
                {productImages.map((img, index) => (
                    <motion.div 
                        key={index} 
                        className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-3 border border-gray-700"
                        whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.2)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.07 }}
                    >
                        <img className="w-32 h-32 object-contain" src={img} alt={`Company ${index + 1}`} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const productImages = [
    "https://tatatiscon.co.in/samajhdar-banein-behtar-chunein/images/tata-tiscon-logo.png",
    "https://5.imimg.com/data5/ANDROID/Default/2022/11/MU/EO/EF/54440828/product-jpeg.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfjGEHBJsyOYg71h4ULLwUjJW1emvC-yB0w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKwuIE6dRC6k_tm36OvuBB2nAITW4Xk4mgg&s",
    "https://5.imimg.com/data5/SELLER/Default/2022/8/EJ/EA/UI/64828884/priya-cement-grade-43-500x500.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQN1vJ7Pdo0b5YklRP62AJCkjqbNUQncXfYA&s",
    "https://5.imimg.com/data5/SELLER/Default/2023/12/371248014/IP/LI/JB/18773330/prime-gold-tmt-bars.png",
    "https://5.imimg.com/data5/TP/JK/QV/SELLER-7475143/govaan-tmt-500x500.jpg",
    "https://ngatmt.com/wp-content/uploads/2018/09/NGA-TMT_Logo_2-01.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMSKpH0UzD9Sj5lsw8rkOtTJ2McWqlLAfTA&s",
    "https://images.jdmagicbox.com/quickquotes/images_main/ramco-cement-375601565-wi5ay.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDyBl_Qji7H07TzoLvY6C74yYfp50Zj9ovg&s",
];

export default Products;