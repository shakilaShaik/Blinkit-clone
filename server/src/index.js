import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectDB from "./config/connectDB.js"
import userRouter from "./route/user.route.js"
import dotenv from "dotenv"
import categoryRouter from "./route/category.route.js"
import uploadRouter from "./route/upload.router.js"
import subCategoryRouter from "./route/subCategory.route.js"
import productRouter from "./route/product.route.js"
import cartRouter from "./route/cart.route.js"
import addressRouter from "./route/address.route.js"
import orderRouter from "./route/order.route.js"
dotenv.config()

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL

}))


app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.get('/', (req, res) => {
    res.send("Hello world")
})
const PORT = process.env.PORT || 9000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on port", PORT)
    })
})

app.use('/api/user', userRouter)

app.use("/api/category", categoryRouter)

app.use("/api/file", uploadRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)



export default app