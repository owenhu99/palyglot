import React, { useState, useEffect } from "react";
import '../css/ProfilePage.css';
import NavBar from "./NavBar"
import Security from "./Security"
import Profile from "./Profile"
import Achievements from "./Achievements"
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
    currentUser.getIdToken(true).then((idToken) => {
      axios.get("http://127.0.0.1:5000/users/me", {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      })
      .then((response) => {
        setUserDetails(response.data);
        //console.log(currentUser.getIdToken());
      });
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div className="page" style={{width: "100%", marginTop: "0"}}>
      <NavBar/>
      <div className="pageBody" >
        <Profile userDetails={userDetails}/>
        <Achievements />
        <div className="logOut">
          <Button 
            variant="contained"
            color="primary" 
            size="large"
            component={Link} to={''}>
              Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
