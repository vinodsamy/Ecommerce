import express from "express"

const router = express.Router()
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile, deleteUser, getUserById, updateUser } from "../controller/userController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect, isAdmin, getUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/:id").delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser)
export default router
