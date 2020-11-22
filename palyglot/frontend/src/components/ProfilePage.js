import React from "react";
import '../css/App_Profile.css';
import '../index.css';
import NavBar from "./NavBar"
import Security from "./Security"
import Profile from "./Profile"

function ProfilePage() {
  return (
    <div className="page" style={{width: "100%", marginTop: "0"}}>
      <NavBar/>
      <div className="body">
        <Profile />
        <Security />
      </div>
    </div>
  );
}

export default ProfilePage;
