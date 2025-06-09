import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try{
       const res = await axios.post(BASE_URL+"/login", {
      emailId,
      password
    }, {withCredentials: true}) // To let the backend know that this is whitelisted
     dispatch(addUser(res.data));
     return navigate("/");
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong")
      console.log(err.message);
    }
  };

  const handleSignup = async ()=>{
    try{
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
      dispatch(addUser(res.data.data));
      navigate("/profile");
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong")
      console.log(err.message);
    }
  }

  return (
    <div className="flex justify-center my-40">
      <div className="card card-side bg-base-100 shadow-xl  w-full max-w-md md:max-w-2xl lg:max-w-3xl h-auto">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm? "Login to DevTinder🧑‍💻" : "Signup to DevTinder🧑‍💻" } </h2>
          <div>
             {!isLoginForm && <><label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value = {firstName}
                placeholder="Please enter your First Name"
                className="input input-bordered w-full max-w-full"
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Please enter your Last Name"
                className="input input-bordered w-full max-w-full"
                onChange={(e)=>setLastName(e.target.value)}
              />
            </label></>}
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value = {emailId}
                placeholder="Please enter your email"
                className="input input-bordered w-full max-w-full"
                onChange={(emailId)=>setEmailId(emailId.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Please enter your password"
                className="input input-bordered w-full max-w-full"
                onChange={(password)=>setPassword(password.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end m-2">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin: handleSignup}>{isLoginForm? "Login" : "Signup"}</button>
          </div>
          <p className="m-auto cursor-pointer py-2 text-blue-400" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm ? "New User? Sign up here": "Existing User? Login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
