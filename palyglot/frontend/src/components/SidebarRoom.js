import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import "../css/SidebarRoom.css";

function SidebarRoom(props) {

    const { currentUser } = useAuth();
    const [name, setName] = React.useState("");
    const [imgLink, setImgLink] = React.useState("");

    useEffect(() => {
        getUserInfo();
    }, [])

    function getUserInfo() {
        /* Get info about the user this user is talking to in the current room */
        currentUser.getIdToken(true).then((idToken) => {
            axios.get(`https://backendcsc301.ue.r.appspot.com/rooms/${props.room}`, {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            })
            .then((res) => {
                setName(res.data.user.name);
                setImgLink(res.data.user.profilePicture);
            })
            .catch((err) => {
                console.log(err);
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    function handleClick() {
        props.onChangeRoom(props.room);
    }
    return (
        <div className="sidebarRoom" onClick={handleClick}>
            <Avatar src={imgLink} />
            <div className="sidebarRoom_info">
                <h2>
                    {name}
                </h2>
                {/* <p>Last message sent</p> */}
            </div>
        </div>
    );
}

export default SidebarRoom;
