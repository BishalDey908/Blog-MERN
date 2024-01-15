import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import "./db/db.js"
//path custom router------------
import userRouter from "./routes/user.js"
import BlogRouter from "./routes/blog.js"

dotenv.config()
const app = express()
app.use(express.json())

//{Credentials:true}
app.use(cors(
    {
        origin:["https://blog-mern-frontend-flax.vercel.app"],
        methods:["POST","PUT","DELETE","GET"],
        Credentials:true
    }
))

//use custom route------------
app.use("/api/user",userRouter)
app.use("/api/blog",BlogRouter)




const port = process.env.PORT || 500
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
