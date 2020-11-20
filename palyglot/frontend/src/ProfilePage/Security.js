import React from "react";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Security.css";

function Security() {
    return (
        <div className="security">
            <div className="security_header">
                <h2>Security Settings</h2>
            </div>
            <Divider variant="middle"/>
            <div className="security_emailContainer">
                <form className = "security_email" noValidate autoComplete="off">
                    <TextField id="email-address" label="Email" variant="outlined" size="small"/>
                    <Button variant="outlined" size="small" stlye={{backgroundColor: "#ffd85f"}}>
                        Change Email
                    </Button>
                </form>
            </div>
            <div className="security_passwordContainer">
                <form className = "security_password" noValidate autoComplete="off">
                    <TextField id="password" label="Password" variant="outlined" size="small" type="password"/>
                    <Button variant="outlined" size="small" color="#ffd85f">
                        Change Password
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Security;