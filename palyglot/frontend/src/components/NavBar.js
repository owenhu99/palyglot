import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button, Toolbar } from "@material-ui/core";

/*import "NavBar.css";*/

function NavBar() {
    return (
        <div className="navBar" style={{ width: "100%"}}>
            <AppBar position="static" style={{ background: '#ffd85f', fontFamily: "Comfortaa"}}>
                <Toolbar variant="dense" style={{justifyContent: "space-between"}}>
                    <h2>palyglot</h2>
                    <div className="navBar_right">
                        <Button color="inherit" style={{fontFamily: "Comfortaa", marginRight: "10px" }}>Find a Pal</Button>
                        <Button color="inherit" style={{fontFamily: "Comfortaa", marginRight: "10px"  }}>My Pals</Button>
                        <Button color="inherit" style={{fontFamily: "Comfortaa", marginRight: "10px" }}>My Account</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
