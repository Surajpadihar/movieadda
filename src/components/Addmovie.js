import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {addDoc} from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import swal from "sweetalert";
import { Appstate } from "../App";
import { Navigate, useNavigate } from "react-router-dom";

const Addmovie = () => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [form,setform] = useState({
        Name : "",
        year:"",
        description:"",
        image:"",
        ratedd:0,
        ratingg:0
    })
    const [loading,setloading] = useState(false);

    const addMovie = async()=>{
      setloading(true);
      try{
        if(useAppstate.login){
            await addDoc(movieRef,form);
        
            swal({
              title:"Successfully Added",
              icon:"success",
              buttons:false,
              timer : 3000
            })
            setform({
              Name : "",
              year:"",
              description:"",
              image:"",
              ratedd:0,
              ratingg:0
            })
            setloading(false)
          }else{
            navigate('/login')
          }
      }
      catch{
        swal({
          title:"not added",
          icon:"error",
          buttons:false,
          timer : 3000
        })
  
      }
      setloading(false)
    }

  return (
    <div>
      <section className=" body-font relative text-white">
        <div className="container px-5 py-9 mx-auto">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className=" ts sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.Name}
                    onChange={(e)=>setform({...form,Name:e.target.value})}
                    className="w-full bg-white   rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-white">
                    Year
                  </label>
                  <input
                    type="number"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e)=>setform({...form,year:e.target.value})}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-white">
                    image link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image}
                    onChange={(e)=>setform({...form,image:e.target.value})}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-white">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e)=>setform({...form,description:e.target.value})}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={addMovie} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white"/> : 'submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
