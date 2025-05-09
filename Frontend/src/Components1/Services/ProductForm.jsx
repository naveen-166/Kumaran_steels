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
  };

  return (
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
        <input
          type="text"
          name="image"
          placeholder="Main Image URL"
          value={form.image}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Preview */}
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
  );
}

export default ProductForm;