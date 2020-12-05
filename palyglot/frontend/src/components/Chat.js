import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect } from "react";
import axios from "axios";
import "../css/Chat.css";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const lookup = require('safe-browse-url-lookup')({ apiKey: 'AIzaSyCnqThoiLedqZesnVf0KFQRHCbbcvNuWvQ' });

// function Chat({message}) {
function Chat(props) {

    const { currentUser } = useAuth();
    const [input, setInput] = React.useState("");
    const [sender, setSender] = React.useState("");
    const [receiver, setReceiver] = React.useState("");
    const [senderName, setSenderName] = React.useState("");
    const [receiverName, setReceiverName] = React.useState("");
    const [imgLink, setImgLink] = React.useState("");
    const [useUppercaseAccents, setUseUppercaseAccents] = React.useState(false);

    const lowercaseAccents = ["é", "è", "ê", "ë", "à", "â", "æ", "ë", "ù", "û", "ü", "ç", "ï", "î", "ô", "ÿ"];
    const uppercaseAccents = ["É", "È", "Ê", "Ë", "À", "Â", "Æ", "Ë", "Ù", "Û", "Ü", "Ç", "Ï", "Î", "Ô", "Ÿ"];
    const hyperlinkRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;

    const StyledButton = withStyles({
        label: {
          textTransform: 'none',
        },
      })(Button);
    
    useEffect(() => {
        if (props.room !== "-1") {
            axios.get(`https://palyglot-backend.herokuapp.com/rooms/${props.room}`)
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
        /* set the names for the sender (the current user) and the receiver
         * (the user that the current user is talking to). 
         */
        axios.get(`https://palyglot-backend.herokuapp.com/users/${sender}`)
            .then((res) => {
                setSenderName(res.data.name);
            })
        axios.get(`https://palyglot-backend.herokuapp.com/users/${receiver}`)
            .then((res) => {
                setReceiverName(res.data.name);
                setImgLink(res.data.profilePicture);
            })
    }

    function getParticipantName(id) {
        if (id === sender) {
            return senderName;
        }
        return receiverName;
    }

    const checkMessagesNotMalicious = () => {
        var matches = input.match(hyperlinkRegex);

        if (matches == null) {
            return true;
        }

        lookup.checkMulti(matches)
        .then(urlMap => {
            for (let url in urlMap) {
                if (urlMap[url]) {
                    return false;
                }
            }
        })
        .catch(err => {
            return true;
        });

        return true;
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        if (checkMessagesNotMalicious()) {
            if (input.replace(/\s/g, '').length) {
                await axios({
                    method: 'post',
                    url: `https://palyglot-backend.herokuapp.com/messages`,
                    headers: {},
                    data: {
                        text: input,
                        from: sender,
                        to: receiver,
                        roomId: props.room
                    }
                });
            }
        }

        setInput("");
    }

    // check if the user currently does not have any active conversations.
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
                            type="text"
                            disabled />
                        <button onClick={sendMessage} type="submit">
                            Send Message
                    </button>
                    </form>
                </div>
            </div>
        );
    }
    // else, render the messages for the current room.
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={imgLink} />
                <div className="chat_headerInfo">
                    <h3>{receiverName}</h3>
                    {/* <p>Last seen at...</p> */}
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
            <div className="accent_keyboard">
                <Button onClick={() => setUseUppercaseAccents(!useUppercaseAccents)}>↑↓</Button>
                {lowercaseAccents.map((accent, i) => {
                    if (useUppercaseAccents) {
                        return (
                            <StyledButton className="accent_button" onClick={() => setInput(input + uppercaseAccents[i])}>{uppercaseAccents[i]}</StyledButton>
                        )
                    }

                    return (
                        <StyledButton className="accent_button" onClick={() => setInput(input + lowercaseAccents[i])}>{lowercaseAccents[i]}</StyledButton>
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
