import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import axios from "axios";
import "../css/Chat.css";

// function Chat({message}) {
function Chat(props) {

    const [input, setInput] = React.useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("ROUTE_HERE", {

        })
        setInput("");
    }

    //     <p className="chat_message">
    // <span className="chat_name">Owen{/*message.name*/}</span>
    //     Comment tu di sa "Pizza Parlour" en Francais? {/*message.message*/}
    // <span className="chat_timestamp">{new Date().toUTCString()} {/*message.timestamp*/} </span>
    // </p>
    // <p className="chat_message chat_receiver">
    // <span className="chat_name">JJ</span>
    // Pardon, Owen. Ma Francais c'est tres mauvais.
    // <span className="chat_timestamp">{new Date().toUTCString()}</span>
    // </p>

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>{props.room.name}</h3>
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
                {props.messages.map((message) => {
                    <p className={`chat_message ${message.from !== "USER_ID" && "chat_receiver"}`}
                    >
                        <span className="chat_name">
                            {message.from}
                        </span>
                        {message.message}
                        <span className="chat_timestamp">
                            {message.date}
                        </span>
                    </p>
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
