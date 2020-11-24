import React, { useState, useEffect } from "react";
import '../css/App_Profile.css';
import NavBar from "./NavBar"
import Security from "./Security"
import Profile from "./Profile"
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function ProfilePage() {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState({});

  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_BACKEND_URL + "users", {
  //     userId: currentUser.uid,
  //     name: name,
  //     email: email,
  //     gender: gender,
  //     age: age,
  //     knownLanguages: knownLanguages,
  //     targetLanguages: targetLanguages
  //   });
  // }, []);
  
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "users/" + currentUser.uid)
    .then((response) => {
      setUserDetails(response.data);
    });
  }, []);

  return (
    <div className="page" style={{width: "100%", marginTop: "0"}}>
      <NavBar/>
      <div className="body">
        <Profile userDetails={userDetails}/>
      </div>
    </div>
  );
}

export default ProfilePage;
