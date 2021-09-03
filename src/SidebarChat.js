import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import  './SidebarChat.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import db from './firebase';
import { Link } from 'react-router-dom';
function SidebarChat({ id,name,addNewChat }) {
    
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");
    useEffect(() => {
        if(id){
            db.collection('users').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    
    const [userName, setName] = useState('')

    const createChat = (event) => {
        event.preventDefault();
        console.log(userName);
        setOpen(false);
        if(userName){
            db.collection('users').add({
                name:userName,
            })
        }
        
    };
    //modal popup
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return !addNewChat ? (
        <Link to={`/users/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>
                        {name}
                    </h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ): (
        <div>
        <div className="sidebarChat" onClick={handleClickOpen}>
            Start New Conversation
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add User's Name</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter Name"
                type="text"
                fullWidth
                onChange={event => setName(event.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={createChat} color="primary">
                Chat Now
            </Button>
            </DialogActions>
        </Dialog>
        </div>

    );
}

export default SidebarChat
