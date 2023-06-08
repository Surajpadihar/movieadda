import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ColorRing, ThreeCircles, ThreeDots } from "react-loader-spinner";
import { getDoc, getDocs } from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getData() {
      setloading(true);

      const _data = await getDocs(movieRef);
      console.log(_data);
      _data.forEach((doc) => {
        setdata((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setloading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          {" "}
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />{" "}
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link key={i} to={`/Detail/${e.id}`}>
              {" "}
              <div className="   ts  bg-gray-900 shadow-lg px-2 hover:-translate-y-2 transition-all duration-500 mt-4">
                <img
                  className="h-60 md:h-80 w-36 md:w-56 "
                  src={e.image}
                  alt=""
                />
                <h1>
                  <span className="text-blue-500"> Name : </span>
                  {e.Name}
                </h1>
                <h1 className="flex items-center">
                  {" "}
                  <span className="text-blue-500 mr-2"> Rating : </span>{" "}
                  <ReactStars
                    size={20}
                    half={true}
                    value={e.ratingg / e.ratedd}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-blue-500"> Year : </span> {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}

      {/* <div className='bg-gray-700 shadow-lg p-2 hover:-translate-y-2'>
         <img className='h-72' src="https://cdn.shopify.com/s/files/1/0969/9128/products/1917_-_Sam_Mendes_-_Hollywood_War_Film_Classic_English_Movie_Poster_9ef86295-4756-4c71-bb4e-20745c5fbc1a_large.jpg?v=1582781084" alt="" />
         <h1><span className='text-blue-500'> Name : </span>The Avengers Endgame</h1>
         <h1>Rating : 5</h1>
         <h1>Year : 2019</h1>
     </div> */}
    </div>
  );
};

export default Cards;
