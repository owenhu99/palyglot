import React from "react";
import "./Profile.css";
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

function Profile() {
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
                            <img className="profilePic" src="https://vignette.wikia.nocookie.net/emojimovie/images/5/56/Poop.png/revision/latest?cb=20170726175404"/>
                    </label>
                </div>
                <div className="profileInfo">
                    <h4>Name: JJ Kanu</h4>
                    <div className="profileInfo_bio">
                        <form noValidate autoComplete="off">
                            <TextField className="profileInfo_bioEntry" label="Bio" variant="outlined" multiline rows={3} rowsMax={3} size= "small" inputProps={{ maxLength: 200 }}/>
                        </form>
                        <Button variant="outlined" size="small">Save Changes</Button>
                    </div>
                    <div className="profileInfo_interests">
                        <form noValidate autoComplete="off">
                            <TextField className="profileInfo_interestsEntry" label="Interests" variant="outlined"  size= "small" inputProps={{ maxLength: 75 }}/>
                        </form>
                        <Button variant="outlined" size="small">Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;