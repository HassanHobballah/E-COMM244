import React, { useEffect, useState } from "react"
import Product from "./Product"
import AddProductForm from "./AddProductForm"

function ProductsList() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:3001/products/")
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <AddProductForm />
      {filteredProducts.map((product) => (
        <Product
          key={product.id}
          product={product}
          setProducts={setProducts}
        />
      ))}
    </div>
  )
}

export default ProductsList
