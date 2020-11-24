import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import "../css/SidebarRoom.css";

function SidebarRoom(props) {

    const [name, setName] = React.useState("");
    const [imgLink, setImgLink] = React.useState("");

    useEffect(() => {
        getUserInfo();
    }, [])

    function getUserInfo() {
        axios.get(`http://localhost:5000/rooms/${props.room}`)
        .then((res) => {
            if (res.status === 200) {
                if (res.data.participants[0] !== props.userId) {
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
                throw "status code is not 200";
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
            <Avatar src={imgLink}/>
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
