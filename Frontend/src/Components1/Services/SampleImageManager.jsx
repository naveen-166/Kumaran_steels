import React, { useState } from 'react';
import axios from 'axios';

function SampleImageManager({ product, onUpdate }) {
  const [newImage, setNewImage] = useState('');

  const addSampleImage = async () => {
    if (!newImage) return;
    await axios.post(`http://localhost:4000/services/${product._id}/sampleimage`, {
      img: newImage,
    });
    setNewImage('');
    onUpdate();
  };

  const deleteSampleImage = async (sampleImageId) => {
    await axios.delete(`http://localhost:4000/services/${product._id}/sampleimage/${sampleImageId}`);
    onUpdate();
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-1">Sample Images</h4>
      <div className="flex flex-wrap gap-4">
        {product.simage.map((s) => (
          <div key={s._id} className="relative">
            <img src={s.img} alt="sample" className="w-24 h-24 object-cover rounded" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
              onClick={() => deleteSampleImage(s._id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          placeholder="New sample image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={addSampleImage} className="bg-blue-500 text-white px-3 rounded">
          Add
        </button>
      </div>
    </div>
  );
}

export default SampleImageManager;
