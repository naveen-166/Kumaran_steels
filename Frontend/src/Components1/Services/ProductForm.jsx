
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

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm({ ...form, image: reader.result });  // Base64
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           rows={3}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//         {/* Preview */}
//         {form.image && (
//           <div className="mt-2">
//             <img src={form.image} alt="Preview" className="w-28 h-28 object-cover rounded-md shadow-sm" />
//           </div>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
//         <input
//           type="text"
//           name="tags"
//           placeholder="Tags (comma separated)"
//           value={form.tags.join(', ')}
//           onChange={handleTags}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors duration-200"
//         >
//           {product ? 'Update Service' : 'Create Service'}
//         </button>
//         {product && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors duration-200"
//           >
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
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });  // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    // Show success modal
    setShowSuccess(true);

    // Auto-hide after 2s
    setTimeout(() => setShowSuccess(false), 2000);

      setForm({ title: '', description: '', image: '', tags: [] });

      
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {form.image && (
            <div className="mt-2">
              <img src={form.image} alt="Preview" className="w-28 h-28 object-cover rounded-md shadow-sm" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags.join(', ')}
            onChange={handleTags}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors duration-200"
          >
            {product ? 'Update Service' : 'Create Service'}
          </button>
          {product && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Success Modal */}
{showSuccess && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
    <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 transform animate-fadeIn">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {product ? 'Service Updated!' : 'Service Added!'}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {product 
            ? 'The service has been successfully updated.' 
            : 'A new service has been successfully added.'
          }
        </p>

        <button
          onClick={() => setShowSuccess(false)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ProductForm;
