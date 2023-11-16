import './Profile.css';
import NavBar from '../NavBar.js';
import Heading from './Heading.js';
import Feed from './Feed.js';
import Followers from './Followers.js';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate, Navigate} from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  console.log("location.state", location.state);

  return (
    <>
    {location.state?
      <div>
      <NavBar id="navbar" user={location.state.user}/>
      <main>
        <div className="Profile">
          <Heading author={location.state.author}/>
          <div id="profile">
            <Followers id="followers"/>
          </div>
        </div>
      </main>
    
    </div>:
    <Navigate to="/" />
    }</>
    
  );
}
