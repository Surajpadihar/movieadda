import React from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebase";
// import bcrypt from "bcrypt";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { userRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
const auth = getAuth(app);


const Signup = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [Otpsent, setOtpsent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const requestOtp = () => {
    setloading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpsent(true);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const verifyOTP = () => {
    try {
      setloading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setloading(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }
  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(userRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile
      });
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div className=" w-full flex flex-col justify-center items-center h-96">
      <h1 className="font-bold text-2xl">Sign up</h1>
      {Otpsent ? (
        <>
          <div className="p-2 w-full md:w-80 ">
            <div className="relative  capitalize">
              <label for="message" className="leading-7 text-sm text-white">
                OTP
              </label>
              <input
                id="message"
                name="message"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <button 
               onClick={verifyOTP}
               className="flex mx-auto text-white bg-green-500 border-0 py-1 px-5 focus:outline-none hover:bg-green-700 rounded ">
              {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="p-2 w-full md:w-80 ">
            <div className="relative  capitalize">
              <label for="message" className="leading-7 text-sm text-white">
                Name
              </label>
              <input
                type={"text"}
                id="message"
                name="message"
                value={form.name}
                onChange={(e) => setform({ ...form, name: e.target.value })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full md:w-80 ">
            <div className="relative  capitalize">
              <label for="message" className="leading-7 text-sm text-white">
                mobile number
              </label>
              <input
                type={"number"}
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
                type={'password'}
                id="message"
                name="message"
                value={form.password}
                onChange={(e) => setform({ ...form, password: e.target.value })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <button onClick={requestOtp} className="flex mx-auto text-white bg-green-500 border-0 py-1 px-5 focus:outline-none hover:bg-green-700 rounded text-lg">
              {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
            </button>
          </div>
        </>
      )}
      <p>
        Already have an Account ?{" "}
        <Link to={"/login"}>
          <span className="text-blue-600">Login</span>
        </Link>
      </p>
      <div id="recaptcha-container">

      </div>
     </div>
  );
};

export default Signup;
