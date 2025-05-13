import React, { useState } from 'react';
import { axiosClient } from '../../AxiosClient';

function SampleImageManager({ product, onUpdate }) {
  const [newImage, setNewImage] = useState('');

  const handleSampleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);  // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const addSampleImage = async () => {
    if (!newImage) return;
    try {
      await axiosClient.post(`services/${product._id}/sampleimage`, { img: newImage });
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

      <div className="flex gap-2 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleSampleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          onClick={addSampleImage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add
        </button>
      </div>

      {newImage && (
        <div className="mt-3">
          <h5 className="text-sm font-medium text-gray-600 mb-1">Preview</h5>
          <img src={newImage} alt="New Sample Preview" className="w-20 h-20 object-cover rounded-md shadow-sm" />
        </div>
      )}
    </div>
  );
}

export default SampleImageManager;
