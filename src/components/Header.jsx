import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";
import { Login } from "@mui/icons-material";

const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className=" sticky z-10 bg-black top-0 text-3xl flex justify-between items-center text-red-600 font-bold p-3 border-b-2 border-gray-50">
      <Link to={"/"}>
         
        <span>
          Filmy<span className="text-white">Adda</span>
        </span>
      </Link>
      {useAppstate.login ? 
        <Link to={"/addmovie"}>
        <h1 className="text-xl  cursor-pointer">
          <Button>
            <AddIcon /> <span className="text-white font-bold"> Add new</span>
          </Button>
        </h1>
      </Link> 
      :
      <Link to={"/Login"}>
      <h1 className="text-xl  cursor-pointer">
        <Button>
        
          <span className="text-white capitalize  font-bold pl-2 pr-2 pt-1 pb-1 b-r bg-blue-700">Login</span>
        </Button>
      </h1>
      </Link> 
      }
    </div>
  );
};

export default Header;
