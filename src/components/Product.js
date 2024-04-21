import React, { useState } from "react"

function Product({ product, setProducts }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState(product)

  const handleEditChange = (event) => {
    const { name, value } = event.target
    //i need to update the edited product with the new value not add the values to the existing object

    let tempProduct = { ...editedProduct }
    tempProduct[name] = value
    setEditedProduct(tempProduct)
  }

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/products/${product.ProductID}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: editedProduct.Name,
            Description: editedProduct.Description,
            Price: editedProduct.Price,
            StockLevel: editedProduct.StockLevel,
            CategoryID: editedProduct.CategoryID,
          }),
        }
      )
      if (!res.ok) {
        console.log("Failed to update product")
      } else {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.ProductID === product.ProductID ? editedProduct : p
          )
        )
        setIsEditing(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    console.log(product)
    try {
      const res = await fetch(
        `http://localhost:3001/products/${product.ProductID}`,
        {
          method: "delete",
        }
      )
      if (!res.ok) {
        console.log("Failed to delete product")
      } else {
        setProducts((prevProducts) =>
          prevProducts.filter(
            (p) => p.ProductID !== product.ProductID
          )
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="product">
      {isEditing ? (
        <>
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={editedProduct.Description}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="Price"
            placeholder="Price"
            value={editedProduct.Price}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="StockLevel"
            placeholder="StockLevel"
            value={editedProduct.StockLevel}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="CategoryID"
            placeholder="CategoryID"
            value={editedProduct.CategoryID}
            onChange={handleEditChange}
          />
          <button onClick={saveEdit} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{ marginRight: "10px" }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{product.Name}</h3>
          <p>Description: {product.Description}</p>
          <p>Price: ${product.Price}</p>
          <p>Stock Level: {product.StockLevel}</p>
          <p>Category: {product.CategoryID}</p>
          <p>SKU: {product.ProductID}</p>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginRight: "10px" }}>
            Edit
          </button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Product
