// import React, { useState } from 'react';
// import axios from 'axios';

// function BrandManager({ product, onRefresh }) {
//   const [brandData, setBrandData] = useState({ name: '', img: '', grade: '', tags: '' });

//   const handleAddBrand = async () => {
//     const brand = { ...brandData, tags: brandData.tags.split(',') };
//     await axios.post(`http://localhost:4000/api/${product._id}/brands`, brand);
//     setBrandData({ name: '', img: '', grade: '', tags: '' });
//     onRefresh();
//   };

//   const handleDeleteBrand = async (bid) => {
//     await axios.delete(`http://localhost:4000/api/${product._id}/brands/${bid}`);
//     onRefresh();
//   };

//   return (
//     <div>
//       <h4 className="font-semibold mt-4">Brands</h4>
//       {product.brands.map(b => (
//         <div key={b._id} className="p-2 bg-gray-100 mb-2 flex justify-between">
//           <span>{b.name} ({b.grade})</span>
//           <button onClick={() => handleDeleteBrand(b._id)}>❌</button>
//         </div>
//       ))}

//       <input type="text" placeholder="Brand Name" value={brandData.name} onChange={e => setBrandData({ ...brandData, name: e.target.value })} />
//       <input type="text" placeholder="Image URL" value={brandData.img} onChange={e => setBrandData({ ...brandData, img: e.target.value })} />
//       <input type="text" placeholder="Grade" value={brandData.grade} onChange={e => setBrandData({ ...brandData, grade: e.target.value })} />
//       <input type="text" placeholder="Tags" value={brandData.tags} onChange={e => setBrandData({ ...brandData, tags: e.target.value })} />
//       <button onClick={handleAddBrand}>Add Brand</button>
//     </div>
//   );
// }

// export default BrandManager;


import React, { useState } from 'react';
import axios from 'axios';

function BrandManager({ product, onRefresh }) {
  const [brandData, setBrandData] = useState({ name: '', img: '', grade: '', tags: '' });

  const handleAddBrand = async () => {
    const brand = { ...brandData, tags: brandData.tags.split(',').map(t => t.trim()) };
    await axios.post(`http://localhost:4000/api/${product._id}/brands`, brand);
    setBrandData({ name: '', img: '', grade: '', tags: '' });
    onRefresh();
  };

  const handleDeleteBrand = async (bid) => {
    await axios.delete(`http://localhost:4000/api/${product._id}/brands/${bid}`);
    onRefresh();
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Brands</h4>
      {product.brands.map(b => (
        <div key={b._id} className="flex justify-between items-center bg-gray-100 rounded p-2 mb-2">
          <span>{b.name} ({b.grade})</span>
          <button onClick={() => handleDeleteBrand(b._id)} className="text-red-600 hover:text-red-800">❌</button>
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        <input type="text" placeholder="Brand Name" value={brandData.name} onChange={e => setBrandData({ ...brandData, name: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Image URL" value={brandData.img} onChange={e => setBrandData({ ...brandData, img: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Grade" value={brandData.grade} onChange={e => setBrandData({ ...brandData, grade: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Tags" value={brandData.tags} onChange={e => setBrandData({ ...brandData, tags: e.target.value })} className="border p-2 rounded" />
      </div>

      <button onClick={handleAddBrand} className="bg-blue-600 text-white mt-3 px-4 py-2 rounded">Add Brand</button>
    </div>
  );
}

export default BrandManager;