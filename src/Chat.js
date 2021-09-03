import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import React, { useEffect, useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { userId } = useParams();
    const [userName , setUserName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        if(userId){
            db.collection('users').doc(userId).onSnapshot((snapshot) => 
                setUserName(snapshot.data().name));
                db.collection('users').doc(userId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                });
        }
    },[userId])
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    }, [userId])

    const sendMessage = (e) =>{
        e.preventDefault();
        console.log("you typed >>>>", input);
        db.collection('users').doc(userId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    };
    return (
        <div className = "chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat_headerInfo">
                <h3>{userName}</h3>
                <p className='lastseen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
            </div>
            <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            
            <div class="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${ message.name == user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                         {message.message}
                        <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                
            </div>
            
            <div class="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message " type="text"/>
                    <button type="submit" onClick={sendMessage}><SendIcon/></button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
