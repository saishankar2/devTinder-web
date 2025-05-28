import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("ravi@gmail.com");
  const [password, setPassword] = useState("Ravi@123");
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
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center my-40">
      <div className="card card-side bg-base-100 shadow-xl  w-full max-w-md md:max-w-2xl lg:max-w-3xl h-auto">
        <div className="card-body">
          <h2 className="card-title">Login to DevTinder🧑‍💻</h2>
          <div>
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
                type="text"
                value={password}
                placeholder="Please enter your password"
                className="input input-bordered w-full max-w-full"
                onChange={(password)=>setPassword(password.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-end m-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
