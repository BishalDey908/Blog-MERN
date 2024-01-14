import express from "express"
//userSchema import---------------
import user from "../models/UserSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import getAuth from "../middleware/auth.js"

const userRouter = express.Router()

//use the JSON formate DATA--------
userRouter.use(express.json())

//GET all users------------------
userRouter.get("/",async (req,res)=>{
      try{
        const userData= await user.find({})
        res.status(200).send({"userDatas":userData})
      }catch(err){
        res.status(400).json({"err to fetch UserData":err})
      }
})

//define register route------------------
userRouter.post("/register",async (req,res)=>{
   try{
        const{name,email,password} = req.body


        if(name && email && password){
          //hashing the password----------
          const hashPassword = await bcrypt.hash(password,10)
          //create a new user using model-----
          const regUser = await user.create({name:name,email:email,password:hashPassword})
          res.status(200).json({"message":"User Reg Successful",user:regUser})
        }
        else{
           res.status(400).json("please fill out all fields")
        }
   }catch(err){
    res.status(400).json({"err on reg":err})
   }
})

//define login route------------------
//(IMPORTANT => if route have multiple response then there is a chance to crash the app so we have to return the responses by "return" keyword )
userRouter.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body
        const existUser = await user.findOne({email})

        if(!existUser){
            return res.status(404).json({"oops":"user not exists"})
        }

        //decrypt the password
        const comparePassword = await bcrypt.compare(password,existUser.password)
        if(!comparePassword){
          return res.status(400).json({"oops":"Wrong Cradenticals"})
      }
      //generate JWT token
      const token = jwt.sign({id: existUser._id},process.env.SECRET)
       res.status(200).json({"message":"Login Successful:)",token:token})
    
    }catch(err){
        res.status(400).json({"err on Login":err})
    }
})

//for authorization
userRouter.get("/auth",getAuth,(req,res)=>{
  res.status(200).json(req.auth)
})


export default userRouter