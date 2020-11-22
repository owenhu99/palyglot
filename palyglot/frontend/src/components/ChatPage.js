import React from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import '../css/App_Chat.css';

export default function ChatPage() {
    return (
        <div className="App">
            <NavBar></NavBar>
            <div className="body">
                <Sidebar></Sidebar>
                <Chat></Chat>
            </div>
        </div>
    );
}
