import Addmovie from "./components/Addmovie";
import Cards from "./components/Cards";
import Header from "./components/Header";
import { Routes ,Route } from "react-router-dom";
import Detail from "./components/Detail";
// import Reviews from "./components/Reviews";
import { createContext, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";


const Appstate = createContext();
function App() {
  const [login,setlogin] = useState(false)
  const [userName,setuserName] = useState("")

  return (
    <Appstate.Provider value={{login,userName,setlogin,setuserName}}> 
    <div className="relative">
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>}/>
       
        <Route path="/addmovie" element={<Addmovie/>}/>

        <Route path="/Detail/:id" element={<Detail/>}/>
        
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export  {Appstate};