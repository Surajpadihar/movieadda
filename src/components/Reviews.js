import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewRef } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ColorRing, ThreeCircles } from "react-loader-spinner";
import swal from "sweetalert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Avatar, { genConfig } from "react-nice-avatar";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

function Reviews({ id, prevrating, userRated }) {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();

  const [rating, setrating] = useState(0);
  const [loading, setloading] = useState(false);
  const [Rloading, setRloading] = useState(false);
  const [form, setform] = useState("");
  const [data, setdata] = useState([]);
  const [added, setadded] = useState(0);

  const sendRevies = async () => {
    try {
      if (useAppstate.login) {
        setloading(true);
        await addDoc(reviewRef, {
          movieid: id,
          name: useAppstate.userName,
          rating: rating,
          thoughts: form,
          timestamp: new Date().getTime(),
        });

        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 1000,
        });

        const _doc = doc(db, "movies", id);

        await updateDoc(_doc, {
          ratingg: prevrating + rating,
          ratedd: userRated + 1,
        });

        setrating(0);
        setform("");
        setadded(added+1);
      } else {
        
        swal("you have to login to give reviews")
        navigate("/login");
      }
    } catch (error) {
      swal({
        title: "not added",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setloading(false);
  };
  useEffect(() => {
    async function getData() {
      setRloading(true);
      setdata([])
      let queryyy = query(reviewRef, where("movieid", "==", id));
      const querySnap = await getDocs(queryyy);

      querySnap.forEach((doc) => {
        setdata((prev) => [...prev, doc.data()]);
      });
      setRloading(false);
    }
    getData();
  }, [added]);
  return (
    <div className="mt-6 w-full border-t-2 border-gray-500">
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rating) => setrating(rating)}
      />
      <input
        value={form}
        onChange={(e) => setform(e.target.value)}
        className="w-full   bg-black pt-4 outline-none pb-4"
        placeholder="share your thoughts about this movie here......"
      />

      <button
        onClick={sendRevies}
        className="w-full mt-2 p-2 bg-blue-600 bb flex justify-center"
      >
        {loading ? (
          <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          "share"
        )}
      </button>
      {Rloading ? (
        <div className="mt-6 flex justify-center">
          {" "}
          <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />{" "}
        </div>
      ) : (
        <div className="mt-4 w-full testimonial-box">
          {data.map((e, i) => {
            return (
              <div className="mt-2  bg-white text-black p-4 " key={i}>
                <div class=" ">
                  {/* <!--img----> */}
                  <div class=" ">
                    <Avatar style={{ width: "4rem", height: "4rem" }} />
                  </div>
                  {/* <!--name-and-username--> */}
                  <div class="flex justify-between">
                    <strong>{e.name}</strong>
                    <span>
                      {new Date(e.timestamp).toLocaleString()}
                      <AccessTimeIcon className="ml-1" />
                    </span>
                  </div>
                </div>
                {/* <div className="flex bg-gray-900 p-2"> <p >{e.name}</p>
                     <p className="ml-4"> {new Date(e.timestamp).toLocaleString()}<AccessTimeIcon className="ml-1"/></p>
                    </div> */}
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <div class="client-comment">
                  <p>{e.thoughts}</p>
                </div>
                {/* <div className="flex ml-2 mt-2 p-2">{e.thoughts}</div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Reviews;
