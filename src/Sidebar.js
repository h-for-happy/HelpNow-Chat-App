import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import {Avatar, recomposeColor} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [users, setUsers] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect (() => {
        const unsubscribe = db.collection('users').onSnapshot((snapshot) =>
            setUsers(snapshot.docs.map((doc)=>
                (
                    {
                        id: doc.id,
                        data:doc.data(),
                    }
                )
            ))
        );
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="sidebar">
            {/* <h1>Sidebar</h1> */}
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar_search">
                <SearchOutlined/>
                <input placeholder="Search or Start a new Chat" type="text"/>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {users.map((user) => (
                    <SidebarChat key={user.id} id={user.id} name={user.data.name} />
                ))}
                
            </div>
        </div>
    )
}

export default Sidebar
