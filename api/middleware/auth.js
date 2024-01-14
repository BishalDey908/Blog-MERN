import user from "../models/UserSchema.js"
import  Jwt  from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const getAuth = async (req,res,next)=>{
    try{
        //set the token 
        const token = req.headers.token

        if(!token){
            res.status(401).json({error:"unauthorized"})
        }
        
        //verify the token
        const verifyToken =  Jwt.verify(token,process.env.SECRET)
        

        //find the user with this token
        const auth = await user.findById(verifyToken.id)
        req.userId= verifyToken.id
        req.auth = auth
        
        next()
    }catch(err){
        res.status(401).json({error:"error from auth"})
    }
}

export default getAuth