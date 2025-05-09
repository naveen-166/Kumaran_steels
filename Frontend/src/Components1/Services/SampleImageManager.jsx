import React, { useState } from 'react';
import axios from 'axios';
import { axiosClient } from '../../AxiosClient';

function SampleImageManager({ product, onUpdate }) {
  const [newImage, setNewImage] = useState('');

  const addSampleImage = async () => {
    if (!newImage) return;
    try {
      await axiosClient.post(`services/${product._id}/sampleimage`, {
        img: newImage,
      });
      setNewImage('');
      onUpdate();
    } catch (err) {
      console.error("Error adding sample image:", err);
    }
  };

  const deleteSampleImage = async (sampleImageId) => {
    try {
      await axiosClient.delete(`services/${product._id}/sampleimage/${sampleImageId}`);
      onUpdate();
    } catch (err) {
      console.error("Error deleting sample image:", err);
    }
  };

  return (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-700 mb-2">Sample Images</h4>
      <div className="flex flex-wrap gap-3 mb-3">
        {product.simage?.map((s) => (
          <div key={s._id} className="relative group">
            <img src={s.img} alt="Sample" className="w-20 h-20 object-cover rounded-md shadow-sm" />
            <button
              onClick={() => deleteSampleImage(s._id)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Delete"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New sample image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addSampleImage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default SampleImageManager;