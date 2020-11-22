import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarRoom.css";

function SidebarRoom() {
    return (
        <div className="sidebarRoom">
            <Avatar/>
            <div className="sidebarRoom_info">
                <h2>
                    Room Name
                </h2>
                <p>Last message sent</p>
            </div>
        </div>
    );
}

export default SidebarRoom;
