import React, { useState } from 'react';
import UserCard from './userCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async()=>{
    setError("");
    try{
       const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName, lastName, photoUrl, age, gender, about
       }, {withCredentials: true});
       dispatch(addUser(res.data.data));
       setShowToast(true);
       const i = setTimeout(()=>{
         setShowToast(false);
       }, 3000)
    }
    catch(err){
        setError(err.response.data);
    }
  }

  return (
  <div className="w-full flex justify-center px-4">
  <div className="flex flex-col lg:flex-row justify-center items-start gap-10 mt-10 w-full max-w-7xl">
    {/* Left side - Edit Profile Form */}
    <div className="w-full lg:w-2/3 xl:w-3/5 px-4">
      <div className="card bg-base-300 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <div className="space-y-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="Please enter your first name"
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Please enter your last name"
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                placeholder="Please enter your age"
                className="input input-bordered w-full"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea
                type="text"
                value={about}
                placeholder="Please enter your about"
                className="textarea textarea-bordered"
                maxLength={200}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                placeholder="Please enter your gender"
                className="input input-bordered w-full"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Photo</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                placeholder="Please enter your photo URL"
                className="input input-bordered w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500 mt-2">{error}</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" onClick={saveProfile}>Save Details</button>
          </div>
        </div>
      </div>
      
    </div>
    <div className="w-full lg:w-1/3 xl:w-2/5 px-4 mx-auto lg:mx-0 max-w-md">
      <UserCard
        user={{
          firstName,
          lastName,
          age,
          about,
          gender,
          photoUrl,
        }}
      />
    </div>
  </div>
  {showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>}
</div>

  );
};

export default EditProfile;
