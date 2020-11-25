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
        axios.get(`http://localhost:5000/rooms/${props.room}`)
            .then((res) => {
                if (res.status === 200) {
                    // there are two participants in a room. Check which userId
                    // does not belong to the current user and get the information
                    // tied to that userId.
                    let p1 = res.data.participants[0];
                    if (p1 !== currentUser.uid) {
                        axios.get(`http://localhost:5000/users/${res.data.participants[0]}`)
                            .then((res) => {
                                setName(res.data.name);
                                setImgLink(res.data.profilePicture);
                            })
                    } else {
                        axios.get(`http://localhost:5000/users/${res.data.participants[1]}`)
                            .then((res) => {
                                setName(res.data.name);
                                setImgLink(res.data.profilePicture);
                            })
                    }
                } else {
                    throw new Error("status code is not 200");
                }
            })
            .catch((err) => {
                console.log(err);
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
