import React, { useState } from 'react';
import axios from 'axios';
import { axiosClient } from '../../AxiosClient';

function BrandManager({ product, onRefresh }) {
  const [brandData, setBrandData] = useState({ name: '', img: '', grade: '', tags: '' });

  const handleAddBrand = async () => {
    const brand = { ...brandData, tags: brandData.tags.split(',').map(t => t.trim()) };
    await axiosClient.post(`api/${product._id}/brands`, brand);
    setBrandData({ name: '', img: '', grade: '', tags: '' });
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
            <span className="font-medium text-gray-800">{b.name} ({b.grade})</span>
            <button onClick={() => handleDeleteBrand(b._id)} className="text-red-500 hover:text-red-700 transition-colors" aria-label="Delete brand">×</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input type="text" placeholder="Brand Name" value={brandData.name} onChange={e => setBrandData({ ...brandData, name: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder="Image URL" value={brandData.img} onChange={e => setBrandData({ ...brandData, img: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder="Grade" value={brandData.grade} onChange={e => setBrandData({ ...brandData, grade: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder="Tags" value={brandData.tags} onChange={e => setBrandData({ ...brandData, tags: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <button onClick={handleAddBrand} className="bg-blue-600 text-white mt-4 px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">Add Brand</button>
    </div>
  );
}

export default BrandManager;