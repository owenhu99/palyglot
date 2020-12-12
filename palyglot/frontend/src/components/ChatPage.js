import React, { useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import '../css/ChatPage.css';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Pusher from 'pusher-js';

export default function ChatPage() {

    const { currentUser } = useAuth();
    const [currentRoom, setCurrentRoom] = React.useState("-1");
    const [rooms, setRooms] = React.useState([]);
    const [messages, setMessages] = React.useState([]);

    /* Get all of the user's conversations, set the focused conversation to the
     * latest conversation, and get the past messages for that conversation.
     */
    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        /* Use Pusher to watch the database for changes in messages. When an
         * update occurs, check if the message was added to the current room.
         * If it was, add the message and re-render the chat page.
         */
        const pusher = new Pusher('a4e914a09d88628d31df', {
            cluster: 'us2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('updated', function (data) {
            if (data.id === currentRoom) {
                if (Array.isArray(data.message)) {
                    setMessages([...messages, data.message[0]]);
                } else {
                    setMessages([...messages, data.message]);
                }
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            channel.disconnect();
        }

    }, [messages, currentRoom]);

    function fetchData() {
        /* Fetch the rooms that the user is in. Place "focus" on the first room
         * and retrieve the messages for that room.
         */
        currentUser.getIdToken(true).then((idToken) => {
            axios.get(`https://palyglot-backend.herokuapp.com/users/me`, {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            })
            .then(res => {
                setRooms(res.data.rooms);
                if (res.data.rooms.length > 0) {
                    setCurrentRoom(res.data.rooms[0]);
                }
                if (res.data.rooms[0] !== "-1") {
                    axios.get(`https://palyglot-backend.herokuapp.com/messages?roomId=${res.data.rooms[0]}`, {
                        headers: {
                            'Authorization': `Bearer ${idToken}`
                        }
                    })
                    .then(res => {
                        setMessages(res.data);
                    })
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    function changeRoom(roomId) {
        /* update the current room and get the messages for the new room*/
        getRoomMessages(roomId);
        setCurrentRoom(roomId);
    }

    function getRoomMessages(roomId) {
        currentUser.getIdToken(true).then((idToken) => {
            axios.get(`https://palyglot-backend.herokuapp.com/messages?roomId=${roomId}`, {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            })
            .then(res => {
                setMessages(res.data);
            })  
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="chatPage">
            <NavBar></NavBar>
            <div className="chatPageBody" style={{ flexDirection: "row"}}>
                <Sidebar rooms={rooms} currentRoom={currentRoom}
                    onChangeRoom={changeRoom}
                >
                </Sidebar>
                <Chat room={currentRoom} messages={messages}></Chat>
            </div>
        </div>
    );
}
