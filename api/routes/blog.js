import getAuth from "../middleware/auth.js"
import blog from "../models/Blogschema.js"


import express from "express"


//trmplate for response
const BlogRouter = express.Router()
BlogRouter.use(express.json())

const response = (res,status,result) =>{
    res.status(status).json(result)
}

BlogRouter.get("/",getAuth,async(req,res)=>{
      try{
         const reasult = await blog.find({}).populate("user","-password").sort("-createdOn")

         //use the trmplate
         response(res,200,reasult)
      }catch(err){
        //use the trmplate
        console.error(err)
        response(res,200,{"err from blog":err})
      }
})

//blog create router
BlogRouter.post("/create",getAuth,async(req,res)=>{
    try{
        const {title,content,image} = req.body


        if(title&&content){
        const setBlog = await blog.create({title,content,image,user:req.userId})
        //use the trmplate
        response(res,200,{"successfully add data":setBlog})
        }else{
            response(res,400,{"oops!":"data is not complete"})
        }
    }catch(err){
        //use the trmplate
        response(res,400,{"faild tp add data on blog":err})
    }
})

//blog delete router
BlogRouter.delete("/delete/:id",getAuth,async(req,res)=>{
    try{
        const deleteblog = await blog.findOneAndDelete({user: req.userId,_id:req.params.id})
        
        if(!deleteblog){
             return response(res,404,{"oops":"blog not found"})
        }
        response(res,200,{message:"Successfully delete the blog"})
    }catch(error){
        return response(res,500,{"error from delete router":error})
    }
})

//blog update router
BlogRouter.put("/update/:id",getAuth,async(req,res)=>{

    const{title,content,image}=req.body
    await blog.findOneAndUpdate({
        user:req.userId,
        _id : req.params.id
    },{
        title,
        content,
        image
    })
    .then((reasult)=>response(res,200,{"message":"Blog updated Successfully",blog:reasult}))
    .catch((err)=>response(req,400,{"err":"error from delete router"}))
})

//get a single blog router
BlogRouter.get("/:id",getAuth,async(req,res)=>{
    await blog.findById(req.params.id).populate("user","-password")
    .then(reasult => response(res,200,reasult))
    .catch(err => response(res,400,{error:err}))
})

export default BlogRouter