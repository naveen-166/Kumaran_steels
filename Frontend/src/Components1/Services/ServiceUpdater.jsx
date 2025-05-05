import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import SampleImageManager from './SampleImageManager';
import { Authcontext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Service() {
  const { islogged } = useContext(Authcontext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!islogged) {
      navigate('/');
    }
  }, [islogged, navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/services');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (product) => {
    try {
      if (product._id) {
        const res = await axios.put(`http://localhost:4000/services/${product._id}`, product);
        setProducts(products.map(p => (p._id === product._id ? res.data : p)));
      } else {
        const res = await axios.post('http://localhost:4000/services', product);
        setProducts([...products, res.data]);
      }
      setEditingProduct(null);
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      if (window.confirm('Are you sure you want to delete this service?')) {
        await axios.delete(`http://localhost:4000/services/${productId}`);
        setProducts(products.filter(p => p._id !== productId));
      }
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-10">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Service Management</h1>
        <p className="text-gray-600">
          Add, edit, or delete your services and manage sample images all in one place.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <ProductForm
          product={editingProduct}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>

                {product.image && (
                  <img
                    src={product.image}
                    alt="Main"
                    className="w-full h-48 object-cover rounded-lg shadow-sm mb-4"
                  />
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>

                <SampleImageManager product={product} onUpdate={fetchProducts} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Service;