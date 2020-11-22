import React from "react";
import "./Sidebar.css";
import {Avatar} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
import SidebarRoom from "./SidebarRoom"

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src = "https://vignette.wikia.nocookie.net/emojimovie/images/5/56/Poop.png/revision/latest?cb=20170726175404"/>
            </div>
            <div className= "sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined/> 
                    <input placeholder="Search for Pal" type="text"/>
                </div>
            </div>
            <div className="sidebar_rooms">
                <SidebarRoom/>
                <SidebarRoom/>
                <SidebarRoom/>
            </div>
        </div>
    );
}

export default Sidebar;
