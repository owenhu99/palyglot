import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect } from "react";
import axios from "axios";
import "../css/Chat.css";

// function Chat({message}) {
function Chat(props) {

    const { currentUser } = useAuth();
    const [input, setInput] = React.useState("");
    const [sender, setSender] = React.useState("");
    const [receiver, setReceiver] = React.useState("");
    const [senderName, setSenderName] = React.useState("");
    const [receiverName, setReceiverName] = React.useState("");

    useEffect(() => {
        if (props.room !== "-1") {
            axios.get(`http://localhost:5000/rooms/${props.room}`)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data.participants[0] === currentUser.uid) {
                            setSender(res.data.participants[0]);
                            setReceiver(res.data.participants[1]);
                            setParticipantNames(res.data.participants[0],
                                res.data.participants[1]);
                        } else {
                            setSender(res.data.participants[1]);
                            setReceiver(res.data.participants[0]);
                            setParticipantNames(res.data.participants[1],
                                res.data.participants[0]);
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    })

    function setParticipantNames(sender, receiver) {
        axios.get(`http://localhost:5000/users/${sender}`)
        .then((res) => {
            setSenderName(res.data.name);
        })
        axios.get(`http://localhost:5000/users/${receiver}`)
        .then((res) => {
            setReceiverName(res.data.name);
        })
    }

    function getParticipantName(id) {
        if (id === sender) {
            return senderName;
        } 
        return receiverName;
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios({
            method: 'post',
            url: `http://localhost:5000/messages`,
            headers: {},
            data: {
                text: input,
                from: sender,
                to: receiver,
                roomId: props.room
            }
        })
        setInput("");
    }

    if (props.room === "-1") {
        return (
            <div className="chat">
                <div className="chat_header">
                    <Avatar />
                    <div className="chat_headerInfo">
                        <h3>Nobody</h3>
                    </div>
                    <div className="chat_headerRight">
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                    </div>
                </div>
                <div className="chat_body">
                    <p>You do not have any conversations</p>
                </div>
                <div className="chat_input">
                    <IconButton><InsertEmoticon /></IconButton>
                    <form>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="écrire un message"
                            type="text" />
                        <button onClick={sendMessage} type="submit">
                            Send Message
                    </button>
                    </form>
                </div>
            </div>
        );
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {props.messages.map((message, i) => {
                    return (
                        <p key={i} className={`chat_message ${message.from === currentUser.uid && "chat_receiver"}`}
                        >
                            <span className="chat_name">
                                {getParticipantName(message.from)}
                            </span>
                            {message.text}
                            <span className="chat_timestamp">
                                {message.date}
                            </span>
                        </p>
                    )
                })}
            </div>
            <div className="chat_input">
                <IconButton><InsertEmoticon /></IconButton>
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="écrire un message"
                        type="text" />
                    <button onClick={sendMessage} type="submit">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
