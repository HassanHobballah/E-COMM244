import React, { useState } from 'react';
import Product from './Product';
import AddProductForm from './AddProductForm';

function ProductsList() {
  const [products, setProducts] = useState([
    { price: 25, details: 'Product 1', stockLevel: 15, category: 'Category A', sku: 'SKU001' },
    { price: 45, details: 'Product 2', stockLevel: 5, category: 'Category B', sku: 'SKU002' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Products</h1>
      <input type="text" placeholder="Search products" value={searchTerm} onChange={handleSearchChange} />
      <AddProductForm setProducts={setProducts} />
      {filteredProducts.map(product => (
        <Product key={product.sku} product={product} setProducts={setProducts} />
      ))}
    </div>
  );
}

export default ProductsList;
