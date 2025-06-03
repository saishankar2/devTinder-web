import React from 'react'

const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="px-2 pt-2">
        <img
          src={user.photoUrl}
          alt="DP"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        {user.age && user.gender && <p>{user.age + ", " + user.gender}</p>}
        <p className="break-words">{user.about}</p> {/* ✅ No max-height or overflow */}
        <div className="card-actions">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
