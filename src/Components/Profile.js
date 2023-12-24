import React, { useState, useEffect } from "react";
import "../Styles/profile.css";
import ProfileSVG from "../Assets/user-1-svgrepo-com.svg";

const Profile = ({userDetails,setUserDetails}) => {

    useEffect(() => {
        // Fetch user details from local storage when the component mounts
        const storedUser = JSON.parse(localStorage.getItem('user Data'));
        if (storedUser) {
          setUserDetails(storedUser);
        }
      }, []);

    const handleLogout = () => {
        // Clear user data from local storage on logout
        localStorage.removeItem('user Data');
        window.location.href = '/';
      };

  return (
    <div className="main">
      <div className="design">
        <div className="triangle-design"></div>
      </div>
      <h1>Signup Successful!</h1>
      <div className="form">
        <h1>Profile</h1>
        <img src={ProfileSVG} alt="Profile Image" />
        <div className="details">
          <p>User ID: {userDetails.id}</p>
          <p>Full Name: {userDetails.firstName + " " + userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Profile;
