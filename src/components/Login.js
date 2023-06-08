
import React, { useContext, useState } from "react";
import Signup from "./Signup";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import { userRef } from "../firebase/firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setform] = useState({
    "mobile" :"",
    "password":"",

  });
  const [loading, setloading] = useState(false);


  const login = async () => {
    setloading(true);
    try {
      const quer = query(userRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
          useAppstate.setlogin(true);
          useAppstate.setuserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setloading(false);
  }

  return (
    <div className=" w-full flex flex-col justify-center items-center h-96">
      <h1 className="font-bold text-2xl">Login</h1>
      <div className="p-2 w-full md:w-80 ">
        <div className="relative  capitalize">
          <label for="message" className="leading-7 text-sm text-white">
            mobile number
          </label>
          <input
            type={'number'}
            id="message"
            name="message"
            value={form.mobile}
            onChange={(e) => setform({ ...form, mobile: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full md:w-80">
        <div className="relative  capitalize">
          <label for="message" className="leading-7 text-sm text-white">
            password
          </label>
          <input
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setform({ ...form, password: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full">
                <button 
                  onClick={login}
                  className="flex mx-auto text-white bg-green-500 border-0 py-1 px-5 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white"/> : 'Login'}
                </button>
         </div>
         <p>Don't have an Account ? <Link to={'/signup'}><span className="text-blue-600">Sign up</span></Link></p>
    </div>
  );
};

export default Login;
