
import './Home.css';
import NavBar from "../NavBar.js"
import React from 'react';
import Posts from './Posts.js';
// import {useState} from 'react';
// import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate, Navigate} from 'react-router-dom';


export default function Home() {
// gather post information here
const location = useLocation();
const navigate = useNavigate();
console.log("location.state", location.state);
//console.log("userData", location.state.userData);

//this will have to originally be a guest account
//const user = location.state.userData;
// const [user, setUser] = useState(location.state.userData);
// setUserId(1);
const apiString = "http://localhost:5000";

// async function getUser(){
//   const url = apiString + `/users/?` + 1;
//   const res = await fetch(url);
//   const userRes = await res.json();
//   console.log("userRes", userRes);
//   setUser(userRes);
// }

// useEffect(()=>{
//   getUser();
// },[]);

  return (
    <>
    {location.state?
      <div className="Home">
        <main>
          <NavBar user={location.state.user}/>
          <Posts user={location.state.user}/>
        </main>
      </div>: <Navigate to="/" />
}</>
  );
}

