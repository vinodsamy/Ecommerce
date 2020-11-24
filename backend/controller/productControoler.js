import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  console.log("id from product", req.params.id)
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product Not Found")
  }
})

export { getProductById, getProducts }
