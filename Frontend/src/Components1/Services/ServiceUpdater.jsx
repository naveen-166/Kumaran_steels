import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import SampleImageManager from './SampleImageManager';
import { Authcontext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../AxiosClient';

function Service() {
  const { islogged } = useContext(Authcontext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // State for managing delete loading spinner

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
      const res = await axiosClient.get('services');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (product) => {
    try {
      if (product._id) {
        const res = await axiosClient.put(`services/${product._id}`, product);
        setProducts(products.map((p) => (p._id === product._id ? res.data : p)));
      } else {
        const res = await axiosClient.post('services', product);
        setProducts([...products, res.data]);
      }
      setEditingProduct(null);
      // After success, refresh the products list
      fetchProducts();  // This will trigger a re-fetch of the services
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true); // Show spinner
      await axiosClient.delete(`services/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err) {
      console.error('Error deleting service:', err);
    } finally {
      setDeleteLoading(false); // Hide spinner once the delete request finishes
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-10">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <div className='flex '>
        <svg
  className="w-10 h-10 fill-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 219.151 219.151"
  onClick={() => navigate('/admin-panel')}
><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"></path> <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"></path> </g> </g></svg>
        <div className="w-full flex justify-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Service Management</h1>
        </div>
        </div>
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
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
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
                    onClick={() => {
                      setProductToDelete(product);
                      setShowDeleteModal(true);
                    }}
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

      {/* Confirmation Modal for Delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-fadeIn">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Delete Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this service? This action cannot be undone.
              </p>

              <div className="flex gap-4 w-full justify-center">
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-70"
                >
                  {deleteLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                           viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
