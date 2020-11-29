import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}
  const products = await Product.find({ ...keyword })
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
    user: req.user._id,
    description: "sample description",
    brand: "sample",
    category: "sample category",
    price: 89.99,
    numReviews: 0,
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
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
    console.log("toString userId", req.user._id.toString())
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed!")
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save()
    res.status(200).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview }
