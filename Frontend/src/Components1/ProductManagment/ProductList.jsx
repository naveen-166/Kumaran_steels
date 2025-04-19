// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BrandManager from './BrandManager';


// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ title: '', description: '', image: '', tags: '' });
//   const [editingProduct, setEditingProduct] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:4000/api');
//     setProducts(res.data);
//   };

//   const handleAddProduct = async () => {
//     const data = { ...newProduct, tags: newProduct.tags.split(',') };
//     await axios.post('http://localhost:4000/api/', data);
//     setNewProduct({ title: '', description: '', image: '', tags: '' });
//     fetchProducts();
//   };

//   const handleUpdateProduct = async () => {
//     await axios.put(`http://localhost:4000/api/${editingProduct._id}`, editingProduct);
//     setEditingProduct(null);
//     fetchProducts();
//   };

//   const handleDeleteProduct = async (id) => {
//     await axios.delete(`http://localhost:4000/api/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Products</h2>

//       <input type="text" placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} />
//       <input type="text" placeholder="Desc" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
//       <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
//       <input type="text" placeholder="Tags" value={newProduct.tags} onChange={e => setNewProduct({ ...newProduct, tags: e.target.value })} />
//       <button onClick={handleAddProduct}>Add Product</button>

//       {products.map(product => (
//         <div key={product._id} className="border p-4 mt-4">
//           <img src={product.image} className="h-32" alt="" />
//           <h3>{product.title}</h3>
//           <p>{product.description}</p>
//           <div>
//             Tags: {product.tags.join(', ')}
//           </div>

//           <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
//           <button onClick={() => setEditingProduct(product)}>Edit</button>

//           <BrandManager product={product} onRefresh={fetchProducts} />
//         </div>
//       ))}

//       {/* Edit Product Form */}
//       {editingProduct && (
//         <div className="bg-gray-100 p-4 mt-4">
//           <h4>Edit Product</h4>
//           <input type="text" value={editingProduct.title} onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })} />
//           <input type="text" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} />
//           <button onClick={handleUpdateProduct}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrandManager from './BrandManager';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', image: '', tags: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:4000/api');
    setProducts(res.data);
  };

  const handleAddProduct = async () => {
    const data = { ...newProduct, tags: newProduct.tags.split(',').map(t => t.trim()) };
    await axios.post('http://localhost:4000/api/', data);
    setNewProduct({ title: '', description: '', image: '', tags: '' });
    fetchProducts();
  };

  const handleUpdateProduct = async () => {
    await axios.put(`http://localhost:4000/api/${editingProduct._id}`, editingProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:4000/api/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Product Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        <input type="text" placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Tags" value={newProduct.tags} onChange={e => setNewProduct({ ...newProduct, tags: e.target.value })} className="border p-2 rounded" />
      </div>
      <button onClick={handleAddProduct} className="bg-green-600 text-white px-4 py-2 rounded mb-6">Add Product</button>

      {products.map(product => (
        <div key={product._id} className="border rounded shadow p-4 mb-6">
          <img src={product.image} className="w-32 h-32 object-cover rounded mb-2" alt="" />
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500 mt-1">Tags: {product.tags.join(', ')}</p>

          <div className="flex gap-2 mt-3">
            <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            <button onClick={() => setEditingProduct(product)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
          </div>

          <BrandManager product={product} onRefresh={fetchProducts} />
        </div>
      ))}

      {editingProduct && (
        <div className="bg-gray-100 p-4 mt-6 rounded">
          <h4 className="text-lg font-semibold mb-2">Edit Product</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input type="text" value={editingProduct.title} onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })} className="border p-2 rounded" />
            <input type="text" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="border p-2 rounded" />
          </div>
          <button onClick={handleUpdateProduct} className="bg-yellow-500 text-white mt-4 px-4 py-2 rounded">Update</button>
        </div>
      )}
    </div>
  );
}