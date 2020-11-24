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

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product removed." })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample",
    image: "/images/sample.jpg",
    description: "sample description",
    brand: "sample",
    category: "sample category",
    price: 89.99,
    countInStock: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.image = image
    product.brand = brand
    product.price = price
    product.category = category
    product.description = description
    product.countInStock = countInStock

    let updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export { getProductById, getProducts, deleteProduct, createProduct, updateProduct }
