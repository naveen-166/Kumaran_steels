import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BrandManager from './BrandManager';
import { Authcontext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../AxiosClient';

export default function ProductList() {
  const { islogged } = useContext(Authcontext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', image: '', tags: '' });
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null); // For displaying image preview
  const navigate = useNavigate();

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
      const res = await axiosClient.get('api');
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the image file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prevState) => ({
          ...prevState,
          image: reader.result, // This will be the base64 string
        }));
        setImagePreview(reader.result); // Set the preview for the image
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  const handleAddProduct = async () => {
    try {
      const data = { ...newProduct, tags: newProduct.tags.split(',').map(t => t.trim()) };
      await axiosClient.post('api/', data);
      setNewProduct({ title: '', description: '', image: '', tags: '' });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await axiosClient.put(`api/${selectedProduct._id}`, selectedProduct);
      fetchProducts();
      alert('Product updated!');
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosClient.delete(`api/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
                <div className='flex w-full'>
                <svg
  fill="#7c7979"
  className='size-9 ml-1 hover:cursor-pointer hover:scale-105'
  version="1.1"
  id="Capa_1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 219.151 219.151"
  stroke="#7c7979"
  onClick={()=>{navigate('/admin-panel')}}
>
  <g>
    <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z" />
    <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z" />
  </g>
</svg>
<div className="w-full flex justify-center mb-8">
  <h2 className="text-4xl font-extrabold text-gray-800">Product Manager</h2>
</div>
  </div>

      {/* Add Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input type="text" placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        
        {/* Image Upload */}
        <input type="file" onChange={handleImageChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 mt-4 object-cover rounded-md" />}
        
        <input type="text" placeholder="Tags (comma separated)" value={newProduct.tags} onChange={e => setNewProduct({ ...newProduct, tags: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <button onClick={handleAddProduct} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-8">Add Product</button>

      {/* Products List */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                <p className="text-xs text-gray-500 mt-2">Tags: {product.tags.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Edit Product</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={selectedProduct.title} onChange={e => setSelectedProduct({ ...selectedProduct, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" value={selectedProduct.description} onChange={e => setSelectedProduct({ ...selectedProduct, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="file" onChange={handleImageChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 mt-4 object-cover rounded-md" />}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input type="text" value={selectedProduct.tags.join(', ')} onChange={e => setSelectedProduct({ ...selectedProduct, tags: e.target.value.split(',').map(t => t.trim()) })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>

              <div className="mb-6">
                <img src={selectedProduct.image} alt="Preview" className="w-full h-48 object-contain border rounded-lg" />
              </div>

              <button onClick={handleUpdateProduct} className="bg-blue-600 text-white px-6 py-2 rounded-lg mr-3 hover:bg-blue-700 transition-colors">Update</button>
              <button onClick={() => handleDeleteProduct(selectedProduct._id)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">Delete</button>

              <hr className="my-6" />

              <BrandManager product={selectedProduct} onRefresh={fetchProducts} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
