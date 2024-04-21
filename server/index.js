const express = require("express")
const bodyParser = require("body-parser")
const customerRoutes = require("./routes/customerRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const supplierRoutes = require("./routes/supplierRoutes")
const orderRoutes = require("./routes/orderRoutes")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(cors())

// Register routes
app.use("/customers", customerRoutes)
app.use("/categories", categoryRoutes)
app.use("/products", productRoutes)
app.use("/suppliers", supplierRoutes)
app.use("/orders", orderRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
