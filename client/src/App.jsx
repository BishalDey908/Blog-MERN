import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import { createContext, useState } from "react";
import UpdatePost from "./pages/UpdatePost";

//create contex
export const AuthContex = createContext();

function App() {
  //STATE MANAGEMENT FOR USER SESSION
  const [refresh,setRefresh] =useState(false)
  const [auth, setAuth] = useState(null);

  
  

  return (
    <>
     {/* //use contex */}
      <AuthContex.Provider value={{auth,setAuth,refresh,setRefresh}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Routes>
        </BrowserRouter>
      </AuthContex.Provider>
    </>
  );
}

export default App;
