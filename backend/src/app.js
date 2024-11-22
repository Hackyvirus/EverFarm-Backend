import express, { urlencoded, json, } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/users.routes.js"
import adminRouter from "./routes/admin.routes.js"

const app = express()

app.use(urlencoded({ extended: true, limit: "16kb" }))
app.use(json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser())


app.use("/users", userRouter)
app.use("/admin",adminRouter)


export default app