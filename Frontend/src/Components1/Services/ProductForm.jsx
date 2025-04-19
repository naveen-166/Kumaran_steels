// import React, { useState, useEffect } from 'react';

// function ProductForm({ product, onSubmit, onCancel }) {
//   const [form, setForm] = useState({ title: '', description: '', image: '', tags: [] });

//   useEffect(() => {
//     if (product) {
//       setForm({ ...product });
//     } else {
//       setForm({ title: '', description: '', image: '', tags: [] });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleTags = (e) => {
//     setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//     setForm({ title: '', description: '', image: '', tags: [] });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2 mb-6">
//       <input
//         type="text"
//         name="title"
//         placeholder="Title"
//         value={form.title}
//         onChange={handleChange}
//         className="border p-2 w-full"
//         required
//       />
//       <textarea
//         name="description"
//         placeholder="Description"
//         value={form.description}
//         onChange={handleChange}
//         className="border p-2 w-full"
//       />
//       <input
//         type="text"
//         name="image"
//         placeholder="Main Image URL"
//         value={form.image}
//         onChange={handleChange}
//         className="border p-2 w-full"
//       />
//       <input
//         type="text"
//         name="tags"
//         placeholder="Tags (comma separated)"
//         onChange={handleTags}
//         value={form.tags.join(', ')}
//         className="border p-2 w-full"
//       />
//       <div className="flex gap-2">
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           {product ? 'Update' : 'Create'}
//         </button>
//         {product && (
//           <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }

// export default ProductForm;

import React, { useState, useEffect } from 'react';

function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm] = useState({ title: '', description: '', image: '', tags: [] });

  useEffect(() => {
    if (product) {
      setForm({ ...product });
    } else {
      setForm({ title: '', description: '', image: '', tags: [] });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (e) => {
    setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', image: '', tags: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="image"
        placeholder="Main Image URL"
        value={form.image}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* ✅ Preview of Main Image */}
      {form.image && (
        <div className="mt-2">
          <img
            src={form.image}
            alt="Main preview"
            className="w-32 h-32 object-cover border rounded"
          />
        </div>
      )}

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={handleTags}
        value={form.tags.join(', ')}
        className="border p-2 w-full"
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {product ? 'Update' : 'Create'}
        </button>
        {product && (
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
