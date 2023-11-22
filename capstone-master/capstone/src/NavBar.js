import React from "react";
import logo from "./Pindie.png";
import {useNavigate} from 'react-router-dom';
import { Button, Drawer, Radio, Space } from 'antd';
import {useState} from 'react';
import './App.css';

export default function NavBar({user}){
    const [open, setOpen] = useState(false);
    const placement = 'top';
    const navigate = useNavigate();

    const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };

    function viewProfile(){
        navigate("/myprofile", {state: {user: user}});
    }

    function signOut(){
        navigate("/");
    }

    function goHome(){
        navigate('/home', {state: {user: user}});
    }

    console.log("NavBar user:", user);

    return(
        <section id="navbar" className="flexbar">
            <div>
                <img src={logo} onClick={goHome}/>
            </div>
            <div className="buttons">
                <div id="current_user">
                    <button id="user_icon"><img src={user.media_link} onClick={showDrawer}/></button>
                    <button onClick={viewProfile}><h3>{user.username}</h3></button>
                </div>
                <div id="signOut">
                    <button onClick={signOut} >Sign Out</button>
                </div>
            </div>
            <Drawer
        title={user.username}
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={viewProfile}>
              View Profile
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
        </section>
    )
}