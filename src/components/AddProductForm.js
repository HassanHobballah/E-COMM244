import React, { useState } from 'react';

function AddProductForm({ setProducts }) {
  const [formData, setFormData] = useState({
    price: '',
    details: '',
    stockLevel: '',
    category: '',
    sku: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts(prevProducts => [...prevProducts, { ...formData, price: Number(formData.price), stockLevel: Number(formData.stockLevel) }]);
    setFormData({
      price: '',
      details: '',
      stockLevel: '',
      category: '',
      sku: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="details" value={formData.details} onChange={handleChange} placeholder="Details" required />
      <input type="number" name="stockLevel" value={formData.stockLevel} onChange={handleChange} placeholder="Stock Level" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
