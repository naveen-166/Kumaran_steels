import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { axiosClient } from '../AxiosClient';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`api/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-xl space-y-4">
        <p>{error || 'Product not found.'}</p>
        <a href="/products" className="underline text-blue-400 hover:text-blue-300">
          Back to Products
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black font-sans text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-700/20 to-teal-500/20 backdrop-blur-sm z-0"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 text-blue-300 text-sm uppercase tracking-wider border border-blue-500/30">
            Product Details
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-teal-200">
            {product.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {product.description}
          </p>

          {/* Back to Products Button */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to Products</span>
            </Link>
          </div>
        </div>

        {/* Decorative floating shapes */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Trusted Brands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.brands && product.brands.length > 0 ? (
              product.brands.map((brand) => (
                <div
                  key={brand._id}
                  className="group relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-24 mb-6 flex items-center justify-center">
                      <img
                        src={brand.img}
                        alt={brand.name}
                        className="max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      {/* <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {brand.grade}
                      </div> */}
                    </div>
                    <h4 className="text-2xl font-semibold text-white mb-3">{brand.name}</h4>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {/* {brand.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`text-xs px-3 py-1 rounded-full ${
                            tag.toLowerCase().includes('corrosion') ||
                            tag.toLowerCase().includes('ductility') ||
                            tag.toLowerCase().includes('strength')
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-teal-500/20 text-teal-300'
                          }`}
                        >
                          {tag}
                        </span>
                      ))} */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 text-lg">No brands available for this product.</p>
            )}
          </div>
        </div>
      </section>

      {/* Floating Contact Footer */}
      <footer className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] backdrop-blur-md bg-black/30 border border-white/10 rounded-full px-6 py-3 shadow-lg z-50">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <i className="fas fa-phone-alt text-blue-400"></i>
          <span className="text-sm text-gray-300">Contact for Best Prices:</span>
          <a href="tel:+919843511222" className="text-blue-400 font-semibold">+91 98435 11222</a>
        </div>
      </footer>

    </div>
  );
}