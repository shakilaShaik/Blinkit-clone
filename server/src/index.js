import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectDB from "./config/connectDB.js"
import userRouter from "./route/user.route.js"

const app = express()
app.use(cors({
    credentials: true

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
const PORT = process.env.PORT || 8080
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on port", PORT)
    })
})

app.use('/api/user', userRouter)