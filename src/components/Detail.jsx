import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
// import { movieRef } from '../firebase/firebase'
import {ColorRing} from "react-loader-spinner";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Reviews from "./Reviews";

const Detail = () => {
  const { id } = useParams();
  const [data, setdata] = useState({
    Name: "",
    year: "",
    image: "",
    description: "",
    ratingg:0,
    ratedd:0,
  });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    async function getData() {
      setloading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);

      setdata(_data.data());
      setloading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
      {loading ? (
        <div className="flex justify-center items-center h-96">
           
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <img
            className="static md:sticky top-24 h-96"
            src={data.image}
            alt=""
          />
          <div className="md:ml-6 ml-0 w-full md:w-1/2">
            <h1 className="mb-2 text-3xl font-bold text-gray-400">
              {data.Name} <span className="text-xl">{data.year}</span>
            </h1>

            <ReactStars size={20} half={true} value={data.ratingg/data.ratedd} edit={false} />

            <p className="mt-3">{data.description}</p>
            <Reviews id={id} prevrating={data.ratingg} userRated = {data.ratedd}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
