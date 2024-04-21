import React, { useState } from "react"

function AddProductForm({ setProducts }) {
  const [formData, setFormData] = useState({
    price: 0,
    details: "",
    stockLevel: 0,
    category: "",
    imageUrl: "",
    name: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const onClick = async () => {
    try {
      const res = await fetch("http://localhost:3001/products/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.details,
          price: formData.price,
          stockLevel: formData.stockLevel,
          categoryID: formData.category,
          imageURL: formData.imageUrl,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setProducts((prevProducts) => [...prevProducts, data])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="details"
        value={formData.details}
        onChange={handleChange}
        placeholder="Details"
        required
      />
      <input
        type="number"
        name="stockLevel"
        value={formData.stockLevel}
        onChange={handleChange}
        placeholder="Stock Level"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image Url"
        required
      />
      <button onClick={() => onClick()}>Add Product</button>
    </div>
  )
}

export default AddProductForm
