// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductForm from './ProductForm';
// import SampleImageManager from './SampleImageManager';

// function Service() {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:4000/services');
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleCreateOrUpdate = async (product) => {
//     if (product._id) {
//       const res = await axios.put(`http://localhost:4000/services/${product._id}`, product);
//       setProducts(products.map(p => (p._id === product._id ? res.data : p)));
//     } else {
//       const res = await axios.post('http://localhost:4000/services', product);
//       setProducts([...products, res.data]);
//     }
//     setEditingProduct(null);
//   };

//   const handleDelete = async (productId) => {
//     await axios.delete(`http://localhost:4000/services/${productId}`);
//     setProducts(products.filter(p => p._id !== productId));
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

//       <ProductForm
//         product={editingProduct}
//         onSubmit={handleCreateOrUpdate}
//         onCancel={() => setEditingProduct(null)}
//       />

//       <div className="mt-6 space-y-4">
//         {products.map((product) => (
//           <div key={product._id} className="border p-4 rounded shadow">
//             <h2 className="text-xl font-semibold">{product.title}</h2>
//             <p>{product.description}</p>

//             {/* ✅ Main image preview */}
//             {product.image && (
//               <img
//                 src={product.image}
//                 alt="Main"
//                 className="w-32 h-32 object-cover rounded mt-2"
//               />
//             )}

//             <div className="flex gap-2 mt-2">
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//                 onClick={() => setEditingProduct(product)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//                 onClick={() => handleDelete(product._id)}
//               >
//                 Delete
//               </button>
//             </div>

//             <SampleImageManager product={product} onUpdate={fetchProducts} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Service;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import SampleImageManager from './SampleImageManager';

function Service() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:4000/services');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateOrUpdate = async (product) => {
    if (product._id) {
      const res = await axios.put(`http://localhost:4000/services/${product._id}`, product);
      setProducts(products.map(p => (p._id === product._id ? res.data : p)));
    } else {
      const res = await axios.post('http://localhost:4000/services', product);
      setProducts([...products, res.data]);
    }
    setEditingProduct(null);
  };

  const handleDelete = async (productId) => {
    await axios.delete(`http://localhost:4000/services/${productId}`);
    setProducts(products.filter(p => p._id !== productId));
  };

  return (
    <div className="min-h-screen gradient-bg font-[Montserrat] px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 glow-text mb-2">Service Management</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Add, edit, or delete your services and manage sample images all in one place.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-lg mb-10 relative z-10">
        <ProductForm
          product={editingProduct}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      </div>

      {/* Products */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 relative z-10">
        {products.map((product) => (
          <div key={product._id} className="sample-card p-6 rounded-xl shadow-md bg-white relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>

            {product.image && (
              <img
                src={product.image}
                alt="Main"
                className="w-full h-48 object-cover rounded mt-4 shadow"
              />
            )}

            <div className="flex gap-3 mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>

            <SampleImageManager product={product} onUpdate={fetchProducts} />
          </div>
        ))}
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-green-100 opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-200 opacity-10 blur-xl"></div>
      </div>

      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }
        .sample-card {
          transition: all 0.3s ease-in-out;
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
        }
        .sample-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -10px rgba(0,0,0,0.1);
        }
        .glow-text {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}

export default Service;
