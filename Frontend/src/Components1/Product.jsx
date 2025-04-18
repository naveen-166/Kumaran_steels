import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:4000/api');
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Premium Products</h2>
          <div className="w-20 h-1 bg-yellow-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg block"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = '/fallback.jpg')}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
