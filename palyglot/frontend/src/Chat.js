import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import {SendIcon } from "@material-ui/icons/Send";
import React from "react";
import "./Chat.css";

function Chat() {
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className = "chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                <p className="chat_message">
                    <span className="chat_name">Owen</span>
                    Comment tu di sa "Pizza Parlour" en Francais?
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">JJ</span>
                    Pardon, Owen. Ma Francais c'est tres mauvais.
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
            </div>
            <div className="chat_input">
                <IconButton><InsertEmoticon/></IconButton>
                <form>
                    <input placeholder="écrire un message" type="text"/>
                    <button type="submit">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
