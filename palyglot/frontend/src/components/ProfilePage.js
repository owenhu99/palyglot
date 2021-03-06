import React, { useState, useEffect } from "react";
import '../css/ProfilePage.css';
import NavBar from "./NavBar"
import Profile from "./Profile"
import Achievements from "./Achievements"
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.pushState('/login');
    } catch {
      console.log('Failed to log out.');
    }
  }
  
  useEffect(() => {
    currentUser.getIdToken(true).then((idToken) => {
      axios.get("http://localhost:5000/users/me", {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      })
      .then((response) => {
        setUserDetails(response.data);
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
        <Achievements userDetails={userDetails}/>
        <div className="logOut">
          <Button 
            variant="contained"
            color="primary" 
            size="large"
            style={{transform: "scale(1.3)"}}
            component={Link} to={''}
            onClick={handleLogout}>
              Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
