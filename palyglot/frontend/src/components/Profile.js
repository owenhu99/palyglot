import React, { useState } from "react";import "../css/Profile.css";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
const axios = require('axios').default;

function Profile(props) {
    const [bio, setBio] = useState(props.userDetails.bio);
    const [interests, setInterests] = useState(props.userDetails.interests);

     function handleBioChange(e){
         e.preventDefault();
         setBio(e.target.value);
     }

     function handleInterestsChange(e){
         e.preventDefault();
         setInterests(e.target.value);
     }

    function submitBioChange() {
        axios.put(process.env.REACT_APP_BACKEND_URL + "users/" + props.userDetails.userId, {bio: bio});
    }

    function submitInterestsChange() {
        axios.put(process.env.REACT_APP_BACKEND_URL + "users/" + props.userDetails.userId, {interests: interests});
    }

    return (
        <div className="profile">
            <div className="profile_header">
                <h2>My Profile</h2>
            </div>
            <Divider variant="middle" orientation="horizontal"/>
            <div className="profileBody">
                <div className="profilePicContainer">
                    <input accept="image/*" id="enterNewPic" type="file" />
                    <label htmlFor="enterNewPic">
                            <img 
                                className="profilePic" 
                                src={props.userDetails.profilePicture}
                                alt=""/>
                    </label>
                </div>
                <div className="profileInfo">
                    <h4>{props.userDetails.name}</h4>
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
                                variant="outlined"
                                onClick={submitBioChange} 
                                size="small">Save Changes</Button>
                        </form>
                    </div>
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
                                variant="outlined" 
                                onClick={submitInterestsChange}
                                size="small">
                                    Save Changes
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;