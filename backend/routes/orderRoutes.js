import express from "express"
const router = express.Router()
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from "../controller/orderController.js"
import { isAdmin, protect } from "../middleware/authMiddleware.js"

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
export default router
