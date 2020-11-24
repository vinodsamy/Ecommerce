import express from "express"
const router = express.Router()
import { getProducts, getProductById, deleteProduct } from "../controller/productControoler.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"
router.route("/").get(getProducts)
router.route("/:id").get(getProductById).delete(protect, isAdmin, deleteProduct)
export default router
