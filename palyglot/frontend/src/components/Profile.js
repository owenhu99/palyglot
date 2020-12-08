import React, { useState } from "react";import "../css/Profile.css";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
                <Grid className="profileBody_grid" container spacing={3}>
                    <Grid item xs={5}>
                        <Paper style={{backgroundColor:"inherit"}}>
                            <div className="profilePicContainer">
                                <input accept="image/*" id="enterNewPic" type="file" />
                                <label htmlFor="enterNewPic">
                                        <img 
                                            className="profilePic" 
                                            src={props.userDetails.profilePicture}
                                            alt=""/>
                                </label>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid 
                            container 
                            spacing={4} 
                            direction="column" 
                            border="1px solid black" 
                            style={{padding: "25px", paddingRight:"8%"}}>
                            <div className="profileInfo">
                                <Grid item style={{paddingBottom:"2%"}}>
                                    <h3 style={{fontFamily: "Comfortaa, cursive", textTransform:"uppercase"}}>
                                        {props.userDetails.name}
                                    </h3>
                                </Grid>
                                <Grid item style={{paddingBottom:"4%"}}>
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
                                            fullWidth 
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
                                <Grid item style={{paddingBottom:"2%"}}>
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
                                            fullWidth
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