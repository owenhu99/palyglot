import React, { useState } from "react";import "../css/Profile.css";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useAuth } from '../contexts/AuthContext';
const axios = require('axios').default;

function Profile(props) {
    const { currentUser } = useAuth();
    const [interests, setInterests] = useState(props.userDetails.interests);
    const [bio, setBio] = useState(props.userDetails.bio);
    
    function handleBioChange(e){
         e.preventDefault();
         setBio(e.target.value);
     }

     function handleInterestsChange(e){
         e.preventDefault();
         setInterests(e.target.value);
     }

    function submitBioChange() {
        currentUser.getIdToken(true).then((idToken) => {
            axios.put("http://localhost:5000/users/me", {bio: bio}, {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    function submitInterestsChange() {
        currentUser.getIdToken(true).then((idToken) => {
            axios.put("http://localhost:5000/users/me", {interests: interests}, {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="profile">
            <div className="profile_header">
                <h2>My Profile</h2>
            </div>
            <Divider variant="middle" orientation="horizontal"/>
            <div className="profileBody">
                <Grid className="achievementsBody_grid" container spacing={3}>
                    <Grid item xs={5}>
                        <div className="profilePicContainer">
                            <input accept="image/*" id="enterNewPic" type="file" />
                            <label htmlFor="enterNewPic">
                                    <img 
                                        className="profilePic" 
                                        src={props.userDetails.profilePicture}
                                        alt=""/>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container direction="column">
                            <div className="profileInfo">
                                <Grid item>
                                <h4>{props.userDetails.name}</h4>
                                </Grid>
                                <Grid item>
                                <div className="profileInfo_bio">
                                    <form noValidate autoComplete="off">
                                        <TextField 
                                            className="profileInfo_bioEntry" 
                                            label="Bio" defaultValue={props.userDetails.bio} 
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }} 
                                            multiline 
                                            rows={3} 
                                            rowsMax={3} 
                                            size= "small" 
                                            inputProps={{ maxLength: 200 }}
                                            value={bio}
                                            onChange={handleBioChange}/>
                                        <Button 
                                            variant="contained"
                                            color="primary" 
                                            onClick={submitBioChange}
                                            size="small">
                                                Save Changes
                                        </Button>
                                    </form>
                                </div>
                                </Grid>
                                <Grid item>
                                <div className="profileInfo_interests">
                                    <form noValidate autoComplete="off">
                                        <TextField 
                                            className="profileInfo_interestsEntry" 
                                            InputLabelProps={{
                                                shrink: true,
                                            }} 
                                            label="Interests" 
                                            variant="outlined"  
                                            size= "small" 
                                            inputProps={{ maxLength: 75 }}
                                            defaultValue={props.userDetails.interests}
                                            value={interests}
                                            onChange={handleInterestsChange}/>
                                        <Button 
                                            variant="contained"
                                            color="primary" 
                                            onClick={submitInterestsChange}
                                            size="small">
                                                Save Changes
                                        </Button>
                                    </form>
                                </div>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Profile;