import React, { useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import '../css/App_Chat.css';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function ChatPage() {

    const { currentUser } = useAuth();
    console.log(currentUser);
    const [currentRoom, setCurrentRoom] = React.useState({});
    const [rooms, setRooms] = React.useState([]);
    const [messages, setMessages] = React.useState([]);

    /* Get all of the user's conversations, set the focused conversation to the
     * latest conversation, and get the past messages for that conversation.
     */
    useEffect(() => {
        axios.get("GET_ROOMS")
            .then(res => {
                setRooms(res.data);
            })
            .then(() => {
                setCurrentRoom(rooms[0]);
            })
            .then(() => {
                axios.get("GET_ROOM_MESSAGE")
                    .then(res => {
                        setMessages(res.data);
                    })
            })
    }, [rooms]);

    function changeRoom(roomId) {
        getRoomMessages(roomId);
        setCurrentRoom(roomId);
    }

    function getRoomMessages(roomId) {
        axios.get("GET_ROOM_MESSAGE")
            .then(res => {
                setMessages(res.data);
            })
    }

    return (
        <div className="App">
            <NavBar></NavBar>
            <div className="body">
                <Sidebar rooms={rooms} currentRoom={currentRoom}
                    onChangeRoom={changeRoom}>
                </Sidebar>
                <Chat room={currentRoom} messages={messages}></Chat>
            </div>
        </div>
    );
}
