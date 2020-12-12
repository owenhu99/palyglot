import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import {InsertEmoticon} from "@material-ui/icons";
import SettingsIcon from '@material-ui/icons/Settings';
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useRef } from "react";
import axios from "axios";
import Moment from 'react-moment';
import "../css/Chat.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openSettingsDialog, setOpenSettingsDialog] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState("");
    const [targetLanguage, setTargetLanguage] = React.useState("en");

    const lowercaseAccents = ["é", "è", "ê", "ë", "à", "â", "æ", "ë", "ù", "û", "ü", "ç", "ï", "î", "ô", "ÿ"];
    const uppercaseAccents = ["É", "È", "Ê", "Ë", "À", "Â", "Æ", "Ë", "Ù", "Û", "Ü", "Ç", "Ï", "Î", "Ô", "Ÿ"];
    const hyperlinkRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;

    const StyledButton = withStyles({
        label: {
          textTransform: 'none',
        },
      })(Button);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }) 
        }
    }

    useEffect(scrollToBottom, [props.messages]);
    
    useEffect(() => {
        if (props.room !== "-1") {
            currentUser.getIdToken(true).then((idToken) => {
                axios.get(`https://palyglot-backend.herokuapp.com/${props.room}`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        setSender(currentUser.uid);
                        setSenderName(currentUser.displayName);
                        setReceiver(res.data.user.userId);
                        setReceiverName(res.data.user.name);
                        setImgLink(res.data.user.profilePicture);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [props.room])

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
        currentUser.getIdToken(true).then(async (idToken) => {
            if (checkMessagesNotMalicious() && input.replace(/\s/g, '').length) {
                await axios({
                    method: 'post',
                    url: `https://palyglot-backend.herokuapp.com/messages`,
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    },
                    data: {
                        text: input,
                        from: sender,
                        to: receiver,
                        roomId: props.room
                    }
                });
            }
        }).catch((error) => {
            console.log(error);
        })
        setInput("");
    }

    const translateMessage = async (msg) => {
        axios.post("https://palyglot-backend.herokuapp.com/translate", {msg: msg, target: targetLanguage})
        .then((res) => {
            setDialogMessage(res.data.msg);
            setOpenDialog(true);
        }).catch((err)=>{
            setDialogMessage("Sorry, unable to translate message.");
            setOpenDialog(true);
        });
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleSettingsDialogClose = () => {
        setOpenSettingsDialog(false);
    }

    const handleTargetLanguageChange = (e) => {
        setTargetLanguage(e.target.value);
    }

    // check if the user currently does not have any active conversations.
    if (props.room === "-1") {
        return (
            <div className="chat">
                <Dialog open={openSettingsDialog} onClose={handleSettingsDialogClose}>
                    <DialogTitle id="simple-dialog-title">Settings</DialogTitle>
                    <Select
                        value={targetLanguage}
                        onChange={handleTargetLanguageChange}
                    >
                        <MenuItem value={"en"}>English</MenuItem>
                        <MenuItem value={"fr"}>French</MenuItem>
                        <MenuItem value={"es"}>Spanish</MenuItem>
                        <MenuItem value={"it"}>Italian</MenuItem>
                        <MenuItem value={"nl"}>Dutch</MenuItem>
                        <MenuItem value={"no"}>Norwegian</MenuItem>
                        <MenuItem value={"pt"}>Portugese</MenuItem>
                        <MenuItem value={"sv"}>Swedish</MenuItem>
                        <MenuItem value={"zh-cn"}>Mandarin</MenuItem>
                    </Select>
                </Dialog>
                <div className="chat_header">
                    <Avatar />
                    <div className="chat_headerInfo">
                        <h3>Nobody</h3>
                    </div>
                    <div className="chat_headerRight">
                        <IconButton>
                            <SettingsIcon onClick={() => setOpenSettingsDialog(true)} />
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
                            placeholder="Write a message"
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
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle id="simple-dialog-title">Translation</DialogTitle>
                <p className="translation">{dialogMessage}</p>
            </Dialog>
            <Dialog open={openSettingsDialog} onClose={handleSettingsDialogClose}>
                <DialogTitle id="simple-dialog-title">Language Select</DialogTitle>
                <div className="languageSelect">
                    <Select
                        value={targetLanguage}
                        onChange={handleTargetLanguageChange}
                    >
                        <MenuItem value={"en"}>English</MenuItem>
                        <MenuItem value={"fr"}>French</MenuItem>
                        <MenuItem value={"es"}>Spanish</MenuItem>
                        <MenuItem value={"it"}>Italian</MenuItem>
                        <MenuItem value={"nl"}>Dutch</MenuItem>
                        <MenuItem value={"no"}>Norwegian</MenuItem>
                        <MenuItem value={"pt"}>Portugese</MenuItem>
                        <MenuItem value={"sv"}>Swedish</MenuItem>
                        <MenuItem value={"zh-cn"}>Mandarin</MenuItem>
                    </Select>
                </div>
            </Dialog>
            <div className="chat_header">
                <Avatar src={imgLink} />
                <div className="chat_headerInfo">
                    <h3>{receiverName}</h3>
                    {/* <p>Last seen at...</p> */}
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SettingsIcon onClick={() => setOpenSettingsDialog(true)} />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {props.messages.map((message, i) => {
                    
                    return (
                        <Tooltip title={<Moment format="YYYY-MM-DD HH:mm">{message.date}</Moment>} placement={message.from === currentUser.uid ? "left-end" : "right-end"}>
                            <p key={i} className={`chat_message ${message.from === currentUser.uid ? "chat_receiver": "chat_sender"}`}
                            >
                                <span className="chat_name">
                                    {getParticipantName(message.from)}
                                </span>
                                {message.text}
                                <a onClick={() => translateMessage(message.text)}><i class="fa fa-language translateButton" aria-hidden="true"></i></a>
                            </p>
                        </Tooltip>
                    )
                })}
                <div ref={messagesEndRef} />
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
                {/* <IconButton><InsertEmoticon /></IconButton> */}
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Write a message"
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
