import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const CreatePost = () => {
const navigator = useNavigate()
    const [blog,setBlog] = useState({
        title: "",
        content: "",
        image:""
      })
    
      const handleChange=(e) =>{
        const name= e.target.name
        const value= e.target.value
        setBlog({...blog,[name]:value})
      }
    
      const handleSubmit = async (e) =>{
        e.preventDefault()
        
        const res = await fetch("https://blog-mern-backend-hazel.vercel.app/api/blog/create",{
          method:"POST",
          headers:{
            'Content-Type':'application/json',

            //authenticate user
            token:localStorage.getItem("token")
          },
          body:JSON.stringify(blog)
        })
        const data = await res.json()
        if(res.ok){
          console.log(data)
          toast.success("Blog Created");
          navigator("/");
        }else{
          console.log(data)
        }
      }

  return (
    <div>
          <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Post
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
             
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Title</label>
                      <input name="title"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required onChange={handleChange} value={blog.title} />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add ImageURL</label>
                      <input name="image"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required onChange={handleChange} value={blog.image} />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add content</label>
                      <textarea  name="content"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  rows="7" onChange={handleChange} value={blog.content}/>
                  </div>
                  
                  <div className="flex items-start">
                      
                      
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Login to your account</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default CreatePost
