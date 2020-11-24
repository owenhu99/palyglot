import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button, Toolbar } from "@material-ui/core";
import { Link } from 'react-router-dom';

import "../css/NavBar.css";

function NavBar() {
    return (
        <div className="navBar" style={{ width: "100%" }}>
            <AppBar position="static" style={{ background: '#ffd85f', fontFamily: "Comfortaa" }}>
                <Toolbar variant="dense" style={{ justifyContent: "space-between" }}>
                    <h2 className="whiteText">palyglot</h2>
                    <div className="navBar_right">
                        <Button component={Link} to={'/matchmaker'} color="inherit" style={{fontFamily: "Comfortaa", marginRight: "10px", color: "white" }}>Find a Pal</Button>
                        <Button component={Link} to={'/chat'} color="inherit" style={{fontFamily: "Comfortaa", marginRight: "10px", color: "white"  }}>My Pals</Button>
                        <Button component={Link} to={'/profile'} color="inherit" style={{fontFamily: "Comfortaa", marginRight: "10px", color: "white" }}>My Account</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
