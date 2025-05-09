import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { axiosClient } from '../AxiosClient';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`api/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to fetch product details');
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen font-[Montserrat] gradient-bg relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-green-100 opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-200 opacity-10 blur-xl"></div>
      </div>

      {/* Header */}
      <div className="pt-7 px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full mb-4 shadow-md">
          <i className="fas fa-certificate mr-2"></i>
          <span className="text-sm font-semibold">Product Details</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-3 glow-text">
          {product.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {product.description}
        </p>
      </div>

      {/* Product Image */}
      {/* <div className="flex justify-center items-center mt-6 relative z-10">
        <img src={product.image} alt={product.title} className="h-96 object-contain shadow-lg rounded-lg" />
      </div> */}

      {/* Tags */}
      {/* <div className="text-center mt-6">
        <strong className="text-lg text-gray-800">Tags:</strong>
        <div className="flex justify-center space-x-3 mt-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div> */}

      {/* Brand Grid */}
      <div className="flex-1 px-6 pb-12 mt-10 flex items-center justify-center relative z-10">
        {/* <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Brands</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
          {product.brands && product.brands.length > 0 ? (
            product.brands.map((brand) => (
              <div key={brand._id} className="brand-card p-6 flex flex-col items-center justify-center">
                <div className="h-24 mb-5 flex items-center relative">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="h-full object-contain"
                  />
                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {brand.grade}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-800">{brand.name}</h4>
                <div className="flex mt-3 space-x-1 flex-wrap justify-center">
                  {brand.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded ${
                        tag.toLowerCase().includes('corrosion') ||
                        tag.toLowerCase().includes('ductility') ||
                        tag.toLowerCase().includes('strength')
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No brands available for this product.</p>
          )}
        </div>
      </div>

      {/* Floating CTA */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center justify-center space-x-2 z-20">
        <i className="fas fa-phone-alt text-blue-600"></i>
        <span className="text-sm font-semibold text-gray-800">
          Contact for Best Prices:
        </span>
        <span className="text-blue-600 font-bold">+91 98435 11222</span>
      </div>

      {/* Extra styles */}
      <style>{`
        .brand-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        .brand-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #3b82f6, #10b981);
        }

        .brand-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .gradient-bg {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}
