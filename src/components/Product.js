import React, { useState } from 'react';

function Product({ product, setProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEditChange = (event) => {
    setEditedProduct({ ...editedProduct, [event.target.name]: event.target.value });
  };

  const saveEdit = () => {
    setProducts((prevProducts) => 
      prevProducts.map((p) => (p.sku === product.sku ? editedProduct : p))
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.sku !== product.sku)
    );
  };

  return (
    <div className="product">
      {isEditing ? (
        <>
          <input type="text" name="details" value={editedProduct.details} onChange={handleEditChange} />
          <input type="number" name="price" value={editedProduct.price} onChange={handleEditChange} />
          <input type="number" name="stockLevel" value={editedProduct.stockLevel} onChange={handleEditChange} />
          <input type="text" name="category" value={editedProduct.category} onChange={handleEditChange} />
          <button onClick={saveEdit} style={{ marginRight: '10px' }} >Save</button>
          <button onClick={() => setIsEditing(false)} style={{ marginRight: '10px' }} >Cancel</button>
        </>
      ) : (
        <>
          <h3>{product.details}</h3>
          <p>Price: ${product.price}</p>
          <p>Stock Level: {product.stockLevel}</p>
          <p>Category: {product.category}</p>
          <p>SKU: {product.sku}</p>
          <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Product;
