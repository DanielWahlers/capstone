import logo from '../Pindie.png';
import './MyProfile.css';
import NavBar from '../NavBar.js';
import Heading from './Heading.js';
import Feed from './Feed.js';
import Followers from './Followers.js';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate, Navigate} from 'react-router-dom';

export default function MyProfile() {
  const location = useLocation();
  console.log("location.state", location.state);

  return (
    <>
    {location.state?
      <div>
      <NavBar id="navbar" user={location.state.user}/>
      <main>
        <div className="MyProfile">
          <Heading user={location.state.user}/>
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
