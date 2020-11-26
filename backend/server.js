import express from "express"
import path from "path"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound, errorHandler } from "./middleware/errorHandlerMiddleware.js"
import { protect } from "./middleware/authMiddleware.js"
const app = express()

dotenv.config()
connectDB()

app.use(express.json())
app.get("/", (req, res) => {
  res.send("API is running.....")
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)
app.use(errorHandler)
app.use(protect)
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
app.listen(5000, console.log(`server running in ${process.env.NODE_MODE} on port ${process.env.PORT}`))
