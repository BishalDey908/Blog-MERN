import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContex } from "../App"
import { toast } from "react-toastify"


const Navbar = () => {
  const [username,setUsername]=useState("User")
  //import AuthContex and dstructure
  const {auth,setAuth,refresh,setRefresh} = useContext(AuthContex)
  const navigator =useNavigate()
  

  useEffect(()=>{
   const fetchUser = async ()=>{
    const res = await fetch("http://blog-mern-backend-hazel.vercel.app/api/user/auth",{
      method:"GET",
      headers:{
        token:localStorage.getItem("token")
      }
    })

    const data = await res.json()
    // console.log("darty",data)
    setUsername(data.name)
    // console.log(username)
    if(res.ok){
      setAuth(data)
      setRefresh(false)
    }else{
      setAuth(null)
    }
   }
   fetchUser(); //call the api functiom
  },[auth,refresh]) //if some changes occur in "[auth]" the call the api


  const logOut = () =>{
       localStorage.removeItem("token")
       setRefresh(true)
       navigator("/login");
       toast.success("Logout Successful");
  } 

  return (
    <div>  

<nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><h1><span>Hii </span>{username ? username : "User"}</h1></span>
    </a>
    
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
    
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {
          auth ?<>
        <li>
          <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
           </li>
        <li>
          <Link to="/create" className="block py-2 px-3 text-white  rounded md:bg-transparent  md:p-0 dark:text-white " aria-current="page">create</Link>
        </li>
        <li>
          <Link  className="block py-2 px-3 text-white  rounded md:bg-transparent  md:p-0 dark:text-white " aria-current="page" onClick={logOut}>Logout</Link>
        </li>

        </>:<>


        <li>
          <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
        </li>
        <li>
          <Link to="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
        </li>

        </>
        }
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar