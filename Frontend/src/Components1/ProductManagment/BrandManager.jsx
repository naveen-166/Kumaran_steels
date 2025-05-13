import React, { useState } from 'react';
import { axiosClient } from '../../AxiosClient';

function BrandManager({ product, onRefresh }) {
  const [brandData, setBrandData] = useState({ name: '', img: '', grade: '', tags: '' });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandData((prev) => ({ ...prev, img: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  const handleAddBrand = async () => {
    const brand = { ...brandData, tags: brandData.tags.split(',').map(t => t.trim()) };
    await axiosClient.post(`api/${product._id}/brands`, brand);
    setBrandData({ name: '', img: '', grade: '', tags: '' });
    setImagePreview(null);
    onRefresh();
  };

  const handleDeleteBrand = async (bid) => {
    await axiosClient.delete(`api/${product._id}/brands/${bid}`);
    onRefresh();
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h4 className="text-lg font-semibold text-gray-700 mb-3">Brands</h4>

      <div className="space-y-2">
        {product.brands.map(b => (
          <div key={b._id} className="flex justify-between items-center bg-gray-100 rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-3">
              <img src={b.img} alt={b.name} className="w-10 h-10 object-cover rounded-md" />
              <span className="font-medium text-gray-800">{b.name} ({b.grade})</span>
            </div>
            <button onClick={() => handleDeleteBrand(b._id)} className="text-red-500 hover:text-red-700 transition-colors" aria-label="Delete brand">×</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input type="text" placeholder="Brand Name" value={brandData.name} onChange={e => setBrandData({ ...brandData, name: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        
        <input type="file" accept="image/*" onChange={handleImageChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-md mt-2" />}
        
        <input type="text" placeholder="Grade" value={brandData.grade} onChange={e => setBrandData({ ...brandData, grade: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder="Tags" value={brandData.tags} onChange={e => setBrandData({ ...brandData, tags: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <button onClick={handleAddBrand} className="bg-blue-600 text-white mt-4 px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">Add Brand</button>
    </div>
  );
}

export default BrandManager;
