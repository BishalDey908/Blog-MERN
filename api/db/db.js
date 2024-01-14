import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB CONNECTED"))
.catch((err)=>console.log(err))