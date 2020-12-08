import React from "react";
import "../css/Sidebar.css";
import { SearchOutlined } from "@material-ui/icons";
import SidebarRoom from "./SidebarRoom"

function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className="sidebar_rooms">
                {props.rooms.map((room, i) => {
                    return (
                        <SidebarRoom key={i} room={room} onChangeRoom={props.onChangeRoom}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Sidebar;
